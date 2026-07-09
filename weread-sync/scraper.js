const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const WEREAD_URL = 'https://weread.qq.com';
const STORAGE_PATH = path.join(__dirname, '..', 'source', '_data', 'weread-storage.json');

// 微信读书 i.weread.qq.com 接口（手机端 API，返回结构化 JSON，不依赖阅读器权限）
const WEREAD_API = {
  BOOKMARKLIST: 'https://i.weread.qq.com/book/bookmarklist',
  CHAPTER_INFO: 'https://i.weread.qq.com/book/chapterInfos',
  BOOK_INFO: 'https://i.weread.qq.com/book/info',
};

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

/**
 * 在页面上下文里发 GET 请求（同源 fetch，cookie 自动带上）
 * 要求 page 当前停留在 i.weread.qq.com 域
 */
async function apiGet(page, url, params) {
  const qs = new URLSearchParams(params).toString();
  const fullUrl = qs ? `${url}?${qs}` : url;
  return await page.evaluate(async (u) => {
    try {
      const r = await fetch(u, { credentials: 'include', headers: { 'Accept': 'application/json' } });
      const ok = r.ok;
      const status = r.status;
      let data = null;
      try { data = await r.json(); } catch {}
      return { ok, status, data };
    } catch (e) {
      return { ok: false, status: 0, data: null, error: String(e) };
    }
  }, fullUrl);
}

/**
 * 在页面上下文里发 POST 请求（同源 fetch，cookie 自动带上）
 * 要求 page 当前停留在 i.weread.qq.com 域
 */
async function apiPost(page, url, body) {
  return await page.evaluate(async ({ u, b }) => {
    try {
      const r = await fetch(u, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(b),
      });
      const ok = r.ok;
      const status = r.status;
      let data = null;
      try { data = await r.json(); } catch {}
      return { ok, status, data };
    } catch (e) {
      return { ok: false, status: 0, data: null, error: String(e) };
    }
  }, { u: url, b: body });
}

function cleanChapterTitle(title) {
  if (!title) return '未命名章节';
  return String(title)
    .replace(/^\d+\s+/, '')
    .replace(/^\s*[（(].*?[）)]\s*/, '')
    .replace(/\s*[（(].*?[）)]\s*$/, '')
    .trim();
}

/**
 * 主路径：通过 i.weread.qq.com API 获取划线
 * 优点：返回结构化 JSON，不依赖阅读器权限，不受付费墙影响
 */
async function fetchViaAPI(page, bookId, fallbackTitle) {
  // 1. 获取章节信息
  const chapterResp = await apiPost(page, WEREAD_API.CHAPTER_INFO, {
    bookIds: [bookId],
    synckeys: [0],
    teenmode: 0,
  });

  const chapterMap = {}; // chapterUid -> { title, idx }
  if (chapterResp.ok && chapterResp.data && Array.isArray(chapterResp.data.data)) {
    const list = (chapterResp.data.data[0] && chapterResp.data.data[0].updated) || [];
    for (const ch of list) {
      chapterMap[ch.chapterUid] = { title: ch.title, idx: ch.chapterIdx };
    }
  } else {
    log.warn(`  章节信息接口异常 (status=${chapterResp.status})`);
  }

  // 2. 获取划线列表
  const markResp = await apiGet(page, WEREAD_API.BOOKMARKLIST, { bookId });
  if (!markResp.ok || !markResp.data) {
    throw new Error(`bookmarklist 请求失败 status=${markResp.status}${markResp.error ? ` err=${markResp.error}` : ''}`);
  }

  const bookmarks = markResp.data.updated || [];
  if (bookmarks.length === 0) return null;

  // 3. 按 chapterUid 分组
  const grouped = {};
  for (const bm of bookmarks) {
    const uid = bm.chapterUid;
    if (uid === undefined || uid === null) continue;
    if (!grouped[uid]) grouped[uid] = [];
    grouped[uid].push(bm);
  }

  // 4. 按章节顺序构造 chapters
  const uids = Object.keys(grouped).map(Number).sort((a, b) => {
    const ia = chapterMap[a] ? chapterMap[a].idx : 999999;
    const ib = chapterMap[b] ? chapterMap[b].idx : 999999;
    return ia - ib;
  });

  const chapters = {};
  let totalCount = 0;
  for (const uid of uids) {
    const info = chapterMap[uid];
    const title = cleanChapterTitle(info ? info.title : `章节${uid}`);

    // 划线排序：优先按 range 字符串排序（对应原文位置），否则按创建时间
    const list = grouped[uid].slice().sort((a, b) => {
      const ra = a.range || '';
      const rb = b.range || '';
      if (ra && rb) return ra.localeCompare(rb);
      return (a.createTime || 0) - (b.createTime || 0);
    });

    const items = [];
    for (const bm of list) {
      const content = (bm.markText || bm.content || bm.text || '').trim();
      if (!content || content.length < 1) continue;
      items.push({ content, position: items.length + 1 });
      totalCount++;
    }
    if (items.length > 0) chapters[title] = items;
  }

  if (totalCount === 0) return null;

  // 5. 获取书名（失败则用 fallback）
  let bookTitle = fallbackTitle || bookId;
  try {
    const infoResp = await apiGet(page, WEREAD_API.BOOK_INFO, { bookId });
    if (infoResp.ok && infoResp.data && infoResp.data.title) {
      bookTitle = infoResp.data.title;
    }
  } catch {}

  return { bookId, bookTitle, chapters, totalCount };
}

