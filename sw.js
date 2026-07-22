/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","01abd9ad379ff0366f3001be4fdedc8b"],["/2025/11/01/Book-04/01回响/index.html","f6076f231c8455060ece732fbcb62731"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","a631bf9f7082d1005c404611f5c91f7b"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","78a63e7586f4bd5fa7d76089fb50e1ee"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","a5f6c945fd7a6f22cdcedb73018aacd0"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","f059436c5c4f15adf0c579ae4ebe4711"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","ee4588a430ddbfb69cf4d693b0111365"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","f7e8a8de7ddec60bb23961860f9d989d"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","4a5c79963153e30b5157aed02439ff71"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","9daf552ab8483a027c712eb5b3ab843c"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","11c1eac943a442317bb9aefbb485d9f8"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","9315149a956c8e4dfeeeb19f1043f50b"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","53a620dfb5aa8939b271a1e298fbf851"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","e96700943666802bae5c564ccc3e184a"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","d8aea109c293782b57b74041dd47eef9"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","f16930de9129c31fa42422e1b6518c8a"],["/2026/07/09/Book-14/02第二章 渔火/index.html","13ec439ac359a77834b4704e0357df63"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","2949cbbc9a394f33750ab5ddabe3d96e"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","338aba07f9cba90af16f682ee757eb83"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","a79220ea5f38baccf08583d0223fa052"],["/2026/07/11/Book-14/04第四章 断芦/index.html","75dd8daeb603aae3d12121b5069d4699"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","669c04e5c0fabb526f7bc36368bcd9a5"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","65c1aa70bbff46d86b97387710bf3452"],["/2026/07/14/Book-14/07第七章 绵针/index.html","c39da8eb9a92ffe99ff738e7c24c5931"],["/2026/07/15/Book-14/08第八章 分粥/index.html","fc1ea759727da618d8d315b83bcb6da8"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","e3d4d3b15468ee77d4ea886187be46a9"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","0e8f68394341c57120c89d39bed9ef91"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","f8f4c6fbeef62722e3716b05ad315c43"],["/2026/07/19/Book-14/12第十二章 红/index.html","636cb1c8ab8fe162707d91fe6717913b"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","59079ed2b6ac97a30f9c798730d785b0"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","1aa52be8379e3782c59e4a20353eb0b2"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","1a8e6d4b24fc6fdd79e8846f22039643"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","f2d78cc064312a57ed623991c312bed4"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","a7c7390064e10ef93a30c0adf1ceea51"],["/2026/07/25/Book-14/18尾声 传风/index.html","00a0a6d898824db2e72161aebb81a693"],["/404.html","0da5763634a051ed379f065886c96933"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","1df6efae395b66ad548dd96728c28cf7"],["/archives/2025/11/index.html","252a5c99be7a5152b45e75aeec0b1445"],["/archives/2025/index.html","982c67a27b0f78fa9e49aac5e299cc65"],["/archives/2026/06/index.html","eb37fe751d10cf4a1e06a77bb9caa1b2"],["/archives/2026/07/index.html","98ad250cddf6674009c77565ee959083"],["/archives/2026/07/page/2/index.html","7fa465c57076da213fe78445f6648255"],["/archives/2026/07/page/3/index.html","cd9c0010547bf7fbff0d3cd7931cdfed"],["/archives/2026/07/page/4/index.html","889bdb18ef35c31a43ce1f144b0a5fea"],["/archives/2026/index.html","11b0a4348188e562e53ef3915c6f9ad3"],["/archives/2026/page/2/index.html","fca4bdd6bc07acabe227c7eace634a82"],["/archives/2026/page/3/index.html","edc3775cb6079ce58265fac03782c416"],["/archives/2026/page/4/index.html","a7060977b84e5713e5bc3f27a5707989"],["/archives/index.html","081dac08dc3b60dc6863b6a1fa00848a"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","a46074c59f253a0af16dee6c16982b44"],["/categories/Book-04/index.html","cb2325f3f32fc624308ce130631011ee"],["/categories/Book-11/index.html","71f23d433c6ce71310700d7a7b58cdc4"],["/categories/Book-12/index.html","b529f8bc4831d4c95684a22a553285cc"],["/categories/index.html","754e9bfa0644c33ce52095fbc0d42916"],["/categories/一个叫欧维的男人决定去死/index.html","5dae8a34d030b72060df5f16d4d6e37d"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","fae0e043d5e8e6c4de6ebef71396737e"],["/categories/剑刻鲸舟/index.html","776c3c4d31593259e064bbc88128a245"],["/categories/剑刻鲸舟/page/2/index.html","c5ba71e577d33977f5678203c81a9ba3"],["/css/app.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","62e5877459b8a7d0b26b06eab799e6eb"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","6427d0df57d57496c0f11239b82790b4"],["/js/app.js","645f51518bf274a01faff379d9e0708b"],["/page/2/index.html","8376ce1adc54528e9e54ccc05bcf6525"],["/page/3/index.html","01f7492df7850cd823cf7631391cea2c"],["/page/4/index.html","8e5a2b0693acccb780b12613667c3a7f"],["/sw-register.js","9ca811a412feab4e13057f3ba5bbaa4a"],["/tags/index.html","62ac8fe2bb09383dddce6f79c89b9dde"],["/webstack/index.html","681d9b2ffb553eb1ede853d3e18eefa1"],["/zishe/index.html","dcebe36b9b700ff411c8c93c21f45b9a"]];
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
