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
| 1    | Nend                                                           | 1,251   | 36 ms          |
| 2    | ExoClick                                                       | 1,778   | 52 ms          |
| 3    | SublimeSkinz                                                   | 1,216   | 53 ms          |
| 4    | MailMunch                                                      | 4,654   | 62 ms          |
| 5    | Branch Metrics                                                 | 1,050   | 64 ms          |
| 6    | Tynt                                                           | 25,003  | 70 ms          |
| 7    | Adyoulike                                                      | 1,614   | 72 ms          |
| 8    | Rakuten Marketing                                              | 1,611   | 73 ms          |
| 9    | FreakOut                                                       | 3,870   | 76 ms          |
| 10   | PushCrew                                                       | 3,621   | 78 ms          |
| 11   | BlueKai                                                        | 3,976   | 78 ms          |
| 12   | Constant Contact                                               | 1,563   | 79 ms          |
| 13   | District M                                                     | 6,744   | 81 ms          |
| 14   | Gemius                                                         | 7,344   | 88 ms          |
| 15   | Nativo                                                         | 1,124   | 96 ms          |
| 16   | i-mobile                                                       | 4,577   | 99 ms          |
| 17   | [Adroll](https://www.adroll.com/)                              | 5,404   | 100 ms         |
| 18   | [Media Math](http://www.mediamath.com/)                        | 2,081   | 104 ms         |
| 19   | [Popads](https://www.popads.net/)                              | 2,997   | 105 ms         |
| 20   | Unbounce                                                       | 2,684   | 110 ms         |
| 21   | DTSCOUT                                                        | 4,476   | 113 ms         |
| 22   | STINGRAY                                                       | 2,475   | 113 ms         |
| 23   | LINE Corporation                                               | 4,292   | 114 ms         |
| 24   | Sharethrough                                                   | 2,059   | 114 ms         |
| 25   | [Outbrain](https://www.outbrain.com/)                          | 4,723   | 116 ms         |
| 26   | Refersion                                                      | 1,371   | 117 ms         |
| 27   | Intercept Interactive                                          | 1,005   | 117 ms         |
| 28   | JuicyAds                                                       | 2,030   | 120 ms         |
| 29   | Bizible                                                        | 1,260   | 133 ms         |
| 30   | SmartAdServer                                                  | 3,396   | 142 ms         |
| 31   | Index Exchange                                                 | 5,008   | 143 ms         |
| 32   | [Rubicon Project](https://rubiconproject.com/)                 | 35,955  | 145 ms         |
| 33   | [Scorecard Research](https://www.scorecardresearch.com/)       | 28,766  | 148 ms         |
| 34   | IPONWEB                                                        | 1,185   | 149 ms         |
| 35   | [Bing Ads](https://bingads.microsoft.com)                      | 16,223  | 151 ms         |
| 36   | Skimbit                                                        | 20,440  | 159 ms         |
| 37   | Smart AdServer                                                 | 2,419   | 163 ms         |
| 38   | [Yahoo!](https://www.yahoo.com/)                               | 9,248   | 165 ms         |
| 39   | OptiMonk                                                       | 1,374   | 172 ms         |
| 40   | Sortable                                                       | 1,580   | 176 ms         |
| 41   | Adform                                                         | 8,220   | 182 ms         |
| 42   | Celtra                                                         | 3,706   | 184 ms         |
| 43   | [Media.net](https://www.media.net/)                            | 25,352  | 185 ms         |
| 44   | Cxense                                                         | 4,788   | 185 ms         |
| 45   | Permutive                                                      | 1,098   | 186 ms         |
| 46   | [Intent Media](https://intent.com/)                            | 6,992   | 187 ms         |
| 47   | [Amazon Ads](https://ad.amazon.com/)                           | 20,719  | 188 ms         |
| 48   | Teads                                                          | 4,827   | 201 ms         |
| 49   | [AOL / Oath / Verizon Media](https://www.oath.com/)            | 2,073   | 212 ms         |
| 50   | [AppNexus](https://www.appnexus.com/)                          | 3,499   | 215 ms         |
| 51   | [Pubmatic](https://pubmatic.com/)                              | 63,997  | 225 ms         |
| 52   | Perfect Market                                                 | 1,142   | 227 ms         |
| 53   | [Criteo](https://www.criteo.com/)                              | 77,325  | 227 ms         |
| 54   | TrafficStars                                                   | 2,707   | 246 ms         |
| 55   | [WordAds](https://wordads.co/)                                 | 21,071  | 251 ms         |
| 56   | sovrn                                                          | 2,921   | 260 ms         |
| 57   | Adverline Board                                                | 1,052   | 268 ms         |
| 58   | Privy                                                          | 11,761  | 278 ms         |
| 59   | VigLink                                                        | 8,175   | 279 ms         |
| 60   | LongTail Ad Solutions                                          | 3,287   | 323 ms         |
| 61   | [OpenX](https://www.openx.com/)                                | 1,759   | 324 ms         |
| 62   | Klaviyo                                                        | 11,891  | 350 ms         |
| 63   | [Taboola](https://www.taboola.com/)                            | 23,206  | 360 ms         |
| 64   | piano                                                          | 1,123   | 397 ms         |
| 65   | [Yandex Ads](https://yandex.com/adv/)                          | 25,094  | 399 ms         |
| 66   | [MGID](https://www.mgid.com/)                                  | 7,087   | 403 ms         |
| 67   | [RevJet](https://www.revjet.com/)                              | 4,646   | 414 ms         |
| 68   | Digioh                                                         | 1,102   | 437 ms         |
| 69   | [HyperInzerce](https://hyperinzerce.cz)                        | 1,377   | 455 ms         |
| 70   | iBillboard                                                     | 1,020   | 505 ms         |
| 71   | [Sizmek](https://www.sizmek.com/)                              | 3,909   | 535 ms         |
| 72   | [MediaVine](https://www.mediavine.com/)                        | 5,647   | 625 ms         |
| 73   | [Bridgewell DSP](https://www.bridgewell.com/)                  | 21,594  | 638 ms         |
| 74   | Admixer for Publishers                                         | 1,136   | 643 ms         |
| 75   | [Moat](https://moat.com/)                                      | 20,045  | 666 ms         |
| 76   | Simplicity Marketing                                           | 3,045   | 687 ms         |
| 77   | SpringServer                                                   | 1,385   | 709 ms         |
| 78   | [DoubleVerify](https://www.doubleverify.com/)                  | 11,760  | 746 ms         |
| 79   | LoyaltyLion                                                    | 1,104   | 780 ms         |
| 80   | Vidible                                                        | 1,569   | 936 ms         |
| 81   | Adloox                                                         | 5,057   | 968 ms         |
| 82   | Infolinks                                                      | 3,657   | 983 ms         |
| 83   | [Integral Ad Science](https://integralads.com/uk/)             | 28,273  | 983 ms         |
| 84   | LKQD                                                           | 1,747   | 1545 ms        |
| 85   | [fam](http://admin.fam-ad.com/report/)                         | 2,188   | 1779 ms        |
| 86   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 650,727 | 1803 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                              | 1,123     | 31 ms          |
| 2    | [WordPress Site Stats](https://wp.com/)                                      | 2,206     | 61 ms          |
| 3    | Treasure Data                                                                | 4,493     | 63 ms          |
| 4    | Roxr Software                                                                | 2,142     | 65 ms          |
| 5    | Amplitude Mobile Analytics                                                   | 1,808     | 68 ms          |
| 6    | StatCounter                                                                  | 10,171    | 68 ms          |
| 7    | Searchanise                                                                  | 2,739     | 70 ms          |
| 8    | Heap                                                                         | 2,831     | 74 ms          |
| 9    | [Google Analytics](https://www.google.com/analytics/analytics/)              | 1,314,344 | 74 ms          |
| 10   | [Mixpanel](https://mixpanel.com/)                                            | 6,235     | 78 ms          |
| 11   | Chartbeat                                                                    | 4,901     | 78 ms          |
| 12   | [Hotjar](https://www.hotjar.com/)                                            | 157,254   | 88 ms          |
| 13   | [Quantcast](https://www.quantcast.com)                                       | 3,031     | 89 ms          |
| 14   | CallRail                                                                     | 7,392     | 94 ms          |
| 15   | Parse.ly                                                                     | 3,198     | 102 ms         |
| 16   | etracker                                                                     | 1,732     | 103 ms         |
| 17   | [Snowplow](https://snowplowanalytics.com/)                                   | 7,030     | 112 ms         |
| 18   | ContentSquare                                                                | 1,452     | 115 ms         |
| 19   | Marchex                                                                      | 4,398     | 115 ms         |
| 20   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 11,993    | 115 ms         |
| 21   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 12,418    | 119 ms         |
| 22   | Net Reviews                                                                  | 2,464     | 162 ms         |
| 23   | [VWO](https://vwo.com)                                                       | 4,343     | 167 ms         |
| 24   | Evidon                                                                       | 6,074     | 175 ms         |
| 25   | Nosto                                                                        | 2,045     | 183 ms         |
| 26   | Trust Pilot                                                                  | 13,820    | 189 ms         |
| 27   | [Crazy Egg](https://www.crazyegg.com/)                                       | 19,547    | 190 ms         |
| 28   | [Segment](https://segment.com/)                                              | 9,598     | 192 ms         |
| 29   | ForeSee                                                                      | 1,098     | 195 ms         |
| 30   | FullStory                                                                    | 6,815     | 196 ms         |
| 31   | [BounceX](https://www.bouncex.com/)                                          | 1,266     | 202 ms         |
| 32   | UserReport                                                                   | 1,555     | 221 ms         |
| 33   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 12,514    | 237 ms         |
| 34   | [Optimizely](https://www.optimizely.com/)                                    | 11,328    | 248 ms         |
| 35   | [Histats](http://histats.com/)                                               | 10,663    | 252 ms         |
| 36   | [Marketo](https://www.marketo.com)                                           | 1,315     | 256 ms         |
| 37   | Ezoic                                                                        | 4,219     | 292 ms         |
| 38   | Gigya                                                                        | 5,826     | 308 ms         |
| 39   | Clicktale                                                                    | 1,091     | 378 ms         |
| 40   | Bazaarvoice                                                                  | 1,740     | 380 ms         |
| 41   | [Keen](https://keen.io/)                                                     | 2,615     | 405 ms         |
| 42   | Inspectlet                                                                   | 5,822     | 411 ms         |
| 43   | [Snapchat](https://www.snapchat.com)                                         | 11,148    | 431 ms         |
| 44   | Feefo.com                                                                    | 1,674     | 494 ms         |
| 45   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 270,514   | 501 ms         |
| 46   | [Lucky Orange](https://www.luckyorange.com/)                                 | 8,042     | 517 ms         |
| 47   | [DigiTrust](http://www.digitru.st/)                                          | 1,701     | 519 ms         |
| 48   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 19,599    | 575 ms         |
| 49   | Revolver Maps                                                                | 1,106     | 583 ms         |
| 50   | Mouseflow                                                                    | 1,743     | 625 ms         |
| 51   | IBM Digital Analytics                                                        | 1,082     | 875 ms         |
| 52   | AB Tasty                                                                     | 3,363     | 1559 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [AddToAny](https://www.addtoany.com/)                | 25,069    | 69 ms          |
| 2    | [Shareaholic](https://www.shareaholic.com/)          | 3,465     | 82 ms          |
| 3    | [Pinterest](https://pinterest.com/)                  | 16,302    | 97 ms          |
| 4    | [VK](https://vk.com/)                                | 15,503    | 97 ms          |
| 5    | Kakao                                                | 12,590    | 100 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)                | 15,987    | 119 ms         |
| 7    | [Twitter](https://twitter.com)                       | 234,572   | 134 ms         |
| 8    | [Instagram](https://www.instagram.com)               | 9,351     | 146 ms         |
| 9    | [Facebook](https://www.facebook.com)                 | 1,444,810 | 223 ms         |
| 10   | [Yandex Share](https://yastatic.net/share2/share.js) | 29,685    | 230 ms         |
| 11   | [ShareThis](https://www.sharethis.com/)              | 36,317    | 279 ms         |
| 12   | SocialShopWave                                       | 1,405     | 417 ms         |
| 13   | [AddThis](http://www.addthis.com/)                   | 126,104   | 462 ms         |
| 14   | [Disqus](http://disqus.com/)                         | 1,816     | 822 ms         |
| 15   | [PIXNET](https://www.pixnet.net/)                    | 48,146    | 1088 ms        |
| 16   | LiveJournal                                          | 3,494     | 1622 ms        |
| 17   | [Tumblr](https://tumblr.com/)                        | 8,770     | 2146 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage   | Average Impact |
| ---- | -------------------------------------------- | ------- | -------------- |
| 1    | [Vimeo](http://vimeo.com/)                   | 14,147  | 249 ms         |
| 2    | [Brightcove](https://www.brightcove.com/en/) | 6,438   | 693 ms         |
| 3    | [Wistia](https://wistia.com/)                | 12,612  | 870 ms         |
| 4    | [YouTube](https://youtube.com)               | 390,054 | 1618 ms        |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Trusted Shops                                                             | 2,280   | 36 ms          |
| 2    | LightWidget                                                               | 3,242   | 57 ms          |
| 3    | Siteimprove                                                               | 2,023   | 82 ms          |
| 4    | GetSiteControl                                                            | 1,638   | 95 ms          |
| 5    | TRUSTe                                                                    | 1,869   | 99 ms          |
| 6    | iubenda                                                                   | 13,029  | 99 ms          |
| 7    | [Optanon](https://www.cookielaw.org/)                                     | 1,682   | 101 ms         |
| 8    | Affirm                                                                    | 1,927   | 105 ms         |
| 9    | iovation                                                                  | 1,132   | 105 ms         |
| 10   | [New Relic](https://newrelic.com/)                                        | 6,954   | 107 ms         |
| 11   | [Cookiebot](https://www.cookiebot.com/)                                   | 9,126   | 126 ms         |
| 12   | Bold Commerce                                                             | 11,050  | 138 ms         |
| 13   | Sift Science                                                              | 1,043   | 147 ms         |
| 14   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 532,252 | 157 ms         |
| 15   | AddEvent                                                                  | 1,326   | 161 ms         |
| 16   | Swiftype                                                                  | 1,528   | 161 ms         |
| 17   | [TrustArc](https://www.trustarc.com/)                                     | 4,796   | 163 ms         |
| 18   | [Amazon Pay](https://pay.amazon.com)                                      | 5,356   | 184 ms         |
| 19   | Seznam                                                                    | 1,844   | 186 ms         |
| 20   | MaxCDN Enterprise                                                         | 2,085   | 223 ms         |
| 21   | [AppDynamics](https://www.appdynamics.com/)                               | 1,667   | 223 ms         |
| 22   | GitHub                                                                    | 1,198   | 257 ms         |
| 23   | [Distil Networks](https://www.distilnetworks.com/)                        | 10,078  | 336 ms         |
| 24   | [PayPal](https://paypal.com)                                              | 12,485  | 353 ms         |
| 25   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 36,203  | 361 ms         |
| 26   | [Stripe](https://stripe.com)                                              | 18,462  | 397 ms         |
| 27   | [Google Maps](https://www.google.com/maps)                                | 270,086 | 398 ms         |
| 28   | Secomapp                                                                  | 1,635   | 438 ms         |
| 29   | Bugsnag                                                                   | 1,314   | 465 ms         |
| 30   | [Sentry](https://sentry.io/)                                              | 11,033  | 466 ms         |
| 31   | Rambler                                                                   | 9,143   | 612 ms         |
| 32   | Fastly                                                                    | 5,142   | 716 ms         |
| 33   | [GoDaddy](https://www.godaddy.com/)                                       | 6,086   | 831 ms         |
| 34   | Mapbox                                                                    | 5,378   | 1048 ms        |
| 35   | [Yandex APIs](https://yandex.ru/)                                         | 22,971  | 1057 ms        |
| 36   | Esri ArcGIS                                                               | 1,395   | 3005 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [WordPress](https://wp.com/)                                                              | 131,777 | 214 ms         |
| 2    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 2,659   | 357 ms         |
| 3    | [Blogger](http://www.blogger.com/)                                                        | 24,739  | 464 ms         |
| 4    | [Squarespace](https://www.squarespace.com/)                                               | 38,716  | 888 ms         |
| 5    | [Shopify](https://www.shopify.com/)                                                       | 81,850  | 901 ms         |
| 6    | [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 3,927   | 1004 ms        |
| 7    | [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,517   | 1190 ms        |
| 8    | [Weebly](https://www.weebly.com/)                                                         | 15,286  | 1227 ms        |
| 9    | [Dealer](https://www.dealer.com/)                                                         | 9,017   | 1427 ms        |
| 10   | [Hatena Blog](https://hatenablog.com/)                                                    | 16,314  | 1834 ms        |
| 11   | [Wix](https://www.wix.com/)                                                               | 49,666  | 5321 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [RD Station](https://www.rdstation.com/en/) | 4,166  | 70 ms          |
| 2    | [iZooto](https://www.izooto.com)            | 1,057  | 77 ms          |
| 3    | [Beeketing](https://beeketing.com/)         | 3,369  | 81 ms          |
| 4    | [Listrak](https://www.listrak.com/)         | 1,132  | 145 ms         |
| 5    | Ve                                          | 2,795  | 151 ms         |
| 6    | Dataxu                                      | 3,325  | 152 ms         |
| 7    | [Hubspot](https://hubspot.com/)             | 28,497 | 169 ms         |
| 8    | [Yotpo](https://www.yotpo.com/)             | 12,756 | 203 ms         |
| 9    | [Mailchimp](https://mailchimp.com/)         | 21,068 | 211 ms         |
| 10   | [OptinMonster](https://optinmonster.com/)   | 9,053  | 264 ms         |
| 11   | Pardot                                      | 1,398  | 436 ms         |
| 12   | [Albacross](https://albacross.com/)         | 1,894  | 516 ms         |
| 13   | Bigcommerce                                 | 9,546  | 609 ms         |
| 14   | [Sumo](https://sumo.com/)                   | 19,970 | 682 ms         |
| 15   | [Drift](https://www.drift.com/)             | 6,172  | 1105 ms        |
| 16   | [PureCars](https://www.purecars.com/)       | 2,660  | 2017 ms        |
| 17   | [Tray Commerce](https://www.tray.com.br/)   | 2,373  | 2448 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | SnapEngage                                       | 1,212  | 58 ms          |
| 2    | Pure Chat                                        | 3,593  | 66 ms          |
| 3    | Foursixty                                        | 1,310  | 70 ms          |
| 4    | [LivePerson](https://www.liveperson.com/)        | 4,447  | 116 ms         |
| 5    | iPerceptions                                     | 2,237  | 124 ms         |
| 6    | Comm100                                          | 1,310  | 141 ms         |
| 7    | iAdvize SAS                                      | 1,023  | 333 ms         |
| 8    | [Tidio Live Chat](https://www.tidiochat.com/en/) | 9,086  | 350 ms         |
| 9    | [ContactAtOnce](https://www.contactatonce.com/)  | 3,478  | 368 ms         |
| 10   | [LiveChat](https://www.livechatinc.com/)         | 18,439 | 381 ms         |
| 11   | [Tawk.to](https://www.tawk.to/)                  | 56,580 | 385 ms         |
| 12   | [Help Scout](https://www.helpscout.net/)         | 1,949  | 403 ms         |
| 13   | [Intercom](https://www.intercom.com)             | 14,468 | 411 ms         |
| 14   | [Jivochat](https://www.jivochat.com/)            | 38,980 | 501 ms         |
| 15   | [Smartsupp](https://www.smartsupp.com)           | 13,932 | 565 ms         |
| 16   | [Olark](https://www.olark.com/)                  | 7,205  | 653 ms         |
| 17   | [ZenDesk](https://zendesk.com/)                  | 69,743 | 756 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | Research Online                           | 1,261  | 60 ms          |
| 2    | Accuweather                               | 1,783  | 117 ms         |
| 3    | Tencent                                   | 1,258  | 137 ms         |
| 4    | SnapWidget                                | 3,085  | 157 ms         |
| 5    | OpenTable                                 | 2,442  | 160 ms         |
| 6    | Booking.com                               | 2,472  | 170 ms         |
| 7    | [AMP](https://amp.dev/)                   | 57,906 | 243 ms         |
| 8    | Embedly                                   | 3,778  | 428 ms         |
| 9    | Medium                                    | 1,238  | 429 ms         |
| 10   | issuu                                     | 2,069  | 627 ms         |
| 11   | [Spotify](https://www.spotify.com/)       | 2,930  | 751 ms         |
| 12   | [SoundCloud](https://www.soundcloud.com/) | 4,276  | 956 ms         |
| 13   | Dailymotion                               | 2,390  | 1258 ms        |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 11,673  | 105 ms         |
| 2    | [Yandex CDN](https://yandex.ru/)                             | 2,037   | 150 ms         |
| 3    | Microsoft Hosted Libs                                        | 5,218   | 164 ms         |
| 4    | [jQuery CDN](https://code.jquery.com/)                       | 169,655 | 197 ms         |
| 5    | [Unpkg](https://unpkg.com)                                   | 4,845   | 212 ms         |
| 6    | [Google CDN](https://developers.google.com/speed/libraries/) | 903,117 | 236 ms         |
| 7    | Azure Web Services                                           | 8,410   | 260 ms         |
| 8    | [Cloudflare CDN](https://cdnjs.com/)                         | 110,489 | 275 ms         |
| 9    | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 37,062  | 328 ms         |
| 10   | [Akamai](https://www.akamai.com/)                            | 10,541  | 336 ms         |
| 11   | [FontAwesome CDN](https://fontawesome.com/)                  | 37,844  | 357 ms         |
| 12   | Monotype                                                     | 4,992   | 552 ms         |
| 13   | [CreateJS CDN](http://code.createjs.com/)                    | 8,992   | 2674 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [BrightTag / Signal](https://www.signal.co)                                   | 7,780   | 114 ms         |
| 2    | TagCommander                                                                  | 1,205   | 119 ms         |
| 3    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 612,837 | 120 ms         |
| 4    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,900  | 309 ms         |
| 5    | [Tealium](https://tealium.com/)                                               | 13,033  | 340 ms         |
| 6    | [Ensighten](https://www.ensighten.com/)                                       | 5,412   | 476 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage     | Average Impact |
| ---- | ------------------------------------------------- | --------- | -------------- |
| 1    | [Amazon Web Services](https://aws.amazon.com/s3/) | 40,733    | 153 ms         |
| 2    | ResponsiveVoice                                   | 1,039     | 290 ms         |
| 3    | [All Other 3rd Parties](#by-category)             | 1,359,375 | 298 ms         |
| 4    | [Parking Crew](http://parkingcrew.net/)           | 11,470    | 362 ms         |
| 5    | uLogin                                            | 2,312     | 1192 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                            | 650,727    | 1,173,204 s  | 1803 ms        |
| [YouTube](https://youtube.com)                                                            | 390,054    | 631,295 s    | 1618 ms        |
| [All Other 3rd Parties](#by-category)                                                     | 1,359,375  | 404,459 s    | 298 ms         |
| [Facebook](https://www.facebook.com)                                                      | 1,444,810  | 322,129 s    | 223 ms         |
| [Wix](https://www.wix.com/)                                                               | 49,666     | 264,250 s    | 5321 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 903,117    | 212,688 s    | 236 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 270,514    | 135,500 s    | 501 ms         |
| [Google Maps](https://www.google.com/maps)                                                | 270,086    | 107,550 s    | 398 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)                           | 1,314,344  | 97,492 s     | 74 ms          |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 532,252    | 83,662 s     | 157 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 81,850     | 73,774 s     | 901 ms         |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 612,837    | 73,394 s     | 120 ms         |
| [AddThis](http://www.addthis.com/)                                                        | 126,104    | 58,199 s     | 462 ms         |
| [ZenDesk](https://zendesk.com/)                                                           | 69,743     | 52,694 s     | 756 ms         |
| [PIXNET](https://www.pixnet.net/)                                                         | 48,146     | 52,368 s     | 1088 ms        |
| [Squarespace](https://www.squarespace.com/)                                               | 38,716     | 34,398 s     | 888 ms         |
| [jQuery CDN](https://code.jquery.com/)                                                    | 169,655    | 33,429 s     | 197 ms         |
| [Twitter](https://twitter.com)                                                            | 234,572    | 31,320 s     | 134 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 110,489    | 30,408 s     | 275 ms         |
| [Hatena Blog](https://hatenablog.com/)                                                    | 16,314     | 29,919 s     | 1834 ms        |
| [WordPress](https://wp.com/)                                                              | 131,777    | 28,140 s     | 214 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 28,273     | 27,793 s     | 983 ms         |
| [Yandex APIs](https://yandex.ru/)                                                         | 22,971     | 24,273 s     | 1057 ms        |
| [CreateJS CDN](http://code.createjs.com/)                                                 | 8,992      | 24,041 s     | 2674 ms        |
| [Tawk.to](https://www.tawk.to/)                                                           | 56,580     | 21,773 s     | 385 ms         |
| [Jivochat](https://www.jivochat.com/)                                                     | 38,980     | 19,527 s     | 501 ms         |
| [Tumblr](https://tumblr.com/)                                                             | 8,770      | 18,816 s     | 2146 ms        |
| [Weebly](https://www.weebly.com/)                                                         | 15,286     | 18,754 s     | 1227 ms        |
| [Criteo](https://www.criteo.com/)                                                         | 77,325     | 17,566 s     | 227 ms         |
| [Pubmatic](https://pubmatic.com/)                                                         | 63,997     | 14,390 s     | 225 ms         |
| [AMP](https://amp.dev/)                                                                   | 57,906     | 14,063 s     | 243 ms         |
| [Hotjar](https://www.hotjar.com/)                                                         | 157,254    | 13,817 s     | 88 ms          |
| [Bridgewell DSP](https://www.bridgewell.com/)                                             | 21,594     | 13,785 s     | 638 ms         |
| [Sumo](https://sumo.com/)                                                                 | 19,970     | 13,627 s     | 682 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 37,844     | 13,505 s     | 357 ms         |
| [Moat](https://moat.com/)                                                                 | 20,045     | 13,350 s     | 666 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 36,203     | 13,058 s     | 361 ms         |
| [Dealer](https://www.dealer.com/)                                                         | 9,017      | 12,870 s     | 1427 ms        |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 37,062     | 12,163 s     | 328 ms         |
| [Blogger](http://www.blogger.com/)                                                        | 24,739     | 11,482 s     | 464 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)                        | 19,599     | 11,270 s     | 575 ms         |
| [Wistia](https://wistia.com/)                                                             | 12,612     | 10,968 s     | 870 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 32,900     | 10,173 s     | 309 ms         |
| [ShareThis](https://www.sharethis.com/)                                                   | 36,317     | 10,135 s     | 279 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 25,094     | 10,005 s     | 399 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                             | 11,760     | 8,768 s      | 746 ms         |
| [Taboola](https://www.taboola.com/)                                                       | 23,206     | 8,344 s      | 360 ms         |
| [Smartsupp](https://www.smartsupp.com)                                                    | 13,932     | 7,872 s      | 565 ms         |
| [Stripe](https://stripe.com)                                                              | 18,462     | 7,329 s      | 397 ms         |
| [LiveChat](https://www.livechatinc.com/)                                                  | 18,439     | 7,029 s      | 381 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                                      | 29,685     | 6,834 s      | 230 ms         |
| [Drift](https://www.drift.com/)                                                           | 6,172      | 6,821 s      | 1105 ms        |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 40,733     | 6,235 s      | 153 ms         |
| [Intercom](https://www.intercom.com)                                                      | 14,468     | 5,945 s      | 411 ms         |
| Bigcommerce                                                                               | 9,546      | 5,812 s      | 609 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                                 | 2,373      | 5,809 s      | 2448 ms        |
| LiveJournal                                                                               | 3,494      | 5,669 s      | 1622 ms        |
| Mapbox                                                                                    | 5,378      | 5,634 s      | 1048 ms        |
| Rambler                                                                                   | 9,143      | 5,597 s      | 612 ms         |
| [PureCars](https://www.purecars.com/)                                                     | 2,660      | 5,366 s      | 2017 ms        |
| [WordAds](https://wordads.co/)                                                            | 21,071     | 5,297 s      | 251 ms         |
| AB Tasty                                                                                  | 3,363      | 5,243 s      | 1559 ms        |
| [Rubicon Project](https://rubiconproject.com/)                                            | 35,955     | 5,229 s      | 145 ms         |
| [Sentry](https://sentry.io/)                                                              | 11,033     | 5,144 s      | 466 ms         |
| [GoDaddy](https://www.godaddy.com/)                                                       | 6,086      | 5,055 s      | 831 ms         |
| Adloox                                                                                    | 5,057      | 4,895 s      | 968 ms         |
| [Hubspot](https://hubspot.com/)                                                           | 28,497     | 4,829 s      | 169 ms         |
| [Snapchat](https://www.snapchat.com)                                                      | 11,148     | 4,808 s      | 431 ms         |
| [Olark](https://www.olark.com/)                                                           | 7,205      | 4,708 s      | 653 ms         |
| [Media.net](https://www.media.net/)                                                       | 25,352     | 4,691 s      | 185 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                              | 6,438      | 4,459 s      | 693 ms         |
| [Mailchimp](https://mailchimp.com/)                                                       | 21,068     | 4,441 s      | 211 ms         |
| [Tealium](https://tealium.com/)                                                           | 13,033     | 4,425 s      | 340 ms         |
| [PayPal](https://paypal.com)                                                              | 12,485     | 4,412 s      | 353 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                                  | 28,766     | 4,267 s      | 148 ms         |
| Esri ArcGIS                                                                               | 1,395      | 4,191 s      | 3005 ms        |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,517      | 4,184 s      | 1190 ms        |
| Klaviyo                                                                                   | 11,891     | 4,160 s      | 350 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 8,042      | 4,154 s      | 517 ms         |
| [Parking Crew](http://parkingcrew.net/)                                                   | 11,470     | 4,151 s      | 362 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 4,276      | 4,086 s      | 956 ms         |
| [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 3,927      | 3,942 s      | 1004 ms        |
| [fam](http://admin.fam-ad.com/report/)                                                    | 2,188      | 3,892 s      | 1779 ms        |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 20,719     | 3,889 s      | 188 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 19,547     | 3,721 s      | 190 ms         |
| Fastly                                                                                    | 5,142      | 3,680 s      | 716 ms         |
| Infolinks                                                                                 | 3,657      | 3,594 s      | 983 ms         |
| [Akamai](https://www.akamai.com/)                                                         | 10,541     | 3,543 s      | 336 ms         |
| [MediaVine](https://www.mediavine.com/)                                                   | 5,647      | 3,528 s      | 625 ms         |
| [Vimeo](http://vimeo.com/)                                                                | 14,147     | 3,520 s      | 249 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                                        | 10,078     | 3,391 s      | 336 ms         |
| Privy                                                                                     | 11,761     | 3,266 s      | 278 ms         |
| Skimbit                                                                                   | 20,440     | 3,259 s      | 159 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 9,086      | 3,179 s      | 350 ms         |
| Dailymotion                                                                               | 2,390      | 3,007 s      | 1258 ms        |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 12,514     | 2,962 s      | 237 ms         |
| [MGID](https://www.mgid.com/)                                                             | 7,087      | 2,853 s      | 403 ms         |
| [Optimizely](https://www.optimizely.com/)                                                 | 11,328     | 2,808 s      | 248 ms         |
| Monotype                                                                                  | 4,992      | 2,757 s      | 552 ms         |
| uLogin                                                                                    | 2,312      | 2,755 s      | 1192 ms        |
| LKQD                                                                                      | 1,747      | 2,700 s      | 1545 ms        |
| [Histats](http://histats.com/)                                                            | 10,663     | 2,684 s      | 252 ms         |
| Trust Pilot                                                                               | 13,820     | 2,606 s      | 189 ms         |
| [Yotpo](https://www.yotpo.com/)                                                           | 12,756     | 2,591 s      | 203 ms         |
| [Ensighten](https://www.ensighten.com/)                                                   | 5,412      | 2,577 s      | 476 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 16,223     | 2,442 s      | 151 ms         |
| Inspectlet                                                                                | 5,822      | 2,393 s      | 411 ms         |
| [OptinMonster](https://optinmonster.com/)                                                 | 9,053      | 2,386 s      | 264 ms         |
| VigLink                                                                                   | 8,175      | 2,284 s      | 279 ms         |
| [Spotify](https://www.spotify.com/)                                                       | 2,930      | 2,200 s      | 751 ms         |
| Azure Web Services                                                                        | 8,410      | 2,186 s      | 260 ms         |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 672        | 2,146 s      | 3194 ms        |
| [Sizmek](https://www.sizmek.com/)                                                         | 3,909      | 2,091 s      | 535 ms         |
| Simplicity Marketing                                                                      | 3,045      | 2,091 s      | 687 ms         |
| [RevJet](https://www.revjet.com/)                                                         | 4,646      | 1,924 s      | 414 ms         |
| [LinkedIn](https://www.linkedin.com/)                                                     | 15,987     | 1,902 s      | 119 ms         |
| [Segment](https://segment.com/)                                                           | 9,598      | 1,840 s      | 192 ms         |
| Gigya                                                                                     | 5,826      | 1,792 s      | 308 ms         |
| Tynt                                                                                      | 25,003     | 1,748 s      | 70 ms          |
| [AddToAny](https://www.addtoany.com/)                                                     | 25,069     | 1,721 s      | 69 ms          |
| Embedly                                                                                   | 3,778      | 1,615 s      | 428 ms         |
| [Pinterest](https://pinterest.com/)                                                       | 16,302     | 1,576 s      | 97 ms          |
| Bold Commerce                                                                             | 11,050     | 1,527 s      | 138 ms         |
| [Yahoo!](https://www.yahoo.com/)                                                          | 9,248      | 1,521 s      | 165 ms         |
| [VK](https://vk.com/)                                                                     | 15,503     | 1,501 s      | 97 ms          |
| Adform                                                                                    | 8,220      | 1,495 s      | 182 ms         |
| [Twitch](https://twitch.tv/)                                                              | 823        | 1,494 s      | 1816 ms        |
| Blindado                                                                                  | 681        | 1,494 s      | 2193 ms        |
| [Disqus](http://disqus.com/)                                                              | 1,816      | 1,492 s      | 822 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 12,418     | 1,482 s      | 119 ms         |
| Vidible                                                                                   | 1,569      | 1,469 s      | 936 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 11,993     | 1,382 s      | 115 ms         |
| [Instagram](https://www.instagram.com)                                                    | 9,351      | 1,370 s      | 146 ms         |
| FullStory                                                                                 | 6,815      | 1,335 s      | 196 ms         |
| [Intent Media](https://intent.com/)                                                       | 6,992      | 1,307 s      | 187 ms         |
| issuu                                                                                     | 2,069      | 1,297 s      | 627 ms         |
| iubenda                                                                                   | 13,029     | 1,296 s      | 99 ms          |
| [ContactAtOnce](https://www.contactatonce.com/)                                           | 3,478      | 1,278 s      | 368 ms         |
| Kakao                                                                                     | 12,590     | 1,259 s      | 100 ms         |
| Ezoic                                                                                     | 4,219      | 1,234 s      | 292 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 11,673     | 1,230 s      | 105 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 9,126      | 1,149 s      | 126 ms         |
| Mouseflow                                                                                 | 1,743      | 1,090 s      | 625 ms         |
| AdMatic                                                                                   | 996        | 1,074 s      | 1079 ms        |
| LongTail Ad Solutions                                                                     | 3,287      | 1,062 s      | 323 ms         |
| Evidon                                                                                    | 6,074      | 1,060 s      | 175 ms         |
| [Keen](https://keen.io/)                                                                  | 2,615      | 1,059 s      | 405 ms         |
| Dynamic Yield                                                                             | 942        | 1,028 s      | 1091 ms        |
| [Unpkg](https://unpkg.com)                                                                | 4,845      | 1,026 s      | 212 ms         |
| [Amazon Pay](https://pay.amazon.com)                                                      | 5,356      | 983 s        | 184 ms         |
| SpringServer                                                                              | 1,385      | 982 s        | 709 ms         |
| [Albacross](https://albacross.com/)                                                       | 1,894      | 978 s        | 516 ms         |
| Teads                                                                                     | 4,827      | 971 s        | 201 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 2,659      | 950 s        | 357 ms         |
| IBM Digital Analytics                                                                     | 1,082      | 946 s        | 875 ms         |
| Cxense                                                                                    | 4,788      | 887 s        | 185 ms         |
| [BrightTag / Signal](https://www.signal.co)                                               | 7,780      | 885 s        | 114 ms         |
| [DigiTrust](http://www.digitru.st/)                                                       | 1,701      | 884 s        | 519 ms         |
| LoyaltyLion                                                                               | 1,104      | 861 s        | 780 ms         |
| Microsoft Hosted Libs                                                                     | 5,218      | 854 s        | 164 ms         |
| Feefo.com                                                                                 | 1,674      | 827 s        | 494 ms         |
| [Help Scout](https://www.helpscout.net/)                                                  | 1,949      | 786 s        | 403 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                                | 7,030      | 785 s        | 112 ms         |
| [TrustArc](https://www.trustarc.com/)                                                     | 4,796      | 781 s        | 163 ms         |
| StickyADS.tv                                                                              | 858        | 775 s        | 904 ms         |
| sovrn                                                                                     | 2,921      | 759 s        | 260 ms         |
| [AppNexus](https://www.appnexus.com/)                                                     | 3,499      | 752 s        | 215 ms         |
| [New Relic](https://newrelic.com/)                                                        | 6,954      | 746 s        | 107 ms         |
| Yieldify                                                                                  | 566        | 735 s        | 1299 ms        |
| Admixer for Publishers                                                                    | 1,136      | 730 s        | 643 ms         |
| [VWO](https://vwo.com)                                                                    | 4,343      | 727 s        | 167 ms         |
| Ecwid                                                                                     | 973        | 716 s        | 735 ms         |
| Secomapp                                                                                  | 1,635      | 715 s        | 438 ms         |
| Index Exchange                                                                            | 5,008      | 714 s        | 143 ms         |
| Kaltura Video Platform                                                                    | 487        | 697 s        | 1432 ms        |
| CallRail                                                                                  | 7,392      | 697 s        | 94 ms          |
| StatCounter                                                                               | 10,171     | 697 s        | 68 ms          |
| SessionCam                                                                                | 888        | 683 s        | 769 ms         |
| Celtra                                                                                    | 3,706      | 681 s        | 184 ms         |
| TINT                                                                                      | 288        | 680 s        | 2363 ms        |
| TrafficStars                                                                              | 2,707      | 666 s        | 246 ms         |
| Bazaarvoice                                                                               | 1,740      | 660 s        | 380 ms         |
| Gemius                                                                                    | 7,344      | 650 s        | 88 ms          |
| Revolver Maps                                                                             | 1,106      | 645 s        | 583 ms         |
| Okas Concepts                                                                             | 622        | 642 s        | 1032 ms        |
| [HyperInzerce](https://hyperinzerce.cz)                                                   | 1,377      | 627 s        | 455 ms         |
| Heroku                                                                                    | 949        | 626 s        | 659 ms         |
| Bugsnag                                                                                   | 1,314      | 611 s        | 465 ms         |
| Pardot                                                                                    | 1,398      | 610 s        | 436 ms         |
| SocialShopWave                                                                            | 1,405      | 586 s        | 417 ms         |
| [33 Across](https://33across.com/)                                                        | 744        | 574 s        | 772 ms         |
| [OpenX](https://www.openx.com/)                                                           | 1,759      | 570 s        | 324 ms         |
| [Wicked Reports](https://www.wickedreports.com/)                                          | 657        | 567 s        | 863 ms         |
| [Quantum Metric](https://www.quantummetric.com/)                                          | 536        | 559 s        | 1043 ms        |
| [Outbrain](https://www.outbrain.com/)                                                     | 4,723      | 550 s        | 116 ms         |
| District M                                                                                | 6,744      | 545 s        | 81 ms          |
| [Adroll](https://www.adroll.com/)                                                         | 5,404      | 538 s        | 100 ms         |
| Medium                                                                                    | 1,238      | 531 s        | 429 ms         |
| Sekindo                                                                                   | 296        | 526 s        | 1775 ms        |
| [LivePerson](https://www.liveperson.com/)                                                 | 4,447      | 516 s        | 116 ms         |
| iBillboard                                                                                | 1,020      | 515 s        | 505 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 239        | 507 s        | 2119 ms        |
| Marchex                                                                                   | 4,398      | 506 s        | 115 ms         |
| Dataxu                                                                                    | 3,325      | 504 s        | 152 ms         |
| DTSCOUT                                                                                   | 4,476      | 504 s        | 113 ms         |
| LINE Corporation                                                                          | 4,292      | 490 s        | 114 ms         |
| SnapWidget                                                                                | 3,085      | 486 s        | 157 ms         |
| [Mixpanel](https://mixpanel.com/)                                                         | 6,235      | 485 s        | 78 ms          |
| SmartAdServer                                                                             | 3,396      | 481 s        | 142 ms         |
| Digioh                                                                                    | 1,102      | 481 s        | 437 ms         |
| Meetrics                                                                                  | 780        | 472 s        | 605 ms         |
| MaxCDN Enterprise                                                                         | 2,085      | 464 s        | 223 ms         |
| BannerFlow                                                                                | 828        | 454 s        | 549 ms         |
| i-mobile                                                                                  | 4,577      | 451 s        | 99 ms          |
| [Supership](https://supership.jp/)                                                        | 697        | 447 s        | 642 ms         |
| piano                                                                                     | 1,123      | 446 s        | 397 ms         |
| [AOL / Oath / Verizon Media](https://www.oath.com/)                                       | 2,073      | 440 s        | 212 ms         |
| Adocean                                                                                   | 818        | 427 s        | 521 ms         |
| Fort Awesome                                                                              | 825        | 426 s        | 516 ms         |
| Ve                                                                                        | 2,795      | 421 s        | 151 ms         |
| [Vidyard](https://www.vidyard.com/)                                                       | 412        | 420 s        | 1020 ms        |
| Booking.com                                                                               | 2,472      | 419 s        | 170 ms         |
| Clicktale                                                                                 | 1,091      | 412 s        | 378 ms         |
| Net Reviews                                                                               | 2,464      | 400 s        | 162 ms         |
| Smart AdServer                                                                            | 2,419      | 393 s        | 163 ms         |
| OpenTable                                                                                 | 2,442      | 392 s        | 160 ms         |
| Zmags                                                                                     | 159        | 385 s        | 2422 ms        |
| Chartbeat                                                                                 | 4,901      | 384 s        | 78 ms          |
| Media Management Technologies                                                             | 663        | 377 s        | 569 ms         |
| Nosto                                                                                     | 2,045      | 374 s        | 183 ms         |
| [AppDynamics](https://www.appdynamics.com/)                                               | 1,667      | 372 s        | 223 ms         |
| TrackJS                                                                                   | 840        | 365 s        | 434 ms         |
| Tribal Fusion                                                                             | 915        | 353 s        | 386 ms         |
| LoopMe                                                                                    | 510        | 344 s        | 675 ms         |
| UserReport                                                                                | 1,555      | 343 s        | 221 ms         |
| Seznam                                                                                    | 1,844      | 342 s        | 186 ms         |
| iAdvize SAS                                                                               | 1,023      | 341 s        | 333 ms         |
| StreamRail                                                                                | 223        | 340 s        | 1526 ms        |
| [Marketo](https://www.marketo.com)                                                        | 1,315      | 337 s        | 256 ms         |
| Parse.ly                                                                                  | 3,198      | 327 s        | 102 ms         |
| Signyfyd                                                                                  | 282        | 321 s        | 1137 ms        |
| Audience 360                                                                              | 432        | 320 s        | 741 ms         |
| Technorati                                                                                | 637        | 315 s        | 495 ms         |
| [Popads](https://www.popads.net/)                                                         | 2,997      | 314 s        | 105 ms         |
| BlueKai                                                                                   | 3,976      | 309 s        | 78 ms          |
| ThreatMetrix                                                                              | 253        | 308 s        | 1219 ms        |
| GitHub                                                                                    | 1,198      | 307 s        | 257 ms         |
| [Yandex CDN](https://yandex.ru/)                                                          | 2,037      | 306 s        | 150 ms         |
| Dynatrace                                                                                 | 397        | 305 s        | 767 ms         |
| ResponsiveVoice                                                                           | 1,039      | 301 s        | 290 ms         |
| Wishpond Technologies                                                                     | 667        | 300 s        | 449 ms         |
| Unbounce                                                                                  | 2,684      | 296 s        | 110 ms         |
| FreakOut                                                                                  | 3,870      | 295 s        | 76 ms          |
| [RD Station](https://www.rdstation.com/en/)                                               | 4,166      | 292 s        | 70 ms          |
| MailMunch                                                                                 | 4,654      | 288 s        | 62 ms          |
| Treasure Data                                                                             | 4,493      | 285 s        | 63 ms          |
| [Shareaholic](https://www.shareaholic.com/)                                               | 3,465      | 282 s        | 82 ms          |
| Adverline Board                                                                           | 1,052      | 282 s        | 268 ms         |
| PushCrew                                                                                  | 3,621      | 281 s        | 78 ms          |
| STINGRAY                                                                                  | 2,475      | 280 s        | 113 ms         |
| Between Digital                                                                           | 516        | 279 s        | 541 ms         |
| Sortable                                                                                  | 1,580      | 279 s        | 176 ms         |
| iPerceptions                                                                              | 2,237      | 278 s        | 124 ms         |
| [Verizon Digital Media CDN](https://www.verizondigitalmedia.com/)                         | 272        | 278 s        | 1020 ms        |
| Decibel Insight                                                                           | 567        | 275 s        | 485 ms         |
| [Beeketing](https://beeketing.com/)                                                       | 3,369      | 274 s        | 81 ms          |
| Ooyala                                                                                    | 367        | 273 s        | 745 ms         |
| [Quantcast](https://www.quantcast.com)                                                    | 3,031      | 269 s        | 89 ms          |
| Maxymiser                                                                                 | 899        | 264 s        | 294 ms         |
| Perfect Market                                                                            | 1,142      | 259 s        | 227 ms         |
| Yieldmo                                                                                   | 748        | 257 s        | 344 ms         |
| [BounceX](https://www.bouncex.com/)                                                       | 1,266      | 256 s        | 202 ms         |
| Auto Link Maker                                                                           | 891        | 252 s        | 283 ms         |
| ZEDO                                                                                      | 418        | 250 s        | 598 ms         |
| Pixlee                                                                                    | 447        | 247 s        | 553 ms         |
| Swiftype                                                                                  | 1,528      | 247 s        | 161 ms         |
| Opta                                                                                      | 407        | 245 s        | 603 ms         |
| FirstImpression                                                                           | 465        | 244 s        | 524 ms         |
| JuicyAds                                                                                  | 2,030      | 244 s        | 120 ms         |
| Reviews.co.uk                                                                             | 622        | 242 s        | 390 ms         |
| Pure Chat                                                                                 | 3,593      | 238 s        | 66 ms          |
| SearchSpring                                                                              | 383        | 238 s        | 621 ms         |
| [Market GID](https://www.marketgid.com/)                                                  | 731        | 237 s        | 324 ms         |
| OptiMonk                                                                                  | 1,374      | 236 s        | 172 ms         |
| Sharethrough                                                                              | 2,059      | 236 s        | 114 ms         |
| Experian Cross-Channel Marketing Platform                                                 | 139        | 233 s        | 1679 ms        |
| [Polar](https://polar.me/)                                                                | 841        | 229 s        | 272 ms         |
| GIPHY                                                                                     | 187        | 223 s        | 1195 ms        |
| [Media Math](http://www.mediamath.com/)                                                   | 2,081      | 217 s        | 104 ms         |
| AddEvent                                                                                  | 1,326      | 214 s        | 161 ms         |
| ForeSee                                                                                   | 1,098      | 214 s        | 195 ms         |
| Accuweather                                                                               | 1,783      | 209 s        | 117 ms         |
| Heap                                                                                      | 2,831      | 208 s        | 74 ms          |
| Knight Lab                                                                                | 172        | 206 s        | 1200 ms        |
| Permutive                                                                                 | 1,098      | 205 s        | 186 ms         |
| Connatix                                                                                  | 223        | 205 s        | 918 ms         |
| Affirm                                                                                    | 1,927      | 202 s        | 105 ms         |
| Kampyle                                                                                   | 882        | 196 s        | 222 ms         |
| Po.st                                                                                     | 815        | 193 s        | 237 ms         |
| Snacktools                                                                                | 644        | 192 s        | 298 ms         |
| Searchanise                                                                               | 2,739      | 191 s        | 70 ms          |
| LightWidget                                                                               | 3,242      | 186 s        | 57 ms          |
| TRUSTe                                                                                    | 1,869      | 186 s        | 99 ms          |
| Comm100                                                                                   | 1,310      | 185 s        | 141 ms         |
| Pagely                                                                                    | 757        | 182 s        | 240 ms         |
| etracker                                                                                  | 1,732      | 179 s        | 103 ms         |
| Stackla PTY                                                                               | 297        | 179 s        | 602 ms         |
| IPONWEB                                                                                   | 1,185      | 176 s        | 149 ms         |
| Monetate                                                                                  | 870        | 175 s        | 201 ms         |
| Opentag                                                                                   | 869        | 174 s        | 200 ms         |
| Rackspace                                                                                 | 801        | 173 s        | 216 ms         |
| Tencent                                                                                   | 1,258      | 172 s        | 137 ms         |
| [Optanon](https://www.cookielaw.org/)                                                     | 1,682      | 169 s        | 101 ms         |
| Expedia                                                                                   | 131        | 169 s        | 1289 ms        |
| Bizible                                                                                   | 1,260      | 168 s        | 133 ms         |
| ContentSquare                                                                             | 1,452      | 166 s        | 115 ms         |
| Siteimprove                                                                               | 2,023      | 166 s        | 82 ms          |
| [Listrak](https://www.listrak.com/)                                                       | 1,132      | 164 s        | 145 ms         |
| LiveTex                                                                                   | 751        | 163 s        | 217 ms         |
| Clerk.io ApS                                                                              | 884        | 162 s        | 183 ms         |
| PowerReviews                                                                              | 906        | 161 s        | 177 ms         |
| SpotXchange                                                                               | 537        | 160 s        | 298 ms         |
| Refersion                                                                                 | 1,371      | 160 s        | 117 ms         |
| eBay                                                                                      | 819        | 157 s        | 192 ms         |
| WisePops                                                                                  | 649        | 157 s        | 242 ms         |
| Fraudlogix                                                                                | 628        | 156 s        | 249 ms         |
| GetSiteControl                                                                            | 1,638      | 156 s        | 95 ms          |
| Convert Insights                                                                          | 977        | 155 s        | 159 ms         |
| Sift Science                                                                              | 1,043      | 153 s        | 147 ms         |
| [Click Guardian](https://www.clickguardian.co.uk/)                                        | 265        | 153 s        | 577 ms         |
| MonetizeMore                                                                              | 256        | 152 s        | 593 ms         |
| Touch Commerce                                                                            | 154        | 151 s        | 978 ms         |
| [Vox Media](https://www.voxmedia.com/)                                                    | 355        | 149 s        | 419 ms         |
| Hola Networks                                                                             | 200        | 148 s        | 741 ms         |
| [PageSense](https://www.zoho.com/pagesense/)                                              | 903        | 148 s        | 164 ms         |
| Forter                                                                                    | 471        | 146 s        | 310 ms         |
| Bronto Software                                                                           | 954        | 145 s        | 152 ms         |
| TagCommander                                                                              | 1,205      | 144 s        | 119 ms         |
| Investis                                                                                  | 74         | 140 s        | 1895 ms        |
| Roxr Software                                                                             | 2,142      | 139 s        | 65 ms          |
| Reviews.io                                                                                | 217        | 137 s        | 630 ms         |
| [WordPress Site Stats](https://wp.com/)                                                   | 2,206      | 134 s        | 61 ms          |
| Calendly                                                                                  | 196        | 134 s        | 683 ms         |
| Global-e                                                                                  | 291        | 133 s        | 459 ms         |
| [mParticle](https://www.mparticle.com/)                                                   | 349        | 132 s        | 378 ms         |
| PerimeterX Bot Defender                                                                   | 248        | 130 s        | 526 ms         |
| Qubit Deliver                                                                             | 318        | 130 s        | 410 ms         |
| Forensiq                                                                                  | 524        | 130 s        | 248 ms         |
| Marketplace Web Service                                                                   | 273        | 128 s        | 468 ms         |
| Constant Contact                                                                          | 1,563      | 123 s        | 79 ms          |
| Amplitude Mobile Analytics                                                                | 1,808      | 122 s        | 68 ms          |
| plista                                                                                    | 726        | 122 s        | 168 ms         |
| Moovweb                                                                                   | 58         | 121 s        | 2086 ms        |
| Curalate                                                                                  | 379        | 120 s        | 317 ms         |
| Skype                                                                                     | 709        | 120 s        | 170 ms         |
| iovation                                                                                  | 1,132      | 119 s        | 105 ms         |
| Intercept Interactive                                                                     | 1,005      | 118 s        | 117 ms         |
| Cloudinary                                                                                | 395        | 117 s        | 297 ms         |
| Rakuten Marketing                                                                         | 1,611      | 117 s        | 73 ms          |
| AvantLink                                                                                 | 181        | 116 s        | 643 ms         |
| Adyoulike                                                                                 | 1,614      | 116 s        | 72 ms          |
| Underdog Media                                                                            | 303        | 116 s        | 381 ms         |
| WebpageFX                                                                                 | 405        | 113 s        | 279 ms         |
| Evergage                                                                                  | 493        | 112 s        | 227 ms         |
| Gfycat                                                                                    | 66         | 108 s        | 1634 ms        |
| Nativo                                                                                    | 1,124      | 107 s        | 96 ms          |
| [Auth0](https://auth0.com/)                                                               | 252        | 107 s        | 423 ms         |
| TripAdvisor                                                                               | 603        | 106 s        | 176 ms         |
| [Freshdesk](https://freshdesk.com/)                                                       | 738        | 105 s        | 143 ms         |
| Flickr                                                                                    | 240        | 105 s        | 436 ms         |
| GetIntent RTBSuite                                                                        | 173        | 103 s        | 594 ms         |
| Yottaa                                                                                    | 263        | 102 s        | 388 ms         |
| [24]7                                                                                     | 131        | 100 s        | 760 ms         |
| Unruly Media                                                                              | 449        | 99 s         | 221 ms         |
| Bootstrap Chinese network                                                                 | 378        | 99 s         | 263 ms         |
| Symantec                                                                                  | 978        | 99 s         | 101 ms         |
| Mather Economics                                                                          | 711        | 98 s         | 138 ms         |
| Github                                                                                    | 803        | 98 s         | 122 ms         |
| Revcontent                                                                                | 478        | 96 s         | 201 ms         |
| Flowplayer                                                                                | 396        | 96 s         | 242 ms         |
| Apester                                                                                   | 378        | 95 s         | 253 ms         |
| ExoClick                                                                                  | 1,778      | 93 s         | 52 ms          |
| Covert Pics                                                                               | 378        | 92 s         | 242 ms         |
| Foursixty                                                                                 | 1,310      | 92 s         | 70 ms          |
| Adthink                                                                                   | 77         | 88 s         | 1142 ms        |
| [Concert](https://concert.io/)                                                            | 356        | 87 s         | 245 ms         |
| [Usabilla](https://usabilla.com)                                                          | 850        | 87 s         | 103 ms         |
| WebEngage                                                                                 | 590        | 85 s         | 144 ms         |
| Trusted Shops                                                                             | 2,280      | 83 s         | 36 ms          |
| Playbuzz                                                                                  | 193        | 82 s         | 426 ms         |
| [iZooto](https://www.izooto.com)                                                          | 1,057      | 81 s         | 77 ms          |
| Lytics                                                                                    | 609        | 81 s         | 133 ms         |
| Livefyre                                                                                  | 238        | 81 s         | 340 ms         |
| infogr.am                                                                                 | 66         | 81 s         | 1220 ms        |
| WalkMe                                                                                    | 149        | 79 s         | 528 ms         |
| Interpublic Group                                                                         | 449        | 78 s         | 173 ms         |
| [Attentive](https://attentivemobile.com/)                                                 | 649        | 78 s         | 120 ms         |
| GetResponse                                                                               | 886        | 78 s         | 87 ms          |
| Onet                                                                                      | 150        | 77 s         | 515 ms         |
| Smart Insight Tracking                                                                    | 895        | 76 s         | 85 ms          |
| Research Online                                                                           | 1,261      | 76 s         | 60 ms          |
| Sidecar                                                                                   | 256        | 75 s         | 293 ms         |
| BoldChat                                                                                  | 451        | 74 s         | 163 ms         |
| Geniee                                                                                    | 901        | 73 s         | 81 ms          |
| AIR.TV                                                                                    | 692        | 73 s         | 106 ms         |
| Shopgate                                                                                  | 324        | 71 s         | 221 ms         |
| Janrain                                                                                   | 122        | 71 s         | 583 ms         |
| SnapEngage                                                                                | 1,212      | 71 s         | 58 ms          |
| [DMD Marketing](https://www.dmdconnects.com/)                                             | 320        | 71 s         | 221 ms         |
| Snack Media                                                                               | 294        | 71 s         | 240 ms         |
| rewardStyle.com                                                                           | 491        | 71 s         | 144 ms         |
| AddShoppers                                                                               | 467        | 69 s         | 148 ms         |
| Kameleoon                                                                                 | 182        | 69 s         | 377 ms         |
| Keywee                                                                                    | 435        | 68 s         | 156 ms         |
| Typepad                                                                                   | 333        | 68 s         | 204 ms         |
| Arbor                                                                                     | 357        | 68 s         | 189 ms         |
| Picreel                                                                                   | 511        | 67 s         | 132 ms         |
| FoxyCart                                                                                  | 329        | 67 s         | 205 ms         |
| Branch Metrics                                                                            | 1,050      | 67 s         | 64 ms          |
| Adkontekst                                                                                | 238        | 67 s         | 281 ms         |
| Weborama                                                                                  | 505        | 64 s         | 127 ms         |
| SublimeSkinz                                                                              | 1,216      | 64 s         | 53 ms          |
| AdSniper                                                                                  | 160        | 63 s         | 394 ms         |
| Mobify                                                                                    | 120        | 63 s         | 523 ms         |
| Adobe Test & Target                                                                       | 92         | 62 s         | 670 ms         |
| [Adition](https://www.adition.com)                                                        | 300        | 62 s         | 205 ms         |
| News                                                                                      | 192        | 61 s         | 320 ms         |
| Wufoo                                                                                     | 777        | 61 s         | 79 ms          |
| The Hut Group                                                                             | 236        | 61 s         | 258 ms         |
| InSkin Media                                                                              | 82         | 61 s         | 739 ms         |
| MaxMind                                                                                   | 330        | 60 s         | 182 ms         |
| Simpli.fi                                                                                 | 347        | 59 s         | 170 ms         |
| [Radar](https://www.cedexis.com/radar/)                                                   | 607        | 59 s         | 97 ms          |
| Impact Radius                                                                             | 211        | 58 s         | 274 ms         |
| ClickDesk                                                                                 | 664        | 58 s         | 87 ms          |
| Ambassador                                                                                | 210        | 57 s         | 271 ms         |
| Affiliate Window                                                                          | 907        | 56 s         | 61 ms          |
| PlayAd Media Group                                                                        | 111        | 56 s         | 501 ms         |
| unpkg                                                                                     | 295        | 55 s         | 187 ms         |
| Reevoo                                                                                    | 195        | 55 s         | 280 ms         |
| [Pendo](https://www.pendo.io)                                                             | 512        | 53 s         | 104 ms         |
| Cachefly                                                                                  | 154        | 52 s         | 336 ms         |
| Tail Target                                                                               | 517        | 51 s         | 99 ms          |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                            | 936        | 51 s         | 54 ms          |
| Best Of Media S.A.                                                                        | 202        | 51 s         | 250 ms         |
| ReachForce                                                                                | 56         | 50 s         | 888 ms         |
| RebelMouse                                                                                | 50         | 49 s         | 987 ms         |
| Postcode Anywhere (Holdings)                                                              | 159        | 49 s         | 308 ms         |
| [OneSignal](https://onesignal.com/)                                                       | 428        | 48 s         | 112 ms         |
| Adobe Scene7                                                                              | 525        | 48 s         | 91 ms          |
| Autopilot                                                                                 | 554        | 48 s         | 86 ms          |
| ReCollect                                                                                 | 69         | 48 s         | 690 ms         |
| WebSpectator                                                                              | 205        | 47 s         | 230 ms         |
| LinkedIn Ads                                                                              | 397        | 47 s         | 118 ms         |
| AdsWizz                                                                                   | 183        | 46 s         | 253 ms         |
| Highcharts                                                                                | 353        | 46 s         | 130 ms         |
| ShopRunner                                                                                | 96         | 46 s         | 479 ms         |
| Profitshare                                                                               | 258        | 45 s         | 175 ms         |
| Nend                                                                                      | 1,251      | 45 s         | 36 ms          |
| JustPremium Ads                                                                           | 378        | 45 s         | 118 ms         |
| Google Plus                                                                               | 494        | 44 s         | 89 ms          |
| Reflektion                                                                                | 129        | 43 s         | 333 ms         |
| Kaizen Platform                                                                           | 197        | 43 s         | 216 ms         |
| [Pusher](https://pusher.com/)                                                             | 128        | 42 s         | 332 ms         |
| Sajari Pty                                                                                | 244        | 42 s         | 173 ms         |
| Ad6Media                                                                                  | 144        | 42 s         | 292 ms         |
| LiveHelpNow                                                                               | 352        | 42 s         | 119 ms         |
| reEmbed                                                                                   | 206        | 42 s         | 204 ms         |
| [Moxie](https://www.gomoxie.com/)                                                         | 119        | 42 s         | 352 ms         |
| Adnium                                                                                    | 229        | 41 s         | 181 ms         |
| SurveyMonkey                                                                              | 256        | 41 s         | 161 ms         |
| Crowd Control                                                                             | 582        | 41 s         | 71 ms          |
| Spot.IM                                                                                   | 112        | 41 s         | 366 ms         |
| [ReadSpeaker](https://www.readspeaker.com)                                                | 382        | 41 s         | 107 ms         |
| Survicate                                                                                 | 235        | 41 s         | 174 ms         |
| CPEx                                                                                      | 275        | 41 s         | 149 ms         |
| SaleCycle                                                                                 | 580        | 41 s         | 70 ms          |
| Zanox                                                                                     | 311        | 41 s         | 131 ms         |
| Appier                                                                                    | 473        | 40 s         | 86 ms          |
| Adyen                                                                                     | 56         | 40 s         | 715 ms         |
| Fresh Relevance                                                                           | 430        | 40 s         | 92 ms          |
| Adscale                                                                                   | 331        | 40 s         | 120 ms         |
| [Usersnap](https://usersnap.com)                                                          | 128        | 39 s         | 305 ms         |
| [The Trade Desk](https://www.thetradedesk.com/)                                           | 440        | 39 s         | 89 ms          |
| AdRiver                                                                                   | 200        | 39 s         | 195 ms         |
| Riskified                                                                                 | 548        | 37 s         | 68 ms          |
| Conversant Tag Manager                                                                    | 147        | 37 s         | 254 ms         |
| Gleam                                                                                     | 397        | 37 s         | 94 ms          |
| Clicktripz                                                                                | 365        | 37 s         | 102 ms         |
| Tradelab                                                                                  | 451        | 37 s         | 82 ms          |
| Dynamic Converter                                                                         | 85         | 37 s         | 430 ms         |
| IBM Acoustic Campaign                                                                     | 520        | 36 s         | 70 ms          |
| Petametrics                                                                               | 246        | 36 s         | 148 ms         |
| AudienceSearch                                                                            | 546        | 36 s         | 66 ms          |
| Talkable                                                                                  | 382        | 36 s         | 93 ms          |
| Rocket Fuel                                                                               | 450        | 35 s         | 78 ms          |
| Key CDN                                                                                   | 288        | 35 s         | 122 ms         |
| [Alexa](https://www.alexa.com/)                                                           | 1,123      | 35 s         | 31 ms          |
| Socialphotos                                                                              | 207        | 35 s         | 169 ms         |
| Effective Measure                                                                         | 458        | 34 s         | 74 ms          |
| Madison Logic                                                                             | 465        | 34 s         | 73 ms          |
| [Braze](https://www.braze.com)                                                            | 313        | 34 s         | 108 ms         |
| Kargo                                                                                     | 54         | 34 s         | 623 ms         |
| [Ipify](https://www.ipify.org)                                                            | 307        | 34 s         | 110 ms         |
| Salesforce Live Agent                                                                     | 56         | 33 s         | 596 ms         |
| [Fastly Insights](https://insights.fastlylabs.com)                                        | 563        | 33 s         | 58 ms          |
| Vibrant Media                                                                             | 269        | 32 s         | 120 ms         |
| Alchemy                                                                                   | 81         | 32 s         | 397 ms         |
| TruConversion                                                                             | 216        | 32 s         | 148 ms         |
| ZergNet                                                                                   | 54         | 32 s         | 591 ms         |
| Sooqr Search                                                                              | 481        | 31 s         | 65 ms          |
| fluct                                                                                     | 747        | 31 s         | 42 ms          |
| SkyScanner                                                                                | 126        | 31 s         | 246 ms         |
| Vergic AB                                                                                 | 106        | 30 s         | 285 ms         |
| Tagboard                                                                                  | 134        | 30 s         | 222 ms         |
| MLveda                                                                                    | 74         | 30 s         | 401 ms         |
| Omniconvert                                                                               | 332        | 30 s         | 89 ms          |
| [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)                       | 577        | 29 s         | 50 ms          |
| DemandBase                                                                                | 339        | 28 s         | 83 ms          |
| Salesforce.com                                                                            | 463        | 28 s         | 61 ms          |
| Expedia USA                                                                               | 84         | 28 s         | 333 ms         |
| Resonance Insights                                                                        | 122        | 28 s         | 229 ms         |
| Advance Magazine Group                                                                    | 191        | 28 s         | 145 ms         |
| [Luigi’s Box](https://www.luigisbox.com/)                                                 | 227        | 28 s         | 122 ms         |
| Viacom                                                                                    | 169        | 28 s         | 163 ms         |
| Proper Media                                                                              | 124        | 27 s         | 220 ms         |
| VoiceFive                                                                                 | 283        | 27 s         | 96 ms          |
| GumGum                                                                                    | 524        | 27 s         | 51 ms          |
| Transifex                                                                                 | 126        | 26 s         | 207 ms         |
| Conversion Labs                                                                           | 67         | 26 s         | 390 ms         |
| Sparkflow                                                                                 | 213        | 26 s         | 122 ms         |
| KISSmetrics                                                                               | 396        | 26 s         | 66 ms          |
| CNET Content Solutions                                                                    | 77         | 25 s         | 329 ms         |
| Mediahawk                                                                                 | 86         | 25 s         | 294 ms         |
| User Replay                                                                               | 67         | 25 s         | 377 ms         |
| Zarget                                                                                    | 172        | 25 s         | 146 ms         |
| Steelhouse                                                                                | 266        | 25 s         | 94 ms          |
| Delta Projects AB                                                                         | 294        | 25 s         | 85 ms          |
| Turn                                                                                      | 305        | 25 s         | 82 ms          |
| Reklama                                                                                   | 211        | 24 s         | 115 ms         |
| Qualaroo                                                                                  | 366        | 24 s         | 66 ms          |
| Customer.io                                                                               | 206        | 24 s         | 116 ms         |
| Feedbackify                                                                               | 290        | 24 s         | 82 ms          |
| Fanplayr                                                                                  | 213        | 23 s         | 110 ms         |
| FLXone                                                                                    | 148        | 23 s         | 158 ms         |
| [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)                    | 82         | 23 s         | 276 ms         |
| Mopinion                                                                                  | 136        | 22 s         | 164 ms         |
| Sirv                                                                                      | 250        | 22 s         | 89 ms          |
| SlimCut Media Outstream                                                                   | 130        | 22 s         | 170 ms         |
| Rakuten LinkShare                                                                         | 150        | 22 s         | 146 ms         |
| Vivocha S.p.A                                                                             | 156        | 22 s         | 139 ms         |
| Expedia Australia                                                                         | 55         | 22 s         | 395 ms         |
| Edge Web Fonts                                                                            | 266        | 22 s         | 81 ms          |
| bRealTime                                                                                 | 161        | 22 s         | 134 ms         |
| Vee24                                                                                     | 73         | 21 s         | 294 ms         |
| linkpulse                                                                                 | 317        | 21 s         | 67 ms          |
| Wow Analytics                                                                             | 118        | 21 s         | 175 ms         |
| DialogTech                                                                                | 213        | 21 s         | 97 ms          |
| Polldaddy                                                                                 | 120        | 20 s         | 171 ms         |
| Infinity Tracking                                                                         | 257        | 20 s         | 80 ms          |
| AI Media Group                                                                            | 103        | 20 s         | 198 ms         |
| Travelocity USA                                                                           | 54         | 20 s         | 377 ms         |
| Vergic Engage Platform                                                                    | 80         | 20 s         | 250 ms         |
| Sweet Tooth                                                                               | 230        | 20 s         | 87 ms          |
| Opinion Stage                                                                             | 152        | 20 s         | 131 ms         |
| [Iterate](https://iteratehq.com/)                                                         | 70         | 19 s         | 274 ms         |
| Storygize                                                                                 | 144        | 19 s         | 132 ms         |
| PebblePost                                                                                | 65         | 19 s         | 291 ms         |
| Civic                                                                                     | 293        | 19 s         | 64 ms          |
| Triblio                                                                                   | 98         | 19 s         | 189 ms         |
| epoq internet services                                                                    | 177        | 18 s         | 103 ms         |
| Userzoom                                                                                  | 103        | 18 s         | 176 ms         |
| TechTarget                                                                                | 57         | 18 s         | 316 ms         |
| CleverTap                                                                                 | 228        | 18 s         | 78 ms          |
| Barilliance                                                                               | 126        | 18 s         | 141 ms         |
| AWeber                                                                                    | 169        | 17 s         | 101 ms         |
| LoginRadius                                                                               | 83         | 17 s         | 206 ms         |
| Flockler                                                                                  | 103        | 17 s         | 166 ms         |
| ResponseTap                                                                               | 247        | 17 s         | 69 ms          |
| Conversio                                                                                 | 224        | 17 s         | 75 ms          |
| [Acceptable Ads](https://acceptableads.com/)                                              | 149        | 17 s         | 112 ms         |
| NetAffiliation                                                                            | 174        | 17 s         | 96 ms          |
| Dropbox                                                                                   | 54         | 17 s         | 308 ms         |
| Borderfree                                                                                | 57         | 16 s         | 286 ms         |
| VidPulse                                                                                  | 79         | 16 s         | 205 ms         |
| RichRelevance                                                                             | 65         | 16 s         | 249 ms         |
| Ghostery Enterprise                                                                       | 72         | 16 s         | 219 ms         |
| Hull.js                                                                                   | 92         | 16 s         | 170 ms         |
| Republer                                                                                  | 167        | 15 s         | 93 ms          |
| Elastic Ad                                                                                | 176        | 15 s         | 87 ms          |
| Alliance for Audited Media                                                                | 61         | 15 s         | 250 ms         |
| The Publisher Desk                                                                        | 55         | 15 s         | 275 ms         |
| Cookie-Script.com                                                                         | 163        | 15 s         | 93 ms          |
| [Smartlook](https://www.smartlook.com/)                                                   | 51         | 15 s         | 295 ms         |
| Accordant Media                                                                           | 211        | 15 s         | 71 ms          |
| Hupso Website Analyzer                                                                    | 251        | 15 s         | 60 ms          |
| OnScroll                                                                                  | 140        | 15 s         | 106 ms         |
| Bookatable                                                                                | 148        | 14 s         | 95 ms          |
| [Widespace](https://www.widespace.com)                                                    | 140        | 13 s         | 96 ms          |
| Twitter Online Conversion Tracking                                                        | 95         | 13 s         | 141 ms         |
| Meltwater Group                                                                           | 84         | 13 s         | 158 ms         |
| cloudIQ                                                                                   | 117        | 13 s         | 113 ms         |
| Qualtrics                                                                                 | 112        | 13 s         | 118 ms         |
| Klevu Search                                                                              | 218        | 13 s         | 59 ms          |
| Friendbuy                                                                                 | 116        | 13 s         | 111 ms         |
| reddit                                                                                    | 118        | 13 s         | 108 ms         |
| Bluecore                                                                                  | 159        | 12 s         | 78 ms          |
| Fonecall                                                                                  | 74         | 12 s         | 168 ms         |
| The ADEX                                                                                  | 213        | 12 s         | 58 ms          |
| Pixalate                                                                                  | 80         | 12 s         | 152 ms         |
| [Netlify](https://www.netlify.com/)                                                       | 166        | 12 s         | 73 ms          |
| Vertical Mass                                                                             | 69         | 12 s         | 171 ms         |
| [GoSquared](https://www.gosquared.com)                                                    | 186        | 12 s         | 64 ms          |
| Cookie Reports                                                                            | 119        | 12 s         | 97 ms          |
| Elecard StreamEye                                                                         | 56         | 11 s         | 201 ms         |
| CANDDi                                                                                    | 80         | 11 s         | 141 ms         |
| Woopra                                                                                    | 151        | 11 s         | 74 ms          |
| Optimove                                                                                  | 102        | 11 s         | 109 ms         |
| Prezi                                                                                     | 59         | 11 s         | 187 ms         |
| Tag Inspector                                                                             | 99         | 11 s         | 111 ms         |
| One by AOL                                                                                | 51         | 11 s         | 215 ms         |
| Rakuten MediaForge                                                                        | 69         | 11 s         | 155 ms         |
| Drip                                                                                      | 258        | 11 s         | 41 ms          |
| Site24x7 Real User Monitoring                                                             | 124        | 11 s         | 85 ms          |
| CyberSource (Visa)                                                                        | 167        | 11 s         | 63 ms          |
| Adobe Marketing Cloud                                                                     | 150        | 11 s         | 70 ms          |
| [Byside](http://www.byside.com)                                                           | 62         | 10 s         | 166 ms         |
| PowerFront                                                                                | 54         | 10 s         | 185 ms         |
| Navegg                                                                                    | 192        | 10 s         | 52 ms          |
| Web Dissector                                                                             | 67         | 10 s         | 145 ms         |
| MaxPoint Interactive                                                                      | 89         | 9 s          | 105 ms         |
| TripleLift                                                                                | 81         | 9 s          | 115 ms         |
| Datonics                                                                                  | 128        | 9 s          | 72 ms          |
| Exponea                                                                                   | 146        | 9 s          | 63 ms          |
| AnswerDash                                                                                | 72         | 9 s          | 127 ms         |
| Microad                                                                                   | 113        | 9 s          | 80 ms          |
| Sonobi                                                                                    | 75         | 9 s          | 121 ms         |
| Reactful                                                                                  | 83         | 9 s          | 107 ms         |
| MailPlus                                                                                  | 80         | 9 s          | 111 ms         |
| Polyfill service                                                                          | 91         | 9 s          | 95 ms          |
| Oracle Recommendations On Demand                                                          | 96         | 8 s          | 88 ms          |
| OwnerIQ                                                                                   | 152        | 8 s          | 55 ms          |
| JingDong                                                                                  | 57         | 8 s          | 145 ms         |
| HotelsCombined                                                                            | 69         | 8 s          | 119 ms         |
| Raygun                                                                                    | 83         | 8 s          | 97 ms          |
| UPS i-parcel                                                                              | 65         | 8 s          | 121 ms         |
| Exactag                                                                                   | 80         | 8 s          | 98 ms          |
| Betgenius                                                                                 | 110        | 8 s          | 68 ms          |
| Braintree Payments                                                                        | 77         | 7 s          | 97 ms          |
| Remintrex                                                                                 | 91         | 7 s          | 81 ms          |
| AdTrue                                                                                    | 64         | 7 s          | 115 ms         |
| Attribution                                                                               | 112        | 7 s          | 65 ms          |
| SecuredVisit                                                                              | 114        | 7 s          | 64 ms          |
| StackAdapt                                                                                | 61         | 7 s          | 117 ms         |
| Filestack                                                                                 | 68         | 7 s          | 104 ms         |
| CleverDATA                                                                                | 87         | 7 s          | 79 ms          |
| Exponential Interactive                                                                   | 171        | 7 s          | 40 ms          |
| ShopStorm                                                                                 | 73         | 7 s          | 92 ms          |
| Netmining                                                                                 | 134        | 7 s          | 49 ms          |
| Extole                                                                                    | 60         | 7 s          | 109 ms         |
| Ziff Davis Tech                                                                           | 100        | 7 s          | 65 ms          |
| DistroScale                                                                               | 54         | 7 s          | 121 ms         |
| Swoop                                                                                     | 110        | 6 s          | 59 ms          |
| [TurnTo](https://www.turntonetworks.com/)                                                 | 59         | 6 s          | 108 ms         |
| RightNow Service Cloud                                                                    | 60         | 6 s          | 105 ms         |
| Council ad Network                                                                        | 91         | 6 s          | 69 ms          |
| Freespee                                                                                  | 77         | 6 s          | 81 ms          |
| AdvertServe                                                                               | 72         | 6 s          | 85 ms          |
| Sojern                                                                                    | 92         | 6 s          | 64 ms          |
| Realytics                                                                                 | 91         | 6 s          | 65 ms          |
| Video Media Groep                                                                         | 66         | 6 s          | 88 ms          |
| Ekm Systems                                                                               | 113        | 6 s          | 50 ms          |
| Mux                                                                                       | 60         | 6 s          | 93 ms          |
| UpSellit                                                                                  | 64         | 5 s          | 86 ms          |
| [emetriq](https://www.emetriq.com/)                                                       | 92         | 5 s          | 59 ms          |
| NaviStone                                                                                 | 63         | 5 s          | 83 ms          |
| Datacamp                                                                                  | 65         | 5 s          | 80 ms          |
| OneSoon                                                                                   | 72         | 5 s          | 71 ms          |
| AdSupply                                                                                  | 51         | 5 s          | 95 ms          |
| Intilery                                                                                  | 62         | 5 s          | 78 ms          |
| Sailthru                                                                                  | 77         | 5 s          | 61 ms          |
| [Holimetrix](https://u360.d-bi.fr/)                                                       | 71         | 5 s          | 66 ms          |
| Boomtrain                                                                                 | 63         | 4 s          | 70 ms          |
| Cardosa Enterprises                                                                       | 61         | 4 s          | 72 ms          |
| Neodata                                                                                   | 70         | 4 s          | 61 ms          |
| DialogTech SourceTrak                                                                     | 77         | 4 s          | 55 ms          |
| Aggregate Knowledge                                                                       | 65         | 4 s          | 63 ms          |
| Perfect Audience                                                                          | 55         | 4 s          | 72 ms          |
| Klarna                                                                                    | 56         | 4 s          | 65 ms          |
| Hawk Search                                                                               | 63         | 4 s          | 57 ms          |
| JustUno                                                                                   | 153        | 3 s          | 20 ms          |
| [Xaxis](https://www.xaxis.com/)                                                           | 54         | 3 s          | 56 ms          |
| [Catchpoint](https://www.catchpoint.com/)                                                 | 56         | 3 s          | 53 ms          |
| Fastest Forward                                                                           | 55         | 2 s          | 43 ms          |
| [Gravatar](http://en.gravatar.com/)                                                       | 52         | 2 s          | 38 ms          |
| Reach Group                                                                               | 67         | 1 s          | 18 ms          |

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

1. Edit `all-observed-domains-query.sql` to query the correct month's HTTPArchive run.
1. Run `all-observed-domains-query.sql` in BigQuery.
1. Download the results and check them in at `data/YYYY-MM-01-observed-domains.json`.
1. Edit `bootup-time-scripting.partial.sql` to query the correct month's HTTPArchive run.
1. Run `origin-query.generated.sql` in BigQuery.
1. Download the results and check them in at `data/YYYY-MM-01-origin-scripting.json`.
1. Run `yarn build` to regenerate the latest canonical domain mapping.
1. Create a new table in `lighthouse-infrastructure.third_party_web` BigQuery table of the format `YYYY_MM_01` with the csv in `dist/domain-map.csv` with three columns `domain`, `canonicalDomain`, and `category`.
1. Edit `bootup-time-scripting.partial.sql` to join on the table you just created.
1. Run `yarn build` to regenerate the queries.
1. Run `entity-per-page.generated.sql` in BigQuery.
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
