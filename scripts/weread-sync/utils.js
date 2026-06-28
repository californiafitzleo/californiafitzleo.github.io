/**
 * 工具函数模块
 */

// ANSI 颜色码
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};

/**
 * 日志工具
 */
const logger = {
  info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  debug: (msg) => {
    if (process.env.DEBUG) {
      console.log(`${COLORS.gray}…${COLORS.reset} ${msg}`);
    }
  }
};

/**
 * 格式化同步报告
 * @param {object} report - 报告数据
 * @param {string} duration - 耗时（秒）
 * @returns {string} 格式化的报告文本
 */
function formatReport(report, duration) {
  const lines = [];
  
  lines.push('╔════════════════════════════════════╗');
  lines.push('║      微信读书同步报告               ║');
  lines.push('╠════════════════════════════════════╣');
  lines.push(`║ 处理书籍: ${report.booksProcessed} 本                  ║`);
  lines.push(`║ 处理章节: ${report.chaptersProcessed} 章                 ║`);
  lines.push(`║ 新增划线: ${report.highlightsAdded} 条                 ║`);
  lines.push(`║ 修改文件: ${report.filesModified} 个                  ║`);
  lines.push(`║ 耗时: ${duration} 秒                      ║`);
  lines.push('╠════════════════════════════════════╣');
  
  if (report.matchErrors.length > 0) {
    lines.push('║ 匹配失败:                          ║');
    for (const err of report.matchErrors) {
      lines.push(`║   - ${err.book} / ${err.chapter}     ║`);
    }
  } else {
    lines.push('║ 匹配失败: 0                        ║');
  }
  
  if (report.parseErrors.length > 0) {
    lines.push('║ 解析失败:                          ║');
    for (const err of report.parseErrors) {
      lines.push(`║   - ${err.file}              ║`);
    }
  } else {
    lines.push('║ 解析失败: 0                        ║');
  }
  
  lines.push('╚════════════════════════════════════╝');
  
  return lines.join('\n');
}

/**
 * 去除字符串首尾的数字编号
 * @param {string} str - 原字符串
 * @returns {string} 去除编号后的字符串
 */
function stripNumberPrefix(str) {
  return str.replace(/^\d+/, '');
}

/**
 * 规范化章节名（用于比较）
 * @param {string} name - 章节名
 * @returns {string} 规范化后的名称
 */
function normalizeChapterName(name) {
  return name
    .replace(/^\d+/, '')
    .replace(/[（(].*?[）)]/g, '')
    .trim();
}

module.exports = {
  logger,
  formatReport,
  COLORS,
  stripNumberPrefix,
  normalizeChapterName
};