# Third Party Web

Data on third party entities and their impact on the web.

This document is a summary of which third party scripts are most responsible for excessive JavaScript execution on the web today.

## Table of Contents

1.  [Goals](#goals)
1.  [Methodology](#methodology)
1.  [NPM Module](#npm-module)
1.  [Updates](#updates)
1.  [Data](#data)
    1.  [Summary](#summary)
    1.  [How to Interpret](#how-to-interpret)
    1.  [Third Parties by Category](#by-category)
        1.  [Advertising](#ad)
        1.  [Analytics](#analytics)
        1.  [Social](#social)
        1.  [Video](#video)
        1.  [Developer Utilities](#utility)
        1.  [Hosting Platforms](#hosting)
        1.  [Marketing](#marketing)
        1.  [Customer Success](#customer-success)
        1.  [Content & Publishing](#content)
        1.  [Libraries](#library)
        1.  [Tag Management](#tag-manager)
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
1.  Make this information accessible and useful.

## Methodology

[HTTP Archive](https://httparchive.org/) is an inititiave that tracks how the web is built. Twice a month, ~4 million sites are crawled with [Lighthouse](https://github.com/GoogleChrome/lighthouse) on mobile. Lighthouse breaks down the total script execution time of each page and attributes the execution to a URL. Using [BigQuery](https://cloud.google.com/bigquery/), this project aggregates the script execution to the origin-level and assigns each origin to the responsible entity.

## NPM Module

The entity classification data is available as an NPM module.

```js
const { getEntity } = require("third-party-web");
const entity = getEntity("https://d36mpcpuzc4ztk.cloudfront.net/js/visitor.js");
console.log(entity);
//   {
//     "name": "Freshdesk",
//     "homepage": "https://freshdesk.com/",
//     "categories": ["customer-success"],
//     "domains": ["d36mpcpuzc4ztk.cloudfront.net"]
//   }
```

## Updates

## 2019-02-01 dataset

Huge props to [WordAds](https://wordads.co/) for reducing their impact from ~2.5s to ~200ms on average! A few entities are showing considerably less data this cycle (Media Math, Crazy Egg, DoubleVerify, Bootstrap CDN). Perhaps they've added new CDNs/hostnames that we haven't identified or the basket of sites in HTTPArchive has shifted away from their usage.

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

#### Advertising

These scripts are part of advertising networks, either serving or measuring.

| Rank | Name                                                           | Usage     | Average Impact |
| ---- | -------------------------------------------------------------- | --------- | -------------- |
| 1    | [Media Math](http://www.mediamath.com/)                        | 662       | 68 ms          |
| 2    | [Adroll](https://www.adroll.com/)                              | 3,198     | 94 ms          |
| 3    | [Amazon Ads](https://advertising.amazon.com/)                  | 22,090    | 94 ms          |
| 4    | [Scorecard Research](https://www.scorecardresearch.com/)       | 3,578     | 103 ms         |
| 5    | [Rubicon Project](https://rubiconproject.com/)                 | 3,905     | 106 ms         |
| 6    | [MGID](https://www.mgid.com/)                                  | 10,317    | 114 ms         |
| 7    | [Criteo](https://www.criteo.com/)                              | 64,547    | 116 ms         |
| 8    | [Yahoo!](https://www.yahoo.com/)                               | 3,206     | 139 ms         |
| 9    | [Bing Ads](https://bingads.microsoft.com)                      | 10,085    | 143 ms         |
| 10   | [Market GID](https://www.marketgid.com/)                       | 3,873     | 153 ms         |
| 11   | [Taboola](https://www.taboola.com/)                            | 23,853    | 176 ms         |
| 12   | [WordAds](https://wordads.co/)                                 | 32,295    | 212 ms         |
| 13   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 1,206,843 | 215 ms         |
| 14   | [Pubmatic](https://pubmatic.com/)                              | 3,140     | 225 ms         |
| 15   | [Media.net](https://www.media.net/)                            | 9,578     | 225 ms         |
| 16   | [AppNexus](https://www.appnexus.com/)                          | 14,694    | 265 ms         |
| 17   | [Yandex Ads](https://yandex.com/adv/)                          | 39,330    | 272 ms         |
| 18   | [Integral Ad Science](https://integralads.com/uk/)             | 24,532    | 305 ms         |
| 19   | [Sizmek](https://www.sizmek.com/)                              | 4,011     | 374 ms         |
| 20   | [DoubleVerify](https://www.doubleverify.com/)                  | 1,988     | 600 ms         |
| 21   | [MediaVine](https://www.mediavine.com/)                        | 9,801     | 706 ms         |
| 22   | [Moat](https://moat.com/)                                      | 14,337    | 708 ms         |
| 23   | [OpenX](https://www.openx.com/)                                | 10,729    | 836 ms         |
| 24   | [33 Across](https://33across.com/)                             | 20,137    | 863 ms         |
| 25   | [Popads](https://www.popads.net/)                              | 5,009     | 1288 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                               | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------ | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                    | 1,265     | 50 ms          |
| 2    | [Marketo](https://www.marketo.com)                                 | 603       | 52 ms          |
| 3    | Net Reviews                                                        | 1,917     | 61 ms          |
| 4    | StatCounter                                                        | 5,101     | 63 ms          |
| 5    | [Usabilla](https://usabilla.com)                                   | 737       | 66 ms          |
| 6    | etracker                                                           | 1,722     | 67 ms          |
| 7    | Amplitude Mobile Analytics                                         | 1,432     | 69 ms          |
| 8    | Heap                                                               | 1,855     | 74 ms          |
| 9    | Roxr Software                                                      | 1,823     | 75 ms          |
| 10   | Evidon                                                             | 1,677     | 76 ms          |
| 11   | Searchanise                                                        | 1,762     | 76 ms          |
| 12   | [Google Analytics](https://www.google.com/analytics/analytics/)    | 1,163,249 | 77 ms          |
| 13   | Trust Pilot                                                        | 2,613     | 77 ms          |
| 14   | [Mixpanel](https://mixpanel.com/)                                  | 5,462     | 77 ms          |
| 15   | [Snowplow](https://snowplowanalytics.com/)                         | 2,492     | 77 ms          |
| 16   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)      | 7,041     | 78 ms          |
| 17   | [Hotjar](https://www.hotjar.com/)                                  | 91,036    | 92 ms          |
| 18   | Chartbeat                                                          | 6,735     | 93 ms          |
| 19   | Parse.ly                                                           | 2,253     | 96 ms          |
| 20   | [Crazy Egg](https://www.crazyegg.com/)                             | 9,012     | 98 ms          |
| 21   | [VWO](https://vwo.com)                                             | 6,471     | 100 ms         |
| 22   | Clicktale                                                          | 2,265     | 103 ms         |
| 23   | Nosto                                                              | 3,083     | 104 ms         |
| 24   | Monetate                                                           | 626       | 107 ms         |
| 25   | [Quantcast](https://www.quantcast.com)                             | 6,758     | 110 ms         |
| 26   | Convert Insights                                                   | 896       | 110 ms         |
| 27   | Kampyle                                                            | 460       | 111 ms         |
| 28   | CallRail                                                           | 3,767     | 111 ms         |
| 29   | Marchex                                                            | 3,093     | 115 ms         |
| 30   | Picreel                                                            | 554       | 118 ms         |
| 31   | ForeSee                                                            | 2,505     | 124 ms         |
| 32   | Webtrekk                                                           | 533       | 125 ms         |
| 33   | Survicate                                                          | 514       | 126 ms         |
| 34   | Mather Economics                                                   | 543       | 128 ms         |
| 35   | Treasure Data                                                      | 9,109     | 128 ms         |
| 36   | NetRatings SiteCensus                                              | 14,619    | 141 ms         |
| 37   | Bazaarvoice                                                        | 3,256     | 141 ms         |
| 38   | Yotpo                                                              | 9,635     | 143 ms         |
| 39   | Clerk.io ApS                                                       | 735       | 161 ms         |
| 40   | Gigya                                                              | 1,828     | 174 ms         |
| 41   | Keen IO                                                            | 1,087     | 185 ms         |
| 42   | PowerReviews                                                       | 647       | 192 ms         |
| 43   | [Segment](https://segment.com/)                                    | 6,998     | 201 ms         |
| 44   | FullStory                                                          | 5,143     | 211 ms         |
| 45   | Maxymiser                                                          | 1,100     | 211 ms         |
| 46   | IBM Digital Analytics                                              | 585       | 225 ms         |
| 47   | Bounce Exchange                                                    | 1,025     | 227 ms         |
| 48   | [Optimizely](https://www.optimizely.com/)                          | 13,482    | 232 ms         |
| 49   | Feefo.com                                                          | 2,165     | 236 ms         |
| 50   | UserReport                                                         | 497       | 243 ms         |
| 51   | [Tealium](https://tealium.com/)                                    | 14,914    | 253 ms         |
| 52   | Omniconvert                                                        | 586       | 259 ms         |
| 53   | [Radar](https://www.cedexis.com/radar/)                            | 3,133     | 268 ms         |
| 54   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/) | 40,868    | 270 ms         |
| 55   | SessionCam                                                         | 1,177     | 293 ms         |
| 56   | Ezoic                                                              | 2,694     | 308 ms         |
| 57   | Pictela (AOL)                                                      | 661       | 328 ms         |
| 58   | AB Tasty                                                           | 3,021     | 353 ms         |
| 59   | [Yandex Metrica](https://metrica.yandex.com/about?)                | 221,577   | 356 ms         |
| 60   | [Histats](http://histats.com/)                                     | 14,706    | 390 ms         |
| 61   | TrackJS                                                            | 784       | 515 ms         |
| 62   | Inspectlet                                                         | 5,094     | 556 ms         |
| 63   | Mouseflow                                                          | 1,395     | 590 ms         |
| 64   | [mPulse](https://developer.akamai.com/akamai-mpulse)               | 2,521     | 775 ms         |
| 65   | [Lucky Orange](https://www.luckyorange.com/)                       | 6,113     | 834 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 6,342     | 65 ms          |
| 2    | [Instagram](https://www.instagram.com)               | 5,109     | 73 ms          |
| 3    | Kakao                                                | 7,532     | 77 ms          |
| 4    | [Pinterest](https://pinterest.com/)                  | 15,241    | 87 ms          |
| 5    | Micropat                                             | 23,917    | 88 ms          |
| 6    | Google Plus                                          | 735       | 99 ms          |
| 7    | AddShoppers                                          | 822       | 114 ms         |
| 8    | [Facebook](https://www.facebook.com)                 | 1,118,492 | 118 ms         |
| 9    | [Yandex Share](https://yastatic.net/share2/share.js) | 29,555    | 128 ms         |
| 10   | [LinkedIn](https://www.linkedin.com/)                | 12,260    | 130 ms         |
| 11   | [Twitter](https://twitter.com)                       | 274,753   | 146 ms         |
| 12   | Stackla PTY                                          | 447       | 188 ms         |
| 13   | [Shareaholic](https://www.shareaholic.com/)          | 15,913    | 211 ms         |
| 14   | [ShareThis](https://www.sharethis.com/)              | 32,318    | 229 ms         |
| 15   | [AddThis](http://www.addthis.com/)                   | 175,982   | 240 ms         |
| 16   | [Tumblr](https://tumblr.com/)                        | 40,855    | 312 ms         |
| 17   | SocialShopWave                                       | 1,003     | 346 ms         |
| 18   | [Disqus](http://disqus.com/)                         | 741       | 504 ms         |
| 19   | [PIXNET](https://www.pixnet.net/)                    | 54,969    | 605 ms         |
| 20   | LiveJournal                                          | 6,609     | 756 ms         |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage  | Average Impact |
| ---- | -------------------------------------------- | ------ | -------------- |
| 1    | [YouTube](https://youtube.com)               | 22,093 | 107 ms         |
| 2    | [Wistia](https://wistia.com/)                | 20,633 | 257 ms         |
| 3    | [Brightcove](https://www.brightcove.com/en/) | 4,933  | 441 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Trusted Shops                                                             | 1,452   | 37 ms          |
| 2    | [New Relic](https://newrelic.com/)                                        | 3,502   | 70 ms          |
| 3    | [Stripe](https://stripe.com)                                              | 4,751   | 70 ms          |
| 4    | Symantec                                                                  | 984     | 74 ms          |
| 5    | GetSiteControl                                                            | 3,685   | 75 ms          |
| 6    | Siteimprove                                                               | 1,297   | 76 ms          |
| 7    | Sooqr Search                                                              | 419     | 76 ms          |
| 8    | iubenda                                                                   | 9,820   | 79 ms          |
| 9    | LightWidget                                                               | 432     | 82 ms          |
| 10   | [OneSignal](https://onesignal.com/)                                       | 37,165  | 83 ms          |
| 11   | iovation                                                                  | 988     | 84 ms          |
| 12   | Po.st                                                                     | 776     | 92 ms          |
| 13   | [Google Maps](https://www.google.com/maps)                                | 292,126 | 102 ms         |
| 14   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 535,242 | 120 ms         |
| 15   | [AppDynamics](https://www.appdynamics.com/)                               | 1,929   | 124 ms         |
| 16   | Bold Commerce                                                             | 11,538  | 128 ms         |
| 17   | Shopgate                                                                  | 829     | 135 ms         |
| 18   | MaxCDN Enterprise                                                         | 1,501   | 144 ms         |
| 19   | Seznam                                                                    | 1,082   | 145 ms         |
| 20   | Sift Science                                                              | 935     | 150 ms         |
| 21   | Forensiq                                                                  | 2,770   | 155 ms         |
| 22   | Swiftype                                                                  | 1,290   | 162 ms         |
| 23   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 5,190   | 191 ms         |
| 24   | Fastly                                                                    | 2,469   | 195 ms         |
| 25   | Affirm                                                                    | 1,008   | 203 ms         |
| 26   | [PayPal](https://paypal.com)                                              | 6,950   | 220 ms         |
| 27   | Fraudlogix                                                                | 1,132   | 232 ms         |
| 28   | Rambler                                                                   | 8,083   | 247 ms         |
| 29   | Secomapp                                                                  | 1,040   | 279 ms         |
| 30   | [Yandex APIs](https://yandex.ru/)                                         | 57,870  | 362 ms         |
| 31   | GitHub                                                                    | 1,052   | 372 ms         |
| 32   | [Distil Networks](https://www.distilnetworks.com/)                        | 11,313  | 376 ms         |
| 33   | Datacamp                                                                  | 10,759  | 401 ms         |
| 34   | Bugsnag                                                                   | 897     | 466 ms         |
| 35   | Okas Concepts                                                             | 1,107   | 552 ms         |
| 36   | [Sentry](https://sentry.io/)                                              | 15,981  | 686 ms         |
| 37   | Esri ArcGIS                                                               | 786     | 1137 ms        |
| 38   | Mapbox                                                                    | 2,600   | 1173 ms        |
| 39   | Blindado                                                                  | 683     | 2585 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                        | Usage   | Average Impact |
| ---- | ------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](http://www.blogger.com/)          | 17,943  | 47 ms          |
| 2    | [Dealer](https://www.dealer.com/)           | 23,885  | 90 ms          |
| 3    | [WordPress](https://wp.com/)                | 126,052 | 122 ms         |
| 4    | [Shopify](https://www.shopify.com/)         | 220,676 | 158 ms         |
| 5    | [Weebly](https://www.weebly.com/)           | 35,097  | 230 ms         |
| 6    | Ecwid                                       | 602     | 253 ms         |
| 7    | [Hatena Blog](https://hatenablog.com/)      | 51,333  | 484 ms         |
| 8    | [Squarespace](https://www.squarespace.com/) | 87,878  | 491 ms         |
| 9    | [Wix](https://www.wix.com/)                 | 192,121 | 1040 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [RD Station](https://www.rdstation.com/en/) | 2,517  | 70 ms          |
| 2    | Madison Logic                               | 996    | 81 ms          |
| 3    | Bronto Software                             | 675    | 107 ms         |
| 4    | Gleam                                       | 405    | 127 ms         |
| 5    | [Listrak](https://www.listrak.com/)         | 963    | 128 ms         |
| 6    | [OptinMonster](https://optinmonster.com/)   | 1,129  | 132 ms         |
| 7    | [Beeketing](https://beeketing.com/)         | 61,179 | 138 ms         |
| 8    | [Drift](https://www.drift.com/)             | 4,073  | 141 ms         |
| 9    | [Hubspot](https://hubspot.com/)             | 21,354 | 144 ms         |
| 10   | [Mailchimp](https://mailchimp.com/)         | 22,992 | 146 ms         |
| 11   | Ve                                          | 2,553  | 156 ms         |
| 12   | Wishpond Technologies                       | 432    | 274 ms         |
| 13   | Bigcommerce                                 | 11,634 | 286 ms         |
| 14   | [Sumo](https://sumo.com/)                   | 35,677 | 385 ms         |
| 15   | [Albacross](https://albacross.com/)         | 1,382  | 727 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                     | Usage  | Average Impact |
| ---- | ---------------------------------------- | ------ | -------------- |
| 1    | SnapEngage                               | 940    | 66 ms          |
| 2    | Foursixty                                | 1,018  | 76 ms          |
| 3    | iPerceptions                             | 2,353  | 85 ms          |
| 4    | ClickDesk                                | 460    | 87 ms          |
| 5    | [LiveChat](https://www.livechatinc.com/) | 20,433 | 87 ms          |
| 6    | LivePerson                               | 5,079  | 94 ms          |
| 7    | iAdvize SAS                              | 2,587  | 97 ms          |
| 8    | Comm100                                  | 996    | 121 ms         |
| 9    | WebEngage                                | 429    | 136 ms         |
| 10   | [Freshdesk](https://freshdesk.com/)      | 909    | 140 ms         |
| 11   | [Help Scout](https://www.helpscout.net/) | 627    | 164 ms         |
| 12   | [Jivochat](https://www.jivochat.com/)    | 23,628 | 215 ms         |
| 13   | Pure Chat                                | 4,020  | 216 ms         |
| 14   | Tidio Live Chat                          | 5,971  | 284 ms         |
| 15   | [Olark](https://www.olark.com/)          | 12,258 | 318 ms         |
| 16   | Dynamic Yield                            | 1,519  | 322 ms         |
| 17   | [Intercom](https://www.intercom.com/)    | 16,809 | 334 ms         |
| 18   | [Tawk.to](https://www.tawk.to/)          | 40,598 | 345 ms         |
| 19   | LiveTex                                  | 2,576  | 374 ms         |
| 20   | [ZenDesk](https://zendesk.com/)          | 86,355 | 537 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                   | Usage  | Average Impact |
| ---- | -------------------------------------- | ------ | -------------- |
| 1    | SnapWidget                             | 635    | 39 ms          |
| 2    | PhotoBucket                            | 1,078  | 60 ms          |
| 3    | Tencent                                | 493    | 75 ms          |
| 4    | Accuweather                            | 1,333  | 78 ms          |
| 5    | issuu                                  | 747    | 83 ms          |
| 6    | The Hut Group                          | 482    | 91 ms          |
| 7    | Outbrain                               | 5,654  | 103 ms         |
| 8    | OpenTable                              | 1,421  | 106 ms         |
| 9    | Revcontent                             | 494    | 125 ms         |
| 10   | Medium                                 | 2,553  | 179 ms         |
| 11   | Livefyre                               | 519    | 184 ms         |
| 12   | [AMP](https://www.ampproject.org/)     | 61,086 | 199 ms         |
| 13   | Booking.com                            | 557    | 202 ms         |
| 14   | Embedly                                | 2,794  | 232 ms         |
| 15   | Flowplayer                             | 475    | 234 ms         |
| 16   | PERFORM                                | 462    | 282 ms         |
| 17   | [Vox Media](https://www.voxmedia.com/) | 704    | 456 ms         |
| 18   | [Hotmart](https://www.hotmart.com/)    | 854    | 785 ms         |

<a name="library"></a>

#### Libraries

These are mostly open source libraries (e.g. jQuery) served over different public CDNs. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the libraries being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 1,383   | 48 ms          |
| 2    | [FontAwesome CDN](https://fontawesome.com/)                  | 15,661  | 102 ms         |
| 3    | Fort Awesome                                                 | 423     | 123 ms         |
| 4    | [Yandex CDN](https://yandex.ru/)                             | 2,020   | 123 ms         |
| 5    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 4,519   | 131 ms         |
| 6    | Microsoft Hosted Libs                                        | 4,598   | 142 ms         |
| 7    | [jQuery CDN](https://code.jquery.com/)                       | 142,889 | 170 ms         |
| 8    | [Google CDN](https://developers.google.com/speed/libraries/) | 745,046 | 177 ms         |
| 9    | [Cloudflare CDN](https://cdnjs.com/)                         | 101,203 | 193 ms         |
| 10   | Monotype                                                     | 4,207   | 202 ms         |
| 11   | [Unpkg](https://unpkg.com)                                   | 2,591   | 240 ms         |
| 12   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 24,627  | 285 ms         |
| 13   | [CreateJS CDN](http://code.createjs.com/)                    | 1,757   | 3056 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | TagCommander                                                                  | 1,236     | 87 ms          |
| 2    | Opentag                                                                       | 995       | 151 ms         |
| 3    | BrightTag                                                                     | 8,050     | 156 ms         |
| 4    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,173    | 183 ms         |
| 5    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,098,396 | 431 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage   | Average Impact |
| ---- | ------------------------------------------------- | ------- | -------------- |
| 1    | Pagely                                            | 1,120   | 104 ms         |
| 2    | [Amazon Web Services](https://aws.amazon.com/s3/) | 43,581  | 145 ms         |
| 3    | Skype                                             | 422     | 166 ms         |
| 4    | [All Other 3rd Parties](#by-category)             | 703,107 | 209 ms         |
| 5    | [Ensighten](https://www.ensighten.com/)           | 6,753   | 249 ms         |
| 6    | [Parking Crew](http://parkingcrew.net/)           | 4,542   | 461 ms         |
| 7    | uLogin                                            | 2,497   | 1080 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                          | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,098,396  | 473,333 s    | 431 ms         |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                | 1,206,843  | 259,963 s    | 215 ms         |
| [Wix](https://www.wix.com/)                                                   | 192,121    | 199,834 s    | 1040 ms        |
| [All Other 3rd Parties](#by-category)                                         | 703,107    | 146,801 s    | 209 ms         |
| [Facebook](https://www.facebook.com)                                          | 1,118,492  | 132,503 s    | 118 ms         |
| [Google CDN](https://developers.google.com/speed/libraries/)                  | 745,046    | 131,930 s    | 177 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)               | 1,163,249  | 89,009 s     | 77 ms          |
| [Yandex Metrica](https://metrica.yandex.com/about?)                           | 221,577    | 78,814 s     | 356 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)     | 535,242    | 63,966 s     | 120 ms         |
| [ZenDesk](https://zendesk.com/)                                               | 86,355     | 46,340 s     | 537 ms         |
| [Squarespace](https://www.squarespace.com/)                                   | 87,878     | 43,179 s     | 491 ms         |
| [AddThis](http://www.addthis.com/)                                            | 175,982    | 42,229 s     | 240 ms         |
| [Twitter](https://twitter.com)                                                | 274,753    | 40,120 s     | 146 ms         |
| [Shopify](https://www.shopify.com/)                                           | 220,676    | 34,854 s     | 158 ms         |
| [PIXNET](https://www.pixnet.net/)                                             | 54,969     | 33,257 s     | 605 ms         |
| [Google Maps](https://www.google.com/maps)                                    | 292,126    | 29,865 s     | 102 ms         |
| [Hatena Blog](https://hatenablog.com/)                                        | 51,333     | 24,848 s     | 484 ms         |
| [jQuery CDN](https://code.jquery.com/)                                        | 142,889    | 24,222 s     | 170 ms         |
| [Yandex APIs](https://yandex.ru/)                                             | 57,870     | 20,926 s     | 362 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                          | 101,203    | 19,548 s     | 193 ms         |
| [33 Across](https://33across.com/)                                            | 20,137     | 17,375 s     | 863 ms         |
| [WordPress](https://wp.com/)                                                  | 126,052    | 15,390 s     | 122 ms         |
| [Tawk.to](https://www.tawk.to/)                                               | 40,598     | 14,007 s     | 345 ms         |
| [Sumo](https://sumo.com/)                                                     | 35,677     | 13,749 s     | 385 ms         |
| [Tumblr](https://tumblr.com/)                                                 | 40,855     | 12,755 s     | 312 ms         |
| [AMP](https://www.ampproject.org/)                                            | 61,086     | 12,136 s     | 199 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)            | 40,868     | 11,025 s     | 270 ms         |
| [Sentry](https://sentry.io/)                                                  | 15,981     | 10,966 s     | 686 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                         | 39,330     | 10,689 s     | 272 ms         |
| [Moat](https://moat.com/)                                                     | 14,337     | 10,154 s     | 708 ms         |
| [OpenX](https://www.openx.com/)                                               | 10,729     | 8,974 s      | 836 ms         |
| [Beeketing](https://beeketing.com/)                                           | 61,179     | 8,473 s      | 138 ms         |
| [Hotjar](https://www.hotjar.com/)                                             | 91,036     | 8,395 s      | 92 ms          |
| [Weebly](https://www.weebly.com/)                                             | 35,097     | 8,062 s      | 230 ms         |
| [Criteo](https://www.criteo.com/)                                             | 64,547     | 7,496 s      | 116 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                            | 24,532     | 7,477 s      | 305 ms         |
| [ShareThis](https://www.sharethis.com/)                                       | 32,318     | 7,405 s      | 229 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                     | 24,627     | 7,007 s      | 285 ms         |
| [MediaVine](https://www.mediavine.com/)                                       | 9,801      | 6,915 s      | 706 ms         |
| [WordAds](https://wordads.co/)                                                | 32,295     | 6,844 s      | 212 ms         |
| [Popads](https://www.popads.net/)                                             | 5,009      | 6,451 s      | 1288 ms        |
| [Amazon Web Services](https://aws.amazon.com/s3/)                             | 43,581     | 6,313 s      | 145 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,173     | 5,885 s      | 183 ms         |
| [Histats](http://histats.com/)                                                | 14,706     | 5,739 s      | 390 ms         |
| [Intercom](https://www.intercom.com/)                                         | 16,809     | 5,614 s      | 334 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                     | 1,757      | 5,370 s      | 3056 ms        |
| [Wistia](https://wistia.com/)                                                 | 20,633     | 5,294 s      | 257 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                  | 6,113      | 5,098 s      | 834 ms         |
| [Jivochat](https://www.jivochat.com/)                                         | 23,628     | 5,084 s      | 215 ms         |
| LiveJournal                                                                   | 6,609      | 4,997 s      | 756 ms         |
| Datacamp                                                                      | 10,759     | 4,316 s      | 401 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                            | 11,313     | 4,254 s      | 376 ms         |
| [Taboola](https://www.taboola.com/)                                           | 23,853     | 4,190 s      | 176 ms         |
| [Olark](https://www.olark.com/)                                               | 12,258     | 3,902 s      | 318 ms         |
| [AppNexus](https://www.appnexus.com/)                                         | 14,694     | 3,888 s      | 265 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                          | 29,555     | 3,772 s      | 128 ms         |
| [Tealium](https://tealium.com/)                                               | 14,914     | 3,771 s      | 253 ms         |
| Privy                                                                         | 10,038     | 3,404 s      | 339 ms         |
| Tynt                                                                          | 26,142     | 3,400 s      | 130 ms         |
| [Shareaholic](https://www.shareaholic.com/)                                   | 15,913     | 3,357 s      | 211 ms         |
| [Mailchimp](https://mailchimp.com/)                                           | 22,992     | 3,357 s      | 146 ms         |
| Bigcommerce                                                                   | 11,634     | 3,331 s      | 286 ms         |
| [Optimizely](https://www.optimizely.com/)                                     | 13,482     | 3,135 s      | 232 ms         |
| [Hubspot](https://hubspot.com/)                                               | 21,354     | 3,078 s      | 144 ms         |
| [OneSignal](https://onesignal.com/)                                           | 37,165     | 3,075 s      | 83 ms          |
| Mapbox                                                                        | 2,600      | 3,050 s      | 1173 ms        |
| VigLink                                                                       | 8,416      | 3,001 s      | 357 ms         |
| Inspectlet                                                                    | 5,094      | 2,834 s      | 556 ms         |
| uLogin                                                                        | 2,497      | 2,697 s      | 1080 ms        |
| StickyADS.tv                                                                  | 2,819      | 2,572 s      | 912 ms         |
| [YouTube](https://youtube.com)                                                | 22,093     | 2,370 s      | 107 ms         |
| GumGum                                                                        | 4,202      | 2,252 s      | 536 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                  | 4,933      | 2,173 s      | 441 ms         |
| [Media.net](https://www.media.net/)                                           | 9,578      | 2,158 s      | 225 ms         |
| [Dealer](https://www.dealer.com/)                                             | 23,885     | 2,158 s      | 90 ms          |
| AdMatic                                                                       | 2,767      | 2,148 s      | 776 ms         |
| Infolinks                                                                     | 4,133      | 2,148 s      | 520 ms         |
| Micropat                                                                      | 23,917     | 2,108 s      | 88 ms          |
| [Parking Crew](http://parkingcrew.net/)                                       | 4,542      | 2,093 s      | 461 ms         |
| LKQD                                                                          | 2,625      | 2,088 s      | 796 ms         |
| [Amazon Ads](https://advertising.amazon.com/)                                 | 22,090     | 2,079 s      | 94 ms          |
| NetRatings SiteCensus                                                         | 14,619     | 2,067 s      | 141 ms         |
| Skimbit                                                                       | 15,955     | 2,059 s      | 129 ms         |
| Rambler                                                                       | 8,083      | 1,996 s      | 247 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 2,521      | 1,953 s      | 775 ms         |
| [LiveChat](https://www.livechatinc.com/)                                      | 20,433     | 1,786 s      | 87 ms          |
| Blindado                                                                      | 683        | 1,765 s      | 2585 ms        |
| Tidio Live Chat                                                               | 5,971      | 1,698 s      | 284 ms         |
| [Ensighten](https://www.ensighten.com/)                                       | 6,753      | 1,683 s      | 249 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                   | 15,661     | 1,599 s      | 102 ms         |
| [LinkedIn](https://www.linkedin.com/)                                         | 12,260     | 1,594 s      | 130 ms         |
| [PayPal](https://paypal.com)                                                  | 6,950      | 1,531 s      | 220 ms         |
| [Sizmek](https://www.sizmek.com/)                                             | 4,011      | 1,501 s      | 374 ms         |
| Bold Commerce                                                                 | 11,538     | 1,480 s      | 128 ms         |
| BlueCava                                                                      | 6,752      | 1,443 s      | 214 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                     | 10,085     | 1,442 s      | 143 ms         |
| [Segment](https://segment.com/)                                               | 6,998      | 1,406 s      | 201 ms         |
| Yotpo                                                                         | 9,635      | 1,379 s      | 143 ms         |
| Adform                                                                        | 8,228      | 1,364 s      | 166 ms         |
| [Pinterest](https://pinterest.com/)                                           | 15,241     | 1,319 s      | 87 ms          |
| Klaviyo                                                                       | 7,350      | 1,259 s      | 171 ms         |
| BrightTag                                                                     | 8,050      | 1,256 s      | 156 ms         |
| Teads                                                                         | 7,036      | 1,195 s      | 170 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                 | 1,988      | 1,193 s      | 600 ms         |
| Between Digital                                                               | 1,386      | 1,192 s      | 860 ms         |
| [MGID](https://www.mgid.com/)                                                 | 10,317     | 1,174 s      | 114 ms         |
| Treasure Data                                                                 | 9,109      | 1,168 s      | 128 ms         |
| FullStory                                                                     | 5,143      | 1,085 s      | 211 ms         |
| AB Tasty                                                                      | 3,021      | 1,067 s      | 353 ms         |
| [Albacross](https://albacross.com/)                                           | 1,382      | 1,004 s      | 727 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                | 5,190      | 989 s        | 191 ms         |
| LiveTex                                                                       | 2,576      | 964 s        | 374 ms         |
| JustUno                                                                       | 5,870      | 928 s        | 158 ms         |
| Esri ArcGIS                                                                   | 786        | 894 s        | 1137 ms        |
| [Crazy Egg](https://www.crazyegg.com/)                                        | 9,012      | 881 s        | 98 ms          |
| Pure Chat                                                                     | 4,020      | 866 s        | 216 ms         |
| Monotype                                                                      | 4,207      | 850 s        | 202 ms         |
| [Radar](https://www.cedexis.com/radar/)                                       | 3,133      | 839 s        | 268 ms         |
| [Blogger](http://www.blogger.com/)                                            | 17,943     | 839 s        | 47 ms          |
| Ezoic                                                                         | 2,694      | 830 s        | 308 ms         |
| Mouseflow                                                                     | 1,395      | 823 s        | 590 ms         |
| sovrn                                                                         | 5,144      | 813 s        | 158 ms         |
| Index Exchange                                                                | 3,459      | 789 s        | 228 ms         |
| iubenda                                                                       | 9,820      | 772 s        | 79 ms          |
| [Quantcast](https://www.quantcast.com)                                        | 6,758      | 744 s        | 110 ms         |
| [Pubmatic](https://pubmatic.com/)                                             | 3,140      | 707 s        | 225 ms         |
| [Hotmart](https://www.hotmart.com/)                                           | 854        | 670 s        | 785 ms         |
| Microsoft Hosted Libs                                                         | 4,598      | 651 s        | 142 ms         |
| [VWO](https://vwo.com)                                                        | 6,471      | 649 s        | 100 ms         |
| Embedly                                                                       | 2,794      | 649 s        | 232 ms         |
| Chartbeat                                                                     | 6,735      | 624 s        | 93 ms          |
| [Unpkg](https://unpkg.com)                                                    | 2,591      | 621 s        | 240 ms         |
| Okas Concepts                                                                 | 1,107      | 611 s        | 552 ms         |
| [Market GID](https://www.marketgid.com/)                                      | 3,873      | 592 s        | 153 ms         |
| iBillboard                                                                    | 3,372      | 591 s        | 175 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                     | 4,519      | 590 s        | 131 ms         |
| Outbrain                                                                      | 5,654      | 581 s        | 103 ms         |
| Kakao                                                                         | 7,532      | 578 s        | 77 ms          |
| [Drift](https://www.drift.com/)                                               | 4,073      | 575 s        | 141 ms         |
| LongTail Ad Solutions                                                         | 2,841      | 561 s        | 197 ms         |
| Admixer for Publishers                                                        | 2,453      | 553 s        | 225 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 7,041      | 550 s        | 78 ms          |
| AudienceSearch                                                                | 4,149      | 524 s        | 126 ms         |
| DTSCOUT                                                                       | 4,371      | 523 s        | 120 ms         |
| Feefo.com                                                                     | 2,165      | 510 s        | 236 ms         |
| Cxense                                                                        | 3,459      | 496 s        | 144 ms         |
| Dynamic Yield                                                                 | 1,519      | 489 s        | 322 ms         |
| Fastly                                                                        | 2,469      | 481 s        | 195 ms         |
| LivePerson                                                                    | 5,079      | 477 s        | 94 ms          |
| Bazaarvoice                                                                   | 3,256      | 460 s        | 141 ms         |
| Vidible                                                                       | 1,151      | 459 s        | 399 ms         |
| Medium                                                                        | 2,553      | 457 s        | 179 ms         |
| [Yahoo!](https://www.yahoo.com/)                                              | 3,206      | 444 s        | 139 ms         |
| JuicyAds                                                                      | 2,789      | 443 s        | 159 ms         |
| Forensiq                                                                      | 2,770      | 431 s        | 155 ms         |
| [Mixpanel](https://mixpanel.com/)                                             | 5,462      | 420 s        | 77 ms          |
| CallRail                                                                      | 3,767      | 418 s        | 111 ms         |
| Bugsnag                                                                       | 897        | 418 s        | 466 ms         |
| MailMunch                                                                     | 5,180      | 416 s        | 80 ms          |
| [VK](https://vk.com/)                                                         | 6,342      | 414 s        | 65 ms          |
| [Rubicon Project](https://rubiconproject.com/)                                | 3,905      | 413 s        | 106 ms         |
| TrackJS                                                                       | 784        | 404 s        | 515 ms         |
| Digital Advertising Consortium                                                | 3,454      | 400 s        | 116 ms         |
| Ve                                                                            | 2,553      | 399 s        | 156 ms         |
| Audience 360                                                                  | 443        | 397 s        | 897 ms         |
| GitHub                                                                        | 1,052      | 391 s        | 372 ms         |
| [Disqus](http://disqus.com/)                                                  | 741        | 374 s        | 504 ms         |
| [Instagram](https://www.instagram.com)                                        | 5,109      | 373 s        | 73 ms          |
| [Scorecard Research](https://www.scorecardresearch.com/)                      | 3,578      | 369 s        | 103 ms         |
| Sharethrough                                                                  | 2,255      | 360 s        | 160 ms         |
| Marchex                                                                       | 3,093      | 357 s        | 115 ms         |
| SocialShopWave                                                                | 1,003      | 347 s        | 346 ms         |
| SessionCam                                                                    | 1,177      | 345 s        | 293 ms         |
| [Stripe](https://stripe.com)                                                  | 4,751      | 334 s        | 70 ms          |
| [Vox Media](https://www.voxmedia.com/)                                        | 704        | 321 s        | 456 ms         |
| Nosto                                                                         | 3,083      | 320 s        | 104 ms         |
| StatCounter                                                                   | 5,101      | 320 s        | 63 ms          |
| Gigya                                                                         | 1,828      | 318 s        | 174 ms         |
| fluct                                                                         | 4,760      | 318 s        | 67 ms          |
| ForeSee                                                                       | 2,505      | 310 s        | 124 ms         |
| Rocket Fuel                                                                   | 2,414      | 310 s        | 128 ms         |
| PushCrew                                                                      | 3,235      | 305 s        | 94 ms          |
| Gemius                                                                        | 4,431      | 302 s        | 68 ms          |
| [Adroll](https://www.adroll.com/)                                             | 3,198      | 301 s        | 94 ms          |
| SmartAdServer                                                                 | 2,482      | 294 s        | 118 ms         |
| Secomapp                                                                      | 1,040      | 290 s        | 279 ms         |
| Smart AdServer                                                                | 2,141      | 283 s        | 132 ms         |
| OwnerIQ                                                                       | 3,055      | 282 s        | 92 ms          |
| GetSiteControl                                                                | 3,685      | 277 s        | 75 ms          |
| Fraudlogix                                                                    | 1,132      | 262 s        | 232 ms         |
| Yieldmo                                                                       | 514        | 259 s        | 504 ms         |
| Adyoulike                                                                     | 1,543      | 259 s        | 168 ms         |
| iAdvize SAS                                                                   | 2,587      | 252 s        | 97 ms          |
| [Yandex CDN](https://yandex.ru/)                                              | 2,020      | 249 s        | 123 ms         |
| Digioh                                                                        | 823        | 248 s        | 302 ms         |
| Unbounce                                                                      | 2,777      | 247 s        | 89 ms          |
| [New Relic](https://newrelic.com/)                                            | 3,502      | 244 s        | 70 ms          |
| [AppDynamics](https://www.appdynamics.com/)                                   | 1,929      | 240 s        | 124 ms         |
| Clicktale                                                                     | 2,265      | 233 s        | 103 ms         |
| Bounce Exchange                                                               | 1,025      | 233 s        | 227 ms         |
| Maxymiser                                                                     | 1,100      | 232 s        | 211 ms         |
| PubNation                                                                     | 2,473      | 228 s        | 92 ms          |
| Crowd Control                                                                 | 2,949      | 220 s        | 75 ms          |
| piano                                                                         | 689        | 217 s        | 315 ms         |
| Pictela (AOL)                                                                 | 661        | 217 s        | 328 ms         |
| MaxCDN Enterprise                                                             | 1,501      | 216 s        | 144 ms         |
| Parse.ly                                                                      | 2,253      | 216 s        | 96 ms          |
| Adverline Board                                                               | 1,544      | 212 s        | 137 ms         |
| Swiftype                                                                      | 1,290      | 210 s        | 162 ms         |
| Affirm                                                                        | 1,008      | 204 s        | 203 ms         |
| Ooyala                                                                        | 724        | 204 s        | 282 ms         |
| Keen IO                                                                       | 1,087      | 201 s        | 185 ms         |
| Trust Pilot                                                                   | 2,613      | 201 s        | 77 ms          |
| iPerceptions                                                                  | 2,353      | 199 s        | 85 ms          |
| BlueKai                                                                       | 2,752      | 196 s        | 71 ms          |
| [Snowplow](https://snowplowanalytics.com/)                                    | 2,492      | 193 s        | 77 ms          |
| Microad                                                                       | 1,095      | 186 s        | 169 ms         |
| Perfect Market                                                                | 770        | 184 s        | 239 ms         |
| Interpublic Group                                                             | 1,484      | 180 s        | 122 ms         |
| [RD Station](https://www.rdstation.com/en/)                                   | 2,517      | 176 s        | 70 ms          |
| Sortable                                                                      | 850        | 176 s        | 206 ms         |
| Yieldify                                                                      | 514        | 166 s        | 323 ms         |
| Meetrics                                                                      | 413        | 158 s        | 383 ms         |
| Seznam                                                                        | 1,082      | 157 s        | 145 ms         |
| Ecwid                                                                         | 602        | 152 s        | 253 ms         |
| Omniconvert                                                                   | 586        | 152 s        | 259 ms         |
| Opentag                                                                       | 995        | 151 s        | 151 ms         |
| OpenTable                                                                     | 1,421      | 150 s        | 106 ms         |
| Chitika                                                                       | 1,037      | 149 s        | 144 ms         |
| [OptinMonster](https://optinmonster.com/)                                     | 1,129      | 149 s        | 132 ms         |
| Sift Science                                                                  | 935        | 140 s        | 150 ms         |
| Heap                                                                          | 1,855      | 137 s        | 74 ms          |
| Roxr Software                                                                 | 1,823      | 137 s        | 75 ms          |
| Searchanise                                                                   | 1,762      | 134 s        | 76 ms          |
| Constant Contact                                                              | 1,304      | 133 s        | 102 ms         |
| IBM Digital Analytics                                                         | 585        | 132 s        | 225 ms         |
| PERFORM                                                                       | 462        | 130 s        | 282 ms         |
| Evidon                                                                        | 1,677      | 127 s        | 76 ms          |
| [Freshdesk](https://freshdesk.com/)                                           | 909        | 127 s        | 140 ms         |
| Adocean                                                                       | 1,066      | 126 s        | 118 ms         |
| PowerReviews                                                                  | 647        | 124 s        | 192 ms         |
| [Listrak](https://www.listrak.com/)                                           | 963        | 123 s        | 128 ms         |
| UserReport                                                                    | 497        | 121 s        | 243 ms         |
| Comm100                                                                       | 996        | 121 s        | 121 ms         |
| TrafficStars                                                                  | 1,042      | 120 s        | 115 ms         |
| Clerk.io ApS                                                                  | 735        | 118 s        | 161 ms         |
| Wishpond Technologies                                                         | 432        | 118 s        | 274 ms         |
| Net Reviews                                                                   | 1,917      | 116 s        | 61 ms          |
| Pagely                                                                        | 1,120      | 116 s        | 104 ms         |
| etracker                                                                      | 1,722      | 115 s        | 67 ms          |
| Booking.com                                                                   | 557        | 112 s        | 202 ms         |
| Shopgate                                                                      | 829        | 112 s        | 135 ms         |
| Flowplayer                                                                    | 475        | 111 s        | 234 ms         |
| Adnium                                                                        | 451        | 109 s        | 241 ms         |
| Rakuten Marketing                                                             | 1,342      | 108 s        | 81 ms          |
| TagCommander                                                                  | 1,236      | 108 s        | 87 ms          |
| Accuweather                                                                   | 1,333      | 104 s        | 78 ms          |
| IPONWEB                                                                       | 887        | 104 s        | 118 ms         |
| [Help Scout](https://www.helpscout.net/)                                      | 627        | 103 s        | 164 ms         |
| Media Management Technologies                                                 | 407        | 102 s        | 250 ms         |
| Smarter Click                                                                 | 480        | 99 s         | 207 ms         |
| Amplitude Mobile Analytics                                                    | 1,432      | 99 s         | 69 ms          |
| eBay                                                                          | 590        | 99 s         | 167 ms         |
| Convert Insights                                                              | 896        | 99 s         | 110 ms         |
| Siteimprove                                                                   | 1,297      | 99 s         | 76 ms          |
| Livefyre                                                                      | 519        | 96 s         | 184 ms         |
| AddShoppers                                                                   | 822        | 94 s         | 114 ms         |
| Bizible                                                                       | 758        | 87 s         | 115 ms         |
| Polar Mobile Group                                                            | 504        | 85 s         | 168 ms         |
| Stackla PTY                                                                   | 447        | 84 s         | 188 ms         |
| iovation                                                                      | 988        | 83 s         | 84 ms          |
| Madison Logic                                                                 | 996        | 81 s         | 81 ms          |
| Foursixty                                                                     | 1,018      | 77 s         | 76 ms          |
| ExoClick                                                                      | 2,574      | 74 s         | 29 ms          |
| Google Plus                                                                   | 735        | 73 s         | 99 ms          |
| Symantec                                                                      | 984        | 72 s         | 74 ms          |
| Refersion                                                                     | 750        | 72 s         | 96 ms          |
| Bronto Software                                                               | 675        | 72 s         | 107 ms         |
| Po.st                                                                         | 776        | 71 s         | 92 ms          |
| Affiliate Window                                                              | 988        | 70 s         | 71 ms          |
| Skype                                                                         | 422        | 70 s         | 166 ms         |
| Mather Economics                                                              | 543        | 69 s         | 128 ms         |
| OptiMonk                                                                      | 771        | 68 s         | 89 ms          |
| Adkontekst                                                                    | 450        | 67 s         | 150 ms         |
| Monetate                                                                      | 626        | 67 s         | 107 ms         |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                | 1,383      | 67 s         | 48 ms          |
| Webtrekk                                                                      | 533        | 66 s         | 125 ms         |
| Picreel                                                                       | 554        | 65 s         | 118 ms         |
| Tail Target                                                                   | 710        | 65 s         | 91 ms          |
| PhotoBucket                                                                   | 1,078      | 65 s         | 60 ms          |
| Survicate                                                                     | 514        | 65 s         | 126 ms         |
| [Alexa](https://www.alexa.com/)                                               | 1,265      | 63 s         | 50 ms          |
| issuu                                                                         | 747        | 62 s         | 83 ms          |
| SnapEngage                                                                    | 940        | 62 s         | 66 ms          |
| Revcontent                                                                    | 494        | 62 s         | 125 ms         |
| eXelate                                                                       | 591        | 61 s         | 104 ms         |
| Cross Pixel Media                                                             | 412        | 59 s         | 144 ms         |
| WebEngage                                                                     | 429        | 59 s         | 136 ms         |
| GetResponse                                                                   | 658        | 58 s         | 89 ms          |
| Branch Metrics                                                                | 836        | 55 s         | 66 ms          |
| Geniee                                                                        | 1,316      | 55 s         | 42 ms          |
| Trusted Shops                                                                 | 1,452      | 53 s         | 37 ms          |
| Fort Awesome                                                                  | 423        | 52 s         | 123 ms         |
| Gleam                                                                         | 405        | 52 s         | 127 ms         |
| plista                                                                        | 409        | 51 s         | 125 ms         |
| Kampyle                                                                       | 460        | 51 s         | 111 ms         |
| [Usabilla](https://usabilla.com)                                              | 737        | 49 s         | 66 ms          |
| Elastic Ad                                                                    | 497        | 47 s         | 95 ms          |
| Republer                                                                      | 513        | 46 s         | 89 ms          |
| Autopilot                                                                     | 563        | 45 s         | 80 ms          |
| Tribal Fusion                                                                 | 909        | 45 s         | 49 ms          |
| [Media Math](http://www.mediamath.com/)                                       | 662        | 45 s         | 68 ms          |
| Tradelab                                                                      | 570        | 44 s         | 78 ms          |
| The ADEX                                                                      | 577        | 44 s         | 76 ms          |
| The Hut Group                                                                 | 482        | 44 s         | 91 ms          |
| Nativo                                                                        | 503        | 42 s         | 83 ms          |
| ClickDesk                                                                     | 460        | 40 s         | 87 ms          |
| Neodata                                                                       | 484        | 39 s         | 80 ms          |
| Nend                                                                          | 995        | 39 s         | 39 ms          |
| Intent IQ                                                                     | 499        | 37 s         | 75 ms          |
| Tencent                                                                       | 493        | 37 s         | 75 ms          |
| LightWidget                                                                   | 432        | 36 s         | 82 ms          |
| Adscale                                                                       | 438        | 33 s         | 76 ms          |
| Sooqr Search                                                                  | 419        | 32 s         | 76 ms          |
| [Marketo](https://www.marketo.com)                                            | 603        | 32 s         | 52 ms          |
| One by AOL                                                                    | 430        | 26 s         | 60 ms          |
| SnapWidget                                                                    | 635        | 25 s         | 39 ms          |

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

### Thanks

A **huge** thanks to [@simonhearne](https://twitter.com/simonhearne) and [@soulgalore](https://twitter.com/soulislove) for their assistance in classifying additional domains!

### Updating the Entities

The domain->entity mapping can be found in `data/entities.json`. Adding a new entity is as simple as adding a new array item with the following form.

```js
{
    "name": "Facebook",
    "homepage": "https://www.facebook.com",
    "categories": ["social"],
    "domains": [
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

This README is auto-generated from the templates `lib/` and the computed data. In order to update the charts, you'll need to make sure you have `cairo` installed locally in addition to `yarn install`.

```bash
# Install `cairo` and dependencies for node-canvas
brew install pkg-config cairo pango libpng jpeg giflib
```
