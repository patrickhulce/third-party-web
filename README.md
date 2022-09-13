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
| 1    | SpotXchange                                                                      | 4,019     | 5 ms           |
| 2    | EQ works                                                                         | 10,684    | 5 ms           |
| 3    | [Bidswitch](https://www.bidswitch.com/)                                          | 33,252    | 5 ms           |
| 4    | AdGear                                                                           | 6,295     | 6 ms           |
| 5    | TripleLift                                                                       | 12,845    | 7 ms           |
| 6    | DeepIntent                                                                       | 37,170    | 8 ms           |
| 7    | [iPROM](https://iprom.eu/)                                                       | 24,065    | 8 ms           |
| 8    | ContextWeb                                                                       | 21,450    | 8 ms           |
| 9    | Sonobi                                                                           | 5,385     | 8 ms           |
| 10   | Beachfront Media                                                                 | 15,666    | 9 ms           |
| 11   | Yieldmo                                                                          | 15,765    | 9 ms           |
| 12   | Onfocus                                                                          | 3,682     | 10 ms          |
| 13   | Sharethrough                                                                     | 20,156    | 10 ms          |
| 14   | [OpenX](https://www.openx.com/)                                                  | 98,335    | 11 ms          |
| 15   | [33 Across](https://33across.com/)                                               | 111,990   | 12 ms          |
| 16   | RTB House AdPilot                                                                | 11,878    | 13 ms          |
| 17   | OneTag                                                                           | 30,313    | 18 ms          |
| 18   | Tribal Fusion                                                                    | 72,355    | 24 ms          |
| 19   | GumGum                                                                           | 133,349   | 26 ms          |
| 20   | Adform                                                                           | 99,030    | 35 ms          |
| 21   | [AppNexus](https://www.appnexus.com/)                                            | 160,132   | 39 ms          |
| 22   | Reklama                                                                          | 4,476     | 41 ms          |
| 23   | Constant Contact                                                                 | 17,214    | 43 ms          |
| 24   | [Audience Rate](https://www.audiencerate.com/)                                   | 5,008     | 55 ms          |
| 25   | MailMunch                                                                        | 14,787    | 56 ms          |
| 26   | SiteScout                                                                        | 9,068     | 61 ms          |
| 27   | DialogTech SourceTrak                                                            | 5,040     | 66 ms          |
| 28   | Simpli.fi                                                                        | 14,756    | 68 ms          |
| 29   | [Media Math](https://www.mediamath.com/)                                         | 8,988     | 74 ms          |
| 30   | [The Trade Desk](https://www.thetradedesk.com/)                                  | 29,112    | 81 ms          |
| 31   | [F@N Communications](https://www.fancs.com/)                                     | 4,861     | 82 ms          |
| 32   | Nend                                                                             | 17,104    | 82 ms          |
| 33   | [Quora Ads](https://www.quora.com/business/)                                     | 5,111     | 82 ms          |
| 34   | Index Exchange                                                                   | 161,427   | 84 ms          |
| 35   | StackAdapt                                                                       | 8,859     | 84 ms          |
| 36   | [Scorecard Research](https://www.scorecardresearch.com/)                         | 9,643     | 86 ms          |
| 37   | Teads                                                                            | 81,569    | 87 ms          |
| 38   | Twitter Online Conversion Tracking                                               | 96,552    | 95 ms          |
| 39   | Affiliate Window                                                                 | 5,329     | 95 ms          |
| 40   | Simplicity Marketing                                                             | 3,104     | 97 ms          |
| 41   | Branch Metrics                                                                   | 14,865    | 103 ms         |
| 42   | BlueCava                                                                         | 7,464     | 110 ms         |
| 43   | Rocket Fuel                                                                      | 3,326     | 121 ms         |
| 44   | Tradelab                                                                         | 4,840     | 132 ms         |
| 45   | DTSCOUT                                                                          | 55,061    | 139 ms         |
| 46   | [ZEOTAP](https://zeotap.com/)                                                    | 3,612     | 142 ms         |
| 47   | [Yahoo!](https://www.yahoo.com/)                                                 | 19,028    | 144 ms         |
| 48   | LinkedIn Ads                                                                     | 16,882    | 151 ms         |
| 49   | OwnerIQ                                                                          | 3,232     | 155 ms         |
| 50   | Gemius                                                                           | 31,242    | 159 ms         |
| 51   | DialogTech                                                                       | 2,833     | 164 ms         |
| 52   | Between Digital                                                                  | 4,123     | 170 ms         |
| 53   | FreakOut                                                                         | 4,117     | 173 ms         |
| 54   | i-mobile                                                                         | 25,220    | 173 ms         |
| 55   | STINGRAY                                                                         | 11,303    | 174 ms         |
| 56   | LINE Corporation                                                                 | 27,037    | 179 ms         |
| 57   | BlueKai                                                                          | 104,983   | 182 ms         |
| 58   | Smart AdServer                                                                   | 17,187    | 189 ms         |
| 59   | AudienceSearch                                                                   | 55,076    | 202 ms         |
| 60   | Unbounce                                                                         | 10,998    | 210 ms         |
| 61   | [Bing Ads](https://bingads.microsoft.com)                                        | 53,883    | 212 ms         |
| 62   | Tynt                                                                             | 160,878   | 212 ms         |
| 63   | [Amazon Ads](https://ad.amazon.com/)                                             | 111,461   | 223 ms         |
| 64   | Salesforce.com                                                                   | 3,976     | 224 ms         |
| 65   | IPONWEB                                                                          | 26,063    | 237 ms         |
| 66   | fluct                                                                            | 27,911    | 262 ms         |
| 67   | sovrn                                                                            | 15,771    | 268 ms         |
| 68   | TrafficStars                                                                     | 8,480     | 282 ms         |
| 69   | [Adroll](https://www.adroll.com/)                                                | 35,911    | 321 ms         |
| 70   | JuicyAds                                                                         | 4,357     | 323 ms         |
| 71   | [Criteo](https://www.criteo.com/)                                                | 204,634   | 336 ms         |
| 72   | [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 44,813    | 339 ms         |
| 73   | [Rubicon Project](https://rubiconproject.com/)                                   | 218,380   | 368 ms         |
| 74   | Geniee                                                                           | 19,801    | 380 ms         |
| 75   | [Supership](https://supership.jp/)                                               | 19,320    | 387 ms         |
| 76   | VigLink                                                                          | 54,877    | 402 ms         |
| 77   | Crowd Control                                                                    | 68,907    | 448 ms         |
| 78   | Skimbit                                                                          | 81,343    | 449 ms         |
| 79   | Refersion                                                                        | 3,593     | 545 ms         |
| 80   | [Mediavine](https://www.mediavine.com/)                                          | 9,166     | 552 ms         |
| 81   | [Outbrain](https://www.outbrain.com/)                                            | 54,262    | 591 ms         |
| 82   | [Yandex Ads](https://yandex.com/adv/)                                            | 28,732    | 688 ms         |
| 83   | Privy                                                                            | 24,159    | 690 ms         |
| 84   | [WordAds](https://wordads.co/)                                                   | 104,998   | 707 ms         |
| 85   | Cxense                                                                           | 5,950     | 734 ms         |
| 86   | [Moat](https://moat.com/)                                                        | 10,334    | 760 ms         |
| 87   | [Taboola](https://www.taboola.com/)                                              | 43,757    | 774 ms         |
| 88   | Klaviyo                                                                          | 108,716   | 831 ms         |
| 89   | LongTail Ad Solutions                                                            | 8,297     | 899 ms         |
| 90   | [Media.net](https://www.media.net/)                                              | 93,135    | 940 ms         |
| 91   | LoyaltyLion                                                                      | 4,688     | 968 ms         |
| 92   | [Attentive](https://attentivemobile.com/)                                        | 8,876     | 1243 ms        |
| 93   | [Pubmatic](https://pubmatic.com/)                                                | 249,252   | 1336 ms        |
| 94   | Infolinks                                                                        | 6,532     | 1585 ms        |
| 95   | [MGID](https://www.mgid.com/)                                                    | 13,141    | 1634 ms        |
| 96   | [Integral Ad Science](https://integralads.com/uk/)                               | 8,018     | 1846 ms        |
| 97   | [Sizmek](https://www.sizmek.com/)                                                | 6,854     | 2104 ms        |
| 98   | [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,645,056 | 2272 ms        |
| 99   | Connatix                                                                         | 6,219     | 2942 ms        |
| 100  | [Bridgewell DSP](https://www.bridgewell.com/)                                    | 22,472    | 4586 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [SpeedCurve LUX](https://speedcurve.com/features/lux/)                       | 3,031     | 64 ms          |
| 2    | [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)       | 2,195     | 65 ms          |
| 3    | Mouseflow                                                                    | 8,298     | 68 ms          |
| 4    | Fastest Forward                                                              | 1,289     | 71 ms          |
| 5    | [WordPress Site Stats](https://wp.com/)                                      | 123,784   | 72 ms          |
| 6    | [Alexa](https://www.alexa.com/)                                              | 5,389     | 75 ms          |
| 7    | Sailthru                                                                     | 6,215     | 86 ms          |
| 8    | [Keen](https://keen.io/)                                                     | 11,015    | 91 ms          |
| 9    | Ekm Systems                                                                  | 1,351     | 93 ms          |
| 10   | Woopra                                                                       | 2,177     | 93 ms          |
| 11   | Polldaddy                                                                    | 2,676     | 98 ms          |
| 12   | StatCounter                                                                  | 61,989    | 103 ms         |
| 13   | Conversant                                                                   | 41,672    | 109 ms         |
| 14   | Movable Ink                                                                  | 1,972     | 109 ms         |
| 15   | [Brandmetrics](https://www.brandmetrics.com)                                 | 1,274     | 110 ms         |
| 16   | [GoSquared](https://www.gosquared.com)                                       | 1,462     | 114 ms         |
| 17   | Treasure Data                                                                | 14,327    | 114 ms         |
| 18   | [Crazy Egg](https://www.crazyegg.com/)                                       | 62,501    | 124 ms         |
| 19   | IBM Acoustic Campaign                                                        | 1,245     | 128 ms         |
| 20   | [Quantcast](https://www.quantcast.com)                                       | 129,106   | 135 ms         |
| 21   | [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)         | 36,558    | 136 ms         |
| 22   | KISSmetrics                                                                  | 1,155     | 138 ms         |
| 23   | Okta                                                                         | 3,261     | 145 ms         |
| 24   | Stamped.io                                                                   | 11,980    | 159 ms         |
| 25   | CleverTap                                                                    | 2,081     | 159 ms         |
| 26   | [DotMetrics](https://www.dotmetrics.net/)                                    | 1,642     | 161 ms         |
| 27   | [Fastly Insights](https://insights.fastlylabs.com)                           | 11,650    | 163 ms         |
| 28   | Amplitude Mobile Analytics                                                   | 18,633    | 168 ms         |
| 29   | Roxr Software                                                                | 19,332    | 169 ms         |
| 30   | [Snowplow](https://snowplowanalytics.com/)                                   | 44,392    | 172 ms         |
| 31   | [Google Analytics](https://marketingplatform.google.com/about/analytics/)    | 7,322,447 | 174 ms         |
| 32   | ResponseTap                                                                  | 1,321     | 175 ms         |
| 33   | [Mixpanel](https://mixpanel.com/)                                            | 23,236    | 178 ms         |
| 34   | [Braze](https://www.braze.com)                                               | 3,810     | 181 ms         |
| 35   | Searchanise                                                                  | 4,409     | 187 ms         |
| 36   | [Smartlook](https://www.smartlook.com/)                                      | 1,568     | 194 ms         |
| 37   | Marchex                                                                      | 12,688    | 214 ms         |
| 38   | Exponea                                                                      | 1,275     | 218 ms         |
| 39   | [Google Optimize](https://marketingplatform.google.com/about/optimize/)      | 76,691    | 226 ms         |
| 40   | CallRail                                                                     | 25,235    | 244 ms         |
| 41   | Smart Insight Tracking                                                       | 2,468     | 259 ms         |
| 42   | Heap                                                                         | 15,403    | 261 ms         |
| 43   | Chartbeat                                                                    | 8,255     | 265 ms         |
| 44   | [Radar](https://www.cedexis.com/radar/)                                      | 1,262     | 266 ms         |
| 45   | [Usabilla](https://usabilla.com)                                             | 1,928     | 281 ms         |
| 46   | Reviews.io                                                                   | 2,141     | 287 ms         |
| 47   | [Matomo](https://matomo.org/)                                                | 4,513     | 292 ms         |
| 48   | Reviews.co.uk                                                                | 2,554     | 313 ms         |
| 49   | [Marketo](https://www.marketo.com)                                           | 3,213     | 313 ms         |
| 50   | Trust Pilot                                                                  | 40,439    | 332 ms         |
| 51   | Kameleoon                                                                    | 1,963     | 345 ms         |
| 52   | etracker                                                                     | 5,478     | 350 ms         |
| 53   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 42,799    | 366 ms         |
| 54   | Evergage                                                                     | 2,478     | 374 ms         |
| 55   | Parse.ly                                                                     | 4,369     | 375 ms         |
| 56   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 28,684    | 424 ms         |
| 57   | Monetate                                                                     | 1,063     | 425 ms         |
| 58   | Qualtrics                                                                    | 7,674     | 482 ms         |
| 59   | [PageSense](https://www.zoho.com/pagesense/)                                 | 4,333     | 502 ms         |
| 60   | Net Reviews                                                                  | 4,504     | 508 ms         |
| 61   | Convert Insights                                                             | 1,390     | 524 ms         |
| 62   | Evidon                                                                       | 3,410     | 554 ms         |
| 63   | [BowNow](https://bow-now.jp/)                                                | 2,265     | 608 ms         |
| 64   | [VWO](https://vwo.com)                                                       | 10,331    | 618 ms         |
| 65   | ForeSee                                                                      | 1,101     | 619 ms         |
| 66   | [Segment](https://segment.com/)                                              | 30,962    | 625 ms         |
| 67   | FullStory                                                                    | 16,930    | 657 ms         |
| 68   | Bazaarvoice                                                                  | 3,113     | 666 ms         |
| 69   | [Optimizely](https://www.optimizely.com/)                                    | 35,910    | 672 ms         |
| 70   | Clerk.io ApS                                                                 | 2,038     | 693 ms         |
| 71   | Nosto                                                                        | 1,555     | 724 ms         |
| 72   | [Pendo](https://www.pendo.io)                                                | 8,741     | 783 ms         |
| 73   | [Snapchat](https://www.snapchat.com)                                         | 42,908    | 785 ms         |
| 74   | [Hotjar](https://www.hotjar.com/)                                            | 369,505   | 829 ms         |
| 75   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 28,534    | 857 ms         |
| 76   | Kampyle                                                                      | 1,067     | 909 ms         |
| 77   | AB Tasty                                                                     | 4,417     | 919 ms         |
| 78   | Survicate                                                                    | 2,793     | 926 ms         |
| 79   | PowerReviews                                                                 | 1,782     | 949 ms         |
| 80   | Feefo.com                                                                    | 2,401     | 992 ms         |
| 81   | Revolver Maps                                                                | 3,809     | 1051 ms        |
| 82   | ContentSquare                                                                | 2,950     | 1059 ms        |
| 83   | [Histats](https://www.histats.com/)                                          | 44,755    | 1209 ms        |
| 84   | TrackJS                                                                      | 1,753     | 1247 ms        |
| 85   | [Quantum Metric](https://www.quantummetric.com/)                             | 1,162     | 1281 ms        |
| 86   | [Lucky Orange](https://www.luckyorange.com/)                                 | 19,568    | 1282 ms        |
| 87   | SessionCam                                                                   | 1,198     | 1314 ms        |
| 88   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 7,488     | 1407 ms        |
| 89   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 604,100   | 1474 ms        |
| 90   | Dynatrace                                                                    | 3,873     | 1492 ms        |
| 91   | Gigya                                                                        | 2,722     | 1546 ms        |
| 92   | Inspectlet                                                                   | 7,429     | 1765 ms        |
| 93   | Ezoic                                                                        | 2,735     | 3222 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                        | Usage     | Average Impact |
| ---- | ------------------------------------------- | --------- | -------------- |
| 1    | [Shareaholic](https://www.shareaholic.com/) | 2,901     | 106 ms         |
| 2    | reddit                                      | 5,148     | 112 ms         |
| 3    | [Pinterest](https://pinterest.com/)         | 212,032   | 121 ms         |
| 4    | [AddToAny](https://www.addtoany.com/)       | 80,743    | 122 ms         |
| 5    | Spot.IM                                     | 1,836     | 227 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)       | 24,898    | 355 ms         |
| 7    | [Facebook](https://www.facebook.com)        | 3,486,665 | 411 ms         |
| 8    | AddShoppers                                 | 3,804     | 484 ms         |
| 9    | [ShareThis](https://www.sharethis.com/)     | 158,618   | 507 ms         |
| 10   | [Twitter](https://twitter.com)              | 484,989   | 550 ms         |
| 11   | [TikTok](https://www.tiktok.com/en/)        | 134,263   | 558 ms         |
| 12   | Kakao                                       | 67,284    | 571 ms         |
| 13   | [Instagram](https://www.instagram.com)      | 11,611    | 1304 ms        |
| 14   | [AddThis](https://www.addthis.com/)         | 181,269   | 1405 ms        |
| 15   | SocialShopWave                              | 4,747     | 1806 ms        |
| 16   | [VK](https://vk.com/)                       | 75,276    | 2140 ms        |
| 17   | [Disqus](https://disqus.com/)               | 1,585     | 2937 ms        |
| 18   | [PIXNET](https://www.pixnet.net/)           | 23,077    | 3470 ms        |
| 19   | [Tumblr](https://tumblr.com/)               | 43,368    | 4456 ms        |
| 20   | LiveJournal                                 | 10,019    | 4805 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage     | Average Impact |
| ---- | -------------------------------------------- | --------- | -------------- |
| 1    | [Twitch](https://twitch.tv/)                 | 1,614     | 67 ms          |
| 2    | [Vimeo](https://vimeo.com/)                  | 137,277   | 1642 ms        |
| 3    | [Brightcove](https://www.brightcove.com/en/) | 22,236    | 1720 ms        |
| 4    | [Wistia](https://wistia.com/)                | 29,029    | 4348 ms        |
| 5    | [YouTube](https://youtube.com)               | 1,227,566 | 5356 ms        |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------------- | --------- | -------------- |
| 1    | Webmarked                                                                 | 1,128     | 63 ms          |
| 2    | Rollbar                                                                   | 4,080     | 83 ms          |
| 3    | Siteimprove                                                               | 14,565    | 94 ms          |
| 4    | AddEvent                                                                  | 1,239     | 96 ms          |
| 5    | Raygun                                                                    | 2,606     | 101 ms         |
| 6    | [Pusher](https://pusher.com/)                                             | 1,508     | 104 ms         |
| 7    | CyberSource (Visa)                                                        | 1,806     | 109 ms         |
| 8    | Key CDN                                                                   | 8,339     | 126 ms         |
| 9    | Bitly                                                                     | 2,306     | 131 ms         |
| 10   | [Ipify](https://www.ipify.org)                                            | 1,923     | 133 ms         |
| 11   | [New Relic](https://newrelic.com/)                                        | 314,174   | 140 ms         |
| 12   | iovation                                                                  | 2,703     | 151 ms         |
| 13   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 284,182   | 152 ms         |
| 14   | Seznam                                                                    | 16,314    | 160 ms         |
| 15   | iubenda                                                                   | 72,326    | 210 ms         |
| 16   | [Netlify](https://www.netlify.com/)                                       | 1,113     | 210 ms         |
| 17   | Highcharts                                                                | 3,087     | 236 ms         |
| 18   | [Foxentry](https://foxentry.cz/)                                          | 1,783     | 237 ms         |
| 19   | GitHub                                                                    | 9,523     | 251 ms         |
| 20   | Klevu Search                                                              | 1,817     | 292 ms         |
| 21   | LightWidget                                                               | 12,897    | 293 ms         |
| 22   | [TrustArc](https://www.trustarc.com/)                                     | 5,430     | 294 ms         |
| 23   | [Accessibe Accessibility Overlay](https://accessibe.com/)                 | 31,841    | 316 ms         |
| 24   | Sift Science                                                              | 1,625     | 333 ms         |
| 25   | Cookie-Script.com                                                         | 13,553    | 354 ms         |
| 26   | Riskified                                                                 | 1,362     | 355 ms         |
| 27   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 2,931,154 | 360 ms         |
| 28   | [Cookiebot](https://www.cookiebot.com/)                                   | 104,544   | 360 ms         |
| 29   | Hexton                                                                    | 39,126    | 361 ms         |
| 30   | [OneSignal](https://onesignal.com/)                                       | 81,717    | 380 ms         |
| 31   | [Auth0](https://auth0.com/)                                               | 4,989     | 407 ms         |
| 32   | Swiftype                                                                  | 1,582     | 417 ms         |
| 33   | [Clarity](https://clarity.microsoft.com/)                                 | 216,230   | 423 ms         |
| 34   | Bold Commerce                                                             | 20,058    | 430 ms         |
| 35   | Wufoo                                                                     | 2,494     | 435 ms         |
| 36   | [Amazon Pay](https://pay.amazon.com)                                      | 5,233     | 457 ms         |
| 37   | Google reCAPTCHA                                                          | 19,512    | 489 ms         |
| 38   | Affirm                                                                    | 6,250     | 492 ms         |
| 39   | Trusted Shops                                                             | 18,241    | 518 ms         |
| 40   | Fastly                                                                    | 41,558    | 580 ms         |
| 41   | [AppDynamics](https://www.appdynamics.com/)                               | 4,298     | 586 ms         |
| 42   | [Sentry](https://sentry.io/)                                              | 54,022    | 606 ms         |
| 43   | GetSiteControl                                                            | 3,840     | 634 ms         |
| 44   | Forter                                                                    | 4,453     | 636 ms         |
| 45   | Bugsnag                                                                   | 10,856    | 650 ms         |
| 46   | [PayPal](https://paypal.com)                                              | 70,083    | 703 ms         |
| 47   | WisePops                                                                  | 3,337     | 849 ms         |
| 48   | Mapbox                                                                    | 19,852    | 880 ms         |
| 49   | [GoDaddy](https://www.godaddy.com/)                                       | 89,821    | 1001 ms        |
| 50   | [Google Maps](https://www.google.com/maps)                                | 1,391,111 | 1019 ms        |
| 51   | MaxCDN Enterprise                                                         | 5,216     | 1098 ms        |
| 52   | [Stripe](https://stripe.com)                                              | 99,992    | 1107 ms        |
| 53   | [Vidyard](https://www.vidyard.com/)                                       | 1,499     | 1115 ms        |
| 54   | ThreatMetrix                                                              | 1,387     | 1137 ms        |
| 55   | [Luigis Box](https://www.luigisbox.com/)                                  | 1,600     | 1299 ms        |
| 56   | Secomapp                                                                  | 5,389     | 1580 ms        |
| 57   | Adyen                                                                     | 1,842     | 2026 ms        |
| 58   | [Yandex APIs](https://yandex.ru/)                                         | 43,559    | 2296 ms        |
| 59   | Rambler                                                                   | 18,847    | 3337 ms        |
| 60   | Esri ArcGIS                                                               | 3,379     | 5283 ms        |
| 61   | [POWr](https://www.powr.io)                                               | 41,931    | 5339 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](https://www.blogger.com/)                                                       | 317,042 | 140 ms         |
| 2    | Civic                                                                                     | 5,254   | 410 ms         |
| 3    | Typepad                                                                                   | 1,448   | 557 ms         |
| 4    | [Dealer](https://www.dealer.com/)                                                         | 1,807   | 635 ms         |
| 5    | [WordPress](https://wp.com/)                                                              | 388,396 | 749 ms         |
| 6    | Rackspace                                                                                 | 2,776   | 871 ms         |
| 7    | Ecwid                                                                                     | 6,747   | 1228 ms        |
| 8    | [Tilda](https://tilda.cc/)                                                                | 53,099  | 1552 ms        |
| 9    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 3,950   | 1963 ms        |
| 10   | [Shopify](https://www.shopify.com/)                                                       | 391,429 | 2625 ms        |
| 11   | [Squarespace](https://www.squarespace.com/)                                               | 189,968 | 3246 ms        |
| 12   | [Hatena Blog](https://hatenablog.com/)                                                    | 48,322  | 3684 ms        |
| 13   | [Weebly](https://www.weebly.com/)                                                         | 68,560  | 3952 ms        |
| 14   | [Webflow](https://webflow.com/)                                                           | 42,220  | 4777 ms        |
| 15   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 5,739   | 4961 ms        |
| 16   | [Wix](https://www.wix.com/)                                                               | 355,758 | 5268 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                             | Usage   | Average Impact |
| ---- | ------------------------------------------------ | ------- | -------------- |
| 1    | [SalesLoft](https://salesloft.com/)              | 1,426   | 56 ms          |
| 2    | [Podsights](https://podsights.com/)              | 2,355   | 74 ms          |
| 3    | Madison Logic                                    | 3,246   | 90 ms          |
| 4    | [SATORI](https://satori.marketing/)              | 1,120   | 102 ms         |
| 5    | DemandBase                                       | 3,772   | 109 ms         |
| 6    | Pardot                                           | 3,292   | 135 ms         |
| 7    | [Convertful](https://convertful.com/)            | 2,035   | 189 ms         |
| 8    | [Wicked Reports](https://www.wickedreports.com/) | 2,076   | 210 ms         |
| 9    | [Albacross](https://albacross.com/)              | 3,135   | 216 ms         |
| 10   | [Beeketing](https://beeketing.com/)              | 3,861   | 241 ms         |
| 11   | Sojern                                           | 3,097   | 263 ms         |
| 12   | [iZooto](https://www.izooto.com)                 | 2,032   | 270 ms         |
| 13   | [RD Station](https://www.rdstation.com/en/)      | 22,672  | 340 ms         |
| 14   | [Listrak](https://www.listrak.com/)              | 1,419   | 447 ms         |
| 15   | [Mailchimp](https://mailchimp.com/)              | 59,523  | 514 ms         |
| 16   | [Hubspot](https://hubspot.com/)                  | 135,071 | 570 ms         |
| 17   | [OptinMonster](https://optinmonster.com/)        | 5,212   | 691 ms         |
| 18   | [Yotpo](https://www.yotpo.com/)                  | 25,807  | 700 ms         |
| 19   | Wishpond Technologies                            | 1,648   | 726 ms         |
| 20   | [Judge.me](https://judge.me/)                    | 35,133  | 729 ms         |
| 21   | [Wunderkind](https://www.wunderkind.co/)         | 2,033   | 1417 ms        |
| 22   | [PureCars](https://www.purecars.com/)            | 3,022   | 1685 ms        |
| 23   | [KARTE](https://karte.io/)                       | 1,735   | 1716 ms        |
| 24   | [Sumo](https://sumo.com/)                        | 19,485  | 2017 ms        |
| 25   | Bigcommerce                                      | 20,090  | 2708 ms        |
| 26   | [Tray Commerce](https://www.tray.com.br/)        | 11,146  | 4042 ms        |
| 27   | [Drift](https://www.drift.com/)                  | 9,870   | 5026 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                                        | Usage   | Average Impact |
| ---- | ----------------------------------------------------------- | ------- | -------------- |
| 1    | Provide Support                                             | 1,284   | 72 ms          |
| 2    | Salesforce Live Agent                                       | 1,839   | 107 ms         |
| 3    | SnapEngage                                                  | 1,834   | 110 ms         |
| 4    | ClickDesk                                                   | 1,396   | 210 ms         |
| 5    | BoldChat                                                    | 1,863   | 211 ms         |
| 6    | Foursixty                                                   | 2,063   | 258 ms         |
| 7    | LiveTex                                                     | 2,873   | 291 ms         |
| 8    | [Tidio Live Chat](https://www.tidiochat.com/en/)            | 42,085  | 336 ms         |
| 9    | WebEngage                                                   | 1,487   | 401 ms         |
| 10   | [Help Scout](https://www.helpscout.net/)                    | 4,854   | 440 ms         |
| 11   | Pure Chat                                                   | 6,929   | 459 ms         |
| 12   | [Tawk.to](https://www.tawk.to/)                             | 131,032 | 464 ms         |
| 13   | iPerceptions                                                | 6,140   | 612 ms         |
| 14   | iAdvize SAS                                                 | 1,094   | 698 ms         |
| 15   | Comm100                                                     | 1,631   | 819 ms         |
| 16   | [LivePerson](https://www.liveperson.com/)                   | 4,772   | 878 ms         |
| 17   | [Intercom](https://www.intercom.com)                        | 27,001  | 1054 ms        |
| 18   | [Jivochat](https://www.jivochat.com/)                       | 81,940  | 1130 ms        |
| 19   | [Smartsupp](https://www.smartsupp.com)                      | 27,875  | 1156 ms        |
| 20   | [LiveChat](https://www.livechat.com/)                       | 44,826  | 1198 ms        |
| 21   | [ContactAtOnce](https://www.contactatonce.com/)             | 1,420   | 1762 ms        |
| 22   | [Olark](https://www.olark.com/)                             | 9,642   | 1801 ms        |
| 23   | [ZenDesk](https://zendesk.com/)                             | 96,844  | 1814 ms        |
| 24   | Dynamic Yield                                               | 2,208   | 2687 ms        |
| 25   | [Freshchat](https://www.freshworks.com/live-chat-software/) | 7,995   | 4097 ms        |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Spotify](https://www.spotify.com/)       | 10,941 | 7 ms           |
| 2    | TripAdvisor                               | 3,136  | 197 ms         |
| 3    | Accuweather                               | 2,125  | 204 ms         |
| 4    | CPEx                                      | 2,493  | 259 ms         |
| 5    | Tencent                                   | 13,067 | 272 ms         |
| 6    | SnapWidget                                | 17,353 | 341 ms         |
| 7    | Flowplayer                                | 1,269  | 381 ms         |
| 8    | Booking.com                               | 3,255  | 492 ms         |
| 9    | OpenTable                                 | 3,648  | 683 ms         |
| 10   | Cloudinary                                | 2,203  | 688 ms         |
| 11   | Covert Pics                               | 3,679  | 1233 ms        |
| 12   | [AMP](https://amp.dev/)                   | 68,143 | 1286 ms        |
| 13   | Embedly                                   | 9,906  | 1561 ms        |
| 14   | issuu                                     | 3,360  | 2374 ms        |
| 15   | [Hotmart](https://www.hotmart.com/)       | 5,064  | 2767 ms        |
| 16   | [SoundCloud](https://www.soundcloud.com/) | 8,057  | 2902 ms        |
| 17   | Dailymotion                               | 5,946  | 10453 ms       |
| 18   | Medium                                    | 11,780 | 10610 ms       |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage     | Average Impact |
| ---- | ------------------------------------------------------------ | --------- | -------------- |
| 1    | Cloud.typography                                             | 1,462     | 0 ms           |
| 2    | [Google Fonts](https://fonts.google.com/)                    | 203,448   | 0 ms           |
| 3    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 79,457    | 37 ms          |
| 4    | [FontAwesome CDN](https://fontawesome.com/)                  | 320,326   | 191 ms         |
| 5    | Monotype                                                     | 9,074     | 240 ms         |
| 6    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 130,232   | 246 ms         |
| 7    | Microsoft Hosted Libs                                        | 32,142    | 283 ms         |
| 8    | [jQuery CDN](https://code.jquery.com/)                       | 693,482   | 453 ms         |
| 9    | [Akamai](https://www.akamai.com/)                            | 17,049    | 487 ms         |
| 10   | [Cloudflare CDN](https://cdnjs.com/)                         | 602,403   | 503 ms         |
| 11   | Fort Awesome                                                 | 2,524     | 585 ms         |
| 12   | Azure Web Services                                           | 47,894    | 624 ms         |
| 13   | [Unpkg](https://unpkg.com)                                   | 118,453   | 628 ms         |
| 14   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 259,351   | 630 ms         |
| 15   | [Google CDN](https://developers.google.com/speed/libraries/) | 3,424,176 | 853 ms         |
| 16   | [Yandex CDN](https://yandex.ru/)                             | 171,735   | 1623 ms        |
| 17   | [CreateJS CDN](https://code.createjs.com/)                   | 4,690     | 4445 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [BrightTag / Signal](https://www.signal.co)                                   | 6,089     | 229 ms         |
| 2    | [Yahoo! Tag Manager](https://marketing.yahoo.co.jp/service/tagmanager/)       | 14,177    | 241 ms         |
| 3    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 165,645   | 367 ms         |
| 4    | TagCommander                                                                  | 1,814     | 370 ms         |
| 5    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 6,108,115 | 378 ms         |
| 6    | [Tealium](https://tealium.com/)                                               | 29,692    | 691 ms         |
| 7    | [Ensighten](https://www.ensighten.com/)                                       | 5,478     | 1002 ms        |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                              | Usage  | Average Impact |
| ---- | ------------------------------------------------- | ------ | -------------- |
| 1    | [Trustcommander](https://www.commandersact.com)   | 1,729  | 247 ms         |
| 2    | [Quantcast Choice](https://quantcast.com)         | 29,453 | 388 ms         |
| 3    | [Optanon](https://www.cookielaw.org/)             | 92,076 | 494 ms         |
| 4    | [Consent Manager CMP](https://consentmanager.net) | 4,723  | 553 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | Browser-Update.org                                                  | 2,012   | 74 ms          |
| 2    | Azure Traffic Manager                                               | 1,233   | 76 ms          |
| 3    | ResponsiveVoice                                                     | 5,610   | 96 ms          |
| 4    | [ReadSpeaker](https://www.readspeaker.com)                          | 6,152   | 108 ms         |
| 5    | Arbor                                                               | 1,137   | 176 ms         |
| 6    | Skype                                                               | 2,422   | 290 ms         |
| 7    | [Parking Crew](https://parkingcrew.net/)                            | 14,135  | 359 ms         |
| 8    | Pagely                                                              | 1,024   | 395 ms         |
| 9    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 2,392   | 446 ms         |
| 10   | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 124,586 | 594 ms         |
| 11   | Calendly                                                            | 5,728   | 1176 ms        |
| 12   | Polyfill service                                                    | 3,790   | 1808 ms        |
| 13   | Heroku                                                              | 20,362  | 2949 ms        |
| 14   | uLogin                                                              | 2,326   | 3267 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [YouTube](https://youtube.com)                                                            | 1,227,566  | 6,574,466 s  | 5356 ms        |
| [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/)          | 1,645,056  | 3,737,242 s  | 2272 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 3,424,176  | 2,921,062 s  | 853 ms         |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 6,108,115  | 2,308,159 s  | 378 ms         |
| [Wix](https://www.wix.com/)                                                               | 355,758    | 1,874,236 s  | 5268 ms        |
| [Facebook](https://www.facebook.com)                                                      | 3,486,665  | 1,431,828 s  | 411 ms         |
| [Google Maps](https://www.google.com/maps)                                                | 1,391,111  | 1,417,812 s  | 1019 ms        |
| [Google Analytics](https://marketingplatform.google.com/about/analytics/)                 | 7,322,447  | 1,276,611 s  | 174 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 2,931,154  | 1,055,113 s  | 360 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 391,429    | 1,027,457 s  | 2625 ms        |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 604,100    | 890,510 s    | 1474 ms        |
| [Squarespace](https://www.squarespace.com/)                                               | 189,968    | 616,544 s    | 3246 ms        |
| [Pubmatic](https://pubmatic.com/)                                                         | 249,252    | 332,941 s    | 1336 ms        |
| [jQuery CDN](https://code.jquery.com/)                                                    | 693,482    | 313,945 s    | 453 ms         |
| [Hotjar](https://www.hotjar.com/)                                                         | 369,505    | 306,408 s    | 829 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 602,403    | 302,758 s    | 503 ms         |
| [WordPress](https://wp.com/)                                                              | 388,396    | 290,844 s    | 749 ms         |
| [Yandex CDN](https://yandex.ru/)                                                          | 171,735    | 278,795 s    | 1623 ms        |
| [Weebly](https://www.weebly.com/)                                                         | 68,560     | 270,983 s    | 3952 ms        |
| [Twitter](https://twitter.com)                                                            | 484,989    | 266,936 s    | 550 ms         |
| [AddThis](https://www.addthis.com/)                                                       | 181,269    | 254,712 s    | 1405 ms        |
| [Vimeo](https://vimeo.com/)                                                               | 137,277    | 225,363 s    | 1642 ms        |
| [POWr](https://www.powr.io)                                                               | 41,931     | 223,857 s    | 5339 ms        |
| [Webflow](https://webflow.com/)                                                           | 42,220     | 201,706 s    | 4777 ms        |
| [Tumblr](https://tumblr.com/)                                                             | 43,368     | 193,246 s    | 4456 ms        |
| [Hatena Blog](https://hatenablog.com/)                                                    | 48,322     | 178,001 s    | 3684 ms        |
| [ZenDesk](https://zendesk.com/)                                                           | 96,844     | 175,649 s    | 1814 ms        |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 259,351    | 163,521 s    | 630 ms         |
| [VK](https://vk.com/)                                                                     | 75,276     | 161,094 s    | 2140 ms        |
| [Wistia](https://wistia.com/)                                                             | 29,029     | 126,230 s    | 4348 ms        |
| Medium                                                                                    | 11,780     | 124,991 s    | 10610 ms       |
| [Stripe](https://stripe.com)                                                              | 99,992     | 110,644 s    | 1107 ms        |
| [Bridgewell DSP](https://www.bridgewell.com/)                                             | 22,472     | 103,053 s    | 4586 ms        |
| [Yandex APIs](https://yandex.ru/)                                                         | 43,559     | 100,009 s    | 2296 ms        |
| [Jivochat](https://www.jivochat.com/)                                                     | 81,940     | 92,586 s     | 1130 ms        |
| [Clarity](https://clarity.microsoft.com/)                                                 | 216,230    | 91,369 s     | 423 ms         |
| Klaviyo                                                                                   | 108,716    | 90,310 s     | 831 ms         |
| [GoDaddy](https://www.godaddy.com/)                                                       | 89,821     | 89,918 s     | 1001 ms        |
| [AMP](https://amp.dev/)                                                                   | 68,143     | 87,649 s     | 1286 ms        |
| [Media.net](https://www.media.net/)                                                       | 93,135     | 87,575 s     | 940 ms         |
| [Tilda](https://tilda.cc/)                                                                | 53,099     | 82,400 s     | 1552 ms        |
| [ShareThis](https://www.sharethis.com/)                                                   | 158,618    | 80,413 s     | 507 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                            | 218,380    | 80,256 s     | 368 ms         |
| [PIXNET](https://www.pixnet.net/)                                                         | 23,077     | 80,073 s     | 3470 ms        |
| [Hubspot](https://hubspot.com/)                                                           | 135,071    | 76,951 s     | 570 ms         |
| [TikTok](https://www.tiktok.com/en/)                                                      | 134,263    | 74,888 s     | 558 ms         |
| [Unpkg](https://unpkg.com)                                                                | 118,453    | 74,371 s     | 628 ms         |
| [WordAds](https://wordads.co/)                                                            | 104,998    | 74,191 s     | 707 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 124,586    | 73,945 s     | 594 ms         |
| [Criteo](https://www.criteo.com/)                                                         | 204,634    | 68,726 s     | 336 ms         |
| Rambler                                                                                   | 18,847     | 62,897 s     | 3337 ms        |
| Dailymotion                                                                               | 5,946      | 62,153 s     | 10453 ms       |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 320,326    | 61,147 s     | 191 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 165,645    | 60,783 s     | 367 ms         |
| [Tawk.to](https://www.tawk.to/)                                                           | 131,032    | 60,750 s     | 464 ms         |
| Heroku                                                                                    | 20,362     | 60,049 s     | 2949 ms        |
| Bigcommerce                                                                               | 20,090     | 54,402 s     | 2708 ms        |
| [Histats](https://www.histats.com/)                                                       | 44,755     | 54,105 s     | 1209 ms        |
| [LiveChat](https://www.livechat.com/)                                                     | 44,826     | 53,719 s     | 1198 ms        |
| [Drift](https://www.drift.com/)                                                           | 9,870      | 49,602 s     | 5026 ms        |
| [PayPal](https://paypal.com)                                                              | 70,083     | 49,259 s     | 703 ms         |
| LiveJournal                                                                               | 10,019     | 48,141 s     | 4805 ms        |
| [Optanon](https://www.cookielaw.org/)                                                     | 92,076     | 45,450 s     | 494 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                                 | 11,146     | 45,055 s     | 4042 ms        |
| [Blogger](https://www.blogger.com/)                                                       | 317,042    | 44,491 s     | 140 ms         |
| [New Relic](https://newrelic.com/)                                                        | 314,174    | 43,947 s     | 140 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 284,182    | 43,090 s     | 152 ms         |
| [Sumo](https://sumo.com/)                                                                 | 19,485     | 39,308 s     | 2017 ms        |
| Kakao                                                                                     | 67,284     | 38,426 s     | 571 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                              | 22,236     | 38,244 s     | 1720 ms        |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 104,544    | 37,673 s     | 360 ms         |
| Skimbit                                                                                   | 81,343     | 36,540 s     | 449 ms         |
| Tynt                                                                                      | 160,878    | 34,097 s     | 212 ms         |
| [Taboola](https://www.taboola.com/)                                                       | 43,757     | 33,880 s     | 774 ms         |
| [Snapchat](https://www.snapchat.com)                                                      | 42,908     | 33,692 s     | 785 ms         |
| [Sentry](https://sentry.io/)                                                              | 54,022     | 32,757 s     | 606 ms         |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                               | 7,995      | 32,757 s     | 4097 ms        |
| [Smartsupp](https://www.smartsupp.com)                                                    | 27,875     | 32,210 s     | 1156 ms        |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 130,232    | 32,068 s     | 246 ms         |
| [Outbrain](https://www.outbrain.com/)                                                     | 54,262     | 32,058 s     | 591 ms         |
| [OneSignal](https://onesignal.com/)                                                       | 81,717     | 31,055 s     | 380 ms         |
| Crowd Control                                                                             | 68,907     | 30,854 s     | 448 ms         |
| [Mailchimp](https://mailchimp.com/)                                                       | 59,523     | 30,613 s     | 514 ms         |
| Azure Web Services                                                                        | 47,894     | 29,898 s     | 624 ms         |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 5,739      | 28,474 s     | 4961 ms        |
| [Intercom](https://www.intercom.com)                                                      | 27,001     | 28,462 s     | 1054 ms        |
| [Judge.me](https://judge.me/)                                                             | 35,133     | 25,599 s     | 729 ms         |
| [Pinterest](https://pinterest.com/)                                                       | 212,032    | 25,585 s     | 121 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 19,568     | 25,094 s     | 1282 ms        |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 111,461    | 24,860 s     | 223 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 28,534     | 24,441 s     | 857 ms         |
| [Optimizely](https://www.optimizely.com/)                                                 | 35,910     | 24,129 s     | 672 ms         |
| Fastly                                                                                    | 41,558     | 24,102 s     | 580 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 8,057      | 23,382 s     | 2902 ms        |
| VigLink                                                                                   | 54,877     | 22,056 s     | 402 ms         |
| [MGID](https://www.mgid.com/)                                                             | 13,141     | 21,476 s     | 1634 ms        |
| [CreateJS CDN](https://code.createjs.com/)                                                | 4,690      | 20,846 s     | 4445 ms        |
| [Tealium](https://tealium.com/)                                                           | 29,692     | 20,505 s     | 691 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 28,732     | 19,781 s     | 688 ms         |
| [Segment](https://segment.com/)                                                           | 30,962     | 19,348 s     | 625 ms         |
| BlueKai                                                                                   | 104,983    | 19,073 s     | 182 ms         |
| Connatix                                                                                  | 6,219      | 18,294 s     | 2942 ms        |
| [Yotpo](https://www.yotpo.com/)                                                           | 25,807     | 18,074 s     | 700 ms         |
| Esri ArcGIS                                                                               | 3,379      | 17,852 s     | 5283 ms        |
| Mapbox                                                                                    | 19,852     | 17,474 s     | 880 ms         |
| [Quantcast](https://www.quantcast.com)                                                    | 129,106    | 17,469 s     | 135 ms         |
| [Olark](https://www.olark.com/)                                                           | 9,642      | 17,367 s     | 1801 ms        |
| [Google Optimize](https://marketingplatform.google.com/about/optimize/)                   | 76,691     | 17,364 s     | 226 ms         |
| Privy                                                                                     | 24,159     | 16,677 s     | 690 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 42,799     | 15,676 s     | 366 ms         |
| Embedly                                                                                   | 9,906      | 15,462 s     | 1561 ms        |
| [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)                       | 44,813     | 15,191 s     | 339 ms         |
| iubenda                                                                                   | 72,326     | 15,185 s     | 210 ms         |
| [Instagram](https://www.instagram.com)                                                    | 11,611     | 15,143 s     | 1304 ms        |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 8,018      | 14,804 s     | 1846 ms        |
| [Sizmek](https://www.sizmek.com/)                                                         | 6,854      | 14,420 s     | 2104 ms        |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 42,085     | 14,137 s     | 336 ms         |
| Hexton                                                                                    | 39,126     | 14,124 s     | 361 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 5,064      | 14,012 s     | 2767 ms        |
| Index Exchange                                                                            | 161,427    | 13,482 s     | 84 ms          |
| Trust Pilot                                                                               | 40,439     | 13,428 s     | 332 ms         |
| Inspectlet                                                                                | 7,429      | 13,113 s     | 1765 ms        |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 28,684     | 12,159 s     | 424 ms         |
| [Adroll](https://www.adroll.com/)                                                         | 35,911     | 11,518 s     | 321 ms         |
| [Quantcast Choice](https://quantcast.com)                                                 | 29,453     | 11,419 s     | 388 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 53,883     | 11,414 s     | 212 ms         |
| FullStory                                                                                 | 16,930     | 11,129 s     | 657 ms         |
| AudienceSearch                                                                            | 55,076     | 11,117 s     | 202 ms         |
| [Attentive](https://attentivemobile.com/)                                                 | 8,876      | 11,031 s     | 1243 ms        |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)                        | 7,488      | 10,535 s     | 1407 ms        |
| [Seedtag](https://www.seedtag.com/)                                                       | 1,856      | 10,459 s     | 5635 ms        |
| Infolinks                                                                                 | 6,532      | 10,354 s     | 1585 ms        |
| [Accessibe Accessibility Overlay](https://accessibe.com/)                                 | 31,841     | 10,076 s     | 316 ms         |
| [AddToAny](https://www.addtoany.com/)                                                     | 80,743     | 9,871 s      | 122 ms         |
| Google reCAPTCHA                                                                          | 19,512     | 9,550 s      | 489 ms         |
| Trusted Shops                                                                             | 18,241     | 9,451 s      | 518 ms         |
| Twitter Online Conversion Tracking                                                        | 96,552     | 9,181 s      | 95 ms          |
| Microsoft Hosted Libs                                                                     | 32,142     | 9,104 s      | 283 ms         |
| [WordPress Site Stats](https://wp.com/)                                                   | 123,784    | 8,922 s      | 72 ms          |
| [LinkedIn](https://www.linkedin.com/)                                                     | 24,898     | 8,835 s      | 355 ms         |
| Ezoic                                                                                     | 2,735      | 8,812 s      | 3222 ms        |
| Bold Commerce                                                                             | 20,058     | 8,629 s      | 430 ms         |
| SocialShopWave                                                                            | 4,747      | 8,572 s      | 1806 ms        |
| Secomapp                                                                                  | 5,389      | 8,512 s      | 1580 ms        |
| [Akamai](https://www.akamai.com/)                                                         | 17,049     | 8,305 s      | 487 ms         |
| Ecwid                                                                                     | 6,747      | 8,286 s      | 1228 ms        |
| issuu                                                                                     | 3,360      | 7,976 s      | 2374 ms        |
| [Moat](https://moat.com/)                                                                 | 10,334     | 7,858 s      | 760 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 62,501     | 7,772 s      | 124 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 3,950      | 7,753 s      | 1963 ms        |
| [RD Station](https://www.rdstation.com/en/)                                               | 22,672     | 7,701 s      | 340 ms         |
| DTSCOUT                                                                                   | 55,061     | 7,669 s      | 139 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                                | 44,392     | 7,624 s      | 172 ms         |
| uLogin                                                                                    | 2,326      | 7,599 s      | 3267 ms        |
| Geniee                                                                                    | 19,801     | 7,534 s      | 380 ms         |
| [Supership](https://supership.jp/)                                                        | 19,320     | 7,482 s      | 387 ms         |
| LongTail Ad Solutions                                                                     | 8,297      | 7,459 s      | 899 ms         |
| fluct                                                                                     | 27,911     | 7,305 s      | 262 ms         |
| Teads                                                                                     | 81,569     | 7,094 s      | 87 ms          |
| Bugsnag                                                                                   | 10,856     | 7,057 s      | 650 ms         |
| Polyfill service                                                                          | 3,790      | 6,853 s      | 1808 ms        |
| [Pendo](https://www.pendo.io)                                                             | 8,741      | 6,847 s      | 783 ms         |
| Calendly                                                                                  | 5,728      | 6,737 s      | 1176 ms        |
| [Afterpay](https://www.afterpay.com/)                                                     | 20,206     | 6,441 s      | 319 ms         |
| [VWO](https://vwo.com)                                                                    | 10,331     | 6,384 s      | 618 ms         |
| StatCounter                                                                               | 61,989     | 6,384 s      | 103 ms         |
| IPONWEB                                                                                   | 26,063     | 6,176 s      | 237 ms         |
| [AppNexus](https://www.appnexus.com/)                                                     | 160,132    | 6,176 s      | 39 ms          |
| CallRail                                                                                  | 25,235     | 6,149 s      | 244 ms         |
| Dynamic Yield                                                                             | 2,208      | 5,933 s      | 2687 ms        |
| SnapWidget                                                                                | 17,353     | 5,920 s      | 341 ms         |
| Dynatrace                                                                                 | 3,873      | 5,778 s      | 1492 ms        |
| MaxCDN Enterprise                                                                         | 5,216      | 5,727 s      | 1098 ms        |
| [Ensighten](https://www.ensighten.com/)                                                   | 5,478      | 5,487 s      | 1002 ms        |
| [PureCars](https://www.purecars.com/)                                                     | 3,022      | 5,093 s      | 1685 ms        |
| [Parking Crew](https://parkingcrew.net/)                                                  | 14,135     | 5,080 s      | 359 ms         |
| [Mediavine](https://www.mediavine.com/)                                                   | 9,166      | 5,060 s      | 552 ms         |
| [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)                      | 36,558     | 4,970 s      | 136 ms         |
| Gemius                                                                                    | 31,242     | 4,960 s      | 159 ms         |
| LINE Corporation                                                                          | 27,037     | 4,828 s      | 179 ms         |
| Cookie-Script.com                                                                         | 13,553     | 4,794 s      | 354 ms         |
| [Disqus](https://disqus.com/)                                                             | 1,585      | 4,656 s      | 2937 ms        |
| LoyaltyLion                                                                               | 4,688      | 4,539 s      | 968 ms         |
| Covert Pics                                                                               | 3,679      | 4,535 s      | 1233 ms        |
| Conversant                                                                                | 41,672     | 4,522 s      | 109 ms         |
| i-mobile                                                                                  | 25,220     | 4,369 s      | 173 ms         |
| Cxense                                                                                    | 5,950      | 4,365 s      | 734 ms         |
| sovrn                                                                                     | 15,771     | 4,224 s      | 268 ms         |
| Gigya                                                                                     | 2,722      | 4,209 s      | 1546 ms        |
| [LivePerson](https://www.liveperson.com/)                                                 | 4,772      | 4,188 s      | 878 ms         |
| [Mixpanel](https://mixpanel.com/)                                                         | 23,236     | 4,127 s      | 178 ms         |
| AB Tasty                                                                                  | 4,417      | 4,057 s      | 919 ms         |
| Heap                                                                                      | 15,403     | 4,017 s      | 261 ms         |
| Revolver Maps                                                                             | 3,809      | 4,003 s      | 1051 ms        |
| [fam](http://admin.fam-ad.com/report/)                                                    | 1,152      | 3,888 s      | 3375 ms        |
| LightWidget                                                                               | 12,897     | 3,785 s      | 293 ms         |
| iPerceptions                                                                              | 6,140      | 3,755 s      | 612 ms         |
| Adyen                                                                                     | 1,842      | 3,732 s      | 2026 ms        |
| Qualtrics                                                                                 | 7,674      | 3,702 s      | 482 ms         |
| [OptinMonster](https://optinmonster.com/)                                                 | 5,212      | 3,600 s      | 691 ms         |

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
