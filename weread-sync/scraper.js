const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const WEREAD_URL = 'https://weread.qq.com';
const STORAGE_PATH = path.join(__dirname, '..', '..', 'source', '_data', 'weread-storage.json');

const log = {
  info: (m) => console.log(`\x1b[34mℹ\x1b[0m ${m}`),
  success: (m) => console.log(`\x1b[32m✓\x1b[0m ${m}`),
  warn: (m) => console.log(`\x1b[33m⚠\x1b[0m ${m}`),
  error: (m) => console.log(`\x1b[31m✗\x1b[0m ${m}`),
};

async function login() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  log.info('浏览器已打开，请在浏览器中扫码登录...');
  log.info('（点击右上角「登录」→ 微信扫码 → 确认登录）');
  await page.goto(WEREAD_URL, { waitUntil: 'networkidle' });

  let loggedIn = false;
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const url = page.url();
    if (url.includes('/web/shelf')) { loggedIn = true; break; }
    try {
      const shelf = await page.$('[class*="shelf"], [class*="book_item"], [class*="bookList"]');
      if (shelf && await shelf.isVisible()) { loggedIn = true; break; }
    } catch {}
  }

  if (loggedIn) {
    await context.storageState({ path: STORAGE_PATH });
    log.success('登录成功！状态已保存');
  } else {
    log.error('登录超时，请检查是否完成扫码');
  }

  await browser.close();
}

async function isLoggedIn(page) {
  try {
    const url = page.url();
    if (url.includes('/web/shelf')) return true;
    const shelf = await page.$('[class*="shelf"], [class*="book_item"], [class*="bookList"]');
    return shelf && await shelf.isVisible();
  } catch {
    return false;
  }
}

async function fetchHighlights(bookIds, headless = true) {
  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({
    storageState: fs.existsSync(STORAGE_PATH) ? STORAGE_PATH : undefined,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  const books = {};
  let totalCount = 0;

  try {
    log.info('打开微信读书网页版...');
    await page.goto(WEREAD_URL, { waitUntil: 'networkidle', timeout: 30000 });

    if (!(await isLoggedIn(page))) {
      if (headless) throw new Error('未登录。请先运行 npm run weread-login');
      log.info('请在浏览器中扫码登录（120秒）...');
      for (let i = 0; i < 24; i++) {
        await new Promise(r => setTimeout(r, 5000));
        if (await isLoggedIn(page)) break;
      }
      if (!(await isLoggedIn(page))) throw new Error('登录超时');
      await context.storageState({ path: STORAGE_PATH });
      log.success('登录成功');
    }

    for (const bookId of bookIds) {
      log.info(`抓取书籍: ${bookId}`);
      try {
        const result = await fetchBookHighlights(page, bookId);
        if (result) {
          books[bookId] = result;
          totalCount += result.totalCount;
          log.success(`  ${result.bookTitle}: ${result.totalCount} 条划线，${Object.keys(result.chapters).length} 章`);
        } else {
          log.warn(`  无划线数据`);
        }
      } catch (e) {
        log.warn(`  抓取失败: ${e.message}`);
      }
    }

    await context.storageState({ path: STORAGE_PATH });
  } finally {
    await browser.close();
  }

  return { books, totalCount };
}

async function fetchBookHighlights(page, bookId) {
  // 使用 reader 页面（book detail 返回 404）
  await page.goto(`${WEREAD_URL}/web/reader/${bookId}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 提取书名（从标题中去掉后缀）
  let bookTitle = await page.title() || bookId;
  bookTitle = bookTitle.replace(/\s*-\s*微信读书.*$/, '').replace(/\s*-\s*版权信息.*$/, '').trim();

  // 关闭 intro 弹窗
  try {
    const closeBtn = await page.$('[class*="closeButton"]');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(500);
  } catch {}

  // 点击进入内容区域
  try {
    const readerArea = await page.$('[class*="wr_page_reader"]');
    if (readerArea) await readerArea.click();
    await page.waitForTimeout(500);
    // 再次关闭可能出现的弹窗
    const closeBtn2 = await page.$('[class*="closeButton"]');
    if (closeBtn2) await closeBtn2.click();
    await page.waitForTimeout(500);
  } catch {}

  // 点击笔记按钮（底部工具栏）
  try {
    const noteBtn = await page.$('button[class*="note"]');
    if (noteBtn) {
      await noteBtn.click();
      await page.waitForTimeout(2000);
    }
  } catch {}

  // 确保切换到"我的笔记"标签（排除评论和书友想法）
  try {
    const myNotesTab = await page.$('[class*="noteTab"], [class*="myNote"], [class*="personalNote"]');
    if (myNotesTab) {
      await myNotesTab.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  // 提取笔记内容
  const chapters = {};
  let totalCount = 0;
  let currentChapter = '正文';

  // 提取笔记面板中的内容 - 只获取用户自己的划线
  const notes = await page.$$('.wr_reader_note_panel_item_cell_content_text');
  if (notes.length > 0) {
    // 获取章节标题
    const chapterTitles = await page.$$('.wr_reader_note_panel_chapter_title');

    for (let i = 0; i < notes.length; i++) {
      const content = (await notes[i].textContent()).trim();
      if (!content || content.length < 5) continue;

      // 获取对应的章节标题
      if (chapterTitles.length > i) {
        currentChapter = (await chapterTitles[i].textContent()).trim();
        // 去掉章节编号和括号内容，只保留标题
        currentChapter = currentChapter.replace(/^\d+\s+/, '')
                                       .replace(/^\s*[（(].*?[）)]\s*/, '')
                                       .replace(/\s*[（(].*?[）)]\s*$/, '')
                                       .trim();
      }

      if (!chapters[currentChapter]) chapters[currentChapter] = [];
      chapters[currentChapter].push({ content, position: chapters[currentChapter].length + 1 });
      totalCount++;
    }
  }

  if (totalCount === 0) return null;
  return { bookId, bookTitle, chapters, totalCount };
}

module.exports = { fetchHighlights, login, log };
