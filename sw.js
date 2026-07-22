/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","f712fb2d82f239cdaddd8a22656f8a5b"],["/2025/11/01/Book-04/01回响/index.html","b4a5ab7ded92e1f4aaccf03d6808a3c5"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","c154f4347e20e8b9e399be26e5b9e4db"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","232b95331e39ebc9500b8ae6d2ea0174"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","d0a362224fc1dc0c7297f112b0f34143"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","9fe63317a87e7ea48b238dc2a7f19236"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","6f12c928c521864b34caae3f10eda7df"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","49c818a6194f660c2a28b1e46a23bd92"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","adcabce4f89b239f45c68171bba72b2f"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","5ad935ebaa27088bd0771d873df40efa"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","7140193d52b85a73490140033e1ba5e4"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","68933235f5618ab540a87b82d45883a0"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","08fa5165c52c9d5ce1c9eb32af34da2f"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","957e96a427ddfc1010268482e39e2a77"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","d8622cda3297003113d139891bdb191a"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","93771abc477da957f57af4e49c347b0a"],["/2026/07/09/Book-14/02第二章 渔火/index.html","44cab53f248ffbd948bbabf2696680fb"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","5042c6fbdbf37a927155b4ed748e6e33"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","5219df542d191f3e609863e3038aae1d"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","6c29ce4f8b0eb118517d69936388858a"],["/2026/07/11/Book-14/04第四章 断芦/index.html","7c8ef8b60014f0ff908fe837791f1347"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","dcbebb670be826f20ad55c34c19dc4ed"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","1645d9ab8f15a68e0ba458dd5534f0c3"],["/2026/07/14/Book-14/07第七章 绵针/index.html","b3938ccfe9265c4cc5f42c15ed1c0824"],["/2026/07/15/Book-14/08第八章 分粥/index.html","e5acd25d6d1502147b3045fe5b3b08bc"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","5f30eca0efda7566b968e848e910c2e8"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","9cf80d20175be19b6a6f86d0862a19f6"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","32f44734bff1618ff7573c9cf1a61184"],["/2026/07/19/Book-14/12第十二章 红/index.html","54bcb86ceb83dca36803e32e8ca96c57"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","5c4d4a7458bbca9c47b84339b181cd30"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","dec964db8728c61fe38e57bc58a0117e"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","4774b42eb0a039fd3d412b30f8343229"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","5cd1d8ca739e4e4afb0665981419cc5e"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","9db3448de56f4e3e199f75a157b23a46"],["/2026/07/25/Book-14/18尾声 传风/index.html","96127af9d4b1238b319ea4bb735bb6c7"],["/404.html","46f957cf66426506ff0a0c91d94d53cf"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","6cf08fb3420bac0eae96763816f73c47"],["/archives/2025/11/index.html","c8b16a390b8d04a3a3511b0de1bc16a3"],["/archives/2025/index.html","7c27777bc38e63d175c03e7777b05d4f"],["/archives/2026/06/index.html","35c0ee7f8d82bcc501898b159d28fb60"],["/archives/2026/07/index.html","29bf6f620641edf7bbae0e8882131946"],["/archives/2026/07/page/2/index.html","4f8f6ec0d4c4a17af2420f889bee442f"],["/archives/2026/07/page/3/index.html","06be85b1788ceb3698a6fab62550e0b1"],["/archives/2026/07/page/4/index.html","b6299e1dc9f85cae4c30333b49d87a83"],["/archives/2026/index.html","940868ee88bae11321d40edaf82b22be"],["/archives/2026/page/2/index.html","177da5af86eda4de8903fc102b129b78"],["/archives/2026/page/3/index.html","0042e6f9b732d62f04bc6857dd65851a"],["/archives/2026/page/4/index.html","9326e3944a2ff53eb9cbcaf929152324"],["/archives/index.html","ad5bd8574b49070f6773c409e3778ea1"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","5067f151c5256cf4c80b0979b81884d1"],["/categories/Book-04/index.html","cd233bdbfa6a52c73205dfaaee1f1970"],["/categories/Book-11/index.html","fad3a2b9602f9e365e99d5ec8f3ea328"],["/categories/Book-12/index.html","7fe8ef9a65bd0a1594656a4963a182f8"],["/categories/index.html","9589b2aa47294538ab1a38a2b28ebfea"],["/categories/一个叫欧维的男人决定去死/index.html","8eb62830753a531069758182418ecbf7"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","054315cc0492fe6f8b11c2f61357f7f1"],["/categories/剑刻鲸舟/index.html","415ed5eb53a3663cceec4f17e7585981"],["/categories/剑刻鲸舟/page/2/index.html","451a0a612cc8e9105754edc4ad820a2a"],["/css/app.css","137b98666542a6b2ea5c31eb90ebbb2b"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","e1dda0d005114a93612d21c9744a671e"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","eb68cba25d4fcbdc6720db695db55686"],["/js/app.js","645f51518bf274a01faff379d9e0708b"],["/page/2/index.html","61354f53a5c7d070eb2ca46e8d49839a"],["/page/3/index.html","e1ece00a95d311a05c2b8f87c5b8b8b4"],["/page/4/index.html","71a5c09a8bd123412e3f55960e4b37b9"],["/sw-register.js","981b7056b9d4b540002684926cae8dbb"],["/tags/index.html","f62f4a1014adf92789baf9c8c4066962"],["/webstack/index.html","697ba35eeaddc78feb613aad13d9c56a"],["/zishe/index.html","900c6b39d925b9c29c6efee9c9c661e6"]];
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
