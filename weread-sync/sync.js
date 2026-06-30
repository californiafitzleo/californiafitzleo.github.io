const fs = require('fs');
const path = require('path');

const SECTION_START = '<!-- WEREAD_SECTION_START -->';
const SECTION_END = '<!-- WEREAD_SECTION_END -->';
const MARK_START = '<!-- WEREAD_HIGHLIGHT_';
const MARK_END = '_';

function matchChapter(bookConfig, chapterName, postsDir) {
  const bookFolder = path.join(postsDir, bookConfig.blog_book_dir);
  if (!fs.existsSync(bookFolder)) {
    return { success: false, error: `书籍文件夹不存在: ${bookFolder}` };
  }

  const files = fs.readdirSync(bookFolder).filter(f => f.endsWith('.md') && f !== 'index.md');

  for (const file of files) {
    const name = file.replace('.md', '').replace(/^\d+/, '');
    if (name === chapterName) {
      return { success: true, filePath: path.join(bookFolder, file) };
    }
  }

  const manual = (bookConfig.chapters || []).find(c => c.weread_chapter === chapterName);
  if (manual) {
    const fp = path.join(bookFolder, manual.blog_post_file);
    if (fs.existsSync(fp)) return { success: true, filePath: fp };
    return { success: false, error: `配置文件不存在: ${fp}` };
  }

  return {
    success: false,
    error: `章节匹配失败: ${chapterName}\n可用文件: ${files.join(', ')}`
  };
}

function processFile(filePath, highlights) {
  if (!fs.existsSync(filePath)) return { success: false, error: `文件不存在: ${filePath}` };

  let content = fs.readFileSync(filePath, 'utf8');

  // 提取现有的 frontmatter（如果有）
  let frontmatter = '';
  let bodyContent = content;

  const fmMatch = content.match(/^---\n[\s\S]*?\n---\n?/);
  if (fmMatch) {
    frontmatter = fmMatch[0];
    bodyContent = content.slice(fmMatch[0].length);
  }

  // 清理空的 section 标记
  bodyContent = bodyContent.replace(/\n?<!-- WEREAD_SECTION_START -->\s*\n<!-- WEREAD_SECTION_END -->\n?/g, '');

  // 提取有内容的 section
  const section = extractSection(bodyContent);
  let manualMap = {};
  if (section.hasSection) {
    manualMap = extractManuals(section.content);
  }

  const newSection = buildSection(highlights, manualMap);

  if (section.hasSection && section.content === newSection) {
    return { success: true, modified: false, count: highlights.length };
  }

  let newBody;
  if (section.hasSection) {
    // 替换整个 section
    newBody = bodyContent.replace(section.fullMatch, `${SECTION_START}\n${newSection}\n${SECTION_END}`);
  } else {
    newBody = bodyContent.trimEnd() + `\n\n${SECTION_START}\n${newSection}\n${SECTION_END}\n`;
  }

  fs.writeFileSync(filePath, frontmatter + newBody);
  return { success: true, modified: true, count: highlights.length };
}

function extractSection(content) {
  const regex = new RegExp(`${SECTION_START}\\s*\\n(.*?)\\n\\s*${SECTION_END}`, 's');
  const match = content.match(regex);
  if (!match) return { hasSection: false };
  return { hasSection: true, content: match[1], fullMatch: match[0] };
}

function extractManuals(sectionContent) {
  const manuals = {};
  const startRe = new RegExp(`${MARK_START}(\\d+)_START -->`, 'g');
  const endRe = new RegExp(`${MARK_START}(\\d+)_END -->`, 'g');

  const starts = [...sectionContent.matchAll(startRe)].map(m => ({ n: parseInt(m[1]), i: m.index, end: m.index + m[0].length }));
  const ends = [...sectionContent.matchAll(endRe)].map(m => ({ n: parseInt(m[1]), i: m.index, end: m.index + m[0].length }));

  if (starts.length === 0) return manuals;

  const firstStart = starts[0];
  const before = sectionContent.slice(0, firstStart.i).trim();
  if (before) manuals[0] = before;

  for (let i = 0; i < starts.length; i++) {
    const s = starts[i];
    const e = ends.find(x => x.n === s.n);
    if (!e) continue;

    const nextStart = starts[i + 1];
    const afterEnd = nextStart ? nextStart.i : sectionContent.length;
    const after = sectionContent.slice(e.end, afterEnd).trim();
    if (after) manuals[s.n] = after;
  }

  return manuals;
}

function buildSection(highlights, manuals) {
  const lines = [];

  if (manuals[0]) {
    lines.push(manuals[0]);
    lines.push('');
  }

  for (let i = 0; i < highlights.length; i++) {
    const pos = i + 1;
    const hl = highlights[i];

    lines.push(`${MARK_START}${pos}_START -->`);
    lines.push(buildCard(hl.content, pos));
    lines.push(`${MARK_START}${pos}_END -->`);

    if (manuals[pos]) {
      lines.push('');
      lines.push(manuals[pos]);
      lines.push('');
    } else if (i < highlights.length - 1) {
      lines.push('');
    }
  }

  return lines.join('\n');
}

function buildCard(content, position) {
  const escaped = escapeHtml(content);
  return `<div class="weread-card" data-position="${position}">
  <span class="weread-text">${escaped}</span>
</div>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { matchChapter, processFile };
