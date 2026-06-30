/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","25f72b028c59f4b8a56e6f8b608b32e5"],["/2025/11/01/Book-04/01回响/index.html","b9e9d48a9fb53d4b282608fb6d469c1c"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","e741c4a4e31d1a348b6460603ffcdc13"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","1b8c0af0ca16fc0154285816fb3567eb"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","9de9430681d8e6472f39eaac0a909b61"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","0a0717f4b1d2b5becffe8a9fbab851ea"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","5bcb53cf01b5c599d501a5c414e8bf24"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","e7304b29dea073df0f57f242d89f393f"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","9ea67c21063b616f0e6881e332d975e9"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","02f6994735a4c2e04a35fa4c9df6eed9"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","90c7654399c097f245d65f110b977d72"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","0e4911b801ecd80bb76e4b78442a062f"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","59801138409551eb3f467c734ebbe1c5"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","e4f131ab9f9c892dc79a8688492709ba"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","0f4378810b085ee5c12d27b106a8f76b"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","0e00f13d48330079fbc8dd6b6187f884"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","4969e43012f40d91e752702e0a2e2650"],["/404.html","3d382aa1efe586f4d96d18e25049cffc"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","4b996579b3caece2783cd94044f3d235"],["/archives/2025/11/index.html","0af61e1c60ba43db3af2c925161e1e02"],["/archives/2025/index.html","463c5ef7d93fc98eda839c09eac4151e"],["/archives/2026/06/index.html","a128630d73612427c15b0cbbb96ce8ea"],["/archives/2026/07/index.html","c8f4b0fd5403601ca3520219f1d8b4a8"],["/archives/2026/07/page/2/index.html","466a13dce9d80454feec8dc446af521b"],["/archives/2026/index.html","40422203f4f0e5ecf018a79fbb80fa3e"],["/archives/2026/page/2/index.html","7f1a2cbd8d4944284747c5f6c1816c12"],["/archives/index.html","334081d4e930f5853f63ab4ad993c216"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","add32c8f0f9076ab47bb4d1030ffca64"],["/categories/Book-04/index.html","7b7cbe68848f5085017dd67672cc8392"],["/categories/Book-11/index.html","31c62d849cb1e42bc7b7260b9407e935"],["/categories/Book-12/index.html","26a04e0c11f184bba187f8c14372ccbc"],["/categories/index.html","dce4d52aca91da8138d406d9f9795b24"],["/categories/一个叫欧维的男人决定去死/index.html","5a300fa828f08f9aa3f865dc6ef3fced"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","5adf0d3305bda9bb3702d637b5bb0f73"],["/css/app.css","eb07bcb17a1dc998a729947591532fc7"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","8e7c22283179f4a3e987b298f843b675"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","bab5c09473c793c4b0242ac916dc5524"],["/js/app.js","b36228eaf295a2dbc2587ecc4b0e32ac"],["/page/2/index.html","57b62b7fb156b10557accf67fcc8fd73"],["/sw-register.js","e7fe6b1bb35ad16cb823489c055398f8"],["/tags/index.html","d1c9a81ac4d3a7b962a94d9d057b79c8"],["/webstack/index.html","b6d5359aa6a8b66b0d1d4f842cc8d0f2"],["/zishe/index.html","ce896018ca3fadcaba03d207abe85686"]];
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
