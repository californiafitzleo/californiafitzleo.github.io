/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","8845994061458f5268b3052ec0cd40fc"],["/2025/11/01/Book-04/01回响/index.html","b7d07c4bce3f267f70d4bdaffaf31ec7"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","fb48a853bfdc5dd8da362cc18fef283a"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","87c696e099bd79be672cbd9f010d8902"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","ecc09230ac83589f3c99b9d4637ddb56"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","f51d26c93fefaf193c6aa2860d6cfff6"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","c9949aad3bafa5eee74d64d4ba43453d"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","2aa885a0995c97155c9e819fbb1e09a8"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","540b9cc8be8a0d187bddd278b9cead86"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","01e934bc2ebba899426588cb54863b51"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","a92d422a6ff3fc36f27a71b0482a4ae9"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","6b3c9f526c94723538eb82e40c5237db"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","9a73648ac63f2d34626e9f0fdcc10fe9"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","b1afae9a39312191103ba7a88dba6278"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","778254d9cbdeb1ed808ddb14c1e012e0"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","37e55019572da45d63c32470f5935885"],["/2026/07/09/Book-14/02第二章 渔火/index.html","1086bd547b881821bc311da656dee6bc"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","5210a48a743c0050cb79946fe322f7f8"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","8ab2cf8b2394c02dfc322423e82b4126"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","01ddfaba4f8bb25462b0caa59e1513a7"],["/2026/07/11/Book-14/04第四章 断芦/index.html","7c20e79ee81654f9bac76ab0af904454"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","9b2a2ea01cc9bebb244cf9427dd66e89"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","23773a665dd950c5313c2b8d888a900b"],["/2026/07/14/Book-14/07第七章 绵针/index.html","fe570907d91da1260a3ec6b8a18b7973"],["/2026/07/15/Book-14/08第八章 分粥/index.html","4f5d9e2665bc92af48310701f3355db2"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","0d395d85ead1035f80400f83fc853c14"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","d02715c69f3b65c652d097c2f40abfd3"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","f159ab94aab8e2f910ae7389a2bd6777"],["/2026/07/19/Book-14/12第十二章 红/index.html","16c8567238b5f189909510edb47e9bac"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","3398707d7853f45c853fec54579ab013"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","7744283bd59fd5e6a3b377152ab1a377"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","c7785cf4befbb88f917d0f0b64b63a62"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","fbe0efd72e6300cfe2a5c0d937a4fd1c"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","7b58e20e563c7a499df4f1873f8535e6"],["/2026/07/25/Book-14/18尾声 传风/index.html","6da7e5cba1f645e316c9d44cdf78970f"],["/404.html","aea20e865fec9433820ee70ce794e00a"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","5546d916551f593d0484b08cca321e34"],["/archives/2025/11/index.html","62152a0447099eeb54bdcc77476460f4"],["/archives/2025/index.html","c9ebd7cd339c581d64971e4e7527a5c3"],["/archives/2026/06/index.html","971ea2739a11a4aecbd463f756b774d1"],["/archives/2026/07/index.html","226343ef1ea4eb2bbac157a94f515a35"],["/archives/2026/07/page/2/index.html","b849b4ec10ea05726b6539f0a1904e7d"],["/archives/2026/07/page/3/index.html","3c6debb65c68c2a4433127450dcddeb6"],["/archives/2026/07/page/4/index.html","41ffbcc47e355c0fdf8c4391d8754ecb"],["/archives/2026/index.html","8582875fd0acca732fd9fe769076706a"],["/archives/2026/page/2/index.html","14e9ac4319924e6549c221d8cf3e125b"],["/archives/2026/page/3/index.html","d506ed81f3f8dbb881cbcfd594ee6fe5"],["/archives/2026/page/4/index.html","e3c44b8e08a744f6540a76c10418d8bc"],["/archives/index.html","6a919554194207263995aca9ccc7bf55"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","01290eccef19080836fc8a01830c935b"],["/categories/Book-04/index.html","3d645957c7f4b25601012b624371f9de"],["/categories/Book-11/index.html","fac7dc5798685d185b69ff95cf9dad26"],["/categories/Book-12/index.html","7dd6ad20edf99277b4daac5e25e58f5d"],["/categories/index.html","82d4468e350d550868dad8a98f6d80f9"],["/categories/一个叫欧维的男人决定去死/index.html","792c0a70d8568509e6410a9ff5e1490b"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","89b5adaa2c824f7a6d9abb8927e852a6"],["/categories/剑刻鲸舟/index.html","83b1bbb97d4d5a5ce9bacb1a3bbe8cbc"],["/categories/剑刻鲸舟/page/2/index.html","46c31ffc22bbff23655f62eea720b825"],["/css/app.css","11662fa37fbb260c0c42e46bc57c3f89"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","4567b3cf60eace8d82bf7048376e5ab4"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","36f7554d0c4ff406289e604c252ae2e5"],["/js/app.js","0c674682cff0a3da7ff65c60740b427b"],["/page/2/index.html","5163af2795330d7cc362eb05d763f29a"],["/page/3/index.html","610f028178633ad9882679a51cb5f0fc"],["/page/4/index.html","046a31622d44607dd93bfd1efd332466"],["/sw-register.js","a6f909c530a4148948e117f76db41db6"],["/tags/index.html","e7f8eb0787f871ebeb519c993ce94eca"],["/webstack/index.html","e1313753b84420399487cd81bd8ea474"],["/zishe/index.html","e2a50786965a1d409f60ca552b289986"]];
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
