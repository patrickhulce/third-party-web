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
        1.  [Unknown](#other)
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

[HTTP Archive](https://httparchive.org/) is an inititiave that tracks how the web is built. Twice a month, ~1 million sites are crawled with [Lighthouse](https://github.com/GoogleChrome/lighthouse). Lighthouse breaks down the total script execution time of each page and attributes the execution to a URL. Using [BigQuery](https://cloud.google.com/bigquery/), this project aggregates the script execution to the origin-level and assigns each origin to the responsible entity for consumption.

## Data

### Summary

Across ~1 million sites, ~800 origins account for ~65% of all script execution time with the top 100 entities already accounting for ~59%. Third party script execution is a sizable chunk of the web today, and it's important to make informed choices.

### How to Interpret

Each entity has a number of data points available.

1.  **Popularity (Total Number of Occurrences)** - how many scripts from their origins were included on pages
1.  **Total Impact (Total Execution Time)** - how many seconds were spent executing their scripts across the web
1.  **Average Impact (Average Execution Time)** - on average, how many milliseconds were spent executing each script
1.  **Category** - what type of script is this

<a name="by-category"></a>

### Third Parties by Category

This section breaks down third parties by category. The third parties in each category are ranked from first to last based on the average impact of their scripts. Perhaps the most important comparisons lie here. You always need to pick an analytics provider, but at least you can pick the most well-behaved analytics provider.

#### Overall Breakdown

Unsurprisingly, ads account for the largest chunk of third party script execution followed by social and analytics.

![breakdown by category](./by-category.png)

<a name="ad"></a>

#### Ads

These scripts are part of advertising networks, either serving or measuring.

| Rank | Name                                                           | Popularity | Average Impact |
| ---- | -------------------------------------------------------------- | ---------- | -------------- |
| 1    | [Pubmatic](https://pubmatic.com/)                              | 15,514     | 63 ms          |
| 2    | [Criteo](https://www.criteo.com/)                              | 4,359      | 75 ms          |
| 3    | [Market GID](https://www.marketgid.com/)                       | 1,799      | 122 ms         |
| 4    | [Yahoo Ads](https://www.media.net/)                            | 6,484      | 126 ms         |
| 5    | [MGID](https://www.mgid.com/)                                  | 3,006      | 134 ms         |
| 6    | [Taboola](https://www.taboola.com/)                            | 5,146      | 164 ms         |
| 7    | [Scorecard Research](https://www.scorecardresearch.com/)       | 1,300      | 170 ms         |
| 8    | [AppNexus](https://www.appnexus.com/)                          | 6,835      | 178 ms         |
| 9    | [DoubleVerify](https://www.doubleverify.com/)                  | 4,748      | 344 ms         |
| 10   | [Sizmek](https://www.sizmek.com/)                              | 2,672      | 362 ms         |
| 11   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 491,573    | 372 ms         |
| 12   | [Integral Ads](https://integralads.com/uk/)                    | 9,242      | 389 ms         |
| 13   | [Yandex Ads](https://yandex.com/adv/)                          | 5,202      | 481 ms         |
| 14   | [Moat](https://moat.com/)                                      | 6,351      | 759 ms         |
| 15   | [Media Math](http://www.mediamath.com/)                        | 1,548      | 795 ms         |
| 16   | [WordAds](https://wordads.co/)                                 | 1,697      | 928 ms         |
| 17   | [MediaVine](https://www.mediavine.com/)                        | 1,465      | 995 ms         |
| 18   | [TrafficJunky](https://www.trafficjunky.com/)                  | 1,603      | 1076 ms        |
| 19   | [Popads](https://www.popads.net/)                              | 2,954      | 2273 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                               | Popularity | Average Impact |
| ---- | ------------------------------------------------------------------ | ---------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                    | 318        | 48 ms          |
| 2    | [Mixpanel](https://mixpanel.com/)                                  | 1,914      | 72 ms          |
| 3    | [Google Analytics](https://www.google.com/analytics/analytics/)    | 266,173    | 81 ms          |
| 4    | [Hotjar](https://www.hotjar.com/)                                  | 21,986     | 87 ms          |
| 5    | [Crazy Egg](https://www.crazyegg.com/)                             | 536        | 88 ms          |
| 6    | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)      | 13,188     | 89 ms          |
| 7    | [Adobe Analytics](https://www.adobe.com/analytics-cloud.html)      | 6,760      | 203 ms         |
| 8    | [Salesforce](https://www.salesforce.com/products/marketing-cloud/) | 8,154      | 203 ms         |
| 9    | [Tealium](https://tealium.com/)                                    | 3,895      | 217 ms         |
| 10   | [Optimizely](https://www.optimizely.com/)                          | 4,816      | 292 ms         |
| 11   | [Segment](https://segment.com/)                                    | 1,855      | 300 ms         |
| 12   | [Histats](http://histats.com/)                                     | 1,735      | 309 ms         |
| 13   | [Connexity](http://connexity.com/)                                 | 2,404      | 331 ms         |
| 14   | [Yandex Metrica](https://metrica.yandex.com/about?)                | 27,998     | 364 ms         |
| 15   | [Lucky Orange](https://www.luckyorange.com/)                       | 866        | 929 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Popularity | Average Impact |
| ---- | ---------------------------------------------------- | ---------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 6,344      | 30 ms          |
| 2    | [Pinterest](https://pinterest.com/)                  | 1,285      | 58 ms          |
| 3    | [LinkedIn](https://www.linkedin.com/)                | 1,598      | 107 ms         |
| 4    | [Yandex Share](https://yastatic.net/share2/share.js) | 9,883      | 117 ms         |
| 5    | [Twitter](https://twitter.com)                       | 50,401     | 132 ms         |
| 6    | [Facebook](https://www.facebook.com)                 | 224,321    | 141 ms         |
| 7    | [AddThis](http://www.addthis.com/)                   | 44,996     | 178 ms         |
| 8    | [ShareThis](https://www.sharethis.com/)              | 5,910      | 327 ms         |
| 9    | [Tumblr](https://tumblr.com/)                        | 5,056      | 386 ms         |
| 10   | [Disqus](http://disqus.com/)                         | 658        | 563 ms         |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Popularity | Average Impact |
| ---- | -------------------------------------------- | ---------- | -------------- |
| 1    | [Vimeo](http://vimeo.com/)                   | 3,884      | 134 ms         |
| 2    | [Wistia](https://wistia.com/)                | 6,090      | 232 ms         |
| 3    | [YouTube](https://youtube.com)               | 60,029     | 379 ms         |
| 4    | [Brightcove](https://www.brightcove.com/en/) | 1,395      | 540 ms         |
| 5    | [Twitch](https://twitch.tv/)                 | 472        | 602 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                               | Popularity | Average Impact |
| ---- | ------------------------------------------------------------------ | ---------- | -------------- |
| 1    | [New Relic](https://newrelic.com/)                                 | 698        | 55 ms          |
| 2    | [OneSignal](https://onesignal.com/)                                | 9,448      | 90 ms          |
| 3    | [App Dynamics](https://www.appdynamics.com/)                       | 603        | 96 ms          |
| 4    | [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/) | 151,811    | 110 ms         |
| 5    | [Stripe](https://stripe.com)                                       | 1,813      | 210 ms         |
| 6    | [PayPal](https://paypal.com)                                       | 654        | 231 ms         |
| 7    | [Distil Networks](https://www.distilnetworks.com/)                 | 1,924      | 280 ms         |
| 8    | [Cloudflare](https://www.cloudflare.com/website-optimization/)     | 4,494      | 296 ms         |
| 9    | [Yandex APIs](https://yandex.ru/)                                  | 4,216      | 319 ms         |
| 10   | [Sentry](https://sentry.io/)                                       | 2,334      | 722 ms         |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in the case of WordPress, this just indicates the libraries hosted and served by WordPress not all sites using self-hosted WordPress.

| Rank | Name                                        | Popularity | Average Impact |
| ---- | ------------------------------------------- | ---------- | -------------- |
| 1    | [WordPress](https://wp.com/)                | 10,444     | 105 ms         |
| 2    | [Shopify](https://www.shopify.com/)         | 12,498     | 170 ms         |
| 3    | [Squarespace](https://www.squarespace.com/) | 2,258      | 368 ms         |
| 4    | [Wix](https://www.wix.com/)                 | 2,921      | 1117 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                      | Popularity | Average Impact |
| ---- | ----------------------------------------- | ---------- | -------------- |
| 1    | [Hubspot](https://hubspot.com/)           | 5,847      | 88 ms          |
| 2    | [Mailchimp](https://mailchimp.com/)       | 1,035      | 169 ms         |
| 3    | [Beeketing](https://beeketing.com/)       | 1,928      | 214 ms         |
| 4    | [OptinMonster](https://optinmonster.com/) | 2,853      | 281 ms         |
| 5    | [Sumo](https://sumo.com/)                 | 7,750      | 332 ms         |
| 6    | [Drift](https://www.drift.com/)           | 2,400      | 468 ms         |
| 7    | [Albacross](https://albacross.com/)       | 158        | 3847 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                     | Popularity | Average Impact |
| ---- | ---------------------------------------- | ---------- | -------------- |
| 1    | [LiveChat](https://www.livechatinc.com/) | 6,598      | 173 ms         |
| 2    | [Freshdesk](https://freshdesk.com/)      | 371        | 187 ms         |
| 3    | [Help Scout](https://www.helpscout.net/) | 229        | 239 ms         |
| 4    | [Olark](https://www.olark.com/)          | 3,768      | 248 ms         |
| 5    | [Tawk.to](https://www.tawk.to/)          | 2,589      | 278 ms         |
| 6    | [Intercom](https://www.intercom.com/)    | 2,915      | 693 ms         |
| 7    | [Zopim](https://www.zopim.com/)          | 6,372      | 726 ms         |
| 8    | [ZenDesk](https://zendesk.com/)          | 3,093      | 726 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Popularity | Average Impact |
| ---- | ----------------------------------------- | ---------- | -------------- |
| 1    | [Vox Media](https://www.voxmedia.com/)    | 551        | 276 ms         |
| 2    | [AMP](https://www.ampproject.org/)        | 1,319      | 319 ms         |
| 3    | [SoundCloud](https://www.soundcloud.com/) | 555        | 847 ms         |
| 4    | [Hotmart](https://www.hotmart.com/)       | 114        | 3814 ms        |

<a name="library"></a>

#### Libraries

These are mostly open source libraries (e.g. jQuery) served over different public CDNs. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the libraries being served from that origin are lighter/heavier than the ones served by another..

| Rank | Name                                                         | Popularity | Average Impact |
| ---- | ------------------------------------------------------------ | ---------- | -------------- |
| 1    | [FontAwesome CDN](https://fontawesome.com/)                  | 1,565      | 94 ms          |
| 2    | [Yandex CDN](https://yandex.ru/)                             | 382        | 145 ms         |
| 3    | [jQuery CDN](https://code.jquery.com/)                       | 23,015     | 154 ms         |
| 4    | [Cloudflare CDN](https://cdnjs.com/)                         | 18,719     | 168 ms         |
| 5    | [Bootstrap CDN](https://bootstrapcdn.com/)                   | 906        | 174 ms         |
| 6    | [Google CDN](https://developers.google.com/speed/libraries/) | 99,228     | 191 ms         |
| 7    | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 4,277      | 301 ms         |
| 8    | [CreateJS CDN](http://code.createjs.com/)                    | 1,939      | 2154 ms        |

<a name="other"></a>

#### Unknown

These are miscellaneous scripts delivered via a shared origin with no clean category or attribution. Help us out by identifying more origins!

| Rank | Name                                    | Popularity | Average Impact |
| ---- | --------------------------------------- | ---------- | -------------- |
| 1    | [Amazon S3](https://aws.amazon.com/s3/) | 3,650      | 193 ms         |
| 2    | [All Other 3rd Parties](#by-category)   | 228,238    | 204 ms         |
| 3    | [Parking Crew](http://parkingcrew.net/) | 2,887      | 426 ms         |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                               | Popularity | Total Impact | Average Impact |
| ------------------------------------------------------------------ | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)     | 491,573    | 182,634 s    | 372 ms         |
| [All Other 3rd Parties](#by-category)                              | 228,238    | 46,607 s     | 204 ms         |
| [Facebook](https://www.facebook.com)                               | 224,321    | 31,531 s     | 141 ms         |
| [YouTube](https://youtube.com)                                     | 60,029     | 22,775 s     | 379 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)    | 266,173    | 21,628 s     | 81 ms          |
| [Google CDN](https://developers.google.com/speed/libraries/)       | 99,228     | 18,956 s     | 191 ms         |
| [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/) | 151,811    | 16,762 s     | 110 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                | 27,998     | 10,205 s     | 364 ms         |
| [AddThis](http://www.addthis.com/)                                 | 44,996     | 8,012 s      | 178 ms         |
| [Popads](https://www.popads.net/)                                  | 2,954      | 6,716 s      | 2273 ms        |
| [Twitter](https://twitter.com)                                     | 50,401     | 6,631 s      | 132 ms         |
| [Moat](https://moat.com/)                                          | 6,351      | 4,820 s      | 759 ms         |
| [Zopim](https://www.zopim.com/)                                    | 6,372      | 4,624 s      | 726 ms         |
| [CreateJS CDN](http://code.createjs.com/)                          | 1,939      | 4,177 s      | 2154 ms        |
| [Integral Ads](https://integralads.com/uk/)                        | 9,242      | 3,592 s      | 389 ms         |
| [jQuery CDN](https://code.jquery.com/)                             | 23,015     | 3,554 s      | 154 ms         |
| [Wix](https://www.wix.com/)                                        | 2,921      | 3,264 s      | 1117 ms        |
| [Cloudflare CDN](https://cdnjs.com/)                               | 18,719     | 3,154 s      | 168 ms         |
| [Sumo](https://sumo.com/)                                          | 7,750      | 2,572 s      | 332 ms         |
| [Yandex Ads](https://yandex.com/adv/)                              | 5,202      | 2,500 s      | 481 ms         |
| [ZenDesk](https://zendesk.com/)                                    | 3,093      | 2,246 s      | 726 ms         |
| [Shopify](https://www.shopify.com/)                                | 12,498     | 2,123 s      | 170 ms         |
| [Intercom](https://www.intercom.com/)                              | 2,915      | 2,021 s      | 693 ms         |
| [Tumblr](https://tumblr.com/)                                      | 5,056      | 1,953 s      | 386 ms         |
| [ShareThis](https://www.sharethis.com/)                            | 5,910      | 1,930 s      | 327 ms         |
| [Hotjar](https://www.hotjar.com/)                                  | 21,986     | 1,910 s      | 87 ms          |
| [TrafficJunky](https://www.trafficjunky.com/)                      | 1,603      | 1,726 s      | 1076 ms        |
| [Sentry](https://sentry.io/)                                       | 2,334      | 1,684 s      | 722 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/) | 8,154      | 1,658 s      | 203 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                      | 4,748      | 1,633 s      | 344 ms         |
| [WordAds](https://wordads.co/)                                     | 1,697      | 1,574 s      | 928 ms         |
| [MediaVine](https://www.mediavine.com/)                            | 1,465      | 1,457 s      | 995 ms         |
| [Wistia](https://wistia.com/)                                      | 6,090      | 1,414 s      | 232 ms         |
| [Optimizely](https://www.optimizely.com/)                          | 4,816      | 1,405 s      | 292 ms         |
| [Adobe Analytics](https://www.adobe.com/analytics-cloud.html)      | 6,760      | 1,372 s      | 203 ms         |
| [Yandex APIs](https://yandex.ru/)                                  | 4,216      | 1,345 s      | 319 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)     | 4,494      | 1,329 s      | 296 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                          | 4,277      | 1,287 s      | 301 ms         |
| [Media Math](http://www.mediamath.com/)                            | 1,548      | 1,231 s      | 795 ms         |
| [Parking Crew](http://parkingcrew.net/)                            | 2,887      | 1,229 s      | 426 ms         |
| [AppNexus](https://www.appnexus.com/)                              | 6,835      | 1,217 s      | 178 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)      | 13,188     | 1,172 s      | 89 ms          |
| [Yandex Share](https://yastatic.net/share2/share.js)               | 9,883      | 1,159 s      | 117 ms         |
| [LiveChat](https://www.livechatinc.com/)                           | 6,598      | 1,142 s      | 173 ms         |
| [Drift](https://www.drift.com/)                                    | 2,400      | 1,123 s      | 468 ms         |
| [WordPress](https://wp.com/)                                       | 10,444     | 1,098 s      | 105 ms         |
| [Pubmatic](https://pubmatic.com/)                                  | 15,514     | 984 s        | 63 ms          |
| [Sizmek](https://www.sizmek.com/)                                  | 2,672      | 968 s        | 362 ms         |
| [Olark](https://www.olark.com/)                                    | 3,768      | 935 s        | 248 ms         |
| [Tealium](https://tealium.com/)                                    | 3,895      | 847 s        | 217 ms         |
| [OneSignal](https://onesignal.com/)                                | 9,448      | 847 s        | 90 ms          |
| [Taboola](https://www.taboola.com/)                                | 5,146      | 846 s        | 164 ms         |
| [Squarespace](https://www.squarespace.com/)                        | 2,258      | 832 s        | 368 ms         |
| [Yahoo Ads](https://www.media.net/)                                | 6,484      | 819 s        | 126 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                       | 866        | 804 s        | 929 ms         |
| [OptinMonster](https://optinmonster.com/)                          | 2,853      | 802 s        | 281 ms         |
| [Connexity](http://connexity.com/)                                 | 2,404      | 795 s        | 331 ms         |
| [Brightcove](https://www.brightcove.com/en/)                       | 1,395      | 753 s        | 540 ms         |
| [Tawk.to](https://www.tawk.to/)                                    | 2,589      | 719 s        | 278 ms         |
| [Amazon S3](https://aws.amazon.com/s3/)                            | 3,650      | 705 s        | 193 ms         |
| [Albacross](https://albacross.com/)                                | 158        | 608 s        | 3847 ms        |
| [Segment](https://segment.com/)                                    | 1,855      | 557 s        | 300 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                 | 1,924      | 538 s        | 280 ms         |
| [Histats](http://histats.com/)                                     | 1,735      | 536 s        | 309 ms         |
| [Vimeo](http://vimeo.com/)                                         | 3,884      | 520 s        | 134 ms         |
| [Hubspot](https://hubspot.com/)                                    | 5,847      | 516 s        | 88 ms          |
| [SoundCloud](https://www.soundcloud.com/)                          | 555        | 470 s        | 847 ms         |
| [Hotmart](https://www.hotmart.com/)                                | 114        | 435 s        | 3814 ms        |
| [AMP](https://www.ampproject.org/)                                 | 1,319      | 421 s        | 319 ms         |
| [Beeketing](https://beeketing.com/)                                | 1,928      | 413 s        | 214 ms         |
| [MGID](https://www.mgid.com/)                                      | 3,006      | 404 s        | 134 ms         |
| [Stripe](https://stripe.com)                                       | 1,813      | 380 s        | 210 ms         |
| [Disqus](http://disqus.com/)                                       | 658        | 370 s        | 563 ms         |
| [Criteo](https://www.criteo.com/)                                  | 4,359      | 327 s        | 75 ms          |
| [Twitch](https://twitch.tv/)                                       | 472        | 284 s        | 602 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)           | 1,300      | 221 s        | 170 ms         |
| [Market GID](https://www.marketgid.com/)                           | 1,799      | 219 s        | 122 ms         |
| [VK](https://vk.com/)                                              | 6,344      | 193 s        | 30 ms          |
| [Mailchimp](https://mailchimp.com/)                                | 1,035      | 175 s        | 169 ms         |
| [LinkedIn](https://www.linkedin.com/)                              | 1,598      | 170 s        | 107 ms         |
| [Bootstrap CDN](https://bootstrapcdn.com/)                         | 906        | 157 s        | 174 ms         |
| [Vox Media](https://www.voxmedia.com/)                             | 551        | 152 s        | 276 ms         |
| [PayPal](https://paypal.com)                                       | 654        | 151 s        | 231 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                        | 1,565      | 147 s        | 94 ms          |
| [Mixpanel](https://mixpanel.com/)                                  | 1,914      | 138 s        | 72 ms          |
| [Pinterest](https://pinterest.com/)                                | 1,285      | 74 s         | 58 ms          |
| [Freshdesk](https://freshdesk.com/)                                | 371        | 69 s         | 187 ms         |
| [App Dynamics](https://www.appdynamics.com/)                       | 603        | 58 s         | 96 ms          |
| [Yandex CDN](https://yandex.ru/)                                   | 382        | 55 s         | 145 ms         |
| [Help Scout](https://www.helpscout.net/)                           | 229        | 55 s         | 239 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                             | 536        | 47 s         | 88 ms          |
| [New Relic](https://newrelic.com/)                                 | 698        | 39 s         | 55 ms          |
| [Alexa](https://www.alexa.com/)                                    | 318        | 15 s         | 48 ms          |

## Future Work

1.  Introduce URL-level data for more fine-grained analysis, i.e. which libraries from Cloudflare/Google CDNs are most expensive.
1.  Expand the scope, i.e. include more third parties and have greater entity/category coverage.

## FAQs

### I don't see entity X in the list. What's up with that?

This can be for one of several reasons:

1.  The entity does not have at least 100 references to their origin in the dataset.
1.  The entity's origins have not yet been identified. See [How can I contribute?](#contribute)

### The data for entity X seems wrong. How can it be corrected?

Verify that the origins in `data/entities.json` are correct. Most issues will simply be the result of mislabelling of shared origins. If everything checks out, there is likely no further action and the data is valid. If you still believe there's errors, file an issue to discuss futher.

<a name="contribute"></a>

### How can I contribute?

Only about 90% of the third party script execution has been assigned to an entity. We could use your help identifying the rest! See [Contributing](#contributing) for details.

## Contributing

### Updating the Data

The query used to compute the origin-level data is in `sql/origin-execution-time-query.sql`, running this against the latest Lighthouse HTTP Archive should give you a JSON export of the latest data that can be checked in at `data/YYYY-MM-DD-origin-scripting.json`.

### Updating this README

This README is auto-generated from the template `lib/template.md` and the computed data. In order to update the charts, you'll need to make sure you have `cairo` installed locally in addition to `yarn install`.

```bash
# Install `cairo` and dependencies for node-canvas
brew install pkg-config cairo pango libpng jpeg giflib
```
