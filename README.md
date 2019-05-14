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
| 1    | ExoClick                                                       | 2,486   | 40 ms          |
| 2    | BlueKai                                                        | 2,526   | 74 ms          |
| 3    | Gemius                                                         | 7,900   | 75 ms          |
| 4    | Affiliate Window                                               | 1,043   | 77 ms          |
| 5    | MailMunch                                                      | 4,637   | 78 ms          |
| 6    | Crowd Control                                                  | 2,118   | 81 ms          |
| 7    | Rakuten Marketing                                              | 1,817   | 85 ms          |
| 8    | Tribal Fusion                                                  | 1,022   | 88 ms          |
| 9    | PubNation                                                      | 2,511   | 100 ms         |
| 10   | [Scorecard Research](https://www.scorecardresearch.com/)       | 13,146  | 100 ms         |
| 11   | PushCrew                                                       | 3,460   | 104 ms         |
| 12   | Constant Contact                                               | 1,324   | 108 ms         |
| 13   | [Outbrain](https://www.outbrain.com/)                          | 6,123   | 108 ms         |
| 14   | OptiMonk                                                       | 1,030   | 116 ms         |
| 15   | Unbounce                                                       | 2,102   | 117 ms         |
| 16   | [Adroll](https://www.adroll.com/)                              | 3,188   | 119 ms         |
| 17   | [Popads](https://www.popads.net/)                              | 4,628   | 122 ms         |
| 18   | TrafficStars                                                   | 1,010   | 122 ms         |
| 19   | [Rubicon Project](https://rubiconproject.com/)                 | 4,624   | 127 ms         |
| 20   | [Amazon Ads](https://ad.amazon.com/)                           | 21,711  | 129 ms         |
| 21   | DTSCOUT                                                        | 8,256   | 131 ms         |
| 22   | Adyoulike                                                      | 1,119   | 132 ms         |
| 23   | Skimbit                                                        | 9,803   | 136 ms         |
| 24   | fluct                                                          | 6,482   | 137 ms         |
| 25   | Refersion                                                      | 1,021   | 144 ms         |
| 26   | Digital ad Consortium                                          | 3,959   | 144 ms         |
| 27   | [Criteo](https://www.criteo.com/)                              | 73,060  | 153 ms         |
| 28   | SmartAdServer                                                  | 1,996   | 155 ms         |
| 29   | AudienceSearch                                                 | 6,156   | 156 ms         |
| 30   | Cxense                                                         | 4,274   | 165 ms         |
| 31   | [AOL / Oath / Verizon Media](https://www.oath.com/)            | 1,341   | 171 ms         |
| 32   | Sharethrough                                                   | 2,350   | 177 ms         |
| 33   | Tynt                                                           | 18,437  | 182 ms         |
| 34   | Microad                                                        | 2,015   | 183 ms         |
| 35   | Adform                                                         | 8,099   | 187 ms         |
| 36   | JuicyAds                                                       | 2,448   | 192 ms         |
| 37   | [Pubmatic](https://pubmatic.com/)                              | 4,639   | 193 ms         |
| 38   | [Bing Ads](https://bingads.microsoft.com)                      | 13,461  | 197 ms         |
| 39   | Index Exchange                                                 | 3,383   | 197 ms         |
| 40   | Smart AdServer                                                 | 2,965   | 219 ms         |
| 41   | Adloox                                                         | 1,996   | 226 ms         |
| 42   | [Yahoo!](https://www.yahoo.com/)                               | 2,421   | 227 ms         |
| 43   | Klaviyo                                                        | 6,646   | 257 ms         |
| 44   | [MGID](https://www.mgid.com/)                                  | 7,964   | 266 ms         |
| 45   | Sortable                                                       | 1,094   | 269 ms         |
| 46   | LongTail Ad Solutions                                          | 2,749   | 271 ms         |
| 47   | VigLink                                                        | 7,925   | 283 ms         |
| 48   | [AppNexus](https://www.appnexus.com/)                          | 8,478   | 289 ms         |
| 49   | Privy                                                          | 11,207  | 305 ms         |
| 50   | iBillboard                                                     | 3,265   | 322 ms         |
| 51   | [Market GID](https://www.marketgid.com/)                       | 1,421   | 369 ms         |
| 52   | Teads                                                          | 5,502   | 384 ms         |
| 53   | [Sizmek](https://www.sizmek.com/)                              | 3,971   | 428 ms         |
| 54   | [Taboola](https://www.taboola.com/)                            | 13,612  | 465 ms         |
| 55   | [Yandex Ads](https://yandex.com/adv/)                          | 23,195  | 501 ms         |
| 56   | sovrn                                                          | 3,202   | 503 ms         |
| 57   | Infolinks                                                      | 4,759   | 594 ms         |
| 58   | GumGum                                                         | 3,776   | 641 ms         |
| 59   | Admixer for Publishers                                         | 1,319   | 686 ms         |
| 60   | [WordAds](https://wordads.co/)                                 | 5,559   | 687 ms         |
| 61   | [OpenX](https://www.openx.com/)                                | 7,275   | 821 ms         |
| 62   | [DoubleVerify](https://www.doubleverify.com/)                  | 1,929   | 933 ms         |
| 63   | [Media.net](https://www.media.net/)                            | 3,825   | 956 ms         |
| 64   | [MediaVine](https://www.mediavine.com/)                        | 4,296   | 961 ms         |
| 65   | Vidible                                                        | 1,264   | 987 ms         |
| 66   | [Integral Ad Science](https://integralads.com/uk/)             | 8,575   | 1077 ms        |
| 67   | [Moat](https://moat.com/)                                      | 11,906  | 1141 ms        |
| 68   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 624,172 | 1285 ms        |
| 69   | AdMatic                                                        | 1,410   | 1329 ms        |
| 70   | LKQD                                                           | 1,115   | 1485 ms        |
| 71   | StickyADS.tv                                                   | 3,382   | 1666 ms        |
| 72   | [33 Across](https://33across.com/)                             | 5,937   | 1736 ms        |
| 73   | [fam](http://admin.fam-ad.com/report/)                         | 2,326   | 1783 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                              | 1,209     | 56 ms          |
| 2    | StatCounter                                                                  | 5,047     | 63 ms          |
| 3    | Amplitude Mobile Analytics                                                   | 1,327     | 72 ms          |
| 4    | etracker                                                                     | 1,907     | 78 ms          |
| 5    | Roxr Software                                                                | 2,185     | 78 ms          |
| 6    | Net Reviews                                                                  | 1,462     | 79 ms          |
| 7    | Heap                                                                         | 1,845     | 80 ms          |
| 8    | Trust Pilot                                                                  | 3,102     | 84 ms          |
| 9    | [Mixpanel](https://mixpanel.com/)                                            | 5,305     | 85 ms          |
| 10   | [Google Analytics](https://www.google.com/analytics/analytics/)              | 1,124,001 | 86 ms          |
| 11   | Searchanise                                                                  | 2,752     | 92 ms          |
| 12   | Chartbeat                                                                    | 6,874     | 100 ms         |
| 13   | [Hotjar](https://www.hotjar.com/)                                            | 111,933   | 104 ms         |
| 14   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 9,153     | 107 ms         |
| 15   | [Quantcast](https://www.quantcast.com)                                       | 6,539     | 112 ms         |
| 16   | Marchex                                                                      | 4,382     | 119 ms         |
| 17   | CallRail                                                                     | 5,021     | 120 ms         |
| 18   | Parse.ly                                                                     | 3,070     | 126 ms         |
| 19   | [Snowplow](https://snowplowanalytics.com/)                                   | 5,357     | 126 ms         |
| 20   | [Crazy Egg](https://www.crazyegg.com/)                                       | 11,926    | 130 ms         |
| 21   | [Marketo](https://www.marketo.com)                                           | 1,427     | 140 ms         |
| 22   | Monetate                                                                     | 1,009     | 158 ms         |
| 23   | Treasure Data                                                                | 12,262    | 162 ms         |
| 24   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 11,322    | 166 ms         |
| 25   | Evidon                                                                       | 1,311     | 170 ms         |
| 26   | [Snapchat](https://www.snapchat.com)                                         | 6,233     | 186 ms         |
| 27   | Gigya                                                                        | 1,994     | 192 ms         |
| 28   | [BounceX](https://www.bouncex.com/)                                          | 1,459     | 194 ms         |
| 29   | Nosto                                                                        | 1,901     | 197 ms         |
| 30   | [DigiTrust](http://www.digitru.st/)                                          | 4,583     | 197 ms         |
| 31   | [Segment](https://segment.com/)                                              | 8,047     | 198 ms         |
| 32   | [VWO](https://vwo.com)                                                       | 3,280     | 211 ms         |
| 33   | FullStory                                                                    | 5,563     | 227 ms         |
| 34   | ForeSee                                                                      | 1,441     | 255 ms         |
| 35   | [Optimizely](https://www.optimizely.com/)                                    | 12,417    | 267 ms         |
| 36   | Bazaarvoice                                                                  | 2,546     | 271 ms         |
| 37   | Ezoic                                                                        | 2,968     | 271 ms         |
| 38   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 5,332     | 348 ms         |
| 39   | Inspectlet                                                                   | 5,646     | 362 ms         |
| 40   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 242,224   | 376 ms         |
| 41   | [Radar](https://www.cedexis.com/radar/)                                      | 4,886     | 383 ms         |
| 42   | [Keen](https://keen.io/)                                                     | 3,241     | 384 ms         |
| 43   | SessionCam                                                                   | 1,564     | 385 ms         |
| 44   | [Histats](http://histats.com/)                                               | 13,523    | 463 ms         |
| 45   | Feefo.com                                                                    | 1,430     | 472 ms         |
| 46   | AB Tasty                                                                     | 3,435     | 559 ms         |
| 47   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 20,689    | 577 ms         |
| 48   | Mouseflow                                                                    | 1,545     | 595 ms         |
| 49   | [Lucky Orange](https://www.luckyorange.com/)                                 | 6,691     | 903 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 7,315     | 86 ms          |
| 2    | [Instagram](https://www.instagram.com)               | 6,195     | 92 ms          |
| 3    | Micropat                                             | 21,584    | 105 ms         |
| 4    | [Pinterest](https://pinterest.com/)                  | 16,532    | 112 ms         |
| 5    | Kakao                                                | 8,325     | 117 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)                | 14,000    | 122 ms         |
| 7    | [Facebook](https://www.facebook.com)                 | 1,025,971 | 144 ms         |
| 8    | [Twitter](https://twitter.com)                       | 259,833   | 172 ms         |
| 9    | [Yandex Share](https://yastatic.net/share2/share.js) | 22,930    | 173 ms         |
| 10   | [ShareThis](https://www.sharethis.com/)              | 28,888    | 313 ms         |
| 11   | [Shareaholic](https://www.shareaholic.com/)          | 11,846    | 412 ms         |
| 12   | [AddThis](http://www.addthis.com/)                   | 134,999   | 458 ms         |
| 13   | SocialShopWave                                       | 1,250     | 472 ms         |
| 14   | [PIXNET](https://www.pixnet.net/)                    | 26,582    | 925 ms         |
| 15   | [Tumblr](https://tumblr.com/)                        | 9,015     | 1445 ms        |
| 16   | LiveJournal                                          | 3,811     | 1464 ms        |

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
| 1    | Trusted Shops                                                             | 1,328   | 45 ms          |
| 2    | [Stripe](https://stripe.com)                                              | 5,020   | 81 ms          |
| 3    | [New Relic](https://newrelic.com/)                                        | 3,340   | 81 ms          |
| 4    | [OneSignal](https://onesignal.com/)                                       | 12,191  | 84 ms          |
| 5    | Siteimprove                                                               | 1,855   | 89 ms          |
| 6    | [Cookiebot](https://www.cookiebot.com/)                                   | 9,516   | 93 ms          |
| 7    | GetSiteControl                                                            | 2,901   | 94 ms          |
| 8    | iubenda                                                                   | 10,528  | 111 ms         |
| 9    | Bold Commerce                                                             | 11,282  | 145 ms         |
| 10   | Po.st                                                                     | 1,677   | 146 ms         |
| 11   | [AppDynamics](https://www.appdynamics.com/)                               | 1,496   | 149 ms         |
| 12   | Sift Science                                                              | 1,232   | 149 ms         |
| 13   | Swiftype                                                                  | 1,519   | 170 ms         |
| 14   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 279,510 | 195 ms         |
| 15   | Seznam                                                                    | 1,854   | 246 ms         |
| 16   | MaxCDN Enterprise                                                         | 1,785   | 265 ms         |
| 17   | Fastly                                                                    | 6,187   | 269 ms         |
| 18   | Rambler                                                                   | 9,145   | 270 ms         |
| 19   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 8,628   | 272 ms         |
| 20   | Affirm                                                                    | 1,188   | 285 ms         |
| 21   | [Google Maps](https://www.google.com/maps)                                | 120,242 | 312 ms         |
| 22   | [PayPal](https://paypal.com)                                              | 9,816   | 341 ms         |
| 23   | Secomapp                                                                  | 1,103   | 428 ms         |
| 24   | Datacamp                                                                  | 12,603  | 434 ms         |
| 25   | [Sentry](https://sentry.io/)                                              | 15,661  | 462 ms         |
| 26   | [Distil Networks](https://www.distilnetworks.com/)                        | 10,893  | 486 ms         |
| 27   | [Yandex APIs](https://yandex.ru/)                                         | 21,677  | 1231 ms        |
| 28   | Mapbox                                                                    | 3,686   | 1384 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                  | Usage   | Average Impact |
| ---- | ----------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](http://www.blogger.com/)                    | 10,705  | 64 ms          |
| 2    | [WordPress](https://wp.com/)                          | 105,874 | 177 ms         |
| 3    | [Dealer](https://www.dealer.com/)                     | 9,877   | 515 ms         |
| 4    | [Shopify](https://www.shopify.com/)                   | 71,063  | 633 ms         |
| 5    | [CDK Dealer Management](https://www.cdkglobal.com/us) | 4,210   | 1036 ms        |
| 6    | [Squarespace](https://www.squarespace.com/)           | 36,919  | 1133 ms        |
| 7    | [Hatena Blog](https://hatenablog.com/)                | 19,231  | 1282 ms        |
| 8    | [Weebly](https://www.weebly.com/)                     | 14,462  | 1305 ms        |
| 9    | [Wix](https://www.wix.com/)                           | 40,752  | 5393 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [RD Station](https://www.rdstation.com/en/) | 3,457  | 76 ms          |
| 2    | Bronto Software                             | 1,110  | 132 ms         |
| 3    | [Listrak](https://www.listrak.com/)         | 1,070  | 145 ms         |
| 4    | [Hubspot](https://hubspot.com/)             | 24,759 | 156 ms         |
| 5    | [Drift](https://www.drift.com/)             | 5,072  | 163 ms         |
| 6    | Ve                                          | 3,307  | 168 ms         |
| 7    | [Mailchimp](https://mailchimp.com/)         | 17,626 | 223 ms         |
| 8    | [Yotpo](https://www.yotpo.com/)             | 10,307 | 238 ms         |
| 9    | [OptinMonster](https://optinmonster.com/)   | 7,556  | 300 ms         |
| 10   | [Beeketing](https://beeketing.com/)         | 20,117 | 449 ms         |
| 11   | Bigcommerce                                 | 7,846  | 537 ms         |
| 12   | [Albacross](https://albacross.com/)         | 1,737  | 753 ms         |
| 13   | [Sumo](https://sumo.com/)                   | 20,502 | 794 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | Foursixty                                        | 1,129  | 82 ms          |
| 2    | iPerceptions                                     | 2,822  | 92 ms          |
| 3    | [LivePerson](https://www.liveperson.com/)        | 4,405  | 129 ms         |
| 4    | Comm100                                          | 1,643  | 141 ms         |
| 5    | [LiveChat](https://www.livechatinc.com/)         | 10,498 | 154 ms         |
| 6    | Pure Chat                                        | 4,029  | 169 ms         |
| 7    | iAdvize SAS                                      | 1,060  | 251 ms         |
| 8    | [Tawk.to](https://www.tawk.to/)                  | 46,981 | 343 ms         |
| 9    | [Jivochat](https://www.jivochat.com/)            | 28,194 | 360 ms         |
| 10   | [Tidio Live Chat](https://www.tidiochat.com/en/) | 6,518  | 368 ms         |
| 11   | [Help Scout](https://www.helpscout.net/)         | 1,626  | 372 ms         |
| 12   | Dynamic Yield                                    | 1,658  | 459 ms         |
| 13   | [Intercom](https://www.intercom.com/)            | 13,452 | 500 ms         |
| 14   | LiveTex                                          | 2,337  | 510 ms         |
| 15   | [Olark](https://www.olark.com/)                  | 7,513  | 626 ms         |
| 16   | [ZenDesk](https://zendesk.com/)                  | 68,198 | 697 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                | Usage  | Average Impact |
| ---- | ----------------------------------- | ------ | -------------- |
| 1    | Accuweather                         | 1,510  | 75 ms          |
| 2    | OpenTable                           | 2,179  | 134 ms         |
| 3    | Embedly                             | 3,082  | 212 ms         |
| 4    | [AMP](https://www.ampproject.org/)  | 46,495 | 349 ms         |
| 5    | Medium                              | 1,329  | 376 ms         |
| 6    | [Hotmart](https://www.hotmart.com/) | 1,113  | 828 ms         |

<a name="library"></a>

#### Libraries

These are mostly open source libraries (e.g. jQuery) served over different public CDNs. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the libraries being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 10,620  | 91 ms          |
| 2    | [Yandex CDN](https://yandex.ru/)                             | 1,939   | 155 ms         |
| 3    | [FontAwesome CDN](https://fontawesome.com/)                  | 19,326  | 160 ms         |
| 4    | Microsoft Hosted Libs                                        | 4,876   | 185 ms         |
| 5    | Monotype                                                     | 4,640   | 200 ms         |
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
| 1    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 481,506 | 115 ms         |
| 2    | [BrightTag / Signal](https://www.signal.co)                                   | 6,968   | 115 ms         |
| 3    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 27,224  | 334 ms         |
| 4    | [Tealium](https://tealium.com/)                                               | 12,175  | 353 ms         |
| 5    | [Ensighten](https://www.ensighten.com/)                                       | 5,840   | 390 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage   | Average Impact |
| ---- | ------------------------------------------------- | ------- | -------------- |
| 1    | [Amazon Web Services](https://aws.amazon.com/s3/) | 47,656  | 181 ms         |
| 2    | [All Other 3rd Parties](#by-category)             | 913,172 | 332 ms         |
| 3    | Pagely                                            | 1,018   | 346 ms         |
| 4    | [Parking Crew](http://parkingcrew.net/)           | 5,762   | 484 ms         |
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
| [Facebook](https://www.facebook.com)                                          | 1,025,971  | 147,647 s    | 144 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)               | 1,124,001  | 96,913 s     | 86 ms          |
| [Yandex Metrica](https://metrica.yandex.com/about?)                           | 242,224    | 91,128 s     | 376 ms         |
| [AddThis](http://www.addthis.com/)                                            | 134,999    | 61,857 s     | 458 ms         |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 481,506    | 55,435 s     | 115 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)     | 279,510    | 54,369 s     | 195 ms         |
| [ZenDesk](https://zendesk.com/)                                               | 68,198     | 47,548 s     | 697 ms         |
| [Shopify](https://www.shopify.com/)                                           | 71,063     | 44,957 s     | 633 ms         |
| [Twitter](https://twitter.com)                                                | 259,833    | 44,660 s     | 172 ms         |
| [Squarespace](https://www.squarespace.com/)                                   | 36,919     | 41,812 s     | 1133 ms        |
| [Google Maps](https://www.google.com/maps)                                    | 120,242    | 37,497 s     | 312 ms         |
| [jQuery CDN](https://code.jquery.com/)                                        | 147,162    | 33,468 s     | 227 ms         |
| [Yandex APIs](https://yandex.ru/)                                             | 21,677     | 26,687 s     | 1231 ms        |
| [Hatena Blog](https://hatenablog.com/)                                        | 19,231     | 24,654 s     | 1282 ms        |
| [PIXNET](https://www.pixnet.net/)                                             | 26,582     | 24,586 s     | 925 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                          | 90,131     | 23,395 s     | 260 ms         |
| [Weebly](https://www.weebly.com/)                                             | 14,462     | 18,877 s     | 1305 ms        |
| [WordPress](https://wp.com/)                                                  | 105,874    | 18,740 s     | 177 ms         |
| [Sumo](https://sumo.com/)                                                     | 20,502     | 16,288 s     | 794 ms         |
| [AMP](https://www.ampproject.org/)                                            | 46,495     | 16,225 s     | 349 ms         |
| [Tawk.to](https://www.tawk.to/)                                               | 46,981     | 16,092 s     | 343 ms         |
| [Moat](https://moat.com/)                                                     | 11,906     | 13,589 s     | 1141 ms        |
| [Tumblr](https://tumblr.com/)                                                 | 9,015      | 13,030 s     | 1445 ms        |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)            | 20,689     | 11,934 s     | 577 ms         |
| [Hotjar](https://www.hotjar.com/)                                             | 111,933    | 11,672 s     | 104 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                         | 23,195     | 11,612 s     | 501 ms         |
| [Criteo](https://www.criteo.com/)                                             | 73,060     | 11,206 s     | 153 ms         |
| [33 Across](https://33across.com/)                                            | 5,937      | 10,306 s     | 1736 ms        |
| [Jivochat](https://www.jivochat.com/)                                         | 28,194     | 10,150 s     | 360 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                            | 8,575      | 9,236 s      | 1077 ms        |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 27,224     | 9,105 s      | 334 ms         |
| [ShareThis](https://www.sharethis.com/)                                       | 28,888     | 9,040 s      | 313 ms         |
| [Beeketing](https://beeketing.com/)                                           | 20,117     | 9,034 s      | 449 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                             | 47,656     | 8,624 s      | 181 ms         |
| [Wistia](https://wistia.com/)                                                 | 10,643     | 8,098 s      | 761 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                     | 23,200     | 7,801 s      | 336 ms         |
| [Sentry](https://sentry.io/)                                                  | 15,661     | 7,237 s      | 462 ms         |
| [Intercom](https://www.intercom.com/)                                         | 13,452     | 6,729 s      | 500 ms         |
| [Taboola](https://www.taboola.com/)                                           | 13,612     | 6,328 s      | 465 ms         |
| [Histats](http://histats.com/)                                                | 13,523     | 6,264 s      | 463 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                     | 1,713      | 6,196 s      | 3617 ms        |
| [Lucky Orange](https://www.luckyorange.com/)                                  | 6,691      | 6,042 s      | 903 ms         |
| [OpenX](https://www.openx.com/)                                               | 7,275      | 5,971 s      | 821 ms         |
| StickyADS.tv                                                                  | 3,382      | 5,634 s      | 1666 ms        |
| LiveJournal                                                                   | 3,811      | 5,578 s      | 1464 ms        |
| Datacamp                                                                      | 12,603     | 5,465 s      | 434 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                            | 10,893     | 5,291 s      | 486 ms         |
| Mapbox                                                                        | 3,686      | 5,100 s      | 1384 ms        |
| [Dealer](https://www.dealer.com/)                                             | 9,877      | 5,087 s      | 515 ms         |
| [Shareaholic](https://www.shareaholic.com/)                                   | 11,846     | 4,876 s      | 412 ms         |
| [YouTube](https://youtube.com)                                                | 30,547     | 4,769 s      | 156 ms         |
| [Olark](https://www.olark.com/)                                               | 7,513      | 4,702 s      | 626 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                         | 4,210      | 4,362 s      | 1036 ms        |
| [Tealium](https://tealium.com/)                                               | 12,175     | 4,301 s      | 353 ms         |
| Bigcommerce                                                                   | 7,846      | 4,217 s      | 537 ms         |
| [fam](http://admin.fam-ad.com/report/)                                        | 2,326      | 4,146 s      | 1783 ms        |
| [MediaVine](https://www.mediavine.com/)                                       | 4,296      | 4,127 s      | 961 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                          | 22,930     | 3,965 s      | 173 ms         |
| [Mailchimp](https://mailchimp.com/)                                           | 17,626     | 3,924 s      | 223 ms         |
| [Hubspot](https://hubspot.com/)                                               | 24,759     | 3,870 s      | 156 ms         |
| [WordAds](https://wordads.co/)                                                | 5,559      | 3,817 s      | 687 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                  | 5,100      | 3,677 s      | 721 ms         |
| [Media.net](https://www.media.net/)                                           | 3,825      | 3,658 s      | 956 ms         |
| Privy                                                                         | 11,207     | 3,421 s      | 305 ms         |
| Tynt                                                                          | 18,437     | 3,351 s      | 182 ms         |
| [PayPal](https://paypal.com)                                                  | 9,816      | 3,343 s      | 341 ms         |
| [Optimizely](https://www.optimizely.com/)                                     | 12,417     | 3,314 s      | 267 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                   | 19,326     | 3,102 s      | 160 ms         |
| uLogin                                                                        | 2,451      | 2,969 s      | 1211 ms        |
| Infolinks                                                                     | 4,759      | 2,828 s      | 594 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                          | 21,711     | 2,793 s      | 129 ms         |
| [Parking Crew](http://parkingcrew.net/)                                       | 5,762      | 2,788 s      | 484 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                     | 13,461     | 2,657 s      | 197 ms         |
| Rambler                                                                       | 9,145      | 2,466 s      | 270 ms         |
| [Yotpo](https://www.yotpo.com/)                                               | 10,307     | 2,454 s      | 238 ms         |
| [AppNexus](https://www.appnexus.com/)                                         | 8,478      | 2,448 s      | 289 ms         |
| GumGum                                                                        | 3,776      | 2,421 s      | 641 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                              | 6,518      | 2,398 s      | 368 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                | 8,628      | 2,343 s      | 272 ms         |
| [Ensighten](https://www.ensighten.com/)                                       | 5,840      | 2,280 s      | 390 ms         |
| Micropat                                                                      | 21,584     | 2,270 s      | 105 ms         |
| [OptinMonster](https://optinmonster.com/)                                     | 7,556      | 2,264 s      | 300 ms         |
| VigLink                                                                       | 7,925      | 2,243 s      | 283 ms         |
| [MGID](https://www.mgid.com/)                                                 | 7,964      | 2,122 s      | 266 ms         |
| Teads                                                                         | 5,502      | 2,113 s      | 384 ms         |
| Inspectlet                                                                    | 5,646      | 2,042 s      | 362 ms         |
| Treasure Data                                                                 | 12,262     | 1,987 s      | 162 ms         |
| AB Tasty                                                                      | 3,435      | 1,920 s      | 559 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)  | 11,322     | 1,885 s      | 166 ms         |
| AdMatic                                                                       | 1,410      | 1,873 s      | 1329 ms        |
| [Radar](https://www.cedexis.com/radar/)                                       | 4,886      | 1,871 s      | 383 ms         |
| Blindado                                                                      | 760        | 1,859 s      | 2446 ms        |
| [Pinterest](https://pinterest.com/)                                           | 16,532     | 1,855 s      | 112 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 5,332      | 1,853 s      | 348 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                 | 1,929      | 1,800 s      | 933 ms         |
| [LinkedIn](https://www.linkedin.com/)                                         | 14,000     | 1,710 s      | 122 ms         |
| Klaviyo                                                                       | 6,646      | 1,708 s      | 257 ms         |
| [Sizmek](https://www.sizmek.com/)                                             | 3,971      | 1,700 s      | 428 ms         |
| Fastly                                                                        | 6,187      | 1,667 s      | 269 ms         |
| LKQD                                                                          | 1,115      | 1,655 s      | 1485 ms        |
| Bold Commerce                                                                 | 11,282     | 1,635 s      | 145 ms         |
| [LiveChat](https://www.livechatinc.com/)                                      | 10,498     | 1,613 s      | 154 ms         |
| sovrn                                                                         | 3,202      | 1,610 s      | 503 ms         |
| [Segment](https://segment.com/)                                               | 8,047      | 1,593 s      | 198 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                        | 11,926     | 1,555 s      | 130 ms         |
| Adform                                                                        | 8,099      | 1,512 s      | 187 ms         |
| Skimbit                                                                       | 9,803      | 1,335 s      | 136 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                      | 13,146     | 1,316 s      | 100 ms         |
| [Albacross](https://albacross.com/)                                           | 1,737      | 1,308 s      | 753 ms         |
| FullStory                                                                     | 5,563      | 1,264 s      | 227 ms         |
| Vidible                                                                       | 1,264      | 1,248 s      | 987 ms         |
| [Keen](https://keen.io/)                                                      | 3,241      | 1,245 s      | 384 ms         |
| LiveTex                                                                       | 2,337      | 1,192 s      | 510 ms         |
| iubenda                                                                       | 10,528     | 1,170 s      | 111 ms         |
| [Snapchat](https://www.snapchat.com)                                          | 6,233      | 1,162 s      | 186 ms         |
| Esri ArcGIS                                                                   | 978        | 1,150 s      | 1176 ms        |
| DTSCOUT                                                                       | 8,256      | 1,085 s      | 131 ms         |
| iBillboard                                                                    | 3,265      | 1,050 s      | 322 ms         |
| Between Digital                                                               | 915        | 1,036 s      | 1132 ms        |
| [OneSignal](https://onesignal.com/)                                           | 12,191     | 1,025 s      | 84 ms          |
| Yieldmo                                                                       | 934        | 984 s        | 1053 ms        |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 9,153      | 978 s        | 107 ms         |
| Kakao                                                                         | 8,325      | 971 s        | 117 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                     | 10,620     | 971 s        | 91 ms          |
| AudienceSearch                                                                | 6,156      | 958 s        | 156 ms         |
| Monotype                                                                      | 4,640      | 930 s        | 200 ms         |
| [Hotmart](https://www.hotmart.com/)                                           | 1,113      | 922 s        | 828 ms         |
| Mouseflow                                                                     | 1,545      | 919 s        | 595 ms         |
| Admixer for Publishers                                                        | 1,319      | 905 s        | 686 ms         |
| [DigiTrust](http://www.digitru.st/)                                           | 4,583      | 903 s        | 197 ms         |
| Microsoft Hosted Libs                                                         | 4,876      | 901 s        | 185 ms         |
| [Pubmatic](https://pubmatic.com/)                                             | 4,639      | 894 s        | 193 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                       | 9,516      | 886 s        | 93 ms          |
| fluct                                                                         | 6,482      | 886 s        | 137 ms         |
| [Drift](https://www.drift.com/)                                               | 5,072      | 827 s        | 163 ms         |
| Sekindo                                                                       | 457        | 806 s        | 1763 ms        |
| Ezoic                                                                         | 2,968      | 805 s        | 271 ms         |
| [BrightTag / Signal](https://www.signal.co)                                   | 6,968      | 804 s        | 115 ms         |
| Dynamic Yield                                                                 | 1,658      | 762 s        | 459 ms         |
| LongTail Ad Solutions                                                         | 2,749      | 746 s        | 271 ms         |
| [Unpkg](https://unpkg.com)                                                    | 2,947      | 740 s        | 251 ms         |
| [Quantcast](https://www.quantcast.com)                                        | 6,539      | 730 s        | 112 ms         |
| Cxense                                                                        | 4,274      | 704 s        | 165 ms         |
| [VWO](https://vwo.com)                                                        | 3,280      | 690 s        | 211 ms         |
| [Blogger](http://www.blogger.com/)                                            | 10,705     | 690 s        | 64 ms          |
| Chartbeat                                                                     | 6,874      | 689 s        | 100 ms         |
| Bazaarvoice                                                                   | 2,546      | 689 s        | 271 ms         |
| Pure Chat                                                                     | 4,029      | 682 s        | 169 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                    | 5,357      | 676 s        | 126 ms         |
| Feefo.com                                                                     | 1,430      | 675 s        | 472 ms         |
| Okas Concepts                                                                 | 598        | 672 s        | 1124 ms        |
| Index Exchange                                                                | 3,383      | 668 s        | 197 ms         |
| [Outbrain](https://www.outbrain.com/)                                         | 6,123      | 662 s        | 108 ms         |
| Embedly                                                                       | 3,082      | 653 s        | 212 ms         |
| WebpageFX                                                                     | 376        | 648 s        | 1724 ms        |
| Smart AdServer                                                                | 2,965      | 648 s        | 219 ms         |
| [VK](https://vk.com/)                                                         | 7,315      | 629 s        | 86 ms          |
| [Help Scout](https://www.helpscout.net/)                                      | 1,626      | 605 s        | 372 ms         |
| SessionCam                                                                    | 1,564      | 603 s        | 385 ms         |
| CallRail                                                                      | 5,021      | 602 s        | 120 ms         |
| Gemius                                                                        | 7,900      | 596 s        | 75 ms          |
| SocialShopWave                                                                | 1,250      | 590 s        | 472 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                | 4,624      | 589 s        | 127 ms         |
| [Instagram](https://www.instagram.com)                                        | 6,195      | 572 s        | 92 ms          |
| Digital ad Consortium                                                         | 3,959      | 570 s        | 144 ms         |
| [LivePerson](https://www.liveperson.com/)                                     | 4,405      | 566 s        | 129 ms         |
| [Popads](https://www.popads.net/)                                             | 4,628      | 564 s        | 122 ms         |
| IBM Digital Analytics                                                         | 925        | 557 s        | 602 ms         |
| Ve                                                                            | 3,307      | 555 s        | 168 ms         |
| [Yahoo!](https://www.yahoo.com/)                                              | 2,421      | 549 s        | 227 ms         |
| [Market GID](https://www.marketgid.com/)                                      | 1,421      | 524 s        | 369 ms         |
| Marchex                                                                       | 4,382      | 521 s        | 119 ms         |
| Kaltura Video Platform                                                        | 551        | 503 s        | 913 ms         |
| Medium                                                                        | 1,329      | 500 s        | 376 ms         |
| Meetrics                                                                      | 774        | 499 s        | 645 ms         |
| Secomapp                                                                      | 1,103      | 473 s        | 428 ms         |
| MaxCDN Enterprise                                                             | 1,785      | 472 s        | 265 ms         |
| JuicyAds                                                                      | 2,448      | 471 s        | 192 ms         |
| Seznam                                                                        | 1,854      | 456 s        | 246 ms         |
| Adloox                                                                        | 1,996      | 451 s        | 226 ms         |
| [Mixpanel](https://mixpanel.com/)                                             | 5,305      | 451 s        | 85 ms          |
| LeasdBoxer                                                                    | 116        | 440 s        | 3792 ms        |
| Sharethrough                                                                  | 2,350      | 416 s        | 177 ms         |
| [Stripe](https://stripe.com)                                                  | 5,020      | 405 s        | 81 ms          |
| Digioh                                                                        | 768        | 395 s        | 515 ms         |
| PerimeterX Bot Defender                                                       | 297        | 392 s        | 1320 ms        |
| Parse.ly                                                                      | 3,070      | 385 s        | 126 ms         |
| Gigya                                                                         | 1,994      | 384 s        | 192 ms         |
| [Adroll](https://www.adroll.com/)                                             | 3,188      | 381 s        | 119 ms         |
| Nosto                                                                         | 1,901      | 374 s        | 197 ms         |
| Microad                                                                       | 2,015      | 368 s        | 183 ms         |
| ForeSee                                                                       | 1,441      | 367 s        | 255 ms         |
| MailMunch                                                                     | 4,637      | 363 s        | 78 ms          |
| PushCrew                                                                      | 3,460      | 359 s        | 104 ms         |
| Hola Networks                                                                 | 175        | 357 s        | 2038 ms        |
| Ecwid                                                                         | 703        | 354 s        | 504 ms         |
| Audience 360                                                                  | 420        | 353 s        | 842 ms         |
| Pagely                                                                        | 1,018      | 353 s        | 346 ms         |
| [Disqus](http://disqus.com/)                                                  | 855        | 352 s        | 412 ms         |
| Cedato                                                                        | 100        | 351 s        | 3513 ms        |
| TrackJS                                                                       | 860        | 347 s        | 404 ms         |
| Affirm                                                                        | 1,188      | 339 s        | 285 ms         |
| Bugsnag                                                                       | 843        | 331 s        | 393 ms         |
| Clicktale                                                                     | 936        | 328 s        | 351 ms         |
| Underdog Media                                                                | 359        | 324 s        | 904 ms         |
| StatCounter                                                                   | 5,047      | 320 s        | 63 ms          |
| Pixlee                                                                        | 371        | 313 s        | 843 ms         |
| Zmags                                                                         | 182        | 309 s        | 1699 ms        |
| SmartAdServer                                                                 | 1,996      | 309 s        | 155 ms         |
| Perfect Market                                                                | 889        | 303 s        | 341 ms         |
| Best Of Media S.A.                                                            | 237        | 301 s        | 1271 ms        |
| [Yandex CDN](https://yandex.ru/)                                              | 1,939      | 300 s        | 155 ms         |
| [Vox Media](https://www.voxmedia.com/)                                        | 708        | 296 s        | 418 ms         |
| Sortable                                                                      | 1,094      | 294 s        | 269 ms         |
| OpenTable                                                                     | 2,179      | 291 s        | 134 ms         |
| [BounceX](https://www.bouncex.com/)                                           | 1,459      | 283 s        | 194 ms         |
| GetSiteControl                                                                | 2,901      | 273 s        | 94 ms          |
| [New Relic](https://newrelic.com/)                                            | 3,340      | 272 s        | 81 ms          |
| iAdvize SAS                                                                   | 1,060      | 267 s        | 251 ms         |
| Wishpond Technologies                                                         | 518        | 265 s        | 512 ms         |
| piano                                                                         | 856        | 264 s        | 309 ms         |
| Adthink                                                                       | 486        | 264 s        | 543 ms         |
| [RD Station](https://www.rdstation.com/en/)                                   | 3,457      | 262 s        | 76 ms          |
| Trust Pilot                                                                   | 3,102      | 262 s        | 84 ms          |
| iPerceptions                                                                  | 2,822      | 261 s        | 92 ms          |
| Swiftype                                                                      | 1,519      | 258 s        | 170 ms         |
| UserReport                                                                    | 884        | 255 s        | 288 ms         |
| Yieldify                                                                      | 729        | 255 s        | 350 ms         |
| Searchanise                                                                   | 2,752      | 252 s        | 92 ms          |
| PubNation                                                                     | 2,511      | 251 s        | 100 ms         |
| Media Management Technologies                                                 | 596        | 249 s        | 417 ms         |
| Ooyala                                                                        | 337        | 247 s        | 734 ms         |
| Unbounce                                                                      | 2,102      | 246 s        | 117 ms         |
| Decibel Insight                                                               | 551        | 246 s        | 447 ms         |
| Po.st                                                                         | 1,677      | 245 s        | 146 ms         |
| Fort Awesome                                                                  | 740        | 244 s        | 330 ms         |
| Fraudlogix                                                                    | 872        | 239 s        | 274 ms         |
| Expedia                                                                       | 299        | 235 s        | 786 ms         |
| Comm100                                                                       | 1,643      | 231 s        | 141 ms         |
| [AOL / Oath / Verizon Media](https://www.oath.com/)                           | 1,341      | 229 s        | 171 ms         |
| Maxymiser                                                                     | 831        | 226 s        | 272 ms         |
| PhotoBucket                                                                   | 737        | 226 s        | 306 ms         |
| [AppDynamics](https://www.appdynamics.com/)                                   | 1,496      | 224 s        | 149 ms         |
| Evidon                                                                        | 1,311      | 223 s        | 170 ms         |
| Trip Advisor                                                                  | 177        | 221 s        | 1250 ms        |
| Opta                                                                          | 337        | 221 s        | 655 ms         |
| Celtra                                                                        | 568        | 218 s        | 383 ms         |
| Technorati                                                                    | 478        | 215 s        | 451 ms         |
| ShopiMind                                                                     | 324        | 212 s        | 655 ms         |
| [Media Math](http://www.mediamath.com/)                                       | 604        | 210 s        | 348 ms         |
| Signyfyd                                                                      | 202        | 209 s        | 1033 ms        |
| GitHub                                                                        | 818        | 208 s        | 254 ms         |
| Adocean                                                                       | 900        | 207 s        | 230 ms         |
| [Marketo](https://www.marketo.com)                                            | 1,427      | 200 s        | 140 ms         |
| Opentag                                                                       | 976        | 197 s        | 202 ms         |
| SearchSpring                                                                  | 299        | 195 s        | 653 ms         |
| Booking.com                                                                   | 685        | 190 s        | 277 ms         |
| Connatix                                                                      | 201        | 187 s        | 932 ms         |
| BlueKai                                                                       | 2,526      | 186 s        | 74 ms          |
| Sift Science                                                                  | 1,232      | 184 s        | 149 ms         |
| Janrain                                                                       | 153        | 178 s        | 1167 ms        |
| Crowd Control                                                                 | 2,118      | 172 s        | 81 ms          |
| ThreatMetrix                                                                  | 165        | 171 s        | 1039 ms        |
| FirstImpression                                                               | 302        | 171 s        | 566 ms         |
| Roxr Software                                                                 | 2,185      | 170 s        | 78 ms          |
| Rackspace                                                                     | 561        | 168 s        | 299 ms         |
| Adtech (AOL)                                                                  | 214        | 168 s        | 783 ms         |
| Siteimprove                                                                   | 1,855      | 164 s        | 89 ms          |
| Adverline Board                                                               | 565        | 164 s        | 291 ms         |
| smartclip                                                                     | 393        | 163 s        | 415 ms         |
| LoopMe                                                                        | 487        | 160 s        | 329 ms         |
| IPONWEB                                                                       | 899        | 160 s        | 178 ms         |
| Qubit Deliver                                                                 | 354        | 159 s        | 450 ms         |
| Monetate                                                                      | 1,009      | 159 s        | 158 ms         |
| [Listrak](https://www.listrak.com/)                                           | 1,070      | 155 s        | 145 ms         |
| Rakuten Marketing                                                             | 1,817      | 155 s        | 85 ms          |
| [24]7                                                                         | 137        | 151 s        | 1100 ms        |
| Chitika                                                                       | 711        | 150 s        | 211 ms         |
| etracker                                                                      | 1,907      | 148 s        | 78 ms          |
| Heap                                                                          | 1,845      | 147 s        | 80 ms          |
| Adyoulike                                                                     | 1,119      | 147 s        | 132 ms         |
| Flowplayer                                                                    | 418        | 147 s        | 352 ms         |
| Refersion                                                                     | 1,021      | 147 s        | 144 ms         |
| Bronto Software                                                               | 1,110      | 146 s        | 132 ms         |
| PERFORM                                                                       | 96         | 144 s        | 1505 ms        |
| Constant Contact                                                              | 1,324      | 142 s        | 108 ms         |
| [Freshdesk](https://freshdesk.com/)                                           | 898        | 141 s        | 157 ms         |
| SpotXchange                                                                   | 464        | 139 s        | 300 ms         |
| AvantLink                                                                     | 156        | 139 s        | 888 ms         |
| TagCommander                                                                  | 962        | 132 s        | 138 ms         |
| MonetizeMore                                                                  | 111        | 129 s        | 1165 ms        |
| AddShoppers                                                                   | 841        | 128 s        | 153 ms         |
| eBay                                                                          | 681        | 128 s        | 188 ms         |
| Picreel                                                                       | 569        | 127 s        | 223 ms         |
| One by AOL                                                                    | 592        | 125 s        | 212 ms         |
| WisePops                                                                      | 501        | 125 s        | 250 ms         |
| PowerReviews                                                                  | 612        | 125 s        | 205 ms         |
| Clerk.io ApS                                                                  | 738        | 124 s        | 169 ms         |
| TrafficStars                                                                  | 1,010      | 123 s        | 122 ms         |
| Convert Insights                                                              | 955        | 123 s        | 129 ms         |
| Pardot                                                                        | 381        | 121 s        | 318 ms         |
| OptiMonk                                                                      | 1,030      | 120 s        | 116 ms         |
| Marketplace Web Service                                                       | 211        | 119 s        | 562 ms         |
| StreamRail                                                                    | 72         | 117 s        | 1631 ms        |
| Curalate                                                                      | 392        | 116 s        | 297 ms         |
| Smarter Click                                                                 | 430        | 116 s        | 269 ms         |
| Skype                                                                         | 669        | 115 s        | 172 ms         |
| Net Reviews                                                                   | 1,462      | 115 s        | 79 ms          |
| Bizible                                                                       | 858        | 114 s        | 133 ms         |
| Accuweather                                                                   | 1,510      | 113 s        | 75 ms          |
| Interpublic Group                                                             | 459        | 111 s        | 242 ms         |
| Revcontent                                                                    | 961        | 111 s        | 116 ms         |
| Mather Economics                                                              | 554        | 110 s        | 199 ms         |
| Global-e                                                                      | 228        | 108 s        | 473 ms         |
| Cloudinary                                                                    | 379        | 107 s        | 283 ms         |
| Forensiq                                                                      | 494        | 105 s        | 212 ms         |
| plista                                                                        | 903        | 105 s        | 116 ms         |
| Sparkflow                                                                     | 353        | 104 s        | 294 ms         |
| Pictela (AOL)                                                                 | 209        | 103 s        | 495 ms         |
| Adnium                                                                        | 333        | 102 s        | 307 ms         |
| Snacktools                                                                    | 337        | 101 s        | 301 ms         |
| Survicate                                                                     | 540        | 101 s        | 187 ms         |
| LinkedIn Ads                                                                  | 633        | 100 s        | 158 ms         |
| ExoClick                                                                      | 2,486      | 100 s        | 40 ms          |
| Symantec                                                                      | 863        | 99 s         | 114 ms         |
| Dailymotion                                                                   | 232        | 98 s         | 424 ms         |
| Amplitude Mobile Analytics                                                    | 1,327      | 96 s         | 72 ms          |
| Mobify                                                                        | 222        | 96 s         | 431 ms         |
| Polar Mobile Group                                                            | 477        | 95 s         | 200 ms         |
| ZEDO                                                                          | 302        | 95 s         | 316 ms         |
| Playbuzz                                                                      | 343        | 95 s         | 278 ms         |
| OwnerIQ                                                                       | 749        | 95 s         | 127 ms         |
| Livefyre                                                                      | 258        | 94 s         | 365 ms         |
| Kargo                                                                         | 77         | 94 s         | 1219 ms        |
| Shopgate                                                                      | 395        | 93 s         | 235 ms         |
| Foursixty                                                                     | 1,129      | 92 s         | 82 ms          |
| ReTargeter                                                                    | 256        | 92 s         | 358 ms         |
| Tail Target                                                                   | 877        | 91 s         | 104 ms         |
| issuu                                                                         | 797        | 91 s         | 114 ms         |
| WebEngage                                                                     | 744        | 91 s         | 122 ms         |
| Sidecar                                                                       | 334        | 91 s         | 272 ms         |
| Tribal Fusion                                                                 | 1,022      | 90 s         | 88 ms          |
| iovation                                                                      | 949        | 89 s         | 94 ms          |
| SpringServer                                                                  | 95         | 89 s         | 935 ms         |
| Adkontekst                                                                    | 226        | 88 s         | 388 ms         |
| [The Trade Desk](https://www.thetradedesk.com/)                               | 308        | 87 s         | 281 ms         |
| Touch Commerce                                                                | 131        | 86 s         | 660 ms         |
| Cross Pixel Media                                                             | 449        | 85 s         | 190 ms         |
| The Hut Group                                                                 | 290        | 83 s         | 287 ms         |
| Geniee                                                                        | 884        | 82 s         | 93 ms          |
| Republer                                                                      | 580        | 82 s         | 141 ms         |
| Reevoo                                                                        | 380        | 81 s         | 214 ms         |
| Affiliate Window                                                              | 1,043      | 81 s         | 77 ms          |
| Bootstrap Chinese network                                                     | 280        | 81 s         | 289 ms         |
| Permutive                                                                     | 587        | 81 s         | 137 ms         |
| Gleam                                                                         | 423        | 79 s         | 187 ms         |
| Fanplayr                                                                      | 107        | 79 s         | 735 ms         |
| Lytics                                                                        | 593        | 78 s         | 132 ms         |
| GetResponse                                                                   | 750        | 78 s         | 104 ms         |
| Kameleoon                                                                     | 170        | 77 s         | 452 ms         |
| Tradelab                                                                      | 807        | 75 s         | 92 ms          |
| FoxyCart                                                                      | 321        | 74 s         | 232 ms         |
| JustPremium Ads                                                               | 499        | 74 s         | 148 ms         |
| LoyaltyLion                                                                   | 188        | 73 s         | 390 ms         |
| Time                                                                          | 252        | 73 s         | 290 ms         |
| SnapEngage                                                                    | 985        | 72 s         | 73 ms          |
| Profitshare                                                                   | 326        | 71 s         | 218 ms         |
| WalkMe                                                                        | 113        | 71 s         | 627 ms         |
| PlayAd Media Group                                                            | 126        | 71 s         | 561 ms         |
| Keywee                                                                        | 271        | 70 s         | 257 ms         |
| rewardStyle.com                                                               | 640        | 69 s         | 109 ms         |
| Typepad                                                                       | 277        | 69 s         | 249 ms         |
| [Usabilla](https://usabilla.com)                                              | 850        | 69 s         | 81 ms          |
| [Alexa](https://www.alexa.com/)                                               | 1,209      | 68 s         | 56 ms          |
| WebSpectator                                                                  | 152        | 68 s         | 447 ms         |
| Stackla PTY                                                                   | 331        | 68 s         | 205 ms         |
| Nativo                                                                        | 588        | 68 s         | 115 ms         |
| Adobe Test & Target                                                           | 51         | 67 s         | 1312 ms        |
| Google Plus                                                                   | 567        | 66 s         | 117 ms         |
| Yottaa                                                                        | 163        | 66 s         | 404 ms         |
| Smart Insight Tracking                                                        | 700        | 65 s         | 93 ms          |
| RebelMouse                                                                    | 56         | 65 s         | 1157 ms        |
| Effective Measure                                                             | 661        | 65 s         | 98 ms          |
| Forter                                                                        | 91         | 64 s         | 706 ms         |
| Navegg                                                                        | 687        | 64 s         | 93 ms          |
| Madison Logic                                                                 | 513        | 64 s         | 124 ms         |
| reEmbed                                                                       | 185        | 63 s         | 340 ms         |
| Pixalate                                                                      | 186        | 61 s         | 330 ms         |
| Branch Metrics                                                                | 825        | 61 s         | 74 ms          |
| ClickDesk                                                                     | 589        | 61 s         | 103 ms         |
| ShopRunner                                                                    | 178        | 60 s         | 339 ms         |
| Trusted Shops                                                                 | 1,328      | 59 s         | 45 ms          |
| Kampyle                                                                       | 438        | 59 s         | 135 ms         |
| AdSniper                                                                      | 207        | 58 s         | 280 ms         |
| Elastic Ad                                                                    | 612        | 58 s         | 94 ms          |
| Simplicity Marketing                                                          | 150        | 58 s         | 385 ms         |
| Evergage                                                                      | 242        | 56 s         | 233 ms         |
| Rocket Fuel                                                                   | 668        | 55 s         | 83 ms          |
| bRealTime                                                                     | 245        | 55 s         | 225 ms         |
| [Vimeo](http://vimeo.com/)                                                    | 183        | 55 s         | 301 ms         |
| Github                                                                        | 373        | 54 s         | 145 ms         |
| TRUSTe                                                                        | 492        | 54 s         | 110 ms         |
| Autopilot                                                                     | 582        | 53 s         | 91 ms          |
| InSkin Media                                                                  | 73         | 53 s         | 720 ms         |
| Tencent                                                                       | 409        | 52 s         | 128 ms         |
| TruConversion                                                                 | 256        | 52 s         | 201 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                     | 222        | 51 s         | 231 ms         |
| Clicktripz                                                                    | 200        | 50 s         | 251 ms         |
| BoldChat                                                                      | 518        | 49 s         | 95 ms          |
| Adscale                                                                       | 534        | 49 s         | 91 ms          |
| KISSmetrics                                                                   | 529        | 49 s         | 92 ms          |
| Kaizen Platform                                                               | 252        | 49 s         | 193 ms         |
| Zanox                                                                         | 379        | 49 s         | 128 ms         |
| The ADEX                                                                      | 564        | 48 s         | 85 ms          |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                | 712        | 48 s         | 67 ms          |
| Highcharts                                                                    | 304        | 48 s         | 157 ms         |
| [DMD Marketing](https://www.dmdconnects.com/)                                 | 295        | 47 s         | 160 ms         |
| News                                                                          | 158        | 45 s         | 288 ms         |
| Omniconvert                                                                   | 472        | 45 s         | 94 ms          |
| CNET Content Solutions                                                        | 74         | 45 s         | 602 ms         |
| Onet                                                                          | 107        | 44 s         | 411 ms         |
| Weborama                                                                      | 485        | 44 s         | 90 ms          |
| Key CDN                                                                       | 234        | 43 s         | 183 ms         |
| unpkg                                                                         | 243        | 42 s         | 174 ms         |
| Reflektion                                                                    | 135        | 42 s         | 313 ms         |
| LightWidget                                                                   | 525        | 42 s         | 80 ms          |
| Steelhouse                                                                    | 366        | 42 s         | 115 ms         |
| SkyScanner                                                                    | 114        | 42 s         | 369 ms         |
| Conversant                                                                    | 80         | 42 s         | 523 ms         |
| BlueCava                                                                      | 79         | 41 s         | 517 ms         |
| Conversant Tag Manager                                                        | 189        | 40 s         | 210 ms         |
| [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)        | 202        | 40 s         | 196 ms         |
| Socialphotos                                                                  | 223        | 40 s         | 178 ms         |
| User Replay                                                                   | 76         | 39 s         | 517 ms         |
| [ReadSpeaker](https://www.readspeaker.com)                                    | 432        | 39 s         | 91 ms          |
| Proper Media                                                                  | 105        | 39 s         | 371 ms         |
| fifty-five                                                                    | 254        | 39 s         | 152 ms         |
| Snack Media                                                                   | 96         | 38 s         | 399 ms         |
| Nend                                                                          | 892        | 38 s         | 43 ms          |
| SaleCycle                                                                     | 441        | 38 s         | 86 ms          |
| Fresh Relevance                                                               | 384        | 38 s         | 98 ms          |
| TripleLift                                                                    | 230        | 38 s         | 163 ms         |
| Riskified                                                                     | 499        | 37 s         | 74 ms          |
| [Concert](https://concert.io/)                                                | 297        | 37 s         | 123 ms         |
| [Adition](https://www.adition.com)                                            | 389        | 36 s         | 93 ms          |
| Ghostery Enterprise                                                           | 223        | 36 s         | 161 ms         |
| Petametrics                                                                   | 189        | 36 s         | 189 ms         |
| Neodata                                                                       | 318        | 34 s         | 107 ms         |
| DemandBase                                                                    | 376        | 34 s         | 89 ms          |
| DialogTech                                                                    | 321        | 33 s         | 103 ms         |
| CDN.net                                                                       | 90         | 33 s         | 368 ms         |
| Intercept Interactive                                                         | 247        | 33 s         | 132 ms         |
| CPEx                                                                          | 219        | 32 s         | 146 ms         |
| LiveHelpNow                                                                   | 301        | 32 s         | 106 ms         |
| Sooqr Search                                                                  | 417        | 32 s         | 76 ms          |
| Exponea                                                                       | 312        | 31 s         | 101 ms         |
| MLveda                                                                        | 78         | 31 s         | 399 ms         |
| Advance Magazine Group                                                        | 168        | 29 s         | 175 ms         |
| Knight Lab                                                                    | 59         | 29 s         | 497 ms         |
| Ambassador                                                                    | 209        | 29 s         | 140 ms         |
| eXelate                                                                       | 309        | 29 s         | 94 ms          |
| Appier                                                                        | 331        | 29 s         | 87 ms          |
| Feedbackify                                                                   | 316        | 29 s         | 91 ms          |
| Sajari Pty                                                                    | 213        | 28 s         | 133 ms         |
| [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)           | 468        | 27 s         | 59 ms          |
| BannerFlow                                                                    | 255        | 27 s         | 108 ms         |
| Viacom                                                                        | 138        | 27 s         | 198 ms         |
| SublimeSkinz                                                                  | 378        | 27 s         | 71 ms          |
| ResponseTap                                                                   | 337        | 27 s         | 80 ms          |
| Postcode Anywhere (Holdings)                                                  | 138        | 27 s         | 194 ms         |
| Vee24                                                                         | 101        | 27 s         | 262 ms         |
| ResponsiveVoice                                                               | 341        | 26 s         | 77 ms          |
| Cachefly                                                                      | 55         | 26 s         | 475 ms         |
| linkpulse                                                                     | 336        | 26 s         | 77 ms          |
| NetAffiliation                                                                | 220        | 26 s         | 118 ms         |
| Wow Analytics                                                                 | 123        | 25 s         | 206 ms         |
| VidPulse                                                                      | 79         | 25 s         | 320 ms         |
| [Ipify](https://www.ipify.org)                                                | 227        | 25 s         | 110 ms         |
| VoiceFive                                                                     | 183        | 24 s         | 134 ms         |
| Hupso Website Analyzer                                                        | 328        | 24 s         | 74 ms          |
| Accordant Media                                                               | 250        | 24 s         | 95 ms          |
| Aggregate Knowledge                                                           | 314        | 24 s         | 75 ms          |
| FLXone                                                                        | 154        | 23 s         | 152 ms         |
| SnapWidget                                                                    | 624        | 23 s         | 37 ms          |
| Transifex                                                                     | 121        | 23 s         | 192 ms         |
| TechTarget                                                                    | 64         | 23 s         | 361 ms         |
| Alliance for Audited Media                                                    | 95         | 23 s         | 243 ms         |
| Unruly Media                                                                  | 179        | 23 s         | 128 ms         |
| Sourcepoint                                                                   | 104        | 23 s         | 217 ms         |
| Sweet Tooth                                                                   | 217        | 22 s         | 100 ms         |
| Dynamic Converter                                                             | 65         | 21 s         | 326 ms         |
| cloudIQ                                                                       | 146        | 21 s         | 144 ms         |
| OCSP                                                                          | 110        | 21 s         | 191 ms         |
| Zarget                                                                        | 201        | 21 s         | 103 ms         |
| Simpli.fi                                                                     | 181        | 21 s         | 114 ms         |
| Borderfree                                                                    | 66         | 21 s         | 311 ms         |
| Moovweb                                                                       | 71         | 20 s         | 287 ms         |
| [Pusher](https://pusher.com/)                                                 | 117        | 20 s         | 174 ms         |
| Resonance Insights                                                            | 112        | 20 s         | 180 ms         |
| Customer.io                                                                   | 175        | 20 s         | 115 ms         |
| Video Media Groep                                                             | 177        | 20 s         | 112 ms         |
| Silverpop                                                                     | 236        | 19 s         | 80 ms          |
| Edge Web Fonts                                                                | 243        | 19 s         | 78 ms          |
| Sirv                                                                          | 195        | 19 s         | 97 ms          |
| FreakOut                                                                      | 284        | 19 s         | 65 ms          |
| Vibrant Media                                                                 | 155        | 18 s         | 118 ms         |
| LoginRadius                                                                   | 79         | 18 s         | 227 ms         |
| AWeber                                                                        | 182        | 18 s         | 98 ms          |
| Infinity Tracking                                                             | 197        | 18 s         | 90 ms          |
| [Byside](http://www.byside.com)                                               | 79         | 18 s         | 222 ms         |
| Vertical Mass                                                                 | 81         | 18 s         | 217 ms         |
| Webtrends                                                                     | 53         | 17 s         | 326 ms         |
| FuelX                                                                         | 96         | 17 s         | 179 ms         |
| Council ad Network                                                            | 142        | 17 s         | 120 ms         |
| Rakuten LinkShare                                                             | 122        | 17 s         | 139 ms         |
| Delta Projects AB                                                             | 225        | 17 s         | 75 ms          |
| Civic                                                                         | 213        | 17 s         | 80 ms          |
| PebblePost                                                                    | 73         | 17 s         | 228 ms         |
| AdvertServe                                                                   | 148        | 16 s         | 110 ms         |
| Cookie-Script.com                                                             | 155        | 16 s         | 104 ms         |
| AdSpruce                                                                      | 54         | 16 s         | 299 ms         |
| Talkable                                                                      | 198        | 16 s         | 81 ms          |
| Revolver Maps                                                                 | 150        | 16 s         | 106 ms         |
| Fonecall                                                                      | 67         | 16 s         | 236 ms         |
| AdRiver                                                                       | 148        | 16 s         | 107 ms         |
| Vergic AB                                                                     | 73         | 16 s         | 215 ms         |
| StumbleUpon                                                                   | 103        | 16 s         | 152 ms         |
| Impact Radius                                                                 | 183        | 15 s         | 83 ms          |
| Exactag                                                                       | 138        | 15 s         | 109 ms         |
| CleverDATA                                                                    | 142        | 15 s         | 105 ms         |
| MaxMind                                                                       | 118        | 15 s         | 126 ms         |
| SlimCut Media Outstream                                                       | 139        | 15 s         | 106 ms         |
| [GoSquared](https://www.gosquared.com)                                        | 193        | 15 s         | 76 ms          |
| Exponential Interactive                                                       | 242        | 15 s         | 61 ms          |
| Hull.js                                                                       | 112        | 14 s         | 128 ms         |
| Adobe Marketing Cloud                                                         | 154        | 14 s         | 93 ms          |
| The Publisher Desk                                                            | 62         | 14 s         | 226 ms         |
| Woopra                                                                        | 198        | 14 s         | 71 ms          |
| CleverTap                                                                     | 168        | 14 s         | 83 ms          |
| Vergic Engage Platform                                                        | 59         | 14 s         | 235 ms         |
| Salesforce.com                                                                | 193        | 14 s         | 72 ms          |
| Optimove                                                                      | 84         | 14 s         | 164 ms         |
| Polyfill service                                                              | 91         | 14 s         | 150 ms         |
| AnswerDash                                                                    | 90         | 13 s         | 145 ms         |
| Extole                                                                        | 92         | 13 s         | 139 ms         |
| [Widespace](https://www.widespace.com)                                        | 130        | 13 s         | 97 ms          |
| AdTrue                                                                        | 113        | 12 s         | 110 ms         |
| Auto Link Maker                                                               | 134        | 12 s         | 91 ms          |
| Apester                                                                       | 145        | 12 s         | 83 ms          |
| Betgenius                                                                     | 120        | 12 s         | 100 ms         |
| DialogTech SourceTrak                                                         | 177        | 12 s         | 67 ms          |
| Drip                                                                          | 225        | 12 s         | 52 ms          |
| Storygize                                                                     | 81         | 12 s         | 143 ms         |
| SecuredVisit                                                                  | 141        | 11 s         | 81 ms          |
| Vindico                                                                       | 96         | 11 s         | 117 ms         |
| Opinion Stage                                                                 | 127        | 11 s         | 88 ms          |
| BuySellAds                                                                    | 127        | 11 s         | 88 ms          |
| CyberSource (Visa)                                                            | 155        | 11 s         | 69 ms          |
| Triblio                                                                       | 68         | 11 s         | 157 ms         |
| C3 Metrics                                                                    | 65         | 11 s         | 163 ms         |
| Research Online                                                               | 131        | 11 s         | 81 ms          |
| epoq internet services                                                        | 90         | 11 s         | 117 ms         |
| Friendbuy                                                                     | 131        | 11 s         | 80 ms          |
| Twitter Online Conversion Tracking                                            | 169        | 10 s         | 62 ms          |
| AliveChat                                                                     | 157        | 10 s         | 66 ms          |
| Flickr                                                                        | 137        | 10 s         | 76 ms          |
| AIR.TV                                                                        | 119        | 10 s         | 87 ms          |
| Swoop                                                                         | 131        | 10 s         | 78 ms          |
| Covert Pics                                                                   | 142        | 10 s         | 72 ms          |
| Ziff Davis Tech                                                               | 121        | 10 s         | 84 ms          |
| HotelsCombined                                                                | 63         | 10 s         | 158 ms         |
| Reactful                                                                      | 81         | 10 s         | 120 ms         |
| Polldaddy                                                                     | 97         | 10 s         | 99 ms          |
| OnScroll                                                                      | 95         | 10 s         | 101 ms         |
| Ad6Media                                                                      | 55         | 9 s          | 171 ms         |
| Eyeota                                                                        | 124        | 9 s          | 75 ms          |
| Boomtrain                                                                     | 106        | 9 s          | 87 ms          |
| Pagefair                                                                      | 124        | 9 s          | 73 ms          |
| Tag Inspector                                                                 | 100        | 9 s          | 90 ms          |
| Braintree Payments                                                            | 73         | 9 s          | 123 ms         |
| CANDDi                                                                        | 73         | 9 s          | 123 ms         |
| Adunity                                                                       | 71         | 9 s          | 127 ms         |
| Captify Media                                                                 | 99         | 9 s          | 87 ms          |
| ContextWeb                                                                    | 117        | 8 s          | 73 ms          |
| Mopinion                                                                      | 75         | 8 s          | 112 ms         |
| NaviStone                                                                     | 81         | 8 s          | 103 ms         |
| Freespee                                                                      | 96         | 8 s          | 83 ms          |
| RichRelevance                                                                 | 54         | 8 s          | 147 ms         |
| Flockler                                                                      | 74         | 8 s          | 104 ms         |
| Qualtrics                                                                     | 51         | 8 s          | 151 ms         |
| Attribution                                                                   | 74         | 7 s          | 100 ms         |
| Klevu Search                                                                  | 101        | 7 s          | 73 ms          |
| UPS i-parcel                                                                  | 52         | 7 s          | 140 ms         |
| Nanorep                                                                       | 55         | 7 s          | 132 ms         |
| [Catchpoint](https://www.catchpoint.com/)                                     | 76         | 7 s          | 96 ms          |
| Improve Digital                                                               | 54         | 7 s          | 131 ms         |
| Sailthru                                                                      | 101        | 7 s          | 69 ms          |
| Bookatable                                                                    | 70         | 7 s          | 99 ms          |
| ARM                                                                           | 53         | 7 s          | 129 ms         |
| MathJax                                                                       | 56         | 7 s          | 121 ms         |
| [Netlify](https://www.netlify.com/)                                           | 77         | 7 s          | 87 ms          |
| Oracle Recommendations On Demand                                              | 86         | 7 s          | 76 ms          |
| content.ad                                                                    | 54         | 6 s          | 119 ms         |
| Barilliance                                                                   | 74         | 6 s          | 86 ms          |
| Cookie Reports                                                                | 83         | 6 s          | 76 ms          |
| YoYo                                                                          | 72         | 6 s          | 82 ms          |
| Raygun                                                                        | 69         | 6 s          | 85 ms          |
| UpSellit                                                                      | 56         | 6 s          | 104 ms         |
| Conversio                                                                     | 76         | 6 s          | 75 ms          |
| Site24x7 Real User Monitoring                                                 | 72         | 5 s          | 74 ms          |
| DistroScale                                                                   | 59         | 5 s          | 89 ms          |
| [Fastly Insights](https://insights.fastlylabs.com)                            | 86         | 5 s          | 60 ms          |
| Browser-Update.org                                                            | 73         | 5 s          | 70 ms          |
| Adobe Scene7                                                                  | 63         | 5 s          | 80 ms          |
| eGain                                                                         | 65         | 5 s          | 77 ms          |
| Bluecore                                                                      | 55         | 5 s          | 90 ms          |
| StackAdapt                                                                    | 63         | 5 s          | 78 ms          |
| Sociomantic Labs                                                              | 68         | 5 s          | 70 ms          |
| AdCurve                                                                       | 59         | 5 s          | 77 ms          |
| MailPlus                                                                      | 78         | 4 s          | 56 ms          |
| Fastest Forward                                                               | 54         | 4 s          | 78 ms          |
| Soundest                                                                      | 55         | 4 s          | 76 ms          |
| Click4Assistance                                                              | 52         | 4 s          | 80 ms          |
| [Xaxis](https://www.xaxis.com/)                                               | 52         | 4 s          | 79 ms          |
| Realytics                                                                     | 52         | 4 s          | 78 ms          |
| SurveyMonkey                                                                  | 77         | 4 s          | 51 ms          |
| StackExchange                                                                 | 57         | 4 s          | 69 ms          |
| PrintFriendly                                                                 | 76         | 4 s          | 49 ms          |
| Ekm Systems                                                                   | 60         | 4 s          | 61 ms          |
| ShopStorm                                                                     | 55         | 3 s          | 62 ms          |

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
