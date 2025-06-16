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
| 1    | [Bidswitch](https://www.bidswitch.com/)                                          | 14,171    | 0 ms           |
| 2    | AdGear                                                                           | 9,372     | 1 ms           |
| 3    | MaxPoint Interactive                                                             | 8,082     | 1 ms           |
| 4    | Crimtan                                                                          | 26,161    | 1 ms           |
| 5    | Nativo                                                                           | 2,971     | 4 ms           |
| 6    | [iPROM](https://iprom.eu/)                                                       | 21,803    | 5 ms           |
| 7    | Adform                                                                           | 88,789    | 17 ms          |
| 8    | Yellow Robot                                                                     | 2,492     | 17 ms          |
| 9    | Beeswax                                                                          | 6,793     | 17 ms          |
| 10   | [AppNexus](https://www.appnexus.com/)                                            | 127,992   | 29 ms          |
| 11   | Constant Contact                                                                 | 16,904    | 31 ms          |
| 12   | Sonobi                                                                           | 4,647     | 40 ms          |
| 13   | Index Exchange                                                                   | 20,361    | 41 ms          |
| 14   | Branch Metrics                                                                   | 5,393     | 46 ms          |
| 15   | Adscale                                                                          | 5,701     | 48 ms          |
| 16   | Adyoulike                                                                        | 7,413     | 51 ms          |
| 17   | Simpli.fi                                                                        | 3,663     | 55 ms          |
| 18   | Between Digital                                                                  | 2,666     | 57 ms          |
| 19   | LINE Corporation                                                                 | 24,937    | 63 ms          |
| 20   | MailMunch                                                                        | 17,039    | 64 ms          |
| 21   | [33 Across](https://33across.com/)                                               | 137,073   | 66 ms          |
| 22   | GumGum                                                                           | 48,208    | 69 ms          |
| 23   | Intercept Interactive                                                            | 21,601    | 72 ms          |
| 24   | SiteScout                                                                        | 2,975     | 72 ms          |
| 25   | ActiveCampaign                                                                   | 14,778    | 73 ms          |
| 26   | [Scorecard Research](https://www.scorecardresearch.com/)                         | 58,963    | 73 ms          |
| 27   | [OpenX](https://www.openx.com/)                                                  | 33,536    | 76 ms          |
| 28   | [The Trade Desk](https://www.thetradedesk.com/)                                  | 25,512    | 77 ms          |
| 29   | StackAdapt                                                                       | 15,700    | 77 ms          |
| 30   | BlueCava                                                                         | 5,001     | 78 ms          |
| 31   | [Basis](https://basis.net/)                                                      | 3,101     | 78 ms          |
| 32   | DTSCOUT                                                                          | 7,864     | 81 ms          |
| 33   | [Ozone Project](https://www.ozoneproject.com/)                                   | 15,372    | 87 ms          |
| 34   | Affiliate Window                                                                 | 5,989     | 88 ms          |
| 35   | [Hybrid](https://hybrid.ai/)                                                     | 2,624     | 89 ms          |
| 36   | [Bing Ads](https://bingads.microsoft.com)                                        | 240,142   | 101 ms         |
| 37   | Twitter Online Conversion Tracking                                               | 70,777    | 106 ms         |
| 38   | [F@N Communications](https://www.fancs.com/)                                     | 5,851     | 108 ms         |
| 39   | RTB House AdPilot                                                                | 8,247     | 119 ms         |
| 40   | Rakuten Marketing                                                                | 3,257     | 123 ms         |
| 41   | Crowd Control                                                                    | 118,253   | 125 ms         |
| 42   | TVSquared                                                                        | 3,463     | 135 ms         |
| 43   | [Criteo](https://www.criteo.com/)                                                | 141,624   | 140 ms         |
| 44   | [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 38,628    | 141 ms         |
| 45   | i-mobile                                                                         | 12,536    | 142 ms         |
| 46   | Impact Radius                                                                    | 4,528     | 142 ms         |
| 47   | STINGRAY                                                                         | 8,916     | 149 ms         |
| 48   | sovrn                                                                            | 26,075    | 150 ms         |
| 49   | LinkedIn Ads                                                                     | 194,634   | 153 ms         |
| 50   | [Yahoo!](https://www.yahoo.com/)                                                 | 12,373    | 155 ms         |
| 51   | Tynt                                                                             | 71,821    | 159 ms         |
| 52   | Technorati                                                                       | 11,185    | 170 ms         |
| 53   | JuicyAds                                                                         | 2,495     | 183 ms         |
| 54   | AudienceSearch                                                                   | 44,827    | 192 ms         |
| 55   | Gemius                                                                           | 15,527    | 194 ms         |
| 56   | [Outbrain](https://www.outbrain.com/)                                            | 14,147    | 197 ms         |
| 57   | IPONWEB                                                                          | 51,964    | 226 ms         |
| 58   | AdRiver                                                                          | 4,004     | 233 ms         |
| 59   | [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 25,608    | 264 ms         |
| 60   | [Media.net](https://www.media.net/)                                              | 21,412    | 276 ms         |
| 61   | Unbounce                                                                         | 7,759     | 290 ms         |
| 62   | Skimbit                                                                          | 6,957     | 317 ms         |
| 63   | Teads                                                                            | 3,670     | 341 ms         |
| 64   | Salesforce.com                                                                   | 4,825     | 351 ms         |
| 65   | [Adroll](https://www.adroll.com/)                                                | 30,347    | 356 ms         |
| 66   | [Quora Ads](https://www.quora.com/business/)                                     | 8,587     | 360 ms         |
| 67   | [ID5 Identity Cloud](https://id5.io/)                                            | 169,672   | 373 ms         |
| 68   | fluct                                                                            | 10,900    | 412 ms         |
| 69   | TrafficStars                                                                     | 7,654     | 443 ms         |
| 70   | InMobi                                                                           | 39,712    | 457 ms         |
| 71   | [Supership](https://supership.jp/)                                               | 13,620    | 482 ms         |
| 72   | Cxense                                                                           | 3,470     | 499 ms         |
| 73   | Smart AdServer                                                                   | 23,029    | 526 ms         |
| 74   | [Attentive](https://attentivemobile.com/)                                        | 8,667     | 536 ms         |
| 75   | [Amazon Ads](https://ad.amazon.com/)                                             | 193,576   | 573 ms         |
| 76   | VigLink                                                                          | 5,359     | 589 ms         |
| 77   | Microad                                                                          | 21,561    | 593 ms         |
| 78   | [WordAds](https://wordads.co/)                                                   | 5,254     | 610 ms         |
| 79   | [AdScore](https://www.adscore.com/)                                              | 4,165     | 647 ms         |
| 80   | Onfocus                                                                          | 43,586    | 657 ms         |
| 81   | LoyaltyLion                                                                      | 3,910     | 679 ms         |
| 82   | Klaviyo                                                                          | 160,346   | 679 ms         |
| 83   | LoopMe                                                                           | 2,845     | 695 ms         |
| 84   | [Taboola](https://www.taboola.com/)                                              | 43,108    | 728 ms         |
| 85   | [Yandex Ads](https://yandex.com/adv/)                                            | 7,548     | 728 ms         |
| 86   | [Rubicon Project](https://rubiconproject.com/)                                   | 140,787   | 862 ms         |
| 87   | LongTail Ad Solutions                                                            | 4,595     | 863 ms         |
| 88   | OptiMonk                                                                         | 10,689    | 913 ms         |
| 89   | Geniee                                                                           | 9,734     | 940 ms         |
| 90   | StickyADS.tv                                                                     | 7,547     | 999 ms         |
| 91   | [Pubmatic](https://pubmatic.com/)                                                | 154,853   | 1134 ms        |
| 92   | Infolinks                                                                        | 8,002     | 1225 ms        |
| 93   | Privy                                                                            | 17,061    | 1354 ms        |
| 94   | [Ad Lightning](https://www.adlightning.com/)                                     | 3,508     | 1566 ms        |
| 95   | [MGID](https://www.mgid.com/)                                                    | 15,911    | 1674 ms        |
| 96   | [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,089,340 | 1740 ms        |
| 97   | Yahoo! Ad Exchange                                                               | 5,695     | 2035 ms        |
| 98   | [DoubleVerify](https://www.doubleverify.com/)                                    | 17,023    | 2142 ms        |
| 99   | [Integral Ad Science](https://integralads.com/uk/)                               | 22,842    | 2221 ms        |
| 100  | [Mediavine](https://www.mediavine.com/)                                          | 9,449     | 5250 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Mouseflow](https://mouseflow.com/)                                           | 7,440     | 49 ms          |
| 2    | [SpeedCurve RUM](https://www.speedcurve.com/features/performance-monitoring/) | 4,850     | 58 ms          |
| 3    | Roxr Software                                                                 | 11,135    | 61 ms          |
| 4    | Movable Ink                                                                   | 4,201     | 61 ms          |
| 5    | [WordPress Site Stats](https://wp.com/)                                       | 21,766    | 69 ms          |
| 6    | Woopra                                                                        | 1,189     | 78 ms          |
| 7    | [Smartlook](https://www.smartlook.com/)                                       | 15,329    | 78 ms          |
| 8    | StatCounter                                                                   | 49,348    | 82 ms          |
| 9    | Exponea                                                                       | 1,254     | 87 ms          |
| 10   | [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 34,200    | 91 ms          |
| 11   | [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)          | 1,085     | 91 ms          |
| 12   | [Snapchat](https://www.snapchat.com)                                          | 1,234     | 93 ms          |
| 13   | [XiTi](https://www.atinternet.com/en/)                                        | 9,293     | 93 ms          |
| 14   | Sailthru                                                                      | 1,328     | 94 ms          |
| 15   | [Brandmetrics](https://www.brandmetrics.com)                                  | 32,452    | 94 ms          |
| 16   | Treasure Data                                                                 | 12,832    | 101 ms         |
| 17   | [Fastly Insights](https://insights.fastlylabs.com)                            | 6,738     | 105 ms         |
| 18   | [Google Analytics](https://marketingplatform.google.com/about/analytics/)     | 3,318,143 | 106 ms         |
| 19   | [Snowplow](https://snowplowanalytics.com/)                                    | 59,133    | 108 ms         |
| 20   | Conversant                                                                    | 79,976    | 113 ms         |
| 21   | Stamped.io                                                                    | 12,157    | 120 ms         |
| 22   | [Radar](https://www.cedexis.com/radar/)                                       | 1,012     | 141 ms         |
| 23   | [Fathom Analytics](https://usefathom.com/)                                    | 1,123     | 145 ms         |
| 24   | [Braze](https://www.braze.com)                                                | 2,314     | 149 ms         |
| 25   | CleverTap                                                                     | 1,601     | 149 ms         |
| 26   | Marchex                                                                       | 4,391     | 170 ms         |
| 27   | Smart Insight Tracking                                                        | 1,767     | 187 ms         |
| 28   | [Matomo](https://matomo.org/)                                                 | 14,938    | 187 ms         |
| 29   | Parse.ly                                                                      | 5,079     | 193 ms         |
| 30   | Chartbeat                                                                     | 5,626     | 194 ms         |
| 31   | [Mixpanel](https://mixpanel.com/)                                             | 20,159    | 201 ms         |
| 32   | Reviews.co.uk                                                                 | 1,840     | 201 ms         |
| 33   | Amplitude Mobile Analytics                                                    | 50,356    | 203 ms         |
| 34   | Okta                                                                          | 2,302     | 208 ms         |
| 35   | UpSellit                                                                      | 2,817     | 208 ms         |
| 36   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 28,203    | 217 ms         |
| 37   | [Clearbit](https://clearbit.com/)                                             | 3,384     | 220 ms         |
| 38   | CallTrackingMetrics                                                           | 8,100     | 236 ms         |
| 39   | Heap                                                                          | 11,100    | 243 ms         |
| 40   | Trust Pilot                                                                   | 54,710    | 247 ms         |
| 41   | CallRail                                                                      | 30,157    | 249 ms         |
| 42   | [Quantcast](https://www.quantcast.com)                                        | 44,552    | 249 ms         |
| 43   | [Google Optimize](https://marketingplatform.google.com/about/optimize/)       | 32,737    | 284 ms         |
| 44   | etracker                                                                      | 5,651     | 313 ms         |
| 45   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)  | 21,206    | 322 ms         |
| 46   | [PageSense](https://www.zoho.com/pagesense/)                                  | 7,510     | 332 ms         |
| 47   | [Segment](https://segment.com/)                                               | 26,262    | 338 ms         |
| 48   | Evergage                                                                      | 2,947     | 365 ms         |
| 49   | Reviews.io                                                                    | 4,739     | 372 ms         |
| 50   | [Marketo](https://www.marketo.com)                                            | 1,541     | 384 ms         |
| 51   | Net Reviews                                                                   | 1,888     | 412 ms         |
| 52   | [Pendo](https://www.pendo.io)                                                 | 14,389    | 437 ms         |
| 53   | Nosto                                                                         | 1,104     | 439 ms         |
| 54   | Bazaarvoice                                                                   | 3,620     | 444 ms         |
| 55   | [AB Tasty](https://www.abtasty.com/)                                          | 3,098     | 482 ms         |
| 56   | [BowNow](https://bow-now.jp/)                                                 | 2,415     | 484 ms         |
| 57   | Clerk.io ApS                                                                  | 1,865     | 544 ms         |
| 58   | [Lucky Orange](https://www.luckyorange.com/)                                  | 18,203    | 562 ms         |
| 59   | Convert Insights                                                              | 4,550     | 567 ms         |
| 60   | Feefo.com                                                                     | 1,968     | 570 ms         |
| 61   | [VWO](https://vwo.com)                                                        | 6,984     | 642 ms         |
| 62   | Evidon                                                                        | 2,355     | 642 ms         |
| 63   | [Hotjar](https://www.hotjar.com/)                                             | 313,324   | 664 ms         |
| 64   | [Crazy Egg](https://www.crazyegg.com/)                                        | 16,490    | 667 ms         |
| 65   | Qualtrics                                                                     | 7,061     | 712 ms         |
| 66   | [Appcues](https://www.appcues.com/)                                           | 2,944     | 721 ms         |
| 67   | [Kameleoon](https://www.kameleoon.com/)                                       | 2,418     | 768 ms         |
| 68   | PowerReviews                                                                  | 1,433     | 774 ms         |
| 69   | [Optimizely](https://www.optimizely.com/)                                     | 16,429    | 787 ms         |
| 70   | FullStory                                                                     | 13,153    | 914 ms         |
| 71   | TrackJS                                                                       | 2,339     | 957 ms         |
| 72   | Gigya                                                                         | 1,955     | 1026 ms        |
| 73   | Insider                                                                       | 1,868     | 1054 ms        |
| 74   | ContentSquare                                                                 | 7,832     | 1289 ms        |
| 75   | Dynatrace                                                                     | 1,355     | 1289 ms        |
| 76   | Inspectlet                                                                    | 4,722     | 1344 ms        |
| 77   | [Quantum Metric](https://www.quantummetric.com/)                              | 1,119     | 1358 ms        |
| 78   | [Yandex Metrica](https://metrica.yandex.com/about?)                           | 588,700   | 2569 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                        | Usage     | Average Impact |
| ---- | ------------------------------------------- | --------- | -------------- |
| 1    | [Shareaholic](https://www.shareaholic.com/) | 1,049     | 80 ms          |
| 2    | [Pinterest](https://pinterest.com/)         | 131,471   | 112 ms         |
| 3    | reddit                                      | 22,740    | 149 ms         |
| 4    | [AddToAny](https://www.addtoany.com/)       | 57,831    | 169 ms         |
| 5    | [ShareThis](https://www.sharethis.com/)     | 79,526    | 303 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)       | 12,524    | 309 ms         |
| 7    | [Facebook](https://www.facebook.com)        | 2,995,341 | 365 ms         |
| 8    | [TikTok](https://www.tiktok.com/en/)        | 201,875   | 410 ms         |
| 9    | Kakao                                       | 64,055    | 722 ms         |
| 10   | [PIXNET](https://www.pixnet.net/)           | 9,427     | 874 ms         |
| 11   | SocialShopWave                              | 2,715     | 1163 ms        |
| 12   | [Instagram](https://www.instagram.com)      | 21,928    | 1402 ms        |
| 13   | [Twitter](https://twitter.com)              | 256,383   | 1922 ms        |
| 14   | [Disqus](https://disqus.com/)               | 1,428     | 2136 ms        |
| 15   | [Tumblr](https://tumblr.com/)               | 13,203    | 2668 ms        |
| 16   | [VK](https://vk.com/)                       | 20,105    | 4655 ms        |
| 17   | LiveJournal                                 | 7,951     | 6138 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage   | Average Impact |
| ---- | -------------------------------------------- | ------- | -------------- |
| 1    | [Brightcove](https://www.brightcove.com/en/) | 12,668  | 1063 ms        |
| 2    | [Vimeo](https://vimeo.com/)                  | 100,059 | 1840 ms        |
| 3    | [Wistia](https://wistia.com/)                | 24,186  | 4274 ms        |
| 4    | [YouTube](https://youtube.com)               | 895,895 | 6324 ms        |
| 5    | [Twitch](https://twitch.tv/)                 | 1,298   | 17466 ms       |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Statuspage](https://www.statuspage.io)                                   | 1,340     | 30 ms          |
| 2    | Cludo                                                                     | 1,044     | 39 ms          |
| 3    | Webmarked                                                                 | 1,113     | 57 ms          |
| 4    | [Pusher](https://pusher.com/)                                             | 2,114     | 77 ms          |
| 5    | Rollbar                                                                   | 2,508     | 82 ms          |
| 6    | [Checkout.com](https://www.checkout.com)                                  | 1,413     | 87 ms          |
| 7    | Raygun                                                                    | 2,102     | 98 ms          |
| 8    | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 475,952   | 108 ms         |
| 9    | [Afterpay](https://www.afterpay.com/)                                     | 7,138     | 114 ms         |
| 10   | [Doofinder](https://www.doofinder.com/)                                   | 13,531    | 123 ms         |
| 11   | CyberSource (Visa)                                                        | 2,662     | 128 ms         |
| 12   | Macropod BugHerd                                                          | 3,236     | 131 ms         |
| 13   | Braintree Payments                                                        | 1,058     | 141 ms         |
| 14   | [Ipify](https://www.ipify.org)                                            | 2,542     | 155 ms         |
| 15   | [Amazon Pay](https://pay.amazon.com)                                      | 7,172     | 170 ms         |
| 16   | LightWidget                                                               | 8,453     | 174 ms         |
| 17   | [OneSignal](https://onesignal.com/)                                       | 65,764    | 196 ms         |
| 18   | Riskified                                                                 | 1,644     | 204 ms         |
| 19   | Wufoo                                                                     | 2,022     | 206 ms         |
| 20   | [Netlify](https://www.netlify.com/)                                       | 1,208     | 208 ms         |
| 21   | [mParticle](https://www.mparticle.com/)                                   | 1,029     | 217 ms         |
| 22   | Seznam                                                                    | 6,333     | 237 ms         |
| 23   | [New Relic](https://newrelic.com/)                                        | 193,544   | 252 ms         |
| 24   | Cookie-Script.com                                                         | 62,455    | 257 ms         |
| 25   | [Foxentry](https://foxentry.cz/)                                          | 2,396     | 258 ms         |
| 26   | iovation                                                                  | 2,218     | 300 ms         |
| 27   | [TrustArc](https://www.trustarc.com/)                                     | 6,594     | 330 ms         |
| 28   | [Sentry](https://sentry.io/)                                              | 161,265   | 334 ms         |
| 29   | Bugsnag                                                                   | 16,269    | 346 ms         |
| 30   | [Cookiebot](https://www.cookiebot.com/)                                   | 190,786   | 358 ms         |
| 31   | Hexton                                                                    | 25,983    | 360 ms         |
| 32   | Highcharts                                                                | 3,738     | 381 ms         |
| 33   | Key CDN                                                                   | 11,086    | 381 ms         |
| 34   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 2,800,118 | 413 ms         |
| 35   | [Clarity](https://clarity.microsoft.com/)                                 | 517,427   | 415 ms         |
| 36   | Trusted Shops                                                             | 16,922    | 425 ms         |
| 37   | Google reCAPTCHA                                                          | 34,378    | 434 ms         |
| 38   | [Accessibe Accessibility Overlay](https://accessibe.com/)                 | 1,018     | 493 ms         |
| 39   | GitHub                                                                    | 14,958    | 494 ms         |
| 40   | Klarna                                                                    | 9,864     | 509 ms         |
| 41   | Bold Commerce                                                             | 7,864     | 523 ms         |
| 42   | GetSiteControl                                                            | 3,080     | 530 ms         |
| 43   | ThreatMetrix                                                              | 3,843     | 594 ms         |
| 44   | Mapbox                                                                    | 17,782    | 600 ms         |
| 45   | Affirm                                                                    | 6,727     | 634 ms         |
| 46   | Forter                                                                    | 2,639     | 636 ms         |
| 47   | [Google Maps](https://www.google.com/maps)                                | 1,111,403 | 681 ms         |
| 48   | iubenda                                                                   | 100,759   | 705 ms         |
| 49   | Klevu Search                                                              | 1,255     | 735 ms         |
| 50   | [Yandex APIs](https://yandex.ru/)                                         | 50,389    | 758 ms         |
| 51   | [PayPal](https://paypal.com)                                              | 62,538    | 801 ms         |
| 52   | Secomapp                                                                  | 1,895     | 840 ms         |
| 53   | [AppDynamics](https://www.appdynamics.com/)                               | 2,010     | 910 ms         |
| 54   | [Vidyard](https://www.vidyard.com/)                                       | 1,121     | 1047 ms        |
| 55   | Marker                                                                    | 1,932     | 1115 ms        |
| 56   | [Stripe](https://stripe.com)                                              | 144,318   | 1158 ms        |
| 57   | WisePops                                                                  | 1,663     | 1272 ms        |
| 58   | Fastly                                                                    | 2,790     | 1308 ms        |
| 59   | [Luigis Box](https://www.luigisbox.com/)                                  | 2,556     | 1428 ms        |
| 60   | [GoDaddy](https://www.godaddy.com/)                                       | 131,240   | 1574 ms        |
| 61   | Rambler                                                                   | 13,681    | 1775 ms        |
| 62   | Signyfyd                                                                  | 2,620     | 1893 ms        |
| 63   | Datacamp                                                                  | 1,274     | 2617 ms        |
| 64   | Adyen                                                                     | 2,436     | 2626 ms        |
| 65   | [POWr](https://www.powr.io)                                               | 35,803    | 4777 ms        |
| 66   | Esri ArcGIS                                                               | 4,361     | 7074 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Ecwid                                                                                     | 3,409   | 269 ms         |
| 2    | [Blogger](https://www.blogger.com/)                                                       | 189,000 | 335 ms         |
| 3    | Civic                                                                                     | 6,901   | 365 ms         |
| 4    | [Dealer](https://www.dealer.com/)                                                         | 2,881   | 448 ms         |
| 5    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 4,213   | 476 ms         |
| 6    | Global-e                                                                                  | 1,366   | 525 ms         |
| 7    | [WordPress](https://wp.com/)                                                              | 164,616 | 700 ms         |
| 8    | [Shopify](https://www.shopify.com/)                                                       | 363,104 | 901 ms         |
| 9    | [Tilda](https://tilda.cc/)                                                                | 74,879  | 1265 ms        |
| 10   | Rackspace                                                                                 | 2,405   | 1383 ms        |
| 11   | [Hatena Blog](https://hatenablog.com/)                                                    | 36,828  | 2338 ms        |
| 12   | [Squarespace](https://www.squarespace.com/)                                               | 242,555 | 3582 ms        |
| 13   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 4,285   | 4360 ms        |
| 14   | [Wix](https://www.wix.com/)                                                               | 441,917 | 4424 ms        |
| 15   | [Weebly](https://www.weebly.com/)                                                         | 61,497  | 6127 ms        |
| 16   | [Framer CDN](https://www.framer.com)                                                      | 11,994  | 9066 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage   | Average Impact |
| ---- | ------------------------------------------- | ------- | -------------- |
| 1    | [Albacross](https://albacross.com/)         | 1,298   | 66 ms          |
| 2    | [Convertful](https://convertful.com/)       | 1,289   | 100 ms         |
| 3    | DemandBase                                  | 1,954   | 171 ms         |
| 4    | [RD Station](https://www.rdstation.com/en/) | 20,660  | 321 ms         |
| 5    | [Hello Bar](https://www.hellobar.com/)      | 3,821   | 350 ms         |
| 6    | SharpSpring                                 | 1,573   | 353 ms         |
| 7    | Wishpond Technologies                       | 1,537   | 404 ms         |
| 8    | [Mailchimp](https://mailchimp.com/)         | 41,885  | 460 ms         |
| 9    | [Hubspot](https://hubspot.com/)             | 153,435 | 484 ms         |
| 10   | Sojern                                      | 3,809   | 486 ms         |
| 11   | [OptinMonster](https://optinmonster.com/)   | 1,993   | 491 ms         |
| 12   | [iZooto](https://www.izooto.com)            | 1,949   | 492 ms         |
| 13   | [PureCars](https://www.purecars.com/)       | 1,181   | 555 ms         |
| 14   | [Wigzo](https://www.wigzo.com/)             | 1,608   | 590 ms         |
| 15   | [Yotpo](https://www.yotpo.com/)             | 25,584  | 674 ms         |
| 16   | [Judge.me](https://judge.me/)               | 30,070  | 946 ms         |
| 17   | [Beeketing](https://beeketing.com/)         | 1,456   | 1008 ms        |
| 18   | [KARTE](https://karte.io/)                  | 1,583   | 1017 ms        |
| 19   | [Sumo](https://sumo.com/)                   | 9,197   | 1377 ms        |
| 20   | [Wunderkind](https://www.wunderkind.co/)    | 1,331   | 1549 ms        |
| 21   | Bigcommerce                                 | 18,688  | 2112 ms        |
| 22   | [Drift](https://www.drift.com/)             | 3,595   | 4547 ms        |
| 23   | [Tray Commerce](https://www.tray.com.br/)   | 13,735  | 4732 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                                        | Usage   | Average Impact |
| ---- | ----------------------------------------------------------- | ------- | -------------- |
| 1    | [Crisp](https://crisp.chat/)                                | 1,577   | 27 ms          |
| 2    | Provide Support                                             | 1,181   | 71 ms          |
| 3    | iPerceptions                                                | 3,798   | 119 ms         |
| 4    | WebEngage                                                   | 2,321   | 251 ms         |
| 5    | LiveTex                                                     | 1,788   | 262 ms         |
| 6    | Pure Chat                                                   | 2,589   | 334 ms         |
| 7    | [Tawk.to](https://www.tawk.to/)                             | 103,045 | 397 ms         |
| 8    | [Help Scout](https://www.helpscout.net/)                    | 4,719   | 412 ms         |
| 9    | [Smartsupp](https://www.smartsupp.com)                      | 20,654  | 585 ms         |
| 10   | [Jivochat](https://www.jivochat.com/)                       | 48,455  | 598 ms         |
| 11   | [LivePerson](https://www.liveperson.com/)                   | 2,684   | 698 ms         |
| 12   | [Tidio Live Chat](https://www.tidiochat.com/en/)            | 22,983  | 1058 ms        |
| 13   | [LiveChat](https://www.livechat.com/)                       | 40,228  | 1079 ms        |
| 14   | [Intercom](https://www.intercom.com)                        | 35,458  | 1245 ms        |
| 15   | [ZenDesk](https://zendesk.com/)                             | 70,039  | 1299 ms        |
| 16   | [Olark](https://www.olark.com/)                             | 5,718   | 1424 ms        |
| 17   | Dynamic Yield                                               | 1,799   | 1570 ms        |
| 18   | [Freshchat](https://www.freshworks.com/live-chat-software/) | 6,759   | 2903 ms        |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Spotify](https://www.spotify.com/)       | 9,797  | 11 ms          |
| 2    | OpenTable                                 | 4,404  | 80 ms          |
| 3    | Accuweather                               | 1,280  | 180 ms         |
| 4    | Tencent                                   | 7,313  | 278 ms         |
| 5    | Embedly                                   | 10,490 | 397 ms         |
| 6    | TripAdvisor                               | 1,402  | 554 ms         |
| 7    | Cloudinary                                | 2,011  | 591 ms         |
| 8    | Booking.com                               | 2,092  | 720 ms         |
| 9    | Revcontent                                | 1,284  | 797 ms         |
| 10   | [AMP](https://amp.dev/)                   | 55,263 | 976 ms         |
| 11   | CPEx                                      | 1,066  | 1034 ms        |
| 12   | issuu                                     | 2,343  | 2171 ms        |
| 13   | [SoundCloud](https://www.soundcloud.com/) | 4,305  | 2321 ms        |
| 14   | [Hotmart](https://www.hotmart.com/)       | 2,722  | 2404 ms        |
| 15   | Kaltura Video Platform                    | 1,030  | 2945 ms        |
| 16   | Dailymotion                               | 4,694  | 9043 ms        |
| 17   | Medium                                    | 10,725 | 14834 ms       |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage     | Average Impact |
| ---- | ------------------------------------------------------------ | --------- | -------------- |
| 1    | [Google Fonts](https://fonts.google.com/)                    | 121,454   | 0 ms           |
| 2    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 29,759    | 51 ms          |
| 3    | Fort Awesome                                                 | 3,657     | 167 ms         |
| 4    | Monotype                                                     | 2,674     | 202 ms         |
| 5    | Microsoft Hosted Libs                                        | 20,077    | 204 ms         |
| 6    | [FontAwesome CDN](https://fontawesome.com/)                  | 261,491   | 209 ms         |
| 7    | [Akamai](https://www.akamai.com/)                            | 8,485     | 387 ms         |
| 8    | [JSPM](https://jspm.org/)                                    | 1,152     | 393 ms         |
| 9    | [jQuery CDN](https://code.jquery.com/)                       | 702,447   | 415 ms         |
| 10   | [Cloudflare CDN](https://cdnjs.com/)                         | 669,023   | 484 ms         |
| 11   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 450,223   | 646 ms         |
| 12   | [Adobe TypeKit](https://fonts.adobe.com/)                    | 99,069    | 688 ms         |
| 13   | Azure Web Services                                           | 32,027    | 711 ms         |
| 14   | [Google CDN](https://developers.google.com/speed/libraries/) | 3,074,172 | 1466 ms        |
| 15   | [CreateJS CDN](https://code.createjs.com/)                   | 4,132     | 3190 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | TagCommander                                                                  | 1,432     | 264 ms         |
| 2    | [Ensighten](https://www.ensighten.com/)                                       | 3,029     | 488 ms         |
| 3    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 62,377    | 540 ms         |
| 4    | [Tealium](https://tealium.com/)                                               | 38,244    | 554 ms         |
| 5    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 7,961,625 | 928 ms         |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                                              | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------- | ------- | -------------- |
| 1    | [Trustcommander](https://www.commandersact.com)                   | 1,689   | 191 ms         |
| 2    | [Optanon](https://www.cookielaw.org/)                             | 149,745 | 481 ms         |
| 3    | [Didomi](https://www.didomi.io/)                                  | 90,361  | 484 ms         |
| 4    | [UniConsent CMP](https://www.uniconsent.com)                      | 1,253   | 526 ms         |
| 5    | [Google FundingChoices](https://fundingchoices.google.com/start/) | 377,764 | 594 ms         |
| 6    | [Usercentrics CMP](https://usercentrics.com)                      | 49,164  | 929 ms         |
| 7    | [Osano CMP](https://www.osano.com)                                | 11,631  | 1691 ms        |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | [ReadSpeaker](https://www.readspeaker.com)                          | 6,388   | 90 ms          |
| 2    | ResponsiveVoice                                                     | 6,819   | 104 ms         |
| 3    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 1,700   | 274 ms         |
| 4    | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 109,967 | 341 ms         |
| 5    | Marketplace Web Service                                             | 2,259   | 623 ms         |
| 6    | Heroku                                                              | 10,222  | 791 ms         |
| 7    | Calendly                                                            | 4,749   | 1942 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                             | Popularity | Total Impact | Average Impact |
| -------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)    | 7,961,625  | 7,389,292 s  | 928 ms         |
| [YouTube](https://youtube.com)                                                   | 895,895    | 5,665,858 s  | 6324 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                     | 3,074,172  | 4,506,686 s  | 1466 ms        |
| [Wix](https://www.wix.com/)                                                      | 441,917    | 1,955,056 s  | 4424 ms        |
| [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,089,340  | 1,895,365 s  | 1740 ms        |
| [Yandex Metrica](https://metrica.yandex.com/about?)                              | 588,700    | 1,512,306 s  | 2569 ms        |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)        | 2,800,118  | 1,157,046 s  | 413 ms         |
| [Facebook](https://www.facebook.com)                                             | 2,995,341  | 1,094,636 s  | 365 ms         |
| [Squarespace](https://www.squarespace.com/)                                      | 242,555    | 868,858 s    | 3582 ms        |
| [Google Maps](https://www.google.com/maps)                                       | 1,111,403  | 756,843 s    | 681 ms         |
| [Twitter](https://twitter.com)                                                   | 256,383    | 492,677 s    | 1922 ms        |
| [Weebly](https://www.weebly.com/)                                                | 61,497     | 376,799 s    | 6127 ms        |
| [Google Analytics](https://marketingplatform.google.com/about/analytics/)        | 3,318,143  | 353,273 s    | 106 ms         |
| [Shopify](https://www.shopify.com/)                                              | 363,104    | 327,120 s    | 901 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                             | 669,023    | 323,952 s    | 484 ms         |
| [jQuery CDN](https://code.jquery.com/)                                           | 702,447    | 291,645 s    | 415 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                        | 450,223    | 290,847 s    | 646 ms         |
| [Google FundingChoices](https://fundingchoices.google.com/start/)                | 377,764    | 224,219 s    | 594 ms         |
| [Clarity](https://clarity.microsoft.com/)                                        | 517,427    | 214,511 s    | 415 ms         |
| [Hotjar](https://www.hotjar.com/)                                                | 313,324    | 208,154 s    | 664 ms         |
| [GoDaddy](https://www.godaddy.com/)                                              | 131,240    | 206,547 s    | 1574 ms        |
| [Vimeo](https://vimeo.com/)                                                      | 100,059    | 184,143 s    | 1840 ms        |
| [Pubmatic](https://pubmatic.com/)                                                | 154,853    | 175,544 s    | 1134 ms        |
| [POWr](https://www.powr.io)                                                      | 35,803     | 171,027 s    | 4777 ms        |
| [Stripe](https://stripe.com)                                                     | 144,318    | 167,154 s    | 1158 ms        |
| Medium                                                                           | 10,725     | 159,090 s    | 14834 ms       |
| [Rubicon Project](https://rubiconproject.com/)                                   | 140,787    | 121,388 s    | 862 ms         |
| [WordPress](https://wp.com/)                                                     | 164,616    | 115,264 s    | 700 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                             | 193,576    | 111,014 s    | 573 ms         |
| Klaviyo                                                                          | 160,346    | 108,884 s    | 679 ms         |
| [Framer CDN](https://www.framer.com)                                             | 11,994     | 108,741 s    | 9066 ms        |
| [Wistia](https://wistia.com/)                                                    | 24,186     | 103,373 s    | 4274 ms        |
| [Tilda](https://tilda.cc/)                                                       | 74,879     | 94,701 s     | 1265 ms        |
| [VK](https://vk.com/)                                                            | 20,105     | 93,584 s     | 4655 ms        |
| [ZenDesk](https://zendesk.com/)                                                  | 70,039     | 90,954 s     | 1299 ms        |
| [Hatena Blog](https://hatenablog.com/)                                           | 36,828     | 86,086 s     | 2338 ms        |
| [TikTok](https://www.tiktok.com/en/)                                             | 201,875    | 82,781 s     | 410 ms         |
| [Hubspot](https://hubspot.com/)                                                  | 153,435    | 74,200 s     | 484 ms         |
| [Optanon](https://www.cookielaw.org/)                                            | 149,745    | 72,050 s     | 481 ms         |
| iubenda                                                                          | 100,759    | 71,011 s     | 705 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                          | 190,786    | 68,344 s     | 358 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                        | 99,069     | 68,159 s     | 688 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                        | 13,735     | 64,998 s     | 4732 ms        |
| [Blogger](https://www.blogger.com/)                                              | 189,000    | 63,371 s     | 335 ms         |
| [ID5 Identity Cloud](https://id5.io/)                                            | 169,672    | 63,370 s     | 373 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                      | 261,491    | 54,630 s     | 209 ms         |
| [AMP](https://amp.dev/)                                                          | 55,263     | 53,962 s     | 976 ms         |
| [Sentry](https://sentry.io/)                                                     | 161,265    | 53,849 s     | 334 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                   | 475,952    | 51,317 s     | 108 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                               | 22,842     | 50,743 s     | 2221 ms        |
| [PayPal](https://paypal.com)                                                     | 62,538     | 50,122 s     | 801 ms         |
| [Mediavine](https://www.mediavine.com/)                                          | 9,449      | 49,605 s     | 5250 ms        |
| LiveJournal                                                                      | 7,951      | 48,805 s     | 6138 ms        |
| [New Relic](https://newrelic.com/)                                               | 193,544    | 48,761 s     | 252 ms         |
| Kakao                                                                            | 64,055     | 46,236 s     | 722 ms         |
| [Usercentrics CMP](https://usercentrics.com)                                     | 49,164     | 45,653 s     | 929 ms         |
| [Intercom](https://www.intercom.com)                                             | 35,458     | 44,151 s     | 1245 ms        |
| [Didomi](https://www.didomi.io/)                                                 | 90,361     | 43,760 s     | 484 ms         |
| [LiveChat](https://www.livechat.com/)                                            | 40,228     | 43,410 s     | 1079 ms        |
| Dailymotion                                                                      | 4,694      | 42,447 s     | 9043 ms        |
| [Tawk.to](https://www.tawk.to/)                                                  | 103,045    | 40,940 s     | 397 ms         |
| Bigcommerce                                                                      | 18,688     | 39,470 s     | 2112 ms        |
| [Yandex APIs](https://yandex.ru/)                                                | 50,389     | 38,207 s     | 758 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                | 109,967    | 37,445 s     | 341 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                    | 17,023     | 36,463 s     | 2142 ms        |
| [Tumblr](https://tumblr.com/)                                                    | 13,203     | 35,221 s     | 2668 ms        |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                  | 62,377     | 33,688 s     | 540 ms         |
| [Taboola](https://www.taboola.com/)                                              | 43,108     | 31,382 s     | 728 ms         |
| Esri ArcGIS                                                                      | 4,361      | 30,851 s     | 7074 ms        |
| [Instagram](https://www.instagram.com)                                           | 21,928     | 30,750 s     | 1402 ms        |
| LinkedIn Ads                                                                     | 194,634    | 29,855 s     | 153 ms         |
| [Jivochat](https://www.jivochat.com/)                                            | 48,455     | 28,975 s     | 598 ms         |
| Onfocus                                                                          | 43,586     | 28,641 s     | 657 ms         |
| [Judge.me](https://judge.me/)                                                    | 30,070     | 28,441 s     | 946 ms         |
| [MGID](https://www.mgid.com/)                                                    | 15,911     | 26,630 s     | 1674 ms        |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                 | 22,983     | 24,326 s     | 1058 ms        |
| Rambler                                                                          | 13,681     | 24,283 s     | 1775 ms        |
| [Bing Ads](https://bingads.microsoft.com)                                        | 240,142    | 24,242 s     | 101 ms         |
| [ShareThis](https://www.sharethis.com/)                                          | 79,526     | 24,069 s     | 303 ms         |
| Privy                                                                            | 17,061     | 23,092 s     | 1354 ms        |
| Azure Web Services                                                               | 32,027     | 22,763 s     | 711 ms         |
| [Twitch](https://twitch.tv/)                                                     | 1,298      | 22,670 s     | 17466 ms       |
| [Tealium](https://tealium.com/)                                                  | 38,244     | 21,201 s     | 554 ms         |
| [Criteo](https://www.criteo.com/)                                                | 141,624    | 19,768 s     | 140 ms         |
| [Osano CMP](https://www.osano.com)                                               | 11,631     | 19,673 s     | 1691 ms        |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                      | 6,759      | 19,619 s     | 2903 ms        |
| [Mailchimp](https://mailchimp.com/)                                              | 41,885     | 19,257 s     | 460 ms         |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                             | 4,285      | 18,683 s     | 4360 ms        |
| InMobi                                                                           | 39,712     | 18,141 s     | 457 ms         |
| [Yotpo](https://www.yotpo.com/)                                                  | 25,584     | 17,243 s     | 674 ms         |
| [Drift](https://www.drift.com/)                                                  | 3,595      | 16,346 s     | 4547 ms        |
| Cookie-Script.com                                                                | 62,455     | 16,036 s     | 257 ms         |
| Google reCAPTCHA                                                                 | 34,378     | 14,911 s     | 434 ms         |
| Crowd Control                                                                    | 118,253    | 14,837 s     | 125 ms         |
| [Pinterest](https://pinterest.com/)                                              | 131,471    | 14,665 s     | 112 ms         |
| Trust Pilot                                                                      | 54,710     | 13,492 s     | 247 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                     | 12,668     | 13,467 s     | 1063 ms        |
| [CreateJS CDN](https://code.createjs.com/)                                       | 4,132      | 13,180 s     | 3190 ms        |
| [Optimizely](https://www.optimizely.com/)                                        | 16,429     | 12,934 s     | 787 ms         |
| [OneSignal](https://onesignal.com/)                                              | 65,764     | 12,858 s     | 196 ms         |
| Microad                                                                          | 21,561     | 12,795 s     | 593 ms         |
| [Sumo](https://sumo.com/)                                                        | 9,197      | 12,668 s     | 1377 ms        |
| Smart AdServer                                                                   | 23,029     | 12,104 s     | 526 ms         |
| [Smartsupp](https://www.smartsupp.com)                                           | 20,654     | 12,092 s     | 585 ms         |
| FullStory                                                                        | 13,153     | 12,020 s     | 914 ms         |
| IPONWEB                                                                          | 51,964     | 11,725 s     | 226 ms         |
| Yahoo! Ad Exchange                                                               | 5,695      | 11,589 s     | 2035 ms        |
| Tynt                                                                             | 71,821     | 11,399 s     | 159 ms         |
| [Quantcast](https://www.quantcast.com)                                           | 44,552     | 11,078 s     | 249 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                           | 16,490     | 10,994 s     | 667 ms         |
| [Adroll](https://www.adroll.com/)                                                | 30,347     | 10,797 s     | 356 ms         |
| Mapbox                                                                           | 17,782     | 10,677 s     | 600 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                     | 18,203     | 10,239 s     | 562 ms         |
| Amplitude Mobile Analytics                                                       | 50,356     | 10,200 s     | 203 ms         |
| ContentSquare                                                                    | 7,832      | 10,093 s     | 1289 ms        |
| [SoundCloud](https://www.soundcloud.com/)                                        | 4,305      | 9,991 s      | 2321 ms        |
| Infolinks                                                                        | 8,002      | 9,806 s      | 1225 ms        |
| [AddToAny](https://www.addtoany.com/)                                            | 57,831     | 9,795 s      | 169 ms         |
| OptiMonk                                                                         | 10,689     | 9,755 s      | 913 ms         |
| Hexton                                                                           | 25,983     | 9,361 s      | 360 ms         |
| [Google Optimize](https://marketingplatform.google.com/about/optimize/)          | 32,737     | 9,309 s      | 284 ms         |
| Calendly                                                                         | 4,749      | 9,224 s      | 1942 ms        |
| Geniee                                                                           | 9,734      | 9,149 s      | 940 ms         |
| Conversant                                                                       | 79,976     | 9,006 s      | 113 ms         |
| [33 Across](https://33across.com/)                                               | 137,073    | 9,002 s      | 66 ms          |
| [Segment](https://segment.com/)                                                  | 26,262     | 8,873 s      | 338 ms         |
| AudienceSearch                                                                   | 44,827     | 8,608 s      | 192 ms         |
| [PIXNET](https://www.pixnet.net/)                                                | 9,427      | 8,239 s      | 874 ms         |
| [Olark](https://www.olark.com/)                                                  | 5,718      | 8,140 s      | 1424 ms        |
| Heroku                                                                           | 10,222     | 8,087 s      | 791 ms         |
| StickyADS.tv                                                                     | 7,547      | 7,536 s      | 999 ms         |
| CallRail                                                                         | 30,157     | 7,495 s      | 249 ms         |
| Twitter Online Conversion Tracking                                               | 70,777     | 7,490 s      | 106 ms         |
| GitHub                                                                           | 14,958     | 7,395 s      | 494 ms         |
| Trusted Shops                                                                    | 16,922     | 7,200 s      | 425 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)     | 21,206     | 6,827 s      | 322 ms         |
| [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 25,608     | 6,761 s      | 264 ms         |
| [RD Station](https://www.rdstation.com/en/)                                      | 20,660     | 6,632 s      | 321 ms         |
| [Supership](https://supership.jp/)                                               | 13,620     | 6,561 s      | 482 ms         |
| [Hotmart](https://www.hotmart.com/)                                              | 2,722      | 6,544 s      | 2404 ms        |
| Adyen                                                                            | 2,436      | 6,398 s      | 2626 ms        |
| [Snowplow](https://snowplowanalytics.com/)                                       | 59,133     | 6,379 s      | 108 ms         |
| Inspectlet                                                                       | 4,722      | 6,346 s      | 1344 ms        |
| [Pendo](https://www.pendo.io)                                                    | 14,389     | 6,289 s      | 437 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                    | 28,203     | 6,117 s      | 217 ms         |
| [Media.net](https://www.media.net/)                                              | 21,412     | 5,902 s      | 276 ms         |
| Bugsnag                                                                          | 16,269     | 5,634 s      | 346 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                            | 7,548      | 5,497 s      | 728 ms         |
| [Ad Lightning](https://www.adlightning.com/)                                     | 3,508      | 5,493 s      | 1566 ms        |
| [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 38,628     | 5,436 s      | 141 ms         |
| issuu                                                                            | 2,343      | 5,087 s      | 2171 ms        |
| Qualtrics                                                                        | 7,061      | 5,031 s      | 712 ms         |
| Klarna                                                                           | 9,864      | 5,024 s      | 509 ms         |
| Signyfyd                                                                         | 2,620      | 4,959 s      | 1893 ms        |
| [Attentive](https://attentivemobile.com/)                                        | 8,667      | 4,646 s      | 536 ms         |
| fluct                                                                            | 10,900     | 4,495 s      | 412 ms         |
| [VWO](https://vwo.com)                                                           | 6,984      | 4,484 s      | 642 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                         | 58,963     | 4,329 s      | 73 ms          |
| [Seedtag](https://www.seedtag.com/)                                              | 1,650      | 4,321 s      | 2619 ms        |
| Affirm                                                                           | 6,727      | 4,263 s      | 634 ms         |
| Key CDN                                                                          | 11,086     | 4,227 s      | 381 ms         |
| Embedly                                                                          | 10,490     | 4,161 s      | 397 ms         |
| Bold Commerce                                                                    | 7,864      | 4,112 s      | 523 ms         |
| Microsoft Hosted Libs                                                            | 20,077     | 4,095 s      | 204 ms         |
| [Mixpanel](https://mixpanel.com/)                                                | 20,159     | 4,042 s      | 201 ms         |
| StatCounter                                                                      | 49,348     | 4,030 s      | 82 ms          |
| LongTail Ad Solutions                                                            | 4,595      | 3,964 s      | 863 ms         |
| sovrn                                                                            | 26,075     | 3,924 s      | 150 ms         |
| [LinkedIn](https://www.linkedin.com/)                                            | 12,524     | 3,872 s      | 309 ms         |
| [AppNexus](https://www.appnexus.com/)                                            | 127,992    | 3,708 s      | 29 ms          |
| [Luigis Box](https://www.luigisbox.com/)                                         | 2,556      | 3,650 s      | 1428 ms        |
| Fastly                                                                           | 2,790      | 3,649 s      | 1308 ms        |
| Conversion Labs                                                                  | 1,912      | 3,409 s      | 1783 ms        |
| TrafficStars                                                                     | 7,654      | 3,393 s      | 443 ms         |
| reddit                                                                           | 22,740     | 3,383 s      | 149 ms         |
| Datacamp                                                                         | 1,274      | 3,335 s      | 2617 ms        |
| Rackspace                                                                        | 2,405      | 3,326 s      | 1383 ms        |
| GumGum                                                                           | 48,208     | 3,323 s      | 69 ms          |
| [Akamai](https://www.akamai.com/)                                                | 8,485      | 3,284 s      | 387 ms         |
| [WordAds](https://wordads.co/)                                                   | 5,254      | 3,203 s      | 610 ms         |
| VigLink                                                                          | 5,359      | 3,157 s      | 589 ms         |
| SocialShopWave                                                                   | 2,715      | 3,157 s      | 1163 ms        |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                             | 34,200     | 3,098 s      | 91 ms          |
| [Quora Ads](https://www.quora.com/business/)                                     | 8,587      | 3,087 s      | 360 ms         |
| [Brandmetrics](https://www.brandmetrics.com)                                     | 32,452     | 3,051 s      | 94 ms          |
| [Disqus](https://disqus.com/)                                                    | 1,428      | 3,050 s      | 2136 ms        |
| Kaltura Video Platform                                                           | 1,030      | 3,033 s      | 2945 ms        |
| Gemius                                                                           | 15,527     | 3,008 s      | 194 ms         |
| Dynamic Yield                                                                    | 1,799      | 2,824 s      | 1570 ms        |
| [Matomo](https://matomo.org/)                                                    | 14,938     | 2,797 s      | 187 ms         |
| [Outbrain](https://www.outbrain.com/)                                            | 14,147     | 2,785 s      | 197 ms         |
| [AdScore](https://www.adscore.com/)                                              | 4,165      | 2,695 s      | 647 ms         |
| Heap                                                                             | 11,100     | 2,693 s      | 243 ms         |
| SpringServer                                                                     | 1,460      | 2,668 s      | 1827 ms        |
| LoyaltyLion                                                                      | 3,910      | 2,654 s      | 679 ms         |
| Convert Insights                                                                 | 4,550      | 2,582 s      | 567 ms         |
| [OpenX](https://www.openx.com/)                                                  | 33,536     | 2,560 s      | 76 ms          |
| Civic                                                                            | 6,901      | 2,518 s      | 365 ms         |
| [PageSense](https://www.zoho.com/pagesense/)                                     | 7,510      | 2,495 s      | 332 ms         |
| ThreatMetrix                                                                     | 3,843      | 2,284 s      | 594 ms         |

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
