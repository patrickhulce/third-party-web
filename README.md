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
| 1    | Unruly Media                                                                     | 5,165     | 0 ms           |
| 2    | Nativo                                                                           | 23,265    | 0 ms           |
| 3    | [Bidswitch](https://www.bidswitch.com/)                                          | 64,373    | 0 ms           |
| 4    | AdGear                                                                           | 40,592    | 1 ms           |
| 5    | MaxPoint Interactive                                                             | 7,960     | 1 ms           |
| 6    | Tribal Fusion                                                                    | 104,276   | 1 ms           |
| 7    | Crimtan                                                                          | 52,016    | 1 ms           |
| 8    | [iPROM](https://iprom.eu/)                                                       | 49,159    | 2 ms           |
| 9    | adKernel                                                                         | 8,909     | 2 ms           |
| 10   | TripleLift                                                                       | 3,895     | 2 ms           |
| 11   | Beeswax                                                                          | 6,050     | 2 ms           |
| 12   | [33 Across](https://33across.com/)                                               | 130,982   | 15 ms          |
| 13   | Adform                                                                           | 76,151    | 23 ms          |
| 14   | [AppNexus](https://www.appnexus.com/)                                            | 150,303   | 23 ms          |
| 15   | GumGum                                                                           | 113,190   | 25 ms          |
| 16   | Constant Contact                                                                 | 17,524    | 33 ms          |
| 17   | Adyoulike                                                                        | 3,785     | 33 ms          |
| 18   | LoopMe                                                                           | 34,648    | 40 ms          |
| 19   | Sonobi                                                                           | 48,479    | 50 ms          |
| 20   | Branch Metrics                                                                   | 7,599     | 59 ms          |
| 21   | Simpli.fi                                                                        | 9,640     | 63 ms          |
| 22   | MailMunch                                                                        | 16,346    | 65 ms          |
| 23   | [The Trade Desk](https://www.thetradedesk.com/)                                  | 14,423    | 68 ms          |
| 24   | RTB House AdPilot                                                                | 4,593     | 71 ms          |
| 25   | [OpenX](https://www.openx.com/)                                                  | 66,689    | 77 ms          |
| 26   | Twitter Online Conversion Tracking                                               | 68,207    | 77 ms          |
| 27   | BlueCava                                                                         | 4,645     | 80 ms          |
| 28   | ActiveCampaign                                                                   | 17,077    | 81 ms          |
| 29   | StackAdapt                                                                       | 13,485    | 82 ms          |
| 30   | [Scorecard Research](https://www.scorecardresearch.com/)                         | 45,137    | 83 ms          |
| 31   | DTSCOUT                                                                          | 5,848     | 83 ms          |
| 32   | Affiliate Window                                                                 | 4,652     | 90 ms          |
| 33   | LinkedIn Ads                                                                     | 182,566   | 91 ms          |
| 34   | Rocket Fuel                                                                      | 2,823     | 94 ms          |
| 35   | sovrn                                                                            | 21,718    | 111 ms         |
| 36   | [Yahoo!](https://www.yahoo.com/)                                                 | 20,784    | 113 ms         |
| 37   | [Criteo](https://www.criteo.com/)                                                | 153,536   | 118 ms         |
| 38   | Rakuten Marketing                                                                | 3,182     | 123 ms         |
| 39   | Impact Radius                                                                    | 4,026     | 124 ms         |
| 40   | AudienceSearch                                                                   | 43,349    | 132 ms         |
| 41   | Index Exchange                                                                   | 30,989    | 133 ms         |
| 42   | [Quora Ads](https://www.quora.com/business/)                                     | 9,943     | 140 ms         |
| 43   | LINE Corporation                                                                 | 24,223    | 143 ms         |
| 44   | Crowd Control                                                                    | 83,913    | 146 ms         |
| 45   | Gemius                                                                           | 15,845    | 149 ms         |
| 46   | STINGRAY                                                                         | 6,811     | 152 ms         |
| 47   | Intercept Interactive                                                            | 18,073    | 154 ms         |
| 48   | Boomtrain                                                                        | 2,222     | 155 ms         |
| 49   | ucfunnel ucX                                                                     | 8,506     | 161 ms         |
| 50   | Simplicity Marketing                                                             | 2,609     | 162 ms         |
| 51   | [Bing Ads](https://bingads.microsoft.com)                                        | 47,579    | 165 ms         |
| 52   | IPONWEB                                                                          | 24,946    | 165 ms         |
| 53   | AdRiver                                                                          | 4,142     | 174 ms         |
| 54   | TVSquared                                                                        | 4,930     | 181 ms         |
| 55   | Technorati                                                                       | 22,687    | 188 ms         |
| 56   | Smart AdServer                                                                   | 99,408    | 199 ms         |
| 57   | Tynt                                                                             | 150,037   | 203 ms         |
| 58   | InMobi                                                                           | 94,109    | 207 ms         |
| 59   | Microad                                                                          | 6,816     | 225 ms         |
| 60   | [Outbrain](https://www.outbrain.com/)                                            | 11,336    | 231 ms         |
| 61   | [Media.net](https://www.media.net/)                                              | 84,083    | 233 ms         |
| 62   | i-mobile                                                                         | 4,863     | 236 ms         |
| 63   | Salesforce.com                                                                   | 5,141     | 244 ms         |
| 64   | [ID5 Identity Cloud](https://id5.io/)                                            | 61,561    | 247 ms         |
| 65   | TrafficStars                                                                     | 7,538     | 260 ms         |
| 66   | Unbounce                                                                         | 9,031     | 286 ms         |
| 67   | [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 18,102    | 300 ms         |
| 68   | Teads                                                                            | 6,162     | 301 ms         |
| 69   | [Amazon Ads](https://ad.amazon.com/)                                             | 173,879   | 303 ms         |
| 70   | [Adroll](https://www.adroll.com/)                                                | 29,368    | 308 ms         |
| 71   | fluct                                                                            | 13,776    | 317 ms         |
| 72   | Skimbit                                                                          | 79,082    | 326 ms         |
| 73   | [Supership](https://supership.jp/)                                               | 17,742    | 373 ms         |
| 74   | [Yandex Ads](https://yandex.com/adv/)                                            | 8,434     | 461 ms         |
| 75   | [Attentive](https://attentivemobile.com/)                                        | 8,692     | 497 ms         |
| 76   | Cxense                                                                           | 3,742     | 515 ms         |
| 77   | [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 52,852    | 551 ms         |
| 78   | VigLink                                                                          | 6,441     | 563 ms         |
| 79   | OptiMonk                                                                         | 10,175    | 594 ms         |
| 80   | Klaviyo                                                                          | 141,506   | 595 ms         |
| 81   | Privy                                                                            | 18,266    | 608 ms         |
| 82   | [WordAds](https://wordads.co/)                                                   | 91,869    | 629 ms         |
| 83   | [Integral Ad Science](https://integralads.com/uk/)                               | 15,170    | 671 ms         |
| 84   | [AdScore](https://www.adscore.com/)                                              | 4,391     | 763 ms         |
| 85   | [Taboola](https://www.taboola.com/)                                              | 48,303    | 768 ms         |
| 86   | LoyaltyLion                                                                      | 3,994     | 778 ms         |
| 87   | LongTail Ad Solutions                                                            | 5,663     | 801 ms         |
| 88   | [Moat](https://moat.com/)                                                        | 3,508     | 883 ms         |
| 89   | [Rubicon Project](https://rubiconproject.com/)                                   | 207,350   | 925 ms         |
| 90   | Geniee                                                                           | 15,664    | 960 ms         |
| 91   | [DoubleVerify](https://www.doubleverify.com/)                                    | 3,647     | 1122 ms        |
| 92   | [Sizmek](https://www.sizmek.com/)                                                | 5,293     | 1433 ms        |
| 93   | [Pubmatic](https://pubmatic.com/)                                                | 214,222   | 1545 ms        |
| 94   | [Ad Lightning](https://www.adlightning.com/)                                     | 3,865     | 1608 ms        |
| 95   | Infolinks                                                                        | 6,073     | 1617 ms        |
| 96   | [Seedtag](https://www.seedtag.com/)                                              | 2,433     | 1805 ms        |
| 97   | [MGID](https://www.mgid.com/)                                                    | 8,796     | 2016 ms        |
| 98   | Yahoo! Ad Exchange                                                               | 5,024     | 2855 ms        |
| 99   | [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,148,525 | 2897 ms        |
| 100  | [Mediavine](https://www.mediavine.com/)                                          | 10,838    | 3682 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Mouseflow](https://mouseflow.com/)                                           | 4,807     | 47 ms          |
| 2    | [WordPress Site Stats](https://wp.com/)                                       | 56,462    | 55 ms          |
| 3    | [SpeedCurve RUM](https://www.speedcurve.com/features/performance-monitoring/) | 3,783     | 61 ms          |
| 4    | Roxr Software                                                                 | 10,347    | 63 ms          |
| 5    | Movable Ink                                                                   | 4,699     | 78 ms          |
| 6    | Sailthru                                                                      | 1,259     | 82 ms          |
| 7    | [Smartlook](https://www.smartlook.com/)                                       | 14,858    | 89 ms          |
| 8    | Woopra                                                                        | 1,222     | 95 ms          |
| 9    | [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)          | 1,557     | 96 ms          |
| 10   | Treasure Data                                                                 | 13,192    | 97 ms          |
| 11   | [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 30,608    | 98 ms          |
| 12   | [XiTi](https://www.atinternet.com/en/)                                        | 5,761     | 100 ms         |
| 13   | StatCounter                                                                   | 48,566    | 101 ms         |
| 14   | Exponea                                                                       | 1,288     | 104 ms         |
| 15   | Conversant                                                                    | 47,288    | 108 ms         |
| 16   | [Google Analytics](https://marketingplatform.google.com/about/analytics/)     | 4,258,452 | 108 ms         |
| 17   | [Brandmetrics](https://www.brandmetrics.com)                                  | 18,600    | 112 ms         |
| 18   | Polldaddy                                                                     | 2,024     | 113 ms         |
| 19   | CleverTap                                                                     | 1,227     | 124 ms         |
| 20   | Stamped.io                                                                    | 11,912    | 132 ms         |
| 21   | [Snowplow](https://snowplowanalytics.com/)                                    | 60,072    | 138 ms         |
| 22   | [Google Optimize](https://marketingplatform.google.com/about/optimize/)       | 40,491    | 152 ms         |
| 23   | [Mixpanel](https://mixpanel.com/)                                             | 17,973    | 157 ms         |
| 24   | [Quantcast](https://www.quantcast.com)                                        | 62,298    | 162 ms         |
| 25   | [Braze](https://www.braze.com)                                                | 1,878     | 162 ms         |
| 26   | Marchex                                                                       | 6,120     | 164 ms         |
| 27   | [Usabilla](https://usabilla.com)                                              | 1,331     | 165 ms         |
| 28   | Reviews.co.uk                                                                 | 1,888     | 170 ms         |
| 29   | Smart Insight Tracking                                                        | 1,749     | 180 ms         |
| 30   | [Matomo](https://matomo.org/)                                                 | 13,769    | 193 ms         |
| 31   | Amplitude Mobile Analytics                                                    | 35,143    | 197 ms         |
| 32   | Chartbeat                                                                     | 6,305     | 198 ms         |
| 33   | Parse.ly                                                                      | 6,077     | 216 ms         |
| 34   | [Clearbit](https://clearbit.com/)                                             | 4,050     | 216 ms         |
| 35   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 33,662    | 222 ms         |
| 36   | Trust Pilot                                                                   | 43,901    | 234 ms         |
| 37   | CallRail                                                                      | 28,748    | 235 ms         |
| 38   | UpSellit                                                                      | 2,967     | 239 ms         |
| 39   | CallTrackingMetrics                                                           | 7,729     | 242 ms         |
| 40   | etracker                                                                      | 5,541     | 265 ms         |
| 41   | [PageSense](https://www.zoho.com/pagesense/)                                  | 5,634     | 277 ms         |
| 42   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)  | 16,364    | 336 ms         |
| 43   | Survicate                                                                     | 3,250     | 350 ms         |
| 44   | [Pendo](https://www.pendo.io)                                                 | 12,447    | 354 ms         |
| 45   | Reviews.io                                                                    | 4,135     | 356 ms         |
| 46   | [Segment](https://segment.com/)                                               | 26,540    | 365 ms         |
| 47   | Evergage                                                                      | 2,654     | 372 ms         |
| 48   | Heap                                                                          | 13,259    | 380 ms         |
| 49   | Okta                                                                          | 3,300     | 381 ms         |
| 50   | [Marketo](https://www.marketo.com)                                            | 1,802     | 388 ms         |
| 51   | Bazaarvoice                                                                   | 3,173     | 420 ms         |
| 52   | Net Reviews                                                                   | 2,645     | 435 ms         |
| 53   | [AB Tasty](https://www.abtasty.com/)                                          | 3,198     | 461 ms         |
| 54   | [BowNow](https://bow-now.jp/)                                                 | 2,318     | 490 ms         |
| 55   | Evidon                                                                        | 2,296     | 517 ms         |
| 56   | Convert Insights                                                              | 4,048     | 519 ms         |
| 57   | [Crazy Egg](https://www.crazyegg.com/)                                        | 19,740    | 520 ms         |
| 58   | Feefo.com                                                                     | 1,961     | 591 ms         |
| 59   | [Appcues](https://www.appcues.com/)                                           | 2,378     | 592 ms         |
| 60   | [VWO](https://vwo.com)                                                        | 7,604     | 620 ms         |
| 61   | Nosto                                                                         | 1,141     | 634 ms         |
| 62   | [Hotjar](https://www.hotjar.com/)                                             | 321,477   | 638 ms         |
| 63   | FullStory                                                                     | 13,065    | 679 ms         |
| 64   | Qualtrics                                                                     | 6,872     | 680 ms         |
| 65   | PowerReviews                                                                  | 1,475     | 777 ms         |
| 66   | Clerk.io ApS                                                                  | 1,924     | 792 ms         |
| 67   | [Optimizely](https://www.optimizely.com/)                                     | 13,015    | 796 ms         |
| 68   | [Lucky Orange](https://www.luckyorange.com/)                                  | 13,287    | 823 ms         |
| 69   | TrackJS                                                                       | 1,973     | 846 ms         |
| 70   | ContentSquare                                                                 | 2,628     | 891 ms         |
| 71   | [Kameleoon](https://www.kameleoon.com/)                                       | 2,187     | 913 ms         |
| 72   | Insider                                                                       | 1,856     | 971 ms         |
| 73   | Revolver Maps                                                                 | 2,006     | 1035 ms        |
| 74   | Dynatrace                                                                     | 3,389     | 1096 ms        |
| 75   | Gigya                                                                         | 2,012     | 1231 ms        |
| 76   | [Quantum Metric](https://www.quantummetric.com/)                              | 1,149     | 1275 ms        |
| 77   | Inspectlet                                                                    | 5,142     | 1357 ms        |
| 78   | [Yandex Metrica](https://metrica.yandex.com/about?)                           | 576,659   | 1805 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                        | Usage     | Average Impact |
| ---- | ------------------------------------------- | --------- | -------------- |
| 1    | [Shareaholic](https://www.shareaholic.com/) | 1,181     | 91 ms          |
| 2    | [Pinterest](https://pinterest.com/)         | 126,785   | 121 ms         |
| 3    | [AddToAny](https://www.addtoany.com/)       | 63,826    | 143 ms         |
| 4    | reddit                                      | 16,175    | 213 ms         |
| 5    | [LinkedIn](https://www.linkedin.com/)       | 16,463    | 287 ms         |
| 6    | [ShareThis](https://www.sharethis.com/)     | 86,550    | 328 ms         |
| 7    | [Facebook](https://www.facebook.com)        | 3,103,706 | 380 ms         |
| 8    | [TikTok](https://www.tiktok.com/en/)        | 220,242   | 448 ms         |
| 9    | Kakao                                       | 64,115    | 628 ms         |
| 10   | [PIXNET](https://www.pixnet.net/)           | 14,881    | 819 ms         |
| 11   | [Instagram](https://www.instagram.com)      | 17,160    | 1278 ms        |
| 12   | SocialShopWave                              | 4,000     | 1463 ms        |
| 13   | [Disqus](https://disqus.com/)               | 1,770     | 2008 ms        |
| 14   | [Twitter](https://twitter.com)              | 319,565   | 2211 ms        |
| 15   | [Tumblr](https://tumblr.com/)               | 15,962    | 2663 ms        |
| 16   | [VK](https://vk.com/)                       | 20,771    | 2855 ms        |
| 17   | LiveJournal                                 | 9,027     | 6134 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage   | Average Impact |
| ---- | -------------------------------------------- | ------- | -------------- |
| 1    | [Brightcove](https://www.brightcove.com/en/) | 12,833  | 1070 ms        |
| 2    | [Vimeo](https://vimeo.com/)                  | 137,373 | 2725 ms        |
| 3    | [Wistia](https://wistia.com/)                | 26,317  | 3722 ms        |
| 4    | [YouTube](https://youtube.com)               | 938,794 | 4858 ms        |
| 5    | [Twitch](https://twitch.tv/)                 | 1,446   | 13724 ms       |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Statuspage](https://www.statuspage.io)                                   | 1,201     | 30 ms          |
| 2    | Raygun                                                                    | 2,088     | 84 ms          |
| 3    | Rollbar                                                                   | 1,643     | 86 ms          |
| 4    | [Pusher](https://pusher.com/)                                             | 1,378     | 92 ms          |
| 5    | [Checkout.com](https://www.checkout.com)                                  | 1,196     | 98 ms          |
| 6    | iovation                                                                  | 2,103     | 107 ms         |
| 7    | Klarna                                                                    | 8,565     | 110 ms         |
| 8    | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 337,521   | 125 ms         |
| 9    | [Doofinder](https://www.doofinder.com/)                                   | 11,035    | 129 ms         |
| 10   | CyberSource (Visa)                                                        | 2,058     | 133 ms         |
| 11   | [Ipify](https://www.ipify.org)                                            | 2,000     | 140 ms         |
| 12   | [Afterpay](https://www.afterpay.com/)                                     | 7,759     | 154 ms         |
| 13   | Seznam                                                                    | 8,535     | 160 ms         |
| 14   | [Amazon Pay](https://pay.amazon.com)                                      | 6,517     | 163 ms         |
| 15   | Macropod BugHerd                                                          | 2,478     | 166 ms         |
| 16   | [Netlify](https://www.netlify.com/)                                       | 1,298     | 196 ms         |
| 17   | Highcharts                                                                | 3,096     | 205 ms         |
| 18   | LightWidget                                                               | 9,544     | 206 ms         |
| 19   | Riskified                                                                 | 1,842     | 216 ms         |
| 20   | Cookie-Script.com                                                         | 46,664    | 221 ms         |
| 21   | Wufoo                                                                     | 1,541     | 227 ms         |
| 22   | [OneSignal](https://onesignal.com/)                                       | 64,794    | 242 ms         |
| 23   | [New Relic](https://newrelic.com/)                                        | 229,492   | 243 ms         |
| 24   | Google reCAPTCHA                                                          | 31,586    | 278 ms         |
| 25   | [Foxentry](https://foxentry.cz/)                                          | 1,884     | 282 ms         |
| 26   | [Cookiebot](https://www.cookiebot.com/)                                   | 175,618   | 308 ms         |
| 27   | Swiftype                                                                  | 1,057     | 343 ms         |
| 28   | [TrustArc](https://www.trustarc.com/)                                     | 6,258     | 343 ms         |
| 29   | [Clarity](https://clarity.microsoft.com/)                                 | 345,295   | 350 ms         |
| 30   | Hexton                                                                    | 30,178    | 358 ms         |
| 31   | Trusted Shops                                                             | 16,699    | 366 ms         |
| 32   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 2,297,272 | 371 ms         |
| 33   | Bugsnag                                                                   | 12,928    | 391 ms         |
| 34   | Bold Commerce                                                             | 11,260    | 430 ms         |
| 35   | Key CDN                                                                   | 9,021     | 440 ms         |
| 36   | Klevu Search                                                              | 1,373     | 440 ms         |
| 37   | GitHub                                                                    | 14,146    | 442 ms         |
| 38   | GetSiteControl                                                            | 2,966     | 453 ms         |
| 39   | Affirm                                                                    | 6,276     | 488 ms         |
| 40   | [Yandex APIs](https://yandex.ru/)                                         | 43,302    | 583 ms         |
| 41   | iubenda                                                                   | 91,122    | 596 ms         |
| 42   | ThreatMetrix                                                              | 2,785     | 604 ms         |
| 43   | [Sentry](https://sentry.io/)                                              | 75,160    | 619 ms         |
| 44   | [Google Maps](https://www.google.com/maps)                                | 1,195,463 | 621 ms         |
| 45   | Mapbox                                                                    | 18,896    | 654 ms         |
| 46   | [AppDynamics](https://www.appdynamics.com/)                               | 3,374     | 851 ms         |
| 47   | [PayPal](https://paypal.com)                                              | 55,378    | 859 ms         |
| 48   | Forter                                                                    | 6,257     | 885 ms         |
| 49   | [GoDaddy](https://www.godaddy.com/)                                       | 122,531   | 906 ms         |
| 50   | [Vidyard](https://www.vidyard.com/)                                       | 1,049     | 975 ms         |
| 51   | Secomapp                                                                  | 1,995     | 1053 ms        |
| 52   | [Stripe](https://stripe.com)                                              | 123,686   | 1108 ms        |
| 53   | WisePops                                                                  | 1,961     | 1200 ms        |
| 54   | [Luigis Box](https://www.luigisbox.com/)                                  | 2,091     | 1208 ms        |
| 55   | Marker                                                                    | 1,576     | 1214 ms        |
| 56   | Signyfyd                                                                  | 2,407     | 1508 ms        |
| 57   | Fastly                                                                    | 9,274     | 1995 ms        |
| 58   | Adyen                                                                     | 2,278     | 2053 ms        |
| 59   | Datacamp                                                                  | 1,217     | 2422 ms        |
| 60   | Rambler                                                                   | 15,932    | 3996 ms        |
| 61   | [POWr](https://www.powr.io)                                               | 37,652    | 4562 ms        |
| 62   | Esri ArcGIS                                                               | 3,153     | 6060 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](https://www.blogger.com/)                                                       | 210,802 | 166 ms         |
| 2    | [Dealer](https://www.dealer.com/)                                                         | 1,940   | 332 ms         |
| 3    | Civic                                                                                     | 6,644   | 342 ms         |
| 4    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 3,891   | 370 ms         |
| 5    | [WordPress](https://wp.com/)                                                              | 295,900 | 641 ms         |
| 6    | Global-e                                                                                  | 1,161   | 723 ms         |
| 7    | [Shopify](https://www.shopify.com/)                                                       | 296,099 | 765 ms         |
| 8    | Ecwid                                                                                     | 5,357   | 861 ms         |
| 9    | Rackspace                                                                                 | 1,916   | 883 ms         |
| 10   | [Tilda](https://tilda.cc/)                                                                | 67,454  | 1200 ms        |
| 11   | [Hatena Blog](https://hatenablog.com/)                                                    | 42,275  | 1949 ms        |
| 12   | [Squarespace](https://www.squarespace.com/)                                               | 233,793 | 3571 ms        |
| 13   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 4,754   | 4230 ms        |
| 14   | [Wix](https://www.wix.com/)                                                               | 441,849 | 4390 ms        |
| 15   | [Weebly](https://www.weebly.com/)                                                         | 65,463  | 5720 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage   | Average Impact |
| ---- | ------------------------------------------- | ------- | -------------- |
| 1    | [Albacross](https://albacross.com/)         | 1,212   | 65 ms          |
| 2    | DemandBase                                  | 2,166   | 128 ms         |
| 3    | [Convertful](https://convertful.com/)       | 1,473   | 144 ms         |
| 4    | [RD Station](https://www.rdstation.com/en/) | 20,906  | 297 ms         |
| 5    | SharpSpring                                 | 2,021   | 308 ms         |
| 6    | [Listrak](https://www.listrak.com/)         | 1,160   | 392 ms         |
| 7    | [Mailchimp](https://mailchimp.com/)         | 44,823  | 397 ms         |
| 8    | [OptinMonster](https://optinmonster.com/)   | 2,429   | 401 ms         |
| 9    | Sojern                                      | 4,001   | 475 ms         |
| 10   | [Hubspot](https://hubspot.com/)             | 146,221 | 511 ms         |
| 11   | Wishpond Technologies                       | 1,628   | 514 ms         |
| 12   | [Yotpo](https://www.yotpo.com/)             | 25,832  | 613 ms         |
| 13   | [iZooto](https://www.izooto.com)            | 2,303   | 618 ms         |
| 14   | [PureCars](https://www.purecars.com/)       | 1,408   | 671 ms         |
| 15   | [KARTE](https://karte.io/)                  | 1,732   | 903 ms         |
| 16   | [Judge.me](https://judge.me/)               | 26,390  | 943 ms         |
| 17   | [Beeketing](https://beeketing.com/)         | 2,042   | 973 ms         |
| 18   | [Wunderkind](https://www.wunderkind.co/)    | 1,196   | 1282 ms        |
| 19   | [Sumo](https://sumo.com/)                   | 11,296  | 1386 ms        |
| 20   | Bigcommerce                                 | 19,580  | 2223 ms        |
| 21   | [Drift](https://www.drift.com/)             | 5,561   | 4261 ms        |
| 22   | [Tray Commerce](https://www.tray.com.br/)   | 13,778  | 4531 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                                        | Usage   | Average Impact |
| ---- | ----------------------------------------------------------- | ------- | -------------- |
| 1    | iPerceptions                                                | 4,572   | 130 ms         |
| 2    | [Help Scout](https://www.helpscout.net/)                    | 4,399   | 135 ms         |
| 3    | LiveTex                                                     | 1,892   | 221 ms         |
| 4    | WebEngage                                                   | 2,158   | 267 ms         |
| 5    | Pure Chat                                                   | 3,097   | 323 ms         |
| 6    | [Tawk.to](https://www.tawk.to/)                             | 107,991 | 361 ms         |
| 7    | [Smartsupp](https://www.smartsupp.com)                      | 21,142  | 391 ms         |
| 8    | Comm100                                                     | 1,019   | 416 ms         |
| 9    | [Jivochat](https://www.jivochat.com/)                       | 52,339  | 638 ms         |
| 10   | [LivePerson](https://www.liveperson.com/)                   | 2,680   | 665 ms         |
| 11   | [Intercom](https://www.intercom.com)                        | 32,322  | 1071 ms        |
| 12   | [LiveChat](https://www.livechat.com/)                       | 38,242  | 1073 ms        |
| 13   | [Tidio Live Chat](https://www.tidiochat.com/en/)            | 24,209  | 1159 ms        |
| 14   | [Olark](https://www.olark.com/)                             | 6,571   | 1288 ms        |
| 15   | [ZenDesk](https://zendesk.com/)                             | 72,680  | 1471 ms        |
| 16   | Dynamic Yield                                               | 1,795   | 1907 ms        |
| 17   | [Freshchat](https://www.freshworks.com/live-chat-software/) | 6,810   | 2929 ms        |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Spotify](https://www.spotify.com/)       | 10,720 | 7 ms           |
| 2    | OpenTable                                 | 4,222  | 87 ms          |
| 3    | TripAdvisor                               | 2,000  | 134 ms         |
| 4    | Accuweather                               | 1,565  | 166 ms         |
| 5    | Tencent                                   | 7,153  | 286 ms         |
| 6    | Cloudinary                                | 2,472  | 522 ms         |
| 7    | Booking.com                               | 2,493  | 530 ms         |
| 8    | CPEx                                      | 1,067  | 603 ms         |
| 9    | Revcontent                                | 1,201  | 858 ms         |
| 10   | [AMP](https://amp.dev/)                   | 73,908 | 989 ms         |
| 11   | Embedly                                   | 10,222 | 1456 ms        |
| 12   | issuu                                     | 2,637  | 1842 ms        |
| 13   | [SoundCloud](https://www.soundcloud.com/) | 5,711  | 2408 ms        |
| 14   | [Hotmart](https://www.hotmart.com/)       | 4,020  | 2865 ms        |
| 15   | Dailymotion                               | 5,136  | 9346 ms        |
| 16   | Medium                                    | 18,170 | 10918 ms       |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage     | Average Impact |
| ---- | ------------------------------------------------------------ | --------- | -------------- |
| 1    | [Google Fonts](https://fonts.google.com/)                    | 216,074   | 0 ms           |
| 2    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 28,205    | 55 ms          |
| 3    | Monotype                                                     | 3,181     | 204 ms         |
| 4    | [FontAwesome CDN](https://fontawesome.com/)                  | 306,673   | 215 ms         |
| 5    | Microsoft Hosted Libs                                        | 19,220    | 219 ms         |
| 6    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 98,647    | 345 ms         |
| 7    | Fort Awesome                                                 | 3,838     | 357 ms         |
| 8    | [jQuery CDN](https://code.jquery.com/)                       | 706,780   | 364 ms         |
| 9    | [Akamai](https://www.akamai.com/)                            | 9,598     | 396 ms         |
| 10   | [Cloudflare CDN](https://cdnjs.com/)                         | 612,210   | 486 ms         |
| 11   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 345,059   | 620 ms         |
| 12   | Azure Web Services                                           | 49,287    | 805 ms         |
| 13   | [Google CDN](https://developers.google.com/speed/libraries/) | 3,277,645 | 1068 ms        |
| 14   | [CreateJS CDN](https://code.createjs.com/)                   | 4,053     | 2868 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 167,978   | 193 ms         |
| 2    | TagCommander                                                                  | 1,430     | 293 ms         |
| 3    | [Ensighten](https://www.ensighten.com/)                                       | 3,070     | 510 ms         |
| 4    | [Tealium](https://tealium.com/)                                               | 27,039    | 594 ms         |
| 5    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 7,750,346 | 697 ms         |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                                              | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------- | ------- | -------------- |
| 1    | [Trustcommander](https://www.commandersact.com)                   | 1,647   | 167 ms         |
| 2    | [Optanon](https://www.cookielaw.org/)                             | 114,606 | 430 ms         |
| 3    | [Google FundingChoices](https://fundingchoices.google.com/start/) | 404,501 | 560 ms         |
| 4    | [UniConsent CMP](https://www.uniconsent.com)                      | 1,221   | 627 ms         |
| 5    | [Didomi](https://www.didomi.io/)                                  | 39,040  | 720 ms         |
| 6    | [Usercentrics CMP](https://usercentrics.com)                      | 47,221  | 993 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | [ReadSpeaker](https://www.readspeaker.com)                          | 5,694   | 103 ms         |
| 2    | ResponsiveVoice                                                     | 6,349   | 119 ms         |
| 3    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 1,772   | 311 ms         |
| 4    | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 114,939 | 409 ms         |
| 5    | Heroku                                                              | 14,352  | 955 ms         |
| 6    | Calendly                                                            | 3,986   | 1615 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                             | Popularity | Total Impact | Average Impact |
| -------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)    | 7,750,346  | 5,405,662 s  | 697 ms         |
| [YouTube](https://youtube.com)                                                   | 938,794    | 4,560,336 s  | 4858 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                     | 3,277,645  | 3,502,096 s  | 1068 ms        |
| [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,148,525  | 3,327,660 s  | 2897 ms        |
| [Wix](https://www.wix.com/)                                                      | 441,849    | 1,939,898 s  | 4390 ms        |
| [Facebook](https://www.facebook.com)                                             | 3,103,706  | 1,178,628 s  | 380 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                              | 576,659    | 1,040,757 s  | 1805 ms        |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)        | 2,297,272  | 851,954 s    | 371 ms         |
| [Squarespace](https://www.squarespace.com/)                                      | 233,793    | 834,982 s    | 3571 ms        |
| [Google Maps](https://www.google.com/maps)                                       | 1,195,463  | 741,985 s    | 621 ms         |
| [Twitter](https://twitter.com)                                                   | 319,565    | 706,652 s    | 2211 ms        |
| [Google Analytics](https://marketingplatform.google.com/about/analytics/)        | 4,258,452  | 461,364 s    | 108 ms         |
| [Weebly](https://www.weebly.com/)                                                | 65,463     | 374,457 s    | 5720 ms        |
| [Vimeo](https://vimeo.com/)                                                      | 137,373    | 374,316 s    | 2725 ms        |
| [Pubmatic](https://pubmatic.com/)                                                | 214,222    | 331,069 s    | 1545 ms        |
| [Cloudflare CDN](https://cdnjs.com/)                                             | 612,210    | 297,470 s    | 486 ms         |
| [jQuery CDN](https://code.jquery.com/)                                           | 706,780    | 257,591 s    | 364 ms         |
| [Google FundingChoices](https://fundingchoices.google.com/start/)                | 404,501    | 226,496 s    | 560 ms         |
| [Shopify](https://www.shopify.com/)                                              | 296,099    | 226,454 s    | 765 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                        | 345,059    | 213,879 s    | 620 ms         |
| [Hotjar](https://www.hotjar.com/)                                                | 321,477    | 205,054 s    | 638 ms         |
| Medium                                                                           | 18,170     | 198,383 s    | 10918 ms       |
| [Rubicon Project](https://rubiconproject.com/)                                   | 207,350    | 191,826 s    | 925 ms         |
| [WordPress](https://wp.com/)                                                     | 295,900    | 189,704 s    | 641 ms         |
| [POWr](https://www.powr.io)                                                      | 37,652     | 171,775 s    | 4562 ms        |
| [Stripe](https://stripe.com)                                                     | 123,686    | 137,094 s    | 1108 ms        |
| [Clarity](https://clarity.microsoft.com/)                                        | 345,295    | 120,722 s    | 350 ms         |
| [GoDaddy](https://www.godaddy.com/)                                              | 122,531    | 110,960 s    | 906 ms         |
| [ZenDesk](https://zendesk.com/)                                                  | 72,680     | 106,919 s    | 1471 ms        |
| [TikTok](https://www.tiktok.com/en/)                                             | 220,242    | 98,596 s     | 448 ms         |
| [Wistia](https://wistia.com/)                                                    | 26,317     | 97,947 s     | 3722 ms        |
| Klaviyo                                                                          | 141,506    | 84,178 s     | 595 ms         |
| [Hatena Blog](https://hatenablog.com/)                                           | 42,275     | 82,410 s     | 1949 ms        |
| [Tilda](https://tilda.cc/)                                                       | 67,454     | 80,949 s     | 1200 ms        |
| [Hubspot](https://hubspot.com/)                                                  | 146,221    | 74,698 s     | 511 ms         |
| [AMP](https://amp.dev/)                                                          | 73,908     | 73,126 s     | 989 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                      | 306,673    | 65,797 s     | 215 ms         |
| Rambler                                                                          | 15,932     | 63,667 s     | 3996 ms        |
| [Tray Commerce](https://www.tray.com.br/)                                        | 13,778     | 62,434 s     | 4531 ms        |
| [VK](https://vk.com/)                                                            | 20,771     | 59,304 s     | 2855 ms        |
| [WordAds](https://wordads.co/)                                                   | 91,869     | 57,759 s     | 629 ms         |
| [New Relic](https://newrelic.com/)                                               | 229,492    | 55,832 s     | 243 ms         |
| LiveJournal                                                                      | 9,027      | 55,367 s     | 6134 ms        |
| iubenda                                                                          | 91,122     | 54,306 s     | 596 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                          | 175,618    | 54,088 s     | 308 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                             | 173,879    | 52,740 s     | 303 ms         |
| [Optanon](https://www.cookielaw.org/)                                            | 114,606    | 49,310 s     | 430 ms         |
| Dailymotion                                                                      | 5,136      | 48,001 s     | 9346 ms        |
| [PayPal](https://paypal.com)                                                     | 55,378     | 47,551 s     | 859 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                | 114,939    | 47,065 s     | 409 ms         |
| [Usercentrics CMP](https://usercentrics.com)                                     | 47,221     | 46,881 s     | 993 ms         |
| [Sentry](https://sentry.io/)                                                     | 75,160     | 46,559 s     | 619 ms         |
| Bigcommerce                                                                      | 19,580     | 43,524 s     | 2223 ms        |
| [Tumblr](https://tumblr.com/)                                                    | 15,962     | 42,503 s     | 2663 ms        |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                   | 337,521    | 42,245 s     | 125 ms         |
| [LiveChat](https://www.livechat.com/)                                            | 38,242     | 41,035 s     | 1073 ms        |
| Kakao                                                                            | 64,115     | 40,275 s     | 628 ms         |
| [Mediavine](https://www.mediavine.com/)                                          | 10,838     | 39,909 s     | 3682 ms        |
| Azure Web Services                                                               | 49,287     | 39,663 s     | 805 ms         |
| [Tawk.to](https://www.tawk.to/)                                                  | 107,991    | 38,947 s     | 361 ms         |
| [Taboola](https://www.taboola.com/)                                              | 48,303     | 37,094 s     | 768 ms         |
| [Blogger](https://www.blogger.com/)                                              | 210,802    | 35,092 s     | 166 ms         |
| [Intercom](https://www.intercom.com)                                             | 32,322     | 34,611 s     | 1071 ms        |
| [Adobe TypeKit](https://fonts.adobe.com/)                                        | 98,647     | 34,065 s     | 345 ms         |
| [Jivochat](https://www.jivochat.com/)                                            | 52,339     | 33,398 s     | 638 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                  | 167,978    | 32,419 s     | 193 ms         |
| Tynt                                                                             | 150,037    | 30,446 s     | 203 ms         |
| [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 52,852     | 29,096 s     | 551 ms         |
| [ShareThis](https://www.sharethis.com/)                                          | 86,550     | 28,406 s     | 328 ms         |
| [Didomi](https://www.didomi.io/)                                                 | 39,040     | 28,125 s     | 720 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                 | 24,209     | 28,056 s     | 1159 ms        |
| Skimbit                                                                          | 79,082     | 25,805 s     | 326 ms         |
| [Yandex APIs](https://yandex.ru/)                                                | 43,302     | 25,240 s     | 583 ms         |
| [Judge.me](https://judge.me/)                                                    | 26,390     | 24,885 s     | 943 ms         |
| [Drift](https://www.drift.com/)                                                  | 5,561      | 23,693 s     | 4261 ms        |
| [Instagram](https://www.instagram.com)                                           | 17,160     | 21,936 s     | 1278 ms        |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                             | 4,754      | 20,109 s     | 4230 ms        |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                      | 6,810      | 19,946 s     | 2929 ms        |
| [Twitch](https://twitch.tv/)                                                     | 1,446      | 19,845 s     | 13724 ms       |
| Smart AdServer                                                                   | 99,408     | 19,754 s     | 199 ms         |
| [Media.net](https://www.media.net/)                                              | 84,083     | 19,622 s     | 233 ms         |
| InMobi                                                                           | 94,109     | 19,480 s     | 207 ms         |
| Esri ArcGIS                                                                      | 3,153      | 19,107 s     | 6060 ms        |
| Fastly                                                                           | 9,274      | 18,502 s     | 1995 ms        |
| [Criteo](https://www.criteo.com/)                                                | 153,536    | 18,074 s     | 118 ms         |
| [Mailchimp](https://mailchimp.com/)                                              | 44,823     | 17,804 s     | 397 ms         |
| [MGID](https://www.mgid.com/)                                                    | 8,796      | 17,735 s     | 2016 ms        |
| LinkedIn Ads                                                                     | 182,566    | 16,704 s     | 91 ms          |
| [Tealium](https://tealium.com/)                                                  | 27,039     | 16,061 s     | 594 ms         |
| [Yotpo](https://www.yotpo.com/)                                                  | 25,832     | 15,827 s     | 613 ms         |
| [OneSignal](https://onesignal.com/)                                              | 64,794     | 15,657 s     | 242 ms         |
| [Sumo](https://sumo.com/)                                                        | 11,296     | 15,652 s     | 1386 ms        |
| [Pinterest](https://pinterest.com/)                                              | 126,785    | 15,278 s     | 121 ms         |
| [ID5 Identity Cloud](https://id5.io/)                                            | 61,561     | 15,231 s     | 247 ms         |
| Geniee                                                                           | 15,664     | 15,032 s     | 960 ms         |
| Embedly                                                                          | 10,222     | 14,886 s     | 1456 ms        |
| Yahoo! Ad Exchange                                                               | 5,024      | 14,342 s     | 2855 ms        |
| [SoundCloud](https://www.soundcloud.com/)                                        | 5,711      | 13,752 s     | 2408 ms        |
| [Brightcove](https://www.brightcove.com/en/)                                     | 12,833     | 13,734 s     | 1070 ms        |
| Heroku                                                                           | 14,352     | 13,704 s     | 955 ms         |
| Mapbox                                                                           | 18,896     | 12,364 s     | 654 ms         |
| Crowd Control                                                                    | 83,913     | 12,230 s     | 146 ms         |
| [PIXNET](https://www.pixnet.net/)                                                | 14,881     | 12,189 s     | 819 ms         |
| [CreateJS CDN](https://code.createjs.com/)                                       | 4,053      | 11,623 s     | 2868 ms        |
| [Hotmart](https://www.hotmart.com/)                                              | 4,020      | 11,516 s     | 2865 ms        |
| Privy                                                                            | 18,266     | 11,097 s     | 608 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                     | 13,287     | 10,936 s     | 823 ms         |
| Hexton                                                                           | 30,178     | 10,795 s     | 358 ms         |
| [Optimizely](https://www.optimizely.com/)                                        | 13,015     | 10,354 s     | 796 ms         |
| Cookie-Script.com                                                                | 46,664     | 10,322 s     | 221 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                           | 19,740     | 10,267 s     | 520 ms         |
| Trust Pilot                                                                      | 43,901     | 10,267 s     | 234 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                               | 15,170     | 10,183 s     | 671 ms         |
| [Quantcast](https://www.quantcast.com)                                           | 62,298     | 10,071 s     | 162 ms         |
| Infolinks                                                                        | 6,073      | 9,821 s      | 1617 ms        |
| [Segment](https://segment.com/)                                                  | 26,540     | 9,678 s      | 365 ms         |
| [AddToAny](https://www.addtoany.com/)                                            | 63,826     | 9,140 s      | 143 ms         |
| [Adroll](https://www.adroll.com/)                                                | 29,368     | 9,055 s      | 308 ms         |
| FullStory                                                                        | 13,065     | 8,875 s      | 679 ms         |
| Google reCAPTCHA                                                                 | 31,586     | 8,793 s      | 278 ms         |
| [Olark](https://www.olark.com/)                                                  | 6,571      | 8,465 s      | 1288 ms        |
| [Snowplow](https://snowplowanalytics.com/)                                       | 60,072     | 8,271 s      | 138 ms         |
| [Smartsupp](https://www.smartsupp.com)                                           | 21,142     | 8,262 s      | 391 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                        | 47,579     | 7,849 s      | 165 ms         |
| [Sizmek](https://www.sizmek.com/)                                                | 5,293      | 7,584 s      | 1433 ms        |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                    | 33,662     | 7,468 s      | 222 ms         |
| Inspectlet                                                                       | 5,142      | 6,980 s      | 1357 ms        |
| Amplitude Mobile Analytics                                                       | 35,143     | 6,916 s      | 197 ms         |
| CallRail                                                                         | 28,748     | 6,745 s      | 235 ms         |
| [Supership](https://supership.jp/)                                               | 17,742     | 6,623 s      | 373 ms         |
| Calendly                                                                         | 3,986      | 6,439 s      | 1615 ms        |
| GitHub                                                                           | 14,146     | 6,257 s      | 442 ms         |
| [Ad Lightning](https://www.adlightning.com/)                                     | 3,865      | 6,216 s      | 1608 ms        |
| [RD Station](https://www.rdstation.com/en/)                                      | 20,906     | 6,202 s      | 297 ms         |
| [Google Optimize](https://marketingplatform.google.com/about/optimize/)          | 40,491     | 6,135 s      | 152 ms         |
| Trusted Shops                                                                    | 16,699     | 6,116 s      | 366 ms         |
| OptiMonk                                                                         | 10,175     | 6,047 s      | 594 ms         |
| SocialShopWave                                                                   | 4,000      | 5,852 s      | 1463 ms        |
| AudienceSearch                                                                   | 43,349     | 5,737 s      | 132 ms         |
| Forter                                                                           | 6,257      | 5,535 s      | 885 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)     | 16,364     | 5,497 s      | 336 ms         |
| [LiveRamp Privacy Manager](https://liveramp.com/privacy-legal-compliance/)       | 18,102     | 5,431 s      | 300 ms         |
| Twitter Online Conversion Tracking                                               | 68,207     | 5,255 s      | 77 ms          |
| Conversant                                                                       | 47,288     | 5,119 s      | 108 ms         |
| [OpenX](https://www.openx.com/)                                                  | 66,689     | 5,109 s      | 77 ms          |
| Bugsnag                                                                          | 12,928     | 5,058 s      | 391 ms         |
| Heap                                                                             | 13,259     | 5,043 s      | 380 ms         |
| StatCounter                                                                      | 48,566     | 4,912 s      | 101 ms         |
| issuu                                                                            | 2,637      | 4,857 s      | 1842 ms        |
| Bold Commerce                                                                    | 11,260     | 4,842 s      | 430 ms         |
| [LinkedIn](https://www.linkedin.com/)                                            | 16,463     | 4,731 s      | 287 ms         |
| [VWO](https://vwo.com)                                                           | 7,604      | 4,715 s      | 620 ms         |
| Adyen                                                                            | 2,278      | 4,678 s      | 2053 ms        |
| Qualtrics                                                                        | 6,872      | 4,674 s      | 680 ms         |
| Ecwid                                                                            | 5,357      | 4,614 s      | 861 ms         |
| LongTail Ad Solutions                                                            | 5,663      | 4,539 s      | 801 ms         |
| [Pendo](https://www.pendo.io)                                                    | 12,447     | 4,409 s      | 354 ms         |
| [Seedtag](https://www.seedtag.com/)                                              | 2,433      | 4,392 s      | 1805 ms        |
| fluct                                                                            | 13,776     | 4,366 s      | 317 ms         |
| [Attentive](https://attentivemobile.com/)                                        | 8,692      | 4,323 s      | 497 ms         |
| Technorati                                                                       | 22,687     | 4,257 s      | 188 ms         |
| Microsoft Hosted Libs                                                            | 19,220     | 4,203 s      | 219 ms         |
| IPONWEB                                                                          | 24,946     | 4,127 s      | 165 ms         |
| Index Exchange                                                                   | 30,989     | 4,119 s      | 133 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                    | 3,647      | 4,092 s      | 1122 ms        |
| Key CDN                                                                          | 9,021      | 3,970 s      | 440 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                            | 8,434      | 3,889 s      | 461 ms         |
| [Akamai](https://www.akamai.com/)                                                | 9,598      | 3,801 s      | 396 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                         | 45,137     | 3,736 s      | 83 ms          |
| Dynatrace                                                                        | 3,389      | 3,713 s      | 1096 ms        |
| Signyfyd                                                                         | 2,407      | 3,630 s      | 1508 ms        |
| VigLink                                                                          | 6,441      | 3,629 s      | 563 ms         |
| [Disqus](https://disqus.com/)                                                    | 1,770      | 3,555 s      | 2008 ms        |
| [AppNexus](https://www.appnexus.com/)                                            | 150,303    | 3,479 s      | 23 ms          |
| LINE Corporation                                                                 | 24,223     | 3,457 s      | 143 ms         |
| reddit                                                                           | 16,175     | 3,451 s      | 213 ms         |
| Dynamic Yield                                                                    | 1,795      | 3,422 s      | 1907 ms        |
| [AdScore](https://www.adscore.com/)                                              | 4,391      | 3,349 s      | 763 ms         |
| LoyaltyLion                                                                      | 3,994      | 3,109 s      | 778 ms         |
| [WordPress Site Stats](https://wp.com/)                                          | 56,462     | 3,098 s      | 55 ms          |
| [Moat](https://moat.com/)                                                        | 3,508      | 3,097 s      | 883 ms         |
| Affirm                                                                           | 6,276      | 3,063 s      | 488 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                             | 30,608     | 2,998 s      | 98 ms          |
| Datacamp                                                                         | 1,217      | 2,948 s      | 2422 ms        |
| Conversion Labs                                                                  | 1,876      | 2,907 s      | 1550 ms        |
| [AppDynamics](https://www.appdynamics.com/)                                      | 3,374      | 2,871 s      | 851 ms         |
| [Mixpanel](https://mixpanel.com/)                                                | 17,973     | 2,828 s      | 157 ms         |
| GumGum                                                                           | 113,190    | 2,806 s      | 25 ms          |
| Intercept Interactive                                                            | 18,073     | 2,785 s      | 154 ms         |
| [Matomo](https://matomo.org/)                                                    | 13,769     | 2,653 s      | 193 ms         |
| [Outbrain](https://www.outbrain.com/)                                            | 11,336     | 2,618 s      | 231 ms         |
| Unbounce                                                                         | 9,031      | 2,579 s      | 286 ms         |
| [Luigis Box](https://www.luigisbox.com/)                                         | 2,091      | 2,526 s      | 1208 ms        |
| Gigya                                                                            | 2,012      | 2,477 s      | 1231 ms        |
| Sonobi                                                                           | 48,479     | 2,437 s      | 50 ms          |
| sovrn                                                                            | 21,718     | 2,407 s      | 111 ms         |
| Gemius                                                                           | 15,845     | 2,361 s      | 149 ms         |
| WisePops                                                                         | 1,961      | 2,354 s      | 1200 ms        |
| [Yahoo!](https://www.yahoo.com/)                                                 | 20,784     | 2,354 s      | 113 ms         |
| ContentSquare                                                                    | 2,628      | 2,342 s      | 891 ms         |

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
