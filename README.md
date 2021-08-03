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
        1.  [Consent Management Provider](#consent-provider)
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

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | GumGum                                                              | 2,984   | 22 ms          |
| 2    | ExoClick                                                            | 1,213   | 43 ms          |
| 3    | SublimeSkinz                                                        | 1,121   | 58 ms          |
| 4    | MailMunch                                                           | 5,107   | 60 ms          |
| 5    | Geniee                                                              | 1,164   | 68 ms          |
| 6    | District M                                                          | 3,096   | 69 ms          |
| 7    | Salesforce.com                                                      | 1,020   | 70 ms          |
| 8    | Rakuten Marketing                                                   | 1,210   | 73 ms          |
| 9    | BlueKai                                                             | 2,331   | 75 ms          |
| 10   | PushCrew                                                            | 2,927   | 76 ms          |
| 11   | FreakOut                                                            | 3,828   | 76 ms          |
| 12   | [AppNexus](https://www.appnexus.com/)                               | 1,849   | 78 ms          |
| 13   | Constant Contact                                                    | 1,315   | 80 ms          |
| 14   | [Scorecard Research](https://www.scorecardresearch.com/)            | 7,851   | 83 ms          |
| 15   | Gemius                                                              | 4,559   | 87 ms          |
| 16   | Tynt                                                                | 23,214  | 88 ms          |
| 17   | [Rubicon Project](https://rubiconproject.com/)                      | 40,208  | 90 ms          |
| 18   | Nativo                                                              | 1,174   | 101 ms         |
| 19   | [Popads](https://www.popads.net/)                                   | 2,898   | 103 ms         |
| 20   | Unbounce                                                            | 3,591   | 105 ms         |
| 21   | [Amazon Ads](https://ad.amazon.com/)                                | 26,048  | 106 ms         |
| 22   | [Outbrain](https://www.outbrain.com/)                               | 8,216   | 107 ms         |
| 23   | i-mobile                                                            | 3,228   | 110 ms         |
| 24   | LINE Corporation                                                    | 5,184   | 113 ms         |
| 25   | Sharethrough                                                        | 1,670   | 114 ms         |
| 26   | [Adroll](https://www.adroll.com/)                                   | 24,347  | 115 ms         |
| 27   | [Intent Media](https://intent.com/)                                 | 8,019   | 116 ms         |
| 28   | [Bing Ads](https://bingads.microsoft.com)                           | 15,836  | 117 ms         |
| 29   | Index Exchange                                                      | 5,527   | 122 ms         |
| 30   | JuicyAds                                                            | 1,498   | 125 ms         |
| 31   | DTSCOUT                                                             | 12,711  | 132 ms         |
| 32   | [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/) | 4,367   | 137 ms         |
| 33   | [Attentive](https://attentivemobile.com/)                           | 1,206   | 146 ms         |
| 34   | [WordAds](https://wordads.co/)                                      | 18,479  | 149 ms         |
| 35   | [OpenX](https://www.openx.com/)                                     | 3,701   | 160 ms         |
| 36   | Smart AdServer                                                      | 4,272   | 162 ms         |
| 37   | Skimbit                                                             | 15,827  | 167 ms         |
| 38   | OptiMonk                                                            | 1,602   | 173 ms         |
| 39   | Teads                                                               | 3,464   | 177 ms         |
| 40   | Cxense                                                              | 4,375   | 179 ms         |
| 41   | TrafficStars                                                        | 2,040   | 187 ms         |
| 42   | Adform                                                              | 6,868   | 187 ms         |
| 43   | sovrn                                                               | 4,758   | 190 ms         |
| 44   | Tribal Fusion                                                       | 1,064   | 190 ms         |
| 45   | Unruly Media                                                        | 1,193   | 193 ms         |
| 46   | Bizible                                                             | 1,300   | 194 ms         |
| 47   | Perfect Market                                                      | 1,597   | 218 ms         |
| 48   | GetResponse                                                         | 1,073   | 219 ms         |
| 49   | Sortable                                                            | 1,551   | 220 ms         |
| 50   | [Yahoo!](https://www.yahoo.com/)                                    | 2,071   | 230 ms         |
| 51   | [Criteo](https://www.criteo.com/)                                   | 62,765  | 235 ms         |
| 52   | Adyoulike                                                           | 1,235   | 242 ms         |
| 53   | Permutive                                                           | 9,558   | 243 ms         |
| 54   | Refersion                                                           | 1,323   | 249 ms         |
| 55   | VigLink                                                             | 7,100   | 309 ms         |
| 56   | Privy                                                               | 13,047  | 309 ms         |
| 57   | [Yandex Ads](https://yandex.com/adv/)                               | 25,906  | 313 ms         |
| 58   | [Pubmatic](https://pubmatic.com/)                                   | 52,655  | 319 ms         |
| 59   | [Media.net](https://www.media.net/)                                 | 14,562  | 342 ms         |
| 60   | [Taboola](https://www.taboola.com/)                                 | 24,645  | 364 ms         |
| 61   | LongTail Ad Solutions                                               | 3,444   | 365 ms         |
| 62   | Klaviyo                                                             | 14,595  | 392 ms         |
| 63   | piano                                                               | 1,183   | 459 ms         |
| 64   | [DoubleVerify](https://www.doubleverify.com/)                       | 1,776   | 552 ms         |
| 65   | [RevJet](https://www.revjet.com/)                                   | 1,211   | 553 ms         |
| 66   | [MGID](https://www.mgid.com/)                                       | 8,214   | 575 ms         |
| 67   | Infolinks                                                           | 3,699   | 583 ms         |
| 68   | [33 Across](https://33across.com/)                                  | 1,197   | 611 ms         |
| 69   | Vidible                                                             | 1,148   | 624 ms         |
| 70   | Admixer for Publishers                                              | 1,043   | 642 ms         |
| 71   | [Mediavine](https://www.mediavine.com/)                             | 6,490   | 655 ms         |
| 72   | [Bridgewell DSP](https://www.bridgewell.com/)                       | 14,079  | 791 ms         |
| 73   | [Moat](https://moat.com/)                                           | 6,917   | 811 ms         |
| 74   | LoyaltyLion                                                         | 1,301   | 830 ms         |
| 75   | Adloox                                                              | 5,759   | 921 ms         |
| 76   | [Integral Ad Science](https://integralads.com/uk/)                  | 8,328   | 994 ms         |
| 77   | [Sizmek](https://www.sizmek.com/)                                   | 1,487   | 1046 ms        |
| 78   | LKQD                                                                | 1,337   | 1448 ms        |
| 79   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)      | 680,998 | 1457 ms        |
| 80   | [fam](http://admin.fam-ad.com/report/)                              | 2,135   | 1807 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | StatCounter                                                                  | 3,414     | 59 ms          |
| 2    | Treasure Data                                                                | 4,857     | 62 ms          |
| 3    | [WordPress Site Stats](https://wp.com/)                                      | 3,746     | 64 ms          |
| 4    | Roxr Software                                                                | 1,631     | 66 ms          |
| 5    | Amplitude Mobile Analytics                                                   | 2,430     | 69 ms          |
| 6    | Heap                                                                         | 2,609     | 72 ms          |
| 7    | [Mixpanel](https://mixpanel.com/)                                            | 7,528     | 75 ms          |
| 8    | [Google Analytics](https://www.google.com/analytics/analytics/)              | 1,202,015 | 77 ms          |
| 9    | [Quantcast](https://www.quantcast.com)                                       | 4,253     | 78 ms          |
| 10   | Chartbeat                                                                    | 4,685     | 79 ms          |
| 11   | [Hotjar](https://www.hotjar.com/)                                            | 177,526   | 84 ms          |
| 12   | Parse.ly                                                                     | 3,361     | 90 ms          |
| 13   | Searchanise                                                                  | 4,304     | 91 ms          |
| 14   | Smart Insight Tracking                                                       | 1,162     | 93 ms          |
| 15   | etracker                                                                     | 1,643     | 94 ms          |
| 16   | [Snowplow](https://snowplowanalytics.com/)                                   | 5,845     | 95 ms          |
| 17   | CallRail                                                                     | 7,019     | 101 ms         |
| 18   | Marchex                                                                      | 2,512     | 104 ms         |
| 19   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 11,880    | 104 ms         |
| 20   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 10,740    | 106 ms         |
| 21   | [Crazy Egg](https://www.crazyegg.com/)                                       | 4,994     | 110 ms         |
| 22   | Evidon                                                                       | 1,067     | 111 ms         |
| 23   | ContentSquare                                                                | 1,368     | 134 ms         |
| 24   | [VWO](https://vwo.com)                                                       | 4,728     | 158 ms         |
| 25   | Trust Pilot                                                                  | 15,202    | 164 ms         |
| 26   | Net Reviews                                                                  | 2,537     | 176 ms         |
| 27   | [PageSense](https://www.zoho.com/pagesense/)                                 | 1,294     | 180 ms         |
| 28   | FullStory                                                                    | 7,655     | 184 ms         |
| 29   | [Segment](https://segment.com/)                                              | 9,541     | 191 ms         |
| 30   | Kampyle                                                                      | 1,095     | 206 ms         |
| 31   | [Optimizely](https://www.optimizely.com/)                                    | 19,584    | 224 ms         |
| 32   | Nosto                                                                        | 1,947     | 225 ms         |
| 33   | UserReport                                                                   | 1,309     | 229 ms         |
| 34   | [BounceX](https://www.bouncex.com/)                                          | 1,387     | 235 ms         |
| 35   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 13,190    | 246 ms         |
| 36   | PowerReviews                                                                 | 1,043     | 261 ms         |
| 37   | [Marketo](https://www.marketo.com)                                           | 1,389     | 357 ms         |
| 38   | [Histats](http://histats.com/)                                               | 13,545    | 361 ms         |
| 39   | Inspectlet                                                                   | 5,605     | 361 ms         |
| 40   | Bazaarvoice                                                                  | 1,845     | 397 ms         |
| 41   | [Snapchat](https://www.snapchat.com)                                         | 13,345    | 410 ms         |
| 42   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 10,894    | 479 ms         |
| 43   | [Lucky Orange](https://www.luckyorange.com/)                                 | 7,531     | 491 ms         |
| 44   | Feefo.com                                                                    | 1,686     | 502 ms         |
| 45   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 292,542   | 580 ms         |
| 46   | Gigya                                                                        | 2,262     | 580 ms         |
| 47   | Ezoic                                                                        | 1,331     | 581 ms         |
| 48   | Revolver Maps                                                                | 1,146     | 608 ms         |
| 49   | AB Tasty                                                                     | 3,010     | 1594 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                    | Usage     | Average Impact |
| ---- | --------------------------------------- | --------- | -------------- |
| 1    | [AddToAny](https://www.addtoany.com/)   | 24,501    | 87 ms          |
| 2    | [Pinterest](https://pinterest.com/)     | 17,278    | 89 ms          |
| 3    | [TikTok](https://www.tiktok.com/en/)    | 2,380     | 90 ms          |
| 4    | [LinkedIn](https://www.linkedin.com/)   | 14,057    | 111 ms         |
| 5    | [VK](https://vk.com/)                   | 13,492    | 122 ms         |
| 6    | [Twitter](https://twitter.com)          | 214,251   | 139 ms         |
| 7    | Kakao                                   | 18,109    | 158 ms         |
| 8    | [Instagram](https://www.instagram.com)  | 9,444     | 184 ms         |
| 9    | [Facebook](https://www.facebook.com)    | 1,461,908 | 229 ms         |
| 10   | [ShareThis](https://www.sharethis.com/) | 40,215    | 234 ms         |
| 11   | SocialShopWave                          | 2,044     | 302 ms         |
| 12   | [AddThis](http://www.addthis.com/)      | 118,289   | 404 ms         |
| 13   | [Disqus](http://disqus.com/)            | 1,252     | 995 ms         |
| 14   | LiveJournal                             | 3,680     | 1327 ms        |
| 15   | [PIXNET](https://www.pixnet.net/)       | 15,434    | 1508 ms        |
| 16   | [Tumblr](https://tumblr.com/)           | 7,974     | 2048 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage   | Average Impact |
| ---- | -------------------------------------------- | ------- | -------------- |
| 1    | [Vimeo](http://vimeo.com/)                   | 10,406  | 355 ms         |
| 2    | [Brightcove](https://www.brightcove.com/en/) | 6,617   | 809 ms         |
| 3    | [YouTube](https://youtube.com)               | 408,343 | 849 ms         |
| 4    | [Wistia](https://wistia.com/)                | 13,083  | 929 ms         |
| 5    | [Twitch](https://twitch.tv/)                 | 1,068   | 1898 ms        |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Key CDN                                                                   | 1,470   | 55 ms          |
| 2    | LightWidget                                                               | 2,329   | 66 ms          |
| 3    | Siteimprove                                                               | 1,510   | 76 ms          |
| 4    | Trusted Shops                                                             | 5,639   | 79 ms          |
| 5    | [New Relic](https://newrelic.com/)                                        | 13,101  | 95 ms          |
| 6    | [Accessibe](https://accessibe.com/)                                       | 3,561   | 99 ms          |
| 7    | GetSiteControl                                                            | 1,815   | 99 ms          |
| 8    | Riskified                                                                 | 1,074   | 106 ms         |
| 9    | Affirm                                                                    | 2,501   | 113 ms         |
| 10   | iubenda                                                                   | 12,784  | 124 ms         |
| 11   | Swiftype                                                                  | 1,544   | 135 ms         |
| 12   | Seznam                                                                    | 1,655   | 135 ms         |
| 13   | Bold Commerce                                                             | 13,136  | 144 ms         |
| 14   | [Cookiebot](https://www.cookiebot.com/)                                   | 20,839  | 147 ms         |
| 15   | Sift Science                                                              | 1,080   | 148 ms         |
| 16   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 580,694 | 168 ms         |
| 17   | [Amazon Pay](https://pay.amazon.com)                                      | 5,751   | 169 ms         |
| 18   | [TrustArc](https://www.trustarc.com/)                                     | 1,374   | 179 ms         |
| 19   | MaxCDN Enterprise                                                         | 2,415   | 199 ms         |
| 20   | GitHub                                                                    | 1,661   | 232 ms         |
| 21   | Fraudlogix                                                                | 2,245   | 263 ms         |
| 22   | Fastly                                                                    | 6,806   | 273 ms         |
| 23   | [PayPal](https://paypal.com)                                              | 15,436  | 343 ms         |
| 24   | [Stripe](https://stripe.com)                                              | 23,539  | 389 ms         |
| 25   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 53,332  | 465 ms         |
| 26   | [Google Maps](https://www.google.com/maps)                                | 267,444 | 520 ms         |
| 27   | [AppDynamics](https://www.appdynamics.com/)                               | 1,283   | 526 ms         |
| 28   | Secomapp                                                                  | 2,151   | 546 ms         |
| 29   | Bugsnag                                                                   | 8,688   | 569 ms         |
| 30   | Rambler                                                                   | 7,714   | 690 ms         |
| 31   | [GoDaddy](https://www.godaddy.com/)                                       | 6,687   | 700 ms         |
| 32   | [Sentry](https://sentry.io/)                                              | 9,062   | 715 ms         |
| 33   | Signyfyd                                                                  | 1,691   | 867 ms         |
| 34   | Mapbox                                                                    | 5,206   | 877 ms         |
| 35   | [Yandex APIs](https://yandex.ru/)                                         | 27,480  | 1080 ms        |
| 36   | [POWr](https://www.powr.io)                                               | 16,407  | 1364 ms        |
| 37   | Esri ArcGIS                                                               | 1,692   | 4750 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](http://www.blogger.com/)                                                        | 23,690  | 327 ms         |
| 2    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 2,623   | 342 ms         |
| 3    | [WordPress](https://wp.com/)                                                              | 92,595  | 404 ms         |
| 4    | [Dealer](https://www.dealer.com/)                                                         | 8,639   | 433 ms         |
| 5    | Ecwid                                                                                     | 1,399   | 739 ms         |
| 6    | [Tilda](http://tilda.cc/)                                                                 | 7,478   | 783 ms         |
| 7    | [Squarespace](https://www.squarespace.com/)                                               | 39,492  | 911 ms         |
| 8    | [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 3,181   | 971 ms         |
| 9    | [Shopify](https://www.shopify.com/)                                                       | 107,323 | 1058 ms        |
| 10   | [Weebly](https://www.weebly.com/)                                                         | 13,271  | 1433 ms        |
| 11   | [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,429   | 1568 ms        |
| 12   | [Hatena Blog](https://hatenablog.com/)                                                    | 13,206  | 1579 ms        |
| 13   | [Wix](https://www.wix.com/)                                                               | 54,909  | 5963 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [Beeketing](https://beeketing.com/)         | 3,986  | 74 ms          |
| 2    | [RD Station](https://www.rdstation.com/en/) | 6,547  | 76 ms          |
| 3    | [iZooto](https://www.izooto.com)            | 1,376  | 83 ms          |
| 4    | Ve                                          | 1,848  | 149 ms         |
| 5    | [Listrak](https://www.listrak.com/)         | 1,073  | 154 ms         |
| 6    | [Hubspot](https://hubspot.com/)             | 33,137 | 181 ms         |
| 7    | [Yotpo](https://www.yotpo.com/)             | 13,632 | 202 ms         |
| 8    | [Mailchimp](https://mailchimp.com/)         | 23,376 | 204 ms         |
| 9    | [OptinMonster](https://optinmonster.com/)   | 7,494  | 260 ms         |
| 10   | Bronto Software                             | 1,057  | 261 ms         |
| 11   | Pardot                                      | 1,435  | 404 ms         |
| 12   | [Albacross](https://albacross.com/)         | 1,920  | 490 ms         |
| 13   | [Sumo](https://sumo.com/)                   | 18,438 | 686 ms         |
| 14   | Bigcommerce                                 | 10,096 | 976 ms         |
| 15   | [Drift](https://www.drift.com/)             | 6,565  | 1279 ms        |
| 16   | [Judge.me](https://judge.me/)               | 8,305  | 1376 ms        |
| 17   | [PureCars](https://www.purecars.com/)       | 2,697  | 1901 ms        |
| 18   | [Tray Commerce](https://www.tray.com.br/)   | 3,173  | 2328 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | SnapEngage                                       | 1,084  | 59 ms          |
| 2    | Pure Chat                                        | 4,662  | 70 ms          |
| 3    | Foursixty                                        | 1,411  | 81 ms          |
| 4    | [LivePerson](https://www.liveperson.com/)        | 4,303  | 112 ms         |
| 5    | [Crisp](https://crisp.chat/)                     | 4,497  | 124 ms         |
| 6    | iPerceptions                                     | 1,992  | 132 ms         |
| 7    | Comm100                                          | 1,321  | 134 ms         |
| 8    | [Intercom](https://www.intercom.com)             | 15,657 | 245 ms         |
| 9    | [Help Scout](https://www.helpscout.net/)         | 2,183  | 258 ms         |
| 10   | [Tidio Live Chat](https://www.tidiochat.com/en/) | 12,655 | 383 ms         |
| 11   | [Tawk.to](https://www.tawk.to/)                  | 63,460 | 405 ms         |
| 12   | [LiveChat](https://www.livechat.com/)            | 19,469 | 411 ms         |
| 13   | [ContactAtOnce](https://www.contactatonce.com/)  | 3,247  | 491 ms         |
| 14   | [Jivochat](https://www.jivochat.com/)            | 45,111 | 553 ms         |
| 15   | [Olark](https://www.olark.com/)                  | 6,904  | 656 ms         |
| 16   | [Smartsupp](https://www.smartsupp.com)           | 14,643 | 794 ms         |
| 17   | [ZenDesk](https://zendesk.com/)                  | 69,488 | 892 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | Accuweather                               | 1,499  | 72 ms          |
| 2    | Booking.com                               | 1,657  | 157 ms         |
| 3    | Tencent                                   | 2,257  | 163 ms         |
| 4    | OpenTable                                 | 1,563  | 165 ms         |
| 5    | SnapWidget                                | 2,610  | 174 ms         |
| 6    | Covert Pics                               | 1,007  | 185 ms         |
| 7    | [AMP](https://amp.dev/)                   | 74,588 | 308 ms         |
| 8    | Medium                                    | 1,157  | 474 ms         |
| 9    | Embedly                                   | 5,513  | 514 ms         |
| 10   | [Spotify](https://www.spotify.com/)       | 3,225  | 602 ms         |
| 11   | issuu                                     | 1,938  | 669 ms         |
| 12   | [SoundCloud](https://www.soundcloud.com/) | 4,464  | 987 ms         |
| 13   | Dailymotion                               | 1,838  | 1253 ms        |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 1,449   | 55 ms          |
| 2    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 18,280  | 94 ms          |
| 3    | [Yandex CDN](https://yandex.ru/)                             | 25,669  | 185 ms         |
| 4    | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 97,342  | 193 ms         |
| 5    | Microsoft Hosted Libs                                        | 4,943   | 203 ms         |
| 6    | Monotype                                                     | 4,073   | 212 ms         |
| 7    | Azure Web Services                                           | 10,612  | 228 ms         |
| 8    | [jQuery CDN](https://code.jquery.com/)                       | 167,644 | 269 ms         |
| 9    | [Unpkg](https://unpkg.com)                                   | 6,918   | 274 ms         |
| 10   | [Google CDN](https://developers.google.com/speed/libraries/) | 947,798 | 288 ms         |
| 11   | [Akamai](https://www.akamai.com/)                            | 7,364   | 335 ms         |
| 12   | [Cloudflare CDN](https://cdnjs.com/)                         | 117,339 | 339 ms         |
| 13   | [FontAwesome CDN](https://fontawesome.com/)                  | 47,298  | 413 ms         |
| 14   | [CreateJS CDN](http://code.createjs.com/)                    | 3,518   | 2322 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 722,184 | 115 ms         |
| 2    | [Yahoo! Tag Manager](https://marketing.yahoo.co.jp/service/tagmanager/)       | 5,822   | 116 ms         |
| 3    | TagCommander                                                                  | 1,072   | 145 ms         |
| 4    | [BrightTag / Signal](https://www.signal.co)                                   | 3,674   | 158 ms         |
| 5    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,617  | 311 ms         |
| 6    | [Tealium](https://tealium.com/)                                               | 12,108  | 362 ms         |
| 7    | [Ensighten](https://www.ensighten.com/)                                       | 3,768   | 443 ms         |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Quantcast Choice](https://quantcast.com) | 12,499 | 121 ms         |
| 2    | [Optanon](https://www.cookielaw.org/)     | 8,102  | 128 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage     | Average Impact |
| ---- | ------------------------------------------------- | --------- | -------------- |
| 1    | ResponsiveVoice                                   | 1,243     | 70 ms          |
| 2    | [Amazon Web Services](https://aws.amazon.com/s3/) | 39,066    | 160 ms         |
| 3    | [All Other 3rd Parties](#by-category)             | 1,393,280 | 320 ms         |
| 4    | [Parking Crew](http://parkingcrew.net/)           | 5,147     | 326 ms         |
| 5    | Heroku                                            | 2,007     | 609 ms         |
| 6    | uLogin                                            | 2,316     | 1223 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                            | 680,998    | 991,972 s    | 1457 ms        |
| [All Other 3rd Parties](#by-category)                                                     | 1,393,280  | 445,644 s    | 320 ms         |
| [YouTube](https://youtube.com)                                                            | 408,343    | 346,701 s    | 849 ms         |
| [Facebook](https://www.facebook.com)                                                      | 1,461,908  | 335,212 s    | 229 ms         |
| [Wix](https://www.wix.com/)                                                               | 54,909     | 327,400 s    | 5963 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 947,798    | 272,554 s    | 288 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 292,542    | 169,622 s    | 580 ms         |
| [Google Maps](https://www.google.com/maps)                                                | 267,444    | 139,019 s    | 520 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 107,323    | 113,512 s    | 1058 ms        |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 580,694    | 97,640 s     | 168 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)                           | 1,202,015  | 92,974 s     | 77 ms          |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 722,184    | 83,404 s     | 115 ms         |
| [ZenDesk](https://zendesk.com/)                                                           | 69,488     | 62,012 s     | 892 ms         |
| [AddThis](http://www.addthis.com/)                                                        | 118,289    | 47,740 s     | 404 ms         |
| [jQuery CDN](https://code.jquery.com/)                                                    | 167,644    | 45,069 s     | 269 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 117,339    | 39,773 s     | 339 ms         |
| [WordPress](https://wp.com/)                                                              | 92,595     | 37,441 s     | 404 ms         |
| [Squarespace](https://www.squarespace.com/)                                               | 39,492     | 35,967 s     | 911 ms         |
| [Twitter](https://twitter.com)                                                            | 214,251    | 29,810 s     | 139 ms         |
| [Yandex APIs](https://yandex.ru/)                                                         | 27,480     | 29,681 s     | 1080 ms        |
| [Tawk.to](https://www.tawk.to/)                                                           | 63,460     | 25,679 s     | 405 ms         |
| [Jivochat](https://www.jivochat.com/)                                                     | 45,111     | 24,937 s     | 553 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 53,332     | 24,773 s     | 465 ms         |
| [PIXNET](https://www.pixnet.net/)                                                         | 15,434     | 23,272 s     | 1508 ms        |
| [AMP](https://amp.dev/)                                                                   | 74,588     | 22,996 s     | 308 ms         |
| [POWr](https://www.powr.io)                                                               | 16,407     | 22,375 s     | 1364 ms        |
| [Hatena Blog](https://hatenablog.com/)                                                    | 13,206     | 20,855 s     | 1579 ms        |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 47,298     | 19,543 s     | 413 ms         |
| [Weebly](https://www.weebly.com/)                                                         | 13,271     | 19,021 s     | 1433 ms        |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 97,342     | 18,831 s     | 193 ms         |
| [Pubmatic](https://pubmatic.com/)                                                         | 52,655     | 16,794 s     | 319 ms         |
| [Tumblr](https://tumblr.com/)                                                             | 7,974      | 16,328 s     | 2048 ms        |
| [Hotjar](https://www.hotjar.com/)                                                         | 177,526    | 14,882 s     | 84 ms          |
| [Criteo](https://www.criteo.com/)                                                         | 62,765     | 14,736 s     | 235 ms         |
| [Sumo](https://sumo.com/)                                                                 | 18,438     | 12,648 s     | 686 ms         |
| [Wistia](https://wistia.com/)                                                             | 13,083     | 12,148 s     | 929 ms         |
| [Smartsupp](https://www.smartsupp.com)                                                    | 14,643     | 11,630 s     | 794 ms         |
| [Judge.me](https://judge.me/)                                                             | 8,305      | 11,424 s     | 1376 ms        |
| [Bridgewell DSP](https://www.bridgewell.com/)                                             | 14,079     | 11,133 s     | 791 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 32,617     | 10,130 s     | 311 ms         |
| Bigcommerce                                                                               | 10,096     | 9,855 s      | 976 ms         |
| [ShareThis](https://www.sharethis.com/)                                                   | 40,215     | 9,410 s      | 234 ms         |
| [Stripe](https://stripe.com)                                                              | 23,539     | 9,146 s      | 389 ms         |
| [Taboola](https://www.taboola.com/)                                                       | 24,645     | 8,975 s      | 364 ms         |
| [Drift](https://www.drift.com/)                                                           | 6,565      | 8,400 s      | 1279 ms        |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 8,328      | 8,281 s      | 994 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                                 | 3,518      | 8,169 s      | 2322 ms        |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 25,906     | 8,114 s      | 313 ms         |
| Esri ArcGIS                                                                               | 1,692      | 8,036 s      | 4750 ms        |
| [LiveChat](https://www.livechat.com/)                                                     | 19,469     | 8,004 s      | 411 ms         |
| [Blogger](http://www.blogger.com/)                                                        | 23,690     | 7,744 s      | 327 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                                 | 3,173      | 7,388 s      | 2328 ms        |
| [Sentry](https://sentry.io/)                                                              | 9,062      | 6,480 s      | 715 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 39,066     | 6,239 s      | 160 ms         |
| [Hubspot](https://hubspot.com/)                                                           | 33,137     | 6,003 s      | 181 ms         |
| [Tilda](http://tilda.cc/)                                                                 | 7,478      | 5,858 s      | 783 ms         |
| Klaviyo                                                                                   | 14,595     | 5,714 s      | 392 ms         |
| [Moat](https://moat.com/)                                                                 | 6,917      | 5,609 s      | 811 ms         |
| [Snapchat](https://www.snapchat.com)                                                      | 13,345     | 5,466 s      | 410 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,429      | 5,376 s      | 1568 ms        |
| [Brightcove](https://www.brightcove.com/en/)                                              | 6,617      | 5,352 s      | 809 ms         |
| Rambler                                                                                   | 7,714      | 5,319 s      | 690 ms         |
| Adloox                                                                                    | 5,759      | 5,306 s      | 921 ms         |
| [PayPal](https://paypal.com)                                                              | 15,436     | 5,287 s      | 343 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)                        | 10,894     | 5,221 s      | 479 ms         |
| [PureCars](https://www.purecars.com/)                                                     | 2,697      | 5,127 s      | 1901 ms        |
| [Media.net](https://www.media.net/)                                                       | 14,562     | 4,976 s      | 342 ms         |
| Bugsnag                                                                                   | 8,688      | 4,945 s      | 569 ms         |
| [Histats](http://histats.com/)                                                            | 13,545     | 4,885 s      | 361 ms         |
| LiveJournal                                                                               | 3,680      | 4,882 s      | 1327 ms        |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 12,655     | 4,849 s      | 383 ms         |
| AB Tasty                                                                                  | 3,010      | 4,798 s      | 1594 ms        |
| [Mailchimp](https://mailchimp.com/)                                                       | 23,376     | 4,767 s      | 204 ms         |
| [Yandex CDN](https://yandex.ru/)                                                          | 25,669     | 4,750 s      | 185 ms         |
| [MGID](https://www.mgid.com/)                                                             | 8,214      | 4,721 s      | 575 ms         |
| [GoDaddy](https://www.godaddy.com/)                                                       | 6,687      | 4,678 s      | 700 ms         |
| Mapbox                                                                                    | 5,206      | 4,568 s      | 877 ms         |
| [Olark](https://www.olark.com/)                                                           | 6,904      | 4,528 s      | 656 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 4,464      | 4,404 s      | 987 ms         |
| [Tealium](https://tealium.com/)                                                           | 12,108     | 4,387 s      | 362 ms         |
| [Optimizely](https://www.optimizely.com/)                                                 | 19,584     | 4,379 s      | 224 ms         |
| [Mediavine](https://www.mediavine.com/)                                                   | 6,490      | 4,252 s      | 655 ms         |
| Privy                                                                                     | 13,047     | 4,036 s      | 309 ms         |
| [fam](http://admin.fam-ad.com/report/)                                                    | 2,135      | 3,857 s      | 1807 ms        |
| [Intercom](https://www.intercom.com)                                                      | 15,657     | 3,829 s      | 245 ms         |
| [Dealer](https://www.dealer.com/)                                                         | 8,639      | 3,741 s      | 433 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 7,531      | 3,699 s      | 491 ms         |
| [Vimeo](http://vimeo.com/)                                                                | 10,406     | 3,691 s      | 355 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                            | 40,208     | 3,632 s      | 90 ms          |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 738        | 3,441 s      | 4663 ms        |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 13,190     | 3,244 s      | 246 ms         |
| [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 3,181      | 3,089 s      | 971 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 20,839     | 3,062 s      | 147 ms         |
| Kakao                                                                                     | 18,109     | 2,853 s      | 158 ms         |
| uLogin                                                                                    | 2,316      | 2,832 s      | 1223 ms        |
| Embedly                                                                                   | 5,513      | 2,831 s      | 514 ms         |
| [Adroll](https://www.adroll.com/)                                                         | 24,347     | 2,809 s      | 115 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 26,048     | 2,771 s      | 106 ms         |
| [Yotpo](https://www.yotpo.com/)                                                           | 13,632     | 2,754 s      | 202 ms         |
| [WordAds](https://wordads.co/)                                                            | 18,479     | 2,745 s      | 149 ms         |
| Skimbit                                                                                   | 15,827     | 2,648 s      | 167 ms         |
| Trust Pilot                                                                               | 15,202     | 2,488 s      | 164 ms         |
| [Akamai](https://www.akamai.com/)                                                         | 7,364      | 2,464 s      | 335 ms         |
| Azure Web Services                                                                        | 10,612     | 2,417 s      | 228 ms         |
| Permutive                                                                                 | 9,558      | 2,327 s      | 243 ms         |
| Dailymotion                                                                               | 1,838      | 2,303 s      | 1253 ms        |
| VigLink                                                                                   | 7,100      | 2,191 s      | 309 ms         |
| Infolinks                                                                                 | 3,699      | 2,157 s      | 583 ms         |
| [AddToAny](https://www.addtoany.com/)                                                     | 24,501     | 2,121 s      | 87 ms          |
| Tynt                                                                                      | 23,214     | 2,047 s      | 88 ms          |
| [Twitch](https://twitch.tv/)                                                              | 1,068      | 2,027 s      | 1898 ms        |
| Inspectlet                                                                                | 5,605      | 2,022 s      | 361 ms         |
| [OptinMonster](https://optinmonster.com/)                                                 | 7,494      | 1,950 s      | 260 ms         |
| [Spotify](https://www.spotify.com/)                                                       | 3,225      | 1,943 s      | 602 ms         |
| LKQD                                                                                      | 1,337      | 1,936 s      | 1448 ms        |
| [Unpkg](https://unpkg.com)                                                                | 6,918      | 1,896 s      | 274 ms         |
| Bold Commerce                                                                             | 13,136     | 1,889 s      | 144 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 811        | 1,878 s      | 2315 ms        |
| Fastly                                                                                    | 6,806      | 1,860 s      | 273 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 15,836     | 1,847 s      | 117 ms         |
| [Segment](https://segment.com/)                                                           | 9,541      | 1,825 s      | 191 ms         |
| [Instagram](https://www.instagram.com)                                                    | 9,444      | 1,735 s      | 184 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 18,280     | 1,723 s      | 94 ms          |
| DTSCOUT                                                                                   | 12,711     | 1,682 s      | 132 ms         |
| [Parking Crew](http://parkingcrew.net/)                                                   | 5,147      | 1,677 s      | 326 ms         |
| [Ensighten](https://www.ensighten.com/)                                                   | 3,768      | 1,670 s      | 443 ms         |
| [VK](https://vk.com/)                                                                     | 13,492     | 1,648 s      | 122 ms         |
| [ContactAtOnce](https://www.contactatonce.com/)                                           | 3,247      | 1,594 s      | 491 ms         |
| iubenda                                                                                   | 12,784     | 1,586 s      | 124 ms         |
| [LinkedIn](https://www.linkedin.com/)                                                     | 14,057     | 1,561 s      | 111 ms         |
| [Sizmek](https://www.sizmek.com/)                                                         | 1,487      | 1,555 s      | 1046 ms        |
| [Pinterest](https://pinterest.com/)                                                       | 17,278     | 1,540 s      | 89 ms          |
| [Quantcast Choice](https://quantcast.com)                                                 | 12,499     | 1,509 s      | 121 ms         |
| Signyfyd                                                                                  | 1,691      | 1,466 s      | 867 ms         |
| FullStory                                                                                 | 7,655      | 1,408 s      | 184 ms         |
| Gigya                                                                                     | 2,262      | 1,313 s      | 580 ms         |
| issuu                                                                                     | 1,938      | 1,296 s      | 669 ms         |
| Adform                                                                                    | 6,868      | 1,283 s      | 187 ms         |
| LongTail Ad Solutions                                                                     | 3,444      | 1,259 s      | 365 ms         |
| [Disqus](http://disqus.com/)                                                              | 1,252      | 1,245 s      | 995 ms         |
| [New Relic](https://newrelic.com/)                                                        | 13,101     | 1,245 s      | 95 ms          |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 11,880     | 1,239 s      | 104 ms         |
| Heroku                                                                                    | 2,007      | 1,222 s      | 609 ms         |
| Secomapp                                                                                  | 2,151      | 1,175 s      | 546 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 10,740     | 1,142 s      | 106 ms         |
| Okas Concepts                                                                             | 673        | 1,112 s      | 1652 ms        |
| Dynamic Yield                                                                             | 964        | 1,095 s      | 1136 ms        |
| LoyaltyLion                                                                               | 1,301      | 1,080 s      | 830 ms         |
| Sekindo                                                                                   | 376        | 1,055 s      | 2807 ms        |
| [Optanon](https://www.cookielaw.org/)                                                     | 8,102      | 1,039 s      | 128 ms         |
| Ecwid                                                                                     | 1,399      | 1,033 s      | 739 ms         |
| Microsoft Hosted Libs                                                                     | 4,943      | 1,006 s      | 203 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                             | 1,776      | 981 s        | 552 ms         |
| [Amazon Pay](https://pay.amazon.com)                                                      | 5,751      | 974 s        | 169 ms         |
| [DigiTrust](http://www.digitru.st/)                                                       | 559        | 973 s        | 1741 ms        |
| [Albacross](https://albacross.com/)                                                       | 1,920      | 941 s        | 490 ms         |
| [Intent Media](https://intent.com/)                                                       | 8,019      | 931 s        | 116 ms         |
| sovrn                                                                                     | 4,758      | 902 s        | 190 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 2,623      | 897 s        | 342 ms         |
| [Outbrain](https://www.outbrain.com/)                                                     | 8,216      | 875 s        | 107 ms         |
| Monotype                                                                                  | 4,073      | 862 s        | 212 ms         |
| Kaltura Video Platform                                                                    | 506        | 852 s        | 1684 ms        |
| Feefo.com                                                                                 | 1,686      | 846 s        | 502 ms         |
| Technorati                                                                                | 841        | 825 s        | 981 ms         |
| Cxense                                                                                    | 4,375      | 784 s        | 179 ms         |
| Ezoic                                                                                     | 1,331      | 773 s        | 581 ms         |
| [VWO](https://vwo.com)                                                                    | 4,728      | 748 s        | 158 ms         |
| Bazaarvoice                                                                               | 1,845      | 733 s        | 397 ms         |
| [33 Across](https://33across.com/)                                                        | 1,197      | 732 s        | 611 ms         |
| AdMatic                                                                                   | 793        | 719 s        | 906 ms         |
| Vidible                                                                                   | 1,148      | 717 s        | 624 ms         |
| CallRail                                                                                  | 7,019      | 710 s        | 101 ms         |
| Revolver Maps                                                                             | 1,146      | 697 s        | 608 ms         |
| Smart AdServer                                                                            | 4,272      | 692 s        | 162 ms         |
| Yieldify                                                                                  | 513        | 683 s        | 1332 ms        |
| [AppDynamics](https://www.appdynamics.com/)                                               | 1,283      | 675 s        | 526 ms         |
| [Yahoo! Tag Manager](https://marketing.yahoo.co.jp/service/tagmanager/)                   | 5,822      | 674 s        | 116 ms         |
| Index Exchange                                                                            | 5,527      | 672 s        | 122 ms         |
| [RevJet](https://www.revjet.com/)                                                         | 1,211      | 670 s        | 553 ms         |
| Admixer for Publishers                                                                    | 1,043      | 669 s        | 642 ms         |
| StickyADS.tv                                                                              | 853        | 651 s        | 764 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                                  | 7,851      | 649 s        | 83 ms          |
| SocialShopWave                                                                            | 2,044      | 617 s        | 302 ms         |
| Teads                                                                                     | 3,464      | 614 s        | 177 ms         |
| [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)                       | 4,367      | 597 s        | 137 ms         |
| [OpenX](https://www.openx.com/)                                                           | 3,701      | 594 s        | 160 ms         |
| ZEDO                                                                                      | 795        | 592 s        | 745 ms         |
| Fraudlogix                                                                                | 2,245      | 590 s        | 263 ms         |
| [Vidyard](https://www.vidyard.com/)                                                       | 536        | 587 s        | 1094 ms        |
| LINE Corporation                                                                          | 5,184      | 585 s        | 113 ms         |
| [BrightTag / Signal](https://www.signal.co)                                               | 3,674      | 579 s        | 158 ms         |
| Pardot                                                                                    | 1,435      | 579 s        | 404 ms         |
| [Mixpanel](https://mixpanel.com/)                                                         | 7,528      | 568 s        | 75 ms          |
| [Help Scout](https://www.helpscout.net/)                                                  | 2,183      | 563 s        | 258 ms         |
| [Crisp](https://crisp.chat/)                                                              | 4,497      | 559 s        | 124 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                                | 5,845      | 555 s        | 95 ms          |
| TINT                                                                                      | 224        | 553 s        | 2470 ms        |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 4,994      | 551 s        | 110 ms         |
| Medium                                                                                    | 1,157      | 549 s        | 474 ms         |
| IBM Digital Analytics                                                                     | 806        | 546 s        | 677 ms         |

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

Verify that the origins in `data/entities.js` are correct. Most issues will simply be the result of mislabelling of shared origins. If everything checks out, there is likely no further action and the data is valid. If you still believe there's errors, file an issue to discuss futher.

<a name="contribute"></a>

### How can I contribute?

Only about 90% of the third party script execution has been assigned to an entity. We could use your help identifying the rest! See [Contributing](#contributing) for details.

## Contributing

### Thanks

A **huge** thanks to [@simonhearne](https://twitter.com/simonhearne) and [@soulgalore](https://twitter.com/soulislove) for their assistance in classifying additional domains!

### Updating the Entities

The domain->entity mapping can be found in `data/entities.js`. Adding a new entity is as simple as adding a new array item with the following form.

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

You need to have a BigQuery project called `lighthouse-infrastructure` with a dataset called `third_party_web`
The queries used to compute the data are in the `sql/` directory.

1. Edit `all-observed-domains-query.sql` to query the correct month's HTTPArchive run.
1. Run `all-observed-domains-query.sql` in BigQuery.
1. Download the results and check them in at `data/YYYY-MM-01-observed-domains.json`.
1. Edit `origin-query.sql` to query the correct month's HTTPArchive run.
1. Run `yarn build` to regenerate the latest canonical domain mapping.
1. Create a new table in `lighthouse-infrastructure.third_party_web` BigQuery table of the format `YYYY_MM_01` with the csv in `dist/domain-map.csv` with three columns `domain`, `canonicalDomain`, and `category`.
1. Run `origin-query.sql` in BigQuery.
1. Download the results and check them in at `data/YYYY-MM-01-origin-scripting.json`.
1. Edit `origin-query.sql` to join on the table you just created.
1. Run `yarn build` to regenerate the queries.
1. Run `entity-per-page.sql` in BigQuery.
1. Download the results and check them in at `data/YYYY-MM-01-entity-scripting.json`.
1. Run `web-almanac-all-observed-domains-identification.sql` in BigQuery.
1. Save the results to a BigQuery table `YYYY_MM_01_all_observed_domains`.

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
