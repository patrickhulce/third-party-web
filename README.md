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

## 2024-07-01 dataset

Some third parties use a dynamic subdomain to serve its main script on websites (e.g .domain.com). Some of these subdomain scripts are saved under observed-domains JSON file as results of the `sql/all-observed-domains-query.sql` query but analyzing http archive database we found a lot that are ignored because of number of occurrences (less than 50 ).

So, we've created a new query to keep observed domains with occurrence below 50 only if its mapped entity (based on entity.js) has a total occurrence (of all its declared domain) greater than 50.

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
| 1    | SPX                                                                              | 19,636    | 1 ms           |
| 2    | TripleLift                                                                       | 6,547     | 2 ms           |
| 3    | Adyoulike                                                                        | 121,552   | 9 ms           |
| 4    | adKernel                                                                         | 103,092   | 16 ms          |
| 5    | Yellow Robot                                                                     | 6,295     | 27 ms          |
| 6    | Constant Contact                                                                 | 31,324    | 29 ms          |
| 7    | GumGum                                                                           | 117,724   | 29 ms          |
| 8    | [AppNexus](https://www.appnexus.com/)                                            | 210,382   | 36 ms          |
| 9    | Branch Metrics                                                                   | 5,986     | 47 ms          |
| 10   | [OpenX](https://www.openx.com/)                                                  | 120,004   | 47 ms          |
| 11   | LINE Corporation                                                                 | 59,343    | 49 ms          |
| 12   | Intercept Interactive                                                            | 18,069    | 53 ms          |
| 13   | Intent IQ                                                                        | 17,223    | 53 ms          |
| 14   | [The Trade Desk](https://www.thetradedesk.com/)                                  | 69,682    | 55 ms          |
| 15   | Simpli.fi                                                                        | 6,917     | 57 ms          |
| 16   | MailMunch                                                                        | 29,789    | 63 ms          |
| 17   | [Scorecard Research](https://www.scorecardresearch.com/)                         | 85,546    | 70 ms          |
| 18   | StickyADS.tv                                                                     | 66,501    | 70 ms          |
| 19   | ActiveCampaign                                                                   | 26,174    | 71 ms          |
| 20   | SiteScout                                                                        | 6,527     | 74 ms          |
| 21   | StackAdapt                                                                       | 33,252    | 75 ms          |
| 22   | Affiliate Window                                                                 | 12,775    | 79 ms          |
| 23   | DTSCOUT                                                                          | 12,716    | 80 ms          |
| 24   | [Basis](https://basis.net/)                                                      | 6,609     | 82 ms          |
| 25   | [33 Across](https://33across.com/)                                               | 201,274   | 86 ms          |
| 26   | [Yahoo!](https://www.yahoo.com/)                                                 | 28,648    | 88 ms          |
| 27   | [Ozone Project](https://www.ozoneproject.com/)                                   | 6,384     | 93 ms          |
| 28   | Simplicity Marketing                                                             | 6,831     | 101 ms         |
| 29   | Crowd Control                                                                    | 184,568   | 101 ms         |
| 30   | Twitter Online Conversion Tracking                                               | 138,550   | 102 ms         |
| 31   | [Bing Ads](https://bingads.microsoft.com)                                        | 271,638   | 110 ms         |
| 32   | Adform                                                                           | 23,362    | 120 ms         |
| 33   | LinkedIn Ads                                                                     | 374,046   | 123 ms         |
| 34   | TVSquared                                                                        | 6,019     | 124 ms         |
| 35   | Rakuten Marketing                                                                | 6,060     | 125 ms         |
| 36   | [Media.net](https://www.media.net/)                                              | 90,612    | 127 ms         |
| 37   | i-mobile                                                                         | 29,592    | 130 ms         |
| 38   | [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 74,357    | 133 ms         |
| 39   | Index Exchange                                                                   | 26,942    | 133 ms         |
| 40   | Impact Radius                                                                    | 9,101     | 141 ms         |
| 41   | [Criteo](https://www.criteo.com/)                                                | 343,672   | 142 ms         |
| 42   | [Adnami](https://www.adnami.io/)                                                 | 3,557     | 142 ms         |
| 43   | Rocket Fuel                                                                      | 3,442     | 144 ms         |
| 44   | [F@N Communications](https://www.fancs.com/)                                     | 4,132     | 153 ms         |
| 45   | BlueCava                                                                         | 8,932     | 154 ms         |
| 46   | Smart AdServer                                                                   | 85,964    | 160 ms         |
| 47   | AdsWizz                                                                          | 3,422     | 171 ms         |
| 48   | JuicyAds                                                                         | 4,116     | 176 ms         |
| 49   | AudienceSearch                                                                   | 88,066    | 180 ms         |
| 50   | sovrn                                                                            | 23,840    | 188 ms         |
| 51   | Technorati                                                                       | 5,902     | 191 ms         |
| 52   | Gemius                                                                           | 30,091    | 199 ms         |
| 53   | IPONWEB                                                                          | 55,156    | 229 ms         |
| 54   | AdRiver                                                                          | 10,995    | 238 ms         |
| 55   | [Outbrain](https://www.outbrain.com/)                                            | 31,166    | 248 ms         |
| 56   | [Hybrid](https://hybrid.ai/)                                                     | 5,716     | 258 ms         |
| 57   | Unbounce                                                                         | 11,745    | 269 ms         |
| 58   | Auto Link Maker                                                                  | 4,389     | 270 ms         |
| 59   | [Quora Ads](https://www.quora.com/business/)                                     | 14,406    | 274 ms         |
| 60   | Tynt                                                                             | 173,566   | 279 ms         |
| 61   | [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 28,620    | 283 ms         |
| 62   | Onfocus                                                                          | 89,517    | 295 ms         |
| 63   | RTB House AdPilot                                                                | 23,558    | 315 ms         |
| 64   | [Adroll](https://www.adroll.com/)                                                | 55,422    | 317 ms         |
| 65   | Salesforce.com                                                                   | 7,868     | 318 ms         |
| 66   | [Seedtag](https://www.seedtag.com/)                                              | 69,750    | 340 ms         |
| 67   | Teads                                                                            | 5,890     | 344 ms         |
| 68   | Skimbit                                                                          | 8,604     | 348 ms         |
| 69   | [ID5 Identity Cloud](https://id5.io/)                                            | 267,438   | 350 ms         |
| 70   | Adocean                                                                          | 3,531     | 366 ms         |
| 71   | InMobi                                                                           | 94,393    | 368 ms         |
| 72   | TrafficStars                                                                     | 16,770    | 398 ms         |
| 73   | [Supership](https://supership.jp/)                                               | 30,217    | 446 ms         |
| 74   | VigLink                                                                          | 8,656     | 475 ms         |
| 75   | Cxense                                                                           | 5,815     | 484 ms         |
| 76   | [Attentive](https://attentivemobile.com/)                                        | 15,643    | 506 ms         |
| 77   | fluct                                                                            | 18,527    | 508 ms         |
| 78   | [Amazon Ads](https://ad.amazon.com/)                                             | 383,002   | 564 ms         |
| 79   | [AdScore](https://www.adscore.com/)                                              | 8,188     | 591 ms         |
| 80   | LoyaltyLion                                                                      | 7,501     | 716 ms         |
| 81   | Klaviyo                                                                          | 336,357   | 774 ms         |
| 82   | LongTail Ad Solutions                                                            | 9,740     | 840 ms         |
| 83   | STINGRAY                                                                         | 4,038     | 851 ms         |
| 84   | Yahoo! Ad Exchange                                                               | 8,541     | 920 ms         |
| 85   | OptiMonk                                                                         | 21,362    | 926 ms         |
| 86   | [Yandex Ads](https://yandex.com/adv/)                                            | 14,476    | 940 ms         |
| 87   | [Pubmatic](https://pubmatic.com/)                                                | 320,608   | 951 ms         |
| 88   | [Taboola](https://www.taboola.com/)                                              | 80,955    | 961 ms         |
| 89   | Microad                                                                          | 49,683    | 1015 ms        |
| 90   | Geniee                                                                           | 17,539    | 1055 ms        |
| 91   | Infolinks                                                                        | 17,589    | 1147 ms        |
| 92   | [Rubicon Project](https://rubiconproject.com/)                                   | 304,085   | 1218 ms        |
| 93   | [Integral Ad Science](https://integralads.com/uk/)                               | 23,360    | 1266 ms        |
| 94   | [Ad Lightning](https://www.adlightning.com/)                                     | 6,546     | 1314 ms        |
| 95   | Privy                                                                            | 31,774    | 1390 ms        |
| 96   | [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 2,067,182 | 1938 ms        |
| 97   | [MGID](https://www.mgid.com/)                                                    | 19,280    | 2049 ms        |
| 98   | [DoubleVerify](https://www.doubleverify.com/)                                    | 14,555    | 2422 ms        |
| 99   | Connatix                                                                         | 3,511     | 4109 ms        |
| 100  | [Mediavine](https://www.mediavine.com/)                                          | 15,666    | 5883 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [SpeedCurve RUM](https://www.speedcurve.com/features/performance-monitoring/) | 10,757    | 49 ms          |
| 2    | [Mouseflow](https://mouseflow.com/)                                           | 14,725    | 52 ms          |
| 3    | Movable Ink                                                                   | 7,719     | 56 ms          |
| 4    | [WordPress Site Stats](https://wp.com/)                                       | 165,697   | 57 ms          |
| 5    | [Snapchat](https://www.snapchat.com)                                          | 3,682     | 64 ms          |
| 6    | Woopra                                                                        | 1,888     | 66 ms          |
| 7    | [Quantcast](https://www.quantcast.com)                                        | 90,501    | 67 ms          |
| 8    | [Smartlook](https://www.smartlook.com/)                                       | 28,298    | 75 ms          |
| 9    | [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)        | 1,027     | 76 ms          |
| 10   | StatCounter                                                                   | 81,964    | 83 ms          |
| 11   | [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)          | 1,712     | 92 ms          |
| 12   | [XiTi](https://www.atinternet.com/en/)                                        | 19,961    | 93 ms          |
| 13   | [Google Analytics](https://marketingplatform.google.com/about/analytics/)     | 5,758,533 | 94 ms          |
| 14   | [Braze](https://www.braze.com)                                                | 10,265    | 94 ms          |
| 15   | Exponea                                                                       | 2,465     | 94 ms          |
| 16   | Ekm Systems                                                                   | 1,053     | 97 ms          |
| 17   | [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 63,431    | 98 ms          |
| 18   | Site24x7 Real User Monitoring                                                 | 1,324     | 102 ms         |
| 19   | [AD EBis](https://www.ebis.ne.jp/)                                            | 1,041     | 104 ms         |
| 20   | Treasure Data                                                                 | 24,521    | 105 ms         |
| 21   | [Snowplow](https://snowplowanalytics.com/)                                    | 114,224   | 109 ms         |
| 22   | Stamped.io                                                                    | 20,481    | 110 ms         |
| 23   | [Fathom Analytics](https://usefathom.com/)                                    | 2,257     | 111 ms         |
| 24   | Sailthru                                                                      | 2,799     | 128 ms         |
| 25   | [DotMetrics](https://www.dotmetrics.net/)                                     | 2,188     | 130 ms         |
| 26   | WebInsight                                                                    | 1,903     | 142 ms         |
| 27   | [Brandmetrics](https://www.brandmetrics.com)                                  | 47,062    | 143 ms         |
| 28   | CleverTap                                                                     | 2,610     | 146 ms         |
| 29   | [Radar](https://www.cedexis.com/radar/)                                       | 1,719     | 149 ms         |
| 30   | Conversant                                                                    | 69,664    | 149 ms         |
| 31   | Polldaddy                                                                     | 1,854     | 159 ms         |
| 32   | Parse.ly                                                                      | 8,624     | 163 ms         |
| 33   | [Usabilla](https://usabilla.com)                                              | 1,175     | 169 ms         |
| 34   | Smart Insight Tracking                                                        | 3,619     | 173 ms         |
| 35   | Marchex                                                                       | 6,641     | 181 ms         |
| 36   | [Matomo](https://matomo.org/)                                                 | 27,694    | 184 ms         |
| 37   | Chartbeat                                                                     | 9,552     | 189 ms         |
| 38   | Ezoic                                                                         | 1,420     | 189 ms         |
| 39   | [Mixpanel](https://mixpanel.com/)                                             | 40,844    | 195 ms         |
| 40   | OneAll                                                                        | 1,150     | 195 ms         |
| 41   | Heap                                                                          | 19,468    | 209 ms         |
| 42   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 47,331    | 215 ms         |
| 43   | CallRail                                                                      | 59,559    | 221 ms         |
| 44   | CallTrackingMetrics                                                           | 15,837    | 225 ms         |
| 45   | Amplitude Mobile Analytics                                                    | 80,759    | 233 ms         |
| 46   | Reviews.co.uk                                                                 | 2,753     | 247 ms         |
| 47   | Trust Pilot                                                                   | 81,801    | 258 ms         |
| 48   | [Google Optimize](https://marketingplatform.google.com/about/optimize/)       | 55,065    | 260 ms         |
| 49   | Okta                                                                          | 4,883     | 264 ms         |
| 50   | [Clearbit](https://clearbit.com/)                                             | 1,260     | 264 ms         |
| 51   | SurveyMonkey                                                                  | 2,320     | 278 ms         |
| 52   | UpSellit                                                                      | 3,534     | 282 ms         |
| 53   | Trialfire                                                                     | 2,223     | 297 ms         |
| 54   | etracker                                                                      | 10,408    | 306 ms         |
| 55   | [PageSense](https://www.zoho.com/pagesense/)                                  | 15,498    | 314 ms         |
| 56   | Net Reviews                                                                   | 2,699     | 329 ms         |
| 57   | Kampyle                                                                       | 1,346     | 345 ms         |
| 58   | Qualtrics                                                                     | 21,015    | 350 ms         |
| 59   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)  | 20,607    | 357 ms         |
| 60   | [Lucky Orange](https://www.luckyorange.com/)                                  | 53,492    | 359 ms         |
| 61   | [Segment](https://segment.com/)                                               | 45,882    | 373 ms         |
| 62   | [Marketo](https://www.marketo.com)                                            | 2,804     | 388 ms         |
| 63   | [Pendo](https://www.pendo.io)                                                 | 28,533    | 391 ms         |
| 64   | Evergage                                                                      | 5,300     | 393 ms         |
| 65   | [BowNow](https://bow-now.jp/)                                                 | 4,776     | 438 ms         |
| 66   | Clerk.io ApS                                                                  | 3,545     | 445 ms         |
| 67   | Nosto                                                                         | 2,098     | 475 ms         |
| 68   | Feefo.com                                                                     | 3,489     | 492 ms         |
| 69   | Monetate                                                                      | 1,162     | 508 ms         |
| 70   | [AB Tasty](https://www.abtasty.com/)                                          | 5,150     | 522 ms         |
| 71   | Evidon                                                                        | 1,849     | 537 ms         |
| 72   | Reviews.io                                                                    | 9,308     | 537 ms         |
| 73   | [Crazy Egg](https://www.crazyegg.com/)                                        | 70,812    | 551 ms         |
| 74   | Bazaarvoice                                                                   | 7,829     | 565 ms         |
| 75   | [Hotjar](https://www.hotjar.com/)                                             | 558,816   | 655 ms         |
| 76   | [Appcues](https://www.appcues.com/)                                           | 4,817     | 679 ms         |
| 77   | Convert Insights                                                              | 9,133     | 688 ms         |
| 78   | [Optimizely](https://www.optimizely.com/)                                     | 33,807    | 783 ms         |
| 79   | PowerReviews                                                                  | 2,649     | 803 ms         |
| 80   | [Kameleoon](https://www.kameleoon.com/)                                       | 3,939     | 851 ms         |
| 81   | [VWO](https://vwo.com)                                                        | 12,221    | 859 ms         |
| 82   | Insider                                                                       | 3,541     | 1008 ms        |
| 83   | Gigya                                                                         | 3,808     | 1012 ms        |
| 84   | FullStory                                                                     | 23,521    | 1024 ms        |
| 85   | Dynatrace                                                                     | 2,526     | 1136 ms        |
| 86   | ContentSquare                                                                 | 18,561    | 1305 ms        |
| 87   | Inspectlet                                                                    | 8,380     | 1313 ms        |
| 88   | TrackJS                                                                       | 4,443     | 1358 ms        |
| 89   | [Quantum Metric](https://www.quantummetric.com/)                              | 2,459     | 1648 ms        |
| 90   | [Yandex Metrica](https://metrica.yandex.com/about?)                           | 1,047,467 | 2279 ms        |
| 91   | Decibel Insight                                                               | 1,139     | 2373 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                        | Usage     | Average Impact |
| ---- | ------------------------------------------- | --------- | -------------- |
| 1    | [Shareaholic](https://www.shareaholic.com/) | 1,731     | 81 ms          |
| 2    | [Pinterest](https://pinterest.com/)         | 278,720   | 115 ms         |
| 3    | [AddToAny](https://www.addtoany.com/)       | 145,526   | 139 ms         |
| 4    | [LinkedIn](https://www.linkedin.com/)       | 33,241    | 268 ms         |
| 5    | [ShareThis](https://www.sharethis.com/)     | 156,923   | 295 ms         |
| 6    | reddit                                      | 53,520    | 388 ms         |
| 7    | [Facebook](https://www.facebook.com)        | 5,758,878 | 408 ms         |
| 8    | [TikTok](https://www.tiktok.com/en/)        | 407,793   | 422 ms         |
| 9    | [Twitter](https://twitter.com)              | 530,914   | 491 ms         |
| 10   | Kakao                                       | 115,677   | 829 ms         |
| 11   | SocialShopWave                              | 3,077     | 921 ms         |
| 12   | [PIXNET](https://www.pixnet.net/)           | 16,825    | 1388 ms        |
| 13   | [Instagram](https://www.instagram.com)      | 34,184    | 1444 ms        |
| 14   | [Tumblr](https://tumblr.com/)               | 31,081    | 2463 ms        |
| 15   | [Disqus](https://disqus.com/)               | 16,554    | 2558 ms        |
| 16   | LiveJournal                                 | 14,805    | 4687 ms        |
| 17   | [VK](https://vk.com/)                       | 33,615    | 5550 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage     | Average Impact |
| ---- | -------------------------------------------- | --------- | -------------- |
| 1    | [Brightcove](https://www.brightcove.com/en/) | 28,096    | 931 ms         |
| 2    | [Vimeo](https://vimeo.com/)                  | 173,780   | 3375 ms        |
| 3    | [Wistia](https://wistia.com/)                | 37,093    | 3962 ms        |
| 4    | [YouTube](https://youtube.com)               | 1,338,938 | 6527 ms        |
| 5    | [Twitch](https://twitch.tv/)                 | 1,879     | 16398 ms       |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Statuspage](https://www.statuspage.io)                                   | 2,211     | 26 ms          |
| 2    | Cludo                                                                     | 2,393     | 50 ms          |
| 3    | Webmarked                                                                 | 2,269     | 60 ms          |
| 4    | [Pusher](https://pusher.com/)                                             | 3,069     | 76 ms          |
| 5    | Rollbar                                                                   | 5,278     | 86 ms          |
| 6    | Raygun                                                                    | 4,245     | 99 ms          |
| 7    | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 1,019,342 | 100 ms         |
| 8    | Macropod BugHerd                                                          | 6,690     | 109 ms         |
| 9    | MathJax                                                                   | 1,205     | 111 ms         |
| 10   | [Afterpay](https://www.afterpay.com/)                                     | 16,095    | 121 ms         |
| 11   | PrintFriendly                                                             | 1,101     | 123 ms         |
| 12   | Webkul                                                                    | 1,857     | 127 ms         |
| 13   | [Doofinder](https://www.doofinder.com/)                                   | 26,100    | 128 ms         |
| 14   | [Ipify](https://www.ipify.org)                                            | 4,339     | 142 ms         |
| 15   | Braintree Payments                                                        | 2,604     | 155 ms         |
| 16   | CyberSource (Visa)                                                        | 3,835     | 162 ms         |
| 17   | [Amazon Pay](https://pay.amazon.com)                                      | 14,574    | 174 ms         |
| 18   | LightWidget                                                               | 11,089    | 175 ms         |
| 19   | Wufoo                                                                     | 4,613     | 191 ms         |
| 20   | [OneSignal](https://onesignal.com/)                                       | 109,764   | 192 ms         |
| 21   | [mParticle](https://www.mparticle.com/)                                   | 1,666     | 194 ms         |
| 22   | Riskified                                                                 | 3,529     | 198 ms         |
| 23   | [Netlify](https://www.netlify.com/)                                       | 1,781     | 220 ms         |
| 24   | [Foxentry](https://foxentry.cz/)                                          | 4,724     | 225 ms         |
| 25   | Seznam                                                                    | 10,151    | 232 ms         |
| 26   | [Auth0](https://auth0.com/)                                               | 1,657     | 253 ms         |
| 27   | Transifex                                                                 | 1,003     | 283 ms         |
| 28   | [Sentry](https://sentry.io/)                                              | 337,077   | 287 ms         |
| 29   | [New Relic](https://newrelic.com/)                                        | 341,879   | 289 ms         |
| 30   | [TrustArc](https://www.trustarc.com/)                                     | 11,119    | 298 ms         |
| 31   | [Yandex APIs](https://yandex.ru/)                                         | 76,484    | 309 ms         |
| 32   | Key CDN                                                                   | 21,579    | 329 ms         |
| 33   | Hexton                                                                    | 62,245    | 338 ms         |
| 34   | Highcharts                                                                | 6,139     | 338 ms         |
| 35   | Swiftype                                                                  | 1,457     | 345 ms         |
| 36   | [Clarity](https://clarity.microsoft.com/)                                 | 1,144,289 | 348 ms         |
| 37   | [Cookiebot](https://www.cookiebot.com/)                                   | 359,761   | 352 ms         |
| 38   | Bugsnag                                                                   | 37,770    | 374 ms         |
| 39   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 5,364,043 | 397 ms         |
| 40   | Cookie Reports                                                            | 1,273     | 409 ms         |
| 41   | GitHub                                                                    | 25,503    | 412 ms         |
| 42   | Trusted Shops                                                             | 33,621    | 423 ms         |
| 43   | Google reCAPTCHA                                                          | 84,753    | 436 ms         |
| 44   | Cookie-Script.com                                                         | 162,355   | 458 ms         |
| 45   | GetSiteControl                                                            | 5,749     | 518 ms         |
| 46   | FoxyCart                                                                  | 1,330     | 521 ms         |
| 47   | Klarna                                                                    | 21,477    | 538 ms         |
| 48   | iovation                                                                  | 3,689     | 539 ms         |
| 49   | Bold Commerce                                                             | 13,791    | 542 ms         |
| 50   | [Accessibe Accessibility Overlay](https://accessibe.com/)                 | 3,167     | 595 ms         |
| 51   | ThreatMetrix                                                              | 9,931     | 632 ms         |
| 52   | Affirm                                                                    | 13,756    | 653 ms         |
| 53   | Mapbox                                                                    | 33,978    | 704 ms         |
| 54   | iubenda                                                                   | 188,276   | 765 ms         |
| 55   | [Google Maps](https://www.google.com/maps)                                | 2,104,224 | 772 ms         |
| 56   | [AppDynamics](https://www.appdynamics.com/)                               | 3,751     | 780 ms         |
| 57   | Klevu Search                                                              | 2,362     | 805 ms         |
| 58   | Secomapp                                                                  | 3,337     | 843 ms         |
| 59   | [Vidyard](https://www.vidyard.com/)                                       | 1,905     | 851 ms         |
| 60   | Forter                                                                    | 6,321     | 852 ms         |
| 61   | [PayPal](https://paypal.com)                                              | 150,992   | 895 ms         |
| 62   | [Checkout.com](https://www.checkout.com)                                  | 8,392     | 899 ms         |
| 63   | Marker                                                                    | 4,311     | 920 ms         |
| 64   | MaxMind                                                                   | 1,584     | 1054 ms        |
| 65   | Okas Concepts                                                             | 1,033     | 1163 ms        |
| 66   | WisePops                                                                  | 2,786     | 1189 ms        |
| 67   | Fastly                                                                    | 5,399     | 1198 ms        |
| 68   | Rambler                                                                   | 23,697    | 1229 ms        |
| 69   | [Luigis Box](https://www.luigisbox.com/)                                  | 5,363     | 1352 ms        |
| 70   | [Stripe](https://stripe.com)                                              | 381,748   | 1452 ms        |
| 71   | [GoDaddy](https://www.godaddy.com/)                                       | 251,808   | 1526 ms        |
| 72   | [Noibu](https://www.noibu.com)                                            | 1,127     | 1627 ms        |
| 73   | Adyen                                                                     | 4,851     | 1682 ms        |
| 74   | Signyfyd                                                                  | 5,191     | 1767 ms        |
| 75   | Datacamp                                                                  | 2,393     | 2672 ms        |
| 76   | [POWr](https://www.powr.io)                                               | 64,221    | 4248 ms        |
| 77   | Esri ArcGIS                                                               | 7,424     | 7158 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Ecwid                                                                                     | 10,178  | 349 ms         |
| 2    | Civic                                                                                     | 13,794  | 358 ms         |
| 3    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 7,787   | 455 ms         |
| 4    | [Dealer](https://www.dealer.com/)                                                         | 4,457   | 508 ms         |
| 5    | [WordPress](https://wp.com/)                                                              | 479,882 | 536 ms         |
| 6    | Global-e                                                                                  | 2,949   | 538 ms         |
| 7    | [Blogger](https://www.blogger.com/)                                                       | 337,997 | 683 ms         |
| 8    | [Shopify](https://www.shopify.com/)                                                       | 795,482 | 895 ms         |
| 9    | Rackspace                                                                                 | 4,436   | 960 ms         |
| 10   | [Tilda](https://tilda.cc/)                                                                | 130,044 | 1026 ms        |
| 11   | Typepad                                                                                   | 1,322   | 1062 ms        |
| 12   | Yottaa                                                                                    | 1,297   | 1199 ms        |
| 13   | [Hatena Blog](https://hatenablog.com/)                                                    | 83,022  | 2230 ms        |
| 14   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 7,284   | 3126 ms        |
| 15   | [Squarespace](https://www.squarespace.com/)                                               | 482,067 | 3430 ms        |
| 16   | [Wix](https://www.wix.com/)                                                               | 831,435 | 3498 ms        |
| 17   | [Framer CDN](https://www.framer.com)                                                      | 30,217  | 5401 ms        |
| 18   | [Weebly](https://www.weebly.com/)                                                         | 121,154 | 6261 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage   | Average Impact |
| ---- | ------------------------------------------- | ------- | -------------- |
| 1    | [Albacross](https://albacross.com/)         | 2,286   | 60 ms          |
| 2    | [Podsights](https://podsights.com/)         | 1,627   | 64 ms          |
| 3    | [SATORI](https://satori.marketing/)         | 1,430   | 73 ms          |
| 4    | [Convertful](https://convertful.com/)       | 2,166   | 84 ms          |
| 5    | DemandBase                                  | 3,737   | 173 ms         |
| 6    | [RD Station](https://www.rdstation.com/en/) | 37,041  | 316 ms         |
| 7    | SharpSpring                                 | 2,484   | 337 ms         |
| 8    | [Hello Bar](https://www.hellobar.com/)      | 6,977   | 340 ms         |
| 9    | Wishpond Technologies                       | 2,825   | 361 ms         |
| 10   | [Listrak](https://www.listrak.com/)         | 1,989   | 395 ms         |
| 11   | Sojern                                      | 7,494   | 445 ms         |
| 12   | Curalate                                    | 1,155   | 481 ms         |
| 13   | [Mailchimp](https://mailchimp.com/)         | 79,106  | 492 ms         |
| 14   | [OptinMonster](https://optinmonster.com/)   | 3,233   | 496 ms         |
| 15   | [iZooto](https://www.izooto.com)            | 3,485   | 499 ms         |
| 16   | [PureCars](https://www.purecars.com/)       | 2,305   | 503 ms         |
| 17   | [Hubspot](https://hubspot.com/)             | 302,513 | 541 ms         |
| 18   | [Yotpo](https://www.yotpo.com/)             | 51,754  | 596 ms         |
| 19   | [Judge.me](https://judge.me/)               | 45,235  | 900 ms         |
| 20   | [KARTE](https://karte.io/)                  | 3,124   | 975 ms         |
| 21   | [Beeketing](https://beeketing.com/)         | 2,609   | 1027 ms        |
| 22   | [Sumo](https://sumo.com/)                   | 15,796  | 1398 ms        |
| 23   | [Wunderkind](https://www.wunderkind.co/)    | 2,076   | 1578 ms        |
| 24   | Bigcommerce                                 | 35,814  | 1588 ms        |
| 25   | [Tray Commerce](https://www.tray.com.br/)   | 26,776  | 4394 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                                        | Usage   | Average Impact |
| ---- | ----------------------------------------------------------- | ------- | -------------- |
| 1    | [Crisp](https://crisp.chat/)                                | 1,359   | 31 ms          |
| 2    | Provide Support                                             | 1,545   | 65 ms          |
| 3    | iPerceptions                                                | 8,585   | 124 ms         |
| 4    | SnapEngage                                                  | 1,802   | 130 ms         |
| 5    | Salesforce Live Agent                                       | 1,040   | 131 ms         |
| 6    | iAdvize SAS                                                 | 1,401   | 284 ms         |
| 7    | WebEngage                                                   | 3,111   | 292 ms         |
| 8    | LiveHelpNow                                                 | 1,432   | 303 ms         |
| 9    | LiveTex                                                     | 3,023   | 318 ms         |
| 10   | Pure Chat                                                   | 4,543   | 321 ms         |
| 11   | [Tawk.to](https://www.tawk.to/)                             | 189,841 | 396 ms         |
| 12   | [Help Scout](https://www.helpscout.net/)                    | 8,992   | 413 ms         |
| 13   | Comm100                                                     | 1,560   | 448 ms         |
| 14   | [Usersnap](https://usersnap.com)                            | 1,858   | 511 ms         |
| 15   | [Gladly](https://www.gladly.com/)                           | 1,142   | 559 ms         |
| 16   | [Smartsupp](https://www.smartsupp.com)                      | 38,056  | 581 ms         |
| 17   | [LivePerson](https://www.liveperson.com/)                   | 3,666   | 677 ms         |
| 18   | [Jivochat](https://www.jivochat.com/)                       | 83,766  | 697 ms         |
| 19   | [Ada](https://www.ada.support/)                             | 1,774   | 706 ms         |
| 20   | [LiveChat](https://www.livechat.com/)                       | 65,301  | 946 ms         |
| 21   | [ZenDesk](https://zendesk.com/)                             | 122,451 | 1247 ms        |
| 22   | [Intercom](https://www.intercom.com)                        | 62,181  | 1294 ms        |
| 23   | [Olark](https://www.olark.com/)                             | 9,888   | 1340 ms        |
| 24   | Dynamic Yield                                               | 2,646   | 1684 ms        |
| 25   | [Freshchat](https://www.freshworks.com/live-chat-software/) | 12,547  | 2844 ms        |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Spotify](https://www.spotify.com/)       | 17,469 | 7 ms           |
| 2    | Accuweather                               | 1,930  | 169 ms         |
| 3    | Flowplayer                                | 1,542  | 204 ms         |
| 4    | Indeed                                    | 4,896  | 214 ms         |
| 5    | Tencent                                   | 11,783 | 268 ms         |
| 6    | Embedly                                   | 16,482 | 401 ms         |
| 7    | Freetobook                                | 1,339  | 407 ms         |
| 8    | Cloudinary                                | 3,531  | 440 ms         |
| 9    | TripAdvisor                               | 2,380  | 686 ms         |
| 10   | Revcontent                                | 2,867  | 895 ms         |
| 11   | [AMP](https://amp.dev/)                   | 75,898 | 919 ms         |
| 12   | Booking.com                               | 2,098  | 1039 ms        |
| 13   | CPEx                                      | 1,656  | 1251 ms        |
| 14   | OpenTable                                 | 8,442  | 1256 ms        |
| 15   | [Hotmart](https://www.hotmart.com/)       | 2,750  | 1968 ms        |
| 16   | issuu                                     | 4,119  | 2737 ms        |
| 17   | [SoundCloud](https://www.soundcloud.com/) | 8,298  | 2952 ms        |
| 18   | Kaltura Video Platform                    | 1,510  | 3444 ms        |
| 19   | Dailymotion                               | 4,736  | 6649 ms        |
| 20   | Medium                                    | 13,389 | 13374 ms       |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage     | Average Impact |
| ---- | ------------------------------------------------------------ | --------- | -------------- |
| 1    | [Google Fonts](https://fonts.google.com/)                    | 243,073   | 1 ms           |
| 2    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 57,221    | 47 ms          |
| 3    | Fort Awesome                                                 | 6,591     | 144 ms         |
| 4    | Microsoft Hosted Libs                                        | 38,147    | 156 ms         |
| 5    | Monotype                                                     | 4,624     | 192 ms         |
| 6    | [FontAwesome CDN](https://fontawesome.com/)                  | 459,941   | 241 ms         |
| 7    | [JSPM](https://jspm.org/)                                    | 2,362     | 241 ms         |
| 8    | [jQuery CDN](https://code.jquery.com/)                       | 1,308,168 | 281 ms         |
| 9    | [Akamai](https://www.akamai.com/)                            | 14,765    | 346 ms         |
| 10   | [Cloudflare CDN](https://cdnjs.com/)                         | 1,256,607 | 356 ms         |
| 11   | [ESM>CDN](https://esm.sh)                                    | 1,170     | 383 ms         |
| 12   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 891,496   | 486 ms         |
| 13   | [Adobe TypeKit](https://fonts.adobe.com/)                    | 170,770   | 656 ms         |
| 14   | Azure Web Services                                           | 62,371    | 689 ms         |
| 15   | [Google CDN](https://developers.google.com/speed/libraries/) | 6,032,146 | 1542 ms        |
| 16   | [CreateJS CDN](https://code.createjs.com/)                   | 5,661     | 3424 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage      | Average Impact |
| ---- | ----------------------------------------------------------------------------- | ---------- | -------------- |
| 1    | TagCommander                                                                  | 2,591      | 214 ms         |
| 2    | [Tealium](https://tealium.com/)                                               | 175,283    | 250 ms         |
| 3    | [Ensighten](https://www.ensighten.com/)                                       | 5,943      | 459 ms         |
| 4    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 109,418    | 597 ms         |
| 5    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 15,145,255 | 969 ms         |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                                              | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------- | ------- | -------------- |
| 1    | [Trustcommander](https://www.commandersact.com)                   | 3,146   | 182 ms         |
| 2    | [Optanon](https://www.cookielaw.org/)                             | 276,055 | 452 ms         |
| 3    | [UniConsent CMP](https://www.uniconsent.com)                      | 2,201   | 575 ms         |
| 4    | [Google FundingChoices](https://fundingchoices.google.com/start/) | 693,942 | 623 ms         |
| 5    | [Didomi](https://www.didomi.io/)                                  | 184,468 | 713 ms         |
| 6    | [Usercentrics CMP](https://usercentrics.com)                      | 103,651 | 917 ms         |
| 7    | [Osano CMP](https://www.osano.com)                                | 31,450  | 1512 ms        |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | [ReadSpeaker](https://www.readspeaker.com)                          | 12,666  | 93 ms          |
| 2    | ResponsiveVoice                                                     | 12,658  | 105 ms         |
| 3    | Loqate                                                              | 1,610   | 146 ms         |
| 4    | MyRegistry                                                          | 1,150   | 216 ms         |
| 5    | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 190,555 | 294 ms         |
| 6    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 3,287   | 407 ms         |
| 7    | Sirv                                                                | 1,888   | 446 ms         |
| 8    | Marketplace Web Service                                             | 1,208   | 463 ms         |
| 9    | Heroku                                                              | 18,407  | 640 ms         |
| 10   | Calendly                                                            | 12,785  | 2955 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                             | Popularity | Total Impact | Average Impact |
| -------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)    | 15,145,255 | 14,678,999 s | 969 ms         |
| [Google CDN](https://developers.google.com/speed/libraries/)                     | 6,032,146  | 9,302,149 s  | 1542 ms        |
| [YouTube](https://youtube.com)                                                   | 1,338,938  | 8,739,742 s  | 6527 ms        |
| [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 2,067,182  | 4,007,181 s  | 1938 ms        |
| [Wix](https://www.wix.com/)                                                      | 831,435    | 2,908,678 s  | 3498 ms        |
| [Yandex Metrica](https://metrica.yandex.com/about?)                              | 1,047,467  | 2,387,032 s  | 2279 ms        |
| [Facebook](https://www.facebook.com)                                             | 5,758,878  | 2,352,323 s  | 408 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)        | 5,364,043  | 2,129,115 s  | 397 ms         |
| [Squarespace](https://www.squarespace.com/)                                      | 482,067    | 1,653,617 s  | 3430 ms        |
| [Google Maps](https://www.google.com/maps)                                       | 2,104,224  | 1,624,790 s  | 772 ms         |
| [Weebly](https://www.weebly.com/)                                                | 121,154    | 758,509 s    | 6261 ms        |
| [Shopify](https://www.shopify.com/)                                              | 795,482    | 711,686 s    | 895 ms         |
| [Vimeo](https://vimeo.com/)                                                      | 173,780    | 586,518 s    | 3375 ms        |
| [Stripe](https://stripe.com)                                                     | 381,748    | 554,271 s    | 1452 ms        |
| [Google Analytics](https://marketingplatform.google.com/about/analytics/)        | 5,758,533  | 539,774 s    | 94 ms          |
| [Cloudflare CDN](https://cdnjs.com/)                                             | 1,256,607  | 447,413 s    | 356 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                        | 891,496    | 433,371 s    | 486 ms         |
| [Google FundingChoices](https://fundingchoices.google.com/start/)                | 693,942    | 432,057 s    | 623 ms         |
| [Clarity](https://clarity.microsoft.com/)                                        | 1,144,289  | 398,712 s    | 348 ms         |
| [GoDaddy](https://www.godaddy.com/)                                              | 251,808    | 384,155 s    | 1526 ms        |
| [Rubicon Project](https://rubiconproject.com/)                                   | 304,085    | 370,272 s    | 1218 ms        |
| [jQuery CDN](https://code.jquery.com/)                                           | 1,308,168  | 367,222 s    | 281 ms         |
| [Hotjar](https://www.hotjar.com/)                                                | 558,816    | 366,232 s    | 655 ms         |
| [Pubmatic](https://pubmatic.com/)                                                | 320,608    | 305,033 s    | 951 ms         |
| [POWr](https://www.powr.io)                                                      | 64,221     | 272,792 s    | 4248 ms        |
| [Twitter](https://twitter.com)                                                   | 530,914    | 260,709 s    | 491 ms         |
| Klaviyo                                                                          | 336,357    | 260,393 s    | 774 ms         |
| [WordPress](https://wp.com/)                                                     | 479,882    | 257,006 s    | 536 ms         |
| [Blogger](https://www.blogger.com/)                                              | 337,997    | 230,933 s    | 683 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                             | 383,002    | 215,965 s    | 564 ms         |
| [VK](https://vk.com/)                                                            | 33,615     | 186,556 s    | 5550 ms        |
| [Hatena Blog](https://hatenablog.com/)                                           | 83,022     | 185,167 s    | 2230 ms        |
| Medium                                                                           | 13,389     | 179,066 s    | 13374 ms       |
| [TikTok](https://www.tiktok.com/en/)                                             | 407,793    | 171,887 s    | 422 ms         |
| [Hubspot](https://hubspot.com/)                                                  | 302,513    | 163,542 s    | 541 ms         |
| [Framer CDN](https://www.framer.com)                                             | 30,217     | 163,193 s    | 5401 ms        |
| [ZenDesk](https://zendesk.com/)                                                  | 122,451    | 152,695 s    | 1247 ms        |
| [Wistia](https://wistia.com/)                                                    | 37,093     | 146,974 s    | 3962 ms        |
| iubenda                                                                          | 188,276    | 144,007 s    | 765 ms         |
| [PayPal](https://paypal.com)                                                     | 150,992    | 135,094 s    | 895 ms         |
| [Tilda](https://tilda.cc/)                                                       | 130,044    | 133,394 s    | 1026 ms        |
| [Didomi](https://www.didomi.io/)                                                 | 184,468    | 131,538 s    | 713 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                          | 359,761    | 126,470 s    | 352 ms         |
| [Optanon](https://www.cookielaw.org/)                                            | 276,055    | 124,640 s    | 452 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                        | 26,776     | 117,660 s    | 4394 ms        |
| [Adobe TypeKit](https://fonts.adobe.com/)                                        | 170,770    | 112,094 s    | 656 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                      | 459,941    | 110,717 s    | 241 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                   | 1,019,342  | 102,254 s    | 100 ms         |
| [New Relic](https://newrelic.com/)                                               | 341,879    | 98,689 s     | 289 ms         |
| [Sentry](https://sentry.io/)                                                     | 337,077    | 96,733 s     | 287 ms         |
| Kakao                                                                            | 115,677    | 95,875 s     | 829 ms         |
| [Usercentrics CMP](https://usercentrics.com)                                     | 103,651    | 95,043 s     | 917 ms         |
| [ID5 Identity Cloud](https://id5.io/)                                            | 267,438    | 93,671 s     | 350 ms         |
| [Mediavine](https://www.mediavine.com/)                                          | 15,666     | 92,157 s     | 5883 ms        |
| [Intercom](https://www.intercom.com)                                             | 62,181     | 80,457 s     | 1294 ms        |
| [Taboola](https://www.taboola.com/)                                              | 80,955     | 77,761 s     | 961 ms         |
| [Tumblr](https://tumblr.com/)                                                    | 31,081     | 76,563 s     | 2463 ms        |
| [Tawk.to](https://www.tawk.to/)                                                  | 189,841    | 75,149 s     | 396 ms         |
| Cookie-Script.com                                                                | 162,355    | 74,354 s     | 458 ms         |
| [AMP](https://amp.dev/)                                                          | 75,898     | 69,731 s     | 919 ms         |
| LiveJournal                                                                      | 14,805     | 69,398 s     | 4687 ms        |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                  | 109,418    | 65,332 s     | 597 ms         |
| [LiveChat](https://www.livechat.com/)                                            | 65,301     | 61,751 s     | 946 ms         |
| [Jivochat](https://www.jivochat.com/)                                            | 83,766     | 58,378 s     | 697 ms         |
| Bigcommerce                                                                      | 35,814     | 56,879 s     | 1588 ms        |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                | 190,555    | 55,987 s     | 294 ms         |
| Esri ArcGIS                                                                      | 7,424      | 53,140 s     | 7158 ms        |
| Microad                                                                          | 49,683     | 50,403 s     | 1015 ms        |
| [Instagram](https://www.instagram.com)                                           | 34,184     | 49,370 s     | 1444 ms        |
| [Criteo](https://www.criteo.com/)                                                | 343,672    | 48,647 s     | 142 ms         |
| Tynt                                                                             | 173,566    | 48,345 s     | 279 ms         |
| [Osano CMP](https://www.osano.com)                                               | 31,450     | 47,554 s     | 1512 ms        |
| [ShareThis](https://www.sharethis.com/)                                          | 156,923    | 46,220 s     | 295 ms         |
| LinkedIn Ads                                                                     | 374,046    | 45,922 s     | 123 ms         |
| Privy                                                                            | 31,774     | 44,173 s     | 1390 ms        |
| [Tealium](https://tealium.com/)                                                  | 175,283    | 43,837 s     | 250 ms         |
| Azure Web Services                                                               | 62,371     | 42,970 s     | 689 ms         |
| [Disqus](https://disqus.com/)                                                    | 16,554     | 42,340 s     | 2558 ms        |
| [Judge.me](https://judge.me/)                                                    | 45,235     | 40,700 s     | 900 ms         |
| [MGID](https://www.mgid.com/)                                                    | 19,280     | 39,502 s     | 2049 ms        |
| [Crazy Egg](https://www.crazyegg.com/)                                           | 70,812     | 39,036 s     | 551 ms         |
| [Mailchimp](https://mailchimp.com/)                                              | 79,106     | 38,943 s     | 492 ms         |
| Calendly                                                                         | 12,785     | 37,775 s     | 2955 ms        |
| Google reCAPTCHA                                                                 | 84,753     | 36,940 s     | 436 ms         |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                      | 12,547     | 35,680 s     | 2844 ms        |
| [DoubleVerify](https://www.doubleverify.com/)                                    | 14,555     | 35,246 s     | 2422 ms        |
| InMobi                                                                           | 94,393     | 34,724 s     | 368 ms         |
| [Pinterest](https://pinterest.com/)                                              | 278,720    | 32,128 s     | 115 ms         |
| Dailymotion                                                                      | 4,736      | 31,489 s     | 6649 ms        |
| [Yotpo](https://www.yotpo.com/)                                                  | 51,754     | 30,822 s     | 596 ms         |
| [Twitch](https://twitch.tv/)                                                     | 1,879      | 30,812 s     | 16398 ms       |
| [Bing Ads](https://bingads.microsoft.com)                                        | 271,638    | 29,909 s     | 110 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                               | 23,360     | 29,574 s     | 1266 ms        |
| Rambler                                                                          | 23,697     | 29,126 s     | 1229 ms        |
| [Optimizely](https://www.optimizely.com/)                                        | 33,807     | 26,480 s     | 783 ms         |
| Onfocus                                                                          | 89,517     | 26,451 s     | 295 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                     | 28,096     | 26,162 s     | 931 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                        | 8,298      | 24,498 s     | 2952 ms        |
| ContentSquare                                                                    | 18,561     | 24,213 s     | 1305 ms        |
| FullStory                                                                        | 23,521     | 24,096 s     | 1024 ms        |
| Mapbox                                                                           | 33,978     | 23,913 s     | 704 ms         |
| [Seedtag](https://www.seedtag.com/)                                              | 69,750     | 23,745 s     | 340 ms         |
| [Yandex APIs](https://yandex.ru/)                                                | 76,484     | 23,625 s     | 309 ms         |
| [PIXNET](https://www.pixnet.net/)                                                | 16,825     | 23,345 s     | 1388 ms        |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                             | 7,284      | 22,773 s     | 3126 ms        |
| [Smartsupp](https://www.smartsupp.com)                                           | 38,056     | 22,106 s     | 581 ms         |
| [Sumo](https://sumo.com/)                                                        | 15,796     | 22,076 s     | 1398 ms        |
| [OneSignal](https://onesignal.com/)                                              | 109,764    | 21,076 s     | 192 ms         |
| Trust Pilot                                                                      | 81,801     | 21,068 s     | 258 ms         |
| Hexton                                                                           | 62,245     | 21,034 s     | 338 ms         |
| reddit                                                                           | 53,520     | 20,778 s     | 388 ms         |
| [AddToAny](https://www.addtoany.com/)                                            | 145,526    | 20,213 s     | 139 ms         |
| Infolinks                                                                        | 17,589     | 20,175 s     | 1147 ms        |
| OptiMonk                                                                         | 21,362     | 19,771 s     | 926 ms         |
| [CreateJS CDN](https://code.createjs.com/)                                       | 5,661      | 19,382 s     | 3424 ms        |
| [Lucky Orange](https://www.luckyorange.com/)                                     | 53,492     | 19,207 s     | 359 ms         |
| Amplitude Mobile Analytics                                                       | 80,759     | 18,848 s     | 233 ms         |
| Crowd Control                                                                    | 184,568    | 18,678 s     | 101 ms         |
| Geniee                                                                           | 17,539     | 18,496 s     | 1055 ms        |
| [Adroll](https://www.adroll.com/)                                                | 55,422     | 17,567 s     | 317 ms         |
| [33 Across](https://33across.com/)                                               | 201,274    | 17,311 s     | 86 ms          |
| [Segment](https://segment.com/)                                                  | 45,882     | 17,122 s     | 373 ms         |
| AudienceSearch                                                                   | 88,066     | 15,826 s     | 180 ms         |
| Connatix                                                                         | 3,511      | 14,428 s     | 4109 ms        |
| [Google Optimize](https://marketingplatform.google.com/about/optimize/)          | 55,065     | 14,329 s     | 260 ms         |
| Trusted Shops                                                                    | 33,621     | 14,234 s     | 423 ms         |
| Bugsnag                                                                          | 37,770     | 14,134 s     | 374 ms         |
| Twitter Online Conversion Tracking                                               | 138,550    | 14,116 s     | 102 ms         |
| Smart AdServer                                                                   | 85,964     | 13,762 s     | 160 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                            | 14,476     | 13,612 s     | 940 ms         |
| [Supership](https://supership.jp/)                                               | 30,217     | 13,474 s     | 446 ms         |
| [Olark](https://www.olark.com/)                                                  | 9,888      | 13,251 s     | 1340 ms        |
| CallRail                                                                         | 59,559     | 13,148 s     | 221 ms         |
| IPONWEB                                                                          | 55,156     | 12,634 s     | 229 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                       | 114,224    | 12,487 s     | 109 ms         |
| Heroku                                                                           | 18,407     | 11,786 s     | 640 ms         |
| [RD Station](https://www.rdstation.com/en/)                                      | 37,041     | 11,697 s     | 316 ms         |
| Klarna                                                                           | 21,477     | 11,555 s     | 538 ms         |
| [Media.net](https://www.media.net/)                                              | 90,612     | 11,471 s     | 127 ms         |
| issuu                                                                            | 4,119      | 11,272 s     | 2737 ms        |
| [Pendo](https://www.pendo.io)                                                    | 28,533     | 11,150 s     | 391 ms         |
| Inspectlet                                                                       | 8,380      | 11,004 s     | 1313 ms        |
| OpenTable                                                                        | 8,442      | 10,605 s     | 1256 ms        |
| [VWO](https://vwo.com)                                                           | 12,221     | 10,498 s     | 859 ms         |
| GitHub                                                                           | 25,503     | 10,497 s     | 412 ms         |
| Conversant                                                                       | 69,664     | 10,398 s     | 149 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                    | 47,331     | 10,169 s     | 215 ms         |
| [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 74,357     | 9,860 s      | 133 ms         |
| [WordPress Site Stats](https://wp.com/)                                          | 165,697    | 9,521 s      | 57 ms          |
| fluct                                                                            | 18,527     | 9,420 s      | 508 ms         |
| Signyfyd                                                                         | 5,191      | 9,174 s      | 1767 ms        |
| Affirm                                                                           | 13,756     | 8,981 s      | 653 ms         |
| [LinkedIn](https://www.linkedin.com/)                                            | 33,241     | 8,906 s      | 268 ms         |
| [Ad Lightning](https://www.adlightning.com/)                                     | 6,546      | 8,600 s      | 1314 ms        |
| LongTail Ad Solutions                                                            | 9,740      | 8,186 s      | 840 ms         |
| Adyen                                                                            | 4,851      | 8,160 s      | 1682 ms        |
| [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 28,620     | 8,099 s      | 283 ms         |
| [Mixpanel](https://mixpanel.com/)                                                | 40,844     | 7,958 s      | 195 ms         |
| [Attentive](https://attentivemobile.com/)                                        | 15,643     | 7,914 s      | 506 ms         |
| Yahoo! Ad Exchange                                                               | 8,541      | 7,860 s      | 920 ms         |
| [Outbrain](https://www.outbrain.com/)                                            | 31,166     | 7,742 s      | 248 ms         |
| [AppNexus](https://www.appnexus.com/)                                            | 210,382    | 7,659 s      | 36 ms          |
| [Checkout.com](https://www.checkout.com)                                         | 8,392      | 7,544 s      | 899 ms         |
| Bold Commerce                                                                    | 13,791     | 7,476 s      | 542 ms         |
| RTB House AdPilot                                                                | 23,558     | 7,412 s      | 315 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)     | 20,607     | 7,362 s      | 357 ms         |
| Qualtrics                                                                        | 21,015     | 7,350 s      | 350 ms         |
| [Luigis Box](https://www.luigisbox.com/)                                         | 5,363      | 7,251 s      | 1352 ms        |
| Key CDN                                                                          | 21,579     | 7,109 s      | 329 ms         |
| StatCounter                                                                      | 81,964     | 6,824 s      | 83 ms          |
| [Brandmetrics](https://www.brandmetrics.com)                                     | 47,062     | 6,715 s      | 143 ms         |
| TrafficStars                                                                     | 16,770     | 6,681 s      | 398 ms         |
| Embedly                                                                          | 16,482     | 6,614 s      | 401 ms         |
| Fastly                                                                           | 5,399      | 6,466 s      | 1198 ms        |
| Datacamp                                                                         | 2,393      | 6,394 s      | 2672 ms        |
| Convert Insights                                                                 | 9,133      | 6,283 s      | 688 ms         |
| ThreatMetrix                                                                     | 9,931      | 6,276 s      | 632 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                             | 63,431     | 6,223 s      | 98 ms          |
| [Quantcast](https://www.quantcast.com)                                           | 90,501     | 6,100 s      | 67 ms          |
| TrackJS                                                                          | 4,443      | 6,034 s      | 1358 ms        |
| Gemius                                                                           | 30,091     | 5,999 s      | 199 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                         | 85,546     | 5,993 s      | 70 ms          |
| Microsoft Hosted Libs                                                            | 38,147     | 5,939 s      | 156 ms         |
| [OpenX](https://www.openx.com/)                                                  | 120,004    | 5,691 s      | 47 ms          |
| [Hotmart](https://www.hotmart.com/)                                              | 2,750      | 5,412 s      | 1968 ms        |
| Forter                                                                           | 6,321      | 5,387 s      | 852 ms         |
| LoyaltyLion                                                                      | 7,501      | 5,372 s      | 716 ms         |
| Kaltura Video Platform                                                           | 1,510      | 5,200 s      | 3444 ms        |
| [Matomo](https://matomo.org/)                                                    | 27,694     | 5,108 s      | 184 ms         |
| [Akamai](https://www.akamai.com/)                                                | 14,765     | 5,104 s      | 346 ms         |
| Reviews.io                                                                       | 9,308      | 5,000 s      | 537 ms         |
| Civic                                                                            | 13,794     | 4,941 s      | 358 ms         |
| [PageSense](https://www.zoho.com/pagesense/)                                     | 15,498     | 4,864 s      | 314 ms         |
| [AdScore](https://www.adscore.com/)                                              | 8,188      | 4,836 s      | 591 ms         |
| StickyADS.tv                                                                     | 66,501     | 4,661 s      | 70 ms          |
| sovrn                                                                            | 23,840     | 4,476 s      | 188 ms         |
| Dynamic Yield                                                                    | 2,646      | 4,456 s      | 1684 ms        |
| Bazaarvoice                                                                      | 7,829      | 4,420 s      | 565 ms         |
| Rackspace                                                                        | 4,436      | 4,259 s      | 960 ms         |
| VigLink                                                                          | 8,656      | 4,115 s      | 475 ms         |

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
