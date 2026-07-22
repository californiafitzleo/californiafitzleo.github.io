/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","e9d41145d58b16cc3ee87dabee63ad0c"],["/2025/11/01/Book-04/01回响/index.html","1d3828ead45e3185ce11162d8e523924"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","5f4b33e570736cab110f983eb66aee86"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","682dd2bc1415ba72362e578d2aa6b0bb"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","130293ff42a4faced95f627d961ede07"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","9f9378ddda58b62adec8dfdbd4717782"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","a9fa6e840af77bb45ad03324fcfa8556"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","7c439e4722665b73041c6307a2e0c381"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","11e6866b2de3d87790e6f26310b9e81c"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","8cbed9495e00b943e45cdfd5045f9d27"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","28a744deb60e91b77c1d4af74d6e99ee"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","97b38065ce47660ec9e2a8e76989428e"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","a29498acfe16b89daa637163df0fff9a"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","e5e761c1597cc277eef102d316d95f4b"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","b394b1500a2ea57c8284e694db59dd4b"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","5781f463297c8780460a1bdf0ccd44f9"],["/2026/07/09/Book-14/02第二章 渔火/index.html","91a90c8de3486aa17571d8b547fd3440"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","4400ca6c4a7d2a4c80a63c1eedeb9352"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","c9eafc52757e86c772bb53492ba76018"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","1876ebf77113bf54824b99fb7eda48e4"],["/2026/07/11/Book-14/04第四章 断芦/index.html","270f3a69c155f3071b3e0777cf2dc262"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","6381b465cb741377ff801f8da3687e32"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","c0aee97465e645e3fdc5f2259e1ccd22"],["/2026/07/14/Book-14/07第七章 绵针/index.html","071e1a5e7eaf9bb5e3aa4132b5043fff"],["/2026/07/15/Book-14/08第八章 分粥/index.html","b7be94ea45c028b4fff9905a448fc310"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","7351c6247be01bc76551833f006565fd"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","345f2241eb7154c58449626a8bab0728"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","a878caa43350cf65c18bc1557816f42c"],["/2026/07/19/Book-14/12第十二章 红/index.html","c816f450203f3fa5b2260de514c92107"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","8aa557b1b4f4eaefb0fbe15df1fda080"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","de33323558327a8a58dd87187103cdf9"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","776fd43e9bba7daa743db89ce8fcb3a2"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","2bb79af9f7132010c0878888640b772f"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","1022ea862a09c957ba9dd57001fad3b6"],["/2026/07/25/Book-14/18尾声 传风/index.html","f7ba5ea7706f01bab879fdf865ddddd7"],["/404.html","d22bbc1ca8ef8ba432cc8934395be110"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","703ec3a0c7073b1ed1bb7a02af7977a4"],["/archives/2025/11/index.html","f342e38decbcab45e41084b93469d3cd"],["/archives/2025/index.html","937345635c42a696043527e8c7360a91"],["/archives/2026/06/index.html","09a6b606835c4f5416c06126f2df460f"],["/archives/2026/07/index.html","5158ceb7fd4efb4b49703cc1ccd7433e"],["/archives/2026/07/page/2/index.html","4f2dd19a358636807259759ff035a549"],["/archives/2026/07/page/3/index.html","d4ceb19e2407ab6753ab915fc05ac83b"],["/archives/2026/07/page/4/index.html","4cc050b584957d4fca4a33255096087a"],["/archives/2026/index.html","858c175a2d81db7c8f46e5898c030489"],["/archives/2026/page/2/index.html","1fa66ac284abac93754375b1e76f1acc"],["/archives/2026/page/3/index.html","dce1bcf9d4cfae227ce705e138fea7fc"],["/archives/2026/page/4/index.html","986f7ab29d894664a621c3ca63892ad3"],["/archives/index.html","f622d5d7ca33bf89e55d449472c83a4d"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","b4614ff59a62b5fae3a12ea22392578b"],["/categories/Book-04/index.html","318a6c49940e5de18fae687f92a7c9a5"],["/categories/Book-11/index.html","e8a395d3c284f68b0cc8cc7a66d3817f"],["/categories/Book-12/index.html","410d77bbb1fef33ba7d46ec298d39768"],["/categories/index.html","253f6c155e54c6aedcc874d527282005"],["/categories/一个叫欧维的男人决定去死/index.html","4b153d7bc80b555b713c92baa5d90447"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","e04fabc50665bc0267b064acf9e9ad7c"],["/categories/剑刻鲸舟/index.html","942ca09df9c96006060121fc2172dfe9"],["/categories/剑刻鲸舟/page/2/index.html","68fc03595c1985ed8a3eecf8febf3ee1"],["/css/app.css","85a89943d8dbc6fa561e7f1af46a9055"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","cc9fe42e2139a49135346db6eb091c45"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","f1bca08c252fc68fcb76f55baff5210b"],["/js/app.js","0a5a260deac009fc3d74e5bc5f9b3d42"],["/page/2/index.html","4e2c1dc31744b3fcbe1b0136dc80bbf2"],["/page/3/index.html","dbe670ceca9efe2c8acee1a9ec677971"],["/page/4/index.html","018f59628b33e55639a1e951e8972f8f"],["/sw-register.js","835d6f4c043ec2533e72401ff4571b22"],["/tags/index.html","2d90a1e4c88e0b37a76a9360b83799b5"],["/webstack/index.html","680896ab351811da7b4fdaef9200c0c7"],["/zishe/index.html","e27e98748aad860d9c20cb82a7198e52"]];
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
