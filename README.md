# Third Party Web

This document is a summary of which third party scripts are most responsible for excessive JavaScript execution on the web today.

## Table of Contents

1.  [Goals](#goals)
1.  [Methodology](#methodology)
1.  [Data](#data)
    1.  [Summary](#summary)
    1.  [How to Interpret](#how-to-interpret)
    1.  [Third Parties by Category](#by-category)
        1.  [Ads](#ad)
        1.  [Analytics](#analytics)
        1.  [Social](#social)
        1.  [Video](#video)
        1.  [Developer Utilities](#utility)
        1.  [Hosting Platforms](#hosting)
        1.  [Marketing](#marketing)
        1.  [Customer Success](#customer-success)
        1.  [Content & Publishing](#content)
        1.  [Libraries](#library)
        1.  [Mixed / Other](#other)
    1.  [Third Parties by Total Impact](#by-total-impact)
1.  [Future Work](#future-work)
1.  [FAQs](#faqs)
1.  [Contributing](#contributing)

## Goals

1.  Quantify the impact of third party scripts on the web.
1.  Identify the third party scripts on the web that have the greatest performance cost.
1.  Give developers the information they need to make informed decisions about which third parties to include on their sites.
1.  Incentivize responsible third party script behavior.

## Methodology

[HTTP Archive](https://httparchive.org/) is an inititiave that tracks how the web is built. Twice a month, ~4 million sites are crawled with [Lighthouse](https://github.com/GoogleChrome/lighthouse). Lighthouse breaks down the total script execution time of each page and attributes the execution to a URL. Using [BigQuery](https://cloud.google.com/bigquery/), this project aggregates the script execution to the origin-level and assigns each origin to the responsible entity.

## Data

### Summary

Across top ~1 million sites, ~800 origins account for ~65% of all script execution time with the top 100 entities already accounting for ~59%. Third party script execution is the majority chunk of the web today, and it's important to make informed choices.

### How to Interpret

Each entity has a number of data points available.

1.  **Usage (Total Number of Occurrences)** - how many scripts from their origins were included on pages
1.  **Total Impact (Total Execution Time)** - how many seconds were spent executing their scripts across the web
1.  **Average Impact (Average Execution Time)** - on average, how many milliseconds were spent executing each script
1.  **Category** - what type of script is this

<a name="by-category"></a>

### Third Parties by Category

This section breaks down third parties by category. The third parties in each category are ranked from first to last based on the average impact of their scripts. Perhaps the most important comparisons lie here. You always need to pick an analytics provider, but at least you can pick the most well-behaved analytics provider.

#### Overall Breakdown

Unsurprisingly, ads account for the largest identifiable chunk of third party script execution. Other balloons as a category primarily due to Google Tag Manager which is used to deliver scripts in multiple categories. Google Tag Manager script execution alone is responsible for more than half of the "Mixed / Other" category.

![breakdown by category](./by-category.png)

<a name="ad"></a>

#### Ads

These scripts are part of advertising networks, either serving or measuring.

| Rank | Name                                                           | Usage     | Average Impact |
| ---- | -------------------------------------------------------------- | --------- | -------------- |
| 1    | [Scorecard Research](https://www.scorecardresearch.com/)       | 4,740     | 90 ms          |
| 2    | [Criteo](https://www.criteo.com/)                              | 63,058    | 137 ms         |
| 3    | [Taboola](https://www.taboola.com/)                            | 23,818    | 183 ms         |
| 4    | [AppNexus](https://www.appnexus.com/)                          | 16,942    | 235 ms         |
| 5    | [Yahoo Ads](https://www.media.net/)                            | 8,495     | 247 ms         |
| 6    | [Pubmatic](https://pubmatic.com/)                              | 3,033     | 255 ms         |
| 7    | [Market GID](https://www.marketgid.com/)                       | 3,831     | 274 ms         |
| 8    | [MGID](https://www.mgid.com/)                                  | 10,472    | 277 ms         |
| 9    | [Integral Ads](https://integralads.com/uk/)                    | 23,942    | 296 ms         |
| 10   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 1,412,404 | 330 ms         |
| 11   | [Sizmek](https://www.sizmek.com/)                              | 3,831     | 333 ms         |
| 12   | [Yandex Ads](https://yandex.com/adv/)                          | 28,882    | 386 ms         |
| 13   | [DoubleVerify](https://www.doubleverify.com/)                  | 4,041     | 503 ms         |
| 14   | [Moat](https://moat.com/)                                      | 23,170    | 616 ms         |
| 15   | [OpenX](https://www.openx.com/)                                | 12,505    | 821 ms         |
| 16   | [MediaVine](https://www.mediavine.com/)                        | 9,205     | 839 ms         |
| 17   | [Media Math](http://www.mediamath.com/)                        | 3,498     | 905 ms         |
| 18   | [33 Across](https://33across.com/)                             | 20,756    | 1170 ms        |
| 19   | [Popads](https://www.popads.net/)                              | 6,545     | 1245 ms        |
| 20   | [WordAds](https://wordads.co/)                                 | 30,961    | 2543 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                               | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------ | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                    | 1,721     | 56 ms          |
| 2    | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)      | 8,018     | 79 ms          |
| 3    | [Mixpanel](https://mixpanel.com/)                                  | 7,258     | 79 ms          |
| 4    | [Google Analytics](https://www.google.com/analytics/analytics/)    | 1,533,217 | 79 ms          |
| 5    | [Hotjar](https://www.hotjar.com/)                                  | 108,933   | 89 ms          |
| 6    | [Crazy Egg](https://www.crazyegg.com/)                             | 2,214     | 91 ms          |
| 7    | [Adobe Analytics](https://www.adobe.com/analytics-cloud.html)      | 34,436    | 192 ms         |
| 8    | [Tealium](https://tealium.com/)                                    | 15,933    | 214 ms         |
| 9    | [Segment](https://segment.com/)                                    | 6,581     | 228 ms         |
| 10   | [Optimizely](https://www.optimizely.com/)                          | 13,853    | 247 ms         |
| 11   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/) | 40,451    | 291 ms         |
| 12   | [Histats](http://histats.com/)                                     | 15,770    | 339 ms         |
| 13   | [Yandex Metrica](https://metrica.yandex.com/about?)                | 217,229   | 377 ms         |
| 14   | [Lucky Orange](https://www.luckyorange.com/)                       | 6,037     | 870 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 7,578     | 61 ms          |
| 2    | [Pinterest](https://pinterest.com/)                  | 11,122    | 71 ms          |
| 3    | [Facebook](https://www.facebook.com)                 | 1,212,567 | 120 ms         |
| 4    | [Yandex Share](https://yastatic.net/share2/share.js) | 30,677    | 128 ms         |
| 5    | [Twitter](https://twitter.com)                       | 295,308   | 154 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)                | 10,663    | 156 ms         |
| 7    | [ShareThis](https://www.sharethis.com/)              | 39,884    | 216 ms         |
| 8    | [AddThis](http://www.addthis.com/)                   | 179,424   | 254 ms         |
| 9    | [Tumblr](https://tumblr.com/)                        | 46,800    | 330 ms         |
| 10   | [PIXNET](https://www.pixnet.net/)                    | 53,889    | 473 ms         |
| 11   | [Disqus](http://disqus.com/)                         | 723       | 580 ms         |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage  | Average Impact |
| ---- | -------------------------------------------- | ------ | -------------- |
| 1    | [YouTube](https://youtube.com)               | 23,184 | 104 ms         |
| 2    | [Wistia](https://wistia.com/)                | 21,319 | 254 ms         |
| 3    | [Brightcove](https://www.brightcove.com/en/) | 5,133  | 469 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                               | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------ | ------- | -------------- |
| 1    | [New Relic](https://newrelic.com/)                                 | 3,613   | 52 ms          |
| 2    | [Stripe](https://stripe.com)                                       | 3,775   | 66 ms          |
| 3    | [OneSignal](https://onesignal.com/)                                | 41,178  | 88 ms          |
| 4    | [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/) | 977,712 | 115 ms         |
| 5    | [App Dynamics](https://www.appdynamics.com/)                       | 2,248   | 117 ms         |
| 6    | [Cloudflare](https://www.cloudflare.com/website-optimization/)     | 3,151   | 185 ms         |
| 7    | [PayPal](https://paypal.com)                                       | 6,376   | 241 ms         |
| 8    | [Yandex APIs](https://yandex.ru/)                                  | 57,425  | 368 ms         |
| 9    | [Distil Networks](https://www.distilnetworks.com/)                 | 11,489  | 409 ms         |
| 10   | [Sentry](https://sentry.io/)                                       | 15,272  | 729 ms         |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                        | Usage   | Average Impact |
| ---- | ------------------------------------------- | ------- | -------------- |
| 1    | [WordPress](https://wp.com/)                | 135,176 | 113 ms         |
| 2    | [Shopify](https://www.shopify.com/)         | 227,933 | 163 ms         |
| 3    | [Squarespace](https://www.squarespace.com/) | 86,605  | 412 ms         |
| 4    | [Hatena Blog](https://hatenablog.com/)      | 53,675  | 516 ms         |
| 5    | [Wix](https://www.wix.com/)                 | 158,466 | 1153 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Hubspot](https://hubspot.com/)           | 15,991 | 89 ms          |
| 2    | [OptinMonster](https://optinmonster.com/) | 1,483  | 127 ms         |
| 3    | [Beeketing](https://beeketing.com/)       | 62,659 | 149 ms         |
| 4    | [Drift](https://www.drift.com/)           | 3,929  | 156 ms         |
| 5    | [Mailchimp](https://mailchimp.com/)       | 21,946 | 161 ms         |
| 6    | [Sumo](https://sumo.com/)                 | 39,747 | 390 ms         |
| 7    | [Albacross](https://albacross.com/)       | 1,407  | 769 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                     | Usage  | Average Impact |
| ---- | ---------------------------------------- | ------ | -------------- |
| 1    | [LiveChat](https://www.livechatinc.com/) | 23,881 | 93 ms          |
| 2    | [Freshdesk](https://freshdesk.com/)      | 973    | 154 ms         |
| 3    | [Help Scout](https://www.helpscout.net/) | 665    | 198 ms         |
| 4    | [Olark](https://www.olark.com/)          | 14,917 | 309 ms         |
| 5    | [Tawk.to](https://www.tawk.to/)          | 40,228 | 386 ms         |
| 6    | [ZenDesk](https://zendesk.com/)          | 36,411 | 476 ms         |
| 7    | [Intercom](https://www.intercom.com/)    | 15,511 | 554 ms         |
| 8    | [Zopim](https://www.zopim.com/)          | 55,964 | 688 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                   | Usage  | Average Impact |
| ---- | -------------------------------------- | ------ | -------------- |
| 1    | [AMP](https://www.ampproject.org/)     | 60,944 | 196 ms         |
| 2    | [Vox Media](https://www.voxmedia.com/) | 702    | 558 ms         |
| 3    | [Hotmart](https://www.hotmart.com/)    | 1,008  | 814 ms         |

<a name="library"></a>

#### Libraries

These are mostly open source libraries (e.g. jQuery) served over different public CDNs. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the libraries being served from that origin are lighter/heavier than the ones served by another..

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Bootstrap CDN](https://bootstrapcdn.com/)                   | 2,860   | 44 ms          |
| 2    | [FontAwesome CDN](https://fontawesome.com/)                  | 17,002  | 102 ms         |
| 3    | [Yandex CDN](https://yandex.ru/)                             | 2,499   | 115 ms         |
| 4    | [jQuery CDN](https://code.jquery.com/)                       | 170,001 | 154 ms         |
| 5    | [Cloudflare CDN](https://cdnjs.com/)                         | 119,800 | 176 ms         |
| 6    | [Google CDN](https://developers.google.com/speed/libraries/) | 811,231 | 178 ms         |
| 7    | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 27,070  | 257 ms         |
| 8    | [CreateJS CDN](http://code.createjs.com/)                    | 1,988   | 3188 ms        |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Amazon S3](https://aws.amazon.com/s3/)                                       | 35,291    | 152 ms         |
| 2    | [All Other 3rd Parties](#by-category)                                         | 1,649,095 | 198 ms         |
| 3    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,093,167 | 386 ms         |
| 4    | [Parking Crew](http://parkingcrew.net/)                                       | 4,021     | 428 ms         |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                          | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                | 1,412,404  | 466,442 s    | 330 ms         |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,093,167  | 421,590 s    | 386 ms         |
| [All Other 3rd Parties](#by-category)                                         | 1,649,095  | 326,279 s    | 198 ms         |
| [Wix](https://www.wix.com/)                                                   | 158,466    | 182,642 s    | 1153 ms        |
| [Facebook](https://www.facebook.com)                                          | 1,212,567  | 145,169 s    | 120 ms         |
| [Google CDN](https://developers.google.com/speed/libraries/)                  | 811,231    | 144,059 s    | 178 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)               | 1,533,217  | 121,451 s    | 79 ms          |
| [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/)            | 977,712    | 112,781 s    | 115 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                           | 217,229    | 81,926 s     | 377 ms         |
| [WordAds](https://wordads.co/)                                                | 30,961     | 78,744 s     | 2543 ms        |
| [AddThis](http://www.addthis.com/)                                            | 179,424    | 45,657 s     | 254 ms         |
| [Twitter](https://twitter.com)                                                | 295,308    | 45,394 s     | 154 ms         |
| [Zopim](https://www.zopim.com/)                                               | 55,964     | 38,494 s     | 688 ms         |
| [Shopify](https://www.shopify.com/)                                           | 227,933    | 37,169 s     | 163 ms         |
| [Squarespace](https://www.squarespace.com/)                                   | 86,605     | 35,683 s     | 412 ms         |
| [Hatena Blog](https://hatenablog.com/)                                        | 53,675     | 27,679 s     | 516 ms         |
| [jQuery CDN](https://code.jquery.com/)                                        | 170,001    | 26,146 s     | 154 ms         |
| [PIXNET](https://www.pixnet.net/)                                             | 53,889     | 25,483 s     | 473 ms         |
| [33 Across](https://33across.com/)                                            | 20,756     | 24,283 s     | 1170 ms        |
| [Yandex APIs](https://yandex.ru/)                                             | 57,425     | 21,138 s     | 368 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                          | 119,800    | 21,084 s     | 176 ms         |
| [ZenDesk](https://zendesk.com/)                                               | 36,411     | 17,340 s     | 476 ms         |
| [Tawk.to](https://www.tawk.to/)                                               | 40,228     | 15,541 s     | 386 ms         |
| [Sumo](https://sumo.com/)                                                     | 39,747     | 15,492 s     | 390 ms         |
| [Tumblr](https://tumblr.com/)                                                 | 46,800     | 15,443 s     | 330 ms         |
| [WordPress](https://wp.com/)                                                  | 135,176    | 15,341 s     | 113 ms         |
| [Moat](https://moat.com/)                                                     | 23,170     | 14,281 s     | 616 ms         |
| [AMP](https://www.ampproject.org/)                                            | 60,944     | 11,948 s     | 196 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)            | 40,451     | 11,786 s     | 291 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                         | 28,882     | 11,155 s     | 386 ms         |
| [Sentry](https://sentry.io/)                                                  | 15,272     | 11,134 s     | 729 ms         |
| [OpenX](https://www.openx.com/)                                               | 12,505     | 10,269 s     | 821 ms         |
| [Hotjar](https://www.hotjar.com/)                                             | 108,933    | 9,724 s      | 89 ms          |
| [Beeketing](https://beeketing.com/)                                           | 62,659     | 9,362 s      | 149 ms         |
| [Criteo](https://www.criteo.com/)                                             | 63,058     | 8,659 s      | 137 ms         |
| [ShareThis](https://www.sharethis.com/)                                       | 39,884     | 8,618 s      | 216 ms         |
| [Intercom](https://www.intercom.com/)                                         | 15,511     | 8,588 s      | 554 ms         |
| [Popads](https://www.popads.net/)                                             | 6,545      | 8,147 s      | 1245 ms        |
| [MediaVine](https://www.mediavine.com/)                                       | 9,205      | 7,723 s      | 839 ms         |
| [Integral Ads](https://integralads.com/uk/)                                   | 23,942     | 7,081 s      | 296 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                     | 27,070     | 6,959 s      | 257 ms         |
| [Adobe Analytics](https://www.adobe.com/analytics-cloud.html)                 | 34,436     | 6,617 s      | 192 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                     | 1,988      | 6,337 s      | 3188 ms        |
| [Wistia](https://wistia.com/)                                                 | 21,319     | 5,416 s      | 254 ms         |
| [Amazon S3](https://aws.amazon.com/s3/)                                       | 35,291     | 5,356 s      | 152 ms         |
| [Histats](http://histats.com/)                                                | 15,770     | 5,343 s      | 339 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                  | 6,037      | 5,255 s      | 870 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                            | 11,489     | 4,695 s      | 409 ms         |
| [Olark](https://www.olark.com/)                                               | 14,917     | 4,610 s      | 309 ms         |
| [Taboola](https://www.taboola.com/)                                           | 23,818     | 4,357 s      | 183 ms         |
| [AppNexus](https://www.appnexus.com/)                                         | 16,942     | 3,987 s      | 235 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                          | 30,677     | 3,920 s      | 128 ms         |
| [OneSignal](https://onesignal.com/)                                           | 41,178     | 3,641 s      | 88 ms          |
| [Mailchimp](https://mailchimp.com/)                                           | 21,946     | 3,544 s      | 161 ms         |
| [Optimizely](https://www.optimizely.com/)                                     | 13,853     | 3,418 s      | 247 ms         |
| [Tealium](https://tealium.com/)                                               | 15,933     | 3,407 s      | 214 ms         |
| [Media Math](http://www.mediamath.com/)                                       | 3,498      | 3,167 s      | 905 ms         |
| [MGID](https://www.mgid.com/)                                                 | 10,472     | 2,902 s      | 277 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                  | 5,133      | 2,410 s      | 469 ms         |
| [YouTube](https://youtube.com)                                                | 23,184     | 2,410 s      | 104 ms         |
| [LiveChat](https://www.livechatinc.com/)                                      | 23,881     | 2,216 s      | 93 ms          |
| [Yahoo Ads](https://www.media.net/)                                           | 8,495      | 2,098 s      | 247 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                 | 4,041      | 2,031 s      | 503 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                   | 17,002     | 1,728 s      | 102 ms         |
| [Parking Crew](http://parkingcrew.net/)                                       | 4,021      | 1,720 s      | 428 ms         |
| [LinkedIn](https://www.linkedin.com/)                                         | 10,663     | 1,659 s      | 156 ms         |
| [PayPal](https://paypal.com)                                                  | 6,376      | 1,539 s      | 241 ms         |
| [Segment](https://segment.com/)                                               | 6,581      | 1,498 s      | 228 ms         |
| [Hubspot](https://hubspot.com/)                                               | 15,991     | 1,430 s      | 89 ms          |
| [Sizmek](https://www.sizmek.com/)                                             | 3,831      | 1,274 s      | 333 ms         |
| [Albacross](https://albacross.com/)                                           | 1,407      | 1,082 s      | 769 ms         |
| [Market GID](https://www.marketgid.com/)                                      | 3,831      | 1,049 s      | 274 ms         |
| [Hotmart](https://www.hotmart.com/)                                           | 1,008      | 821 s        | 814 ms         |
| [Pinterest](https://pinterest.com/)                                           | 11,122     | 795 s        | 71 ms          |
| [Pubmatic](https://pubmatic.com/)                                             | 3,033      | 774 s        | 255 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 8,018      | 632 s        | 79 ms          |
| [Drift](https://www.drift.com/)                                               | 3,929      | 615 s        | 156 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                | 3,151      | 584 s        | 185 ms         |
| [Mixpanel](https://mixpanel.com/)                                             | 7,258      | 573 s        | 79 ms          |
| [VK](https://vk.com/)                                                         | 7,578      | 460 s        | 61 ms          |
| [Scorecard Research](https://www.scorecardresearch.com/)                      | 4,740      | 427 s        | 90 ms          |
| [Disqus](http://disqus.com/)                                                  | 723        | 419 s        | 580 ms         |
| [Vox Media](https://www.voxmedia.com/)                                        | 702        | 392 s        | 558 ms         |
| [Yandex CDN](https://yandex.ru/)                                              | 2,499      | 287 s        | 115 ms         |
| [App Dynamics](https://www.appdynamics.com/)                                  | 2,248      | 263 s        | 117 ms         |
| [Stripe](https://stripe.com)                                                  | 3,775      | 249 s        | 66 ms          |
| [Crazy Egg](https://www.crazyegg.com/)                                        | 2,214      | 201 s        | 91 ms          |
| [New Relic](https://newrelic.com/)                                            | 3,613      | 189 s        | 52 ms          |
| [OptinMonster](https://optinmonster.com/)                                     | 1,483      | 188 s        | 127 ms         |
| [Freshdesk](https://freshdesk.com/)                                           | 973        | 150 s        | 154 ms         |
| [Help Scout](https://www.helpscout.net/)                                      | 665        | 132 s        | 198 ms         |
| [Bootstrap CDN](https://bootstrapcdn.com/)                                    | 2,860      | 126 s        | 44 ms          |
| [Alexa](https://www.alexa.com/)                                               | 1,721      | 96 s         | 56 ms          |

## Future Work

1.  Introduce URL-level data for more fine-grained analysis, i.e. which libraries from Cloudflare/Google CDNs are most expensive.
1.  Expand the scope, i.e. include more third parties and have greater entity/category coverage.

## FAQs

### I don't see entity X in the list. What's up with that?

This can be for one of several reasons:

1.  The entity does not have at least 100 references to their origin in the dataset.
1.  The entity's origins have not yet been identified. See [How can I contribute?](#contribute)

### How is the "Average Impact" determined?

The HTTP Archive dataset includes Lighthouse reports for each URL on mobile. Lighthouse has an audit called "bootup-time" that summarizes the amount of time that each script spent on the main thread. The "Average Impact" for an entity is the total execution time of scripts whose domain matches one of the entity's domains divided by the total number of occurences of those scripts.

```
Average Impact = Total Execution Time / Total Occurences
```

### How does Lighthouse determine the execution time of each script?

Lighthouse's bootup time audit attempts to attribute all toplevel main-thread tasks to a URL. A main thread task is attributed to the first script URL found in the stack. If you're interested in helping us improve this logic, see [Contributing](#contributing) for details.

### The data for entity X seems wrong. How can it be corrected?

Verify that the origins in `data/entities.json` are correct. Most issues will simply be the result of mislabelling of shared origins. If everything checks out, there is likely no further action and the data is valid. If you still believe there's errors, file an issue to discuss futher.

<a name="contribute"></a>

### How can I contribute?

Only about 90% of the third party script execution has been assigned to an entity. We could use your help identifying the rest! See [Contributing](#contributing) for details.

## Contributing

### Updating the Entities

The origin->entity mapping can be found in `data/entities.json`. Adding a new entity is as simple as adding a new array item with the following form.

```js
{
    "name": "Facebook",
    "homepage": "https://www.facebook.com",
    "categories": ["social"],
    "origins": [
        "www.facebook.com",
        "connect.facebook.net",
        "staticxx.facebook.com",
        "static.xx.fbcdn.net",
        "m.facebook.com"
    ]
}
```

### Updating Attribution Logic

The logic for attribution to individual script URLs can be found in the [Lighthouse repo](https://github.com/GoogleChrome/lighthouse). File an issue over there to discuss further.

### Updating the Data

The query used to compute the origin-level data is in `sql/origin-execution-time-query.sql`, running this against the latest Lighthouse HTTP Archive should give you a JSON export of the latest data that can be checked in at `data/YYYY-MM-DD-origin-scripting.json`.

### Updating this README

This README is auto-generated from the template `lib/template.md` and the computed data. In order to update the charts, you'll need to make sure you have `cairo` installed locally in addition to `yarn install`.

```bash
# Install `cairo` and dependencies for node-canvas
brew install pkg-config cairo pango libpng jpeg giflib
```
