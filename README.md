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

## 2019-03-01 dataset

Almost 2,000 entities tracked now across ~3,000+ domains! Huge props to [@simonhearne](https://twitter.com/simonhearne) for making this massive increase possible. Tag Managers have now been split out into their own category since they represented such a large percentage of the "Mixed / Other" category.

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
| 1    | ExoClick                                                       | 2,714     | 34 ms          |
| 2    | Tribal Fusion                                                  | 1,082     | 54 ms          |
| 3    | Gemius                                                         | 6,998     | 69 ms          |
| 4    | BlueKai                                                        | 2,548     | 71 ms          |
| 5    | Crowd Control                                                  | 2,553     | 74 ms          |
| 6    | MailMunch                                                      | 4,315     | 77 ms          |
| 7    | fluct                                                          | 6,732     | 79 ms          |
| 8    | Geniee                                                         | 2,226     | 81 ms          |
| 9    | Rakuten Marketing                                              | 1,540     | 83 ms          |
| 10   | PubNation                                                      | 2,499     | 88 ms          |
| 11   | [Scorecard Research](https://www.scorecardresearch.com/)       | 9,088     | 94 ms          |
| 12   | Unbounce                                                       | 2,338     | 95 ms          |
| 13   | [Outbrain](https://www.outbrain.com/)                          | 5,244     | 98 ms          |
| 14   | Constant Contact                                               | 1,251     | 101 ms         |
| 15   | PushCrew                                                       | 3,335     | 101 ms         |
| 16   | SmartAdServer                                                  | 1,776     | 102 ms         |
| 17   | [Rubicon Project](https://rubiconproject.com/)                 | 3,011     | 107 ms         |
| 18   | [Amazon Ads](https://ad.amazon.com/)                           | 24,660    | 108 ms         |
| 19   | OwnerIQ                                                        | 1,541     | 110 ms         |
| 20   | [Adroll](https://www.adroll.com/)                              | 3,119     | 111 ms         |
| 21   | Digital ad Consortium                                          | 3,777     | 117 ms         |
| 22   | AudienceSearch                                                 | 4,389     | 117 ms         |
| 23   | Smart AdServer                                                 | 3,223     | 121 ms         |
| 24   | TrafficStars                                                   | 1,093     | 122 ms         |
| 25   | DTSCOUT                                                        | 7,417     | 130 ms         |
| 26   | Adocean                                                        | 1,319     | 136 ms         |
| 27   | Adverline Board                                                | 1,307     | 137 ms         |
| 28   | [Yahoo!](https://www.yahoo.com/)                               | 3,830     | 138 ms         |
| 29   | [Criteo](https://www.criteo.com/)                              | 66,114    | 139 ms         |
| 30   | Skimbit                                                        | 15,074    | 146 ms         |
| 31   | Microad                                                        | 1,328     | 149 ms         |
| 32   | Chitika                                                        | 1,010     | 150 ms         |
| 33   | Cxense                                                         | 3,773     | 153 ms         |
| 34   | JustUno                                                        | 1,944     | 154 ms         |
| 35   | Tynt                                                           | 25,583    | 154 ms         |
| 36   | Adform                                                         | 9,062     | 155 ms         |
| 37   | Rocket Fuel                                                    | 5,755     | 161 ms         |
| 38   | [MGID](https://www.mgid.com/)                                  | 10,481    | 161 ms         |
| 39   | JuicyAds                                                       | 2,935     | 163 ms         |
| 40   | [Bing Ads](https://bingads.microsoft.com)                      | 13,332    | 167 ms         |
| 41   | Sharethrough                                                   | 2,195     | 170 ms         |
| 42   | sovrn                                                          | 5,371     | 172 ms         |
| 43   | [Pubmatic](https://pubmatic.com/)                              | 6,439     | 173 ms         |
| 44   | Klaviyo                                                        | 7,677     | 181 ms         |
| 45   | Teads                                                          | 6,589     | 187 ms         |
| 46   | [Market GID](https://www.marketgid.com/)                       | 3,124     | 190 ms         |
| 47   | Index Exchange                                                 | 3,336     | 196 ms         |
| 48   | [Taboola](https://www.taboola.com/)                            | 25,671    | 200 ms         |
| 49   | LongTail Ad Solutions                                          | 2,789     | 203 ms         |
| 50   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 1,165,800 | 221 ms         |
| 51   | Sortable                                                       | 1,028     | 252 ms         |
| 52   | [WordAds](https://wordads.co/)                                 | 33,392    | 252 ms         |
| 53   | [Yandex Ads](https://yandex.com/adv/)                          | 38,205    | 266 ms         |
| 54   | iBillboard                                                     | 3,258     | 272 ms         |
| 55   | Admixer for Publishers                                         | 2,597     | 280 ms         |
| 56   | [AppNexus](https://www.appnexus.com/)                          | 14,926    | 308 ms         |
| 57   | [Sizmek](https://www.sizmek.com/)                              | 3,935     | 321 ms         |
| 58   | VigLink                                                        | 5,806     | 325 ms         |
| 59   | Privy                                                          | 9,952     | 329 ms         |
| 60   | [Media.net](https://www.media.net/)                            | 11,818    | 334 ms         |
| 61   | [Integral Ad Science](https://integralads.com/uk/)             | 25,277    | 368 ms         |
| 62   | [MediaVine](https://www.mediavine.com/)                        | 9,768     | 520 ms         |
| 63   | Infolinks                                                      | 4,090     | 524 ms         |
| 64   | [DoubleVerify](https://www.doubleverify.com/)                  | 4,033     | 537 ms         |
| 65   | GumGum                                                         | 4,172     | 589 ms         |
| 66   | Between Digital                                                | 1,107     | 600 ms         |
| 67   | [Popads](https://www.popads.net/)                              | 4,548     | 681 ms         |
| 68   | Vidible                                                        | 1,566     | 746 ms         |
| 69   | [Moat](https://moat.com/)                                      | 18,342    | 756 ms         |
| 70   | AdMatic                                                        | 2,707     | 759 ms         |
| 71   | [33 Across](https://33across.com/)                             | 15,704    | 876 ms         |
| 72   | LKQD                                                           | 2,090     | 885 ms         |
| 73   | [OpenX](https://www.openx.com/)                                | 8,892     | 954 ms         |
| 74   | [fam](http://admin.fam-ad.com/report/)                         | 3,505     | 1086 ms        |
| 75   | Yieldmo                                                        | 2,227     | 1235 ms        |
| 76   | StickyADS.tv                                                   | 2,010     | 1292 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                              | 1,261     | 52 ms          |
| 2    | Net Reviews                                                                  | 1,893     | 59 ms          |
| 3    | StatCounter                                                                  | 4,693     | 60 ms          |
| 4    | Amplitude Mobile Analytics                                                   | 1,250     | 68 ms          |
| 5    | etracker                                                                     | 1,732     | 71 ms          |
| 6    | Roxr Software                                                                | 1,822     | 73 ms          |
| 7    | Heap                                                                         | 1,859     | 75 ms          |
| 8    | Trust Pilot                                                                  | 2,741     | 77 ms          |
| 9    | [Google Analytics](https://www.google.com/analytics/analytics/)              | 1,082,088 | 78 ms          |
| 10   | [Mixpanel](https://mixpanel.com/)                                            | 4,908     | 79 ms          |
| 11   | Searchanise                                                                  | 2,459     | 88 ms          |
| 12   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 8,169     | 91 ms          |
| 13   | [Hotjar](https://www.hotjar.com/)                                            | 95,852    | 95 ms          |
| 14   | Chartbeat                                                                    | 6,959     | 96 ms          |
| 15   | [VWO](https://vwo.com)                                                       | 6,352     | 102 ms         |
| 16   | [Quantcast](https://www.quantcast.com)                                       | 6,607     | 107 ms         |
| 17   | CallRail                                                                     | 3,843     | 109 ms         |
| 18   | [Snowplow](https://snowplowanalytics.com/)                                   | 3,615     | 110 ms         |
| 19   | Parse.ly                                                                     | 2,616     | 113 ms         |
| 20   | Marchex                                                                      | 3,844     | 113 ms         |
| 21   | Nosto                                                                        | 2,973     | 114 ms         |
| 22   | [Crazy Egg](https://www.crazyegg.com/)                                       | 9,881     | 114 ms         |
| 23   | Clicktale                                                                    | 2,351     | 118 ms         |
| 24   | ForeSee                                                                      | 2,612     | 124 ms         |
| 25   | Treasure Data                                                                | 9,714     | 131 ms         |
| 26   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 15,441    | 141 ms         |
| 27   | Evidon                                                                       | 1,208     | 142 ms         |
| 28   | Gigya                                                                        | 1,949     | 176 ms         |
| 29   | Bazaarvoice                                                                  | 3,285     | 184 ms         |
| 30   | Maxymiser                                                                    | 1,139     | 189 ms         |
| 31   | Bounce Exchange                                                              | 1,374     | 190 ms         |
| 32   | [Segment](https://segment.com/)                                              | 6,940     | 198 ms         |
| 33   | FullStory                                                                    | 4,996     | 223 ms         |
| 34   | Ezoic                                                                        | 3,016     | 241 ms         |
| 35   | [Optimizely](https://www.optimizely.com/)                                    | 13,098    | 249 ms         |
| 36   | Feefo.com                                                                    | 2,218     | 251 ms         |
| 37   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 36,481    | 300 ms         |
| 38   | [Radar](https://www.cedexis.com/radar/)                                      | 4,912     | 303 ms         |
| 39   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 218,992   | 316 ms         |
| 40   | Inspectlet                                                                   | 4,984     | 320 ms         |
| 41   | [Keen](https://keen.io/)                                                     | 2,382     | 373 ms         |
| 42   | SessionCam                                                                   | 1,456     | 380 ms         |
| 43   | [Histats](http://histats.com/)                                               | 13,937    | 408 ms         |
| 44   | AB Tasty                                                                     | 3,111     | 455 ms         |
| 45   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 2,841     | 543 ms         |
| 46   | Mouseflow                                                                    | 1,391     | 569 ms         |
| 47   | [Lucky Orange](https://www.luckyorange.com/)                                 | 5,987     | 872 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 6,380     | 69 ms          |
| 2    | Kakao                                                | 8,746     | 83 ms          |
| 3    | [Instagram](https://www.instagram.com)               | 5,167     | 85 ms          |
| 4    | Micropat                                             | 22,116    | 89 ms          |
| 5    | [Pinterest](https://pinterest.com/)                  | 15,097    | 102 ms         |
| 6    | AddShoppers                                          | 1,147     | 109 ms         |
| 7    | [Facebook](https://www.facebook.com)                 | 1,103,174 | 120 ms         |
| 8    | [LinkedIn](https://www.linkedin.com/)                | 12,119    | 122 ms         |
| 9    | [Yandex Share](https://yastatic.net/share2/share.js) | 30,092    | 133 ms         |
| 10   | [Twitter](https://twitter.com)                       | 260,919   | 147 ms         |
| 11   | [ShareThis](https://www.sharethis.com/)              | 31,606    | 246 ms         |
| 12   | [Shareaholic](https://www.shareaholic.com/)          | 15,606    | 253 ms         |
| 13   | [AddThis](http://www.addthis.com/)                   | 177,056   | 278 ms         |
| 14   | [Disqus](http://disqus.com/)                         | 1,376     | 298 ms         |
| 15   | [Tumblr](https://tumblr.com/)                        | 38,452    | 324 ms         |
| 16   | SocialShopWave                                       | 1,023     | 448 ms         |
| 17   | [PIXNET](https://www.pixnet.net/)                    | 48,564    | 544 ms         |
| 18   | LiveJournal                                          | 6,610     | 734 ms         |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage  | Average Impact |
| ---- | -------------------------------------------- | ------ | -------------- |
| 1    | [YouTube](https://youtube.com)               | 25,349 | 150 ms         |
| 2    | [Wistia](https://wistia.com/)                | 20,701 | 272 ms         |
| 3    | [Brightcove](https://www.brightcove.com/en/) | 4,737  | 587 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Trusted Shops                                                             | 1,322   | 40 ms          |
| 2    | Symantec                                                                  | 1,246   | 69 ms          |
| 3    | [Stripe](https://stripe.com)                                              | 4,828   | 71 ms          |
| 4    | [New Relic](https://newrelic.com/)                                        | 3,183   | 73 ms          |
| 5    | [OneSignal](https://onesignal.com/)                                       | 18,715  | 74 ms          |
| 6    | iubenda                                                                   | 9,614   | 83 ms          |
| 7    | GetSiteControl                                                            | 3,144   | 84 ms          |
| 8    | iovation                                                                  | 1,009   | 85 ms          |
| 9    | Siteimprove                                                               | 1,637   | 86 ms          |
| 10   | [Google Maps](https://www.google.com/maps)                                | 247,910 | 119 ms         |
| 11   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 477,821 | 121 ms         |
| 12   | [AppDynamics](https://www.appdynamics.com/)                               | 1,841   | 123 ms         |
| 13   | Bold Commerce                                                             | 11,530  | 127 ms         |
| 14   | Po.st                                                                     | 1,660   | 134 ms         |
| 15   | Sift Science                                                              | 1,117   | 145 ms         |
| 16   | MaxCDN Enterprise                                                         | 2,325   | 170 ms         |
| 17   | Seznam                                                                    | 1,424   | 173 ms         |
| 18   | Swiftype                                                                  | 1,300   | 177 ms         |
| 19   | Fastly                                                                    | 3,396   | 225 ms         |
| 20   | Affirm                                                                    | 1,067   | 245 ms         |
| 21   | Rambler                                                                   | 8,226   | 249 ms         |
| 22   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 5,861   | 254 ms         |
| 23   | [PayPal](https://paypal.com)                                              | 6,948   | 325 ms         |
| 24   | Secomapp                                                                  | 1,062   | 341 ms         |
| 25   | [Yandex APIs](https://yandex.ru/)                                         | 53,493  | 393 ms         |
| 26   | Datacamp                                                                  | 10,609  | 425 ms         |
| 27   | [Distil Networks](https://www.distilnetworks.com/)                        | 10,392  | 445 ms         |
| 28   | [Sentry](https://sentry.io/)                                              | 14,388  | 515 ms         |
| 29   | Okas Concepts                                                             | 1,109   | 573 ms         |
| 30   | Mapbox                                                                    | 2,558   | 1215 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                  | Usage   | Average Impact |
| ---- | ----------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](http://www.blogger.com/)                    | 14,174  | 48 ms          |
| 2    | [Dealer](https://www.dealer.com/)                     | 28,185  | 130 ms         |
| 3    | [WordPress](https://wp.com/)                          | 127,601 | 138 ms         |
| 4    | [Shopify](https://www.shopify.com/)                   | 208,073 | 176 ms         |
| 5    | [Weebly](https://www.weebly.com/)                     | 35,308  | 322 ms         |
| 6    | [CDK Dealer Management](https://www.cdkglobal.com/us) | 12,299  | 330 ms         |
| 7    | [Hatena Blog](https://hatenablog.com/)                | 62,215  | 345 ms         |
| 8    | [Squarespace](https://www.squarespace.com/)           | 88,270  | 398 ms         |
| 9    | [Wix](https://www.wix.com/)                           | 164,599 | 972 ms         |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [RD Station](https://www.rdstation.com/en/) | 2,819  | 72 ms          |
| 2    | [Listrak](https://www.listrak.com/)         | 1,078  | 127 ms         |
| 3    | [Beeketing](https://beeketing.com/)         | 59,838 | 137 ms         |
| 4    | [Mailchimp](https://mailchimp.com/)         | 24,237 | 139 ms         |
| 5    | [Drift](https://www.drift.com/)             | 4,126  | 148 ms         |
| 6    | Ve                                          | 3,415  | 157 ms         |
| 7    | [Hubspot](https://hubspot.com/)             | 22,456 | 169 ms         |
| 8    | [Yotpo](https://www.yotpo.com/)             | 9,652  | 206 ms         |
| 9    | [OptinMonster](https://optinmonster.com/)   | 1,125  | 248 ms         |
| 10   | [Sumo](https://sumo.com/)                   | 55,139 | 263 ms         |
| 11   | Bigcommerce                                 | 11,802 | 301 ms         |
| 12   | [Albacross](https://albacross.com/)         | 1,332  | 732 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | Foursixty                                        | 1,084  | 79 ms          |
| 2    | iPerceptions                                     | 2,648  | 88 ms          |
| 3    | [LiveChat](https://www.livechatinc.com/)         | 16,750 | 96 ms          |
| 4    | iAdvize SAS                                      | 2,584  | 100 ms         |
| 5    | [LivePerson](https://www.liveperson.com/)        | 4,547  | 114 ms         |
| 6    | Comm100                                          | 1,539  | 119 ms         |
| 7    | Pure Chat                                        | 4,086  | 162 ms         |
| 8    | [Tidio Live Chat](https://www.tidiochat.com/en/) | 5,979  | 309 ms         |
| 9    | [Jivochat](https://www.jivochat.com/)            | 23,555 | 322 ms         |
| 10   | [Olark](https://www.olark.com/)                  | 12,238 | 331 ms         |
| 11   | [Intercom](https://www.intercom.com/)            | 16,322 | 334 ms         |
| 12   | Dynamic Yield                                    | 1,773  | 340 ms         |
| 13   | [Tawk.to](https://www.tawk.to/)                  | 39,669 | 344 ms         |
| 14   | LiveTex                                          | 2,673  | 371 ms         |
| 15   | [ZenDesk](https://zendesk.com/)                  | 84,795 | 508 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                   | Usage  | Average Impact |
| ---- | -------------------------------------- | ------ | -------------- |
| 1    | Accuweather                            | 1,279  | 77 ms          |
| 2    | OpenTable                              | 1,845  | 107 ms         |
| 3    | Medium                                 | 2,491  | 171 ms         |
| 4    | [AMP](https://www.ampproject.org/)     | 58,086 | 217 ms         |
| 5    | Embedly                                | 2,686  | 227 ms         |
| 6    | [Vox Media](https://www.voxmedia.com/) | 1,129  | 273 ms         |

<a name="library"></a>

#### Libraries

These are mostly open source libraries (e.g. jQuery) served over different public CDNs. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the libraries being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 6,903   | 95 ms          |
| 2    | [FontAwesome CDN](https://fontawesome.com/)                  | 16,717  | 126 ms         |
| 3    | [Yandex CDN](https://yandex.ru/)                             | 1,885   | 138 ms         |
| 4    | Microsoft Hosted Libs                                        | 4,639   | 164 ms         |
| 5    | [jQuery CDN](https://code.jquery.com/)                       | 137,421 | 194 ms         |
| 6    | Monotype                                                     | 4,142   | 194 ms         |
| 7    | [Google CDN](https://developers.google.com/speed/libraries/) | 728,840 | 201 ms         |
| 8    | [Cloudflare CDN](https://cdnjs.com/)                         | 94,162  | 202 ms         |
| 9    | [Unpkg](https://unpkg.com)                                   | 2,508   | 231 ms         |
| 10   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 21,987  | 269 ms         |
| 11   | [CreateJS CDN](http://code.createjs.com/)                    | 1,649   | 3048 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | TagCommander                                                                  | 1,213     | 96 ms          |
| 2    | [BrightTag / Signal](https://www.signal.co)                                   | 7,380     | 134 ms         |
| 3    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,414    | 220 ms         |
| 4    | [Ensighten](https://www.ensighten.com/)                                       | 7,689     | 252 ms         |
| 5    | [Tealium](https://tealium.com/)                                               | 15,237    | 267 ms         |
| 6    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,043,021 | 471 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage   | Average Impact |
| ---- | ------------------------------------------------- | ------- | -------------- |
| 1    | [Amazon Web Services](https://aws.amazon.com/s3/) | 47,840  | 164 ms         |
| 2    | Pagely                                            | 1,047   | 234 ms         |
| 3    | [All Other 3rd Parties](#by-category)             | 922,130 | 243 ms         |
| 4    | [Parking Crew](http://parkingcrew.net/)           | 5,208   | 474 ms         |
| 5    | uLogin                                            | 2,353   | 1170 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                          | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,043,021  | 491,642 s    | 471 ms         |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                | 1,165,800  | 257,973 s    | 221 ms         |
| [All Other 3rd Parties](#by-category)                                         | 922,130    | 223,876 s    | 243 ms         |
| [Wix](https://www.wix.com/)                                                   | 164,599    | 159,967 s    | 972 ms         |
| [Google CDN](https://developers.google.com/speed/libraries/)                  | 728,840    | 146,739 s    | 201 ms         |
| [Facebook](https://www.facebook.com)                                          | 1,103,174  | 132,167 s    | 120 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)               | 1,082,088  | 84,606 s     | 78 ms          |
| [Yandex Metrica](https://metrica.yandex.com/about?)                           | 218,992    | 69,273 s     | 316 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)     | 477,821    | 57,719 s     | 121 ms         |
| [AddThis](http://www.addthis.com/)                                            | 177,056    | 49,149 s     | 278 ms         |
| [ZenDesk](https://zendesk.com/)                                               | 84,795     | 43,066 s     | 508 ms         |
| [Twitter](https://twitter.com)                                                | 260,919    | 38,408 s     | 147 ms         |
| [Shopify](https://www.shopify.com/)                                           | 208,073    | 36,713 s     | 176 ms         |
| [Squarespace](https://www.squarespace.com/)                                   | 88,270     | 35,142 s     | 398 ms         |
| [Google Maps](https://www.google.com/maps)                                    | 247,910    | 29,396 s     | 119 ms         |
| [jQuery CDN](https://code.jquery.com/)                                        | 137,421    | 26,651 s     | 194 ms         |
| [PIXNET](https://www.pixnet.net/)                                             | 48,564     | 26,441 s     | 544 ms         |
| [Hatena Blog](https://hatenablog.com/)                                        | 62,215     | 21,442 s     | 345 ms         |
| [Yandex APIs](https://yandex.ru/)                                             | 53,493     | 21,000 s     | 393 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                          | 94,162     | 19,048 s     | 202 ms         |
| [WordPress](https://wp.com/)                                                  | 127,601    | 17,664 s     | 138 ms         |
| [Sumo](https://sumo.com/)                                                     | 55,139     | 14,519 s     | 263 ms         |
| [Moat](https://moat.com/)                                                     | 18,342     | 13,860 s     | 756 ms         |
| [33 Across](https://33across.com/)                                            | 15,704     | 13,753 s     | 876 ms         |
| [Tawk.to](https://www.tawk.to/)                                               | 39,669     | 13,636 s     | 344 ms         |
| [AMP](https://www.ampproject.org/)                                            | 58,086     | 12,591 s     | 217 ms         |
| [Tumblr](https://tumblr.com/)                                                 | 38,452     | 12,464 s     | 324 ms         |
| [Weebly](https://www.weebly.com/)                                             | 35,308     | 11,363 s     | 322 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)            | 36,481     | 10,938 s     | 300 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                         | 38,205     | 10,172 s     | 266 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                            | 25,277     | 9,302 s      | 368 ms         |
| [Criteo](https://www.criteo.com/)                                             | 66,114     | 9,205 s      | 139 ms         |
| [Hotjar](https://www.hotjar.com/)                                             | 95,852     | 9,073 s      | 95 ms          |
| [OpenX](https://www.openx.com/)                                               | 8,892      | 8,483 s      | 954 ms         |
| [WordAds](https://wordads.co/)                                                | 33,392     | 8,418 s      | 252 ms         |
| [Beeketing](https://beeketing.com/)                                           | 59,838     | 8,218 s      | 137 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                             | 47,840     | 7,842 s      | 164 ms         |
| [ShareThis](https://www.sharethis.com/)                                       | 31,606     | 7,763 s      | 246 ms         |
| [Jivochat](https://www.jivochat.com/)                                         | 23,555     | 7,593 s      | 322 ms         |
| [Sentry](https://sentry.io/)                                                  | 14,388     | 7,413 s      | 515 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,414     | 7,117 s      | 220 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                     | 21,987     | 5,918 s      | 269 ms         |
| [Histats](http://histats.com/)                                                | 13,937     | 5,691 s      | 408 ms         |
| [Wistia](https://wistia.com/)                                                 | 20,701     | 5,640 s      | 272 ms         |
| [Intercom](https://www.intercom.com/)                                         | 16,322     | 5,453 s      | 334 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                  | 5,987      | 5,218 s      | 872 ms         |
| [Taboola](https://www.taboola.com/)                                           | 25,671     | 5,137 s      | 200 ms         |
| [MediaVine](https://www.mediavine.com/)                                       | 9,768      | 5,081 s      | 520 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                     | 1,649      | 5,026 s      | 3048 ms        |
| LiveJournal                                                                   | 6,610      | 4,850 s      | 734 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                            | 10,392     | 4,622 s      | 445 ms         |
| [AppNexus](https://www.appnexus.com/)                                         | 14,926     | 4,592 s      | 308 ms         |
| Datacamp                                                                      | 10,609     | 4,505 s      | 425 ms         |
| [Tealium](https://tealium.com/)                                               | 15,237     | 4,062 s      | 267 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                         | 12,299     | 4,062 s      | 330 ms         |
| [Olark](https://www.olark.com/)                                               | 12,238     | 4,047 s      | 331 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                          | 30,092     | 4,008 s      | 133 ms         |
| Tynt                                                                          | 25,583     | 3,952 s      | 154 ms         |
| [Media.net](https://www.media.net/)                                           | 11,818     | 3,945 s      | 334 ms         |
| [Shareaholic](https://www.shareaholic.com/)                                   | 15,606     | 3,941 s      | 253 ms         |
| [fam](http://admin.fam-ad.com/report/)                                        | 3,505      | 3,807 s      | 1086 ms        |
| [Hubspot](https://hubspot.com/)                                               | 22,456     | 3,805 s      | 169 ms         |
| [YouTube](https://youtube.com)                                                | 25,349     | 3,801 s      | 150 ms         |
| [Dealer](https://www.dealer.com/)                                             | 28,185     | 3,668 s      | 130 ms         |
| Bigcommerce                                                                   | 11,802     | 3,550 s      | 301 ms         |
| [Mailchimp](https://mailchimp.com/)                                           | 24,237     | 3,364 s      | 139 ms         |
| Privy                                                                         | 9,952      | 3,274 s      | 329 ms         |
| [Optimizely](https://www.optimizely.com/)                                     | 13,098     | 3,257 s      | 249 ms         |
| Mapbox                                                                        | 2,558      | 3,107 s      | 1215 ms        |
| [Popads](https://www.popads.net/)                                             | 4,548      | 3,098 s      | 681 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                  | 4,737      | 2,778 s      | 587 ms         |
| uLogin                                                                        | 2,353      | 2,754 s      | 1170 ms        |
| Yieldmo                                                                       | 2,227      | 2,750 s      | 1235 ms        |
| [Amazon Ads](https://ad.amazon.com/)                                          | 24,660     | 2,664 s      | 108 ms         |
| StickyADS.tv                                                                  | 2,010      | 2,598 s      | 1292 ms        |
| [Parking Crew](http://parkingcrew.net/)                                       | 5,208      | 2,469 s      | 474 ms         |
| GumGum                                                                        | 4,172      | 2,455 s      | 589 ms         |
| [PayPal](https://paypal.com)                                                  | 6,948      | 2,255 s      | 325 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                     | 13,332     | 2,224 s      | 167 ms         |
| Skimbit                                                                       | 15,074     | 2,207 s      | 146 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)  | 15,441     | 2,174 s      | 141 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                 | 4,033      | 2,167 s      | 537 ms         |
| Infolinks                                                                     | 4,090      | 2,144 s      | 524 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                   | 16,717     | 2,112 s      | 126 ms         |
| AdMatic                                                                       | 2,707      | 2,055 s      | 759 ms         |
| Rambler                                                                       | 8,226      | 2,050 s      | 249 ms         |
| [Yotpo](https://www.yotpo.com/)                                               | 9,652      | 1,991 s      | 206 ms         |
| Micropat                                                                      | 22,116     | 1,965 s      | 89 ms          |
| Blindado                                                                      | 802        | 1,954 s      | 2437 ms        |
| [Ensighten](https://www.ensighten.com/)                                       | 7,689      | 1,934 s      | 252 ms         |
| VigLink                                                                       | 5,806      | 1,886 s      | 325 ms         |
| LKQD                                                                          | 2,090      | 1,850 s      | 885 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                              | 5,979      | 1,849 s      | 309 ms         |
| [MGID](https://www.mgid.com/)                                                 | 10,481     | 1,690 s      | 161 ms         |
| [LiveChat](https://www.livechatinc.com/)                                      | 16,750     | 1,615 s      | 96 ms          |
| Inspectlet                                                                    | 4,984      | 1,594 s      | 320 ms         |
| [Pinterest](https://pinterest.com/)                                           | 15,097     | 1,546 s      | 102 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 2,841      | 1,544 s      | 543 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                | 5,861      | 1,490 s      | 254 ms         |
| [Radar](https://www.cedexis.com/radar/)                                       | 4,912      | 1,489 s      | 303 ms         |
| [LinkedIn](https://www.linkedin.com/)                                         | 12,119     | 1,475 s      | 122 ms         |
| Bold Commerce                                                                 | 11,530     | 1,465 s      | 127 ms         |
| AB Tasty                                                                      | 3,111      | 1,416 s      | 455 ms         |
| Adform                                                                        | 9,062      | 1,408 s      | 155 ms         |
| Klaviyo                                                                       | 7,677      | 1,391 s      | 181 ms         |
| [OneSignal](https://onesignal.com/)                                           | 18,715     | 1,389 s      | 74 ms          |
| [Segment](https://segment.com/)                                               | 6,940      | 1,371 s      | 198 ms         |
| Treasure Data                                                                 | 9,714      | 1,277 s      | 131 ms         |
| [Sizmek](https://www.sizmek.com/)                                             | 3,935      | 1,263 s      | 321 ms         |
| Teads                                                                         | 6,589      | 1,235 s      | 187 ms         |
| Vidible                                                                       | 1,566      | 1,169 s      | 746 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                        | 9,881      | 1,127 s      | 114 ms         |
| [Pubmatic](https://pubmatic.com/)                                             | 6,439      | 1,112 s      | 173 ms         |
| FullStory                                                                     | 4,996      | 1,112 s      | 223 ms         |
| LiveTex                                                                       | 2,673      | 993 s        | 371 ms         |
| [BrightTag / Signal](https://www.signal.co)                                   | 7,380      | 989 s        | 134 ms         |
| [Albacross](https://albacross.com/)                                           | 1,332      | 975 s        | 732 ms         |
| DTSCOUT                                                                       | 7,417      | 967 s        | 130 ms         |
| Rocket Fuel                                                                   | 5,755      | 926 s        | 161 ms         |
| sovrn                                                                         | 5,371      | 922 s        | 172 ms         |
| [Keen](https://keen.io/)                                                      | 2,382      | 888 s        | 373 ms         |
| iBillboard                                                                    | 3,258      | 885 s        | 272 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                      | 9,088      | 857 s        | 94 ms          |
| Monotype                                                                      | 4,142      | 805 s        | 194 ms         |
| iubenda                                                                       | 9,614      | 799 s        | 83 ms          |
| Mouseflow                                                                     | 1,391      | 791 s        | 569 ms         |
| Esri ArcGIS                                                                   | 731        | 782 s        | 1070 ms        |
| Fastly                                                                        | 3,396      | 764 s        | 225 ms         |
| Microsoft Hosted Libs                                                         | 4,639      | 761 s        | 164 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 8,169      | 744 s        | 91 ms          |
| Ezoic                                                                         | 3,016      | 727 s        | 241 ms         |
| Admixer for Publishers                                                        | 2,597      | 726 s        | 280 ms         |
| Kakao                                                                         | 8,746      | 724 s        | 83 ms          |
| [Quantcast](https://www.quantcast.com)                                        | 6,607      | 705 s        | 107 ms         |
| [Hotmart](https://www.hotmart.com/)                                           | 855        | 693 s        | 811 ms         |
| [Blogger](http://www.blogger.com/)                                            | 14,174     | 683 s        | 48 ms          |
| Chartbeat                                                                     | 6,959      | 671 s        | 96 ms          |
| Between Digital                                                               | 1,107      | 664 s        | 600 ms         |
| Pure Chat                                                                     | 4,086      | 662 s        | 162 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                     | 6,903      | 657 s        | 95 ms          |
| Index Exchange                                                                | 3,336      | 654 s        | 196 ms         |
| [VWO](https://vwo.com)                                                        | 6,352      | 648 s        | 102 ms         |
| Okas Concepts                                                                 | 1,109      | 635 s        | 573 ms         |
| [Drift](https://www.drift.com/)                                               | 4,126      | 611 s        | 148 ms         |
| Embedly                                                                       | 2,686      | 611 s        | 227 ms         |
| Dynamic Yield                                                                 | 1,773      | 603 s        | 340 ms         |
| Bazaarvoice                                                                   | 3,285      | 603 s        | 184 ms         |
| [Market GID](https://www.marketgid.com/)                                      | 3,124      | 593 s        | 190 ms         |
| [Unpkg](https://unpkg.com)                                                    | 2,508      | 579 s        | 231 ms         |
| Cxense                                                                        | 3,773      | 579 s        | 153 ms         |
| LongTail Ad Solutions                                                         | 2,789      | 567 s        | 203 ms         |
| Feefo.com                                                                     | 2,218      | 556 s        | 251 ms         |
| SessionCam                                                                    | 1,456      | 553 s        | 380 ms         |
| Ve                                                                            | 3,415      | 538 s        | 157 ms         |
| fluct                                                                         | 6,732      | 532 s        | 79 ms          |
| [Yahoo!](https://www.yahoo.com/)                                              | 3,830      | 527 s        | 138 ms         |
| [LivePerson](https://www.liveperson.com/)                                     | 4,547      | 517 s        | 114 ms         |
| [Outbrain](https://www.outbrain.com/)                                         | 5,244      | 514 s        | 98 ms          |
| AudienceSearch                                                                | 4,389      | 514 s        | 117 ms         |
| Meetrics                                                                      | 881        | 506 s        | 575 ms         |
| Gemius                                                                        | 6,998      | 485 s        | 69 ms          |
| JuicyAds                                                                      | 2,935      | 478 s        | 163 ms         |
| SocialShopWave                                                                | 1,023      | 459 s        | 448 ms         |
| Digital ad Consortium                                                         | 3,777      | 440 s        | 117 ms         |
| [Instagram](https://www.instagram.com)                                        | 5,167      | 440 s        | 85 ms          |
| [VK](https://vk.com/)                                                         | 6,380      | 439 s        | 69 ms          |
| Marchex                                                                       | 3,844      | 435 s        | 113 ms         |
| Pictela (AOL)                                                                 | 785        | 431 s        | 550 ms         |
| Medium                                                                        | 2,491      | 427 s        | 171 ms         |
| Audience 360                                                                  | 413        | 423 s        | 1024 ms        |
| Adtech (AOL)                                                                  | 509        | 421 s        | 828 ms         |
| CallRail                                                                      | 3,843      | 419 s        | 109 ms         |
| IBM Digital Analytics                                                         | 858        | 414 s        | 482 ms         |
| [Disqus](http://disqus.com/)                                                  | 1,376      | 410 s        | 298 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                    | 3,615      | 399 s        | 110 ms         |
| MaxCDN Enterprise                                                             | 2,325      | 395 s        | 170 ms         |
| WebpageFX                                                                     | 329        | 394 s        | 1199 ms        |
| Smart AdServer                                                                | 3,223      | 390 s        | 121 ms         |
| [Mixpanel](https://mixpanel.com/)                                             | 4,908      | 389 s        | 79 ms          |
| Sharethrough                                                                  | 2,195      | 373 s        | 170 ms         |
| Secomapp                                                                      | 1,062      | 362 s        | 341 ms         |
| Sekindo                                                                       | 219        | 359 s        | 1640 ms        |
| TrackJS                                                                       | 816        | 355 s        | 436 ms         |
| [Adroll](https://www.adroll.com/)                                             | 3,119      | 345 s        | 111 ms         |
| Bugsnag                                                                       | 769        | 344 s        | 448 ms         |
| Gigya                                                                         | 1,949      | 342 s        | 176 ms         |
| [Stripe](https://stripe.com)                                                  | 4,828      | 342 s        | 71 ms          |
| Nosto                                                                         | 2,973      | 339 s        | 114 ms         |
| PushCrew                                                                      | 3,335      | 338 s        | 101 ms         |
| MailMunch                                                                     | 4,315      | 331 s        | 77 ms          |
| ForeSee                                                                       | 2,612      | 325 s        | 124 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                | 3,011      | 321 s        | 107 ms         |
| [Vox Media](https://www.voxmedia.com/)                                        | 1,129      | 308 s        | 273 ms         |
| JustUno                                                                       | 1,944      | 299 s        | 154 ms         |
| Parse.ly                                                                      | 2,616      | 296 s        | 113 ms         |
| Kaltura Video Platform                                                        | 440        | 294 s        | 668 ms         |
| StatCounter                                                                   | 4,693      | 283 s        | 60 ms          |
| Digioh                                                                        | 844        | 281 s        | 333 ms         |
| [OptinMonster](https://optinmonster.com/)                                     | 1,125      | 279 s        | 248 ms         |
| Clicktale                                                                     | 2,351      | 278 s        | 118 ms         |
| Best Of Media S.A.                                                            | 254        | 267 s        | 1051 ms        |
| GetSiteControl                                                                | 3,144      | 263 s        | 84 ms          |
| Affirm                                                                        | 1,067      | 262 s        | 245 ms         |
| Bounce Exchange                                                               | 1,374      | 261 s        | 190 ms         |
| [Yandex CDN](https://yandex.ru/)                                              | 1,885      | 260 s        | 138 ms         |
| Sortable                                                                      | 1,028      | 259 s        | 252 ms         |
| iAdvize SAS                                                                   | 2,584      | 259 s        | 100 ms         |
| Hola Networks                                                                 | 151        | 255 s        | 1690 ms        |
| [Media Math](http://www.mediamath.com/)                                       | 633        | 254 s        | 402 ms         |
| Yieldify                                                                      | 723        | 250 s        | 346 ms         |
| Underdog Media                                                                | 367        | 247 s        | 674 ms         |
| Seznam                                                                        | 1,424      | 247 s        | 173 ms         |
| Pagely                                                                        | 1,047      | 245 s        | 234 ms         |
| piano                                                                         | 698        | 243 s        | 348 ms         |
| iPerceptions                                                                  | 2,648      | 232 s        | 88 ms          |
| [New Relic](https://newrelic.com/)                                            | 3,183      | 231 s        | 73 ms          |
| Perfect Market                                                                | 781        | 230 s        | 295 ms         |
| Swiftype                                                                      | 1,300      | 230 s        | 177 ms         |
| UserReport                                                                    | 987        | 230 s        | 233 ms         |
| Ecwid                                                                         | 609        | 229 s        | 377 ms         |
| [AppDynamics](https://www.appdynamics.com/)                                   | 1,841      | 227 s        | 123 ms         |
| Po.st                                                                         | 1,660      | 223 s        | 134 ms         |
| Cedato                                                                        | 103        | 222 s        | 2159 ms        |
| Unbounce                                                                      | 2,338      | 222 s        | 95 ms          |
| PubNation                                                                     | 2,499      | 221 s        | 88 ms          |
| Decibel Insight                                                               | 521        | 217 s        | 417 ms         |
| Searchanise                                                                   | 2,459      | 217 s        | 88 ms          |
| Ooyala                                                                        | 657        | 216 s        | 329 ms         |
| Maxymiser                                                                     | 1,139      | 216 s        | 189 ms         |
| GitHub                                                                        | 828        | 215 s        | 260 ms         |
| Pixlee                                                                        | 337        | 212 s        | 630 ms         |
| Trust Pilot                                                                   | 2,741      | 211 s        | 77 ms          |
| ShopiMind                                                                     | 310        | 209 s        | 674 ms         |
| PerimeterX Bot Defender                                                       | 209        | 208 s        | 997 ms         |
| Expedia                                                                       | 627        | 208 s        | 332 ms         |
| Fraudlogix                                                                    | 974        | 204 s        | 209 ms         |
| SearchSpring                                                                  | 529        | 204 s        | 385 ms         |
| [RD Station](https://www.rdstation.com/en/)                                   | 2,819      | 203 s        | 72 ms          |
| Trip Advisor                                                                  | 346        | 198 s        | 572 ms         |
| Microad                                                                       | 1,328      | 198 s        | 149 ms         |
| OpenTable                                                                     | 1,845      | 197 s        | 107 ms         |
| Signyfyd                                                                      | 233        | 195 s        | 835 ms         |
| Celtra                                                                        | 565        | 191 s        | 339 ms         |
| Media Management Technologies                                                 | 533        | 191 s        | 358 ms         |
| Crowd Control                                                                 | 2,553      | 188 s        | 74 ms          |
| Comm100                                                                       | 1,539      | 184 s        | 119 ms         |
| BlueKai                                                                       | 2,548      | 181 s        | 71 ms          |
| Wishpond Technologies                                                         | 432        | 181 s        | 419 ms         |
| SmartAdServer                                                                 | 1,776      | 181 s        | 102 ms         |
| Geniee                                                                        | 2,226      | 181 s        | 81 ms          |
| Adocean                                                                       | 1,319      | 180 s        | 136 ms         |
| Adverline Board                                                               | 1,307      | 179 s        | 137 ms         |
| Opentag                                                                       | 984        | 172 s        | 175 ms         |
| Evidon                                                                        | 1,208      | 171 s        | 142 ms         |
| smartclip                                                                     | 367        | 171 s        | 465 ms         |
| Connatix                                                                      | 191        | 170 s        | 891 ms         |
| OwnerIQ                                                                       | 1,541      | 170 s        | 110 ms         |
| Opta                                                                          | 294        | 169 s        | 575 ms         |
| LoopMe                                                                        | 441        | 166 s        | 375 ms         |
| Booking.com                                                                   | 978        | 165 s        | 169 ms         |
| Sift Science                                                                  | 1,117      | 162 s        | 145 ms         |
| ThreatMetrix                                                                  | 184        | 158 s        | 858 ms         |
| Qubit Deliver                                                                 | 343        | 156 s        | 455 ms         |
| Chitika                                                                       | 1,010      | 152 s        | 150 ms         |
| [24]7                                                                         | 294        | 149 s        | 507 ms         |
| Siteimprove                                                                   | 1,637      | 141 s        | 86 ms          |
| IPONWEB                                                                       | 929        | 140 s        | 151 ms         |
| Heap                                                                          | 1,859      | 140 s        | 75 ms          |
| [Listrak](https://www.listrak.com/)                                           | 1,078      | 137 s        | 127 ms         |
| [Freshdesk](https://freshdesk.com/)                                           | 875        | 135 s        | 154 ms         |
| TrafficStars                                                                  | 1,093      | 134 s        | 122 ms         |
| Digital Media Exchange                                                        | 271        | 133 s        | 490 ms         |
| Roxr Software                                                                 | 1,822      | 132 s        | 73 ms          |
| SpotXchange                                                                   | 593        | 129 s        | 218 ms         |
| Rakuten Marketing                                                             | 1,540      | 128 s        | 83 ms          |
| PERFORM                                                                       | 459        | 127 s        | 276 ms         |
| Constant Contact                                                              | 1,251      | 126 s        | 101 ms         |
| AddShoppers                                                                   | 1,147      | 125 s        | 109 ms         |
| Monetate                                                                      | 939        | 124 s        | 132 ms         |
| etracker                                                                      | 1,732      | 123 s        | 71 ms          |
| Zmags                                                                         | 263        | 123 s        | 467 ms         |
| Fort Awesome                                                                  | 529        | 122 s        | 230 ms         |
| Stackla PTY                                                                   | 537        | 120 s        | 224 ms         |
| One by AOL                                                                    | 801        | 119 s        | 149 ms         |
| PowerReviews                                                                  | 675        | 119 s        | 177 ms         |
| FirstImpression                                                               | 278        | 119 s        | 428 ms         |
| Clerk.io ApS                                                                  | 736        | 117 s        | 159 ms         |
| Flowplayer                                                                    | 492        | 117 s        | 237 ms         |
| TagCommander                                                                  | 1,213      | 116 s        | 96 ms          |
| [Help Scout](https://www.helpscout.net/)                                      | 629        | 116 s        | 184 ms         |
| MonetizeMore                                                                  | 109        | 113 s        | 1038 ms        |
| Net Reviews                                                                   | 1,893      | 112 s        | 59 ms          |
| Fanplayr                                                                      | 144        | 109 s        | 754 ms         |
| Technorati                                                                    | 814        | 108 s        | 133 ms         |
| Curalate                                                                      | 354        | 106 s        | 299 ms         |
| AvantLink                                                                     | 126        | 106 s        | 837 ms         |
| OptiMonk                                                                      | 930        | 105 s        | 113 ms         |
| Mather Economics                                                              | 558        | 104 s        | 187 ms         |
| eBay                                                                          | 615        | 104 s        | 169 ms         |
| Mobify                                                                        | 327        | 103 s        | 316 ms         |
| Convert Insights                                                              | 917        | 103 s        | 112 ms         |
| Adnium                                                                        | 432        | 102 s        | 237 ms         |
| Smarter Click                                                                 | 477        | 102 s        | 214 ms         |
| ZEDO                                                                          | 401        | 102 s        | 254 ms         |
| Picreel                                                                       | 547        | 101 s        | 185 ms         |
| Bronto Software                                                               | 900        | 100 s        | 112 ms         |
| Accuweather                                                                   | 1,279      | 99 s         | 77 ms          |
| WisePops                                                                      | 417        | 98 s         | 236 ms         |
| Interpublic Group                                                             | 486        | 98 s         | 202 ms         |
| Shopgate                                                                      | 772        | 98 s         | 127 ms         |
| Livefyre                                                                      | 481        | 97 s         | 201 ms         |
| Polar Mobile Group                                                            | 497        | 95 s         | 192 ms         |
| Skype                                                                         | 740        | 95 s         | 128 ms         |
| Adyoulike                                                                     | 696        | 95 s         | 136 ms         |
| Pixalate                                                                      | 327        | 94 s         | 286 ms         |
| ExoClick                                                                      | 2,714      | 93 s         | 34 ms          |
| [Marketo](https://www.marketo.com)                                            | 960        | 93 s         | 97 ms          |
| Revcontent                                                                    | 819        | 92 s         | 113 ms         |
| Bizible                                                                       | 795        | 92 s         | 115 ms         |
| Madison Logic                                                                 | 798        | 89 s         | 112 ms         |
| iovation                                                                      | 1,009      | 85 s         | 85 ms          |
| Amplitude Mobile Analytics                                                    | 1,250      | 85 s         | 68 ms          |
| Foursixty                                                                     | 1,084      | 85 s         | 79 ms          |
| Survicate                                                                     | 515        | 85 s         | 166 ms         |
| Symantec                                                                      | 1,246      | 85 s         | 69 ms          |
| Refersion                                                                     | 830        | 85 s         | 102 ms         |
| Dailymotion                                                                   | 256        | 84 s         | 327 ms         |
| Time                                                                          | 245        | 83 s         | 339 ms         |
| plista                                                                        | 681        | 83 s         | 121 ms         |
| Sidecar                                                                       | 343        | 82 s         | 239 ms         |
| StreamRail                                                                    | 127        | 82 s         | 644 ms         |
| Global-e                                                                      | 269        | 80 s         | 296 ms         |
| Marketplace Web Service                                                       | 305        | 79 s         | 260 ms         |
| Forensiq                                                                      | 419        | 78 s         | 185 ms         |
| Sparkflow                                                                     | 317        | 77 s         | 243 ms         |
| Pardot                                                                        | 221        | 75 s         | 341 ms         |
| WebEngage                                                                     | 603        | 74 s         | 123 ms         |
| Cross Pixel Media                                                             | 479        | 73 s         | 153 ms         |
| Snacktools                                                                    | 296        | 73 s         | 248 ms         |
| Adthink                                                                       | 219        | 72 s         | 329 ms         |
| Smart Insight Tracking                                                        | 794        | 71 s         | 89 ms          |
| Lytics                                                                        | 556        | 70 s         | 126 ms         |
| Adkontekst                                                                    | 384        | 70 s         | 182 ms         |
| Cachefly                                                                      | 139        | 70 s         | 502 ms         |
| Tail Target                                                                   | 852        | 69 s         | 81 ms          |
| Republer                                                                      | 756        | 68 s         | 90 ms          |
| Proper Media                                                                  | 121        | 67 s         | 557 ms         |
| Permutive                                                                     | 499        | 67 s         | 134 ms         |
| Affiliate Window                                                              | 911        | 67 s         | 74 ms          |
| Cloudinary                                                                    | 315        | 67 s         | 213 ms         |
| The Hut Group                                                                 | 624        | 67 s         | 107 ms         |
| ReTargeter                                                                    | 223        | 66 s         | 296 ms         |
| FoxyCart                                                                      | 281        | 65 s         | 233 ms         |
| Google Plus                                                                   | 599        | 65 s         | 109 ms         |
| [Alexa](https://www.alexa.com/)                                               | 1,261      | 65 s         | 52 ms          |
| PhotoBucket                                                                   | 841        | 64 s         | 77 ms          |
| SnapEngage                                                                    | 931        | 63 s         | 68 ms          |
| Rackspace                                                                     | 166        | 63 s         | 377 ms         |
| Adscale                                                                       | 799        | 62 s         | 78 ms          |
| issuu                                                                         | 686        | 62 s         | 91 ms          |
| JustPremium Ads                                                               | 459        | 62 s         | 135 ms         |
| rewardStyle.com                                                               | 590        | 62 s         | 105 ms         |
| GetResponse                                                                   | 699        | 62 s         | 88 ms          |
| [SoundCloud](https://www.soundcloud.com/)                                     | 226        | 61 s         | 270 ms         |
| TRUSTe                                                                        | 669        | 61 s         | 91 ms          |
| Reevoo                                                                        | 374        | 60 s         | 161 ms         |
| [Usabilla](https://usabilla.com)                                              | 794        | 58 s         | 73 ms          |
| Tribal Fusion                                                                 | 1,082      | 58 s         | 54 ms          |
| Effective Measure                                                             | 620        | 58 s         | 93 ms          |
| WalkMe                                                                        | 345        | 56 s         | 161 ms         |
| Better Business Bureau                                                        | 177        | 55 s         | 311 ms         |
| Gleam                                                                         | 431        | 55 s         | 127 ms         |
| Omniconvert                                                                   | 462        | 54 s         | 116 ms         |
| Bootstrap Chinese network                                                     | 276        | 53 s         | 192 ms         |
| Kampyle                                                                       | 471        | 53 s         | 113 ms         |
| Kaizen Platform                                                               | 290        | 53 s         | 183 ms         |
| Tencent                                                                       | 522        | 53 s         | 101 ms         |
| Nativo                                                                        | 562        | 53 s         | 94 ms          |
| Tradelab                                                                      | 699        | 53 s         | 75 ms          |
| Evergage                                                                      | 235        | 53 s         | 224 ms         |
| Trusted Shops                                                                 | 1,322      | 52 s         | 40 ms          |
| Keywee                                                                        | 269        | 52 s         | 192 ms         |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                | 928        | 51 s         | 55 ms          |
| Profitshare                                                                   | 386        | 50 s         | 129 ms         |
| Branch Metrics                                                                | 730        | 50 s         | 68 ms          |
| Yottaa                                                                        | 165        | 49 s         | 297 ms         |
| The ADEX                                                                      | 636        | 48 s         | 76 ms          |
| Elastic Ad                                                                    | 506        | 48 s         | 95 ms          |
| Navegg                                                                        | 559        | 47 s         | 84 ms          |
| ClickDesk                                                                     | 510        | 45 s         | 89 ms          |
| TruConversion                                                                 | 228        | 45 s         | 198 ms         |
| SpringServer                                                                  | 103        | 44 s         | 425 ms         |
| ShopRunner                                                                    | 149        | 44 s         | 293 ms         |
| WebSpectator                                                                  | 218        | 43 s         | 198 ms         |
| bRealTime                                                                     | 105        | 43 s         | 408 ms         |
| Zanox                                                                         | 370        | 43 s         | 115 ms         |
| CDN.net                                                                       | 113        | 42 s         | 368 ms         |
| BoldChat                                                                      | 443        | 41 s         | 93 ms          |
| Socialphotos                                                                  | 242        | 40 s         | 165 ms         |
| Onet                                                                          | 109        | 40 s         | 364 ms         |
| Nend                                                                          | 945        | 40 s         | 42 ms          |
| Clicktripz                                                                    | 118        | 39 s         | 331 ms         |
| TripleLift                                                                    | 349        | 39 s         | 111 ms         |
| Reflektion                                                                    | 198        | 39 s         | 195 ms         |
| Adloox                                                                        | 122        | 38 s         | 314 ms         |
| reEmbed                                                                       | 159        | 38 s         | 240 ms         |
| Github                                                                        | 426        | 38 s         | 88 ms          |
| News                                                                          | 182        | 37 s         | 203 ms         |
| LightWidget                                                                   | 444        | 36 s         | 80 ms          |
| Weborama                                                                      | 441        | 35 s         | 80 ms          |
| unpkg                                                                         | 215        | 35 s         | 164 ms         |
| SaleCycle                                                                     | 447        | 35 s         | 78 ms          |
| Snack Media                                                                   | 118        | 35 s         | 295 ms         |
| Typepad                                                                       | 181        | 34 s         | 190 ms         |
| Captify Media                                                                 | 292        | 34 s         | 116 ms         |
| Neodata                                                                       | 429        | 34 s         | 79 ms          |
| [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)        | 184        | 34 s         | 182 ms         |
| Conversant Tag Manager                                                        | 191        | 33 s         | 175 ms         |
| Petametrics                                                                   | 223        | 33 s         | 149 ms         |
| LiveHelpNow                                                                   | 348        | 33 s         | 94 ms          |
| Postcode Anywhere (Holdings)                                                  | 142        | 33 s         | 230 ms         |
| fifty-five                                                                    | 225        | 33 s         | 145 ms         |
| Highcharts                                                                    | 281        | 32 s         | 115 ms         |
| Conversant                                                                    | 129        | 32 s         | 249 ms         |
| Steelhouse                                                                    | 296        | 32 s         | 108 ms         |
| Intercept Interactive                                                         | 284        | 32 s         | 113 ms         |
| Riskified                                                                     | 438        | 32 s         | 72 ms          |
| Playbuzz                                                                      | 209        | 32 s         | 151 ms         |
| [ReadSpeaker](https://www.readspeaker.com)                                    | 400        | 31 s         | 79 ms          |
| Sooqr Search                                                                  | 408        | 31 s         | 76 ms          |
| DemandBase                                                                    | 376        | 31 s         | 82 ms          |
| Ghostery Enterprise                                                           | 234        | 30 s         | 129 ms         |
| AdSniper                                                                      | 123        | 30 s         | 242 ms         |
| Key CDN                                                                       | 170        | 30 s         | 175 ms         |
| Appier                                                                        | 347        | 29 s         | 85 ms          |
| [The Trade Desk](https://www.thetradedesk.com/)                               | 213        | 29 s         | 137 ms         |
| [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)           | 551        | 29 s         | 53 ms          |
| Exponea                                                                       | 298        | 28 s         | 95 ms          |
| Unruly Media                                                                  | 273        | 28 s         | 102 ms         |
| Fresh Relevance                                                               | 325        | 27 s         | 85 ms          |
| Sajari Pty                                                                    | 202        | 27 s         | 135 ms         |
| KISSmetrics                                                                   | 354        | 27 s         | 76 ms          |
| SublimeSkinz                                                                  | 407        | 27 s         | 65 ms          |
| Ambassador                                                                    | 204        | 26 s         | 130 ms         |
| Advance Magazine Group                                                        | 160        | 26 s         | 165 ms         |
| Zarget                                                                        | 216        | 25 s         | 118 ms         |
| Feedbackify                                                                   | 300        | 25 s         | 83 ms          |
| SnapWidget                                                                    | 599        | 25 s         | 41 ms          |
| NetAffiliation                                                                | 212        | 24 s         | 116 ms         |
| linkpulse                                                                     | 332        | 24 s         | 74 ms          |
| Webtrekk                                                                      | 189        | 24 s         | 127 ms         |
| eXelate                                                                       | 263        | 24 s         | 91 ms          |
| CPEx                                                                          | 299        | 24 s         | 80 ms          |
| DialogTech                                                                    | 266        | 23 s         | 87 ms          |
| ResponseTap                                                                   | 299        | 23 s         | 76 ms          |
| TechTarget                                                                    | 131        | 22 s         | 166 ms         |
| FLXone                                                                        | 164        | 22 s         | 132 ms         |
| VoiceFive                                                                     | 188        | 22 s         | 115 ms         |
| [Byside](http://www.byside.com)                                               | 162        | 21 s         | 131 ms         |
| ResponsiveVoice                                                               | 258        | 20 s         | 78 ms          |
| Transifex                                                                     | 104        | 20 s         | 191 ms         |
| Vee24                                                                         | 103        | 20 s         | 190 ms         |
| Extole                                                                        | 105        | 18 s         | 174 ms         |
| Accordant Media                                                               | 196        | 18 s         | 92 ms          |
| Hupso Website Analyzer                                                        | 251        | 18 s         | 70 ms          |
| Aggregate Knowledge                                                           | 246        | 18 s         | 72 ms          |
| BannerFlow                                                                    | 222        | 18 s         | 80 ms          |
| [Ipify](https://www.ipify.org)                                                | 133        | 17 s         | 131 ms         |
| Viacom                                                                        | 124        | 17 s         | 138 ms         |
| Sirv                                                                          | 177        | 17 s         | 96 ms          |
| Hull.js                                                                       | 117        | 17 s         | 142 ms         |
| Customer.io                                                                   | 150        | 16 s         | 108 ms         |
| Vibrant Media                                                                 | 153        | 15 s         | 101 ms         |
| Polldaddy                                                                     | 150        | 15 s         | 103 ms         |
| Resonance Insights                                                            | 101        | 15 s         | 152 ms         |
| MaxMind                                                                       | 119        | 15 s         | 128 ms         |
| CleverTap                                                                     | 174        | 14 s         | 83 ms          |
| Civic                                                                         | 188        | 14 s         | 77 ms          |
| Exactag                                                                       | 129        | 14 s         | 111 ms         |
| Sweet Tooth                                                                   | 131        | 14 s         | 108 ms         |
| [GoSquared](https://www.gosquared.com)                                        | 192        | 14 s         | 73 ms          |
| Betgenius                                                                     | 133        | 13 s         | 101 ms         |
| SlimCut Media Outstream                                                       | 130        | 13 s         | 102 ms         |
| Apester                                                                       | 153        | 12 s         | 81 ms          |
| Simpli.fi                                                                     | 147        | 12 s         | 85 ms          |
| Infinity Tracking                                                             | 151        | 12 s         | 82 ms          |
| OnScroll                                                                      | 145        | 12 s         | 85 ms          |
| Adobe Marketing Cloud                                                         | 141        | 12 s         | 87 ms          |
| Talkable                                                                      | 153        | 12 s         | 80 ms          |
| AdRiver                                                                       | 113        | 12 s         | 106 ms         |
| CyberSource (Visa)                                                            | 156        | 12 s         | 74 ms          |
| Woopra                                                                        | 172        | 12 s         | 67 ms          |
| Opinion Stage                                                                 | 140        | 11 s         | 81 ms          |
| Video Media Groep                                                             | 110        | 11 s         | 102 ms         |
| DialogTech SourceTrak                                                         | 169        | 11 s         | 66 ms          |
| Ziff Davis Tech                                                               | 126        | 11 s         | 87 ms          |
| Exponential Interactive                                                       | 201        | 11 s         | 53 ms          |
| AnswerDash                                                                    | 126        | 11 s         | 84 ms          |
| Impact Radius                                                                 | 138        | 10 s         | 75 ms          |
| Flickr                                                                        | 120        | 10 s         | 85 ms          |
| Edge Web Fonts                                                                | 149        | 10 s         | 68 ms          |
| Covert Pics                                                                   | 139        | 10 s         | 73 ms          |
| Swoop                                                                         | 133        | 10 s         | 76 ms          |
| Pagefair                                                                      | 144        | 10 s         | 70 ms          |
| AWeber                                                                        | 147        | 10 s         | 67 ms          |
| [Vimeo](http://vimeo.com/)                                                    | 110        | 10 s         | 89 ms          |
| Drip                                                                          | 204        | 10 s         | 48 ms          |
| SecuredVisit                                                                  | 136        | 10 s         | 72 ms          |
| Auto Link Maker                                                               | 111        | 10 s         | 87 ms          |
| FreakOut                                                                      | 147        | 9 s          | 64 ms          |
| Friendbuy                                                                     | 140        | 9 s          | 66 ms          |
| Twitter Online Conversion Tracking                                            | 135        | 9 s          | 64 ms          |
| Research Online                                                               | 115        | 8 s          | 68 ms          |
| Freespee                                                                      | 102        | 8 s          | 75 ms          |
| Delta Projects AB                                                             | 128        | 8 s          | 59 ms          |
| Sailthru                                                                      | 127        | 7 s          | 58 ms          |
| Klevu Search                                                                  | 116        | 7 s          | 60 ms          |
| [Fastly Insights](https://insights.fastlylabs.com)                            | 102        | 6 s          | 60 ms          |

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

Verify that the origins in `data/entities.json5` are correct. Most issues will simply be the result of mislabelling of shared origins. If everything checks out, there is likely no further action and the data is valid. If you still believe there's errors, file an issue to discuss futher.

<a name="contribute"></a>

### How can I contribute?

Only about 90% of the third party script execution has been assigned to an entity. We could use your help identifying the rest! See [Contributing](#contributing) for details.

## Contributing

### Thanks

A **huge** thanks to [@simonhearne](https://twitter.com/simonhearne) and [@soulgalore](https://twitter.com/soulislove) for their assistance in classifying additional domains!

### Updating the Entities

The domain->entity mapping can be found in `data/entities.json5`. Adding a new entity is as simple as adding a new array item with the following form.

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
