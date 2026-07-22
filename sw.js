/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","7750c112d256c91ab9af385d0c4a4dfb"],["/2025/11/01/Book-04/01回响/index.html","ac585b8650fe4ee40089cb6d6c35fdf1"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","e4582dfa0b7c92b12bec679a74fededd"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","57c5802f57744cb4325c02f5f255a468"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","053b0ecd002afae73534768591df42a0"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","f65a6463dfd8b6163bebda8c962a41c0"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","614ce9d4097f08ee4ad2934a046d1b39"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","ec335d1f96171b8b45b1847f92819815"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","bc3c29e3b359269c9277cbf999c90ecf"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","5ed5feef291738035a1a54860b64e974"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","a72a4b40a669d9b62d89a03c82972730"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","ff7653e9e637b4df7854cf21aa3932b1"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","2ce787394087a71be530edc5a15370cd"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","edf614935b51c6cf4286d9bbe474975c"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","b5d9f055021bcdf7b9bfffaed92bb635"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","9f9ae278bc8b8e503e6bcbd17f92bf28"],["/2026/07/09/Book-14/02第二章 渔火/index.html","ff9810e3388838af04dce9e0369f4c2d"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","4bbef12e7c4b907f9920f8be0c0ba297"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","ac34f70b15555599909e4a63dc2373c5"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","ac50da1db237b8bc34a5e4cd3737262f"],["/2026/07/11/Book-14/04第四章 断芦/index.html","967e8767ba5b0ed7f3fc796acf981008"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","d946733c7e0975c183346311160b29b5"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","25b467785e60f352afad2d7c70c5ec68"],["/2026/07/14/Book-14/07第七章 绵针/index.html","42336ab05aefd1ad9361f68b775e1aa5"],["/2026/07/15/Book-14/08第八章 分粥/index.html","018ae6966b458cbd7b4b4e7b85bc707d"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","b1f9d750293738851bf0a3b4d1ea481e"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","1d044e734f036886f957daa92b8ecdad"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","61404b994ff95a6c753912f94d1d724b"],["/2026/07/19/Book-14/12第十二章 红/index.html","4837e4e85937e8b611bda3798521e4c7"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","70b01df029858e056d6ba5007ee971c6"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","f2ce85d88793de68bc8e46a0c9ce3c8f"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","808e2963fbe0b0e1996905cd2cdd40ee"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","f210059914f81739ee82b6018fcb48ef"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","889bd9f01fdd04add0ad9e4e7d89874b"],["/2026/07/25/Book-14/18尾声 传风/index.html","f52254a2ec85061277fb87f6a0f39051"],["/404.html","c568622d59126eb2bfed7ea56b54b6a7"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","f67d8cb25866782c8ecc6bd5a133b811"],["/archives/2025/11/index.html","aa46e1d135f6c4dd865a61012c1ec25e"],["/archives/2025/index.html","826f2a12b174657fc78aeb9bd56dbb6e"],["/archives/2026/06/index.html","0405de9c3bbb4f1528ee470b55fbb12c"],["/archives/2026/07/index.html","1d1ea6c1cae77abc1c9a76a06c30bc0f"],["/archives/2026/07/page/2/index.html","466aaf35a1c3fa8ef0a2203d378eba4c"],["/archives/2026/07/page/3/index.html","0005ccabb2cea087fe6155e7777e6a9e"],["/archives/2026/07/page/4/index.html","34c29f944d2ee8b44ed66f4c3399e8d3"],["/archives/2026/index.html","b8861f73aae7c863de7565eadeb0d9fb"],["/archives/2026/page/2/index.html","b52a986bc839deafd8996398b937d2d4"],["/archives/2026/page/3/index.html","0a85f3ac652ac27a8e218145cdbc5f1c"],["/archives/2026/page/4/index.html","24f5b8fad912d2050651cca6e00acd56"],["/archives/index.html","54dd3d7069135b81155a05e305eb0e2c"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","6f0f324f24b7c88ea5858c6a96e20032"],["/categories/Book-04/index.html","7ab9ba3467686e581b77075addb9902f"],["/categories/Book-11/index.html","7e7140eb37ff4e05aea766384a0b80d9"],["/categories/Book-12/index.html","8ded1da5568913f30cd2a9bc8f11d47b"],["/categories/index.html","c94744c4c84ee260d6bd16ad91196133"],["/categories/一个叫欧维的男人决定去死/index.html","37e6959813288111e1fba2771b5c9081"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","26e089a4431ef03aef5379253267d626"],["/categories/剑刻鲸舟/index.html","5c76eb6f61ccefc33db8404bfb289816"],["/categories/剑刻鲸舟/page/2/index.html","b370be065fc1e7921b8a705e545898f4"],["/css/app.css","75701872d050e9347f4edc0226119a51"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","a5f0d3fe59c053b3f724a08237dbd581"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","d6e239256a265fd9aca56beee3301e3c"],["/js/app.js","280bc66d7d3ccb9e5f7fe76b2dc3fb62"],["/page/2/index.html","56294f43230a0b56a291ffde303c3a68"],["/page/3/index.html","5645092f950d50781af01297f5dd8bcc"],["/page/4/index.html","c23193be2af264737ca5ac5e4a9b7ee3"],["/sw-register.js","9d2a7abe82520cffdc427112d6f7c578"],["/tags/index.html","6f0993c60d66e339229ca2b155854217"],["/webstack/index.html","8ca906cebb7c12fdff71f2578606f826"],["/zishe/index.html","efdcb50eb23de400e6046cb948af8e2e"]];
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
