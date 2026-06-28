/**
 * Markdown 处理模块（核心算法）
 * 
 * 功能：
 * 1. 读取 markdown 文件
 * 2. 提取划线区域和手动内容
 * 3. 重新构建划线区域（保留手动内容）
 * 4. 写回文件
 */

const fs = require('fs');
const path = require('path');
const { logger } = require('./utils');

// 区域标记
const SECTION_START = '<!-- WEREAD_SECTION_START -->';
const SECTION_END = '<!-- WEREAD_SECTION_END -->';
const HIGHLIGHT_START_PREFIX = '<!-- WEREAD_HIGHLIGHT_';
const HIGHLIGHT_END_PREFIX = '<!-- WEREAD_HIGHLIGHT_';
const MARK_SUFFIX = '_START -->';
const MARK_END_SUFFIX = '_END -->';

/**
 * 处理单个 markdown 文件
 * @param {object} params
 * @param {string} params.filePath - 文件路径
 * @param {array} params.highlights - 划线数据数组
 * @param {string} params.theme - 主题名称
 * @param {boolean} params.showNumber - 是否显示序号
 * @param {boolean} params.validate - 是否校验标记完整性
 * @returns {object} { success, modified, highlightsCount, error }
 */
async function processFile({ filePath, highlights, theme, showNumber, validate }) {
  // 检查文件存在
  if (!fs.existsSync(filePath)) {
    return {
      success: false,
      error: `文件不存在：${filePath}`
    };
  }

  // 读取文件内容
  let content = fs.readFileSync(filePath, 'utf8');

  // 提取划线区域
  const sectionResult = extractSection(content);

  if (!sectionResult.hasSection) {
    // 文件中没有划线区域，创建新的
    logger.debug(`文件无划线区域，创建新区域：${filePath}`);
    
    const newSection = buildNewSection({
      highlights,
      theme,
      showNumber,
      existingManuals: {} // 没有已有的手动内容
    });

    // 在文件末尾添加划线区域
    const newContent = content.trimEnd() + '\n\n' + newSection + '\n';
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    return {
      success: true,
      modified: true,
      highlightsCount: highlights.length
    };
  }

  // 有划线区域，校验标记完整性
  if (validate) {
    const validateResult = validateMarks(sectionResult.sectionContent);
    if (!validateResult.valid) {
      return {
        success: false,
        error: `标记校验失败：${validateResult.error}\n文件：${filePath}`
      };
    }
  }

  // 提取手动内容映射
  const manualMap = extractManualContent(sectionResult.sectionContent);

  // 重新构建划线区域
  const newSection = buildNewSection({
    highlights,
    theme,
    showNumber,
    existingManuals: manualMap
  });

  // 检查是否有变化
  if (sectionResult.sectionContent === newSection) {
    return {
      success: true,
      modified: false,
      highlightsCount: highlights.length
    };
  }

  // 替换划线区域
  const newContent = content.replace(
    sectionResult.fullMatch,
    SECTION_START + '\n' + newSection + '\n' + SECTION_END
  );

  // 写回文件
  fs.writeFileSync(filePath, newContent, 'utf8');
  logger.debug(`文件已更新：${filePath}`);

  return {
    success: true,
    modified: true,
    highlightsCount: highlights.length
  };
}

/**
 * 从文件内容中提取划线区域
 * @param {string} content - 文件内容
 * @returns {object} { hasSection, sectionContent, fullMatch }
 */
function extractSection(content) {
  // 匹配 SECTION_START 和 SECTION_END 之间的内容
  const regex = new RegExp(
    SECTION_START.replace(/<!--/g, '<!--') + '\\s*\\n(.*?)\\n\\s*' + SECTION_END.replace(/<!--/g, '<!--'),
    's'
  );

  const match = content.match(regex);

  if (!match) {
    return { hasSection: false };
  }

  return {
    hasSection: true,
    sectionContent: match[1],
    fullMatch: match[0]
  };
}

/**
 * 校验标记完整性
 * @param {string} sectionContent - 划线区域内容
 * @returns {object} { valid, error }
 */
function validateMarks(sectionContent) {
  // 提取所有 START 标记
  const startMarks = [];
  const startRegex = new RegExp(HIGHLIGHT_START_PREFIX + '(\\d+)' + MARK_SUFFIX, 'g');
  let match;
  while ((match = startRegex.exec(sectionContent)) !== null) {
    startMarks.push(parseInt(match[1]));
  }

  // 提取所有 END 标记
  const endMarks = [];
  const endRegex = new RegExp(HIGHLIGHT_END_PREFIX + '(\\d+)' + MARK_END_SUFFIX, 'g');
  while ((match = endRegex.exec(sectionContent)) !== null) {
    endMarks.push(parseInt(match[1]));
  }

  // 检查数量是否一致
  if (startMarks.length !== endMarks.length) {
    return {
      valid: false,
      error: `START 和 END 标记数量不一致：${startMarks.length} vs ${endMarks.length}`
    };
  }

  // 检查序号是否配对
  for (let i = 0; i < startMarks.length; i++) {
    if (startMarks[i] !== endMarks[i]) {
      return {
        valid: false,
        error: `标记序号不配对：START ${startMarks[i]} 对应 END ${endMarks[i]}`
      };
    }
  }

  // 检查序号是否连续
  const sortedMarks = [...startMarks].sort((a, b) => a - b);
  for (let i = 0; i < sortedMarks.length; i++) {
    if (sortedMarks[i] !== i + 1) {
      return {
        valid: false,
        error: `标记序号不连续：应为 ${i + 1}，实际为 ${sortedMarks[i]}`
      };
    }
  }

  return { valid: true };
}

