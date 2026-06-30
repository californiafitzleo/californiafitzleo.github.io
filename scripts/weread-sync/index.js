const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const scraper = require('./scraper');
const { matchChapter, processFile } = require('./sync');

const log = scraper.log;
const BLOG_ROOT = path.resolve(__dirname, '..', '..');
const POSTS_DIR = path.join(BLOG_ROOT, 'source', '_posts');
const DATA_DIR = path.join(BLOG_ROOT, 'source', '_data');

function loadConfig() {
  const mappingPath = path.join(DATA_DIR, 'weread_mapping.yml');
  if (!fs.existsSync(mappingPath)) throw new Error(`缺少配置文件: ${mappingPath}`);

  const mapping = yaml.load(fs.readFileSync(mappingPath, 'utf8'));
  if (!mapping.books || !Array.isArray(mapping.books)) {
    throw new Error('weread_mapping.yml 格式错误: 缺少 books 数组');
  }

  return mapping;
}

async function main() {
  log.info('=== 微信读书划线同步 ===');
  const startTime = Date.now();

  const stats = { books: 0, chapters: 0, added: 0, modified: 0, errors: [] };

  try {
    const config = loadConfig();
    const syncBooks = config.books.filter(b => b.sync === true);
    log.info(`配置 ${config.books.length} 本书，待同步 ${syncBooks.length} 本`);

    if (syncBooks.length === 0) {
      log.warn('没有需要同步的书籍，请检查 weread_mapping.yml');
      return;
    }

    const headless = !process.argv.includes('--show') && !process.env.DEBUG;
    const bookIds = syncBooks.map(b => b.weread_book_id);

    log.info('步骤 1: 抓取划线数据...');
    const data = await scraper.fetchHighlights(bookIds, headless);
    log.info(`共 ${data.totalCount} 条划线，${Object.keys(data.books).length} 本书`);

    log.info('步骤 2: 同步到博客...');
    for (const book of syncBooks) {
      const bookData = data.books[book.weread_book_id];
      if (!bookData) continue;

      stats.books++;
      for (const [chapter, highlights] of Object.entries(bookData.chapters)) {
        stats.chapters++;

        const match = matchChapter(book, chapter, POSTS_DIR);
        if (!match.success) {
          stats.errors.push(`${book.weread_book_title}/${chapter}: ${match.error}`);
          log.warn(`  跳过 - ${chapter}: 匹配失败`);
          continue;
        }

        const result = processFile(match.filePath, highlights);
        if (!result.success) {
          stats.errors.push(`${book.weread_book_title}/${chapter}: ${result.error}`);
          log.warn(`  跳过 - ${chapter}: 处理失败`);
          continue;
        }

        if (result.modified) {
          stats.modified++;
          stats.added += result.count;
          log.success(`  更新 - ${chapter} (${result.count} 条)`);
        } else {
          log.info(`  无变化 - ${chapter}`);
        }
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log.info('');
    log.info(`完成! 耗时 ${duration}s`);
    log.info(`  处理书籍: ${stats.books} 本`);
    log.info(`  处理章节: ${stats.chapters} 章`);
    log.info(`  新增划线: ${stats.added} 条`);
    log.info(`  修改文件: ${stats.modified} 个`);

    if (stats.errors.length > 0) {
      log.warn(`  错误: ${stats.errors.length} 个`);
      stats.errors.forEach(e => log.warn(`    - ${e}`));
    }

  } catch (error) {
    log.error(`同步失败: ${error.message}`);
    if (process.env.DEBUG) log.error(error.stack);
    process.exit(1);
  }
}

if (process.argv.includes('--login')) {
  scraper.login();
} else {
  main();
}
