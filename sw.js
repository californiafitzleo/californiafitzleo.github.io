/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","287e8a2aa7b276a5fdbcba18b9c06ee9"],["/2025/11/01/Book-04/01回响/index.html","47ba0c51adc40fe4e77e30ec5c57b487"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","8048b033da9c59c5e62b9d4b767423be"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","61fec3fa968e2cabd0068e9c65107a98"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","4510edd4ac7f800288e7678df100a90a"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","d6f7ea7118f523abac77c591bfc57c1a"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","ce8b563006fae4843678c768dca9a912"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","02eab63ad5299b73dc6e76e0c07395ef"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","43bc0d42f19e3d6eda089ea002691ef0"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","56012640d378c9c1636083b74ab05b17"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","282493da23bcb2b7ae4084638b8541c9"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","426893ae68b2da55cf58083c908de303"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","8c8ff0d7bb0d9e770f45d6925168ef33"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","eeb9f6f3e63d228020a5d7e1b8ff97a8"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","553983138b3c0be7d31431aeeeb9c85f"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","d8064e2218bfe874f1f6f5a1071e0513"],["/2026/07/09/Book-14/02第二章 渔火/index.html","b6b9f9a734bcd77a6c78d0ede9be3d06"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","25e15023d590060c192f2a93f9139739"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","0de01c313cab33e317671916d716980a"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","5bc35fe8e110d5d412c2cf3e26348b6b"],["/2026/07/11/Book-14/04第四章 断芦/index.html","37b8a42487616bdfa6614269e5d93045"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","26901dc824ff2b3ae934fac185471cb8"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","571cc5affe83ac9764ba68befc8d9e1c"],["/2026/07/14/Book-14/07第七章 绵针/index.html","a930540202fc7e490c6cedfb85796ecd"],["/2026/07/15/Book-14/08第八章 分粥/index.html","1d218f31ac1401dd65d5f9c38343dc8a"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","1e0594273ad3e9f2dc90bde9c09e6a5f"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","fe217133a879af9079dd2be1659aec66"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","41790544b6dd2431d85901526fe5c527"],["/2026/07/19/Book-14/12第十二章 红/index.html","4d587dc63f79b01bbf0c8e3e489f78e4"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","d87afc3531eb0ff5f5c20fd4308de6f3"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","061735ed59a4603628f35588c072f1d1"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","7efbfcdefdf218b74b008ddcf7ef79cd"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","f65fd614c5a8087841f52994153ce0f8"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","f905925b45bb535d6f8137da5e162d3e"],["/2026/07/25/Book-14/18尾声 传风/index.html","8fcc1fb3613c3ea86e2d7f0fdb151765"],["/404.html","87f662ba3daf3ed8956cdba70c9eb50b"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","81f6ea4ab0ba6e6546a96ee033788f1c"],["/archives/2025/11/index.html","b6a9272bd71fb6e4280425fb3b3a4594"],["/archives/2025/index.html","fb10fe2db29d359c4ba566a2459986e6"],["/archives/2026/06/index.html","88dd22acbfa1cc66d1e0969e22e9534f"],["/archives/2026/07/index.html","441266b53e5e64336cdab136341fec32"],["/archives/2026/07/page/2/index.html","def3c62ee94a2565b5635cefb5d33bac"],["/archives/2026/07/page/3/index.html","69b83f9fff86d1124e74d59fad54ccb6"],["/archives/2026/07/page/4/index.html","eee0f83ab2a9653c9311960a1c12e80d"],["/archives/2026/index.html","cc4143d9eb0ca112a4c69b56dbca381d"],["/archives/2026/page/2/index.html","36ebb7af1cc7aea5051970dde63b5f87"],["/archives/2026/page/3/index.html","873322eb295741d7dc4927607b06ccdb"],["/archives/2026/page/4/index.html","062f7e2f2dbf399bce554ac9cfa79266"],["/archives/index.html","86ad4ddd4ce63355f9e3b16c56bb9e94"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","e2720d975fb1bd2fe16f0ea523e68fcf"],["/categories/Book-04/index.html","15a9c6562607147adb0ff80647d76548"],["/categories/Book-11/index.html","b20670e1183fa01c5dd9cfe0a5c580e4"],["/categories/Book-12/index.html","7b26c44006d6a06c7d2c8dd021c63124"],["/categories/index.html","4e3162505679b384127dea8ad0b36250"],["/categories/一个叫欧维的男人决定去死/index.html","3953fbab1beaf6c1ad8d8445f8eb0f2d"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","435d6661ed8d7b2cba40fc86b0bc3a02"],["/categories/剑刻鲸舟/index.html","2690d7f2a96daddac368d6b2e28b6d99"],["/categories/剑刻鲸舟/page/2/index.html","70810b119fff19dc9f7364865db63ac9"],["/css/app.css","11662fa37fbb260c0c42e46bc57c3f89"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","2a55163ac560f4abf4efca0497ff28e3"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","9d398d2d1b8bf3ce004b7a876ad44929"],["/js/app.js","c49c15f01e2249c71eb40186e15b1d9d"],["/page/2/index.html","52b0e14dccc00383e734c976e7ba330f"],["/page/3/index.html","eb96ab1823b0787889032ce41bcbf8e9"],["/page/4/index.html","598b0030f7d6d7cfa994cd3f2bbfb7f5"],["/sw-register.js","e1e9d658a9f4bb50eec2d1528a6219db"],["/tags/index.html","958bdf6c60686ab6f7ed27f6f183252b"],["/webstack/index.html","52fbfbc9187573f0d65a3f787536c161"],["/zishe/index.html","9ceeb20d9bd0b59ee68746e1034f95fe"]];
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
