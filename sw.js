/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","1267e10d1162dc0ce20c157096fc3c9a"],["/2025/11/01/Book-04/01回响/index.html","748d3ac99d0d1fcd69998e835b848c1b"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","8af97fa82a26c9089ec35f000363cc06"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","6cba67a07dc57d654938059d58adf3d0"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","7acd6d5fad1a095a380d9396b77527a9"],["/2026/07/01/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","cd6d147e3387498a2355b3923ba7d5e7"],["/2026/07/02/Book-13/02一个叫欧维的男人在小区巡逻/index.html","9b0f2b1fb013620aa5c15f30262e0e34"],["/2026/07/03/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","6a6145710f174befe6c676486d8d0419"],["/2026/07/04/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","a21e6f99aa67ba3b033fa3d8d4182ea2"],["/2026/07/05/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","367b1cef569f66ddc2c58e3b891eee4c"],["/2026/07/06/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","db570c201d698df8b26a67987d59b2e4"],["/2026/07/07/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","2ce2cdf55aca27babe556260ec5055ca"],["/2026/07/08/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","d766d539bfba2869414c7dfdf551f1c5"],["/2026/07/09/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","5b971ba82c4a9549ae77855d593de194"],["/2026/07/09/Book-14/01第一章 大风雨/index.html","7a8b6a6ba91c7f739650f46e17fdab68"],["/2026/07/10/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","39d3f6b14cc46d93445d816509789692"],["/2026/07/10/Book-14/02第二章 渔火/index.html","7322e1b9e7045e1ac3c320023b2ec0a1"],["/2026/07/11/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","aa72f9eba2ebfc5c5c7b9e00dc08a734"],["/2026/07/11/Book-14/03第三章 纸鸢/index.html","df13a9afadba84e4bb7452dbad5d6d81"],["/2026/07/12/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","8183b837a8f8f2bd4bc62fa60e4c964f"],["/2026/07/12/Book-14/04第四章 断芦/index.html","e66df9268cee53077bc625f9665cea42"],["/2026/07/13/Book-14/05第五章 秋字令/index.html","862baf2df7505760ca40a114436f01e2"],["/2026/07/14/Book-14/06第六章 此生五百七十错/index.html","cd2deecebbed254e86a709f51c3b8a50"],["/2026/07/15/Book-14/07第七章 绵针/index.html","14785b17434deb17841050a287c3e360"],["/2026/07/16/Book-14/08第八章 分粥/index.html","1187cf6b60060b19793b826a12792cc4"],["/2026/07/17/Book-14/09第九章 荆州剑客/index.html","f9a2fcd6fbce4da81f2bdbb99fa36f45"],["/2026/07/18/Book-14/10第十章 江声入画/index.html","6d9baf6408e2bc075152b09101db49da"],["/2026/07/19/Book-14/11第十一章 鲸鲵/index.html","c2c07ea19f6a89e9a9204b4d84fb277d"],["/2026/07/20/Book-14/12第十二章 红/index.html","9fa1943ace43ce191ba01b39b87da303"],["/2026/07/21/Book-14/13第十三章 夜泼针/index.html","765d514fbb31b830f2451c52f356a807"],["/2026/07/22/Book-14/14第十四章 鬼迹崖/index.html","7532cb8921d8740abae494ab99f2ed8c"],["/2026/07/23/Book-14/15第十五章 郓州雪月/index.html","0f1bcd743d2d86fbc743c70788ab955f"],["/2026/07/24/Book-14/16第十六章 绝径/index.html","c4596c78042e0da078d7e626465a42ca"],["/2026/07/25/Book-14/17第十七章 无声无形/index.html","a396a24a3c9dd46a68f2126153d8fb3b"],["/2026/07/26/Book-14/18尾声 传风/index.html","3db39a37617ede519d645f0d3e5c759a"],["/404.html","1932ebaa94a78102d12b79a1e029eeee"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","269c4f9e5b6b5ade6b75bf4b51ff3195"],["/archives/2025/11/index.html","6aeca38a1fea4050228ace81b9fcb570"],["/archives/2025/index.html","4ae4876f6397c4c34cb5404dd3b4f788"],["/archives/2026/06/index.html","d14fc69cfceaa28d38dfd43ed8f3e061"],["/archives/2026/07/index.html","9f1b19d8e2c4dfab9c41b254b42bb29c"],["/archives/2026/07/page/2/index.html","439910cbf07d32690b76326485a93392"],["/archives/2026/07/page/3/index.html","df87993069270fb7157888fae2af326d"],["/archives/2026/07/page/4/index.html","da81cb393673e63cadfedb62e676ed5d"],["/archives/2026/index.html","e3bcc1683a836c1c7ebc73a6979f8da8"],["/archives/2026/page/2/index.html","e865cd588caebb0a678b2d03e4517872"],["/archives/2026/page/3/index.html","e59c92b8eca61ffedc6ea122eadec1da"],["/archives/2026/page/4/index.html","ed1f1f20346c4b3ed56f593b11d9922f"],["/archives/index.html","41a549aa42eac060931b9979d1669137"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","64777d2f872c5fbf71c898719a29fea6"],["/categories/Book-04/index.html","a2aac846e04c2d3406ea2e3147b59eda"],["/categories/Book-11/index.html","ee6d6a5fa790d8f92eb579c52805564b"],["/categories/Book-12/index.html","8c1730f5245f3d7ebb91f766ad9fc707"],["/categories/index.html","aebd9bc371a3f126f446f840b0d585ef"],["/categories/一个叫欧维的男人决定去死/index.html","1eb812aa8e05b2dfe951e217b8df8a86"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","9a8d7f8b0998c9c06d263df93381bfed"],["/categories/剑刻鲸舟/index.html","c4afc0761a1265dcd4c16be90c527743"],["/categories/剑刻鲸舟/page/2/index.html","2148aaae5eb21bb6f70f948a8291d21e"],["/css/app.css","a8622057859d975c54644d448d8dbd35"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","266517ac6c6835a9e4f9379dbdb5ce65"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","e67639a80e9511587a08359bc7740624"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","e3efa38f1651ee23618a8e0be6b3834b"],["/js/app.js","8e80c4732e74de8ae0985dc11c4af435"],["/page/2/index.html","24ffcf5626d89d8c32ccb4111751f9ab"],["/page/3/index.html","e6c4340348883f33605ccbe481063db9"],["/page/4/index.html","696b6c7be4df885512844c56abf90831"],["/sw-register.js","388c7bc333cc01fb9386f693d3dff2c2"],["/tags/index.html","bb0e97b5050fe6b96c837cdcc777fa71"],["/webstack/index.html","46d7045eca2a2a6e31c7e06bf51f0e0c"],["/zishe/index.html","1bee41c33a531e74396d647c7b8bfca8"]];
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
