/**
 * 配置加载模块
 * 
 * 加载 weread_mapping.yml 和 weread_config.yml
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { logger } = require('./utils');

/**
 * 加载所有配置
 * @param {string} dataDir - source/_data 目录路径
 * @returns {object} { mapping, settings }
 */
function load(dataDir) {
  const mappingPath = path.join(dataDir, 'weread_mapping.yml');
  const configPath = path.join(dataDir, 'weread_config.yml');

  // 检查文件存在
  if (!fs.existsSync(mappingPath)) {
    throw new Error(`配置文件不存在：${mappingPath}\n请先创建 weread_mapping.yml`);
  }
  if (!fs.existsSync(configPath)) {
    throw new Error(`配置文件不存在：${configPath}\n请先创建 weread_config.yml`);
  }

  // 解析 YAML
  const mapping = yaml.load(fs.readFileSync(mappingPath, 'utf8'));
  const settings = yaml.load(fs.readFileSync(configPath, 'utf8'));

  // 校验配置完整性
  validateMapping(mapping);
  validateSettings(settings);

  logger.debug('配置加载完成');
  logger.debug(`- 书籍数量：${mapping.books.length}`);
  logger.debug(`- 主题：${settings.highlight.theme}`);

  return { mapping, settings };
}

/**
 * 校验 mapping 配置
 */
function validateMapping(mapping) {
  if (!mapping.books || !Array.isArray(mapping.books)) {
    throw new Error('weread_mapping.yml 格式错误：缺少 books 数组');
  }

  for (const book of mapping.books) {
    if (!book.weread_book_id) {
      throw new Error(`书籍配置缺少 weread_book_id：${book.weread_book_title || '未知'}`);
    }
    if (!book.blog_book_dir) {
      throw new Error(`书籍配置缺少 blog_book_dir：${book.weread_book_title || '未知'}`);
    }
  }
}

/**
 * 校验 settings 配置
 */
function validateSettings(settings) {
  if (!settings.highlight) {
    settings.highlight = { theme: 'default', show_number: false };
  }
  if (!settings.sort) {
    settings.sort = { by: 'position' };
  }
  if (!settings.sync) {
    settings.sync = { mode: 'incremental', fail_on_error: false, validate_marks: true };
  }
}

module.exports = { load };