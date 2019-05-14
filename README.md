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
| 1    | ExoClick                                                       | 2,714   | 34 ms          |
| 2    | Tribal Fusion                                                  | 1,082   | 54 ms          |
| 3    | [Rubicon Project](https://rubiconproject.com/)                 | 3,295   | 62 ms          |
| 4    | Gemius                                                         | 6,998   | 69 ms          |
| 5    | BlueKai                                                        | 2,548   | 71 ms          |
| 6    | Crowd Control                                                  | 2,553   | 74 ms          |
| 7    | MailMunch                                                      | 4,315   | 77 ms          |
| 8    | fluct                                                          | 6,732   | 79 ms          |
| 9    | Geniee                                                         | 2,226   | 81 ms          |
| 10   | Rakuten Marketing                                              | 1,540   | 83 ms          |
| 11   | PubNation                                                      | 2,499   | 88 ms          |
| 12   | Unbounce                                                       | 2,338   | 95 ms          |
| 13   | [Outbrain](https://www.outbrain.com/)                          | 5,244   | 98 ms          |
| 14   | Constant Contact                                               | 1,251   | 101 ms         |
| 15   | [Scorecard Research](https://www.scorecardresearch.com/)       | 10,755  | 101 ms         |
| 16   | PushCrew                                                       | 3,335   | 101 ms         |
| 17   | SmartAdServer                                                  | 1,776   | 102 ms         |
| 18   | OwnerIQ                                                        | 1,541   | 110 ms         |
| 19   | Digital ad Consortium                                          | 3,777   | 117 ms         |
| 20   | AudienceSearch                                                 | 4,389   | 117 ms         |
| 21   | [Adroll](https://www.adroll.com/)                              | 3,188   | 119 ms         |
| 22   | Smart AdServer                                                 | 3,223   | 121 ms         |
| 23   | [Popads](https://www.popads.net/)                              | 4,628   | 122 ms         |
| 24   | TrafficStars                                                   | 1,093   | 122 ms         |
| 25   | [Amazon Ads](https://ad.amazon.com/)                           | 16,853  | 127 ms         |
| 26   | DTSCOUT                                                        | 7,417   | 130 ms         |
| 27   | Adocean                                                        | 1,319   | 136 ms         |
| 28   | Adverline Board                                                | 1,307   | 137 ms         |
| 29   | [Yahoo!](https://www.yahoo.com/)                               | 3,830   | 138 ms         |
| 30   | [Pubmatic](https://pubmatic.com/)                              | 3,728   | 145 ms         |
| 31   | Skimbit                                                        | 15,074  | 146 ms         |
| 32   | Microad                                                        | 1,328   | 149 ms         |
| 33   | Chitika                                                        | 1,010   | 150 ms         |
| 34   | Cxense                                                         | 3,773   | 153 ms         |
| 35   | JustUno                                                        | 1,944   | 154 ms         |
| 36   | Tynt                                                           | 25,583  | 154 ms         |
| 37   | Adform                                                         | 9,062   | 155 ms         |
| 38   | [Criteo](https://www.criteo.com/)                              | 69,887  | 156 ms         |
| 39   | Rocket Fuel                                                    | 5,755   | 161 ms         |
| 40   | JuicyAds                                                       | 2,935   | 163 ms         |
| 41   | Sharethrough                                                   | 2,195   | 170 ms         |
| 42   | [AOL / Oath / Verizon Media](https://www.oath.com/)            | 1,341   | 171 ms         |
| 43   | sovrn                                                          | 5,371   | 172 ms         |
| 44   | Klaviyo                                                        | 7,677   | 181 ms         |
| 45   | Teads                                                          | 6,589   | 187 ms         |
| 46   | Index Exchange                                                 | 3,336   | 196 ms         |
| 47   | [MGID](https://www.mgid.com/)                                  | 3,438   | 205 ms         |
| 48   | [AppNexus](https://www.appnexus.com/)                          | 2,568   | 221 ms         |
| 49   | Sortable                                                       | 1,028   | 252 ms         |
| 50   | iBillboard                                                     | 3,258   | 272 ms         |
| 51   | Admixer for Publishers                                         | 2,597   | 280 ms         |
| 52   | VigLink                                                        | 5,806   | 325 ms         |
| 53   | Privy                                                          | 9,952   | 329 ms         |
| 54   | [Sizmek](https://www.sizmek.com/)                              | 3,971   | 428 ms         |
| 55   | [Taboola](https://www.taboola.com/)                            | 13,502  | 468 ms         |
| 56   | [Yandex Ads](https://yandex.com/adv/)                          | 23,195  | 501 ms         |
| 57   | Infolinks                                                      | 4,090   | 524 ms         |
| 58   | GumGum                                                         | 4,172   | 589 ms         |
| 59   | Between Digital                                                | 1,107   | 600 ms         |
| 60   | [WordAds](https://wordads.co/)                                 | 5,559   | 687 ms         |
| 61   | Vidible                                                        | 1,566   | 746 ms         |
| 62   | AdMatic                                                        | 2,707   | 759 ms         |
| 63   | [OpenX](https://www.openx.com/)                                | 6,882   | 855 ms         |
| 64   | LKQD                                                           | 2,090   | 885 ms         |
| 65   | [MediaVine](https://www.mediavine.com/)                        | 4,296   | 961 ms         |
| 66   | [Media.net](https://www.media.net/)                            | 3,385   | 1030 ms        |
| 67   | [Integral Ad Science](https://integralads.com/uk/)             | 8,575   | 1077 ms        |
| 68   | [Moat](https://moat.com/)                                      | 11,662  | 1134 ms        |
| 69   | Yieldmo                                                        | 2,227   | 1235 ms        |
| 70   | [DoubleVerify](https://www.doubleverify.com/)                  | 1,372   | 1248 ms        |
| 71   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 624,172 | 1285 ms        |
| 72   | StickyADS.tv                                                   | 2,010   | 1292 ms        |
| 73   | [33 Across](https://33across.com/)                             | 5,937   | 1736 ms        |
| 74   | [fam](http://admin.fam-ad.com/report/)                         | 2,326   | 1783 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                              | 1,209     | 56 ms          |
| 2    | etracker                                                                     | 1,732     | 71 ms          |
| 3    | Roxr Software                                                                | 1,822     | 73 ms          |
| 4    | Heap                                                                         | 1,859     | 75 ms          |
| 5    | SessionCam                                                                   | 1,131     | 77 ms          |
| 6    | Trust Pilot                                                                  | 2,741     | 77 ms          |
| 7    | [Mixpanel](https://mixpanel.com/)                                            | 4,488     | 84 ms          |
| 8    | [Google Analytics](https://www.google.com/analytics/analytics/)              | 1,124,001 | 86 ms          |
| 9    | Searchanise                                                                  | 2,752     | 92 ms          |
| 10   | Chartbeat                                                                    | 6,959     | 96 ms          |
| 11   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 7,766     | 102 ms         |
| 12   | [Hotjar](https://www.hotjar.com/)                                            | 111,933   | 104 ms         |
| 13   | CallRail                                                                     | 3,843     | 109 ms         |
| 14   | [Quantcast](https://www.quantcast.com)                                       | 3,728     | 111 ms         |
| 15   | Marchex                                                                      | 3,844     | 113 ms         |
| 16   | Nosto                                                                        | 2,973     | 114 ms         |
| 17   | Clicktale                                                                    | 2,351     | 118 ms         |
| 18   | ForeSee                                                                      | 2,612     | 124 ms         |
| 19   | Parse.ly                                                                     | 2,831     | 126 ms         |
| 20   | [Snowplow](https://snowplowanalytics.com/)                                   | 5,357     | 126 ms         |
| 21   | Treasure Data                                                                | 9,714     | 131 ms         |
| 22   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 15,441    | 141 ms         |
| 23   | Evidon                                                                       | 1,208     | 142 ms         |
| 24   | Gigya                                                                        | 1,949     | 176 ms         |
| 25   | Bazaarvoice                                                                  | 3,285     | 184 ms         |
| 26   | [Snapchat](https://www.snapchat.com)                                         | 6,233     | 186 ms         |
| 27   | Maxymiser                                                                    | 1,139     | 189 ms         |
| 28   | [BounceX](https://www.bouncex.com/)                                          | 1,374     | 190 ms         |
| 29   | [DigiTrust](http://www.digitru.st/)                                          | 4,583     | 197 ms         |
| 30   | [Segment](https://segment.com/)                                              | 7,886     | 198 ms         |
| 31   | [VWO](https://vwo.com)                                                       | 3,280     | 211 ms         |
| 32   | FullStory                                                                    | 4,063     | 218 ms         |
| 33   | Ezoic                                                                        | 3,016     | 241 ms         |
| 34   | Feefo.com                                                                    | 2,218     | 251 ms         |
| 35   | [Optimizely](https://www.optimizely.com/)                                    | 12,417    | 267 ms         |
| 36   | Inspectlet                                                                   | 4,984     | 320 ms         |
| 37   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 242,224   | 376 ms         |
| 38   | [Keen](https://keen.io/)                                                     | 3,241     | 384 ms         |
| 39   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 1,013     | 415 ms         |
| 40   | AB Tasty                                                                     | 3,111     | 455 ms         |
| 41   | [Histats](http://histats.com/)                                               | 13,398    | 467 ms         |
| 42   | Mouseflow                                                                    | 1,391     | 569 ms         |
| 43   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 20,689    | 577 ms         |
| 44   | [Lucky Orange](https://www.luckyorange.com/)                                 | 6,691     | 903 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | Kakao                                                | 8,746     | 83 ms          |
| 2    | [Instagram](https://www.instagram.com)               | 5,167     | 85 ms          |
| 3    | [VK](https://vk.com/)                                | 7,315     | 86 ms          |
| 4    | Micropat                                             | 22,116    | 89 ms          |
| 5    | [Pinterest](https://pinterest.com/)                  | 15,513    | 114 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)                | 13,763    | 123 ms         |
| 7    | [Facebook](https://www.facebook.com)                 | 1,014,407 | 142 ms         |
| 8    | [Twitter](https://twitter.com)                       | 259,833   | 172 ms         |
| 9    | [Yandex Share](https://yastatic.net/share2/share.js) | 22,930    | 173 ms         |
| 10   | [ShareThis](https://www.sharethis.com/)              | 18,767    | 443 ms         |
| 11   | SocialShopWave                                       | 1,023     | 448 ms         |
| 12   | [Shareaholic](https://www.shareaholic.com/)          | 9,988     | 471 ms         |
| 13   | [AddThis](http://www.addthis.com/)                   | 122,103   | 497 ms         |
| 14   | LiveJournal                                          | 6,610     | 734 ms         |
| 15   | [PIXNET](https://www.pixnet.net/)                    | 26,582    | 925 ms         |
| 16   | [Tumblr](https://tumblr.com/)                        | 8,675     | 1499 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage  | Average Impact |
| ---- | -------------------------------------------- | ------ | -------------- |
| 1    | [YouTube](https://youtube.com)               | 30,547 | 156 ms         |
| 2    | [Brightcove](https://www.brightcove.com/en/) | 5,100  | 721 ms         |
| 3    | [Wistia](https://wistia.com/)                | 10,643 | 761 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Trusted Shops                                                             | 1,322   | 40 ms          |
| 2    | Symantec                                                                  | 1,246   | 69 ms          |
| 3    | [Stripe](https://stripe.com)                                              | 4,869   | 81 ms          |
| 4    | [New Relic](https://newrelic.com/)                                        | 3,340   | 81 ms          |
| 5    | Siteimprove                                                               | 1,481   | 82 ms          |
| 6    | iubenda                                                                   | 9,614   | 83 ms          |
| 7    | GetSiteControl                                                            | 3,144   | 84 ms          |
| 8    | iovation                                                                  | 1,009   | 85 ms          |
| 9    | [OneSignal](https://onesignal.com/)                                       | 9,567   | 87 ms          |
| 10   | [Cookiebot](https://www.cookiebot.com/)                                   | 9,516   | 93 ms          |
| 11   | Bold Commerce                                                             | 11,530  | 127 ms         |
| 12   | Sift Science                                                              | 1,117   | 145 ms         |
| 13   | [AppDynamics](https://www.appdynamics.com/)                               | 1,496   | 149 ms         |
| 14   | MaxCDN Enterprise                                                         | 2,325   | 170 ms         |
| 15   | Seznam                                                                    | 1,424   | 173 ms         |
| 16   | Swiftype                                                                  | 1,300   | 177 ms         |
| 17   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 279,510 | 195 ms         |
| 18   | Fastly                                                                    | 3,396   | 225 ms         |
| 19   | Affirm                                                                    | 1,067   | 245 ms         |
| 20   | Rambler                                                                   | 8,226   | 249 ms         |
| 21   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 8,628   | 272 ms         |
| 22   | [Google Maps](https://www.google.com/maps)                                | 120,242 | 312 ms         |
| 23   | Secomapp                                                                  | 1,062   | 341 ms         |
| 24   | [PayPal](https://paypal.com)                                              | 8,329   | 384 ms         |
| 25   | Datacamp                                                                  | 10,609  | 425 ms         |
| 26   | [Sentry](https://sentry.io/)                                              | 15,661  | 462 ms         |
| 27   | [Distil Networks](https://www.distilnetworks.com/)                        | 10,893  | 486 ms         |
| 28   | Okas Concepts                                                             | 1,109   | 573 ms         |
| 29   | Mapbox                                                                    | 2,558   | 1215 ms        |
| 30   | [Yandex APIs](https://yandex.ru/)                                         | 21,677  | 1231 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                  | Usage  | Average Impact |
| ---- | ----------------------------------------------------- | ------ | -------------- |
| 1    | [Blogger](http://www.blogger.com/)                    | 10,705 | 64 ms          |
| 2    | [WordPress](https://wp.com/)                          | 77,990 | 125 ms         |
| 3    | [Weebly](https://www.weebly.com/)                     | 35,308 | 322 ms         |
| 4    | [Dealer](https://www.dealer.com/)                     | 7,762  | 628 ms         |
| 5    | [Shopify](https://www.shopify.com/)                   | 70,464 | 637 ms         |
| 6    | [Squarespace](https://www.squarespace.com/)           | 36,919 | 1133 ms        |
| 7    | [CDK Dealer Management](https://www.cdkglobal.com/us) | 3,766  | 1149 ms        |
| 8    | [Hatena Blog](https://hatenablog.com/)                | 18,689 | 1315 ms        |
| 9    | [Wix](https://www.wix.com/)                           | 40,752 | 5393 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [RD Station](https://www.rdstation.com/en/) | 3,457  | 76 ms          |
| 2    | [Hubspot](https://hubspot.com/)             | 14,461 | 119 ms         |
| 3    | [Listrak](https://www.listrak.com/)         | 1,070  | 145 ms         |
| 4    | Ve                                          | 3,415  | 157 ms         |
| 5    | [Drift](https://www.drift.com/)             | 5,072  | 163 ms         |
| 6    | [Yotpo](https://www.yotpo.com/)             | 9,652  | 206 ms         |
| 7    | [Mailchimp](https://mailchimp.com/)         | 17,626 | 223 ms         |
| 8    | [OptinMonster](https://optinmonster.com/)   | 6,239  | 297 ms         |
| 9    | Bigcommerce                                 | 11,802 | 301 ms         |
| 10   | [Beeketing](https://beeketing.com/)         | 19,146 | 465 ms         |
| 11   | [Albacross](https://albacross.com/)         | 1,737  | 753 ms         |
| 12   | [Sumo](https://sumo.com/)                   | 20,402 | 798 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | Foursixty                                        | 1,129  | 82 ms          |
| 2    | iPerceptions                                     | 2,648  | 88 ms          |
| 3    | iAdvize SAS                                      | 2,584  | 100 ms         |
| 4    | [LivePerson](https://www.liveperson.com/)        | 4,547  | 114 ms         |
| 5    | Comm100                                          | 1,539  | 119 ms         |
| 6    | [LiveChat](https://www.livechatinc.com/)         | 10,423 | 154 ms         |
| 7    | Pure Chat                                        | 4,086  | 162 ms         |
| 8    | [Tidio Live Chat](https://www.tidiochat.com/en/) | 5,979  | 309 ms         |
| 9    | Dynamic Yield                                    | 1,773  | 340 ms         |
| 10   | [Tawk.to](https://www.tawk.to/)                  | 46,981 | 343 ms         |
| 11   | [Jivochat](https://www.jivochat.com/)            | 28,139 | 360 ms         |
| 12   | LiveTex                                          | 2,673  | 371 ms         |
| 13   | [Help Scout](https://www.helpscout.net/)         | 1,626  | 372 ms         |
| 14   | [Intercom](https://www.intercom.com/)            | 13,452 | 500 ms         |
| 15   | [Olark](https://www.olark.com/)                  | 7,372  | 636 ms         |
| 16   | [ZenDesk](https://zendesk.com/)                  | 68,127 | 698 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                               | Usage  | Average Impact |
| ---- | ---------------------------------- | ------ | -------------- |
| 1    | Accuweather                        | 1,279  | 77 ms          |
| 2    | OpenTable                          | 1,845  | 107 ms         |
| 3    | Medium                             | 2,491  | 171 ms         |
| 4    | Embedly                            | 2,686  | 227 ms         |
| 5    | [AMP](https://www.ampproject.org/) | 46,495 | 349 ms         |

<a name="library"></a>

#### Libraries

These are mostly open source libraries (e.g. jQuery) served over different public CDNs. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the libraries being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 10,409  | 92 ms          |
| 2    | [Yandex CDN](https://yandex.ru/)                             | 1,939   | 155 ms         |
| 3    | [FontAwesome CDN](https://fontawesome.com/)                  | 18,935  | 162 ms         |
| 4    | Microsoft Hosted Libs                                        | 4,876   | 185 ms         |
| 5    | Monotype                                                     | 4,142   | 194 ms         |
| 6    | [jQuery CDN](https://code.jquery.com/)                       | 147,162 | 227 ms         |
| 7    | [Google CDN](https://developers.google.com/speed/libraries/) | 749,555 | 247 ms         |
| 8    | [Unpkg](https://unpkg.com)                                   | 2,947   | 251 ms         |
| 9    | [Cloudflare CDN](https://cdnjs.com/)                         | 90,131  | 260 ms         |
| 10   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 23,200  | 336 ms         |
| 11   | [CreateJS CDN](http://code.createjs.com/)                    | 1,713   | 3617 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------- | ------- | -------------- |
| 1    | TagCommander                                                                  | 1,213   | 96 ms          |
| 2    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 481,374 | 115 ms         |
| 3    | [BrightTag / Signal](https://www.signal.co)                                   | 7,380   | 134 ms         |
| 4    | [Tealium](https://tealium.com/)                                               | 11,573  | 305 ms         |
| 5    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 27,224  | 334 ms         |
| 6    | [Ensighten](https://www.ensighten.com/)                                       | 5,840   | 390 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage   | Average Impact |
| ---- | ------------------------------------------------- | ------- | -------------- |
| 1    | [Amazon Web Services](https://aws.amazon.com/s3/) | 27,904  | 165 ms         |
| 2    | Pagely                                            | 1,047   | 234 ms         |
| 3    | [All Other 3rd Parties](#by-category)             | 913,172 | 332 ms         |
| 4    | [Parking Crew](http://parkingcrew.net/)           | 4,690   | 425 ms         |
| 5    | uLogin                                            | 2,451   | 1211 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                          | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                | 624,172    | 801,894 s    | 1285 ms        |
| [All Other 3rd Parties](#by-category)                                         | 913,172    | 302,947 s    | 332 ms         |
| [Wix](https://www.wix.com/)                                                   | 40,752     | 219,788 s    | 5393 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                  | 749,555    | 184,832 s    | 247 ms         |
| [Facebook](https://www.facebook.com)                                          | 1,014,407  | 144,422 s    | 142 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)               | 1,124,001  | 96,913 s     | 86 ms          |
| [Yandex Metrica](https://metrica.yandex.com/about?)                           | 242,224    | 91,128 s     | 376 ms         |
| [AddThis](http://www.addthis.com/)                                            | 122,103    | 60,692 s     | 497 ms         |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 481,374    | 55,417 s     | 115 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)     | 279,510    | 54,369 s     | 195 ms         |
| [ZenDesk](https://zendesk.com/)                                               | 68,127     | 47,535 s     | 698 ms         |
| [Shopify](https://www.shopify.com/)                                           | 70,464     | 44,901 s     | 637 ms         |
| [Twitter](https://twitter.com)                                                | 259,833    | 44,660 s     | 172 ms         |
| [Squarespace](https://www.squarespace.com/)                                   | 36,919     | 41,812 s     | 1133 ms        |
| [Google Maps](https://www.google.com/maps)                                    | 120,242    | 37,497 s     | 312 ms         |
| [jQuery CDN](https://code.jquery.com/)                                        | 147,162    | 33,468 s     | 227 ms         |
| [Yandex APIs](https://yandex.ru/)                                             | 21,677     | 26,687 s     | 1231 ms        |
| [PIXNET](https://www.pixnet.net/)                                             | 26,582     | 24,586 s     | 925 ms         |
| [Hatena Blog](https://hatenablog.com/)                                        | 18,689     | 24,584 s     | 1315 ms        |
| [Cloudflare CDN](https://cdnjs.com/)                                          | 90,131     | 23,395 s     | 260 ms         |
| [Sumo](https://sumo.com/)                                                     | 20,402     | 16,274 s     | 798 ms         |
| [AMP](https://www.ampproject.org/)                                            | 46,495     | 16,225 s     | 349 ms         |
| [Tawk.to](https://www.tawk.to/)                                               | 46,981     | 16,092 s     | 343 ms         |
| [Moat](https://moat.com/)                                                     | 11,662     | 13,229 s     | 1134 ms        |
| [Tumblr](https://tumblr.com/)                                                 | 8,675      | 13,004 s     | 1499 ms        |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)            | 20,689     | 11,934 s     | 577 ms         |
| [Hotjar](https://www.hotjar.com/)                                             | 111,933    | 11,672 s     | 104 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                         | 23,195     | 11,612 s     | 501 ms         |
| [Weebly](https://www.weebly.com/)                                             | 35,308     | 11,363 s     | 322 ms         |
| [Criteo](https://www.criteo.com/)                                             | 69,887     | 10,883 s     | 156 ms         |
| [33 Across](https://33across.com/)                                            | 5,937      | 10,306 s     | 1736 ms        |
| [Jivochat](https://www.jivochat.com/)                                         | 28,139     | 10,136 s     | 360 ms         |
| [WordPress](https://wp.com/)                                                  | 77,990     | 9,710 s      | 125 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                            | 8,575      | 9,236 s      | 1077 ms        |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 27,224     | 9,105 s      | 334 ms         |
| [Beeketing](https://beeketing.com/)                                           | 19,146     | 8,897 s      | 465 ms         |
| [ShareThis](https://www.sharethis.com/)                                       | 18,767     | 8,309 s      | 443 ms         |
| [Wistia](https://wistia.com/)                                                 | 10,643     | 8,098 s      | 761 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                     | 23,200     | 7,801 s      | 336 ms         |
| [Sentry](https://sentry.io/)                                                  | 15,661     | 7,237 s      | 462 ms         |
| [Intercom](https://www.intercom.com/)                                         | 13,452     | 6,729 s      | 500 ms         |
| [Taboola](https://www.taboola.com/)                                           | 13,502     | 6,317 s      | 468 ms         |
| [Histats](http://histats.com/)                                                | 13,398     | 6,255 s      | 467 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                     | 1,713      | 6,196 s      | 3617 ms        |
| [Lucky Orange](https://www.luckyorange.com/)                                  | 6,691      | 6,042 s      | 903 ms         |
| [OpenX](https://www.openx.com/)                                               | 6,882      | 5,886 s      | 855 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                            | 10,893     | 5,291 s      | 486 ms         |
| [Dealer](https://www.dealer.com/)                                             | 7,762      | 4,873 s      | 628 ms         |
| LiveJournal                                                                   | 6,610      | 4,850 s      | 734 ms         |
| [YouTube](https://youtube.com)                                                | 30,547     | 4,769 s      | 156 ms         |
| [Shareaholic](https://www.shareaholic.com/)                                   | 9,988      | 4,704 s      | 471 ms         |
| [Olark](https://www.olark.com/)                                               | 7,372      | 4,690 s      | 636 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                             | 27,904     | 4,618 s      | 165 ms         |
| Datacamp                                                                      | 10,609     | 4,505 s      | 425 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                         | 3,766      | 4,327 s      | 1149 ms        |
| [fam](http://admin.fam-ad.com/report/)                                        | 2,326      | 4,146 s      | 1783 ms        |
| [MediaVine](https://www.mediavine.com/)                                       | 4,296      | 4,127 s      | 961 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                          | 22,930     | 3,965 s      | 173 ms         |
| Tynt                                                                          | 25,583     | 3,952 s      | 154 ms         |
| [Mailchimp](https://mailchimp.com/)                                           | 17,626     | 3,924 s      | 223 ms         |
| [WordAds](https://wordads.co/)                                                | 5,559      | 3,817 s      | 687 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                  | 5,100      | 3,677 s      | 721 ms         |
| Bigcommerce                                                                   | 11,802     | 3,550 s      | 301 ms         |
| [Tealium](https://tealium.com/)                                               | 11,573     | 3,526 s      | 305 ms         |
| [Media.net](https://www.media.net/)                                           | 3,385      | 3,485 s      | 1030 ms        |
| [Optimizely](https://www.optimizely.com/)                                     | 12,417     | 3,314 s      | 267 ms         |
| Privy                                                                         | 9,952      | 3,274 s      | 329 ms         |
| [PayPal](https://paypal.com)                                                  | 8,329      | 3,197 s      | 384 ms         |
| Mapbox                                                                        | 2,558      | 3,107 s      | 1215 ms        |
| [FontAwesome CDN](https://fontawesome.com/)                                   | 18,935     | 3,059 s      | 162 ms         |
| uLogin                                                                        | 2,451      | 2,969 s      | 1211 ms        |
| Yieldmo                                                                       | 2,227      | 2,750 s      | 1235 ms        |
| StickyADS.tv                                                                  | 2,010      | 2,598 s      | 1292 ms        |
| GumGum                                                                        | 4,172      | 2,455 s      | 589 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                | 8,628      | 2,343 s      | 272 ms         |
| [Ensighten](https://www.ensighten.com/)                                       | 5,840      | 2,280 s      | 390 ms         |
| Skimbit                                                                       | 15,074     | 2,207 s      | 146 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)  | 15,441     | 2,174 s      | 141 ms         |
| Infolinks                                                                     | 4,090      | 2,144 s      | 524 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                          | 16,853     | 2,142 s      | 127 ms         |
| AdMatic                                                                       | 2,707      | 2,055 s      | 759 ms         |
| Rambler                                                                       | 8,226      | 2,050 s      | 249 ms         |
| [Parking Crew](http://parkingcrew.net/)                                       | 4,690      | 1,992 s      | 425 ms         |
| [Yotpo](https://www.yotpo.com/)                                               | 9,652      | 1,991 s      | 206 ms         |
| Micropat                                                                      | 22,116     | 1,965 s      | 89 ms          |
| Blindado                                                                      | 802        | 1,954 s      | 2437 ms        |
| VigLink                                                                       | 5,806      | 1,886 s      | 325 ms         |
| [OptinMonster](https://optinmonster.com/)                                     | 6,239      | 1,855 s      | 297 ms         |
| LKQD                                                                          | 2,090      | 1,850 s      | 885 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                              | 5,979      | 1,849 s      | 309 ms         |
| [Pinterest](https://pinterest.com/)                                           | 15,513     | 1,762 s      | 114 ms         |
| [Hubspot](https://hubspot.com/)                                               | 14,461     | 1,722 s      | 119 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                 | 1,372      | 1,712 s      | 1248 ms        |
| [Sizmek](https://www.sizmek.com/)                                             | 3,971      | 1,700 s      | 428 ms         |
| [LinkedIn](https://www.linkedin.com/)                                         | 13,763     | 1,695 s      | 123 ms         |
| [LiveChat](https://www.livechatinc.com/)                                      | 10,423     | 1,602 s      | 154 ms         |
| Inspectlet                                                                    | 4,984      | 1,594 s      | 320 ms         |
| [Segment](https://segment.com/)                                               | 7,886      | 1,562 s      | 198 ms         |
| Bold Commerce                                                                 | 11,530     | 1,465 s      | 127 ms         |
| AB Tasty                                                                      | 3,111      | 1,416 s      | 455 ms         |
| Adform                                                                        | 9,062      | 1,408 s      | 155 ms         |
| Klaviyo                                                                       | 7,677      | 1,391 s      | 181 ms         |
| [Albacross](https://albacross.com/)                                           | 1,737      | 1,308 s      | 753 ms         |
| Treasure Data                                                                 | 9,714      | 1,277 s      | 131 ms         |
| [Keen](https://keen.io/)                                                      | 3,241      | 1,245 s      | 384 ms         |
| Teads                                                                         | 6,589      | 1,235 s      | 187 ms         |
| Vidible                                                                       | 1,566      | 1,169 s      | 746 ms         |
| [Snapchat](https://www.snapchat.com)                                          | 6,233      | 1,162 s      | 186 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                      | 10,755     | 1,090 s      | 101 ms         |
| LiveTex                                                                       | 2,673      | 993 s        | 371 ms         |
| [BrightTag / Signal](https://www.signal.co)                                   | 7,380      | 989 s        | 134 ms         |
| DTSCOUT                                                                       | 7,417      | 967 s        | 130 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                     | 10,409     | 955 s        | 92 ms          |
| Rocket Fuel                                                                   | 5,755      | 926 s        | 161 ms         |
| sovrn                                                                         | 5,371      | 922 s        | 172 ms         |
| [DigiTrust](http://www.digitru.st/)                                           | 4,583      | 903 s        | 197 ms         |
| Microsoft Hosted Libs                                                         | 4,876      | 901 s        | 185 ms         |
| FullStory                                                                     | 4,063      | 887 s        | 218 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                       | 9,516      | 886 s        | 93 ms          |
| iBillboard                                                                    | 3,258      | 885 s        | 272 ms         |
| [OneSignal](https://onesignal.com/)                                           | 9,567      | 835 s        | 87 ms          |
| [Drift](https://www.drift.com/)                                               | 5,072      | 827 s        | 163 ms         |
| Monotype                                                                      | 4,142      | 805 s        | 194 ms         |
| iubenda                                                                       | 9,614      | 799 s        | 83 ms          |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 7,766      | 792 s        | 102 ms         |
| Mouseflow                                                                     | 1,391      | 791 s        | 569 ms         |
| Esri ArcGIS                                                                   | 731        | 782 s        | 1070 ms        |
| Fastly                                                                        | 3,396      | 764 s        | 225 ms         |
| [Unpkg](https://unpkg.com)                                                    | 2,947      | 740 s        | 251 ms         |
| Ezoic                                                                         | 3,016      | 727 s        | 241 ms         |
| Admixer for Publishers                                                        | 2,597      | 726 s        | 280 ms         |
| Kakao                                                                         | 8,746      | 724 s        | 83 ms          |
| [MGID](https://www.mgid.com/)                                                 | 3,438      | 704 s        | 205 ms         |
| [Hotmart](https://www.hotmart.com/)                                           | 855        | 693 s        | 811 ms         |
| [VWO](https://vwo.com)                                                        | 3,280      | 690 s        | 211 ms         |
| [Blogger](http://www.blogger.com/)                                            | 10,705     | 690 s        | 64 ms          |
| [Snowplow](https://snowplowanalytics.com/)                                    | 5,357      | 676 s        | 126 ms         |
| Chartbeat                                                                     | 6,959      | 671 s        | 96 ms          |
| Between Digital                                                               | 1,107      | 664 s        | 600 ms         |
| Pure Chat                                                                     | 4,086      | 662 s        | 162 ms         |
| Index Exchange                                                                | 3,336      | 654 s        | 196 ms         |
| Okas Concepts                                                                 | 1,109      | 635 s        | 573 ms         |
| [VK](https://vk.com/)                                                         | 7,315      | 629 s        | 86 ms          |
| Embedly                                                                       | 2,686      | 611 s        | 227 ms         |
| [Help Scout](https://www.helpscout.net/)                                      | 1,626      | 605 s        | 372 ms         |
| Dynamic Yield                                                                 | 1,773      | 603 s        | 340 ms         |
| Bazaarvoice                                                                   | 3,285      | 603 s        | 184 ms         |
| Cxense                                                                        | 3,773      | 579 s        | 153 ms         |
| [AppNexus](https://www.appnexus.com/)                                         | 2,568      | 568 s        | 221 ms         |
| [Popads](https://www.popads.net/)                                             | 4,628      | 564 s        | 122 ms         |
| Feefo.com                                                                     | 2,218      | 556 s        | 251 ms         |
| [Pubmatic](https://pubmatic.com/)                                             | 3,728      | 541 s        | 145 ms         |
| Ve                                                                            | 3,415      | 538 s        | 157 ms         |
| fluct                                                                         | 6,732      | 532 s        | 79 ms          |
| [Yahoo!](https://www.yahoo.com/)                                              | 3,830      | 527 s        | 138 ms         |
| [LivePerson](https://www.liveperson.com/)                                     | 4,547      | 517 s        | 114 ms         |
| [Outbrain](https://www.outbrain.com/)                                         | 5,244      | 514 s        | 98 ms          |
| AudienceSearch                                                                | 4,389      | 514 s        | 117 ms         |
| IBM Digital Analytics                                                         | 873        | 513 s        | 587 ms         |
| Meetrics                                                                      | 881        | 506 s        | 575 ms         |
| Gemius                                                                        | 6,998      | 485 s        | 69 ms          |
| JuicyAds                                                                      | 2,935      | 478 s        | 163 ms         |
| SocialShopWave                                                                | 1,023      | 459 s        | 448 ms         |
| Digital ad Consortium                                                         | 3,777      | 440 s        | 117 ms         |
| [Instagram](https://www.instagram.com)                                        | 5,167      | 440 s        | 85 ms          |
| Marchex                                                                       | 3,844      | 435 s        | 113 ms         |
| [Market GID](https://www.marketgid.com/)                                      | 966        | 432 s        | 447 ms         |
| Pictela (AOL)                                                                 | 785        | 431 s        | 550 ms         |
| Medium                                                                        | 2,491      | 427 s        | 171 ms         |
| Audience 360                                                                  | 413        | 423 s        | 1024 ms        |
| Adtech (AOL)                                                                  | 509        | 421 s        | 828 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 1,013      | 420 s        | 415 ms         |
| CallRail                                                                      | 3,843      | 419 s        | 109 ms         |
| [Quantcast](https://www.quantcast.com)                                        | 3,728      | 415 s        | 111 ms         |
| MaxCDN Enterprise                                                             | 2,325      | 395 s        | 170 ms         |
| [Stripe](https://stripe.com)                                                  | 4,869      | 394 s        | 81 ms          |
| WebpageFX                                                                     | 329        | 394 s        | 1199 ms        |
| Smart AdServer                                                                | 3,223      | 390 s        | 121 ms         |
| [Adroll](https://www.adroll.com/)                                             | 3,188      | 381 s        | 119 ms         |
| [Mixpanel](https://mixpanel.com/)                                             | 4,488      | 378 s        | 84 ms          |
| Sharethrough                                                                  | 2,195      | 373 s        | 170 ms         |
| [Radar](https://www.cedexis.com/radar/)                                       | 670        | 367 s        | 548 ms         |
| Secomapp                                                                      | 1,062      | 362 s        | 341 ms         |
| Sekindo                                                                       | 219        | 359 s        | 1640 ms        |
| Parse.ly                                                                      | 2,831      | 356 s        | 126 ms         |
| Gigya                                                                         | 1,949      | 342 s        | 176 ms         |
| [Disqus](http://disqus.com/)                                                  | 785        | 340 s        | 434 ms         |
| Nosto                                                                         | 2,973      | 339 s        | 114 ms         |
| PushCrew                                                                      | 3,335      | 338 s        | 101 ms         |
| MailMunch                                                                     | 4,315      | 331 s        | 77 ms          |
| Bugsnag                                                                       | 843        | 331 s        | 393 ms         |
| ForeSee                                                                       | 2,612      | 325 s        | 124 ms         |
| [Yandex CDN](https://yandex.ru/)                                              | 1,939      | 300 s        | 155 ms         |
| JustUno                                                                       | 1,944      | 299 s        | 154 ms         |
| Kaltura Video Platform                                                        | 440        | 294 s        | 668 ms         |
| Digioh                                                                        | 844        | 281 s        | 333 ms         |
| Clicktale                                                                     | 2,351      | 278 s        | 118 ms         |
| [New Relic](https://newrelic.com/)                                            | 3,340      | 272 s        | 81 ms          |
| Best Of Media S.A.                                                            | 254        | 267 s        | 1051 ms        |
| GetSiteControl                                                                | 3,144      | 263 s        | 84 ms          |
| [RD Station](https://www.rdstation.com/en/)                                   | 3,457      | 262 s        | 76 ms          |
| Affirm                                                                        | 1,067      | 262 s        | 245 ms         |
| [BounceX](https://www.bouncex.com/)                                           | 1,374      | 261 s        | 190 ms         |
| Sortable                                                                      | 1,028      | 259 s        | 252 ms         |
| iAdvize SAS                                                                   | 2,584      | 259 s        | 100 ms         |
| Hola Networks                                                                 | 151        | 255 s        | 1690 ms        |
| [Vox Media](https://www.voxmedia.com/)                                        | 340        | 254 s        | 747 ms         |
| Searchanise                                                                   | 2,752      | 252 s        | 92 ms          |
| Seznam                                                                        | 1,424      | 247 s        | 173 ms         |
| Pagely                                                                        | 1,047      | 245 s        | 234 ms         |
| iPerceptions                                                                  | 2,648      | 232 s        | 88 ms          |
| Perfect Market                                                                | 781        | 230 s        | 295 ms         |
| Swiftype                                                                      | 1,300      | 230 s        | 177 ms         |
| UserReport                                                                    | 987        | 230 s        | 233 ms         |
| Ecwid                                                                         | 609        | 229 s        | 377 ms         |
| [AOL / Oath / Verizon Media](https://www.oath.com/)                           | 1,341      | 229 s        | 171 ms         |
| PhotoBucket                                                                   | 737        | 226 s        | 306 ms         |
| [AppDynamics](https://www.appdynamics.com/)                                   | 1,496      | 224 s        | 149 ms         |
| Cedato                                                                        | 103        | 222 s        | 2159 ms        |
| Unbounce                                                                      | 2,338      | 222 s        | 95 ms          |
| PubNation                                                                     | 2,499      | 221 s        | 88 ms          |
| Decibel Insight                                                               | 521        | 217 s        | 417 ms         |
| Ooyala                                                                        | 657        | 216 s        | 329 ms         |
| Maxymiser                                                                     | 1,139      | 216 s        | 189 ms         |
| Pixlee                                                                        | 337        | 212 s        | 630 ms         |
| Trust Pilot                                                                   | 2,741      | 211 s        | 77 ms          |
| [Media Math](http://www.mediamath.com/)                                       | 604        | 210 s        | 348 ms         |
| ShopiMind                                                                     | 310        | 209 s        | 674 ms         |
| PerimeterX Bot Defender                                                       | 209        | 208 s        | 997 ms         |
| Expedia                                                                       | 627        | 208 s        | 332 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                | 3,295      | 204 s        | 62 ms          |
| Fraudlogix                                                                    | 974        | 204 s        | 209 ms         |
| SearchSpring                                                                  | 529        | 204 s        | 385 ms         |
| Trip Advisor                                                                  | 346        | 198 s        | 572 ms         |
| Microad                                                                       | 1,328      | 198 s        | 149 ms         |
| OpenTable                                                                     | 1,845      | 197 s        | 107 ms         |
| Opentag                                                                       | 976        | 197 s        | 202 ms         |
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
| Evidon                                                                        | 1,208      | 171 s        | 142 ms         |
| smartclip                                                                     | 367        | 171 s        | 465 ms         |
| Connatix                                                                      | 191        | 170 s        | 891 ms         |
| OwnerIQ                                                                       | 1,541      | 170 s        | 110 ms         |
| Opta                                                                          | 294        | 169 s        | 575 ms         |
| GitHub                                                                        | 731        | 167 s        | 228 ms         |
| LoopMe                                                                        | 441        | 166 s        | 375 ms         |
| Booking.com                                                                   | 978        | 165 s        | 169 ms         |
| Sift Science                                                                  | 1,117      | 162 s        | 145 ms         |
| Qubit Deliver                                                                 | 354        | 159 s        | 450 ms         |
| ThreatMetrix                                                                  | 184        | 158 s        | 858 ms         |
| [Listrak](https://www.listrak.com/)                                           | 1,070      | 155 s        | 145 ms         |
| Chitika                                                                       | 1,010      | 152 s        | 150 ms         |
| [24]7                                                                         | 137        | 151 s        | 1100 ms        |
| [Freshdesk](https://freshdesk.com/)                                           | 898        | 141 s        | 157 ms         |
| IPONWEB                                                                       | 929        | 140 s        | 151 ms         |
| Heap                                                                          | 1,859      | 140 s        | 75 ms          |
| TrafficStars                                                                  | 1,093      | 134 s        | 122 ms         |
| Digital Media Exchange                                                        | 271        | 133 s        | 490 ms         |
| Roxr Software                                                                 | 1,822      | 132 s        | 73 ms          |
| SpotXchange                                                                   | 593        | 129 s        | 218 ms         |
| AddShoppers                                                                   | 841        | 128 s        | 153 ms         |
| Rakuten Marketing                                                             | 1,540      | 128 s        | 83 ms          |
| PERFORM                                                                       | 459        | 127 s        | 276 ms         |
| Constant Contact                                                              | 1,251      | 126 s        | 101 ms         |
| Monetate                                                                      | 939        | 124 s        | 132 ms         |
| etracker                                                                      | 1,732      | 123 s        | 71 ms          |
| Zmags                                                                         | 263        | 123 s        | 467 ms         |
| Siteimprove                                                                   | 1,481      | 122 s        | 82 ms          |
| Fort Awesome                                                                  | 529        | 122 s        | 230 ms         |
| Stackla PTY                                                                   | 537        | 120 s        | 224 ms         |
| One by AOL                                                                    | 801        | 119 s        | 149 ms         |
| PowerReviews                                                                  | 675        | 119 s        | 177 ms         |
| FirstImpression                                                               | 278        | 119 s        | 428 ms         |
| Clerk.io ApS                                                                  | 736        | 117 s        | 159 ms         |
| Flowplayer                                                                    | 492        | 117 s        | 237 ms         |
| TagCommander                                                                  | 1,213      | 116 s        | 96 ms          |
| Smarter Click                                                                 | 430        | 116 s        | 269 ms         |
| MonetizeMore                                                                  | 109        | 113 s        | 1038 ms        |
| Fanplayr                                                                      | 144        | 109 s        | 754 ms         |
| Technorati                                                                    | 814        | 108 s        | 133 ms         |
| AvantLink                                                                     | 126        | 106 s        | 837 ms         |
| OptiMonk                                                                      | 930        | 105 s        | 113 ms         |
| Mather Economics                                                              | 558        | 104 s        | 187 ms         |
| eBay                                                                          | 615        | 104 s        | 169 ms         |
| Mobify                                                                        | 327        | 103 s        | 316 ms         |
| Convert Insights                                                              | 917        | 103 s        | 112 ms         |
| Adnium                                                                        | 432        | 102 s        | 237 ms         |
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
| Revcontent                                                                    | 819        | 92 s         | 113 ms         |
| Foursixty                                                                     | 1,129      | 92 s         | 82 ms          |
| Bizible                                                                       | 795        | 92 s         | 115 ms         |
| Sidecar                                                                       | 334        | 91 s         | 272 ms         |
| SessionCam                                                                    | 1,131      | 87 s         | 77 ms          |
| Po.st                                                                         | 818        | 86 s         | 105 ms         |
| iovation                                                                      | 1,009      | 85 s         | 85 ms          |
| Survicate                                                                     | 515        | 85 s         | 166 ms         |
| Symantec                                                                      | 1,246      | 85 s         | 69 ms          |
| Refersion                                                                     | 830        | 85 s         | 102 ms         |
| Dailymotion                                                                   | 256        | 84 s         | 327 ms         |
| Time                                                                          | 245        | 83 s         | 339 ms         |
| plista                                                                        | 681        | 83 s         | 121 ms         |
| StreamRail                                                                    | 127        | 82 s         | 644 ms         |
| Global-e                                                                      | 269        | 80 s         | 296 ms         |
| Marketplace Web Service                                                       | 305        | 79 s         | 260 ms         |
| Forensiq                                                                      | 419        | 78 s         | 185 ms         |
| Sparkflow                                                                     | 317        | 77 s         | 243 ms         |
| Pardot                                                                        | 221        | 75 s         | 341 ms         |
| WebEngage                                                                     | 603        | 74 s         | 123 ms         |
| Cross Pixel Media                                                             | 479        | 73 s         | 153 ms         |
| Snacktools                                                                    | 296        | 73 s         | 248 ms         |
| Smart Insight Tracking                                                        | 794        | 71 s         | 89 ms          |
| Lytics                                                                        | 556        | 70 s         | 126 ms         |
| Adkontekst                                                                    | 384        | 70 s         | 182 ms         |
| Cachefly                                                                      | 139        | 70 s         | 502 ms         |
| Tail Target                                                                   | 852        | 69 s         | 81 ms          |
| [Usabilla](https://usabilla.com)                                              | 850        | 69 s         | 81 ms          |
| [Alexa](https://www.alexa.com/)                                               | 1,209      | 68 s         | 56 ms          |
| Proper Media                                                                  | 121        | 67 s         | 557 ms         |
| Affiliate Window                                                              | 911        | 67 s         | 74 ms          |
| Cloudinary                                                                    | 315        | 67 s         | 213 ms         |
| The Hut Group                                                                 | 624        | 67 s         | 107 ms         |
| Google Plus                                                                   | 567        | 66 s         | 117 ms         |
| ReTargeter                                                                    | 223        | 66 s         | 296 ms         |
| FoxyCart                                                                      | 281        | 65 s         | 233 ms         |
| Yieldify                                                                      | 180        | 65 s         | 360 ms         |
| Madison Logic                                                                 | 513        | 64 s         | 124 ms         |
| SnapEngage                                                                    | 931        | 63 s         | 68 ms          |
| Rackspace                                                                     | 166        | 63 s         | 377 ms         |
| Adscale                                                                       | 799        | 62 s         | 78 ms          |
| issuu                                                                         | 686        | 62 s         | 91 ms          |
| JustPremium Ads                                                               | 459        | 62 s         | 135 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                     | 410        | 62 s         | 151 ms         |
| rewardStyle.com                                                               | 590        | 62 s         | 105 ms         |
| GetResponse                                                                   | 699        | 62 s         | 88 ms          |
| [SoundCloud](https://www.soundcloud.com/)                                     | 226        | 61 s         | 270 ms         |
| TRUSTe                                                                        | 669        | 61 s         | 91 ms          |
| TrackJS                                                                       | 187        | 61 s         | 324 ms         |
| ClickDesk                                                                     | 589        | 61 s         | 103 ms         |
| Reevoo                                                                        | 374        | 60 s         | 161 ms         |
| Tribal Fusion                                                                 | 1,082      | 58 s         | 54 ms          |
| Effective Measure                                                             | 620        | 58 s         | 93 ms          |
| Underdog Media                                                                | 146        | 56 s         | 382 ms         |
| WalkMe                                                                        | 345        | 56 s         | 161 ms         |
| [Vimeo](http://vimeo.com/)                                                    | 183        | 55 s         | 301 ms         |
| Better Business Bureau                                                        | 177        | 55 s         | 311 ms         |
| Gleam                                                                         | 431        | 55 s         | 127 ms         |
| Bootstrap Chinese network                                                     | 276        | 53 s         | 192 ms         |
| Kampyle                                                                       | 471        | 53 s         | 113 ms         |
| Tencent                                                                       | 522        | 53 s         | 101 ms         |
| Nativo                                                                        | 562        | 53 s         | 94 ms          |
| Tradelab                                                                      | 699        | 53 s         | 75 ms          |
| Evergage                                                                      | 235        | 53 s         | 224 ms         |
| Trusted Shops                                                                 | 1,322      | 52 s         | 40 ms          |
| Keywee                                                                        | 269        | 52 s         | 192 ms         |
| Clicktripz                                                                    | 200        | 50 s         | 251 ms         |
| Profitshare                                                                   | 386        | 50 s         | 129 ms         |
| Branch Metrics                                                                | 730        | 50 s         | 68 ms          |
| Yottaa                                                                        | 165        | 49 s         | 297 ms         |
| Kaizen Platform                                                               | 252        | 49 s         | 193 ms         |
| The ADEX                                                                      | 636        | 48 s         | 76 ms          |
| Elastic Ad                                                                    | 506        | 48 s         | 95 ms          |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                | 712        | 48 s         | 67 ms          |
| Navegg                                                                        | 559        | 47 s         | 84 ms          |
| [Crazy Egg](https://www.crazyegg.com/)                                        | 348        | 46 s         | 133 ms         |
| TruConversion                                                                 | 228        | 45 s         | 198 ms         |
| CNET Content Solutions                                                        | 74         | 45 s         | 602 ms         |
| SpringServer                                                                  | 103        | 44 s         | 425 ms         |
| ShopRunner                                                                    | 149        | 44 s         | 293 ms         |
| WebSpectator                                                                  | 218        | 43 s         | 198 ms         |
| bRealTime                                                                     | 105        | 43 s         | 408 ms         |
| Zanox                                                                         | 370        | 43 s         | 115 ms         |
| unpkg                                                                         | 243        | 42 s         | 174 ms         |
| Reflektion                                                                    | 135        | 42 s         | 313 ms         |
| LinkedIn Ads                                                                  | 541        | 42 s         | 78 ms          |
| CDN.net                                                                       | 113        | 42 s         | 368 ms         |
| BoldChat                                                                      | 443        | 41 s         | 93 ms          |
| Socialphotos                                                                  | 242        | 40 s         | 165 ms         |
| Onet                                                                          | 109        | 40 s         | 364 ms         |
| [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)        | 202        | 40 s         | 196 ms         |
| Nend                                                                          | 945        | 40 s         | 42 ms          |
| TripleLift                                                                    | 349        | 39 s         | 111 ms         |
| [DMD Marketing](https://www.dmdconnects.com/)                                 | 235        | 39 s         | 165 ms         |
| Adloox                                                                        | 122        | 38 s         | 314 ms         |
| reEmbed                                                                       | 159        | 38 s         | 240 ms         |
| Fresh Relevance                                                               | 384        | 38 s         | 98 ms          |
| Github                                                                        | 426        | 38 s         | 88 ms          |
| News                                                                          | 182        | 37 s         | 203 ms         |
| [Concert](https://concert.io/)                                                | 297        | 37 s         | 123 ms         |
| [The Trade Desk](https://www.thetradedesk.com/)                               | 234        | 36 s         | 156 ms         |
| Permutive                                                                     | 202        | 36 s         | 177 ms         |
| LightWidget                                                                   | 444        | 36 s         | 80 ms          |
| Weborama                                                                      | 441        | 35 s         | 80 ms          |
| Snack Media                                                                   | 118        | 35 s         | 295 ms         |
| Typepad                                                                       | 181        | 34 s         | 190 ms         |
| Captify Media                                                                 | 292        | 34 s         | 116 ms         |
| Neodata                                                                       | 429        | 34 s         | 79 ms          |
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
| MLveda                                                                        | 78         | 31 s         | 399 ms         |
| DemandBase                                                                    | 376        | 31 s         | 82 ms          |
| Ghostery Enterprise                                                           | 234        | 30 s         | 129 ms         |
| AdSniper                                                                      | 123        | 30 s         | 242 ms         |
| Key CDN                                                                       | 170        | 30 s         | 175 ms         |
| Appier                                                                        | 347        | 29 s         | 85 ms          |
| SaleCycle                                                                     | 336        | 29 s         | 87 ms          |
| [Adition](https://www.adition.com)                                            | 324        | 29 s         | 88 ms          |
| Exponea                                                                       | 298        | 28 s         | 95 ms          |
| Unruly Media                                                                  | 273        | 28 s         | 102 ms         |
| Sajari Pty                                                                    | 202        | 27 s         | 135 ms         |
| SublimeSkinz                                                                  | 407        | 27 s         | 65 ms          |
| Ambassador                                                                    | 204        | 26 s         | 130 ms         |
| Advance Magazine Group                                                        | 160        | 26 s         | 165 ms         |
| Zarget                                                                        | 216        | 25 s         | 118 ms         |
| [Ipify](https://www.ipify.org)                                                | 227        | 25 s         | 110 ms         |
| Feedbackify                                                                   | 300        | 25 s         | 83 ms          |
| NetAffiliation                                                                | 212        | 24 s         | 116 ms         |
| linkpulse                                                                     | 332        | 24 s         | 74 ms          |
| Webtrekk                                                                      | 189        | 24 s         | 127 ms         |
| eXelate                                                                       | 263        | 24 s         | 91 ms          |
| CPEx                                                                          | 299        | 24 s         | 80 ms          |
| SnapWidget                                                                    | 624        | 23 s         | 37 ms          |
| DialogTech                                                                    | 266        | 23 s         | 87 ms          |
| ResponseTap                                                                   | 299        | 23 s         | 76 ms          |
| Sourcepoint                                                                   | 104        | 23 s         | 217 ms         |
| Republer                                                                      | 187        | 22 s         | 117 ms         |
| TechTarget                                                                    | 131        | 22 s         | 166 ms         |
| FLXone                                                                        | 164        | 22 s         | 132 ms         |
| VoiceFive                                                                     | 188        | 22 s         | 115 ms         |
| [Byside](http://www.byside.com)                                               | 162        | 21 s         | 131 ms         |
| ResponsiveVoice                                                               | 258        | 20 s         | 78 ms          |
| [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)           | 368        | 20 s         | 54 ms          |
| Transifex                                                                     | 104        | 20 s         | 191 ms         |
| Vee24                                                                         | 103        | 20 s         | 190 ms         |
| Edge Web Fonts                                                                | 243        | 19 s         | 78 ms          |
| Accordant Media                                                               | 196        | 18 s         | 92 ms          |
| Hupso Website Analyzer                                                        | 251        | 18 s         | 70 ms          |
| Aggregate Knowledge                                                           | 246        | 18 s         | 72 ms          |
| BannerFlow                                                                    | 222        | 18 s         | 80 ms          |
| Viacom                                                                        | 124        | 17 s         | 138 ms         |
| Sirv                                                                          | 177        | 17 s         | 96 ms          |
| Hull.js                                                                       | 117        | 17 s         | 142 ms         |
| LoyaltyLion                                                                   | 61         | 16 s         | 270 ms         |
| Customer.io                                                                   | 150        | 16 s         | 108 ms         |
| Talkable                                                                      | 198        | 16 s         | 81 ms          |
| Fonecall                                                                      | 67         | 16 s         | 236 ms         |
| Vibrant Media                                                                 | 153        | 15 s         | 101 ms         |
| Resonance Insights                                                            | 101        | 15 s         | 152 ms         |
| MaxMind                                                                       | 119        | 15 s         | 128 ms         |
| [GoSquared](https://www.gosquared.com)                                        | 193        | 15 s         | 76 ms          |
| Civic                                                                         | 188        | 14 s         | 77 ms          |
| [Marketo](https://www.marketo.com)                                            | 114        | 14 s         | 126 ms         |
| Exactag                                                                       | 129        | 14 s         | 111 ms         |
| Sweet Tooth                                                                   | 131        | 14 s         | 108 ms         |
| CleverTap                                                                     | 168        | 14 s         | 83 ms          |
| KISSmetrics                                                                   | 94         | 14 s         | 144 ms         |
| Betgenius                                                                     | 133        | 13 s         | 101 ms         |
| Omniconvert                                                                   | 159        | 13 s         | 83 ms          |
| SlimCut Media Outstream                                                       | 130        | 13 s         | 102 ms         |
| AnswerDash                                                                    | 90         | 13 s         | 145 ms         |
| Extole                                                                        | 92         | 13 s         | 139 ms         |
| Apester                                                                       | 153        | 12 s         | 81 ms          |
| Simpli.fi                                                                     | 147        | 12 s         | 85 ms          |
| Infinity Tracking                                                             | 151        | 12 s         | 82 ms          |
| OnScroll                                                                      | 145        | 12 s         | 85 ms          |
| Adobe Marketing Cloud                                                         | 141        | 12 s         | 87 ms          |
| Auto Link Maker                                                               | 134        | 12 s         | 91 ms          |
| AdRiver                                                                       | 113        | 12 s         | 106 ms         |
| DialogTech SourceTrak                                                         | 177        | 12 s         | 67 ms          |
| CyberSource (Visa)                                                            | 156        | 12 s         | 74 ms          |
| Woopra                                                                        | 172        | 12 s         | 67 ms          |
| Opinion Stage                                                                 | 127        | 11 s         | 88 ms          |
| Video Media Groep                                                             | 110        | 11 s         | 102 ms         |
| Adthink                                                                       | 92         | 11 s         | 121 ms         |
| Ziff Davis Tech                                                               | 126        | 11 s         | 87 ms          |
| Triblio                                                                       | 68         | 11 s         | 157 ms         |
| Exponential Interactive                                                       | 201        | 11 s         | 53 ms          |
| Friendbuy                                                                     | 131        | 11 s         | 80 ms          |
| Twitter Online Conversion Tracking                                            | 169        | 10 s         | 62 ms          |
| Impact Radius                                                                 | 138        | 10 s         | 75 ms          |
| Flickr                                                                        | 120        | 10 s         | 85 ms          |
| Covert Pics                                                                   | 139        | 10 s         | 73 ms          |
| Swoop                                                                         | 133        | 10 s         | 76 ms          |
| Pagefair                                                                      | 144        | 10 s         | 70 ms          |
| AWeber                                                                        | 147        | 10 s         | 67 ms          |
| Drip                                                                          | 204        | 10 s         | 48 ms          |
| SecuredVisit                                                                  | 136        | 10 s         | 72 ms          |
| Polldaddy                                                                     | 97         | 10 s         | 99 ms          |
| [Widespace](https://www.widespace.com)                                        | 118        | 9 s          | 80 ms          |
| FreakOut                                                                      | 147        | 9 s          | 64 ms          |
| LongTail Ad Solutions                                                         | 124        | 9 s          | 74 ms          |
| Tag Inspector                                                                 | 100        | 9 s          | 90 ms          |
| Cookie-Script.com                                                             | 87         | 9 s          | 98 ms          |
| Net Reviews                                                                   | 101        | 8 s          | 79 ms          |
| Freespee                                                                      | 96         | 8 s          | 83 ms          |
| Research Online                                                               | 115        | 8 s          | 68 ms          |
| Delta Projects AB                                                             | 128        | 8 s          | 59 ms          |
| Sailthru                                                                      | 127        | 7 s          | 58 ms          |
| Klevu Search                                                                  | 116        | 7 s          | 60 ms          |
| Amplitude Mobile Analytics                                                    | 83         | 6 s          | 72 ms          |
| UpSellit                                                                      | 56         | 6 s          | 104 ms         |
| [Fastly Insights](https://insights.fastlylabs.com)                            | 86         | 5 s          | 60 ms          |
| Browser-Update.org                                                            | 73         | 5 s          | 70 ms          |
| StatCounter                                                                   | 59         | 4 s          | 73 ms          |
| Soundest                                                                      | 55         | 4 s          | 76 ms          |
| Curalate                                                                      | 58         | 4 s          | 71 ms          |
| piano                                                                         | 57         | 2 s          | 36 ms          |

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

### Updating the website

The web code is located in `www/` directory of this repository. Open a PR to make changes.
