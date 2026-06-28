/**
 * Notion 数据拉取模块
 * 
 * 使用 Notion API 查询划线数据库
 */

const { Client } = require('@notionhq/client');
const { logger } = require('./utils');

// 从环境变量获取配置
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const HIGHLIGHTS_DB_ID = process.env.WEREAD_HIGHLIGHTS_DB_ID;
const BOOKS_DB_ID = process.env.WEREAD_BOOKS_DB_ID;

// 初始化 Notion 客户端
let notionClient = null;

function initClient() {
  if (!NOTION_TOKEN) {
    throw new Error('缺少环境变量 NOTION_TOKEN');
  }
  if (!HIGHLIGHTS_DB_ID) {
    throw new Error('缺少环境变量 WEREAD_HIGHLIGHTS_DB_ID');
  }
  
  notionClient = new Client({ auth: NOTION_TOKEN });
  logger.debug('Notion 客户端初始化完成');
}

/**
 * 查询所有划线
 * @returns {object} 划线数据，按书籍和章节分组
 */
async function fetchHighlights() {
  if (!notionClient) {
    initClient();
  }

  logger.info('正在查询 Notion 划线数据库...');
  
  const result = {
    books: {},
    totalCount: 0
  };

  // 分页查询所有划线
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notionClient.databases.query({
      database_id: HIGHLIGHTS_DB_ID,
      start_cursor: startCursor,
      page_size: 100
    });

    // 处理每条划线
    for (const page of response.results) {
      const highlight = parseHighlightPage(page);
      
      if (highlight && highlight.bookId && highlight.chapter) {
        // 按书籍分组
        if (!result.books[highlight.bookId]) {
          result.books[highlight.bookId] = {
            bookTitle: highlight.bookTitle,
            chapters: {}
          };
        }
        
        // 按章节分组
        if (!result.books[highlight.bookId].chapters[highlight.chapter]) {
          result.books[highlight.bookId].chapters[highlight.chapter] = [];
        }
        
        result.books[highlight.bookId].chapters[highlight.chapter].push({
          position: highlight.position,
          content: highlight.content,
          bookmarkId: highlight.bookmarkId,
          createTime: highlight.createTime
        });
        
        result.totalCount++;
      }
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor;
    
    logger.debug(`已获取 ${result.totalCount} 条划线...`);
  }

  // 按位置排序每个章节内的划线
  for (const bookId of Object.keys(result.books)) {
    for (const chapter of Object.keys(result.books[bookId].chapters)) {
      result.books[bookId].chapters[chapter].sort((a, b) => {
        // 按位置升序
        if (a.position !== undefined && b.position !== undefined) {
          return a.position - b.position;
        }
        // 没有位置信息时按创建时间
        if (a.createTime && b.createTime) {
          return new Date(a.createTime) - new Date(b.createTime);
        }
        return 0;
      });
      
      // 重新分配序号（1, 2, 3...）
      result.books[bookId].chapters[chapter].forEach((h, index) => {
        h.position = index + 1;
      });
    }
  }

  logger.info(`查询完成：${Object.keys(result.books).length} 本书，${result.totalCount} 条划线`);
  
  return result;
}

/**
 * 解析划线页面数据
 * @param {object} page - Notion page 对象
 * @returns {object|null} 解析后的划线数据
 */
function parseHighlightPage(page) {
  const props = page.properties;
  
  try {
    // 提取书籍关联
    const bookRelation = props.Book?.relation?.[0];
    const bookId = bookRelation?.id;
    
    // 提取章节名
    const chapter = props.Chapter?.rich_text?.[0]?.plain_text || '未知章节';
    
    // 提取划线内容
    const content = props.Content?.rich_text?.[0]?.plain_text || 
                    props.Name?.title?.[0]?.plain_text || '';
    
    // 提取位置
    const position = props.Position?.number;
    
    // 提取划线 ID
    const bookmarkId = props.BookmarkId?.rich_text?.[0]?.plain_text || page.id;
    
    // 提取创建时间
    const createTime = props.CreateTime?.date?.start || page.created_time;

    if (!content) {
      logger.warn('划线内容为空，跳过');
      return null;
    }

    return {
      bookId,
      bookTitle: '', // 需要从书籍库查询获取，或暂时留空
      chapter,
      content,
      position,
      bookmarkId,
      createTime
    };
  } catch (error) {
    logger.warn(`解析划线失败：${error.message}`);
    return null;
  }
}

/**
 * 获取书籍标题（可选，用于更详细的报告）
 * @param {string} bookPageId - 书籍页面 ID
 * @returns {string} 书籍标题
 */
async function fetchBookTitle(bookPageId) {
  if (!notionClient) {
    initClient();
  }
  
  try {
    const page = await notionClient.pages.retrieve({ page_id: bookPageId });
    return page.properties.Name?.title?.[0]?.plain_text || '未知书籍';
  } catch (error) {
    logger.warn(`获取书籍标题失败：${bookPageId}`);
    return '未知书籍';
  }
}

module.exports = { fetchHighlights, fetchBookTitle, initClient };