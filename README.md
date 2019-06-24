# [Third Party Web](https://www.thirdpartyweb.today/)

## Check out the shiny new web UI https://www.thirdpartyweb.today/

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
        1.  [CDNs](#cdn)
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

[HTTP Archive](https://httparchive.org/) is an inititiave that tracks how the web is built. Every month, ~4 million sites are crawled with [Lighthouse](https://github.com/GoogleChrome/lighthouse) on mobile. Lighthouse breaks down the total script execution time of each page and attributes the execution to a URL. Using [BigQuery](https://cloud.google.com/bigquery/), this project aggregates the script execution to the origin-level and assigns each origin to the responsible entity.

## NPM Module

The entity classification data is available as an NPM module.

```js
const {getEntity} = require('third-party-web')
const entity = getEntity('https://d36mpcpuzc4ztk.cloudfront.net/js/visitor.js')
console.log(entity)
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

## 2019-05-06 dataset

Google Ads clarified that `www.googletagservices.com` serves more ad scripts than generic tag management, and it has been reclassified accordingly. This has dropped the overall Tag Management share considerably back down to its earlier position.

## 2019-05-13 dataset

A shortcoming of the attribution approach has been fixed. Total usage is now reported based on the number of _pages_ in the dataset that use the third-party, not the number of _scripts_. Correspondingly, all average impact times are now reported _per page_ rather than _per script_. Previously, a third party could appear to have a lower impact or be more popular simply by splitting their work across multiple files.

Third-parties that performed most of their work from a single script should see little to no impact from this change, but some entities have seen significant ranking movement. Hosting providers that host entire pages are, understandably, the most affected.

Some notable changes below:

| Third-Party | Previously (per-script) | Now (per-page) |
| ----------- | ----------------------- | -------------- |
| Beeketing   | 137 ms                  | 465 ms         |
| Sumo        | 263 ms                  | 798 ms         |
| Tumblr      | 324 ms                  | 1499 ms        |
| Yandex APIs | 393 ms                  | 1231 ms        |
| Google Ads  | 402 ms                  | 1285 ms        |
| Wix         | 972 ms                  | 5393 ms        |

## Data

### Summary

Across top ~4 million sites, ~2700 origins account for ~57% of all script execution time with the top 50 entities already accounting for ~47%. Third party script execution is the majority chunk of the web today, and it's important to make informed choices.

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

Unsurprisingly, ads account for the largest identifiable chunk of third party script execution.

![breakdown by category](./by-category.png)

<a name="ad"></a>

#### Advertising

These scripts are part of advertising networks, either serving or measuring.

| Rank | Name                                                           | Usage   | Average Impact |
| ---- | -------------------------------------------------------------- | ------- | -------------- |
| 1    | ExoClick                                                       | 2,039   | 51 ms          |
| 2    | BlueKai                                                        | 2,608   | 68 ms          |
| 3    | Gemius                                                         | 7,399   | 74 ms          |
| 4    | MailMunch                                                      | 5,240   | 79 ms          |
| 5    | Affiliate Window                                               | 1,057   | 79 ms          |
| 6    | Crowd Control                                                  | 2,034   | 81 ms          |
| 7    | PubNation                                                      | 2,282   | 82 ms          |
| 8    | Rakuten Marketing                                              | 1,696   | 83 ms          |
| 9    | Geniee                                                         | 1,079   | 86 ms          |
| 10   | Constant Contact                                               | 1,325   | 94 ms          |
| 11   | PushCrew                                                       | 3,311   | 99 ms          |
| 12   | [Scorecard Research](https://www.scorecardresearch.com/)       | 11,949  | 109 ms         |
| 13   | [Rubicon Project](https://rubiconproject.com/)                 | 4,421   | 111 ms         |
| 14   | Unbounce                                                       | 2,023   | 111 ms         |
| 15   | Refersion                                                      | 1,374   | 122 ms         |
| 16   | OptiMonk                                                       | 1,052   | 123 ms         |
| 17   | [Adroll](https://www.adroll.com/)                              | 3,610   | 127 ms         |
| 18   | DTSCOUT                                                        | 7,501   | 133 ms         |
| 19   | [Amazon Ads](https://ad.amazon.com/)                           | 20,087  | 133 ms         |
| 20   | [Popads](https://www.popads.net/)                              | 4,685   | 136 ms         |
| 21   | fluct                                                          | 5,796   | 139 ms         |
| 22   | [Outbrain](https://www.outbrain.com/)                          | 4,108   | 152 ms         |
| 23   | AudienceSearch                                                 | 5,743   | 155 ms         |
| 24   | SmartAdServer                                                  | 2,008   | 168 ms         |
| 25   | Skimbit                                                        | 20,567  | 174 ms         |
| 26   | [AOL / Oath / Verizon Media](https://www.oath.com/)            | 1,490   | 176 ms         |
| 27   | [Yahoo!](https://www.yahoo.com/)                               | 8,142   | 177 ms         |
| 28   | Sharethrough                                                   | 2,319   | 179 ms         |
| 29   | [Bing Ads](https://bingads.microsoft.com)                      | 13,033  | 184 ms         |
| 30   | Cxense                                                         | 3,893   | 187 ms         |
| 31   | Microad                                                        | 1,379   | 189 ms         |
| 32   | Rocket Fuel                                                    | 2,235   | 189 ms         |
| 33   | [Criteo](https://www.criteo.com/)                              | 77,613  | 191 ms         |
| 34   | Digital ad Consortium                                          | 2,947   | 192 ms         |
| 35   | Smart AdServer                                                 | 2,779   | 204 ms         |
| 36   | Index Exchange                                                 | 3,231   | 207 ms         |
| 37   | Adloox                                                         | 2,668   | 216 ms         |
| 38   | JuicyAds                                                       | 2,035   | 219 ms         |
| 39   | Tynt                                                           | 13,823  | 225 ms         |
| 40   | Adyoulike                                                      | 1,205   | 249 ms         |
| 41   | Sortable                                                       | 1,164   | 255 ms         |
| 42   | VigLink                                                        | 7,709   | 285 ms         |
| 43   | Klaviyo                                                        | 7,709   | 298 ms         |
| 44   | Privy                                                          | 10,823  | 318 ms         |
| 45   | Adform                                                         | 6,100   | 327 ms         |
| 46   | LongTail Ad Solutions                                          | 2,222   | 332 ms         |
| 47   | [Pubmatic](https://pubmatic.com/)                              | 3,598   | 339 ms         |
| 48   | Teads                                                          | 5,362   | 443 ms         |
| 49   | [Sizmek](https://www.sizmek.com/)                              | 3,667   | 445 ms         |
| 50   | [AppNexus](https://www.appnexus.com/)                          | 9,834   | 454 ms         |
| 51   | [MGID](https://www.mgid.com/)                                  | 4,701   | 455 ms         |
| 52   | [Taboola](https://www.taboola.com/)                            | 13,023  | 490 ms         |
| 53   | sovrn                                                          | 2,509   | 499 ms         |
| 54   | [Yandex Ads](https://yandex.com/adv/)                          | 22,363  | 510 ms         |
| 55   | [Intent Media](https://intent.com/)                            | 2,088   | 524 ms         |
| 56   | Between Digital                                                | 1,084   | 591 ms         |
| 57   | [MediaVine](https://www.mediavine.com/)                        | 4,161   | 607 ms         |
| 58   | iBillboard                                                     | 1,574   | 622 ms         |
| 59   | GumGum                                                         | 2,865   | 711 ms         |
| 60   | Admixer for Publishers                                         | 1,011   | 764 ms         |
| 61   | [Media.net](https://www.media.net/)                            | 3,771   | 871 ms         |
| 62   | [OpenX](https://www.openx.com/)                                | 6,605   | 973 ms         |
| 63   | [WordAds](https://wordads.co/)                                 | 20,352  | 1075 ms        |
| 64   | [Moat](https://moat.com/)                                      | 14,094  | 1087 ms        |
| 65   | Vidible                                                        | 1,179   | 1175 ms        |
| 66   | Infolinks                                                      | 2,304   | 1241 ms        |
| 67   | [Integral Ad Science](https://integralads.com/uk/)             | 9,156   | 1258 ms        |
| 68   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 610,999 | 1264 ms        |
| 69   | AdMatic                                                        | 1,298   | 1506 ms        |
| 70   | [DoubleVerify](https://www.doubleverify.com/)                  | 1,551   | 1564 ms        |
| 71   | StickyADS.tv                                                   | 3,000   | 1637 ms        |
| 72   | [33 Across](https://33across.com/)                             | 5,606   | 1698 ms        |
| 73   | LKQD                                                           | 1,174   | 1842 ms        |
| 74   | [fam](http://admin.fam-ad.com/report/)                         | 2,021   | 1905 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                              | 1,554     | 57 ms          |
| 2    | [WordPress Site Stats](https://wp.com/)                                      | 7,260     | 68 ms          |
| 3    | Amplitude Mobile Analytics                                                   | 1,290     | 70 ms          |
| 4    | StatCounter                                                                  | 7,821     | 74 ms          |
| 5    | Roxr Software                                                                | 2,718     | 76 ms          |
| 6    | Net Reviews                                                                  | 1,417     | 80 ms          |
| 7    | Trust Pilot                                                                  | 2,822     | 80 ms          |
| 8    | Heap                                                                         | 2,145     | 81 ms          |
| 9    | [Mixpanel](https://mixpanel.com/)                                            | 5,947     | 84 ms          |
| 10   | [Google Analytics](https://www.google.com/analytics/analytics/)              | 1,380,704 | 91 ms          |
| 11   | Searchanise                                                                  | 2,735     | 94 ms          |
| 12   | [Hotjar](https://www.hotjar.com/)                                            | 114,591   | 96 ms          |
| 13   | etracker                                                                     | 1,557     | 98 ms          |
| 14   | Chartbeat                                                                    | 7,239     | 102 ms         |
| 15   | [Quantcast](https://www.quantcast.com)                                       | 5,993     | 120 ms         |
| 16   | Marchex                                                                      | 3,901     | 120 ms         |
| 17   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 9,478     | 125 ms         |
| 18   | [Snowplow](https://snowplowanalytics.com/)                                   | 5,187     | 126 ms         |
| 19   | Parse.ly                                                                     | 2,996     | 131 ms         |
| 20   | CallRail                                                                     | 6,142     | 132 ms         |
| 21   | [Snapchat](https://www.snapchat.com)                                         | 6,078     | 134 ms         |
| 22   | [Crazy Egg](https://www.crazyegg.com/)                                       | 12,900    | 134 ms         |
| 23   | Treasure Data                                                                | 10,932    | 156 ms         |
| 24   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 10,265    | 159 ms         |
| 25   | Evidon                                                                       | 1,571     | 194 ms         |
| 26   | [Marketo](https://www.marketo.com)                                           | 1,069     | 209 ms         |
| 27   | Gigya                                                                        | 2,005     | 213 ms         |
| 28   | [Segment](https://segment.com/)                                              | 7,639     | 214 ms         |
| 29   | Nosto                                                                        | 1,887     | 220 ms         |
| 30   | [VWO](https://vwo.com)                                                       | 3,388     | 226 ms         |
| 31   | FullStory                                                                    | 5,521     | 232 ms         |
| 32   | ForeSee                                                                      | 1,395     | 255 ms         |
| 33   | [BounceX](https://www.bouncex.com/)                                          | 1,009     | 264 ms         |
| 34   | Ezoic                                                                        | 2,622     | 280 ms         |
| 35   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 9,736     | 299 ms         |
| 36   | [Optimizely](https://www.optimizely.com/)                                    | 11,621    | 310 ms         |
| 37   | SessionCam                                                                   | 1,378     | 382 ms         |
| 38   | Inspectlet                                                                   | 5,344     | 426 ms         |
| 39   | [Keen](https://keen.io/)                                                     | 2,457     | 444 ms         |
| 40   | Bazaarvoice                                                                  | 1,426     | 446 ms         |
| 41   | [Histats](http://histats.com/)                                               | 13,937    | 455 ms         |
| 42   | Feefo.com                                                                    | 1,345     | 461 ms         |
| 43   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 228,489   | 504 ms         |
| 44   | [DigiTrust](http://www.digitru.st/)                                          | 3,536     | 565 ms         |
| 45   | AB Tasty                                                                     | 3,042     | 591 ms         |
| 46   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 21,145    | 593 ms         |
| 47   | Mouseflow                                                                    | 1,512     | 647 ms         |
| 48   | [Lucky Orange](https://www.luckyorange.com/)                                 | 6,713     | 916 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage   | Average Impact |
| ---- | ---------------------------------------------------- | ------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 7,153   | 72 ms          |
| 2    | [Instagram](https://www.instagram.com)               | 6,003   | 96 ms          |
| 3    | Micropat                                             | 20,966  | 100 ms         |
| 4    | [Pinterest](https://pinterest.com/)                  | 16,346  | 113 ms         |
| 5    | [LinkedIn](https://www.linkedin.com/)                | 14,129  | 118 ms         |
| 6    | Kakao                                                | 7,609   | 131 ms         |
| 7    | [Shareaholic](https://www.shareaholic.com/)          | 6,553   | 135 ms         |
| 8    | [Facebook](https://www.facebook.com)                 | 911,878 | 146 ms         |
| 9    | [Twitter](https://twitter.com)                       | 253,437 | 166 ms         |
| 10   | [Yandex Share](https://yastatic.net/share2/share.js) | 22,504  | 182 ms         |
| 11   | [Disqus](http://disqus.com/)                         | 1,471   | 290 ms         |
| 12   | [ShareThis](https://www.sharethis.com/)              | 27,919  | 340 ms         |
| 13   | SocialShopWave                                       | 1,274   | 466 ms         |
| 14   | [AddThis](http://www.addthis.com/)                   | 118,045 | 497 ms         |
| 15   | [PIXNET](https://www.pixnet.net/)                    | 27,540  | 1036 ms        |
| 16   | LiveJournal                                          | 3,519   | 1616 ms        |
| 17   | [Tumblr](https://tumblr.com/)                        | 8,575   | 1693 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage  | Average Impact |
| ---- | -------------------------------------------- | ------ | -------------- |
| 1    | [YouTube](https://youtube.com)               | 29,379 | 145 ms         |
| 2    | [Brightcove](https://www.brightcove.com/en/) | 4,706  | 708 ms         |
| 3    | [Wistia](https://wistia.com/)                | 10,201 | 764 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Trusted Shops                                                             | 1,392   | 47 ms          |
| 2    | [Stripe](https://stripe.com)                                              | 5,425   | 72 ms          |
| 3    | [New Relic](https://newrelic.com/)                                        | 2,832   | 80 ms          |
| 4    | [OneSignal](https://onesignal.com/)                                       | 12,480  | 82 ms          |
| 5    | Siteimprove                                                               | 1,893   | 88 ms          |
| 6    | [Cookiebot](https://www.cookiebot.com/)                                   | 9,330   | 92 ms          |
| 7    | GetSiteControl                                                            | 2,483   | 109 ms         |
| 8    | iubenda                                                                   | 10,416  | 113 ms         |
| 9    | Sift Science                                                              | 1,151   | 151 ms         |
| 10   | [AppDynamics](https://www.appdynamics.com/)                               | 1,393   | 154 ms         |
| 11   | Swiftype                                                                  | 1,345   | 178 ms         |
| 12   | Bold Commerce                                                             | 8,911   | 184 ms         |
| 13   | [Amazon Pay](https://pay.amazon.com)                                      | 12,327  | 194 ms         |
| 14   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 279,724 | 197 ms         |
| 15   | MaxCDN Enterprise                                                         | 1,705   | 234 ms         |
| 16   | Po.st                                                                     | 1,115   | 234 ms         |
| 17   | Affirm                                                                    | 1,195   | 265 ms         |
| 18   | Seznam                                                                    | 1,583   | 297 ms         |
| 19   | Rambler                                                                   | 8,818   | 301 ms         |
| 20   | [Google Maps](https://www.google.com/maps)                                | 117,212 | 301 ms         |
| 21   | Fastly                                                                    | 5,197   | 302 ms         |
| 22   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 14,080  | 305 ms         |
| 23   | [PayPal](https://paypal.com)                                              | 8,366   | 385 ms         |
| 24   | [TrustArc](https://www.trustarc.com/)                                     | 4,016   | 387 ms         |
| 25   | Secomapp                                                                  | 1,134   | 397 ms         |
| 26   | Datacamp                                                                  | 12,035  | 417 ms         |
| 27   | [Distil Networks](https://www.distilnetworks.com/)                        | 10,333  | 455 ms         |
| 28   | [Sentry](https://sentry.io/)                                              | 15,444  | 458 ms         |
| 29   | [Yandex APIs](https://yandex.ru/)                                         | 20,384  | 1204 ms        |
| 30   | Mapbox                                                                    | 3,940   | 1401 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage  | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------ | -------------- |
| 1    | [Blogger](http://www.blogger.com/)                                                        | 10,508 | 59 ms          |
| 2    | [WordPress](https://wp.com/)                                                              | 86,852 | 166 ms         |
| 3    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 1,969  | 454 ms         |
| 4    | [Shopify](https://www.shopify.com/)                                                       | 70,206 | 700 ms         |
| 5    | [Dealer](https://www.dealer.com/)                                                         | 8,178  | 709 ms         |
| 6    | [Squarespace](https://www.squarespace.com/)                                               | 34,779 | 1079 ms        |
| 7    | [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,497  | 1145 ms        |
| 8    | [Hatena Blog](https://hatenablog.com/)                                                    | 17,414 | 1259 ms        |
| 9    | [Weebly](https://www.weebly.com/)                                                         | 13,815 | 1303 ms        |
| 10   | [Wix](https://www.wix.com/)                                                               | 41,060 | 5566 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [RD Station](https://www.rdstation.com/en/) | 3,660  | 74 ms          |
| 2    | [Listrak](https://www.listrak.com/)         | 1,033  | 149 ms         |
| 3    | [Drift](https://www.drift.com/)             | 4,969  | 164 ms         |
| 4    | Ve                                          | 2,874  | 174 ms         |
| 5    | [Hubspot](https://hubspot.com/)             | 20,049 | 223 ms         |
| 6    | [Mailchimp](https://mailchimp.com/)         | 17,144 | 225 ms         |
| 7    | [Yotpo](https://www.yotpo.com/)             | 10,025 | 231 ms         |
| 8    | [OptinMonster](https://optinmonster.com/)   | 6,988  | 353 ms         |
| 9    | [Beeketing](https://beeketing.com/)         | 18,509 | 476 ms         |
| 10   | Bigcommerce                                 | 8,007  | 543 ms         |
| 11   | [Sumo](https://sumo.com/)                   | 19,510 | 765 ms         |
| 12   | [Albacross](https://albacross.com/)         | 1,717  | 768 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | Foursixty                                        | 1,128  | 85 ms          |
| 2    | iPerceptions                                     | 2,326  | 104 ms         |
| 3    | [LivePerson](https://www.liveperson.com/)        | 3,973  | 135 ms         |
| 4    | [LiveChat](https://www.livechatinc.com/)         | 9,948  | 155 ms         |
| 5    | Comm100                                          | 1,330  | 162 ms         |
| 6    | Pure Chat                                        | 3,816  | 168 ms         |
| 7    | iAdvize SAS                                      | 1,046  | 254 ms         |
| 8    | [Tawk.to](https://www.tawk.to/)                  | 47,012 | 331 ms         |
| 9    | [Jivochat](https://www.jivochat.com/)            | 27,186 | 344 ms         |
| 10   | [ContactAtOnce](https://www.contactatonce.com/)  | 2,952  | 349 ms         |
| 11   | [Help Scout](https://www.helpscout.net/)         | 1,578  | 361 ms         |
| 12   | [Tidio Live Chat](https://www.tidiochat.com/en/) | 6,610  | 364 ms         |
| 13   | [Intercom](https://www.intercom.com)             | 12,881 | 409 ms         |
| 14   | LiveTex                                          | 2,116  | 516 ms         |
| 15   | [Olark](https://www.olark.com/)                  | 7,011  | 633 ms         |
| 16   | [ZenDesk](https://zendesk.com/)                  | 65,392 | 667 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                | Usage  | Average Impact |
| ---- | ----------------------------------- | ------ | -------------- |
| 1    | Accuweather                         | 1,397  | 77 ms          |
| 2    | OpenTable                           | 1,886  | 130 ms         |
| 3    | Embedly                             | 2,426  | 199 ms         |
| 4    | Medium                              | 1,223  | 399 ms         |
| 5    | [AMP](https://amp.dev/)             | 51,439 | 420 ms         |
| 6    | Clicktripz                          | 2,579  | 475 ms         |
| 7    | [Hotmart](https://www.hotmart.com/) | 1,062  | 981 ms         |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 10,498  | 86 ms          |
| 2    | [FontAwesome CDN](https://fontawesome.com/)                  | 22,239  | 133 ms         |
| 3    | [Yandex CDN](https://yandex.ru/)                             | 1,867   | 151 ms         |
| 4    | Microsoft Hosted Libs                                        | 4,720   | 190 ms         |
| 5    | [jQuery CDN](https://code.jquery.com/)                       | 145,319 | 221 ms         |
| 6    | [Google CDN](https://developers.google.com/speed/libraries/) | 739,997 | 240 ms         |
| 7    | [Unpkg](https://unpkg.com)                                   | 3,069   | 257 ms         |
| 8    | [Cloudflare CDN](https://cdnjs.com/)                         | 84,403  | 274 ms         |
| 9    | Azure Web Services                                           | 4,339   | 330 ms         |
| 10   | [Akamai](https://www.akamai.com/)                            | 9,596   | 337 ms         |
| 11   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 25,246  | 351 ms         |
| 12   | Monotype                                                     | 4,847   | 556 ms         |
| 13   | [CreateJS CDN](http://code.createjs.com/)                    | 1,750   | 3723 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 493,202 | 119 ms         |
| 2    | [BrightTag / Signal](https://www.signal.co)                                   | 5,989   | 130 ms         |
| 3    | TagCommander                                                                  | 1,082   | 171 ms         |
| 4    | [Tealium](https://tealium.com/)                                               | 12,020  | 370 ms         |
| 5    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 26,215  | 382 ms         |
| 6    | [Ensighten](https://www.ensighten.com/)                                       | 5,373   | 410 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage     | Average Impact |
| ---- | ------------------------------------------------- | --------- | -------------- |
| 1    | [Amazon Web Services](https://aws.amazon.com/s3/) | 33,688    | 181 ms         |
| 2    | [All Other 3rd Parties](#by-category)             | 1,030,344 | 244 ms         |
| 3    | [Parking Crew](http://parkingcrew.net/)           | 5,622     | 482 ms         |
| 4    | uLogin                                            | 2,328     | 1130 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                            | 610,999    | 772,461 s    | 1264 ms        |
| [All Other 3rd Parties](#by-category)                                                     | 1,030,344  | 251,770 s    | 244 ms         |
| [Wix](https://www.wix.com/)                                                               | 41,060     | 228,548 s    | 5566 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 739,997    | 177,701 s    | 240 ms         |
| [Facebook](https://www.facebook.com)                                                      | 911,878    | 133,435 s    | 146 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)                           | 1,380,704  | 124,960 s    | 91 ms          |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 228,489    | 115,124 s    | 504 ms         |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 493,202    | 58,744 s     | 119 ms         |
| [AddThis](http://www.addthis.com/)                                                        | 118,045    | 58,685 s     | 497 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 279,724    | 55,046 s     | 197 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 70,206     | 49,123 s     | 700 ms         |
| [ZenDesk](https://zendesk.com/)                                                           | 65,392     | 43,592 s     | 667 ms         |
| [Twitter](https://twitter.com)                                                            | 253,437    | 42,122 s     | 166 ms         |
| [Squarespace](https://www.squarespace.com/)                                               | 34,779     | 37,530 s     | 1079 ms        |
| [Google Maps](https://www.google.com/maps)                                                | 117,212    | 35,336 s     | 301 ms         |
| [jQuery CDN](https://code.jquery.com/)                                                    | 145,319    | 32,170 s     | 221 ms         |
| [PIXNET](https://www.pixnet.net/)                                                         | 27,540     | 28,525 s     | 1036 ms        |
| [Yandex APIs](https://yandex.ru/)                                                         | 20,384     | 24,537 s     | 1204 ms        |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 84,403     | 23,111 s     | 274 ms         |
| [Hatena Blog](https://hatenablog.com/)                                                    | 17,414     | 21,917 s     | 1259 ms        |
| [WordAds](https://wordads.co/)                                                            | 20,352     | 21,886 s     | 1075 ms        |
| [AMP](https://amp.dev/)                                                                   | 51,439     | 21,583 s     | 420 ms         |
| [Weebly](https://www.weebly.com/)                                                         | 13,815     | 18,006 s     | 1303 ms        |
| [Tawk.to](https://www.tawk.to/)                                                           | 47,012     | 15,576 s     | 331 ms         |
| [Moat](https://moat.com/)                                                                 | 14,094     | 15,323 s     | 1087 ms        |
| [Sumo](https://sumo.com/)                                                                 | 19,510     | 14,934 s     | 765 ms         |
| [Criteo](https://www.criteo.com/)                                                         | 77,613     | 14,838 s     | 191 ms         |
| [Tumblr](https://tumblr.com/)                                                             | 8,575      | 14,516 s     | 1693 ms        |
| [WordPress](https://wp.com/)                                                              | 86,852     | 14,442 s     | 166 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)                        | 21,145     | 12,544 s     | 593 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 9,156      | 11,518 s     | 1258 ms        |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 22,363     | 11,398 s     | 510 ms         |
| [Hotjar](https://www.hotjar.com/)                                                         | 114,591    | 11,010 s     | 96 ms          |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 26,215     | 10,011 s     | 382 ms         |
| [33 Across](https://33across.com/)                                                        | 5,606      | 9,521 s      | 1698 ms        |
| [ShareThis](https://www.sharethis.com/)                                                   | 27,919     | 9,501 s      | 340 ms         |
| [Jivochat](https://www.jivochat.com/)                                                     | 27,186     | 9,339 s      | 344 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 25,246     | 8,872 s      | 351 ms         |
| [Beeketing](https://beeketing.com/)                                                       | 18,509     | 8,804 s      | 476 ms         |
| [Wistia](https://wistia.com/)                                                             | 10,201     | 7,797 s      | 764 ms         |
| [Sentry](https://sentry.io/)                                                              | 15,444     | 7,073 s      | 458 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                                 | 1,750      | 6,515 s      | 3723 ms        |
| [OpenX](https://www.openx.com/)                                                           | 6,605      | 6,428 s      | 973 ms         |
| [Taboola](https://www.taboola.com/)                                                       | 13,023     | 6,380 s      | 490 ms         |
| [Histats](http://histats.com/)                                                            | 13,937     | 6,348 s      | 455 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 6,713      | 6,151 s      | 916 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 33,688     | 6,099 s      | 181 ms         |
| [Dealer](https://www.dealer.com/)                                                         | 8,178      | 5,799 s      | 709 ms         |
| LiveJournal                                                                               | 3,519      | 5,687 s      | 1616 ms        |
| Mapbox                                                                                    | 3,940      | 5,522 s      | 1401 ms        |
| [Intercom](https://www.intercom.com)                                                      | 12,881     | 5,269 s      | 409 ms         |
| Datacamp                                                                                  | 12,035     | 5,021 s      | 417 ms         |
| StickyADS.tv                                                                              | 3,000      | 4,911 s      | 1637 ms        |
| [Distil Networks](https://www.distilnetworks.com/)                                        | 10,333     | 4,701 s      | 455 ms         |
| [AppNexus](https://www.appnexus.com/)                                                     | 9,834      | 4,468 s      | 454 ms         |
| [Hubspot](https://hubspot.com/)                                                           | 20,049     | 4,465 s      | 223 ms         |
| [Tealium](https://tealium.com/)                                                           | 12,020     | 4,443 s      | 370 ms         |
| [Olark](https://www.olark.com/)                                                           | 7,011      | 4,435 s      | 633 ms         |
| Bigcommerce                                                                               | 8,007      | 4,349 s      | 543 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 14,080     | 4,300 s      | 305 ms         |
| [YouTube](https://youtube.com)                                                            | 29,379     | 4,265 s      | 145 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                                      | 22,504     | 4,088 s      | 182 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,497      | 4,003 s      | 1145 ms        |
| [Mailchimp](https://mailchimp.com/)                                                       | 17,144     | 3,851 s      | 225 ms         |
| [fam](http://admin.fam-ad.com/report/)                                                    | 2,021      | 3,851 s      | 1905 ms        |
| [Optimizely](https://www.optimizely.com/)                                                 | 11,621     | 3,604 s      | 310 ms         |
| Skimbit                                                                                   | 20,567     | 3,581 s      | 174 ms         |
| Privy                                                                                     | 10,823     | 3,437 s      | 318 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                              | 4,706      | 3,333 s      | 708 ms         |
| [Media.net](https://www.media.net/)                                                       | 3,771      | 3,283 s      | 871 ms         |
| [Akamai](https://www.akamai.com/)                                                         | 9,596      | 3,236 s      | 337 ms         |
| [PayPal](https://paypal.com)                                                              | 8,366      | 3,217 s      | 385 ms         |
| Tynt                                                                                      | 13,823     | 3,106 s      | 225 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 22,239     | 2,951 s      | 133 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 9,736      | 2,910 s      | 299 ms         |
| Infolinks                                                                                 | 2,304      | 2,860 s      | 1241 ms        |
| [Parking Crew](http://parkingcrew.net/)                                                   | 5,622      | 2,708 s      | 482 ms         |
| Monotype                                                                                  | 4,847      | 2,693 s      | 556 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 20,087     | 2,670 s      | 133 ms         |
| Rambler                                                                                   | 8,818      | 2,651 s      | 301 ms         |
| uLogin                                                                                    | 2,328      | 2,631 s      | 1130 ms        |
| [MediaVine](https://www.mediavine.com/)                                                   | 4,161      | 2,528 s      | 607 ms         |
| [OptinMonster](https://optinmonster.com/)                                                 | 6,988      | 2,464 s      | 353 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                             | 1,551      | 2,426 s      | 1564 ms        |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 6,610      | 2,407 s      | 364 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 13,033     | 2,392 s      | 184 ms         |
| [Amazon Pay](https://pay.amazon.com)                                                      | 12,327     | 2,388 s      | 194 ms         |
| Teads                                                                                     | 5,362      | 2,373 s      | 443 ms         |
| [Yotpo](https://www.yotpo.com/)                                                           | 10,025     | 2,320 s      | 231 ms         |
| Klaviyo                                                                                   | 7,709      | 2,299 s      | 298 ms         |
| Inspectlet                                                                                | 5,344      | 2,278 s      | 426 ms         |
| [Ensighten](https://www.ensighten.com/)                                                   | 5,373      | 2,205 s      | 410 ms         |
| VigLink                                                                                   | 7,709      | 2,199 s      | 285 ms         |
| LKQD                                                                                      | 1,174      | 2,162 s      | 1842 ms        |
| [MGID](https://www.mgid.com/)                                                             | 4,701      | 2,141 s      | 455 ms         |
| Micropat                                                                                  | 20,966     | 2,098 s      | 100 ms         |
| GumGum                                                                                    | 2,865      | 2,036 s      | 711 ms         |
| [DigiTrust](http://www.digitru.st/)                                                       | 3,536      | 1,997 s      | 565 ms         |
| Adform                                                                                    | 6,100      | 1,997 s      | 327 ms         |
| AdMatic                                                                                   | 1,298      | 1,955 s      | 1506 ms        |
| [Pinterest](https://pinterest.com/)                                                       | 16,346     | 1,852 s      | 113 ms         |
| Blindado                                                                                  | 667        | 1,815 s      | 2722 ms        |
| AB Tasty                                                                                  | 3,042      | 1,799 s      | 591 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 12,900     | 1,732 s      | 134 ms         |
| Treasure Data                                                                             | 10,932     | 1,701 s      | 156 ms         |
| [LinkedIn](https://www.linkedin.com/)                                                     | 14,129     | 1,673 s      | 118 ms         |
| Bold Commerce                                                                             | 8,911      | 1,638 s      | 184 ms         |
| [Segment](https://segment.com/)                                                           | 7,639      | 1,636 s      | 214 ms         |
| [Sizmek](https://www.sizmek.com/)                                                         | 3,667      | 1,632 s      | 445 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 10,265     | 1,628 s      | 159 ms         |
| Fastly                                                                                    | 5,197      | 1,568 s      | 302 ms         |
| [TrustArc](https://www.trustarc.com/)                                                     | 4,016      | 1,554 s      | 387 ms         |
| [LiveChat](https://www.livechatinc.com/)                                                  | 9,948      | 1,539 s      | 155 ms         |
| [Yahoo!](https://www.yahoo.com/)                                                          | 8,142      | 1,442 s      | 177 ms         |
| Azure Web Services                                                                        | 4,339      | 1,434 s      | 330 ms         |
| Vidible                                                                                   | 1,179      | 1,386 s      | 1175 ms        |
| [Albacross](https://albacross.com/)                                                       | 1,717      | 1,319 s      | 768 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                                  | 11,949     | 1,299 s      | 109 ms         |
| FullStory                                                                                 | 5,521      | 1,282 s      | 232 ms         |
| sovrn                                                                                     | 2,509      | 1,251 s      | 499 ms         |
| Clicktripz                                                                                | 2,579      | 1,225 s      | 475 ms         |
| [Pubmatic](https://pubmatic.com/)                                                         | 3,598      | 1,218 s      | 339 ms         |
| iubenda                                                                                   | 10,416     | 1,182 s      | 113 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 9,478      | 1,181 s      | 125 ms         |
| Esri ArcGIS                                                                               | 962        | 1,156 s      | 1202 ms        |
| [Intent Media](https://intent.com/)                                                       | 2,088      | 1,094 s      | 524 ms         |
| LiveTex                                                                                   | 2,116      | 1,092 s      | 516 ms         |
| [Keen](https://keen.io/)                                                                  | 2,457      | 1,091 s      | 444 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 1,062      | 1,042 s      | 981 ms         |
| [ContactAtOnce](https://www.contactatonce.com/)                                           | 2,952      | 1,029 s      | 349 ms         |
| [OneSignal](https://onesignal.com/)                                                       | 12,480     | 1,026 s      | 82 ms          |
| Kakao                                                                                     | 7,609      | 1,000 s      | 131 ms         |
| DTSCOUT                                                                                   | 7,501      | 996 s        | 133 ms         |
| iBillboard                                                                                | 1,574      | 979 s        | 622 ms         |
| Mouseflow                                                                                 | 1,512      | 979 s        | 647 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 10,498     | 904 s        | 86 ms          |
| Microsoft Hosted Libs                                                                     | 4,720      | 899 s        | 190 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 1,969      | 894 s        | 454 ms         |
| AudienceSearch                                                                            | 5,743      | 889 s        | 155 ms         |
| [Shareaholic](https://www.shareaholic.com/)                                               | 6,553      | 886 s        | 135 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 9,330      | 859 s        | 92 ms          |
| [Drift](https://www.drift.com/)                                                           | 4,969      | 814 s        | 164 ms         |
| [Snapchat](https://www.snapchat.com)                                                      | 6,078      | 813 s        | 134 ms         |
| Dynamic Yield                                                                             | 739        | 812 s        | 1099 ms        |
| CallRail                                                                                  | 6,142      | 812 s        | 132 ms         |
| fluct                                                                                     | 5,796      | 805 s        | 139 ms         |
| [Unpkg](https://unpkg.com)                                                                | 3,069      | 790 s        | 257 ms         |
| [BrightTag / Signal](https://www.signal.co)                                               | 5,989      | 776 s        | 130 ms         |
| Admixer for Publishers                                                                    | 1,011      | 773 s        | 764 ms         |
| [VWO](https://vwo.com)                                                                    | 3,388      | 766 s        | 226 ms         |
| LongTail Ad Solutions                                                                     | 2,222      | 738 s        | 332 ms         |
| Chartbeat                                                                                 | 7,239      | 737 s        | 102 ms         |
| Ezoic                                                                                     | 2,622      | 734 s        | 280 ms         |
| Cxense                                                                                    | 3,893      | 726 s        | 187 ms         |
| [Quantcast](https://www.quantcast.com)                                                    | 5,993      | 718 s        | 120 ms         |
| Yieldmo                                                                                   | 728        | 675 s        | 928 ms         |
| Okas Concepts                                                                             | 561        | 675 s        | 1203 ms        |
| Index Exchange                                                                            | 3,231      | 668 s        | 207 ms         |
| WebpageFX                                                                                 | 362        | 658 s        | 1816 ms        |
| [Snowplow](https://snowplowanalytics.com/)                                                | 5,187      | 652 s        | 126 ms         |
| Pure Chat                                                                                 | 3,816      | 642 s        | 168 ms         |
| Between Digital                                                                           | 1,084      | 641 s        | 591 ms         |
| [Popads](https://www.popads.net/)                                                         | 4,685      | 638 s        | 136 ms         |
| Bazaarvoice                                                                               | 1,426      | 636 s        | 446 ms         |
| [Outbrain](https://www.outbrain.com/)                                                     | 4,108      | 623 s        | 152 ms         |
| Feefo.com                                                                                 | 1,345      | 620 s        | 461 ms         |
| [Blogger](http://www.blogger.com/)                                                        | 10,508     | 620 s        | 59 ms          |
| Sekindo                                                                                   | 336        | 598 s        | 1778 ms        |
| SocialShopWave                                                                            | 1,274      | 593 s        | 466 ms         |
| [Instagram](https://www.instagram.com)                                                    | 6,003      | 578 s        | 96 ms          |
| StatCounter                                                                               | 7,821      | 577 s        | 74 ms          |
| Adloox                                                                                    | 2,668      | 575 s        | 216 ms         |
| [Help Scout](https://www.helpscout.net/)                                                  | 1,578      | 570 s        | 361 ms         |
| Smart AdServer                                                                            | 2,779      | 568 s        | 204 ms         |
| Digital ad Consortium                                                                     | 2,947      | 567 s        | 192 ms         |
| Gemius                                                                                    | 7,399      | 547 s        | 74 ms          |
| [LivePerson](https://www.liveperson.com/)                                                 | 3,973      | 538 s        | 135 ms         |
| IBM Digital Analytics                                                                     | 827        | 528 s        | 639 ms         |
| [Polar](https://polar.me/)                                                                | 857        | 528 s        | 616 ms         |
| SessionCam                                                                                | 1,378      | 527 s        | 382 ms         |
| Kaltura Video Platform                                                                    | 504        | 520 s        | 1031 ms        |
| [VK](https://vk.com/)                                                                     | 7,153      | 517 s        | 72 ms          |
| Underdog Media                                                                            | 191        | 513 s        | 2684 ms        |
| [Mixpanel](https://mixpanel.com/)                                                         | 5,947      | 501 s        | 84 ms          |
| Ve                                                                                        | 2,874      | 500 s        | 174 ms         |
| [WordPress Site Stats](https://wp.com/)                                                   | 7,260      | 493 s        | 68 ms          |
| [Rubicon Project](https://rubiconproject.com/)                                            | 4,421      | 491 s        | 111 ms         |
| Medium                                                                                    | 1,223      | 488 s        | 399 ms         |
| Embedly                                                                                   | 2,426      | 483 s        | 199 ms         |
| Seznam                                                                                    | 1,583      | 470 s        | 297 ms         |
| Marchex                                                                                   | 3,901      | 468 s        | 120 ms         |
| Meetrics                                                                                  | 704        | 468 s        | 664 ms         |
| [Adroll](https://www.adroll.com/)                                                         | 3,610      | 458 s        | 127 ms         |
| Secomapp                                                                                  | 1,134      | 450 s        | 397 ms         |
| JuicyAds                                                                                  | 2,035      | 445 s        | 219 ms         |
| [Supership](https://supership.jp/)                                                        | 271        | 440 s        | 1624 ms        |
| [Market GID](https://www.marketgid.com/)                                                  | 944        | 433 s        | 458 ms         |
| Gigya                                                                                     | 2,005      | 427 s        | 213 ms         |
| [Disqus](http://disqus.com/)                                                              | 1,471      | 426 s        | 290 ms         |
| Rocket Fuel                                                                               | 2,235      | 423 s        | 189 ms         |
| Nosto                                                                                     | 1,887      | 415 s        | 220 ms         |
| MailMunch                                                                                 | 5,240      | 415 s        | 79 ms          |
| Sharethrough                                                                              | 2,319      | 414 s        | 179 ms         |
| MaxCDN Enterprise                                                                         | 1,705      | 398 s        | 234 ms         |
| Parse.ly                                                                                  | 2,996      | 393 s        | 131 ms         |
| [Stripe](https://stripe.com)                                                              | 5,425      | 389 s        | 72 ms          |
| LeasdBoxer                                                                                | 106        | 386 s        | 3642 ms        |
| Hola Networks                                                                             | 188        | 382 s        | 2034 ms        |
| Digioh                                                                                    | 749        | 366 s        | 488 ms         |
| ForeSee                                                                                   | 1,395      | 356 s        | 255 ms         |
| Ecwid                                                                                     | 687        | 353 s        | 514 ms         |
| Pagely                                                                                    | 951        | 351 s        | 369 ms         |
| Celtra                                                                                    | 813        | 339 s        | 417 ms         |
| SmartAdServer                                                                             | 2,008      | 337 s        | 168 ms         |
| Clicktale                                                                                 | 949        | 331 s        | 349 ms         |
| Audience 360                                                                              | 382        | 330 s        | 865 ms         |
| PushCrew                                                                                  | 3,311      | 328 s        | 99 ms          |
| [Verizon Digital Media CDN](https://www.verizondigitalmedia.com/)                         | 201        | 319 s        | 1585 ms        |
| PerimeterX Bot Defender                                                                   | 286        | 318 s        | 1112 ms        |
| Affirm                                                                                    | 1,195      | 317 s        | 265 ms         |
| Perfect Market                                                                            | 938        | 313 s        | 333 ms         |
| Bugsnag                                                                                   | 797        | 312 s        | 392 ms         |
| TrackJS                                                                                   | 730        | 307 s        | 421 ms         |
| Evidon                                                                                    | 1,571      | 305 s        | 194 ms         |
| Adyoulike                                                                                 | 1,205      | 300 s        | 249 ms         |
| Sortable                                                                                  | 1,164      | 297 s        | 255 ms         |
| Maxymiser                                                                                 | 911        | 290 s        | 319 ms         |
| Pixlee                                                                                    | 344        | 284 s        | 824 ms         |
| [Yandex CDN](https://yandex.ru/)                                                          | 1,867      | 282 s        | 151 ms         |
| Best Of Media S.A.                                                                        | 220        | 281 s        | 1279 ms        |
| Zmags                                                                                     | 116        | 275 s        | 2369 ms        |
| [Vox Media](https://www.voxmedia.com/)                                                    | 313        | 270 s        | 863 ms         |
| GetSiteControl                                                                            | 2,483      | 270 s        | 109 ms         |
| [RD Station](https://www.rdstation.com/en/)                                               | 3,660      | 270 s        | 74 ms          |
| piano                                                                                     | 794        | 269 s        | 339 ms         |
| Connatix                                                                                  | 203        | 268 s        | 1322 ms        |
| [BounceX](https://www.bouncex.com/)                                                       | 1,009      | 266 s        | 264 ms         |
| iAdvize SAS                                                                               | 1,046      | 266 s        | 254 ms         |
| Yieldify                                                                                  | 471        | 265 s        | 562 ms         |
| [AOL / Oath / Verizon Media](https://www.oath.com/)                                       | 1,490      | 262 s        | 176 ms         |
| Po.st                                                                                     | 1,115      | 261 s        | 234 ms         |
| Microad                                                                                   | 1,379      | 260 s        | 189 ms         |
| Searchanise                                                                               | 2,735      | 256 s        | 94 ms          |
| Fraudlogix                                                                                | 803        | 252 s        | 313 ms         |
| Adthink                                                                                   | 170        | 248 s        | 1460 ms        |
| SpotXchange                                                                               | 439        | 246 s        | 561 ms         |
| One by AOL                                                                                | 516        | 246 s        | 477 ms         |
| UserReport                                                                                | 565        | 246 s        | 435 ms         |
| OpenTable                                                                                 | 1,886      | 245 s        | 130 ms         |
| iPerceptions                                                                              | 2,326      | 242 s        | 104 ms         |
| [Quantum Metric](https://www.quantummetric.com/)                                          | 314        | 239 s        | 762 ms         |
| Swiftype                                                                                  | 1,345      | 239 s        | 178 ms         |
| Ooyala                                                                                    | 335        | 239 s        | 713 ms         |
| Wishpond Technologies                                                                     | 502        | 236 s        | 470 ms         |
| [Media Math](http://www.mediamath.com/)                                                   | 521        | 231 s        | 444 ms         |
| GitHub                                                                                    | 948        | 230 s        | 242 ms         |
| Opta                                                                                      | 325        | 229 s        | 704 ms         |
| Expedia                                                                                   | 112        | 229 s        | 2044 ms        |
| Decibel Insight                                                                           | 550        | 228 s        | 414 ms         |
| PhotoBucket                                                                               | 699        | 227 s        | 324 ms         |
| [New Relic](https://newrelic.com/)                                                        | 2,832      | 227 s        | 80 ms          |
| Media Management Technologies                                                             | 533        | 227 s        | 425 ms         |
| Unbounce                                                                                  | 2,023      | 225 s        | 111 ms         |
| Trust Pilot                                                                               | 2,822      | 225 s        | 80 ms          |
| [Marketo](https://www.marketo.com)                                                        | 1,069      | 224 s        | 209 ms         |
| Trip Advisor                                                                              | 170        | 219 s        | 1289 ms        |
| Comm100                                                                                   | 1,330      | 215 s        | 162 ms         |
| [AppDynamics](https://www.appdynamics.com/)                                               | 1,393      | 214 s        | 154 ms         |
| Roxr Software                                                                             | 2,718      | 207 s        | 76 ms          |
| Signyfyd                                                                                  | 197        | 200 s        | 1018 ms        |
| Booking.com                                                                               | 717        | 200 s        | 279 ms         |
| Opentag                                                                                   | 958        | 199 s        | 208 ms         |
| Adverline Board                                                                           | 542        | 198 s        | 365 ms         |
| Fort Awesome                                                                              | 719        | 197 s        | 274 ms         |
| ResponsiveVoice                                                                           | 750        | 194 s        | 258 ms         |
| ShopiMind                                                                                 | 297        | 192 s        | 646 ms         |
| PubNation                                                                                 | 2,282      | 187 s        | 82 ms          |
| ThreatMetrix                                                                              | 183        | 186 s        | 1016 ms        |
| TagCommander                                                                              | 1,082      | 185 s        | 171 ms         |
| Technorati                                                                                | 355        | 184 s        | 519 ms         |
| Simplicity Marketing                                                                      | 472        | 184 s        | 389 ms         |
| Adocean                                                                                   | 752        | 183 s        | 243 ms         |
| SearchSpring                                                                              | 279        | 179 s        | 640 ms         |
| LoopMe                                                                                    | 482        | 179 s        | 371 ms         |
| BlueKai                                                                                   | 2,608      | 177 s        | 68 ms          |
| IPONWEB                                                                                   | 916        | 176 s        | 192 ms         |
| Sift Science                                                                              | 1,151      | 174 s        | 151 ms         |
| FirstImpression                                                                           | 350        | 173 s        | 495 ms         |
| [mParticle](https://www.mparticle.com/)                                                   | 183        | 173 s        | 947 ms         |
| Heap                                                                                      | 2,145      | 173 s        | 81 ms          |
| Refersion                                                                                 | 1,374      | 168 s        | 122 ms         |
| Siteimprove                                                                               | 1,893      | 166 s        | 88 ms          |
| Rackspace                                                                                 | 540        | 166 s        | 307 ms         |
| Crowd Control                                                                             | 2,034      | 164 s        | 81 ms          |
| MonetizeMore                                                                              | 116        | 164 s        | 1411 ms        |
| Adtech (AOL)                                                                              | 243        | 163 s        | 673 ms         |
| Qubit Deliver                                                                             | 352        | 162 s        | 460 ms         |
| smartclip                                                                                 | 390        | 160 s        | 409 ms         |
| Janrain                                                                                   | 144        | 157 s        | 1092 ms        |
| PERFORM                                                                                   | 84         | 156 s        | 1854 ms        |
| Sparkflow                                                                                 | 448        | 155 s        | 346 ms         |
| [Listrak](https://www.listrak.com/)                                                       | 1,033      | 154 s        | 149 ms         |
| AddShoppers                                                                               | 909        | 154 s        | 169 ms         |
| etracker                                                                                  | 1,557      | 153 s        | 98 ms          |
| Smarter Click                                                                             | 426        | 153 s        | 359 ms         |
| Monetate                                                                                  | 692        | 151 s        | 218 ms         |
| ZEDO                                                                                      | 278        | 146 s        | 526 ms         |
| Pardot                                                                                    | 387        | 141 s        | 363 ms         |
| Rakuten Marketing                                                                         | 1,696      | 141 s        | 83 ms          |
| WisePops                                                                                  | 499        | 140 s        | 280 ms         |
| White Ops                                                                                 | 224        | 138 s        | 614 ms         |
| [24]7                                                                                     | 128        | 137 s        | 1072 ms        |
| Flowplayer                                                                                | 389        | 132 s        | 339 ms         |
| StreamRail                                                                                | 102        | 132 s        | 1293 ms        |
| Clerk.io ApS                                                                              | 734        | 131 s        | 178 ms         |
| OptiMonk                                                                                  | 1,052      | 129 s        | 123 ms         |
| Bronto Software                                                                           | 821        | 129 s        | 157 ms         |
| Skype                                                                                     | 692        | 129 s        | 186 ms         |
| [Freshdesk](https://freshdesk.com/)                                                       | 825        | 128 s        | 156 ms         |
| Moovweb                                                                                   | 72         | 127 s        | 1758 ms        |
| AvantLink                                                                                 | 154        | 126 s        | 818 ms         |
| Constant Contact                                                                          | 1,325      | 124 s        | 94 ms          |
| Convert Insights                                                                          | 884        | 119 s        | 135 ms         |
| eBay                                                                                      | 648        | 118 s        | 182 ms         |
| Snacktools                                                                                | 308        | 117 s        | 380 ms         |
| OwnerIQ                                                                                   | 884        | 117 s        | 132 ms         |
| TrafficStars                                                                              | 939        | 116 s        | 123 ms         |
| Bizible                                                                                   | 874        | 116 s        | 132 ms         |
| PowerReviews                                                                              | 569        | 115 s        | 202 ms         |
| Net Reviews                                                                               | 1,417      | 113 s        | 80 ms          |
| Interpublic Group                                                                         | 454        | 108 s        | 238 ms         |
| Fanplayr                                                                                  | 153        | 108 s        | 706 ms         |
| Accuweather                                                                               | 1,397      | 108 s        | 77 ms          |
| Revcontent                                                                                | 473        | 107 s        | 227 ms         |
| Picreel                                                                                   | 521        | 106 s        | 204 ms         |
| Mather Economics                                                                          | 543        | 106 s        | 195 ms         |
| Tail Target                                                                               | 931        | 106 s        | 114 ms         |
| TubeMogul                                                                                 | 235        | 105 s        | 448 ms         |
| Global-e                                                                                  | 231        | 104 s        | 452 ms         |
| Touch Commerce                                                                            | 75         | 104 s        | 1380 ms        |
| ExoClick                                                                                  | 2,039      | 103 s        | 51 ms          |
| Sidecar                                                                                   | 301        | 103 s        | 342 ms         |
| [RevJet](https://www.revjet.com/)                                                         | 187        | 102 s        | 548 ms         |
| TRUSTe                                                                                    | 841        | 102 s        | 122 ms         |
| Marketplace Web Service                                                                   | 196        | 101 s        | 513 ms         |
| Dailymotion                                                                               | 220        | 100 s        | 453 ms         |
| plista                                                                                    | 569        | 98 s         | 172 ms         |
| Curalate                                                                                  | 307        | 98 s         | 318 ms         |
| Foursixty                                                                                 | 1,128      | 96 s         | 85 ms          |
| Symantec                                                                                  | 832        | 95 s         | 115 ms         |
| Shopgate                                                                                  | 392        | 95 s         | 242 ms         |
| Mobify                                                                                    | 148        | 95 s         | 639 ms         |
| Forensiq                                                                                  | 425        | 94 s         | 222 ms         |
| Geniee                                                                                    | 1,079      | 93 s         | 86 ms          |
| iovation                                                                                  | 953        | 93 s         | 98 ms          |
| Auto Link Maker                                                                           | 482        | 93 s         | 193 ms         |
| Livefyre                                                                                  | 251        | 93 s         | 369 ms         |
| AdSniper                                                                                  | 213        | 92 s         | 431 ms         |
| Cedato                                                                                    | 57         | 92 s         | 1609 ms        |
| issuu                                                                                     | 835        | 91 s         | 110 ms         |
| Adkontekst                                                                                | 240        | 91 s         | 381 ms         |
| Survicate                                                                                 | 522        | 91 s         | 175 ms         |
| Madison Logic                                                                             | 668        | 91 s         | 137 ms         |
| Tencent                                                                                   | 683        | 91 s         | 133 ms         |
| Amplitude Mobile Analytics                                                                | 1,290      | 90 s         | 70 ms          |
| Permutive                                                                                 | 757        | 89 s         | 117 ms         |
| [Alexa](https://www.alexa.com/)                                                           | 1,554      | 88 s         | 57 ms          |
| WebEngage                                                                                 | 492        | 86 s         | 174 ms         |
| Lytics                                                                                    | 498        | 85 s         | 171 ms         |
| Playbuzz                                                                                  | 197        | 85 s         | 433 ms         |
| Tribal Fusion                                                                             | 695        | 85 s         | 123 ms         |
| Kargo                                                                                     | 78         | 84 s         | 1083 ms        |
| Affiliate Window                                                                          | 1,057      | 84 s         | 79 ms          |
| Bootstrap Chinese network                                                                 | 319        | 79 s         | 247 ms         |
| Conversant                                                                                | 96         | 78 s         | 814 ms         |
| GetResponse                                                                               | 761        | 78 s         | 102 ms         |
| Elastic Ad                                                                                | 843        | 77 s         | 92 ms          |
| Branch Metrics                                                                            | 877        | 75 s         | 85 ms          |
| ReTargeter                                                                                | 235        | 75 s         | 319 ms         |
| Time                                                                                      | 230        | 74 s         | 323 ms         |
| Smart Insight Tracking                                                                    | 750        | 74 s         | 99 ms          |
| [The Trade Desk](https://www.thetradedesk.com/)                                           | 321        | 73 s         | 229 ms         |
| FoxyCart                                                                                  | 318        | 72 s         | 226 ms         |
| Forter                                                                                    | 96         | 72 s         | 748 ms         |
| LoyaltyLion                                                                               | 148        | 71 s         | 479 ms         |
| WebSpectator                                                                              | 147        | 71 s         | 481 ms         |
| Adnium                                                                                    | 227        | 70 s         | 310 ms         |
| Tradelab                                                                                  | 713        | 70 s         | 98 ms          |
| Cloudinary                                                                                | 285        | 69 s         | 241 ms         |
| Cross Pixel Media                                                                         | 406        | 69 s         | 169 ms         |
| Typepad                                                                                   | 286        | 69 s         | 240 ms         |
| Republer                                                                                  | 394        | 69 s         | 174 ms         |
| The Hut Group                                                                             | 228        | 69 s         | 301 ms         |
| [Usabilla](https://usabilla.com)                                                          | 767        | 68 s         | 89 ms          |
| Profitshare                                                                               | 270        | 68 s         | 252 ms         |
| SnapEngage                                                                                | 958        | 68 s         | 71 ms          |
| Nativo                                                                                    | 620        | 68 s         | 109 ms         |
| Yottaa                                                                                    | 164        | 68 s         | 413 ms         |
| rewardStyle.com                                                                           | 514        | 67 s         | 131 ms         |
| Kameleoon                                                                                 | 156        | 66 s         | 426 ms         |
| WalkMe                                                                                    | 114        | 66 s         | 579 ms         |
| Trusted Shops                                                                             | 1,392      | 65 s         | 47 ms          |
| PlayAd Media Group                                                                        | 76         | 65 s         | 850 ms         |
| Stackla PTY                                                                               | 315        | 63 s         | 201 ms         |
| Google Plus                                                                               | 535        | 63 s         | 118 ms         |
| Reevoo                                                                                    | 233        | 63 s         | 271 ms         |
| JustPremium Ads                                                                           | 309        | 63 s         | 203 ms         |
| Effective Measure                                                                         | 609        | 63 s         | 103 ms         |
| Github                                                                                    | 396        | 62 s         | 158 ms         |
| Gleam                                                                                     | 378        | 61 s         | 162 ms         |
| InSkin Media                                                                              | 76         | 61 s         | 798 ms         |
| LinkedIn Ads                                                                              | 657        | 60 s         | 91 ms          |
| [Optanon](https://www.cookielaw.org/)                                                     | 709        | 59 s         | 84 ms          |
| Evergage                                                                                  | 236        | 59 s         | 250 ms         |
| ClickDesk                                                                                 | 657        | 57 s         | 87 ms          |
| AddEvent                                                                                  | 383        | 57 s         | 149 ms         |
| Better Business Bureau                                                                    | 38         | 56 s         | 1481 ms        |
| RebelMouse                                                                                | 49         | 56 s         | 1145 ms        |
| Autopilot                                                                                 | 607        | 55 s         | 91 ms          |
| ShopRunner                                                                                | 88         | 55 s         | 624 ms         |
| Kaizen Platform                                                                           | 245        | 55 s         | 224 ms         |
| Kampyle                                                                                   | 464        | 55 s         | 118 ms         |
| BoldChat                                                                                  | 450        | 53 s         | 117 ms         |
| Keywee                                                                                    | 259        | 52 s         | 200 ms         |
| KISSmetrics                                                                               | 638        | 50 s         | 78 ms          |
| TruConversion                                                                             | 261        | 50 s         | 190 ms         |
| Navegg                                                                                    | 617        | 49 s         | 79 ms          |
| The ADEX                                                                                  | 578        | 48 s         | 83 ms          |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                            | 760        | 47 s         | 62 ms          |
| News                                                                                      | 150        | 47 s         | 314 ms         |
| Qualaroo                                                                                  | 552        | 47 s         | 85 ms          |
| Adscale                                                                                   | 391        | 46 s         | 118 ms         |
| BlueCava                                                                                  | 83         | 46 s         | 552 ms         |
| Omniconvert                                                                               | 437        | 46 s         | 105 ms         |
| Sajari Pty                                                                                | 200        | 46 s         | 228 ms         |
| Riskified                                                                                 | 602        | 46 s         | 76 ms          |
| CleverDATA                                                                                | 634        | 46 s         | 72 ms          |
| unpkg                                                                                     | 263        | 45 s         | 173 ms         |
| [DMD Marketing](https://www.dmdconnects.com/)                                             | 255        | 44 s         | 172 ms         |
| Onet                                                                                      | 99         | 43 s         | 431 ms         |
| Highcharts                                                                                | 317        | 43 s         | 135 ms         |
| Weborama                                                                                  | 459        | 42 s         | 92 ms          |
| Fresh Relevance                                                                           | 407        | 42 s         | 104 ms         |
| [ReadSpeaker](https://www.readspeaker.com)                                                | 471        | 42 s         | 89 ms          |
| SkyScanner                                                                                | 109        | 41 s         | 375 ms         |
| Socialphotos                                                                              | 216        | 41 s         | 189 ms         |
| Key CDN                                                                                   | 213        | 40 s         | 187 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 168        | 40 s         | 235 ms         |
| [Radar](https://www.cedexis.com/radar/)                                                   | 503        | 39 s         | 78 ms          |
| Appier                                                                                    | 384        | 39 s         | 102 ms         |
| SpringServer                                                                              | 58         | 39 s         | 667 ms         |
| LightWidget                                                                               | 485        | 38 s         | 79 ms          |
| Zanox                                                                                     | 319        | 38 s         | 119 ms         |
| Conversant Tag Manager                                                                    | 179        | 37 s         | 207 ms         |
| [Adition](https://www.adition.com)                                                        | 305        | 37 s         | 121 ms         |
| Reflektion                                                                                | 117        | 37 s         | 314 ms         |
| ResponseTap                                                                               | 344        | 36 s         | 104 ms         |
| Nend                                                                                      | 882        | 36 s         | 40 ms          |
| DialogTech                                                                                | 318        | 35 s         | 110 ms         |
| [Concert](https://concert.io/)                                                            | 283        | 35 s         | 123 ms         |
| SaleCycle                                                                                 | 426        | 34 s         | 80 ms          |
| Intercept Interactive                                                                     | 194        | 34 s         | 176 ms         |
| CPEx                                                                                      | 219        | 34 s         | 156 ms         |
| reEmbed                                                                                   | 150        | 34 s         | 226 ms         |
| Silverpop                                                                                 | 423        | 34 s         | 79 ms          |
| Optimove                                                                                  | 81         | 33 s         | 414 ms         |
| Steelhouse                                                                                | 329        | 33 s         | 102 ms         |
| Sooqr Search                                                                              | 415        | 33 s         | 79 ms          |
| Petametrics                                                                               | 188        | 33 s         | 173 ms         |
| User Replay                                                                               | 71         | 32 s         | 452 ms         |
| [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)                       | 463        | 30 s         | 65 ms          |
| DemandBase                                                                                | 348        | 30 s         | 87 ms          |
| Advance Magazine Group                                                                    | 156        | 30 s         | 193 ms         |
| Ghostery Enterprise                                                                       | 207        | 30 s         | 145 ms         |
| SnapWidget                                                                                | 652        | 30 s         | 46 ms          |
| bRealTime                                                                                 | 149        | 29 s         | 197 ms         |
| LiveHelpNow                                                                               | 282        | 29 s         | 102 ms         |
| [Moxie](https://www.gomoxie.com/)                                                         | 96         | 29 s         | 299 ms         |
| Viacom                                                                                    | 123        | 29 s         | 233 ms         |
| VoiceFive                                                                                 | 201        | 28 s         | 142 ms         |
| CNET Content Solutions                                                                    | 66         | 28 s         | 431 ms         |
| Adobe Test & Target                                                                       | 62         | 28 s         | 455 ms         |
| [InAuth](https://www.inauth.com/)                                                         | 82         | 28 s         | 343 ms         |
| [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)                    | 144        | 28 s         | 194 ms         |
| Knight Lab                                                                                | 68         | 28 s         | 409 ms         |
| MLveda                                                                                    | 78         | 28 s         | 354 ms         |
| SublimeSkinz                                                                              | 411        | 27 s         | 67 ms          |
| [Ipify](https://www.ipify.org)                                                            | 241        | 27 s         | 113 ms         |
| Aggregate Knowledge                                                                       | 339        | 27 s         | 80 ms          |
| Snack Media                                                                               | 85         | 27 s         | 318 ms         |
| linkpulse                                                                                 | 358        | 27 s         | 75 ms          |
| Ambassador                                                                                | 171        | 27 s         | 156 ms         |
| TripleLift                                                                                | 116        | 26 s         | 224 ms         |
| Postcode Anywhere (Holdings)                                                              | 132        | 26 s         | 194 ms         |
| Unruly Media                                                                              | 165        | 26 s         | 155 ms         |
| Vee24                                                                                     | 91         | 26 s         | 281 ms         |
| Zarget                                                                                    | 201        | 25 s         | 126 ms         |
| Feedbackify                                                                               | 292        | 25 s         | 86 ms          |
| Civic                                                                                     | 283        | 25 s         | 87 ms          |
| [Pusher](https://pusher.com/)                                                             | 113        | 25 s         | 218 ms         |
| Wow Analytics                                                                             | 122        | 25 s         | 201 ms         |
| NetAffiliation                                                                            | 215        | 25 s         | 114 ms         |
| FLXone                                                                                    | 145        | 24 s         | 166 ms         |
| [GoDaddy](https://www.godaddy.com/)                                                       | 106        | 24 s         | 224 ms         |
| Transifex                                                                                 | 114        | 23 s         | 205 ms         |
| Dynamic Converter                                                                         | 71         | 23 s         | 325 ms         |
| Hupso Website Analyzer                                                                    | 299        | 23 s         | 76 ms          |
| BannerFlow                                                                                | 197        | 23 s         | 115 ms         |
| Alliance for Audited Media                                                                | 89         | 22 s         | 252 ms         |
| [Attentive](https://attentivemobile.com/)                                                 | 203        | 21 s         | 105 ms         |
| Accordant Media                                                                           | 241        | 21 s         | 88 ms          |
| Cookie-Script.com                                                                         | 195        | 21 s         | 107 ms         |
| Proper Media                                                                              | 97         | 21 s         | 213 ms         |
| Infinity Tracking                                                                         | 221        | 21 s         | 93 ms          |
| Neodata                                                                                   | 236        | 20 s         | 86 ms          |
| FreakOut                                                                                  | 319        | 20 s         | 63 ms          |
| Salesforce.com                                                                            | 285        | 20 s         | 71 ms          |
| Resonance Insights                                                                        | 107        | 20 s         | 188 ms         |
| VidPulse                                                                                  | 68         | 20 s         | 291 ms         |
| eXelate                                                                                   | 249        | 20 s         | 80 ms          |
| TechTarget                                                                                | 59         | 20 s         | 336 ms         |
| Customer.io                                                                               | 190        | 20 s         | 103 ms         |
| Edge Web Fonts                                                                            | 254        | 19 s         | 76 ms          |
| [Vimeo](http://vimeo.com/)                                                                | 162        | 19 s         | 118 ms         |
| MaxMind                                                                                   | 134        | 19 s         | 143 ms         |
| [Twitch](https://twitch.tv/)                                                              | 32         | 19 s         | 596 ms         |
| [Widespace](https://www.widespace.com)                                                    | 151        | 19 s         | 125 ms         |
| FuelX                                                                                     | 89         | 19 s         | 208 ms         |
| Sirv                                                                                      | 179        | 18 s         | 102 ms         |
| [GoSquared](https://www.gosquared.com)                                                    | 228        | 18 s         | 80 ms          |
| Impact Radius                                                                             | 208        | 18 s         | 87 ms          |
| Revolver Maps                                                                             | 184        | 18 s         | 98 ms          |
| Sweet Tooth                                                                               | 192        | 18 s         | 92 ms          |
| [emetriq](https://www.emetriq.com/)                                                       | 216        | 18 s         | 81 ms          |
| [Vidyard](https://www.vidyard.com/)                                                       | 123        | 18 s         | 143 ms         |
| Borderfree                                                                                | 60         | 17 s         | 291 ms         |
| cloudIQ                                                                                   | 132        | 17 s         | 130 ms         |
| Exponea                                                                                   | 199        | 17 s         | 86 ms          |
| The Publisher Desk                                                                        | 61         | 17 s         | 279 ms         |
| Bookatable                                                                                | 122        | 16 s         | 133 ms         |
| Polldaddy                                                                                 | 146        | 16 s         | 110 ms         |
| Woopra                                                                                    | 230        | 16 s         | 70 ms          |
| AdRiver                                                                                   | 154        | 16 s         | 103 ms         |
| Vergic AB                                                                                 | 64         | 16 s         | 248 ms         |
| PebblePost                                                                                | 64         | 16 s         | 247 ms         |
| Sourcepoint                                                                               | 76         | 16 s         | 205 ms         |
| Apester                                                                                   | 185        | 15 s         | 82 ms          |
| Vibrant Media                                                                             | 129        | 15 s         | 116 ms         |
| Talkable                                                                                  | 188        | 15 s         | 80 ms          |
| Vergic Engage Platform                                                                    | 61         | 15 s         | 243 ms         |
| Eyeota                                                                                    | 203        | 15 s         | 72 ms          |
| Rakuten LinkShare                                                                         | 99         | 15 s         | 147 ms         |
| Delta Projects AB                                                                         | 217        | 14 s         | 66 ms          |
| Vertical Mass                                                                             | 74         | 14 s         | 192 ms         |
| Simpli.fi                                                                                 | 211        | 14 s         | 67 ms          |
| Exactag                                                                                   | 137        | 14 s         | 103 ms         |
| SlimCut Media Outstream                                                                   | 136        | 14 s         | 103 ms         |
| Fonecall                                                                                  | 68         | 14 s         | 201 ms         |
| StumbleUpon                                                                               | 88         | 14 s         | 154 ms         |
| CleverTap                                                                                 | 152        | 13 s         | 88 ms          |
| Captify Media                                                                             | 111        | 13 s         | 120 ms         |
| Video Media Groep                                                                         | 86         | 13 s         | 153 ms         |
| Adobe Marketing Cloud                                                                     | 150        | 13 s         | 88 ms          |
| AnswerDash                                                                                | 86         | 13 s         | 150 ms         |
| ConvertMedia                                                                              | 132        | 13 s         | 97 ms          |
| AWeber                                                                                    | 178        | 13 s         | 72 ms          |
| Exponential Interactive                                                                   | 251        | 13 s         | 51 ms          |
| Council ad Network                                                                        | 84         | 13 s         | 150 ms         |
| DialogTech SourceTrak                                                                     | 179        | 12 s         | 68 ms          |
| AdvertServe                                                                               | 94         | 12 s         | 129 ms         |
| Friendbuy                                                                                 | 130        | 12 s         | 93 ms          |
| SecuredVisit                                                                              | 161        | 12 s         | 75 ms          |
| Pixalate                                                                                  | 28         | 12 s         | 430 ms         |
| Drip                                                                                      | 222        | 12 s         | 54 ms          |
| Freespee                                                                                  | 126        | 12 s         | 95 ms          |
| Hull.js                                                                                   | 92         | 12 s         | 129 ms         |
| LoginRadius                                                                               | 75         | 12 s         | 158 ms         |
| Opinion Stage                                                                             | 141        | 12 s         | 83 ms          |
| Extole                                                                                    | 79         | 12 s         | 146 ms         |
| Storygize                                                                                 | 74         | 11 s         | 151 ms         |
| Vindico                                                                                   | 91         | 11 s         | 123 ms         |
| AliveChat                                                                                 | 170        | 11 s         | 66 ms          |
| Twitter Online Conversion Tracking                                                        | 163        | 11 s         | 68 ms          |
| AdTrue                                                                                    | 104        | 11 s         | 105 ms         |
| [Byside](http://www.byside.com)                                                           | 66         | 11 s         | 165 ms         |
| Betgenius                                                                                 | 112        | 11 s         | 96 ms          |
| CyberSource (Visa)                                                                        | 163        | 11 s         | 66 ms          |
| Webtrends                                                                                 | 37         | 11 s         | 288 ms         |
| Klevu Search                                                                              | 132        | 10 s         | 77 ms          |
| Pictela (AOL)                                                                             | 32         | 10 s         | 311 ms         |
| Tag Inspector                                                                             | 104        | 10 s         | 94 ms          |
| Covert Pics                                                                               | 141        | 10 s         | 69 ms          |
| [Acceptable Ads](https://acceptableads.com/)                                              | 61         | 10 s         | 156 ms         |
| Triblio                                                                                   | 83         | 9 s          | 113 ms         |
| CANDDi                                                                                    | 69         | 9 s          | 135 ms         |
| HotelsCombined                                                                            | 62         | 9 s          | 149 ms         |
| epoq internet services                                                                    | 84         | 9 s          | 107 ms         |
| Reactful                                                                                  | 74         | 9 s          | 120 ms         |
| Mopinion                                                                                  | 76         | 9 s          | 116 ms         |
| Barilliance                                                                               | 74         | 9 s          | 119 ms         |
| Braintree Payments                                                                        | 73         | 9 s          | 120 ms         |
| Ad6Media                                                                                  | 40         | 9 s          | 218 ms         |
| AIR.TV                                                                                    | 125        | 9 s          | 69 ms          |
| Attribution                                                                               | 100        | 9 s          | 86 ms          |
| AdSpruce                                                                                  | 34         | 8 s          | 248 ms         |
| BuySellAds                                                                                | 78         | 8 s          | 108 ms         |
| UpSellit                                                                                  | 71         | 8 s          | 116 ms         |
| C3 Metrics                                                                                | 59         | 8 s          | 139 ms         |
| Pagefair                                                                                  | 124        | 8 s          | 66 ms          |
| Sailthru                                                                                  | 132        | 8 s          | 61 ms          |
| NaviStone                                                                                 | 75         | 8 s          | 107 ms         |
| Polyfill service                                                                          | 53         | 8 s          | 150 ms         |
| Adobe Scene7                                                                              | 105        | 8 s          | 74 ms          |
| Flickr                                                                                    | 127        | 8 s          | 61 ms          |
| Oracle Recommendations On Demand                                                          | 98         | 8 s          | 77 ms          |
| Swoop                                                                                     | 101        | 7 s          | 74 ms          |
| Research Online                                                                           | 80         | 7 s          | 92 ms          |
| Ziff Davis Tech                                                                           | 98         | 7 s          | 75 ms          |
| Sonobi                                                                                    | 43         | 7 s          | 166 ms         |
| RichRelevance                                                                             | 55         | 7 s          | 129 ms         |
| Improve Digital                                                                           | 57         | 7 s          | 122 ms         |
| [TurnTo](https://www.turntonetworks.com/)                                                 | 62         | 7 s          | 112 ms         |
| UPS i-parcel                                                                              | 49         | 7 s          | 141 ms         |
| content.ad                                                                                | 52         | 7 s          | 130 ms         |
| Cookie Reports                                                                            | 81         | 7 s          | 81 ms          |
| Adunity                                                                                   | 55         | 7 s          | 118 ms         |
| Boomtrain                                                                                 | 87         | 6 s          | 74 ms          |
| Nanorep                                                                                   | 49         | 6 s          | 131 ms         |
| YoYo                                                                                      | 83         | 6 s          | 75 ms          |
| Conversio                                                                                 | 84         | 6 s          | 74 ms          |
| Browser-Update.org                                                                        | 79         | 6 s          | 78 ms          |
| Sociomantic Labs                                                                          | 93         | 6 s          | 66 ms          |
| OnScroll                                                                                  | 64         | 6 s          | 96 ms          |
| Flockler                                                                                  | 62         | 6 s          | 97 ms          |
| Qualtrics                                                                                 | 47         | 6 s          | 127 ms         |
| eGain                                                                                     | 75         | 6 s          | 79 ms          |
| [Netlify](https://www.netlify.com/)                                                       | 76         | 6 s          | 78 ms          |
| Realytics                                                                                 | 74         | 6 s          | 79 ms          |
| Site24x7 Real User Monitoring                                                             | 77         | 6 s          | 75 ms          |
| Ekm Systems                                                                               | 90         | 6 s          | 64 ms          |
| [Fastly Insights](https://insights.fastlylabs.com)                                        | 96         | 6 s          | 59 ms          |
| Fastest Forward                                                                           | 73         | 6 s          | 77 ms          |
| AdCurve                                                                                   | 73         | 5 s          | 73 ms          |
| StackAdapt                                                                                | 70         | 5 s          | 75 ms          |
| MathJax                                                                                   | 46         | 5 s          | 107 ms         |
| Soundest                                                                                  | 61         | 5 s          | 81 ms          |
| Raygun                                                                                    | 66         | 5 s          | 73 ms          |
| ShopStorm                                                                                 | 61         | 5 s          | 76 ms          |
| Bluecore                                                                                  | 52         | 5 s          | 87 ms          |
| DistroScale                                                                               | 55         | 4 s          | 80 ms          |
| PrintFriendly                                                                             | 76         | 4 s          | 56 ms          |
| [Xaxis](https://www.xaxis.com/)                                                           | 57         | 4 s          | 74 ms          |
| [Catchpoint](https://www.catchpoint.com/)                                                 | 61         | 4 s          | 67 ms          |
| Cachefly                                                                                  | 16         | 4 s          | 256 ms         |
| Click4Assistance                                                                          | 48         | 4 s          | 79 ms          |
| MailPlus                                                                                  | 70         | 4 s          | 54 ms          |
| ARM                                                                                       | 31         | 4 s          | 119 ms         |
| ContextWeb                                                                                | 28         | 4 s          | 126 ms         |
| StackExchange                                                                             | 40         | 3 s          | 82 ms          |
| SurveyMonkey                                                                              | 70         | 3 s          | 44 ms          |
| fifty-five                                                                                | 29         | 3 s          | 101 ms         |
| JustUno                                                                                   | 94         | 2 s          | 23 ms          |
| Intent IQ                                                                                 | 20         | 2 s          | 109 ms         |
| GetIntent RTBSuite                                                                        | 10         | 1 s          | 103 ms         |
| Webtrekk                                                                                  | 9          | 1 s          | 110 ms         |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                               | 2          | 0 s          | 57 ms          |

## Future Work

1.  Introduce URL-level data for more fine-grained analysis, i.e. which libraries from Cloudflare/Google CDNs are most expensive.
1.  Expand the scope, i.e. include more third parties and have greater entity/category coverage.

## FAQs

### I don't see entity X in the list. What's up with that?

This can be for one of several reasons:

1.  The entity does not have references to their origin on at least 50 pages in the dataset.
1.  The entity's origins have not yet been identified. See [How can I contribute?](#contribute)

### What is "Total Occurences"?

Total Occurrences is the number of pages on which the entity is included.

### How is the "Average Impact" determined?

The HTTP Archive dataset includes Lighthouse reports for each URL on mobile. Lighthouse has an audit called "bootup-time" that summarizes the amount of time that each script spent on the main thread. The "Average Impact" for an entity is the total execution time of scripts whose domain matches one of the entity's domains divided by the total number of pages that included the entity.

```
Average Impact = Total Execution Time / Total Occurrences
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
        "*.facebook.com",
        "*.fbcdn.net"
    ],
    "examples": [
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

The queries used to compute the data are in the `sql/` directory.

1.  Edit `bootup-time-scripting.partial.sql` to query the correct month's HTTPArchive run.
2.  Run `origin-query.generated.sql` in BigQuery.
3.  Download the results and check them in at `data/YYYY-MM-DD-origin-scripting.json`.
4.  Run `yarn build` to regenerate the latest canonical domain mapping.
5.  Create a new table in `lighthouse-infrastructure.third_party_web` BigQuery table of the format `YYYY_MM_DD` with the csv in `dist/domain-map.csv` with three columns `domain`, `canonicalDomain`, and `category`.
6.  Edit `bootup-time-scripting.partial.sql` to join on the table you just created.
7.  Run `yarn build` to regenerate the queries.
8.  Run `entity-per-page.generated.sql` in BigQuery.
9.  Download the results and check them in at `data/YYYY-MM-DD-entity-scripting.json`.

### Updating this README

This README is auto-generated from the templates `lib/` and the computed data. In order to update the charts, you'll need to make sure you have `cairo` installed locally in addition to `yarn install`.

```bash
# Install `cairo` and dependencies for node-canvas
brew install pkg-config cairo pango libpng jpeg giflib
# Build the requirements in this repo
yarn build
# Regenerate the README
yarn start
```

### Updating the website

The web code is located in `www/` directory of this repository. Open a PR to make changes.
