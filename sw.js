/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","dff1892e92fd7fd4308fda1096e36669"],["/2025/11/01/Book-04/01回响/index.html","f3040b27de960f9b84163fae6d3acd7b"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","9c347c7c37280d14cc33fb9ecc073007"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","55eff7d717cf5e7048b8b6f8ecf33a56"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","9a5451ab87e5a883edfb574d4a9e0e80"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","2c082732ee8ed8e098b5bd6c9d95ffd3"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","63f5e16646ed3b3feb4d7c7dc2304d8f"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","d38a4d69c76a777e279dfa184f11eac0"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","a5054850a65b16594a735e1088d1f145"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","91a000bee454348060ecb2cf435dac8f"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","fe29349668f899a07ab4ed96a0ae5c48"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","1c7a336ee230bdb7384c9b929de22502"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","948830aaf34a71a2ca01fd7ce60f074a"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","4c9dc56f9c02f47303249547ee068f10"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","b9efc0a1759833de5f83dcdc97b1f3cf"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","bd67b94a62832d488b040bc0daa0f93d"],["/2026/07/09/Book-14/02第二章 渔火/index.html","bad49b60190073c776e79cdb9342a6e6"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","9c124509f87253d0fee92a1d0a2ab07f"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","97d12de724fb6729ee9f5fb6b6ecc064"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","276d2eb764e01e1d0bfd91994518607f"],["/2026/07/11/Book-14/04第四章 断芦/index.html","8dfe87286eecdeb99dd2d09ce28891c2"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","bb8ef83fee70a4dbe63cf2e48454e1ff"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","3657a314a41d4262457713131b5b7cd8"],["/2026/07/14/Book-14/07第七章 绵针/index.html","f846a86d81a05db74381888a0efa7fcc"],["/2026/07/15/Book-14/08第八章 分粥/index.html","30b28861658871288954260ec8c5bc27"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","b4a824f9e6392738669ac91c434dc6e2"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","4cb8a918315e6b2d3dbbbbc7adb72aaa"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","0b40be41e2aad929089087168ad56fc9"],["/2026/07/19/Book-14/12第十二章 红/index.html","017fcf3d78a00164667c82f359bc9d31"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","c2175fe1defbd8aeda379766489a863d"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","1cdd52cb28ebb124a95a0424d8ff1f04"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","dc2501d467337ada199e887572fb7a55"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","6e205abebf8c2e29713bb414e3246a03"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","3a24c5a78dc09a70c79b797466a62ecf"],["/2026/07/25/Book-14/18尾声 传风/index.html","66b03253386cee7f27dee07aa2d7ac5a"],["/404.html","a189c3e03fd791bf34f1fb4c63ab1483"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","bc7d952475f2106ce9fa31e3fce42ffd"],["/archives/2025/11/index.html","b3d9c2136c9536017bca54c35efc50db"],["/archives/2025/index.html","f38268e4abdfaeeb3a6af45690b2fd51"],["/archives/2026/06/index.html","db58691bdbb5ba784681ef954f42a6e1"],["/archives/2026/07/index.html","2c78735339e9ca2d9f39c475df236092"],["/archives/2026/07/page/2/index.html","9aff8d182187ce5266b4ea7714d5716a"],["/archives/2026/07/page/3/index.html","595521f70ef216b31dbb6732fdd57616"],["/archives/2026/07/page/4/index.html","2d68c8ac127eadd46213b206c6d6c242"],["/archives/2026/index.html","9900a17c906126401fcfaecafb55fb32"],["/archives/2026/page/2/index.html","05f54358db42a99086a3ec0f689aef73"],["/archives/2026/page/3/index.html","97e7dacddfd9a5b0b08aa3dab7b007c6"],["/archives/2026/page/4/index.html","4d0b0166c2be0ff6c381c7ca8c2aa1b2"],["/archives/index.html","ac7fc172169b1ed6d860e1b193bef293"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","af51d95d0a5670e7280eaac6fff24b4b"],["/categories/Book-04/index.html","19fcb660fd7ff9b4caab70df22516606"],["/categories/Book-11/index.html","2721b00fcb771bf1eca18800f016dfa7"],["/categories/Book-12/index.html","0134ac4c900ab4279aadb52ccf5fc4f9"],["/categories/index.html","48346d544b57eab9c6068a3f484b62d9"],["/categories/一个叫欧维的男人决定去死/index.html","44c2b45cc80c013ef2e797edcc0e7f34"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","d8c5d4cd373e860e290eeb29aef03a16"],["/categories/剑刻鲸舟/index.html","2caa0948aeeb52761600bca301b461a7"],["/categories/剑刻鲸舟/page/2/index.html","c40744be7550e6d51c8513fc0c4af400"],["/css/app.css","cc92a9329a0fe434730dacc2b03d3c00"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","5cfe8d16e0ddf05434a30ddfaaa9691b"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","80a504c9af2aafcc76dc97509264f27d"],["/js/app.js","d900bfd7bc429ef004edbafaa6f6abb0"],["/page/2/index.html","1d4dcb430ef80b80513402f9534acc48"],["/page/3/index.html","7fd79e6fed9104aadeb38ce5810dae3f"],["/page/4/index.html","c454255498276101ab273fc0b28dba15"],["/sw-register.js","7c432ecf962b1c6fc8b1e212ac9166fb"],["/tags/index.html","f6a64ffbbe44ff933029eec8ff00a32f"],["/webstack/index.html","94b4a1a338fe791b3f5010af127399bb"],["/zishe/index.html","b5e192a5f590df24f6bda9a06f1ce2e2"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
