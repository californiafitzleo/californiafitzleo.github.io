/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2025/08/01/Book-01/01第一卷/index.html","0e0fb0546667d82c63d006ff078858a9"],["/2025/11/01/Book-04/01回响/index.html","c3095a886d5f8e483db08e759076293c"],["/2026/06/01/Book-11/01秃毛黑熊/index.html","007cc5d1f851eb57e853fac7423d728a"],["/2026/06/30/Book-13/01一个叫欧维的男人买了个不是电脑的电脑/index.html","5d20c8654b5c2b7c0c85d9d5a1d0be51"],["/2026/07/01/Book-12/01姜汁黄瓜/index.html","899285ae16612883c76495c1871d2776"],["/2026/07/01/Book-12/06凉拌羊肉/index.html","7e226751a1572b03741580269ae7143c"],["/2026/07/01/Book-13/02一个叫欧维的男人在小区巡逻/index.html","4f1f46b047b3f52a530ddbdf01ff07fc"],["/2026/07/02/Book-13/03一个叫欧维的男人和一辆该放哪儿放哪儿的自行车/index.html","4009cb37dfa710e2ccfe41bf66f19363"],["/2026/07/03/Book-13/04一个叫欧维的男人和那个不从梯子上掉下来就开不了窗的盲流/index.html","40f0ff4f822ee2a323f16ee43449c6c0"],["/2026/07/04/Book-13/05一个叫欧维的男人和一只雪堆里的猫崽子/index.html","dc2643971e56a5534370489a66314598"],["/2026/07/05/Book-13/06一个叫欧维的男人和一只本来就不成样子的猫/index.html","73c3f444482bec55ab54c79c56f04dec"],["/2026/07/06/Book-13/07一个叫欧维的男人和那些饭馆里播放异国音乐的国家/index.html","33b8b654ec794fd1c3b5f753f9b74460"],["/2026/07/07/Book-13/08一个叫欧维的男人和一辆一去不返的公车/index.html","69fb99feee472cd517a1752307e14237"],["/2026/07/08/Book-13/09一个叫欧维的男人和一个用彩笔画画的小屁孩/index.html","0f66dbec4cff84fdb2de26bfdb4e854c"],["/2026/07/08/Book-14/01第一章 大风雨/index.html","77ed00d703aeefe7a321eb4eeb6bc22f"],["/2026/07/09/Book-13/10一个叫欧维的男人和一个再也没人会修自行车的社会/index.html","478d8039aba8b79fa7c9fc7b2bbec36f"],["/2026/07/09/Book-14/02第二章 渔火/index.html","ebf4d261c4158ea4a7148d738718bade"],["/2026/07/10/Book-13/11一个叫欧维的男人挂着拖斗倒车。又来了。/index.html","c8ba0f52ca9d1e5821990d510fd45569"],["/2026/07/10/Book-14/03第三章 纸鸢/index.html","3fb4fd8f84176adb4c4a63c4e9039fcd"],["/2026/07/11/Book-13/12一个叫欧维的男人和一次非比寻常的巡逻/index.html","b957aa894fa58d7c53959a04bb920f20"],["/2026/07/11/Book-14/04第四章 断芦/index.html","a6021b629e60df7d74b72b27ce536709"],["/2026/07/12/Book-14/05第五章 秋字令/index.html","0d27ba5e93a129bbaf2cfc93fb997681"],["/2026/07/13/Book-14/06第六章 此生五百七十错/index.html","32758a7db7dd7603a48b678866ef525c"],["/2026/07/14/Book-14/07第七章 绵针/index.html","d8861f135ef9fbde520b5f54bf8e0fff"],["/2026/07/15/Book-14/08第八章 分粥/index.html","fece890bd9f5d95b95d823c18581cf49"],["/2026/07/16/Book-14/09第九章 荆州剑客/index.html","d001e6e30237f606fc693b853b270fab"],["/2026/07/17/Book-14/10第十章 江声入画/index.html","20595fdfe5d2b5f8457ab26e3df9b663"],["/2026/07/18/Book-14/11第十一章 鲸鲵/index.html","933bceed474ef31d2ddab698d5b7b568"],["/2026/07/19/Book-14/12第十二章 红/index.html","c448c3fafcf7279cecf9d874e2f15dc6"],["/2026/07/20/Book-14/13第十三章 夜泼针/index.html","1c20af1bd16dd45753eace331ec55976"],["/2026/07/21/Book-14/14第十四章 鬼迹崖/index.html","bd9f6bd35d4a1bbd4c83a31ab78501f1"],["/2026/07/22/Book-14/15第十五章 郓州雪月/index.html","17efb8828db24476d13a00718f29de67"],["/2026/07/23/Book-14/16第十六章 绝径/index.html","30304af97a018332cbbae8c6f9f9c90d"],["/2026/07/24/Book-14/17第十七章 无声无形/index.html","50525b38a258f613115049422495c091"],["/2026/07/25/Book-14/18尾声 传风/index.html","1c139f06a67bc47d255aad39e60b78f5"],["/404.html","0ed51d35386c4cda4ea5c06f8aba7178"],["/Book-01/cover.jpg","7cbfc6089e6a0ed097139c901d891e96"],["/Book-04/cover.jpg","a29da6b706c1deb7c1f983ecbd3f584f"],["/Book-11/cover.jpg","c747ad299e92ddec5614e18933d12ecf"],["/Book-12/cover.jpg","d30342668419b0ef4d97b8ade76ae7ad"],["/archives/2025/08/index.html","806354cadb7b4cc375455a45d4fe3dad"],["/archives/2025/11/index.html","60417beb3961dff246c5269bd49a8925"],["/archives/2025/index.html","5575029bd57e3c7d76ec4a5a0b304065"],["/archives/2026/06/index.html","674884fbad47598ddd23838cb65612f1"],["/archives/2026/07/index.html","117a9149a82c6f7f42e8b00c90409f8a"],["/archives/2026/07/page/2/index.html","f1a68dd5b36232d28f271b5fbfda8613"],["/archives/2026/07/page/3/index.html","83f85fdfe2dc62a922d42ee6e60820ac"],["/archives/2026/07/page/4/index.html","f9077933ae3b8a8d528a45c1ad63ca8d"],["/archives/2026/index.html","3990a74c07c18fb4d786b0151a6ebafa"],["/archives/2026/page/2/index.html","e1761c6feb59969096f27437b974a014"],["/archives/2026/page/3/index.html","58fa515992835e5960608b6504b21669"],["/archives/2026/page/4/index.html","af35d6e9be000843ab6c78fdea8421e8"],["/archives/index.html","96fa5fa0ab9ad2bdd75141870371005f"],["/assets/404.svg","334ebe00d2b8902469725fe6051a37c0"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/assets/wallpaper-2311325.jpg","6f01af8d24d6d2de2564af30c32366b7"],["/assets/wallpaper-2572384.jpg","3637ba36e2daaeaa2bb438f65b0bff9c"],["/assets/wallpaper-878514.jpg","2bf9e4c5bf4f5fec55353a46bd3176c6"],["/categories/Book-01/index.html","2767b5d642f60ed03bd586c4a69849a7"],["/categories/Book-04/index.html","25dba57359abacaf9c32216d31da999b"],["/categories/Book-11/index.html","231dbb9e9c6d4f91de359a0168dc144a"],["/categories/Book-12/index.html","d166891ee468dfd46adc672c73ffcbc4"],["/categories/index.html","38032fba2bb881246d3382d53b2903ee"],["/categories/一个叫欧维的男人决定去死/index.html","cfd41ad8176d860bb6d209845a7c495f"],["/categories/一个叫欧维的男人决定去死/page/2/index.html","62f44a7139751b61eb2aa4bdb54beb28"],["/categories/剑刻鲸舟/index.html","20b9c579029a2f67c5875d8febffd643"],["/categories/剑刻鲸舟/page/2/index.html","09d430936cdf9bc0e3a1a82d534a76e3"],["/css/app.css","85a89943d8dbc6fa561e7f1af46a9055"],["/css/comment.css","dfbeae4795e5f567cd3e0cecdf130e3d"],["/css/mermaid.css","5d6c13df834fa72c1652cf6ec46096dd"],["/friends/index.html","1e96674fb84ef0a086b7c2995f537dac"],["/images/404.png","52d6ca721e50bf3fd2f09e0d2ebe6f6c"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.png","20acdd064e8a2d01bdf2895ebfa95266"],["/images/apple-touch-icon.png","c7e8e0062b8300b2134e6ae905db522b"],["/images/avatar.jpg","d2b99d7e60c555cc5b735cece1d3f03d"],["/images/logo.svg","9fa6ef06ed8e8abf09a6197688bef461"],["/images/paypal.png","0986db629960e3333415b103fa7663be"],["/images/play_disc.png","13a96370213881a22cfaa05bcaf1953c"],["/images/play_needle.png","ed199c599562491c1c27de4a8f3daa6f"],["/images/search.png","e576cdbf6d4df3f4587202d4795e0887"],["/images/wechatpay.png","f5325866f27983f7aafc80cddc28f949"],["/index.html","7e03a0ccc369693a56e6428e6b5d6dc0"],["/js/app.js","43a9c91e4244ff5e3955cdcb92dd303c"],["/page/2/index.html","664cd2274323765d132c3bb20cebf59f"],["/page/3/index.html","232273935cbe3cf34850792ea59b9dfe"],["/page/4/index.html","4af606b5b5131b6ad796b234d29d37f7"],["/sw-register.js","a18be0b9078686304041a63c862ec56d"],["/tags/index.html","6f722ceb450c7f947b8886037438b3bf"],["/webstack/index.html","88e6fadbf876fbc1f7fa887e1a010bc4"],["/zishe/index.html","168494daa350074c820e486d4594eda9"]];
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
