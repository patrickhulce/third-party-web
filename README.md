# [Third Party Web](https://www.thirdpartyweb.today/)

## Check out the shiny new web UI https://www.thirdpartyweb.today/

Data on third party entities and their impact on the web.

This document is a summary of which third party scripts are most responsible for excessive JavaScript execution on the web today.

## Table of Contents

1.  [Goals](#goals)
1.  [Methodology](#methodology)
1.  [npm Module](#npm-module)
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

[HTTP Archive](https://httparchive.org/) is an initiative that tracks how the web is built. Every month, ~4 million sites are crawled with [Lighthouse](https://github.com/GoogleChrome/lighthouse) on mobile. Lighthouse breaks down the total script execution time of each page and attributes the execution to a URL. Using [BigQuery](https://cloud.google.com/bigquery/), this project aggregates the script execution to the origin-level and assigns each origin to the responsible entity.

## npm Module

The entity classification data is available as an npm module.

```js
const {getEntity} = require('third-party-web')
const entity = getEntity('https://d36mpcpuzc4ztk.cloudfront.net/js/visitor.js')
console.log(entity)
//   {
//     "name": "Freshdesk",
//     "homepage": "https://freshdesk.com/",
//     "category": "customer-success",
//     "domains": ["d36mpcpuzc4ztk.cloudfront.net"]
//   }
```

## Updates

## 2021-01-01 dataset

Due to a change in HTTPArchive measurement which temporarily disabled site-isolation (out-of-process iframes), all of the third-parties whose work previously took place off the main-thread are now counted _on_ the main thread (and thus appear in our stats). This is most evident in the change to Google-owned properties such as YouTube and Doubleclick whose _complete_ cost are now captured.

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

## 2019-05-06 dataset

Google Ads clarified that `www.googletagservices.com` serves more ad scripts than generic tag management, and it has been reclassified accordingly. This has dropped the overall Tag Management share considerably back down to its earlier position.

## 2019-03-01 dataset

Almost 2,000 entities tracked now across ~3,000+ domains! Huge props to [@simonhearne](https://twitter.com/simonhearne) for making this massive increase possible. Tag Managers have now been split out into their own category since they represented such a large percentage of the "Mixed / Other" category.

## 2019-02-01 dataset

Huge props to [WordAds](https://wordads.co/) for reducing their impact from ~2.5s to ~200ms on average! A few entities are showing considerably less data this cycle (Media Math, Crazy Egg, DoubleVerify, Bootstrap CDN). Perhaps they've added new CDNs/hostnames that we haven't identified or the basket of sites in HTTPArchive has shifted away from their usage.

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

| Rank | Name                                                                             | Usage     | Average Impact |
| ---- | -------------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Bidswitch](https://www.bidswitch.com/)                                          | 39,349    | 0 ms           |
| 2    | Unruly Media                                                                     | 6,983     | 0 ms           |
| 3    | Nativo                                                                           | 28,465    | 0 ms           |
| 4    | AcuityAds                                                                        | 9,415     | 0 ms           |
| 5    | AdGear                                                                           | 48,485    | 1 ms           |
| 6    | Tribal Fusion                                                                    | 121,668   | 1 ms           |
| 7    | MaxPoint Interactive                                                             | 12,319    | 1 ms           |
| 8    | Crimtan                                                                          | 57,806    | 1 ms           |
| 9    | [Truffle Bid](https://truffle.bid/)                                              | 17,580    | 1 ms           |
| 10   | adKernel                                                                         | 12,246    | 1 ms           |
| 11   | Beeswax                                                                          | 10,163    | 2 ms           |
| 12   | TripleLift                                                                       | 3,269     | 2 ms           |
| 13   | [iPROM](https://iprom.eu/)                                                       | 55,739    | 2 ms           |
| 14   | Bidtellect                                                                       | 10,797    | 2 ms           |
| 15   | [33 Across](https://33across.com/)                                               | 143,028   | 17 ms          |
| 16   | Adform                                                                           | 86,043    | 21 ms          |
| 17   | [AppNexus](https://www.appnexus.com/)                                            | 177,948   | 22 ms          |
| 18   | GumGum                                                                           | 123,920   | 25 ms          |
| 19   | LoopMe                                                                           | 42,799    | 33 ms          |
| 20   | Constant Contact                                                                 | 17,757    | 34 ms          |
| 21   | Adyoulike                                                                        | 4,235     | 41 ms          |
| 22   | Sonobi                                                                           | 54,966    | 50 ms          |
| 23   | OneTag                                                                           | 29,755    | 60 ms          |
| 24   | sovrn                                                                            | 19,708    | 61 ms          |
| 25   | RTB House AdPilot                                                                | 5,708     | 61 ms          |
| 26   | Simpli.fi                                                                        | 10,408    | 64 ms          |
| 27   | MailMunch                                                                        | 17,494    | 66 ms          |
| 28   | [The Trade Desk](https://www.thetradedesk.com/)                                  | 15,948    | 72 ms          |
| 29   | SiteScout                                                                        | 2,419     | 76 ms          |
| 30   | BlueCava                                                                         | 5,973     | 77 ms          |
| 31   | [OpenX](https://www.openx.com/)                                                  | 64,159    | 78 ms          |
| 32   | Twitter Online Conversion Tracking                                               | 68,128    | 79 ms          |
| 33   | DTSCOUT                                                                          | 5,825     | 81 ms          |
| 34   | StackAdapt                                                                       | 13,484    | 84 ms          |
| 35   | ActiveCampaign                                                                   | 14,794    | 85 ms          |
| 36   | [Scorecard Research](https://www.scorecardresearch.com/)                         | 46,698    | 87 ms          |
| 37   | Branch Metrics                                                                   | 13,774    | 91 ms          |
| 38   | Affiliate Window                                                                 | 4,621     | 93 ms          |
| 39   | LinkedIn Ads                                                                     | 185,878   | 105 ms         |
| 40   | Rocket Fuel                                                                      | 2,889     | 111 ms         |
| 41   | [Yahoo!](https://www.yahoo.com/)                                                 | 22,674    | 112 ms         |
| 42   | [Criteo](https://www.criteo.com/)                                                | 166,950   | 118 ms         |
| 43   | Index Exchange                                                                   | 33,569    | 118 ms         |
| 44   | Crowd Control                                                                    | 70,113    | 138 ms         |
| 45   | LINE Corporation                                                                 | 25,032    | 144 ms         |
| 46   | [Quora Ads](https://www.quora.com/business/)                                     | 9,350     | 148 ms         |
| 47   | Gemius                                                                           | 16,231    | 155 ms         |
| 48   | AudienceSearch                                                                   | 51,541    | 156 ms         |
| 49   | Intercept Interactive                                                            | 18,825    | 160 ms         |
| 50   | ucfunnel ucX                                                                     | 8,917     | 163 ms         |
| 51   | [Bing Ads](https://bingads.microsoft.com)                                        | 45,983    | 167 ms         |
| 52   | Simplicity Marketing                                                             | 2,985     | 169 ms         |
| 53   | STINGRAY                                                                         | 7,281     | 171 ms         |
| 54   | AdRiver                                                                          | 4,615     | 171 ms         |
| 55   | IPONWEB                                                                          | 25,122    | 174 ms         |
| 56   | TVSquared                                                                        | 4,989     | 192 ms         |
| 57   | Technorati                                                                       | 22,378    | 193 ms         |
| 58   | i-mobile                                                                         | 11,887    | 196 ms         |
| 59   | InMobi                                                                           | 104,469   | 202 ms         |
| 60   | Tynt                                                                             | 162,031   | 207 ms         |
| 61   | Smart AdServer                                                                   | 110,015   | 213 ms         |
| 62   | [Outbrain](https://www.outbrain.com/)                                            | 11,507    | 216 ms         |
| 63   | Salesforce.com                                                                   | 5,224     | 223 ms         |
| 64   | [ID5 Identity Cloud](https://id5.io/)                                            | 65,666    | 241 ms         |
| 65   | [Media.net](https://www.media.net/)                                              | 93,235    | 244 ms         |
| 66   | TrafficStars                                                                     | 7,758     | 284 ms         |
| 67   | Unbounce                                                                         | 9,119     | 290 ms         |
| 68   | [Amazon Ads](https://ad.amazon.com/)                                             | 178,521   | 304 ms         |
| 69   | [Adroll](https://www.adroll.com/)                                                | 31,187    | 321 ms         |
| 70   | Skimbit                                                                          | 81,338    | 326 ms         |
| 71   | Teads                                                                            | 6,910     | 331 ms         |
| 72   | [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 18,856    | 339 ms         |
| 73   | fluct                                                                            | 22,281    | 341 ms         |
| 74   | [Supership](https://supership.jp/)                                               | 18,113    | 379 ms         |
| 75   | Microad                                                                          | 15,517    | 465 ms         |
| 76   | [Attentive](https://attentivemobile.com/)                                        | 9,167     | 515 ms         |
| 77   | Cxense                                                                           | 3,731     | 533 ms         |
| 78   | OptiMonk                                                                         | 10,492    | 607 ms         |
| 79   | VigLink                                                                          | 6,675     | 621 ms         |
| 80   | Klaviyo                                                                          | 142,928   | 628 ms         |
| 81   | Privy                                                                            | 19,433    | 633 ms         |
| 82   | [WordAds](https://wordads.co/)                                                   | 102,326   | 654 ms         |
| 83   | Geniee                                                                           | 14,542    | 680 ms         |
| 84   | [Taboola](https://www.taboola.com/)                                              | 50,491    | 721 ms         |
| 85   | [AdScore](https://www.adscore.com/)                                              | 4,378     | 771 ms         |
| 86   | LongTail Ad Solutions                                                            | 6,169     | 774 ms         |
| 87   | [Integral Ad Science](https://integralads.com/uk/)                               | 15,169    | 827 ms         |
| 88   | LoyaltyLion                                                                      | 4,114     | 832 ms         |
| 89   | [Rubicon Project](https://rubiconproject.com/)                                   | 220,490   | 994 ms         |
| 90   | [Moat](https://moat.com/)                                                        | 3,871     | 1053 ms        |
| 91   | [DoubleVerify](https://www.doubleverify.com/)                                    | 4,742     | 1171 ms        |
| 92   | [Seedtag](https://www.seedtag.com/)                                              | 2,517     | 1509 ms        |
| 93   | [Sizmek](https://www.sizmek.com/)                                                | 5,738     | 1579 ms        |
| 94   | [Ad Lightning](https://www.adlightning.com/)                                     | 4,424     | 1619 ms        |
| 95   | [Pubmatic](https://pubmatic.com/)                                                | 221,342   | 1673 ms        |
| 96   | Infolinks                                                                        | 5,956     | 1780 ms        |
| 97   | [MGID](https://www.mgid.com/)                                                    | 9,910     | 1920 ms        |
| 98   | Yahoo! Ad Exchange                                                               | 4,938     | 2932 ms        |
| 99   | [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,187,232 | 2951 ms        |
| 100  | [Mediavine](https://www.mediavine.com/)                                          | 9,737     | 4099 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Mouseflow](https://mouseflow.com/)                                           | 4,985     | 49 ms          |
| 2    | [SpeedCurve RUM](https://www.speedcurve.com/features/performance-monitoring/) | 2,172     | 56 ms          |
| 3    | Roxr Software                                                                 | 11,407    | 63 ms          |
| 4    | [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)        | 1,008     | 65 ms          |
| 5    | Movable Ink                                                                   | 4,756     | 84 ms          |
| 6    | Sailthru                                                                      | 1,394     | 84 ms          |
| 7    | [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)          | 1,878     | 88 ms          |
| 8    | Woopra                                                                        | 1,275     | 89 ms          |
| 9    | Treasure Data                                                                 | 13,596    | 95 ms          |
| 10   | [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 32,660    | 98 ms          |
| 11   | [Smartlook](https://www.smartlook.com/)                                       | 17,276    | 101 ms         |
| 12   | [XiTi](https://www.atinternet.com/en/)                                        | 4,514     | 103 ms         |
| 13   | StatCounter                                                                   | 51,587    | 104 ms         |
| 14   | [Fastly Insights](https://insights.fastlylabs.com)                            | 1,631     | 108 ms         |
| 15   | Conversant                                                                    | 46,155    | 112 ms         |
| 16   | Exponea                                                                       | 1,407     | 112 ms         |
| 17   | [Google Analytics](https://marketingplatform.google.com/about/analytics/)     | 4,492,386 | 113 ms         |
| 18   | [Brandmetrics](https://www.brandmetrics.com)                                  | 14,878    | 115 ms         |
| 19   | Polldaddy                                                                     | 2,283     | 127 ms         |
| 20   | Stamped.io                                                                    | 12,633    | 134 ms         |
| 21   | [Usabilla](https://usabilla.com)                                              | 1,253     | 143 ms         |
| 22   | Marchex                                                                       | 8,400     | 160 ms         |
| 23   | [Braze](https://www.braze.com)                                                | 1,801     | 161 ms         |
| 24   | [Mixpanel](https://mixpanel.com/)                                             | 20,444    | 163 ms         |
| 25   | [Quantcast](https://www.quantcast.com)                                        | 68,514    | 164 ms         |
| 26   | Reviews.co.uk                                                                 | 1,903     | 171 ms         |
| 27   | [Plausible](https://plausible.io/)                                            | 6,318     | 189 ms         |
| 28   | Smart Insight Tracking                                                        | 1,731     | 193 ms         |
| 29   | [Matomo](https://matomo.org/)                                                 | 13,627    | 195 ms         |
| 30   | Amplitude Mobile Analytics                                                    | 36,102    | 197 ms         |
| 31   | Chartbeat                                                                     | 6,716     | 205 ms         |
| 32   | Parse.ly                                                                      | 6,090     | 222 ms         |
| 33   | [Clearbit](https://clearbit.com/)                                             | 4,139     | 226 ms         |
| 34   | Trust Pilot                                                                   | 44,986    | 240 ms         |
| 35   | CallTrackingMetrics                                                           | 7,943     | 246 ms         |
| 36   | CallRail                                                                      | 28,869    | 247 ms         |
| 37   | UpSellit                                                                      | 1,995     | 249 ms         |
| 38   | etracker                                                                      | 5,611     | 271 ms         |
| 39   | [PageSense](https://www.zoho.com/pagesense/)                                  | 5,672     | 297 ms         |
| 40   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)  | 17,481    | 350 ms         |
| 41   | Survicate                                                                     | 3,308     | 353 ms         |
| 42   | [Pendo](https://www.pendo.io)                                                 | 13,339    | 357 ms         |
| 43   | [Segment](https://segment.com/)                                               | 27,198    | 371 ms         |
| 44   | Reviews.io                                                                    | 4,153     | 376 ms         |
| 45   | Heap                                                                          | 13,234    | 377 ms         |
| 46   | Evergage                                                                      | 2,659     | 387 ms         |
| 47   | Okta                                                                          | 3,178     | 393 ms         |
| 48   | [Snapchat](https://www.snapchat.com)                                          | 49,950    | 394 ms         |
| 49   | [Marketo](https://www.marketo.com)                                            | 1,885     | 395 ms         |
| 50   | Bazaarvoice                                                                   | 3,267     | 444 ms         |
| 51   | Net Reviews                                                                   | 2,786     | 446 ms         |
| 52   | [Crazy Egg](https://www.crazyegg.com/)                                        | 20,551    | 485 ms         |
| 53   | [BowNow](https://bow-now.jp/)                                                 | 2,295     | 495 ms         |
| 54   | Evidon                                                                        | 2,383     | 495 ms         |
| 55   | [AB Tasty](https://www.abtasty.com/)                                          | 3,343     | 497 ms         |
| 56   | Convert Insights                                                              | 4,173     | 522 ms         |
| 57   | Nosto                                                                         | 1,177     | 607 ms         |
| 58   | [Appcues](https://www.appcues.com/)                                           | 2,285     | 611 ms         |
| 59   | Feefo.com                                                                     | 2,034     | 620 ms         |
| 60   | [VWO](https://vwo.com)                                                        | 8,018     | 639 ms         |
| 61   | [Hotjar](https://www.hotjar.com/)                                             | 331,046   | 661 ms         |
| 62   | Qualtrics                                                                     | 6,893     | 700 ms         |
| 63   | [Kameleoon](https://www.kameleoon.com/)                                       | 2,272     | 714 ms         |
| 64   | FullStory                                                                     | 13,553    | 733 ms         |
| 65   | Clerk.io ApS                                                                  | 1,947     | 777 ms         |
| 66   | TrackJS                                                                       | 1,846     | 791 ms         |
| 67   | PowerReviews                                                                  | 1,526     | 807 ms         |
| 68   | [Optimizely](https://www.optimizely.com/)                                     | 15,648    | 862 ms         |
| 69   | ContentSquare                                                                 | 3,541     | 912 ms         |
| 70   | Revolver Maps                                                                 | 2,174     | 983 ms         |
| 71   | Insider                                                                       | 1,888     | 1004 ms        |
| 72   | Gigya                                                                         | 2,041     | 1244 ms        |
| 73   | [Quantum Metric](https://www.quantummetric.com/)                              | 1,171     | 1265 ms        |
| 74   | [Lucky Orange](https://www.luckyorange.com/)                                  | 4,451     | 1434 ms        |
| 75   | Inspectlet                                                                    | 5,338     | 1469 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                    | Usage     | Average Impact |
| ---- | --------------------------------------- | --------- | -------------- |
| 1    | [Pinterest](https://pinterest.com/)     | 131,404   | 144 ms         |
| 2    | [AddToAny](https://www.addtoany.com/)   | 66,597    | 146 ms         |
| 3    | reddit                                  | 16,277    | 238 ms         |
| 4    | AddShoppers                             | 1,916     | 339 ms         |
| 5    | [ShareThis](https://www.sharethis.com/) | 88,927    | 343 ms         |
| 6    | [Facebook](https://www.facebook.com)    | 3,181,112 | 388 ms         |
| 7    | [TikTok](https://www.tiktok.com/en/)    | 216,013   | 457 ms         |
| 8    | Kakao                                   | 63,748    | 642 ms         |
| 9    | [PIXNET](https://www.pixnet.net/)       | 15,397    | 883 ms         |
| 10   | [Instagram](https://www.instagram.com)  | 10,229    | 1259 ms        |
| 11   | SocialShopWave                          | 4,310     | 1501 ms        |
| 12   | [Disqus](https://disqus.com/)           | 1,868     | 1856 ms        |
| 13   | [Tumblr](https://tumblr.com/)           | 17,795    | 2831 ms        |
| 14   | [VK](https://vk.com/)                   | 24,581    | 3018 ms        |
| 15   | LiveJournal                             | 9,526     | 6430 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage   | Average Impact |
| ---- | -------------------------------------------- | ------- | -------------- |
| 1    | [Brightcove](https://www.brightcove.com/en/) | 13,140  | 1095 ms        |
| 2    | [Vimeo](https://vimeo.com/)                  | 141,111 | 2848 ms        |
| 3    | [Wistia](https://wistia.com/)                | 26,716  | 3189 ms        |
| 4    | [YouTube](https://youtube.com)               | 962,447 | 4991 ms        |
| 5    | [Twitch](https://twitch.tv/)                 | 1,481   | 14295 ms       |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                      | Usage     | Average Impact |
| ---- | --------------------------------------------------------- | --------- | -------------- |
| 1    | [Statuspage](https://www.statuspage.io)                   | 1,178     | 32 ms          |
| 2    | Siteimprove                                               | 9,176     | 76 ms          |
| 3    | Rollbar                                                   | 1,422     | 91 ms          |
| 4    | Raygun                                                    | 2,128     | 91 ms          |
| 5    | [Pusher](https://pusher.com/)                             | 1,458     | 97 ms          |
| 6    | [Checkout.com](https://www.checkout.com)                  | 1,138     | 106 ms         |
| 7    | iovation                                                  | 2,098     | 108 ms         |
| 8    | [Afterpay](https://www.afterpay.com/)                     | 8,476     | 131 ms         |
| 9    | Klarna                                                    | 8,280     | 132 ms         |
| 10   | [Ipify](https://www.ipify.org)                            | 2,161     | 132 ms         |
| 11   | CyberSource (Visa)                                        | 2,071     | 135 ms         |
| 12   | Braintree Payments                                        | 1,011     | 136 ms         |
| 13   | Macropod BugHerd                                          | 2,678     | 139 ms         |
| 14   | Seznam                                                    | 9,262     | 158 ms         |
| 15   | Bitly                                                     | 2,982     | 159 ms         |
| 16   | [Amazon Pay](https://pay.amazon.com)                      | 6,678     | 161 ms         |
| 17   | [Netlify](https://www.netlify.com/)                       | 1,334     | 199 ms         |
| 18   | Highcharts                                                | 3,108     | 215 ms         |
| 19   | Riskified                                                 | 1,849     | 218 ms         |
| 20   | LightWidget                                               | 11,137    | 226 ms         |
| 21   | Cookie-Script.com                                         | 41,416    | 227 ms         |
| 22   | [OneSignal](https://onesignal.com/)                       | 66,993    | 254 ms         |
| 23   | [New Relic](https://newrelic.com/)                        | 234,392   | 261 ms         |
| 24   | Wufoo                                                     | 1,580     | 264 ms         |
| 25   | [Foxentry](https://foxentry.cz/)                          | 1,927     | 270 ms         |
| 26   | [TrustArc](https://www.trustarc.com/)                     | 7,399     | 300 ms         |
| 27   | Google reCAPTCHA                                          | 27,115    | 304 ms         |
| 28   | [Cookiebot](https://www.cookiebot.com/)                   | 171,304   | 308 ms         |
| 29   | [Accessibe Accessibility Overlay](https://accessibe.com/) | 48,634    | 313 ms         |
| 30   | Swiftype                                                  | 1,100     | 351 ms         |
| 31   | Hexton                                                    | 32,052    | 353 ms         |
| 32   | [Clarity](https://clarity.microsoft.com/)                 | 338,320   | 359 ms         |
| 33   | Trusted Shops                                             | 17,192    | 375 ms         |
| 34   | Bold Commerce                                             | 11,926    | 435 ms         |
| 35   | Key CDN                                                   | 9,387     | 435 ms         |
| 36   | Klevu Search                                              | 1,416     | 437 ms         |
| 37   | GitHub                                                    | 15,865    | 450 ms         |
| 38   | GetSiteControl                                            | 3,062     | 476 ms         |
| 39   | Affirm                                                    | 6,608     | 502 ms         |
| 40   | Google APIs                                               | 2,829,706 | 504 ms         |
| 41   | [Sentry](https://sentry.io/)                              | 89,805    | 578 ms         |
| 42   | iubenda                                                   | 93,939    | 583 ms         |
| 43   | ThreatMetrix                                              | 2,936     | 606 ms         |
| 44   | Mapbox                                                    | 19,309    | 664 ms         |
| 45   | Amazon CloudFront                                         | 447,439   | 783 ms         |
| 46   | [PayPal](https://paypal.com)                              | 56,799    | 879 ms         |
| 47   | Forter                                                    | 6,249     | 902 ms         |
| 48   | [AppDynamics](https://www.appdynamics.com/)               | 3,420     | 909 ms         |
| 49   | [GoDaddy](https://www.godaddy.com/)                       | 122,072   | 939 ms         |
| 50   | [Vidyard](https://www.vidyard.com/)                       | 1,063     | 980 ms         |
| 51   | Secomapp                                                  | 2,228     | 1099 ms        |
| 52   | [Stripe](https://stripe.com)                              | 127,053   | 1142 ms        |
| 53   | [Luigis Box](https://www.luigisbox.com/)                  | 2,222     | 1212 ms        |
| 54   | Marker                                                    | 1,509     | 1241 ms        |
| 55   | WisePops                                                  | 2,044     | 1243 ms        |
| 56   | Signyfyd                                                  | 2,570     | 1495 ms        |
| 57   | Fastly                                                    | 9,548     | 1685 ms        |
| 58   | Adyen                                                     | 2,339     | 2055 ms        |
| 59   | Datacamp                                                  | 1,273     | 2386 ms        |
| 60   | Rambler                                                   | 16,911    | 4050 ms        |
| 61   | [POWr](https://www.powr.io)                               | 39,714    | 4760 ms        |
| 62   | Esri ArcGIS                                               | 3,520     | 5792 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [WordPress](https://wp.com/)                                                              | 112,333 | 135 ms         |
| 2    | [Blogger](https://www.blogger.com/)                                                       | 230,715 | 174 ms         |
| 3    | [Dealer](https://www.dealer.com/)                                                         | 2,340   | 340 ms         |
| 4    | Civic                                                                                     | 6,533   | 351 ms         |
| 5    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 4,005   | 380 ms         |
| 6    | [Shopify](https://www.shopify.com/)                                                       | 308,430 | 759 ms         |
| 7    | Global-e                                                                                  | 1,215   | 791 ms         |
| 8    | Typepad                                                                                   | 1,253   | 856 ms         |
| 9    | Ecwid                                                                                     | 5,568   | 877 ms         |
| 10   | Rackspace                                                                                 | 2,616   | 1188 ms        |
| 11   | [Tilda](https://tilda.cc/)                                                                | 69,945  | 1316 ms        |
| 12   | [Hatena Blog](https://hatenablog.com/)                                                    | 43,311  | 1999 ms        |
| 13   | [Squarespace](https://www.squarespace.com/)                                               | 236,282 | 3643 ms        |
| 14   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 4,817   | 4384 ms        |
| 15   | [Wix](https://www.wix.com/)                                                               | 447,776 | 4780 ms        |
| 16   | [Weebly](https://www.weebly.com/)                                                         | 66,212  | 5814 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                      | Usage   | Average Impact |
| ---- | ----------------------------------------- | ------- | -------------- |
| 1    | [Albacross](https://albacross.com/)       | 1,345   | 66 ms          |
| 2    | Madison Logic                             | 1,672   | 74 ms          |
| 3    | DemandBase                                | 2,212   | 128 ms         |
| 4    | [Convertful](https://convertful.com/)     | 1,556   | 160 ms         |
| 5    | SharpSpring                               | 2,186   | 306 ms         |
| 6    | [Listrak](https://www.listrak.com/)       | 1,204   | 381 ms         |
| 7    | [OptinMonster](https://optinmonster.com/) | 2,592   | 410 ms         |
| 8    | [Mailchimp](https://mailchimp.com/)       | 47,455  | 470 ms         |
| 9    | Sojern                                    | 4,032   | 482 ms         |
| 10   | Wishpond Technologies                     | 1,700   | 516 ms         |
| 11   | [Hubspot](https://hubspot.com/)           | 147,803 | 524 ms         |
| 12   | [iZooto](https://www.izooto.com)          | 2,305   | 630 ms         |
| 13   | [Yotpo](https://www.yotpo.com/)           | 27,064  | 630 ms         |
| 14   | Kargo                                     | 1,603   | 672 ms         |
| 15   | [PureCars](https://www.purecars.com/)     | 1,816   | 737 ms         |
| 16   | [KARTE](https://karte.io/)                | 1,755   | 909 ms         |
| 17   | [Judge.me](https://judge.me/)             | 28,115  | 975 ms         |
| 18   | [Beeketing](https://beeketing.com/)       | 2,144   | 1008 ms        |
| 19   | [Wunderkind](https://www.wunderkind.co/)  | 1,249   | 1337 ms        |
| 20   | [Sumo](https://sumo.com/)                 | 11,786  | 1433 ms        |
| 21   | Bigcommerce                               | 19,752  | 2260 ms        |
| 22   | [Drift](https://www.drift.com/)           | 5,811   | 4337 ms        |
| 23   | [Tray Commerce](https://www.tray.com.br/) | 13,884  | 4623 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                                        | Usage   | Average Impact |
| ---- | ----------------------------------------------------------- | ------- | -------------- |
| 1    | SnapEngage                                                  | 1,002   | 111 ms         |
| 2    | iPerceptions                                                | 5,939   | 133 ms         |
| 3    | [Help Scout](https://www.helpscout.net/)                    | 4,485   | 139 ms         |
| 4    | Foursixty                                                   | 1,325   | 202 ms         |
| 5    | LiveTex                                                     | 1,838   | 221 ms         |
| 6    | WebEngage                                                   | 2,162   | 274 ms         |
| 7    | Pure Chat                                                   | 3,262   | 330 ms         |
| 8    | [Tawk.to](https://www.tawk.to/)                             | 110,841 | 369 ms         |
| 9    | [Smartsupp](https://www.smartsupp.com)                      | 21,642  | 402 ms         |
| 10   | Comm100                                                     | 1,039   | 450 ms         |
| 11   | [Jivochat](https://www.jivochat.com/)                       | 55,528  | 637 ms         |
| 12   | [LivePerson](https://www.liveperson.com/)                   | 2,800   | 694 ms         |
| 13   | [Intercom](https://www.intercom.com)                        | 32,751  | 1100 ms        |
| 14   | [Tidio Live Chat](https://www.tidiochat.com/en/)            | 25,353  | 1183 ms        |
| 15   | [Olark](https://www.olark.com/)                             | 6,740   | 1320 ms        |
| 16   | [ZenDesk](https://zendesk.com/)                             | 76,358  | 1497 ms        |
| 17   | [LiveChat](https://www.livechat.com/)                       | 39,618  | 1580 ms        |
| 18   | Dynamic Yield                                               | 1,860   | 1945 ms        |
| 19   | [Freshchat](https://www.freshworks.com/live-chat-software/) | 6,930   | 2995 ms        |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Spotify](https://www.spotify.com/)       | 11,075 | 9 ms           |
| 2    | OpenTable                                 | 4,215  | 81 ms          |
| 3    | TripAdvisor                               | 2,032  | 132 ms         |
| 4    | Accuweather                               | 1,582  | 172 ms         |
| 5    | SnapWidget                                | 13,528 | 178 ms         |
| 6    | Tencent                                   | 7,352  | 291 ms         |
| 7    | Cloudinary                                | 2,576  | 506 ms         |
| 8    | CPEx                                      | 1,137  | 509 ms         |
| 9    | Booking.com                               | 2,490  | 514 ms         |
| 10   | Revcontent                                | 1,226  | 865 ms         |
| 11   | [AMP](https://amp.dev/)                   | 88,558 | 1054 ms        |
| 12   | Embedly                                   | 10,431 | 1400 ms        |
| 13   | Adobe Systems                             | 1,346  | 1454 ms        |
| 14   | issuu                                     | 2,692  | 1957 ms        |
| 15   | [SoundCloud](https://www.soundcloud.com/) | 6,046  | 2475 ms        |
| 16   | [Hotmart](https://www.hotmart.com/)       | 4,021  | 2880 ms        |
| 17   | Dailymotion                               | 5,448  | 8684 ms        |
| 18   | Medium                                    | 19,674 | 12527 ms       |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                           | Usage   | Average Impact |
| ---- | ---------------------------------------------- | ------- | -------------- |
| 1    | [Bootstrap CDN](https://www.bootstrapcdn.com/) | 31,395  | 55 ms          |
| 2    | [FontAwesome CDN](https://fontawesome.com/)    | 310,457 | 219 ms         |
| 3    | Monotype                                       | 3,295   | 222 ms         |
| 4    | Microsoft Hosted Libs                          | 19,679  | 225 ms         |
| 5    | [Adobe TypeKit](https://fonts.adobe.com/)      | 102,867 | 340 ms         |
| 6    | Fort Awesome                                   | 3,781   | 348 ms         |
| 7    | [jQuery CDN](https://code.jquery.com/)         | 713,888 | 382 ms         |
| 8    | [Akamai](https://www.akamai.com/)              | 10,205  | 396 ms         |
| 9    | [JSDelivr CDN](https://www.jsdelivr.com/)      | 348,983 | 635 ms         |
| 10   | Azure Web Services                             | 58,060  | 738 ms         |
| 11   | [Unpkg](https://unpkg.com)                     | 138,968 | 976 ms         |
| 12   | [Yandex CDN](https://yandex.ru/)               | 172,717 | 1715 ms        |
| 13   | [CreateJS CDN](https://code.createjs.com/)     | 4,377   | 2936 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 185,058   | 186 ms         |
| 2    | [Yahoo! Tag Manager](https://marketing.yahoo.co.jp/service/tagmanager/)       | 9,086     | 225 ms         |
| 3    | TagCommander                                                                  | 1,455     | 286 ms         |
| 4    | [Ensighten](https://www.ensighten.com/)                                       | 3,034     | 545 ms         |
| 5    | [Tealium](https://tealium.com/)                                               | 27,531    | 556 ms         |
| 6    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 7,862,343 | 708 ms         |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                            | Usage   | Average Impact |
| ---- | ----------------------------------------------- | ------- | -------------- |
| 1    | [Trustcommander](https://www.commandersact.com) | 1,701   | 176 ms         |
| 2    | [UniConsent CMP](https://www.uniconsent.com)    | 1,335   | 331 ms         |
| 3    | [Optanon](https://www.cookielaw.org/)           | 114,690 | 442 ms         |
| 4    | [Usercentrics CMP](https://usercentrics.com)    | 47,786  | 1018 ms        |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | Browser-Update.org                                                  | 12,856  | 39 ms          |
| 2    | [ReadSpeaker](https://www.readspeaker.com)                          | 5,561   | 107 ms         |
| 3    | ResponsiveVoice                                                     | 6,401   | 121 ms         |
| 4    | Polyfill service                                                    | 1,293   | 209 ms         |
| 5    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 1,875   | 304 ms         |
| 6    | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 124,070 | 411 ms         |
| 7    | Sirv                                                                | 1,004   | 563 ms         |
| 8    | Heroku                                                              | 15,268  | 1037 ms        |
| 9    | Calendly                                                            | 4,012   | 1637 ms        |
| 10   | uLogin                                                              | 1,429   | 2920 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                             | Popularity | Total Impact | Average Impact |
| -------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)    | 7,862,343  | 5,570,434 s  | 708 ms         |
| [YouTube](https://youtube.com)                                                   | 962,447    | 4,803,276 s  | 4991 ms        |
| [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,187,232  | 3,503,247 s  | 2951 ms        |
| [Wix](https://www.wix.com/)                                                      | 447,776    | 2,140,326 s  | 4780 ms        |
| Google APIs                                                                      | 2,829,706  | 1,425,935 s  | 504 ms         |
| [Facebook](https://www.facebook.com)                                             | 3,181,112  | 1,232,877 s  | 388 ms         |
| [Squarespace](https://www.squarespace.com/)                                      | 236,282    | 860,825 s    | 3643 ms        |
| [Google Analytics](https://marketingplatform.google.com/about/analytics/)        | 4,492,386  | 507,048 s    | 113 ms         |
| [Vimeo](https://vimeo.com/)                                                      | 141,111    | 401,821 s    | 2848 ms        |
| [Weebly](https://www.weebly.com/)                                                | 66,212     | 384,979 s    | 5814 ms        |
| [Pubmatic](https://pubmatic.com/)                                                | 221,342    | 370,374 s    | 1673 ms        |
| Amazon CloudFront                                                                | 447,439    | 350,495 s    | 783 ms         |
| [Yandex CDN](https://yandex.ru/)                                                 | 172,717    | 296,239 s    | 1715 ms        |
| [jQuery CDN](https://code.jquery.com/)                                           | 713,888    | 272,883 s    | 382 ms         |
| Medium                                                                           | 19,674     | 246,465 s    | 12527 ms       |
| [Shopify](https://www.shopify.com/)                                              | 308,430    | 234,072 s    | 759 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                        | 348,983    | 221,627 s    | 635 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                   | 220,490    | 219,220 s    | 994 ms         |
| [Hotjar](https://www.hotjar.com/)                                                | 331,046    | 218,866 s    | 661 ms         |
| [POWr](https://www.powr.io)                                                      | 39,714     | 189,043 s    | 4760 ms        |
| [Stripe](https://stripe.com)                                                     | 127,053    | 145,091 s    | 1142 ms        |
| [Unpkg](https://unpkg.com)                                                       | 138,968    | 135,670 s    | 976 ms         |
| [Clarity](https://clarity.microsoft.com/)                                        | 338,320    | 121,291 s    | 359 ms         |
| [GoDaddy](https://www.godaddy.com/)                                              | 122,072    | 114,575 s    | 939 ms         |
| [ZenDesk](https://zendesk.com/)                                                  | 76,358     | 114,299 s    | 1497 ms        |
| [TikTok](https://www.tiktok.com/en/)                                             | 216,013    | 98,800 s     | 457 ms         |
| [AMP](https://amp.dev/)                                                          | 88,558     | 93,312 s     | 1054 ms        |
| [Tilda](https://tilda.cc/)                                                       | 69,945     | 92,013 s     | 1316 ms        |
| Klaviyo                                                                          | 142,928    | 89,735 s     | 628 ms         |
| [Hatena Blog](https://hatenablog.com/)                                           | 43,311     | 86,578 s     | 1999 ms        |
| [Wistia](https://wistia.com/)                                                    | 26,716     | 85,189 s     | 3189 ms        |
| [Hubspot](https://hubspot.com/)                                                  | 147,803    | 77,398 s     | 524 ms         |
| [VK](https://vk.com/)                                                            | 24,581     | 74,190 s     | 3018 ms        |
| Rambler                                                                          | 16,911     | 68,484 s     | 4050 ms        |
| [FontAwesome CDN](https://fontawesome.com/)                                      | 310,457    | 67,996 s     | 219 ms         |
| [WordAds](https://wordads.co/)                                                   | 102,326    | 66,936 s     | 654 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                        | 13,884     | 64,191 s     | 4623 ms        |
| [LiveChat](https://www.livechat.com/)                                            | 39,618     | 62,605 s     | 1580 ms        |
| LiveJournal                                                                      | 9,526      | 61,254 s     | 6430 ms        |
| [New Relic](https://newrelic.com/)                                               | 234,392    | 61,179 s     | 261 ms         |
| iubenda                                                                          | 93,939     | 54,801 s     | 583 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                             | 178,521    | 54,193 s     | 304 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                          | 171,304    | 52,718 s     | 308 ms         |
| [Sentry](https://sentry.io/)                                                     | 89,805     | 51,914 s     | 578 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                | 124,070    | 50,935 s     | 411 ms         |
| [Optanon](https://www.cookielaw.org/)                                            | 114,690    | 50,639 s     | 442 ms         |
| [Tumblr](https://tumblr.com/)                                                    | 17,795     | 50,380 s     | 2831 ms        |
| [PayPal](https://paypal.com)                                                     | 56,799     | 49,907 s     | 879 ms         |
| [Usercentrics CMP](https://usercentrics.com)                                     | 47,786     | 48,634 s     | 1018 ms        |
| Dailymotion                                                                      | 5,448      | 47,310 s     | 8684 ms        |
| Bigcommerce                                                                      | 19,752     | 44,633 s     | 2260 ms        |
| Azure Web Services                                                               | 58,060     | 42,862 s     | 738 ms         |
| [Tawk.to](https://www.tawk.to/)                                                  | 110,841    | 40,925 s     | 369 ms         |
| Kakao                                                                            | 63,748     | 40,915 s     | 642 ms         |
| [Blogger](https://www.blogger.com/)                                              | 230,715    | 40,050 s     | 174 ms         |
| [Mediavine](https://www.mediavine.com/)                                          | 9,737      | 39,911 s     | 4099 ms        |
| [Taboola](https://www.taboola.com/)                                              | 50,491     | 36,416 s     | 721 ms         |
| [Intercom](https://www.intercom.com)                                             | 32,751     | 36,035 s     | 1100 ms        |
| [Jivochat](https://www.jivochat.com/)                                            | 55,528     | 35,384 s     | 637 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                        | 102,867    | 34,927 s     | 340 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                  | 185,058    | 34,337 s     | 186 ms         |
| Tynt                                                                             | 162,031    | 33,579 s     | 207 ms         |
| [ShareThis](https://www.sharethis.com/)                                          | 88,927     | 30,503 s     | 343 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                 | 25,353     | 30,004 s     | 1183 ms        |
| [Judge.me](https://judge.me/)                                                    | 28,115     | 27,417 s     | 975 ms         |
| Skimbit                                                                          | 81,338     | 26,509 s     | 326 ms         |
| [Drift](https://www.drift.com/)                                                  | 5,811      | 25,201 s     | 4337 ms        |
| Smart AdServer                                                                   | 110,015    | 23,473 s     | 213 ms         |
| [Media.net](https://www.media.net/)                                              | 93,235     | 22,748 s     | 244 ms         |
| [Mailchimp](https://mailchimp.com/)                                              | 47,455     | 22,316 s     | 470 ms         |
| [Twitch](https://twitch.tv/)                                                     | 1,481      | 21,171 s     | 14295 ms       |
| InMobi                                                                           | 104,469    | 21,128 s     | 202 ms         |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                             | 4,817      | 21,119 s     | 4384 ms        |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                      | 6,930      | 20,752 s     | 2995 ms        |
| Esri ArcGIS                                                                      | 3,520      | 20,389 s     | 5792 ms        |
| [Criteo](https://www.criteo.com/)                                                | 166,950    | 19,735 s     | 118 ms         |
| [Snapchat](https://www.snapchat.com)                                             | 49,950     | 19,672 s     | 394 ms         |
| LinkedIn Ads                                                                     | 185,878    | 19,446 s     | 105 ms         |
| [MGID](https://www.mgid.com/)                                                    | 9,910      | 19,024 s     | 1920 ms        |
| [Pinterest](https://pinterest.com/)                                              | 131,404    | 18,956 s     | 144 ms         |
| [Yotpo](https://www.yotpo.com/)                                                  | 27,064     | 17,055 s     | 630 ms         |
| [OneSignal](https://onesignal.com/)                                              | 66,993     | 16,995 s     | 254 ms         |
| [Sumo](https://sumo.com/)                                                        | 11,786     | 16,885 s     | 1433 ms        |
| Fastly                                                                           | 9,548      | 16,085 s     | 1685 ms        |
| [ID5 Identity Cloud](https://id5.io/)                                            | 65,666     | 15,838 s     | 241 ms         |
| Heroku                                                                           | 15,268     | 15,828 s     | 1037 ms        |
| [Tealium](https://tealium.com/)                                                  | 27,531     | 15,312 s     | 556 ms         |
| [Accessibe Accessibility Overlay](https://accessibe.com/)                        | 48,634     | 15,222 s     | 313 ms         |
| [WordPress](https://wp.com/)                                                     | 112,333    | 15,167 s     | 135 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                        | 6,046      | 14,966 s     | 2475 ms        |
| Embedly                                                                          | 10,431     | 14,607 s     | 1400 ms        |
| Yahoo! Ad Exchange                                                               | 4,938      | 14,478 s     | 2932 ms        |
| [Brightcove](https://www.brightcove.com/en/)                                     | 13,140     | 14,390 s     | 1095 ms        |
| [PIXNET](https://www.pixnet.net/)                                                | 15,397     | 13,589 s     | 883 ms         |
| [Optimizely](https://www.optimizely.com/)                                        | 15,648     | 13,482 s     | 862 ms         |
| [Instagram](https://www.instagram.com)                                           | 10,229     | 12,876 s     | 1259 ms        |
| [CreateJS CDN](https://code.createjs.com/)                                       | 4,377      | 12,852 s     | 2936 ms        |
| Mapbox                                                                           | 19,309     | 12,812 s     | 664 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                               | 15,169     | 12,543 s     | 827 ms         |
| Privy                                                                            | 19,433     | 12,294 s     | 633 ms         |
| [Hotmart](https://www.hotmart.com/)                                              | 4,021      | 11,581 s     | 2880 ms        |
| Hexton                                                                           | 32,052     | 11,304 s     | 353 ms         |
| [Quantcast](https://www.quantcast.com)                                           | 68,514     | 11,252 s     | 164 ms         |
| Trust Pilot                                                                      | 44,986     | 10,788 s     | 240 ms         |
| Infolinks                                                                        | 5,956      | 10,599 s     | 1780 ms        |
| [Segment](https://segment.com/)                                                  | 27,198     | 10,082 s     | 371 ms         |
| [Adroll](https://www.adroll.com/)                                                | 31,187     | 10,021 s     | 321 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                           | 20,551     | 9,971 s      | 485 ms         |
| FullStory                                                                        | 13,553     | 9,934 s      | 733 ms         |
| Geniee                                                                           | 14,542     | 9,887 s      | 680 ms         |
| [AddToAny](https://www.addtoany.com/)                                            | 66,597     | 9,718 s      | 146 ms         |
| Crowd Control                                                                    | 70,113     | 9,656 s      | 138 ms         |
| Cookie-Script.com                                                                | 41,416     | 9,400 s      | 227 ms         |
| [Sizmek](https://www.sizmek.com/)                                                | 5,738      | 9,060 s      | 1579 ms        |
| [Olark](https://www.olark.com/)                                                  | 6,740      | 8,896 s      | 1320 ms        |
| [Smartsupp](https://www.smartsupp.com)                                           | 21,642     | 8,701 s      | 402 ms         |
| Google reCAPTCHA                                                                 | 27,115     | 8,234 s      | 304 ms         |
| AudienceSearch                                                                   | 51,541     | 8,028 s      | 156 ms         |
| Inspectlet                                                                       | 5,338      | 7,842 s      | 1469 ms        |
| [Bing Ads](https://bingads.microsoft.com)                                        | 45,983     | 7,669 s      | 167 ms         |
| fluct                                                                            | 22,281     | 7,606 s      | 341 ms         |
| Microad                                                                          | 15,517     | 7,215 s      | 465 ms         |
| [Ad Lightning](https://www.adlightning.com/)                                     | 4,424      | 7,161 s      | 1619 ms        |
| GitHub                                                                           | 15,865     | 7,147 s      | 450 ms         |
| CallRail                                                                         | 28,869     | 7,130 s      | 247 ms         |
| Amplitude Mobile Analytics                                                       | 36,102     | 7,119 s      | 197 ms         |
| [Supership](https://supership.jp/)                                               | 18,113     | 6,861 s      | 379 ms         |
| Calendly                                                                         | 4,012      | 6,568 s      | 1637 ms        |
| SocialShopWave                                                                   | 4,310      | 6,469 s      | 1501 ms        |
| Trusted Shops                                                                    | 17,192     | 6,455 s      | 375 ms         |
| [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 18,856     | 6,401 s      | 339 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                     | 4,451      | 6,384 s      | 1434 ms        |
| OptiMonk                                                                         | 10,492     | 6,365 s      | 607 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)     | 17,481     | 6,113 s      | 350 ms         |
| Forter                                                                           | 6,249      | 5,638 s      | 902 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                    | 4,742      | 5,554 s      | 1171 ms        |
| StatCounter                                                                      | 51,587     | 5,377 s      | 104 ms         |
| Twitter Online Conversion Tracking                                               | 68,128     | 5,356 s      | 79 ms          |
| issuu                                                                            | 2,692      | 5,269 s      | 1957 ms        |
| Bold Commerce                                                                    | 11,926     | 5,184 s      | 435 ms         |
| Conversant                                                                       | 46,155     | 5,168 s      | 112 ms         |
| [VWO](https://vwo.com)                                                           | 8,018      | 5,119 s      | 639 ms         |
| Heap                                                                             | 13,234     | 4,991 s      | 377 ms         |
| [OpenX](https://www.openx.com/)                                                  | 64,159     | 4,981 s      | 78 ms          |
| Ecwid                                                                            | 5,568      | 4,886 s      | 877 ms         |
| Qualtrics                                                                        | 6,893      | 4,825 s      | 700 ms         |
| Adyen                                                                            | 2,339      | 4,806 s      | 2055 ms        |
| LongTail Ad Solutions                                                            | 6,169      | 4,777 s      | 774 ms         |
| [Pendo](https://www.pendo.io)                                                    | 13,339     | 4,764 s      | 357 ms         |
| [Attentive](https://attentivemobile.com/)                                        | 9,167      | 4,723 s      | 515 ms         |
| Microsoft Hosted Libs                                                            | 19,679     | 4,421 s      | 225 ms         |
| IPONWEB                                                                          | 25,122     | 4,373 s      | 174 ms         |
| Technorati                                                                       | 22,378     | 4,311 s      | 193 ms         |
| uLogin                                                                           | 1,429      | 4,172 s      | 2920 ms        |
| VigLink                                                                          | 6,675      | 4,146 s      | 621 ms         |
| Key CDN                                                                          | 9,387      | 4,088 s      | 435 ms         |
| [Moat](https://moat.com/)                                                        | 3,871      | 4,077 s      | 1053 ms        |
| [Scorecard Research](https://www.scorecardresearch.com/)                         | 46,698     | 4,065 s      | 87 ms          |
| [Akamai](https://www.akamai.com/)                                                | 10,205     | 4,036 s      | 396 ms         |
| Index Exchange                                                                   | 33,569     | 3,977 s      | 118 ms         |
| reddit                                                                           | 16,277     | 3,875 s      | 238 ms         |
| Signyfyd                                                                         | 2,570      | 3,842 s      | 1495 ms        |
| [AppNexus](https://www.appnexus.com/)                                            | 177,948    | 3,835 s      | 22 ms          |
| [Seedtag](https://www.seedtag.com/)                                              | 2,517      | 3,797 s      | 1509 ms        |
| Dynamic Yield                                                                    | 1,860      | 3,618 s      | 1945 ms        |
| LINE Corporation                                                                 | 25,032     | 3,614 s      | 144 ms         |
| [Disqus](https://disqus.com/)                                                    | 1,868      | 3,466 s      | 1856 ms        |
| LoyaltyLion                                                                      | 4,114      | 3,422 s      | 832 ms         |
| [AdScore](https://www.adscore.com/)                                              | 4,378      | 3,374 s      | 771 ms         |
| [Mixpanel](https://mixpanel.com/)                                                | 20,444     | 3,331 s      | 163 ms         |
| Affirm                                                                           | 6,608      | 3,314 s      | 502 ms         |
| ContentSquare                                                                    | 3,541      | 3,229 s      | 912 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                             | 32,660     | 3,196 s      | 98 ms          |
| GumGum                                                                           | 123,920    | 3,129 s      | 25 ms          |
| Rackspace                                                                        | 2,616      | 3,109 s      | 1188 ms        |
| [AppDynamics](https://www.appdynamics.com/)                                      | 3,420      | 3,109 s      | 909 ms         |
| Datacamp                                                                         | 1,273      | 3,038 s      | 2386 ms        |
| Intercept Interactive                                                            | 18,825     | 3,007 s      | 160 ms         |
| Sonobi                                                                           | 54,966     | 2,740 s      | 50 ms          |
| [Luigis Box](https://www.luigisbox.com/)                                         | 2,222      | 2,692 s      | 1212 ms        |
| [fam](http://admin.fam-ad.com/report/)                                           | 748        | 2,660 s      | 3557 ms        |
| [Matomo](https://matomo.org/)                                                    | 13,627     | 2,660 s      | 195 ms         |
| Unbounce                                                                         | 9,119      | 2,640 s      | 290 ms         |
| WisePops                                                                         | 2,044      | 2,540 s      | 1243 ms        |
| Gigya                                                                            | 2,041      | 2,539 s      | 1244 ms        |
| [Yahoo!](https://www.yahoo.com/)                                                 | 22,674     | 2,536 s      | 112 ms         |
| Gemius                                                                           | 16,231     | 2,515 s      | 155 ms         |
| LightWidget                                                                      | 11,137     | 2,513 s      | 226 ms         |
| [Outbrain](https://www.outbrain.com/)                                            | 11,507     | 2,481 s      | 216 ms         |
| [33 Across](https://33across.com/)                                               | 143,028    | 2,449 s      | 17 ms          |
| Secomapp                                                                         | 2,228      | 2,448 s      | 1099 ms        |
| SnapWidget                                                                       | 13,528     | 2,415 s      | 178 ms         |
| Qode Interactive                                                                 | 141        | 2,325 s      | 16488 ms       |
| i-mobile                                                                         | 11,887     | 2,325 s      | 196 ms         |
| Civic                                                                            | 6,533      | 2,296 s      | 351 ms         |
| Teads                                                                            | 6,910      | 2,289 s      | 331 ms         |
| [TrustArc](https://www.trustarc.com/)                                            | 7,399      | 2,217 s      | 300 ms         |
| TrafficStars                                                                     | 7,758      | 2,202 s      | 284 ms         |
| Convert Insights                                                                 | 4,173      | 2,180 s      | 522 ms         |
| [Beeketing](https://beeketing.com/)                                              | 2,144      | 2,160 s      | 1008 ms        |

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
    "category": "social",
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

This is now automated! Run `yarn start:update-ha-data` with a `gcp-credentials.json` file in the root directory of this project (look at `bin/automated-update.js` for the steps involved).

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