/**
 * 提取手动内容映射
 * @param {string} sectionContent - 划线区域内容
 * @returns {object} { 0: '最前面内容', 1: '第1条后内容', ... }
 */
function extractManualContent(sectionContent) {
  const manualMap = {};

  // 分割成片段
  const parts = splitByHighlights(sectionContent);

  // 第一个片段（如果不是划线，就是最前面的手动内容）
  if (parts.length > 0 && !parts[0].isHighlight) {
    manualMap[0] = parts[0].content.trim();
  }

  // 后续片段
  let highlightIndex = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].isHighlight) {
      highlightIndex = parts[i].number;
      
      // 下一个片段如果是手动内容，记录到对应位置
      if (i + 1 < parts.length && !parts[i + 1].isHighlight) {
        manualMap[highlightIndex] = parts[i + 1].content.trim();
      }
    }
  }

  return manualMap;
}

/**
 * 按划线标记分割区域内容
 * @param {string} content - 区域内容
 * @returns {array} 片段数组 [{ isHighlight, number, content }]
 */
function splitByHighlights(content) {
  const parts = [];
  
  // 构建匹配所有标记的正则
  const markRegex = new RegExp(
    '(?:' + HIGHLIGHT_START_PREFIX + '(\\d+)' + MARK_SUFFIX + ')' +
    '|(?:' + HIGHLIGHT_END_PREFIX + '(\\d+)' + MARK_END_SUFFIX + ')',
    'g'
  );

  let lastIndex = 0;
  let currentHighlight = null;
  let match;

  while ((match = markRegex.exec(content)) !== null) {
    const matchedText = match[0];
    const number = match[1] || match[2];
    const isStart = match[1] !== undefined; // 有第一个捕获组 = START

    if (!isStart && currentHighlight !== null) {
      // END 标记 - 完成一个划线片段
      // END 之前的内容是划线内容
      parts.push({
        isHighlight: true,
        number: currentHighlight.number,
        content: content.slice(currentHighlight.startIndex, match.index)
      });
      
      currentHighlight = null;
      lastIndex = markRegex.lastIndex;
    } else if (isStart) {
      // START 标记
      // START 之前的内容是手动内容
      if (match.index > lastIndex) {
        const manualContent = content.slice(lastIndex, match.index).trim();
        if (manualContent) {
          parts.push({
            isHighlight: false,
            content: manualContent
          });
        }
      }
      
      currentHighlight = {
        number: parseInt(number),
        startIndex: markRegex.lastIndex
      };
      lastIndex = markRegex.lastIndex;
    }
  }

  // 最后剩余的内容（手动内容）
  if (lastIndex < content.length) {
    const remaining = content.slice(lastIndex).trim();
    if (remaining) {
      parts.push({
        isHighlight: false,
        content: remaining
      });
    }
  }

  return parts;
}

/**
 * 构建新的划线区域
 * @param {object} params
 * @param {array} params.highlights - 划线数组
 * @param {string} params.theme - 主题名称
 * @param {boolean} params.showNumber - 是否显示序号
 * @param {object} params.existingManuals - 已有的手动内容映射
 * @returns {string} 新的区域内容
 */
function buildNewSection({ highlights, theme, showNumber, existingManuals }) {
  const lines = [];

  // 最前面的手动内容
  if (existingManuals[0]) {
    lines.push(existingManuals[0]);
    lines.push('');
  }

  // 按序号生成划线
  for (let i = 0; i < highlights.length; i++) {
    const highlight = highlights[i];
    const position = i + 1;

    // 生成划线标记和内容
    lines.push(`${HIGHLIGHT_START_PREFIX}${position}${MARK_SUFFIX}`);
    lines.push(buildHighlightCard({
      content: highlight.content,
      position,
      theme,
      showNumber
    }));
    lines.push(`${HIGHLIGHT_END_PREFIX}${position}${MARK_END_SUFFIX}`);

    // 该划线后面的手动内容
    if (existingManuals[position]) {
      lines.push('');
      lines.push(existingManuals[position]);
      lines.push('');
    } else if (i < highlights.length - 1) {
      // 划线之间留空行（除非有手动内容）
      lines.push('');
    }
  }

  return lines.join('\n');
}

/**
 * 构建划线卡片 HTML
 * @param {object} params
 * @param {string} params.content - 划线内容
 * @param {number} params.position - 位置序号
 * @param {string} params.theme - 主题名称
 * @param {boolean} params.showNumber - 是否显示序号
 * @returns {string} HTML 字符串
 */
function buildHighlightCard({ content, position, theme, showNumber }) {
  const themeClass = theme === 'default' ? '' : `theme-${theme}`;
  const numberHtml = showNumber 
    ? `<span class="weread-number">${position}</span>` 
    : '';

  // 转义 HTML 特殊字符
  const escapedContent = escapeHtml(content);

  return `<div class="weread-card ${themeClass}" data-position="${position}">
  ${numberHtml}<span class="weread-text">${escapedContent}</span>
</div>`;
}

/**
 * 转义 HTML 特殊字符
 * @param {string} text - 原文
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  processFile,
  extractSection,
  validateMarks,
  extractManualContent,
  splitByHighlights,
  buildNewSection,
  buildHighlightCard,
  SECTION_START,
  SECTION_END
};