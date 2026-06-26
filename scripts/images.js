'use strict';

hexo.extend.filter.register('after_post_render', function(data) {
  if (!data.content) return data;

  data.content = data.content.replace(/<img([^>]*)src\s*=\s*"([^"]+)"([^>]*)\/?>/gi, function(match, before, src, after) {
    const attrs = before + after;

    if (attrs.includes('loading=')) {
      return match;
    }

    const loading = 'loading="lazy"';
    const decoding = 'decoding="async"';
    const onerror = 'onerror="if(!this.dataset.err){this.dataset.err=1;this.src=\'/assets/404.svg\'}"';

    return '<img' + before + 'src="' + src + '" ' + loading + ' ' + decoding + ' ' + onerror + after + '>';
  });

  return data;
}, 15);
