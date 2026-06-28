/**
 * 书籍/章节匹配模块
 * 
 * 根据配置匹配微信读书书籍和章节到博客文件
 */

const fs = require('fs');
const path = require('path');
const { logger } = require('./utils');

/**
 * 匹配章节到博客文件
 * @param {object} params
 * @param {object} params.bookConfig - 书籍配置（来自 weread_mapping.yml）
 * @param {string} params.chapterName - 微信读书章节名
 * @param {string} params.postsDir - 博客文章目录
 * @returns {object} { success, filePath, error }
 */
function matchChapter({ bookConfig, chapterName, postsDir }) {
  const bookDir = bookConfig.blog_book_dir;
  const bookTitle = bookConfig.weread_book_title;
  const chapterMappings = bookConfig.chapters || [];
  
  // 构建书籍文件夹路径
  const bookFolderPath = path.join(postsDir, bookDir);
  
  // 检查书籍文件夹是否存在
  if (!fs.existsSync(bookFolderPath)) {
    return {
      success: false,
      error: `书籍文件夹不存在：${bookFolderPath}\n请先创建文件夹和对应章节文件`
    };
  }
  
  // 第一步：规则自动匹配
  const autoMatchResult = autoMatchChapter({
    bookFolderPath,
    chapterName
  });
  
  if (autoMatchResult.success) {
    logger.debug(`自动匹配成功：${chapterName} → ${autoMatchResult.fileName}`);
    return autoMatchResult;
  }
  
  // 第二步：手动配置匹配
  const manualMatch = chapterMappings.find(m => 
    m.weread_chapter === chapterName
  );
  
  if (manualMatch) {
    const filePath = path.join(bookFolderPath, manualMatch.blog_post_file);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return {
        success: false,
        error: `配置的文件不存在：${filePath}\n请检查 weread_mapping.yml 中的 blog_post_file 配置`
      };
    }
    
    logger.debug(`手动匹配成功：${chapterName} → ${manualMatch.blog_post_file}`);
    return {
      success: true,
      filePath,
      matchedBy: 'manual'
    };
  }
  
  // 都没匹配上
  const availableFiles = getAvailableFiles(bookFolderPath);
  return {
    success: false,
    error: `章节匹配失败：${bookTitle} / ${chapterName}\n` +
           `文件夹内可用文件：${availableFiles.join(', ') || '无'}\n` +
           `请在 weread_mapping.yml 中添加章节映射：\n` +
           `  chapters:\n` +
           `    - weread_chapter: "${chapterName}"\n` +
           `      blog_post_file: "???.md"`
  };
}

/**
 * 自动匹配章节（规则匹配）
 * @param {object} params
 * @param {string} params.bookFolderPath - 书籍文件夹路径
 * @param {string} params.chapterName - 微信读书章节名
 * @returns {object} { success, filePath, fileName }
 */
function autoMatchChapter({ bookFolderPath, chapterName }) {
  // 获取文件夹内所有 md 文件
  const files = fs.readdirSync(bookFolderPath)
    .filter(f => f.endsWith('.md') && f !== 'index.md');
  
  for (const fileName of files) {
    // 去掉 .md 后缀
    const baseName = fileName.replace('.md', '');
    
    // 去掉开头的数字编号（如 01第一卷 → 第一卷）
    const cleanName = baseName.replace(/^\d+/, '');
    
    // 精确比对
    if (cleanName === chapterName) {
      return {
        success: true,
        filePath: path.join(bookFolderPath, fileName),
        fileName,
        matchedBy: 'auto'
      };
    }
  }
  
  return { success: false };
}

/**
 * 获取文件夹内可用的 md 文件列表
 * @param {string} folderPath
 * @returns {string[]} 文件名列表
 */
function getAvailableFiles(folderPath) {
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  
  return fs.readdirSync(folderPath)
    .filter(f => f.endsWith('.md') && f !== 'index.md');
}

/**
 * 构建匹配提示信息（用于错误报告）
 * @param {object} params
 * @returns {string} 提示信息
 */
function buildMatchHint({ bookTitle, chapterName, bookDir, availableFiles }) {
  return `
========================================
章节匹配失败
========================================
书籍：${bookTitle}
章节：${chapterName}
博客文件夹：${bookDir}

可用文件：
${availableFiles.map(f => `  - ${f}`).join('\n') || '  （无 .md 文件）'}

建议在 weread_mapping.yml 中添加映射：
  chapters:
    - weread_chapter: "${chapterName}"
      blog_post_file: "请指定正确的文件名.md"
========================================
`;
}

module.exports = { matchChapter, autoMatchChapter, getAvailableFiles, buildMatchHint };