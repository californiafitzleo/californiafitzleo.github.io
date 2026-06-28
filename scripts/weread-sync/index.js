/**
 * 微信读书划线同步脚本 - 主入口
 * 
 * 功能：
 * 1. 从 Notion 拉取划线数据
 * 2. 根据配置匹配书籍和章节
 * 3. 更新博客 markdown 文件
 * 4. 生成同步报告
 */

const path = require('path');
const config = require('./config');
const notion = require('./notion');
const matcher = require('./matcher');
const markdown = require('./markdown');
const { logger, formatReport } = require('./utils');

// 博客根目录
const BLOG_ROOT = path.resolve(__dirname, '..', '..');
const POSTS_DIR = path.join(BLOG_ROOT, 'source', '_posts');
const DATA_DIR = path.join(BLOG_ROOT, 'source', '_data');

async function main() {
  logger.info('=== 微信读书划线同步开始 ===');
  
  const startTime = Date.now();
  const report = {
    booksProcessed: 0,
    chaptersProcessed: 0,
    highlightsAdded: 0,
    filesModified: 0,
    matchErrors: [],
    parseErrors: []
  };

  try {
    // 1. 加载配置
    logger.info('步骤 1：加载配置...');
    const { mapping, settings } = config.load(DATA_DIR);
    
    // 过滤出需要同步的书籍（白名单 + sync: true）
    const syncBooks = mapping.books.filter(book => book.sync === true);
    logger.info(`配置了 ${mapping.books.length} 本书，其中 ${syncBooks.length} 本需要同步`);
    
    if (syncBooks.length === 0) {
      logger.warn('没有配置需要同步的书籍，请检查 weread_mapping.yml');
      return;
    }

    // 2. 从 Notion 拉取划线数据
    logger.info('步骤 2：从 Notion 拉取划线数据...');
    const highlightsData = await notion.fetchHighlights();
    logger.info(`拉取到 ${highlightsData.totalCount} 条划线，涉及 ${Object.keys(highlightsData.books).length} 本书`);

    // 3. 遍历每本书
    logger.info('步骤 3：处理书籍和章节...');
    for (const bookConfig of syncBooks) {
      const bookId = bookConfig.weread_book_id;
      const bookTitle = bookConfig.weread_book_title;
      
      // 检查这本书是否有划线数据
      if (!highlightsData.books[bookId]) {
        logger.warn(`《${bookTitle}》在 Notion 中没有划线数据，跳过`);
        continue;
      }
      
      const bookData = highlightsData.books[bookId];
      report.booksProcessed++;

      // 4. 遍历每章
      for (const [chapterName, highlights] of Object.entries(bookData.chapters)) {
        report.chaptersProcessed++;
        
        // 匹配章节
        const matchResult = matcher.matchChapter({
          bookConfig,
          chapterName,
          postsDir: POSTS_DIR
        });

        if (!matchResult.success) {
          report.matchErrors.push({
            book: bookTitle,
            chapter: chapterName,
            reason: matchResult.error
          });
          
          if (settings.sync.fail_on_error) {
            logger.error(`匹配失败，中止同步：${matchResult.error}`);
            process.exit(1);
          } else {
            logger.warn(`章节匹配失败，跳过：${bookTitle} / ${chapterName}`);
            continue;
          }
        }

        const filePath = matchResult.filePath;
        
        // 处理 markdown 文件
        const processResult = await markdown.processFile({
          filePath,
          highlights,
          theme: settings.highlight.theme,
          showNumber: settings.highlight.show_number,
          validate: settings.sync.validate_marks
        });

        if (!processResult.success) {
          report.parseErrors.push({
            book: bookTitle,
            chapter: chapterName,
            file: filePath,
            reason: processResult.error
          });
          
          if (settings.sync.fail_on_error) {
            logger.error(`文件处理失败，中止同步：${processResult.error}`);
            process.exit(1);
          } else {
            logger.warn(`文件处理失败，跳过：${filePath}`);
            continue;
          }
        }

        if (processResult.modified) {
          report.filesModified++;
          report.highlightsAdded += processResult.highlightsCount;
          logger.success(`更新：${bookTitle} / ${chapterName} (${processResult.highlightsCount} 条划线)`);
        } else {
          logger.info(`无变化：${bookTitle} / ${chapterName}`);
        }
      }
    }

    // 5. 输出同步报告
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    logger.info('\n' + formatReport(report, duration));
    
    // 有错误但未中止时，返回非零退出码（可选）
    if (report.matchErrors.length > 0 || report.parseErrors.length > 0) {
      logger.warn('存在匹配/解析错误，请检查配置或手动补充映射');
    }

  } catch (error) {
    logger.error(`同步失败：${error.message}`);
    logger.error(error.stack);
    process.exit(1);
  }
}

// 执行
main();