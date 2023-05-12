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
| 1    | Tapad                                                                            | 12,636    | 5 ms           |
| 2    | [Bidswitch](https://www.bidswitch.com/)                                          | 77,534    | 5 ms           |
| 3    | EQ works                                                                         | 24,776    | 5 ms           |
| 4    | AdGear                                                                           | 28,832    | 5 ms           |
| 5    | Sonobi                                                                           | 105,377   | 5 ms           |
| 6    | TripleLift                                                                       | 115,519   | 5 ms           |
| 7    | Unruly Media                                                                     | 10,955    | 6 ms           |
| 8    | Crimtan                                                                          | 96,585    | 6 ms           |
| 9    | adKernel                                                                         | 40,746    | 6 ms           |
| 10   | DeepIntent                                                                       | 73,341    | 7 ms           |
| 11   | [iPROM](https://iprom.eu/)                                                       | 83,515    | 7 ms           |
| 12   | [33 Across](https://33across.com/)                                               | 132,626   | 8 ms           |
| 13   | Sharethrough                                                                     | 35,867    | 9 ms           |
| 14   | Beachfront Media                                                                 | 22,212    | 9 ms           |
| 15   | ContextWeb                                                                       | 41,772    | 9 ms           |
| 16   | ucfunnel ucX                                                                     | 9,958     | 9 ms           |
| 17   | Yieldmo                                                                          | 46,302    | 10 ms          |
| 18   | Tribal Fusion                                                                    | 173,400   | 11 ms          |
| 19   | [OpenX](https://www.openx.com/)                                                  | 215,967   | 12 ms          |
| 20   | Delta Projects AB                                                                | 17,117    | 15 ms          |
| 21   | OneTag                                                                           | 141,217   | 25 ms          |
| 22   | Teads                                                                            | 83,835    | 30 ms          |
| 23   | RTB House AdPilot                                                                | 15,343    | 32 ms          |
| 24   | Onfocus                                                                          | 13,630    | 32 ms          |
| 25   | LoopMe                                                                           | 61,818    | 42 ms          |
| 26   | Constant Contact                                                                 | 18,609    | 49 ms          |
| 27   | [AppNexus](https://www.appnexus.com/)                                            | 192,000   | 56 ms          |
| 28   | Adform                                                                           | 51,641    | 66 ms          |
| 29   | Index Exchange                                                                   | 193,085   | 79 ms          |
| 30   | GumGum                                                                           | 147,038   | 88 ms          |
| 31   | Simpli.fi                                                                        | 20,301    | 89 ms          |
| 32   | LinkedIn Ads                                                                     | 189,262   | 89 ms          |
| 33   | SiteScout                                                                        | 11,380    | 92 ms          |
| 34   | STINGRAY                                                                         | 22,073    | 93 ms          |
| 35   | MailMunch                                                                        | 26,938    | 94 ms          |
| 36   | [Scorecard Research](https://www.scorecardresearch.com/)                         | 39,311    | 96 ms          |
| 37   | [Media Math](https://www.mediamath.com/)                                         | 12,324    | 98 ms          |
| 38   | Reklama                                                                          | 5,764     | 98 ms          |
| 39   | StackAdapt                                                                       | 11,682    | 103 ms         |
| 40   | [ID5 Identity Cloud](https://id5.io/)                                            | 78,299    | 105 ms         |
| 41   | ActiveCampaign                                                                   | 32,289    | 109 ms         |
| 42   | [F@N Communications](https://www.fancs.com/)                                     | 5,567     | 109 ms         |
| 43   | Twitter Online Conversion Tracking                                               | 107,645   | 112 ms         |
| 44   | Affiliate Window                                                                 | 7,054     | 114 ms         |
| 45   | [The Trade Desk](https://www.thetradedesk.com/)                                  | 41,175    | 114 ms         |
| 46   | sovrn                                                                            | 74,072    | 122 ms         |
| 47   | Branch Metrics                                                                   | 17,919    | 124 ms         |
| 48   | BlueCava                                                                         | 7,375     | 142 ms         |
| 49   | [Yahoo!](https://www.yahoo.com/)                                                 | 26,268    | 145 ms         |
| 50   | [Outbrain](https://www.outbrain.com/)                                            | 66,714    | 151 ms         |
| 51   | Eyeota                                                                           | 25,443    | 157 ms         |
| 52   | [Amazon Ads](https://ad.amazon.com/)                                             | 295,346   | 173 ms         |
| 53   | Gemius                                                                           | 34,117    | 194 ms         |
| 54   | DTSCOUT                                                                          | 52,864    | 199 ms         |
| 55   | BlueKai                                                                          | 99,102    | 201 ms         |
| 56   | LINE Corporation                                                                 | 30,410    | 202 ms         |
| 57   | OwnerIQ                                                                          | 13,961    | 213 ms         |
| 58   | AudienceSearch                                                                   | 63,098    | 214 ms         |
| 59   | Simplicity Marketing                                                             | 9,187     | 225 ms         |
| 60   | [Bing Ads](https://bingads.microsoft.com)                                        | 60,072    | 230 ms         |
| 61   | Smart AdServer                                                                   | 69,072    | 251 ms         |
| 62   | Unbounce                                                                         | 10,185    | 252 ms         |
| 63   | Between Digital                                                                  | 6,284     | 259 ms         |
| 64   | [Quora Ads](https://www.quora.com/business/)                                     | 6,400     | 285 ms         |
| 65   | fluct                                                                            | 27,604    | 294 ms         |
| 66   | [Criteo](https://www.criteo.com/)                                                | 253,709   | 323 ms         |
| 67   | Tynt                                                                             | 172,762   | 324 ms         |
| 68   | Technorati                                                                       | 89,172    | 347 ms         |
| 69   | i-mobile                                                                         | 15,890    | 368 ms         |
| 70   | IPONWEB                                                                          | 33,059    | 377 ms         |
| 71   | Geniee                                                                           | 23,506    | 379 ms         |
| 72   | [Adroll](https://www.adroll.com/)                                                | 35,751    | 385 ms         |
| 73   | VigLink                                                                          | 50,677    | 403 ms         |
| 74   | Crowd Control                                                                    | 91,065    | 423 ms         |
| 75   | Skimbit                                                                          | 95,914    | 453 ms         |
| 76   | [Rubicon Project](https://rubiconproject.com/)                                   | 278,207   | 471 ms         |
| 77   | [Supership](https://supership.jp/)                                               | 20,178    | 531 ms         |
| 78   | [Yandex Ads](https://yandex.com/adv/)                                            | 17,572    | 626 ms         |
| 79   | [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 78,117    | 629 ms         |
| 80   | Infolinks                                                                        | 55,394    | 663 ms         |
| 81   | Klaviyo                                                                          | 123,185   | 669 ms         |
| 82   | TrafficStars                                                                     | 12,308    | 698 ms         |
| 83   | [Moat](https://moat.com/)                                                        | 15,290    | 715 ms         |
| 84   | Privy                                                                            | 24,457    | 718 ms         |
| 85   | [Integral Ad Science](https://integralads.com/uk/)                               | 25,510    | 725 ms         |
| 86   | [AdScore](https://www.adscore.com/)                                              | 5,798     | 761 ms         |
| 87   | [Taboola](https://www.taboola.com/)                                              | 47,105    | 802 ms         |
| 88   | LongTail Ad Solutions                                                            | 8,471     | 975 ms         |
| 89   | OptiMonk                                                                         | 10,355    | 1063 ms        |
| 90   | Cxense                                                                           | 5,410     | 1137 ms        |
| 91   | [Attentive](https://attentivemobile.com/)                                        | 9,725     | 1142 ms        |
| 92   | [Media.net](https://www.media.net/)                                              | 126,029   | 1286 ms        |
| 93   | [Pubmatic](https://pubmatic.com/)                                                | 309,062   | 1633 ms        |
| 94   | [WordAds](https://wordads.co/)                                                   | 105,042   | 1792 ms        |
| 95   | [MGID](https://www.mgid.com/)                                                    | 10,762    | 2259 ms        |
| 96   | [Sizmek](https://www.sizmek.com/)                                                | 6,979     | 2370 ms        |
| 97   | [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,696,595 | 2417 ms        |
| 98   | Connatix                                                                         | 12,943    | 3858 ms        |
| 99   | [Mediavine](https://www.mediavine.com/)                                          | 9,994     | 4061 ms        |
| 100  | [Bridgewell DSP](https://www.bridgewell.com/)                                    | 22,900    | 4329 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)       | 3,799     | 60 ms          |
| 2    | [SpeedCurve LUX](https://speedcurve.com/features/lux/)                       | 2,501     | 65 ms          |
| 3    | [WordPress Site Stats](https://wp.com/)                                      | 250,050   | 67 ms          |
| 4    | [Alexa](https://www.alexa.com/)                                              | 4,749     | 70 ms          |
| 5    | Fastest Forward                                                              | 3,067     | 75 ms          |
| 6    | Sailthru                                                                     | 6,674     | 82 ms          |
| 7    | Ekm Systems                                                                  | 1,625     | 84 ms          |
| 8    | Roxr Software                                                                | 18,081    | 105 ms         |
| 9    | Woopra                                                                       | 2,215     | 106 ms         |
| 10   | [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)         | 14,613    | 114 ms         |
| 11   | [Smartlook](https://www.smartlook.com/)                                      | 2,888     | 117 ms         |
| 12   | Movable Ink                                                                  | 1,713     | 123 ms         |
| 13   | Conversant                                                                   | 56,953    | 124 ms         |
| 14   | Polldaddy                                                                    | 4,510     | 128 ms         |
| 15   | StatCounter                                                                  | 62,405    | 131 ms         |
| 16   | [XiTi](https://www.atinternet.com/en/)                                       | 3,040     | 133 ms         |
| 17   | [GoSquared](https://www.gosquared.com)                                       | 1,498     | 134 ms         |
| 18   | Treasure Data                                                                | 16,424    | 141 ms         |
| 19   | Site24x7 Real User Monitoring                                                | 1,000     | 141 ms         |
| 20   | [Quantcast](https://www.quantcast.com)                                       | 135,222   | 147 ms         |
| 21   | [Brandmetrics](https://www.brandmetrics.com)                                 | 2,492     | 147 ms         |
| 22   | Okta                                                                         | 3,556     | 163 ms         |
| 23   | UpSellit                                                                     | 1,107     | 179 ms         |
| 24   | Stamped.io                                                                   | 13,390    | 180 ms         |
| 25   | [Fastly Insights](https://insights.fastlylabs.com)                           | 11,868    | 182 ms         |
| 26   | [Braze](https://www.braze.com)                                               | 4,646     | 183 ms         |
| 27   | [DotMetrics](https://www.dotmetrics.net/)                                    | 1,095     | 190 ms         |
| 28   | Searchanise                                                                  | 2,106     | 199 ms         |
| 29   | [Google Analytics](https://marketingplatform.google.com/about/analytics/)    | 7,354,488 | 204 ms         |
| 30   | [Mixpanel](https://mixpanel.com/)                                            | 23,834    | 208 ms         |
| 31   | CleverTap                                                                    | 1,411     | 211 ms         |
| 32   | Amplitude Mobile Analytics                                                   | 20,663    | 211 ms         |
| 33   | Marchex                                                                      | 12,237    | 230 ms         |
| 34   | [Snowplow](https://snowplowanalytics.com/)                                   | 52,580    | 231 ms         |
| 35   | [Marketo](https://www.marketo.com)                                           | 4,936     | 233 ms         |
| 36   | Qualtrics                                                                    | 8,261     | 261 ms         |
| 37   | [Google Optimize](https://marketingplatform.google.com/about/optimize/)      | 109,605   | 283 ms         |
| 38   | Chartbeat                                                                    | 8,441     | 298 ms         |
| 39   | Smart Insight Tracking                                                       | 2,364     | 301 ms         |
| 40   | [Matomo](https://matomo.org/)                                                | 7,783     | 304 ms         |
| 41   | Kameleoon                                                                    | 2,080     | 314 ms         |
| 42   | CallRail                                                                     | 30,191    | 319 ms         |
| 43   | [Radar](https://www.cedexis.com/radar/)                                      | 1,205     | 326 ms         |
| 44   | Reviews.co.uk                                                                | 2,343     | 335 ms         |
| 45   | Trust Pilot                                                                  | 46,920    | 338 ms         |
| 46   | etracker                                                                     | 5,735     | 343 ms         |
| 47   | Heap                                                                         | 17,746    | 351 ms         |
| 48   | [Usabilla](https://usabilla.com)                                             | 4,917     | 377 ms         |
| 49   | Reviews.io                                                                   | 3,203     | 380 ms         |
| 50   | Evergage                                                                     | 3,244     | 436 ms         |
| 51   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 30,311    | 442 ms         |
| 52   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 30,704    | 448 ms         |
| 53   | [Snapchat](https://www.snapchat.com)                                         | 53,440    | 451 ms         |
| 54   | [Crazy Egg](https://www.crazyegg.com/)                                       | 54,354    | 477 ms         |
| 55   | Exponea                                                                      | 1,300     | 480 ms         |
| 56   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 41,199    | 484 ms         |
| 57   | [Pendo](https://www.pendo.io)                                                | 13,739    | 493 ms         |
| 58   | Parse.ly                                                                     | 10,444    | 523 ms         |
| 59   | Net Reviews                                                                  | 4,403     | 540 ms         |
| 60   | [Segment](https://segment.com/)                                              | 34,916    | 556 ms         |
| 61   | [PageSense](https://www.zoho.com/pagesense/)                                 | 4,861     | 610 ms         |
| 62   | Convert Insights                                                             | 1,326     | 646 ms         |
| 63   | [BowNow](https://bow-now.jp/)                                                | 2,480     | 651 ms         |
| 64   | Bazaarvoice                                                                  | 3,306     | 691 ms         |
| 65   | [VWO](https://vwo.com)                                                       | 9,654     | 718 ms         |
| 66   | [Optimizely](https://www.optimizely.com/)                                    | 38,211    | 745 ms         |
| 67   | Evidon                                                                       | 3,955     | 805 ms         |
| 68   | FullStory                                                                    | 19,055    | 816 ms         |
| 69   | Feefo.com                                                                    | 2,467     | 838 ms         |
| 70   | Nosto                                                                        | 1,475     | 889 ms         |
| 71   | Clerk.io ApS                                                                 | 2,191     | 918 ms         |
| 72   | PowerReviews                                                                 | 1,712     | 988 ms         |
| 73   | Kampyle                                                                      | 1,182     | 1013 ms        |
| 74   | AB Tasty                                                                     | 2,349     | 1036 ms        |
| 75   | ContentSquare                                                                | 2,921     | 1049 ms        |
| 76   | Revolver Maps                                                                | 4,529     | 1057 ms        |
| 77   | Mouseflow                                                                    | 9,147     | 1086 ms        |
| 78   | [Hotjar](https://www.hotjar.com/)                                            | 388,625   | 1128 ms        |
| 79   | [Lucky Orange](https://www.luckyorange.com/)                                 | 22,963    | 1171 ms        |
| 80   | Survicate                                                                    | 4,316     | 1215 ms        |
| 81   | [Histats](https://www.histats.com/)                                          | 40,738    | 1271 ms        |
| 82   | TrackJS                                                                      | 2,872     | 1313 ms        |
| 83   | [Quantum Metric](https://www.quantummetric.com/)                             | 1,370     | 1391 ms        |
| 84   | Dynatrace                                                                    | 1,297     | 1397 ms        |
| 85   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 2,633     | 1447 ms        |
| 86   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 678,046   | 1779 ms        |
| 87   | Gigya                                                                        | 2,704     | 1899 ms        |
| 88   | Inspectlet                                                                   | 7,027     | 1923 ms        |
| 89   | Ezoic                                                                        | 3,721     | 4215 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                        | Usage     | Average Impact |
| ---- | ------------------------------------------- | --------- | -------------- |
| 1    | reddit                                      | 10,118    | 91 ms          |
| 2    | [Shareaholic](https://www.shareaholic.com/) | 9,329     | 111 ms         |
| 3    | [AddToAny](https://www.addtoany.com/)       | 136,021   | 130 ms         |
| 4    | [Pinterest](https://pinterest.com/)         | 242,284   | 197 ms         |
| 5    | Spot.IM                                     | 4,196     | 213 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)       | 26,875    | 380 ms         |
| 7    | [Facebook](https://www.facebook.com)        | 3,615,665 | 538 ms         |
| 8    | AddShoppers                                 | 2,511     | 572 ms         |
| 9    | Kakao                                       | 76,443    | 628 ms         |
| 10   | [ShareThis](https://www.sharethis.com/)     | 145,513   | 747 ms         |
| 11   | [TikTok](https://www.tiktok.com/en/)        | 183,382   | 1005 ms        |
| 12   | [AddThis](https://www.addthis.com/)         | 170,871   | 1697 ms        |
| 13   | SocialShopWave                              | 4,778     | 1882 ms        |
| 14   | [Instagram](https://www.instagram.com)      | 14,742    | 2092 ms        |
| 15   | [VK](https://vk.com/)                       | 83,670    | 2266 ms        |
| 16   | [Disqus](https://disqus.com/)               | 1,751     | 2951 ms        |
| 17   | [PIXNET](https://www.pixnet.net/)           | 22,999    | 3641 ms        |
| 18   | [Twitter](https://twitter.com)              | 474,202   | 4262 ms        |
| 19   | [Tumblr](https://tumblr.com/)               | 31,246    | 5477 ms        |
| 20   | LiveJournal                                 | 12,919    | 6195 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage     | Average Impact |
| ---- | -------------------------------------------- | --------- | -------------- |
| 1    | [AdMan Media](https://admanmedia.com/)       | 1,264     | 10 ms          |
| 2    | [Brightcove](https://www.brightcove.com/en/) | 25,103    | 1565 ms        |
| 3    | [Vimeo](https://vimeo.com/)                  | 155,149   | 3223 ms        |
| 4    | [Wistia](https://wistia.com/)                | 32,761    | 4198 ms        |
| 5    | [Twitch](https://twitch.tv/)                 | 1,700     | 5029 ms        |
| 6    | [YouTube](https://youtube.com)               | 1,300,884 | 5670 ms        |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------------- | --------- | -------------- |
| 1    | Rollbar                                                                   | 5,014     | 64 ms          |
| 2    | Webmarked                                                                 | 1,259     | 74 ms          |
| 3    | [Checkout.com](https://www.checkout.com)                                  | 1,047     | 80 ms          |
| 4    | PrintFriendly                                                             | 1,203     | 83 ms          |
| 5    | Raygun                                                                    | 4,080     | 89 ms          |
| 6    | CyberSource (Visa)                                                        | 2,271     | 96 ms          |
| 7    | AddEvent                                                                  | 1,948     | 101 ms         |
| 8    | [Pusher](https://pusher.com/)                                             | 2,077     | 103 ms         |
| 9    | Siteimprove                                                               | 14,471    | 108 ms         |
| 10   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 261,995   | 152 ms         |
| 11   | Braintree Payments                                                        | 1,136     | 166 ms         |
| 12   | iovation                                                                  | 2,419     | 176 ms         |
| 13   | [Accessibe Accessibility Overlay](https://accessibe.com/)                 | 43,816    | 185 ms         |
| 14   | Key CDN                                                                   | 7,552     | 186 ms         |
| 15   | [Ipify](https://www.ipify.org)                                            | 2,710     | 192 ms         |
| 16   | Bitly                                                                     | 3,065     | 205 ms         |
| 17   | Seznam                                                                    | 12,956    | 221 ms         |
| 18   | Highcharts                                                                | 3,309     | 227 ms         |
| 19   | [New Relic](https://newrelic.com/)                                        | 275,206   | 264 ms         |
| 20   | GitHub                                                                    | 10,929    | 282 ms         |
| 21   | [Netlify](https://www.netlify.com/)                                       | 1,342     | 285 ms         |
| 22   | Riskified                                                                 | 1,989     | 319 ms         |
| 23   | LightWidget                                                               | 13,037    | 331 ms         |
| 24   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 3,654,894 | 334 ms         |
| 25   | [Amazon Pay](https://pay.amazon.com)                                      | 6,494     | 348 ms         |
| 26   | [Foxentry](https://foxentry.cz/)                                          | 2,025     | 349 ms         |
| 27   | Sift Science                                                              | 1,630     | 351 ms         |
| 28   | Klevu Search                                                              | 1,813     | 427 ms         |
| 29   | [Clarity](https://clarity.microsoft.com/)                                 | 199,675   | 430 ms         |
| 30   | [OneSignal](https://onesignal.com/)                                       | 79,504    | 436 ms         |
| 31   | Cookie-Script.com                                                         | 18,827    | 440 ms         |
| 32   | iubenda                                                                   | 88,539    | 446 ms         |
| 33   | Swiftype                                                                  | 1,427     | 451 ms         |
| 34   | Bold Commerce                                                             | 17,769    | 454 ms         |
| 35   | [TrustArc](https://www.trustarc.com/)                                     | 6,724     | 486 ms         |
| 36   | Affirm                                                                    | 6,758     | 537 ms         |
| 37   | Trusted Shops                                                             | 18,598    | 538 ms         |
| 38   | Hexton                                                                    | 40,690    | 556 ms         |
| 39   | ThreatMetrix                                                              | 3,878     | 556 ms         |
| 40   | Google reCAPTCHA                                                          | 28,814    | 565 ms         |
| 41   | Wufoo                                                                     | 2,770     | 572 ms         |
| 42   | Bugsnag                                                                   | 11,619    | 633 ms         |
| 43   | GetSiteControl                                                            | 3,601     | 694 ms         |
| 44   | [Sentry](https://sentry.io/)                                              | 63,554    | 735 ms         |
| 45   | [Yandex APIs](https://yandex.ru/)                                         | 55,547    | 771 ms         |
| 46   | WisePops                                                                  | 3,280     | 857 ms         |
| 47   | Forter                                                                    | 5,093     | 950 ms         |
| 48   | [Auth0](https://auth0.com/)                                               | 1,884     | 970 ms         |
| 49   | [Google Maps](https://www.google.com/maps)                                | 1,408,194 | 975 ms         |
| 50   | Mapbox                                                                    | 19,625    | 991 ms         |
| 51   | [Vidyard](https://www.vidyard.com/)                                       | 1,729     | 1057 ms        |
| 52   | [AppDynamics](https://www.appdynamics.com/)                               | 4,187     | 1059 ms        |
| 53   | [GoDaddy](https://www.godaddy.com/)                                       | 108,110   | 1228 ms        |
| 54   | [Cookiebot](https://www.cookiebot.com/)                                   | 125,568   | 1292 ms        |
| 55   | Secomapp                                                                  | 3,976     | 1339 ms        |
| 56   | [PayPal](https://paypal.com)                                              | 69,556    | 1348 ms        |
| 57   | Signyfyd                                                                  | 1,857     | 1524 ms        |
| 58   | [Luigis Box](https://www.luigisbox.com/)                                  | 1,789     | 1564 ms        |
| 59   | [Stripe](https://stripe.com)                                              | 116,149   | 1631 ms        |
| 60   | Adyen                                                                     | 2,073     | 2491 ms        |
| 61   | Fastly                                                                    | 9,510     | 2703 ms        |
| 62   | [POWr](https://www.powr.io)                                               | 44,682    | 5336 ms        |
| 63   | Esri ArcGIS                                                               | 4,071     | 5653 ms        |
| 64   | Rambler                                                                   | 23,957    | 5680 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](https://www.blogger.com/)                                                       | 353,571 | 157 ms         |
| 2    | Civic                                                                                     | 6,235   | 426 ms         |
| 3    | Typepad                                                                                   | 1,593   | 621 ms         |
| 4    | [Dealer](https://www.dealer.com/)                                                         | 2,026   | 673 ms         |
| 5    | [WordPress](https://wp.com/)                                                              | 439,506 | 793 ms         |
| 6    | Yottaa                                                                                    | 1,062   | 967 ms         |
| 7    | Rackspace                                                                                 | 2,809   | 1117 ms        |
| 8    | Ecwid                                                                                     | 6,754   | 1260 ms        |
| 9    | [Tilda](https://tilda.cc/)                                                                | 69,491  | 1572 ms        |
| 10   | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 4,302   | 1627 ms        |
| 11   | [Shopify](https://www.shopify.com/)                                                       | 473,611 | 3232 ms        |
| 12   | [Hatena Blog](https://hatenablog.com/)                                                    | 50,895  | 3966 ms        |
| 13   | [Squarespace](https://www.squarespace.com/)                                               | 225,045 | 4250 ms        |
| 14   | [Webflow](https://webflow.com/)                                                           | 54,914  | 4705 ms        |
| 15   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 5,957   | 4748 ms        |
| 16   | [Wix](https://www.wix.com/)                                                               | 416,155 | 4939 ms        |
| 17   | [Weebly](https://www.weebly.com/)                                                         | 77,216  | 5310 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                             | Usage   | Average Impact |
| ---- | ------------------------------------------------ | ------- | -------------- |
| 1    | [Zync](https://zetaglobal.com/)                  | 1,396   | 16 ms          |
| 2    | Kargo                                            | 20,376  | 25 ms          |
| 3    | NEORY Marketing Cloud                            | 1,179   | 50 ms          |
| 4    | [SalesLoft](https://salesloft.com/)              | 2,008   | 64 ms          |
| 5    | Madison Logic                                    | 12,270  | 79 ms          |
| 6    | [Podsights](https://podsights.com/)              | 2,333   | 83 ms          |
| 7    | [Albacross](https://albacross.com/)              | 2,706   | 83 ms          |
| 8    | Pardot                                           | 4,158   | 113 ms         |
| 9    | DemandBase                                       | 3,172   | 124 ms         |
| 10   | [SATORI](https://satori.marketing/)              | 1,098   | 156 ms         |
| 11   | [Wicked Reports](https://www.wickedreports.com/) | 2,578   | 218 ms         |
| 12   | [Convertful](https://convertful.com/)            | 2,195   | 234 ms         |
| 13   | Sojern                                           | 4,598   | 367 ms         |
| 14   | [RD Station](https://www.rdstation.com/en/)      | 24,872  | 428 ms         |
| 15   | [Listrak](https://www.listrak.com/)              | 1,310   | 590 ms         |
| 16   | [Mailchimp](https://mailchimp.com/)              | 61,368  | 648 ms         |
| 17   | [OptinMonster](https://optinmonster.com/)        | 4,166   | 667 ms         |
| 18   | [Yotpo](https://www.yotpo.com/)                  | 28,110  | 751 ms         |
| 19   | [Hubspot](https://hubspot.com/)                  | 152,331 | 795 ms         |
| 20   | Wishpond Technologies                            | 1,808   | 796 ms         |
| 21   | [iZooto](https://www.izooto.com)                 | 2,033   | 969 ms         |
| 22   | [Judge.me](https://judge.me/)                    | 36,631  | 1112 ms        |
| 23   | [Beeketing](https://beeketing.com/)              | 3,590   | 1565 ms        |
| 24   | [Wunderkind](https://www.wunderkind.co/)         | 1,937   | 1596 ms        |
| 25   | [KARTE](https://karte.io/)                       | 1,716   | 1615 ms        |
| 26   | [PureCars](https://www.purecars.com/)            | 2,464   | 1788 ms        |
| 27   | [Sumo](https://sumo.com/)                        | 17,982  | 2007 ms        |
| 28   | Bigcommerce                                      | 22,100  | 2828 ms        |
| 29   | [Drift](https://www.drift.com/)                  | 9,192   | 5219 ms        |
| 30   | [Tray Commerce](https://www.tray.com.br/)        | 12,754  | 5250 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                                        | Usage   | Average Impact |
| ---- | ----------------------------------------------------------- | ------- | -------------- |
| 1    | Provide Support                                             | 1,591   | 86 ms          |
| 2    | [Crisp](https://crisp.chat/)                                | 1,894   | 116 ms         |
| 3    | Salesforce Live Agent                                       | 1,339   | 133 ms         |
| 4    | SnapEngage                                                  | 1,578   | 162 ms         |
| 5    | ClickDesk                                                   | 1,178   | 211 ms         |
| 6    | LiveTex                                                     | 2,570   | 240 ms         |
| 7    | BoldChat                                                    | 1,580   | 254 ms         |
| 8    | Foursixty                                                   | 1,974   | 266 ms         |
| 9    | Pure Chat                                                   | 5,132   | 421 ms         |
| 10   | [Help Scout](https://www.helpscout.net/)                    | 5,156   | 474 ms         |
| 11   | WebEngage                                                   | 1,770   | 525 ms         |
| 12   | iPerceptions                                                | 5,705   | 687 ms         |
| 13   | Comm100                                                     | 1,151   | 853 ms         |
| 14   | [Jivochat](https://www.jivochat.com/)                       | 82,226  | 1024 ms        |
| 15   | [LivePerson](https://www.liveperson.com/)                   | 4,611   | 1041 ms        |
| 16   | [Smartsupp](https://www.smartsupp.com)                      | 28,543  | 1215 ms        |
| 17   | [Intercom](https://www.intercom.com)                        | 32,604  | 1253 ms        |
| 18   | [Tawk.to](https://www.tawk.to/)                             | 133,508 | 1331 ms        |
| 19   | [LiveChat](https://www.livechat.com/)                       | 48,233  | 1503 ms        |
| 20   | [Tidio Live Chat](https://www.tidiochat.com/en/)            | 35,664  | 1550 ms        |
| 21   | [Olark](https://www.olark.com/)                             | 9,005   | 1962 ms        |
| 22   | [ZenDesk](https://zendesk.com/)                             | 96,167  | 2052 ms        |
| 23   | Dynamic Yield                                               | 2,369   | 2715 ms        |
| 24   | [Freshchat](https://www.freshworks.com/live-chat-software/) | 8,774   | 3931 ms        |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | [Spotify](https://www.spotify.com/)       | 12,053 | 9 ms           |
| 2    | TripAdvisor                               | 5,806  | 156 ms         |
| 3    | Accuweather                               | 2,150  | 227 ms         |
| 4    | Tencent                                   | 13,956 | 254 ms         |
| 5    | SnapWidget                                | 17,318 | 257 ms         |
| 6    | Flowplayer                                | 1,184  | 284 ms         |
| 7    | CPEx                                      | 2,623  | 325 ms         |
| 8    | OpenTable                                 | 4,694  | 546 ms         |
| 9    | Booking.com                               | 3,517  | 555 ms         |
| 10   | Cloudinary                                | 2,883  | 569 ms         |
| 11   | Revcontent                                | 1,487  | 1039 ms        |
| 12   | Covert Pics                               | 3,269  | 1460 ms        |
| 13   | [AMP](https://amp.dev/)                   | 48,306 | 1479 ms        |
| 14   | Embedly                                   | 11,957 | 1499 ms        |
| 15   | Kaltura Video Platform                    | 1,159  | 2196 ms        |
| 16   | issuu                                     | 3,420  | 2398 ms        |
| 17   | [Hotmart](https://www.hotmart.com/)       | 6,593  | 2841 ms        |
| 18   | [SoundCloud](https://www.soundcloud.com/) | 8,176  | 2842 ms        |
| 19   | Dailymotion                               | 4,861  | 7911 ms        |
| 20   | Medium                                    | 14,238 | 11534 ms       |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage     | Average Impact |
| ---- | ------------------------------------------------------------ | --------- | -------------- |
| 1    | Cloud.typography                                             | 1,856     | 0 ms           |
| 2    | [Google Fonts](https://fonts.google.com/)                    | 401,345   | 0 ms           |
| 3    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 100,484   | 46 ms          |
| 4    | [FontAwesome CDN](https://fontawesome.com/)                  | 365,810   | 204 ms         |
| 5    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 185,891   | 267 ms         |
| 6    | Monotype                                                     | 5,700     | 288 ms         |
| 7    | [jQuery CDN](https://code.jquery.com/)                       | 753,144   | 475 ms         |
| 8    | [Akamai](https://www.akamai.com/)                            | 16,257    | 505 ms         |
| 9    | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 453,827   | 515 ms         |
| 10   | [Cloudflare CDN](https://cdnjs.com/)                         | 687,571   | 528 ms         |
| 11   | Fort Awesome                                                 | 2,939     | 591 ms         |
| 12   | Bootstrap Chinese network                                    | 1,204     | 604 ms         |
| 13   | Azure Web Services                                           | 55,970    | 647 ms         |
| 14   | [Unpkg](https://unpkg.com)                                   | 138,570   | 893 ms         |
| 15   | [Google CDN](https://developers.google.com/speed/libraries/) | 3,514,217 | 1163 ms        |
| 16   | [Yandex CDN](https://yandex.ru/)                             | 207,860   | 1950 ms        |
| 17   | Microsoft Hosted Libs                                        | 33,934    | 2340 ms        |
| 18   | [CreateJS CDN](https://code.createjs.com/)                   | 5,426     | 4148 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [BrightTag / Signal](https://www.signal.co)                                   | 5,238     | 290 ms         |
| 2    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 231,853   | 306 ms         |
| 3    | [Yahoo! Tag Manager](https://marketing.yahoo.co.jp/service/tagmanager/)       | 13,368    | 346 ms         |
| 4    | TagCommander                                                                  | 1,922     | 424 ms         |
| 5    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 7,142,617 | 584 ms         |
| 6    | [Ensighten](https://www.ensighten.com/)                                       | 5,173     | 838 ms         |
| 7    | [Tealium](https://tealium.com/)                                               | 29,596    | 971 ms         |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                              | Usage   | Average Impact |
| ---- | ------------------------------------------------- | ------- | -------------- |
| 1    | [Trustcommander](https://www.commandersact.com)   | 3,172   | 210 ms         |
| 2    | [Quantcast Choice](https://quantcast.com)         | 28,649  | 406 ms         |
| 3    | [Optanon](https://www.cookielaw.org/)             | 114,546 | 615 ms         |
| 4    | [Consent Manager CMP](https://consentmanager.net) | 3,749   | 980 ms         |
| 5    | [Usercentrics CMP](https://usercentrics.com)      | 49,319  | 1965 ms        |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | Browser-Update.org                                                  | 2,899   | 76 ms          |
| 2    | [ReadSpeaker](https://www.readspeaker.com)                          | 6,735   | 119 ms         |
| 3    | ResponsiveVoice                                                     | 6,490   | 153 ms         |
| 4    | Arbor                                                               | 1,180   | 177 ms         |
| 5    | Skype                                                               | 2,262   | 215 ms         |
| 6    | Polyfill service                                                    | 2,098   | 253 ms         |
| 7    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 2,437   | 506 ms         |
| 8    | Sirv                                                                | 1,060   | 537 ms         |
| 9    | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 133,777 | 616 ms         |
| 10   | Calendly                                                            | 7,789   | 1388 ms        |
| 11   | Heroku                                                              | 21,607  | 1759 ms        |
| 12   | uLogin                                                              | 1,807   | 3188 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [YouTube](https://youtube.com)                                                            | 1,300,884  | 7,375,711 s  | 5670 ms        |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 7,142,617  | 4,168,635 s  | 584 ms         |
| [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/)          | 1,696,595  | 4,100,765 s  | 2417 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 3,514,217  | 4,087,129 s  | 1163 ms        |
| [Wix](https://www.wix.com/)                                                               | 416,155    | 2,055,559 s  | 4939 ms        |
| [Twitter](https://twitter.com)                                                            | 474,202    | 2,021,092 s  | 4262 ms        |
| [Facebook](https://www.facebook.com)                                                      | 3,615,665  | 1,944,373 s  | 538 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 473,611    | 1,530,614 s  | 3232 ms        |
| [Google Analytics](https://marketingplatform.google.com/about/analytics/)                 | 7,354,488  | 1,501,819 s  | 204 ms         |
| [Google Maps](https://www.google.com/maps)                                                | 1,408,194  | 1,372,305 s  | 975 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 3,654,894  | 1,221,839 s  | 334 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 678,046    | 1,206,168 s  | 1779 ms        |
| [Squarespace](https://www.squarespace.com/)                                               | 225,045    | 956,369 s    | 4250 ms        |
| [Pubmatic](https://pubmatic.com/)                                                         | 309,062    | 504,653 s    | 1633 ms        |
| [Vimeo](https://vimeo.com/)                                                               | 155,149    | 500,039 s    | 3223 ms        |
| [Hotjar](https://www.hotjar.com/)                                                         | 388,625    | 438,255 s    | 1128 ms        |
| [Weebly](https://www.weebly.com/)                                                         | 77,216     | 410,032 s    | 5310 ms        |
| [Yandex CDN](https://yandex.ru/)                                                          | 207,860    | 405,383 s    | 1950 ms        |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 687,571    | 363,267 s    | 528 ms         |
| [jQuery CDN](https://code.jquery.com/)                                                    | 753,144    | 357,816 s    | 475 ms         |
| [WordPress](https://wp.com/)                                                              | 439,506    | 348,683 s    | 793 ms         |
| [AddThis](https://www.addthis.com/)                                                       | 170,871    | 289,947 s    | 1697 ms        |
| [Webflow](https://webflow.com/)                                                           | 54,914     | 258,374 s    | 4705 ms        |
| [POWr](https://www.powr.io)                                                               | 44,682     | 238,406 s    | 5336 ms        |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 453,827    | 233,595 s    | 515 ms         |
| [Hatena Blog](https://hatenablog.com/)                                                    | 50,895     | 201,838 s    | 3966 ms        |
| [ZenDesk](https://zendesk.com/)                                                           | 96,167     | 197,305 s    | 2052 ms        |
| [VK](https://vk.com/)                                                                     | 83,670     | 189,624 s    | 2266 ms        |
| [Stripe](https://stripe.com)                                                              | 116,149    | 189,426 s    | 1631 ms        |
| [WordAds](https://wordads.co/)                                                            | 105,042    | 188,281 s    | 1792 ms        |
| [TikTok](https://www.tiktok.com/en/)                                                      | 183,382    | 184,325 s    | 1005 ms        |
| [Tawk.to](https://www.tawk.to/)                                                           | 133,508    | 177,651 s    | 1331 ms        |
| [Tumblr](https://tumblr.com/)                                                             | 31,246     | 171,137 s    | 5477 ms        |
| Medium                                                                                    | 14,238     | 164,218 s    | 11534 ms       |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 125,568    | 162,245 s    | 1292 ms        |
| [Media.net](https://www.media.net/)                                                       | 126,029    | 162,062 s    | 1286 ms        |
| [Wistia](https://wistia.com/)                                                             | 32,761     | 137,540 s    | 4198 ms        |
| Rambler                                                                                   | 23,957     | 136,083 s    | 5680 ms        |
| [GoDaddy](https://www.godaddy.com/)                                                       | 108,110    | 132,733 s    | 1228 ms        |
| [Rubicon Project](https://rubiconproject.com/)                                            | 278,207    | 131,103 s    | 471 ms         |
| [Unpkg](https://unpkg.com)                                                                | 138,570    | 123,718 s    | 893 ms         |
| [Hubspot](https://hubspot.com/)                                                           | 152,331    | 121,088 s    | 795 ms         |
| [Tilda](https://tilda.cc/)                                                                | 69,491     | 109,220 s    | 1572 ms        |
| [ShareThis](https://www.sharethis.com/)                                                   | 145,513    | 108,626 s    | 747 ms         |
| [Bridgewell DSP](https://www.bridgewell.com/)                                             | 22,900     | 99,126 s     | 4329 ms        |
| [Usercentrics CMP](https://usercentrics.com)                                              | 49,319     | 96,920 s     | 1965 ms        |
| [PayPal](https://paypal.com)                                                              | 69,556     | 93,743 s     | 1348 ms        |
| [Clarity](https://clarity.microsoft.com/)                                                 | 199,675    | 85,917 s     | 430 ms         |
| [Jivochat](https://www.jivochat.com/)                                                     | 82,226     | 84,189 s     | 1024 ms        |
| [PIXNET](https://www.pixnet.net/)                                                         | 22,999     | 83,729 s     | 3641 ms        |
| Klaviyo                                                                                   | 123,185    | 82,397 s     | 669 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 133,777    | 82,341 s     | 616 ms         |
| [Criteo](https://www.criteo.com/)                                                         | 253,709    | 81,982 s     | 323 ms         |
| LiveJournal                                                                               | 12,919     | 80,027 s     | 6195 ms        |
| Microsoft Hosted Libs                                                                     | 33,934     | 79,421 s     | 2340 ms        |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 365,810    | 74,512 s     | 204 ms         |
| [New Relic](https://newrelic.com/)                                                        | 275,206    | 72,635 s     | 264 ms         |
| [LiveChat](https://www.livechat.com/)                                                     | 48,233     | 72,477 s     | 1503 ms        |
| [AMP](https://amp.dev/)                                                                   | 48,306     | 71,469 s     | 1479 ms        |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 231,853    | 71,024 s     | 306 ms         |
| [Optanon](https://www.cookielaw.org/)                                                     | 114,546    | 70,445 s     | 615 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                                 | 12,754     | 66,954 s     | 5250 ms        |
| Bigcommerce                                                                               | 22,100     | 62,488 s     | 2828 ms        |
| Tynt                                                                                      | 172,762    | 56,038 s     | 324 ms         |
| [Blogger](https://www.blogger.com/)                                                       | 353,571    | 55,578 s     | 157 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 35,664     | 55,288 s     | 1550 ms        |
| [Histats](https://www.histats.com/)                                                       | 40,738     | 51,763 s     | 1271 ms        |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 295,346    | 51,175 s     | 173 ms         |
| Connatix                                                                                  | 12,943     | 49,929 s     | 3858 ms        |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 185,891    | 49,693 s     | 267 ms         |
| [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)                       | 78,117     | 49,129 s     | 629 ms         |
| Kakao                                                                                     | 76,443     | 47,988 s     | 628 ms         |
| [Drift](https://www.drift.com/)                                                           | 9,192      | 47,972 s     | 5219 ms        |
| [Pinterest](https://pinterest.com/)                                                       | 242,284    | 47,729 s     | 197 ms         |
| [Sentry](https://sentry.io/)                                                              | 63,554     | 46,700 s     | 735 ms         |
| Skimbit                                                                                   | 95,914     | 43,466 s     | 453 ms         |
| [Yandex APIs](https://yandex.ru/)                                                         | 55,547     | 42,848 s     | 771 ms         |
| [Intercom](https://www.intercom.com)                                                      | 32,604     | 40,849 s     | 1253 ms        |
| [Judge.me](https://judge.me/)                                                             | 36,631     | 40,738 s     | 1112 ms        |
| [Mediavine](https://www.mediavine.com/)                                                   | 9,994      | 40,591 s     | 4061 ms        |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 261,995    | 39,758 s     | 152 ms         |
| [Mailchimp](https://mailchimp.com/)                                                       | 61,368     | 39,753 s     | 648 ms         |
| iubenda                                                                                   | 88,539     | 39,517 s     | 446 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                              | 25,103     | 39,283 s     | 1565 ms        |
| Crowd Control                                                                             | 91,065     | 38,503 s     | 423 ms         |
| Dailymotion                                                                               | 4,861      | 38,453 s     | 7911 ms        |
| Heroku                                                                                    | 21,607     | 38,015 s     | 1759 ms        |
| [Taboola](https://www.taboola.com/)                                                       | 47,105     | 37,765 s     | 802 ms         |
| Infolinks                                                                                 | 55,394     | 36,720 s     | 663 ms         |
| Azure Web Services                                                                        | 55,970     | 36,198 s     | 647 ms         |
| [Sumo](https://sumo.com/)                                                                 | 17,982     | 36,096 s     | 2007 ms        |
| [Smartsupp](https://www.smartsupp.com)                                                    | 28,543     | 34,687 s     | 1215 ms        |
| [OneSignal](https://onesignal.com/)                                                       | 79,504     | 34,638 s     | 436 ms         |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                               | 8,774      | 34,489 s     | 3931 ms        |
| [Google Optimize](https://marketingplatform.google.com/about/optimize/)                   | 109,605    | 31,072 s     | 283 ms         |
| Technorati                                                                                | 89,172     | 30,946 s     | 347 ms         |
| [Instagram](https://www.instagram.com)                                                    | 14,742     | 30,844 s     | 2092 ms        |
| [Tealium](https://tealium.com/)                                                           | 29,596     | 28,723 s     | 971 ms         |
| [Optimizely](https://www.optimizely.com/)                                                 | 38,211     | 28,484 s     | 745 ms         |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 5,957      | 28,286 s     | 4748 ms        |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 22,963     | 26,896 s     | 1171 ms        |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 54,354     | 25,900 s     | 477 ms         |
| Fastly                                                                                    | 9,510      | 25,704 s     | 2703 ms        |
| [MGID](https://www.mgid.com/)                                                             | 10,762     | 24,314 s     | 2259 ms        |
| [Snapchat](https://www.snapchat.com)                                                      | 53,440     | 24,100 s     | 451 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 8,176      | 23,239 s     | 2842 ms        |
| Esri ArcGIS                                                                               | 4,071      | 23,015 s     | 5653 ms        |
| Hexton                                                                                    | 40,690     | 22,608 s     | 556 ms         |
| [CreateJS CDN](https://code.createjs.com/)                                                | 5,426      | 22,505 s     | 4148 ms        |
| [Yotpo](https://www.yotpo.com/)                                                           | 28,110     | 21,099 s     | 751 ms         |
| VigLink                                                                                   | 50,677     | 20,430 s     | 403 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 41,199     | 19,939 s     | 484 ms         |
| BlueKai                                                                                   | 99,102     | 19,881 s     | 201 ms         |
| [Quantcast](https://www.quantcast.com)                                                    | 135,222    | 19,832 s     | 147 ms         |
| Yahoo! Ad Exchange                                                                        | 4,809      | 19,685 s     | 4093 ms        |
| Mapbox                                                                                    | 19,625     | 19,440 s     | 991 ms         |
| [Segment](https://segment.com/)                                                           | 34,916     | 19,426 s     | 556 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 6,593      | 18,730 s     | 2841 ms        |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 25,510     | 18,494 s     | 725 ms         |
| Embedly                                                                                   | 11,957     | 17,922 s     | 1499 ms        |
| [AddToAny](https://www.addtoany.com/)                                                     | 136,021    | 17,691 s     | 130 ms         |
| [Olark](https://www.olark.com/)                                                           | 9,005      | 17,669 s     | 1962 ms        |
| Privy                                                                                     | 24,457     | 17,566 s     | 718 ms         |
| Smart AdServer                                                                            | 69,072     | 17,356 s     | 251 ms         |
| LinkedIn Ads                                                                              | 189,262    | 16,869 s     | 89 ms          |
| [WordPress Site Stats](https://wp.com/)                                                   | 250,050    | 16,686 s     | 67 ms          |
| [Sizmek](https://www.sizmek.com/)                                                         | 6,979      | 16,542 s     | 2370 ms        |
| Google reCAPTCHA                                                                          | 28,814     | 16,280 s     | 565 ms         |
| Trust Pilot                                                                               | 46,920     | 15,841 s     | 338 ms         |
| Ezoic                                                                                     | 3,721      | 15,684 s     | 4215 ms        |
| FullStory                                                                                 | 19,055     | 15,558 s     | 816 ms         |
| Index Exchange                                                                            | 193,085    | 15,200 s     | 79 ms          |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 60,072     | 13,800 s     | 230 ms         |
| [Adroll](https://www.adroll.com/)                                                         | 35,751     | 13,757 s     | 385 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 30,704     | 13,757 s     | 448 ms         |
| Inspectlet                                                                                | 7,027      | 13,509 s     | 1923 ms        |
| AudienceSearch                                                                            | 63,098     | 13,507 s     | 214 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 30,311     | 13,393 s     | 442 ms         |
| GumGum                                                                                    | 147,038    | 12,868 s     | 88 ms          |
| IPONWEB                                                                                   | 33,059     | 12,451 s     | 377 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                                | 52,580     | 12,120 s     | 231 ms         |
| Twitter Online Conversion Tracking                                                        | 107,645    | 12,007 s     | 112 ms         |
| [Quantcast Choice](https://quantcast.com)                                                 | 28,649     | 11,633 s     | 406 ms         |
| [Attentive](https://attentivemobile.com/)                                                 | 9,725      | 11,108 s     | 1142 ms        |
| OptiMonk                                                                                  | 10,355     | 11,003 s     | 1063 ms        |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 17,572     | 11,001 s     | 626 ms         |
| [Moat](https://moat.com/)                                                                 | 15,290     | 10,934 s     | 715 ms         |
| Calendly                                                                                  | 7,789      | 10,814 s     | 1388 ms        |
| [AppNexus](https://www.appnexus.com/)                                                     | 192,000    | 10,783 s     | 56 ms          |
| [Supership](https://supership.jp/)                                                        | 20,178     | 10,717 s     | 531 ms         |
| [RD Station](https://www.rdstation.com/en/)                                               | 24,872     | 10,644 s     | 428 ms         |
| DTSCOUT                                                                                   | 52,864     | 10,519 s     | 199 ms         |
| [LinkedIn](https://www.linkedin.com/)                                                     | 26,875     | 10,221 s     | 380 ms         |
| [Outbrain](https://www.outbrain.com/)                                                     | 66,714     | 10,056 s     | 151 ms         |
| Trusted Shops                                                                             | 18,598     | 10,013 s     | 538 ms         |
| Mouseflow                                                                                 | 9,147      | 9,936 s      | 1086 ms        |
| CallRail                                                                                  | 30,191     | 9,623 s      | 319 ms         |
| sovrn                                                                                     | 74,072     | 9,006 s      | 122 ms         |
| SocialShopWave                                                                            | 4,778      | 8,993 s      | 1882 ms        |
| Geniee                                                                                    | 23,506     | 8,905 s      | 379 ms         |
| TrafficStars                                                                              | 12,308     | 8,590 s      | 698 ms         |
| [Twitch](https://twitch.tv/)                                                              | 1,700      | 8,549 s      | 5029 ms        |
| Ecwid                                                                                     | 6,754      | 8,510 s      | 1260 ms        |
| Cookie-Script.com                                                                         | 18,827     | 8,286 s      | 440 ms         |
| LongTail Ad Solutions                                                                     | 8,471      | 8,262 s      | 975 ms         |
| [ID5 Identity Cloud](https://id5.io/)                                                     | 78,299     | 8,235 s      | 105 ms         |
| [Akamai](https://www.akamai.com/)                                                         | 16,257     | 8,210 s      | 505 ms         |
| issuu                                                                                     | 3,420      | 8,201 s      | 2398 ms        |
| StatCounter                                                                               | 62,405     | 8,181 s      | 131 ms         |
| [Accessibe Accessibility Overlay](https://accessibe.com/)                                 | 43,816     | 8,115 s      | 185 ms         |
| fluct                                                                                     | 27,604     | 8,108 s      | 294 ms         |
| Bold Commerce                                                                             | 17,769     | 8,074 s      | 454 ms         |
| Bugsnag                                                                                   | 11,619     | 7,355 s      | 633 ms         |
| Conversant                                                                                | 56,953     | 7,070 s      | 124 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 4,302      | 6,998 s      | 1627 ms        |
| [VWO](https://vwo.com)                                                                    | 9,654      | 6,931 s      | 718 ms         |
| [Pendo](https://www.pendo.io)                                                             | 13,739     | 6,767 s      | 493 ms         |
| [Seedtag](https://www.seedtag.com/)                                                       | 3,321      | 6,630 s      | 1996 ms        |
| Gemius                                                                                    | 34,117     | 6,616 s      | 194 ms         |
| [Afterpay](https://www.afterpay.com/)                                                     | 21,232     | 6,549 s      | 308 ms         |
| Dynamic Yield                                                                             | 2,369      | 6,431 s      | 2715 ms        |
| Heap                                                                                      | 17,746     | 6,230 s      | 351 ms         |
| Cxense                                                                                    | 5,410      | 6,149 s      | 1137 ms        |
| LINE Corporation                                                                          | 30,410     | 6,140 s      | 202 ms         |
| i-mobile                                                                                  | 15,890     | 5,846 s      | 368 ms         |
| uLogin                                                                                    | 1,807      | 5,760 s      | 3188 ms        |
| [Beeketing](https://beeketing.com/)                                                       | 3,590      | 5,619 s      | 1565 ms        |
| Parse.ly                                                                                  | 10,444     | 5,464 s      | 523 ms         |
| Secomapp                                                                                  | 3,976      | 5,323 s      | 1339 ms        |
| Survicate                                                                                 | 4,316      | 5,245 s      | 1215 ms        |
| [Disqus](https://disqus.com/)                                                             | 1,751      | 5,168 s      | 2951 ms        |
| Adyen                                                                                     | 2,073      | 5,163 s      | 2491 ms        |
| Gigya                                                                                     | 2,704      | 5,135 s      | 1899 ms        |
| LoyaltyLion                                                                               | 4,962      | 5,098 s      | 1027 ms        |
| [Mixpanel](https://mixpanel.com/)                                                         | 23,834     | 4,959 s      | 208 ms         |
| Forter                                                                                    | 5,093      | 4,840 s      | 950 ms         |
| [LivePerson](https://www.liveperson.com/)                                                 | 4,611      | 4,801 s      | 1041 ms        |
| [DoubleVerify](https://www.doubleverify.com/)                                             | 2,657      | 4,796 s      | 1805 ms        |
| Revolver Maps                                                                             | 4,529      | 4,785 s      | 1057 ms        |
| Covert Pics                                                                               | 3,269      | 4,774 s      | 1460 ms        |

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