/**
 * 回退路径1：阅读器 DOM + 滚动加载
 * 适用：API 接口失效时
 */
async function fetchViaReaderDOM(page, bookId) {
  await page.goto(`${WEREAD_URL}/web/reader/${bookId}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  let bookTitle = await page.title() || bookId;
  bookTitle = bookTitle.replace(/\s*-\s*微信读书.*$/, '').replace(/\s*-\s*版权信息.*$/, '').trim();

  // 关闭 intro 弹窗
  try {
    const closeBtn = await page.$('[class*="closeButton"]');
    if (closeBtn) await closeBtn.click();
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

  // 切换到「我的笔记」标签
  try {
    const myNotesTab = await page.$('[class*="noteTab"], [class*="myNote"], [class*="personalNote"]');
    if (myNotesTab) {
      await myNotesTab.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  // 滚动加载笔记面板，直到没有新内容
  let lastCount = -1;
  let stableRounds = 0;
  const MAX_ROUNDS = 30;

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const notes = await page.$$('.wr_reader_note_panel_item_cell_content_text');

    if (notes.length === lastCount) {
      stableRounds++;
      if (stableRounds >= 2) break; // 连续两轮没变化，认为加载完毕
    } else {
      stableRounds = 0;
      lastCount = notes.length;
    }

    // 滚动笔记面板加载更多（class 名来自实际 DOM 探查）
    await page.evaluate(() => {
      const sel = [
        '.readerNotePanel_scroll_container',
        '.readerNotePanel',
        '[class*="readerNotePanel"]',
        '[class*="notePanel"]',
      ];
      for (const s of sel) {
        const el = document.querySelector(s);
        if (el) { el.scrollTop = el.scrollHeight; break; }
      }
    });
    await page.waitForTimeout(800);
  }

  // 最终提取：按 DOM 顺序遍历，识别章节标题和划线的穿插关系
  // 结构：章标题 wrapper → 该章 N 条划线 → 下一章标题 → ...
  const panel = await page.$('.readerNotePanel_scroll_container, .readerNotePanel');
  const chapters = {};
  let totalCount = 0;
  let currentChapter = '正文';

  if (panel) {
    // 直接在浏览器上下文里提取，避免多次跨进程通信
    const result = await page.evaluate(() => {
      const panelEl = document.querySelector('.readerNotePanel_scroll_container') || document.querySelector('.readerNotePanel');
      if (!panelEl) return { chapters: {}, totalCount: 0 };

      const chapters = {};
      let totalCount = 0;
      let currentChapter = '正文';
      let posInChapter = 0;

      // 找出所有章标题和划线内容元素，按文档顺序排列
      const allItems = panelEl.querySelectorAll('.wr_reader_note_panel_chapter_title, .wr_reader_note_panel_item_cell_content_text');

      for (const el of allItems) {
        const text = (el.textContent || '').trim();
        if (!text) continue;

        if (el.classList.contains('wr_reader_note_panel_chapter_title')) {
          // 章节标题
          currentChapter = text.replace(/\s+/g, ' ').trim();
          posInChapter = 0;
          if (!chapters[currentChapter]) chapters[currentChapter] = [];
        } else {
          // 划线内容
          posInChapter++;
          if (!chapters[currentChapter]) chapters[currentChapter] = [];
          chapters[currentChapter].push({ content: text, position: posInChapter });
          totalCount++;
        }
      }

      return { chapters, totalCount };
    });

    // 清理章节标题
    for (const [rawTitle, highlights] of Object.entries(result.chapters)) {
      const cleanTitle = cleanChapterTitle(rawTitle);
      chapters[cleanTitle] = highlights;
    }
    totalCount = result.totalCount;
  }

  if (totalCount === 0) return null;
  return { bookId, bookTitle, chapters, totalCount };
}

/**
 * 回退路径2：书籍详情页笔记 Tab
 * 适用：阅读器入口被付费墙挡住
 */
async function fetchViaDetailDOM(page, bookId) {
  await page.goto(`${WEREAD_URL}/web/book/detail/${bookId}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 尝试点击「笔记」Tab
  const tabCandidates = [
    'text=笔记',
    'text=划线',
    '[class*="noteTab"]',
    '[class*="tabItem"]:has-text("笔记")',
  ];
  for (const sel of tabCandidates) {
    try {
      const el = await page.$(sel);
      if (el && await el.isVisible()) {
        await el.click();
        await page.waitForTimeout(1500);
        break;
      }
    } catch {}
  }

  // 滚动加载
  let lastCount = -1;
  for (let i = 0; i < 20; i++) {
    const items = await page.$$('[class*="bookmarkItem"], [class*="noteItem"], [class*="highlightItem"]');
    if (items.length === lastCount) break;
    lastCount = items.length;
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(800);
  }

  // 提取（结构不确定，尽量兼容多种选择器）
  const notes = await page.$$('[class*="bookmarkItem"] [class*="text"], [class*="noteItem"] [class*="text"]');
  const chapters = { '正文': [] };
  for (const n of notes) {
    const content = (await n.textContent()).trim();
    if (content && content.length > 0) {
      chapters['正文'].push({ content, position: chapters['正文'].length + 1 });
    }
  }

  const totalCount = chapters['正文'].length;
  if (totalCount === 0) return null;

  let bookTitle = await page.title() || bookId;
  bookTitle = bookTitle.replace(/\s*-\s*微信读书.*$/, '').trim();
  return { bookId, bookTitle, chapters, totalCount };
}

/**
 * 单本书抓取：阅读器 DOM（主） → 详情页笔记 Tab（回退） → API（可选）
 *
 * 设计说明：
 * - 主路径用阅读器 DOM + 滚动加载，能完整抓取所有章节（含付费章节）的划线，
 *   不受 i.weread.qq.com 接口鉴权限制。
 * - 详情页笔记 Tab 作为回退，适用于阅读器入口被付费墙挡住的情况。
 * - API 路径（i.weread.qq.com）需要 App 端 cookie，网页扫码登录拿不到，
 *   默认不启用；未来若手动配置 App cookie 可改为优先使用。
 */
async function fetchBookHighlights(page, bookId, fallbackTitle) {
  // 主路径：阅读器 DOM + 滚动加载
  try {
    const r = await fetchViaReaderDOM(page, bookId);
    if (r) {
      log.info(`  路径: 阅读器DOM ✓`);
      return r;
    }
    log.warn(`  阅读器入口无划线，回退到详情页`);
  } catch (e) {
    log.warn(`  阅读器入口失败: ${e.message}`);
  }

  // 回退1：详情页笔记 Tab
  try {
    const r = await fetchViaDetailDOM(page, bookId);
    if (r) {
      log.info(`  路径: 详情页DOM ✓`);
      return r;
    }
    log.warn(`  详情页入口无划线`);
  } catch (e) {
    log.warn(`  详情页入口失败: ${e.message}`);
  }

  // 回退2：API（需要 App 端 cookie，网页扫码登录通常无法使用）
  try {
    await page.goto('https://i.weread.qq.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(500);
    const r = await fetchViaAPI(page, bookId, fallbackTitle);
    if (r) {
      log.info(`  路径: API ✓`);
      return r;
    }
  } catch (e) {
    log.warn(`  API 路径失败: ${e.message}`);
  }

  return null;
}

/**
 * 批量抓取
 * @param {Array<{weread_book_id, weread_book_title}>} books 配置中的书籍列表
 * @param {boolean} headless 是否无头
 */
async function fetchHighlights(books, headless = true) {
  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({
    storageState: fs.existsSync(STORAGE_PATH) ? STORAGE_PATH : undefined,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  const result = { books: {}, totalCount: 0 };
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

    for (const book of books) {
      const bookId = book.weread_book_id;
      const fallbackTitle = book.weread_book_title || bookId;
      log.info(`抓取书籍: ${bookId} (${fallbackTitle})`);
      try {
        const r = await fetchBookHighlights(page, bookId, fallbackTitle);
        if (r) {
          result.books[bookId] = r;
          totalCount += r.totalCount;
          log.success(`  ${r.bookTitle}: ${r.totalCount} 条划线，${Object.keys(r.chapters).length} 章`);
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

  result.totalCount = totalCount;
  return result;
}

module.exports = { fetchHighlights, login, log };
