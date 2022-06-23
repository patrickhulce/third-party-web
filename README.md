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
//     "categories": ["customer-success"],
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
| 1    | [Bidswitch](https://www.bidswitch.com/)                                          | 14,579    | 5 ms           |
| 2    | SpotXchange                                                                      | 2,297     | 5 ms           |
| 3    | EQ works                                                                         | 4,687     | 5 ms           |
| 4    | DeepIntent                                                                       | 24,009    | 7 ms           |
| 5    | ContextWeb                                                                       | 13,985    | 7 ms           |
| 6    | TripleLift                                                                       | 8,870     | 8 ms           |
| 7    | Beachfront Media                                                                 | 8,658     | 9 ms           |
| 8    | engage:BDR                                                                       | 4,057     | 10 ms          |
| 9    | Yieldmo                                                                          | 7,971     | 11 ms          |
| 10   | RTB House AdPilot                                                                | 8,567     | 12 ms          |
| 11   | [OpenX](https://www.openx.com/)                                                  | 47,625    | 13 ms          |
| 12   | OneTag                                                                           | 20,783    | 14 ms          |
| 13   | Sonobi                                                                           | 2,075     | 14 ms          |
| 14   | [33 Across](https://33across.com/)                                               | 38,526    | 15 ms          |
| 15   | Tribal Fusion                                                                    | 35,913    | 17 ms          |
| 16   | Sharethrough                                                                     | 11,944    | 18 ms          |
| 17   | District M                                                                       | 22,397    | 28 ms          |
| 18   | [AppNexus](https://www.appnexus.com/)                                            | 91,502    | 40 ms          |
| 19   | Constant Contact                                                                 | 10,401    | 43 ms          |
| 20   | Reklama                                                                          | 3,759     | 45 ms          |
| 21   | Adform                                                                           | 57,801    | 46 ms          |
| 22   | [F@N Communications](https://www.fancs.com/)                                     | 3,519     | 52 ms          |
| 23   | [Quora Ads](https://www.quora.com/business/)                                     | 1,792     | 55 ms          |
| 24   | MailMunch                                                                        | 7,347     | 55 ms          |
| 25   | SiteScout                                                                        | 6,643     | 57 ms          |
| 26   | Nend                                                                             | 5,297     | 61 ms          |
| 27   | GumGum                                                                           | 25,781    | 62 ms          |
| 28   | DialogTech SourceTrak                                                            | 2,956     | 65 ms          |
| 29   | Simpli.fi                                                                        | 9,249     | 66 ms          |
| 30   | [Media Math](https://www.mediamath.com/)                                         | 6,704     | 67 ms          |
| 31   | Twitter Online Conversion Tracking                                               | 59,070    | 73 ms          |
| 32   | [The Trade Desk](https://www.thetradedesk.com/)                                  | 21,309    | 76 ms          |
| 33   | StackAdapt                                                                       | 6,523     | 82 ms          |
| 34   | [Scorecard Research](https://www.scorecardresearch.com/)                         | 3,697     | 88 ms          |
| 35   | Teads                                                                            | 37,270    | 88 ms          |
| 36   | Affiliate Window                                                                 | 4,063     | 95 ms          |
| 37   | Index Exchange                                                                   | 84,768    | 96 ms          |
| 38   | Drip                                                                             | 1,920     | 102 ms         |
| 39   | BlueCava                                                                         | 6,148     | 105 ms         |
| 40   | Branch Metrics                                                                   | 3,766     | 110 ms         |
| 41   | DTSCOUT                                                                          | 32,257    | 123 ms         |
| 42   | Tynt                                                                             | 86,165    | 126 ms         |
| 43   | Tradelab                                                                         | 1,882     | 126 ms         |
| 44   | Between Digital                                                                  | 2,791     | 142 ms         |
| 45   | [Yahoo!](https://www.yahoo.com/)                                                 | 12,370    | 143 ms         |
| 46   | Gemius                                                                           | 19,760    | 146 ms         |
| 47   | ExoClick                                                                         | 1,809     | 149 ms         |
| 48   | OwnerIQ                                                                          | 2,083     | 154 ms         |
| 49   | LinkedIn Ads                                                                     | 8,543     | 156 ms         |
| 50   | BlueKai                                                                          | 63,410    | 163 ms         |
| 51   | IPONWEB                                                                          | 4,455     | 165 ms         |
| 52   | LINE Corporation                                                                 | 18,542    | 167 ms         |
| 53   | fluct                                                                            | 14,550    | 174 ms         |
| 54   | i-mobile                                                                         | 12,960    | 181 ms         |
| 55   | FreakOut                                                                         | 2,659     | 192 ms         |
| 56   | Adscale                                                                          | 6,238     | 194 ms         |
| 57   | Unbounce                                                                         | 7,630     | 196 ms         |
| 58   | [Bing Ads](https://bingads.microsoft.com)                                        | 35,530    | 200 ms         |
| 59   | Smart AdServer                                                                   | 12,828    | 201 ms         |
| 60   | Salesforce.com                                                                   | 2,990     | 208 ms         |
| 61   | AudienceSearch                                                                   | 29,110    | 208 ms         |
| 62   | [Amazon Ads](https://ad.amazon.com/)                                             | 69,838    | 213 ms         |
| 63   | sovrn                                                                            | 10,134    | 217 ms         |
| 64   | STINGRAY                                                                         | 6,409     | 221 ms         |
| 65   | Intercept Interactive                                                            | 2,780     | 255 ms         |
| 66   | TrafficStars                                                                     | 6,490     | 271 ms         |
| 67   | [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)              | 26,721    | 287 ms         |
| 68   | JuicyAds                                                                         | 2,891     | 313 ms         |
| 69   | [Adroll](https://www.adroll.com/)                                                | 24,959    | 320 ms         |
| 70   | [Criteo](https://www.criteo.com/)                                                | 126,803   | 322 ms         |
| 71   | Geniee                                                                           | 10,631    | 328 ms         |
| 72   | [Rubicon Project](https://rubiconproject.com/)                                   | 127,384   | 333 ms         |
| 73   | Crowd Control                                                                    | 32,988    | 334 ms         |
| 74   | [Supership](https://supership.jp/)                                               | 9,273     | 367 ms         |
| 75   | [Outbrain](https://www.outbrain.com/)                                            | 7,160     | 402 ms         |
| 76   | VigLink                                                                          | 32,265    | 410 ms         |
| 77   | [Yandex Ads](https://yandex.com/adv/)                                            | 19,961    | 426 ms         |
| 78   | Skimbit                                                                          | 46,988    | 450 ms         |
| 79   | Refersion                                                                        | 2,881     | 528 ms         |
| 80   | [Mediavine](https://www.mediavine.com/)                                          | 8,772     | 540 ms         |
| 81   | [WordAds](https://wordads.co/)                                                   | 50,306    | 595 ms         |
| 82   | Sortable                                                                         | 1,937     | 655 ms         |
| 83   | Privy                                                                            | 14,399    | 723 ms         |
| 84   | Cxense                                                                           | 4,360     | 732 ms         |
| 85   | JustUno                                                                          | 1,783     | 737 ms         |
| 86   | [Taboola](https://www.taboola.com/)                                              | 30,613    | 780 ms         |
| 87   | Klaviyo                                                                          | 73,353    | 809 ms         |
| 88   | LongTail Ad Solutions                                                            | 5,295     | 863 ms         |
| 89   | LoyaltyLion                                                                      | 3,357     | 1011 ms        |
| 90   | [Pubmatic](https://pubmatic.com/)                                                | 148,549   | 1026 ms        |
| 91   | [Media.net](https://www.media.net/)                                              | 53,801    | 1106 ms        |
| 92   | [Moat](https://moat.com/)                                                        | 7,645     | 1157 ms        |
| 93   | [Attentive](https://attentivemobile.com/)                                        | 7,332     | 1220 ms        |
| 94   | Infolinks                                                                        | 4,608     | 1656 ms        |
| 95   | [MGID](https://www.mgid.com/)                                                    | 9,445     | 1765 ms        |
| 96   | [Sizmek](https://www.sizmek.com/)                                                | 5,614     | 1786 ms        |
| 97   | [Integral Ad Science](https://integralads.com/uk/)                               | 6,631     | 2022 ms        |
| 98   | [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/) | 1,053,047 | 2346 ms        |
| 99   | Connatix                                                                         | 4,827     | 2472 ms        |
| 100  | [Bridgewell DSP](https://www.bridgewell.com/)                                    | 13,406    | 3860 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [SalesLoft](https://salesloft.com/)                                          | 1,158     | 52 ms          |
| 2    | Mouseflow                                                                    | 5,449     | 60 ms          |
| 3    | [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)       | 1,278     | 64 ms          |
| 4    | [Alexa](https://www.alexa.com/)                                              | 3,256     | 67 ms          |
| 5    | [WordPress Site Stats](https://wp.com/)                                      | 59,245    | 68 ms          |
| 6    | Sailthru                                                                     | 4,001     | 83 ms          |
| 7    | [SpeedCurve LUX](https://speedcurve.com/features/lux/)                       | 1,418     | 86 ms          |
| 8    | Woopra                                                                       | 1,317     | 97 ms          |
| 9    | StatCounter                                                                  | 31,848    | 97 ms          |
| 10   | Polldaddy                                                                    | 1,221     | 98 ms          |
| 11   | [Crazy Egg](https://www.crazyegg.com/)                                       | 40,219    | 102 ms         |
| 12   | [Brandmetrics](https://www.brandmetrics.com)                                 | 1,864     | 102 ms         |
| 13   | Conversant                                                                   | 22,057    | 108 ms         |
| 14   | Treasure Data                                                                | 9,438     | 114 ms         |
| 15   | [Quantcast](https://www.quantcast.com)                                       | 85,604    | 124 ms         |
| 16   | [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)         | 22,324    | 132 ms         |
| 17   | CleverTap                                                                    | 1,404     | 146 ms         |
| 18   | [Fastly Insights](https://insights.fastlylabs.com)                           | 4,727     | 148 ms         |
| 19   | ResponseTap                                                                  | 1,094     | 151 ms         |
| 20   | Roxr Software                                                                | 12,684    | 165 ms         |
| 21   | [Snowplow](https://snowplowanalytics.com/)                                   | 17,391    | 167 ms         |
| 22   | Stamped.io                                                                   | 7,477     | 167 ms         |
| 23   | Searchanise                                                                  | 4,482     | 171 ms         |
| 24   | Amplitude Mobile Analytics                                                   | 8,874     | 174 ms         |
| 25   | [Google Analytics](https://marketingplatform.google.com/about/analytics/)    | 4,266,204 | 174 ms         |
| 26   | [Mixpanel](https://mixpanel.com/)                                            | 12,896    | 177 ms         |
| 27   | [Braze](https://www.braze.com)                                               | 2,075     | 197 ms         |
| 28   | [Google Optimize](https://marketingplatform.google.com/about/optimize/)      | 48,878    | 212 ms         |
| 29   | Exponea                                                                      | 1,000     | 219 ms         |
| 30   | Marchex                                                                      | 8,094     | 222 ms         |
| 31   | CallRail                                                                     | 15,422    | 246 ms         |
| 32   | Heap                                                                         | 8,210     | 252 ms         |
| 33   | Chartbeat                                                                    | 6,654     | 262 ms         |
| 34   | Smart Insight Tracking                                                       | 2,116     | 265 ms         |
| 35   | Reviews.io                                                                   | 1,555     | 276 ms         |
| 36   | [Matomo](https://matomo.org/)                                                | 2,449     | 277 ms         |
| 37   | [Marketo](https://www.marketo.com)                                           | 2,090     | 299 ms         |
| 38   | [Usabilla](https://usabilla.com)                                             | 1,444     | 325 ms         |
| 39   | Qualtrics                                                                    | 4,344     | 326 ms         |
| 40   | Trust Pilot                                                                  | 28,680    | 332 ms         |
| 41   | etracker                                                                     | 3,577     | 336 ms         |
| 42   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 21,052    | 337 ms         |
| 43   | Parse.ly                                                                     | 3,555     | 353 ms         |
| 44   | Reviews.co.uk                                                                | 2,002     | 403 ms         |
| 45   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 21,808    | 412 ms         |
| 46   | Evergage                                                                     | 1,443     | 432 ms         |
| 47   | [PageSense](https://www.zoho.com/pagesense/)                                 | 2,666     | 461 ms         |
| 48   | Convert Insights                                                             | 1,073     | 497 ms         |
| 49   | Net Reviews                                                                  | 3,836     | 506 ms         |
| 50   | Evidon                                                                       | 2,690     | 510 ms         |
| 51   | [BowNow](https://bow-now.jp/)                                                | 1,398     | 571 ms         |
| 52   | [VWO](https://vwo.com)                                                       | 7,066     | 571 ms         |
| 53   | FullStory                                                                    | 10,020    | 607 ms         |
| 54   | [Segment](https://segment.com/)                                              | 16,962    | 626 ms         |
| 55   | [Optimizely](https://www.optimizely.com/)                                    | 21,048    | 652 ms         |
| 56   | Bazaarvoice                                                                  | 2,660     | 671 ms         |
| 57   | [Pendo](https://www.pendo.io)                                                | 3,754     | 686 ms         |
| 58   | Clerk.io ApS                                                                 | 1,723     | 690 ms         |
| 59   | [Snapchat](https://www.snapchat.com)                                         | 30,754    | 703 ms         |
| 60   | [Hotjar](https://www.hotjar.com/)                                            | 251,050   | 713 ms         |
| 61   | Nosto                                                                        | 1,464     | 733 ms         |
| 62   | PowerReviews                                                                 | 1,397     | 879 ms         |
| 63   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 18,036    | 921 ms         |
| 64   | Revolver Maps                                                                | 1,914     | 974 ms         |
| 65   | AB Tasty                                                                     | 3,329     | 974 ms         |
| 66   | Feefo.com                                                                    | 1,831     | 1049 ms        |
| 67   | ContentSquare                                                                | 2,407     | 1067 ms        |
| 68   | [Histats](https://www.histats.com/)                                          | 26,133    | 1087 ms        |
| 69   | [Lucky Orange](https://www.luckyorange.com/)                                 | 13,549    | 1096 ms        |
| 70   | TrackJS                                                                      | 1,615     | 1115 ms        |
| 71   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 343,926   | 1287 ms        |
| 72   | SessionCam                                                                   | 1,005     | 1392 ms        |
| 73   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 6,064     | 1424 ms        |
| 74   | Gigya                                                                        | 2,249     | 1458 ms        |
| 75   | Dynatrace                                                                    | 2,579     | 1530 ms        |
| 76   | Inspectlet                                                                   | 4,894     | 1577 ms        |
| 77   | [KARTE](https://karte.io/)                                                   | 1,345     | 1865 ms        |
| 78   | Ezoic                                                                        | 2,171     | 3472 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                        | Usage     | Average Impact |
| ---- | ------------------------------------------- | --------- | -------------- |
| 1    | [Shareaholic](https://www.shareaholic.com/) | 1,660     | 92 ms          |
| 2    | [AddToAny](https://www.addtoany.com/)       | 59,970    | 111 ms         |
| 3    | [Pinterest](https://pinterest.com/)         | 134,837   | 115 ms         |
| 4    | reddit                                      | 2,134     | 121 ms         |
| 5    | [LinkedIn](https://www.linkedin.com/)       | 13,936    | 342 ms         |
| 6    | [Facebook](https://www.facebook.com)        | 2,088,175 | 397 ms         |
| 7    | AddShoppers                                 | 2,228     | 500 ms         |
| 8    | [ShareThis](https://www.sharethis.com/)     | 91,265    | 501 ms         |
| 9    | [Twitter](https://twitter.com)              | 278,674   | 509 ms         |
| 10   | [TikTok](https://www.tiktok.com/en/)        | 84,074    | 536 ms         |
| 11   | Kakao                                       | 34,851    | 576 ms         |
| 12   | [Instagram](https://www.instagram.com)      | 6,703     | 1298 ms        |
| 13   | [AddThis](https://www.addthis.com/)         | 105,805   | 1341 ms        |
| 14   | SocialShopWave                              | 3,277     | 1678 ms        |
| 15   | [VK](https://vk.com/)                       | 44,217    | 1991 ms        |
| 16   | [PIXNET](https://www.pixnet.net/)           | 13,661    | 3422 ms        |
| 17   | [Tumblr](https://tumblr.com/)               | 14,939    | 3944 ms        |
| 18   | LiveJournal                                 | 4,500     | 4773 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage   | Average Impact |
| ---- | -------------------------------------------- | ------- | -------------- |
| 1    | [Twitch](https://twitch.tv/)                 | 1,015   | 66 ms          |
| 2    | [Vimeo](https://vimeo.com/)                  | 70,795  | 1278 ms        |
| 3    | [Brightcove](https://www.brightcove.com/en/) | 12,344  | 1774 ms        |
| 4    | [Wistia](https://wistia.com/)                | 14,847  | 3256 ms        |
| 5    | [YouTube](https://youtube.com)               | 646,588 | 5219 ms        |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------------- | --------- | -------------- |
| 1    | Siteimprove                                                               | 10,874    | 87 ms          |
| 2    | [Accessibe Accessibility Overlay](https://accessibe.com/)                 | 5,260     | 88 ms          |
| 3    | Rollbar                                                                   | 1,557     | 112 ms         |
| 4    | Bitly                                                                     | 1,464     | 121 ms         |
| 5    | Key CDN                                                                   | 6,083     | 125 ms         |
| 6    | iovation                                                                  | 1,833     | 139 ms         |
| 7    | [New Relic](https://newrelic.com/)                                        | 177,167   | 139 ms         |
| 8    | [Ipify](https://www.ipify.org)                                            | 1,440     | 150 ms         |
| 9    | Seznam                                                                    | 12,648    | 155 ms         |
| 10   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 118,065   | 158 ms         |
| 11   | iubenda                                                                   | 40,114    | 200 ms         |
| 12   | Highcharts                                                                | 1,774     | 216 ms         |
| 13   | Signyfyd                                                                  | 1,110     | 221 ms         |
| 14   | [Foxentry](https://foxentry.cz/)                                          | 1,514     | 223 ms         |
| 15   | [TrustArc](https://www.trustarc.com/)                                     | 3,912     | 258 ms         |
| 16   | Klevu Search                                                              | 1,562     | 260 ms         |
| 17   | GitHub                                                                    | 4,283     | 264 ms         |
| 18   | LightWidget                                                               | 8,122     | 280 ms         |
| 19   | [Cookiebot](https://www.cookiebot.com/)                                   | 65,170    | 337 ms         |
| 20   | Hexton                                                                    | 24,872    | 345 ms         |
| 21   | Riskified                                                                 | 1,108     | 358 ms         |
| 22   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 1,560,923 | 361 ms         |
| 23   | [OneSignal](https://onesignal.com/)                                       | 60,077    | 367 ms         |
| 24   | Cookie-Script.com                                                         | 7,668     | 393 ms         |
| 25   | Bold Commerce                                                             | 13,898    | 427 ms         |
| 26   | Swiftype                                                                  | 1,180     | 430 ms         |
| 27   | [Sentry](https://sentry.io/)                                              | 112,112   | 433 ms         |
| 28   | [Amazon Pay](https://pay.amazon.com)                                      | 3,825     | 456 ms         |
| 29   | Fastly                                                                    | 26,320    | 461 ms         |
| 30   | Affirm                                                                    | 4,621     | 492 ms         |
| 31   | Google reCAPTCHA                                                          | 10,996    | 509 ms         |
| 32   | Trusted Shops                                                             | 14,150    | 512 ms         |
| 33   | GetSiteControl                                                            | 2,949     | 552 ms         |
| 34   | Forter                                                                    | 1,564     | 634 ms         |
| 35   | Bugsnag                                                                   | 6,485     | 647 ms         |
| 36   | [PayPal](https://paypal.com)                                              | 31,520    | 721 ms         |
| 37   | WisePops                                                                  | 2,821     | 743 ms         |
| 38   | Mapbox                                                                    | 10,421    | 774 ms         |
| 39   | [AppDynamics](https://www.appdynamics.com/)                               | 2,077     | 828 ms         |
| 40   | [GoDaddy](https://www.godaddy.com/)                                       | 31,084    | 932 ms         |
| 41   | MaxCDN Enterprise                                                         | 2,506     | 957 ms         |
| 42   | [Google Maps](https://www.google.com/maps)                                | 695,922   | 982 ms         |
| 43   | [Stripe](https://stripe.com)                                              | 47,361    | 1024 ms        |
| 44   | [Luigis Box](https://www.luigisbox.com/)                                  | 1,423     | 1156 ms        |
| 45   | [Vidyard](https://www.vidyard.com/)                                       | 1,006     | 1168 ms        |
| 46   | Secomapp                                                                  | 3,770     | 1420 ms        |
| 47   | Adyen                                                                     | 1,080     | 2026 ms        |
| 48   | [Yandex APIs](https://yandex.ru/)                                         | 21,729    | 2138 ms        |
| 49   | Rambler                                                                   | 9,956     | 3307 ms        |
| 50   | Esri ArcGIS                                                               | 1,686     | 5162 ms        |
| 51   | [POWr](https://www.powr.io)                                               | 22,940    | 5560 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](https://www.blogger.com/)                                                       | 164,511 | 139 ms         |
| 2    | Civic                                                                                     | 3,352   | 409 ms         |
| 3    | [Dealer](https://www.dealer.com/)                                                         | 1,323   | 592 ms         |
| 4    | [WordPress](https://wp.com/)                                                              | 195,967 | 731 ms         |
| 5    | Rackspace                                                                                 | 1,175   | 839 ms         |
| 6    | Ecwid                                                                                     | 3,196   | 1104 ms        |
| 7    | [Tilda](https://tilda.cc/)                                                                | 20,717  | 1636 ms        |
| 8    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 3,385   | 1836 ms        |
| 9    | [Shopify](https://www.shopify.com/)                                                       | 219,487 | 2665 ms        |
| 10   | [Squarespace](https://www.squarespace.com/)                                               | 75,862  | 3172 ms        |
| 11   | [Hatena Blog](https://hatenablog.com/)                                                    | 26,353  | 3512 ms        |
| 12   | [Weebly](https://www.weebly.com/)                                                         | 23,439  | 3818 ms        |
| 13   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 2,221   | 4810 ms        |
| 14   | [Wix](https://www.wix.com/)                                                               | 156,804 | 5156 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | [Podsights](https://podsights.com/)              | 1,786  | 71 ms          |
| 2    | Madison Logic                                    | 2,494  | 82 ms          |
| 3    | DemandBase                                       | 2,656  | 116 ms         |
| 4    | Pardot                                           | 2,370  | 136 ms         |
| 5    | [Wicked Reports](https://www.wickedreports.com/) | 1,085  | 191 ms         |
| 6    | [Albacross](https://albacross.com/)              | 1,949  | 209 ms         |
| 7    | [Beeketing](https://beeketing.com/)              | 2,342  | 234 ms         |
| 8    | [iZooto](https://www.izooto.com)                 | 1,616  | 240 ms         |
| 9    | Sojern                                           | 1,934  | 276 ms         |
| 10   | [RD Station](https://www.rdstation.com/en/)      | 16,159 | 322 ms         |
| 11   | [Listrak](https://www.listrak.com/)              | 1,215  | 466 ms         |
| 12   | [Mailchimp](https://mailchimp.com/)              | 33,456 | 495 ms         |
| 13   | [Hubspot](https://hubspot.com/)                  | 82,097 | 568 ms         |
| 14   | [Judge.me](https://judge.me/)                    | 21,829 | 609 ms         |
| 15   | [OptinMonster](https://optinmonster.com/)        | 4,073  | 700 ms         |
| 16   | [Yotpo](https://www.yotpo.com/)                  | 17,730 | 748 ms         |
| 17   | [Wunderkind](https://www.wunderkind.co/)         | 1,660  | 1425 ms        |
| 18   | [PureCars](https://www.purecars.com/)            | 2,761  | 1787 ms        |
| 19   | [Sumo](https://sumo.com/)                        | 12,847 | 1958 ms        |
| 20   | Bigcommerce                                      | 12,501 | 2864 ms        |
| 21   | [Drift](https://www.drift.com/)                  | 5,810  | 4994 ms        |
| 22   | [Tray Commerce](https://www.tray.com.br/)        | 7,028  | 5707 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                                        | Usage  | Average Impact |
| ---- | ----------------------------------------------------------- | ------ | -------------- |
| 1    | SnapEngage                                                  | 1,391  | 104 ms         |
| 2    | BoldChat                                                    | 1,350  | 235 ms         |
| 3    | Foursixty                                                   | 1,644  | 238 ms         |
| 4    | LiveTex                                                     | 1,656  | 321 ms         |
| 5    | [Tidio Live Chat](https://www.tidiochat.com/en/)            | 23,673 | 326 ms         |
| 6    | [Tawk.to](https://www.tawk.to/)                             | 75,335 | 427 ms         |
| 7    | Pure Chat                                                   | 4,065  | 447 ms         |
| 8    | [Help Scout](https://www.helpscout.net/)                    | 3,286  | 453 ms         |
| 9    | iPerceptions                                                | 4,768  | 638 ms         |
| 10   | [Jivochat](https://www.jivochat.com/)                       | 48,455 | 831 ms         |
| 11   | [LivePerson](https://www.liveperson.com/)                   | 3,706  | 848 ms         |
| 12   | [Intercom](https://www.intercom.com)                        | 17,238 | 1026 ms        |
| 13   | [Smartsupp](https://www.smartsupp.com)                      | 18,378 | 1111 ms        |
| 14   | [LiveChat](https://www.livechat.com/)                       | 25,143 | 1182 ms        |
| 15   | [ContactAtOnce](https://www.contactatonce.com/)             | 1,235  | 1566 ms        |
| 16   | [Olark](https://www.olark.com/)                             | 6,778  | 1793 ms        |
| 17   | [ZenDesk](https://zendesk.com/)                             | 65,420 | 1837 ms        |
| 18   | Dynamic Yield                                               | 1,404  | 3072 ms        |
| 19   | [Freshchat](https://www.freshworks.com/live-chat-software/) | 5,474  | 4054 ms        |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | Accuweather                               | 1,095  | 194 ms         |
| 2    | CPEx                                      | 1,455  | 264 ms         |
| 3    | Tencent                                   | 6,969  | 309 ms         |
| 4    | SnapWidget                                | 10,483 | 328 ms         |
| 5    | Covert Pics                               | 2,341  | 390 ms         |
| 6    | Booking.com                               | 2,001  | 455 ms         |
| 7    | Cloudinary                                | 1,242  | 591 ms         |
| 8    | OpenTable                                 | 2,298  | 604 ms         |
| 9    | [Hotmart](https://www.hotmart.com/)       | 2,013  | 1106 ms        |
| 10   | [AMP](https://amp.dev/)                   | 37,003 | 1292 ms        |
| 11   | Embedly                                   | 4,567  | 1581 ms        |
| 12   | issuu                                     | 2,031  | 2035 ms        |
| 13   | [Spotify](https://www.spotify.com/)       | 5,662  | 2479 ms        |
| 14   | [SoundCloud](https://www.soundcloud.com/) | 4,242  | 2816 ms        |
| 15   | Medium                                    | 1,511  | 10371 ms       |
| 16   | Dailymotion                               | 3,233  | 12872 ms       |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage     | Average Impact |
| ---- | ------------------------------------------------------------ | --------- | -------------- |
| 1    | [Google Fonts](https://fonts.google.com/)                    | 92,818    | 0 ms           |
| 2    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 32,415    | 37 ms          |
| 3    | Edge Web Fonts                                               | 1,047     | 94 ms          |
| 4    | [FontAwesome CDN](https://fontawesome.com/)                  | 173,075   | 192 ms         |
| 5    | Microsoft Hosted Libs                                        | 19,907    | 247 ms         |
| 6    | Monotype                                                     | 5,303     | 265 ms         |
| 7    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 57,451    | 311 ms         |
| 8    | [jQuery CDN](https://code.jquery.com/)                       | 388,629   | 433 ms         |
| 9    | [Cloudflare CDN](https://cdnjs.com/)                         | 328,568   | 498 ms         |
| 10   | Azure Web Services                                           | 31,257    | 561 ms         |
| 11   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 137,639   | 591 ms         |
| 12   | [Unpkg](https://unpkg.com)                                   | 59,972    | 598 ms         |
| 13   | Fort Awesome                                                 | 1,369     | 602 ms         |
| 14   | [Akamai](https://www.akamai.com/)                            | 9,698     | 619 ms         |
| 15   | [Google CDN](https://developers.google.com/speed/libraries/) | 1,910,663 | 794 ms         |
| 16   | [Yandex CDN](https://yandex.ru/)                             | 99,930    | 1511 ms        |
| 17   | [CreateJS CDN](https://code.createjs.com/)                   | 3,083     | 3793 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [BrightTag / Signal](https://www.signal.co)                                   | 4,531     | 225 ms         |
| 2    | [Yahoo! Tag Manager](https://marketing.yahoo.co.jp/service/tagmanager/)       | 10,825    | 232 ms         |
| 3    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 3,497,756 | 356 ms         |
| 4    | TagCommander                                                                  | 1,411     | 360 ms         |
| 5    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 88,773    | 493 ms         |
| 6    | [Tealium](https://tealium.com/)                                               | 19,194    | 811 ms         |
| 7    | [Ensighten](https://www.ensighten.com/)                                       | 4,223     | 910 ms         |

<a name="consent-provider"></a>

#### Consent Management Provider

IAB Consent Management Providers are the 'Cookie Consent' popups used by many publishers. They're invoked for every page and sit on the critical path between a page loading and adverts being displayed.

| Rank | Name                                              | Usage  | Average Impact |
| ---- | ------------------------------------------------- | ------ | -------------- |
| 1    | [Trustcommander](https://www.commandersact.com)   | 1,304  | 211 ms         |
| 2    | [Optanon](https://www.cookielaw.org/)             | 58,633 | 477 ms         |
| 3    | [Consent Manager CMP](https://consentmanager.net) | 3,468  | 505 ms         |
| 4    | [Quantcast Choice](https://quantcast.com)         | 26,540 | 650 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage  | Average Impact |
| ---- | ------------------------------------------------------------------- | ------ | -------------- |
| 1    | ResponsiveVoice                                                     | 3,121  | 88 ms          |
| 2    | [ReadSpeaker](https://www.readspeaker.com)                          | 4,301  | 106 ms         |
| 3    | Skype                                                               | 1,246  | 258 ms         |
| 4    | [Parking Crew](https://parkingcrew.net/)                            | 5,284  | 359 ms         |
| 5    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 1,591  | 363 ms         |
| 6    | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 71,864 | 402 ms         |
| 7    | Calendly                                                            | 3,870  | 755 ms         |
| 8    | Polyfill service                                                    | 1,796  | 1433 ms        |
| 9    | Heroku                                                              | 11,879 | 2701 ms        |
| 10   | uLogin                                                              | 1,416  | 3666 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [YouTube](https://youtube.com)                                                            | 646,588    | 3,374,534 s  | 5219 ms        |
| [Google/Doubleclick Ads](https://marketingplatform.google.com/about/enterprise/)          | 1,053,047  | 2,470,668 s  | 2346 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 1,910,663  | 1,516,436 s  | 794 ms         |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 3,497,756  | 1,244,461 s  | 356 ms         |
| [Facebook](https://www.facebook.com)                                                      | 2,088,175  | 828,544 s    | 397 ms         |
| [Wix](https://www.wix.com/)                                                               | 156,804    | 808,543 s    | 5156 ms        |
| [Google Analytics](https://marketingplatform.google.com/about/analytics/)                 | 4,266,204  | 743,844 s    | 174 ms         |
| [Google Maps](https://www.google.com/maps)                                                | 695,922    | 683,561 s    | 982 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 219,487    | 584,831 s    | 2665 ms        |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 1,560,923  | 564,037 s    | 361 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 343,926    | 442,545 s    | 1287 ms        |
| [Squarespace](https://www.squarespace.com/)                                               | 75,862     | 240,608 s    | 3172 ms        |
| [Hotjar](https://www.hotjar.com/)                                                         | 251,050    | 178,945 s    | 713 ms         |
| [jQuery CDN](https://code.jquery.com/)                                                    | 388,629    | 168,145 s    | 433 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 328,568    | 163,750 s    | 498 ms         |
| [Pubmatic](https://pubmatic.com/)                                                         | 148,549    | 152,383 s    | 1026 ms        |
| [Yandex CDN](https://yandex.ru/)                                                          | 99,930     | 151,020 s    | 1511 ms        |
| [WordPress](https://wp.com/)                                                              | 195,967    | 143,217 s    | 731 ms         |
| [AddThis](https://www.addthis.com/)                                                       | 105,805    | 141,919 s    | 1341 ms        |
| [Twitter](https://twitter.com)                                                            | 278,674    | 141,724 s    | 509 ms         |
| [POWr](https://www.powr.io)                                                               | 22,940     | 127,545 s    | 5560 ms        |
| [ZenDesk](https://zendesk.com/)                                                           | 65,420     | 120,195 s    | 1837 ms        |
| [Hatena Blog](https://hatenablog.com/)                                                    | 26,353     | 92,559 s     | 3512 ms        |
| [Vimeo](https://vimeo.com/)                                                               | 70,795     | 90,507 s     | 1278 ms        |
| [Weebly](https://www.weebly.com/)                                                         | 23,439     | 89,486 s     | 3818 ms        |
| [VK](https://vk.com/)                                                                     | 44,217     | 88,026 s     | 1991 ms        |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 137,639    | 81,408 s     | 591 ms         |
| [Media.net](https://www.media.net/)                                                       | 53,801     | 59,528 s     | 1106 ms        |
| Klaviyo                                                                                   | 73,353     | 59,363 s     | 809 ms         |
| [Tumblr](https://tumblr.com/)                                                             | 14,939     | 58,920 s     | 3944 ms        |
| [Bridgewell DSP](https://www.bridgewell.com/)                                             | 13,406     | 51,744 s     | 3860 ms        |
| [Sentry](https://sentry.io/)                                                              | 112,112    | 48,572 s     | 433 ms         |
| [Stripe](https://stripe.com)                                                              | 47,361     | 48,484 s     | 1024 ms        |
| [Wistia](https://wistia.com/)                                                             | 14,847     | 48,344 s     | 3256 ms        |
| [AMP](https://amp.dev/)                                                                   | 37,003     | 47,795 s     | 1292 ms        |
| [PIXNET](https://www.pixnet.net/)                                                         | 13,661     | 46,746 s     | 3422 ms        |
| [Hubspot](https://hubspot.com/)                                                           | 82,097     | 46,601 s     | 568 ms         |
| [Yandex APIs](https://yandex.ru/)                                                         | 21,729     | 46,466 s     | 2138 ms        |
| [ShareThis](https://www.sharethis.com/)                                                   | 91,265     | 45,763 s     | 501 ms         |
| [TikTok](https://www.tiktok.com/en/)                                                      | 84,074     | 45,068 s     | 536 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 88,773     | 43,725 s     | 493 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                            | 127,384    | 42,372 s     | 333 ms         |
| Dailymotion                                                                               | 3,233      | 41,615 s     | 12872 ms       |
| [Criteo](https://www.criteo.com/)                                                         | 126,803    | 40,777 s     | 322 ms         |
| [Jivochat](https://www.jivochat.com/)                                                     | 48,455     | 40,277 s     | 831 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                                 | 7,028      | 40,107 s     | 5707 ms        |
| [Unpkg](https://unpkg.com)                                                                | 59,972     | 35,871 s     | 598 ms         |
| Bigcommerce                                                                               | 12,501     | 35,804 s     | 2864 ms        |
| [Tilda](https://tilda.cc/)                                                                | 20,717     | 33,885 s     | 1636 ms        |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 173,075    | 33,250 s     | 192 ms         |
| Rambler                                                                                   | 9,956      | 32,929 s     | 3307 ms        |
| [Tawk.to](https://www.tawk.to/)                                                           | 75,335     | 32,135 s     | 427 ms         |
| Heroku                                                                                    | 11,879     | 32,084 s     | 2701 ms        |
| [WordAds](https://wordads.co/)                                                            | 50,306     | 29,944 s     | 595 ms         |
| [LiveChat](https://www.livechat.com/)                                                     | 25,143     | 29,719 s     | 1182 ms        |
| [Drift](https://www.drift.com/)                                                           | 5,810      | 29,012 s     | 4994 ms        |
| [GoDaddy](https://www.godaddy.com/)                                                       | 31,084     | 28,968 s     | 932 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 71,864     | 28,910 s     | 402 ms         |
| [Histats](https://www.histats.com/)                                                       | 26,133     | 28,403 s     | 1087 ms        |
| [Optanon](https://www.cookielaw.org/)                                                     | 58,633     | 27,966 s     | 477 ms         |
| [Sumo](https://sumo.com/)                                                                 | 12,847     | 25,158 s     | 1958 ms        |
| [New Relic](https://newrelic.com/)                                                        | 177,167    | 24,608 s     | 139 ms         |
| [Taboola](https://www.taboola.com/)                                                       | 30,613     | 23,889 s     | 780 ms         |
| [Blogger](https://www.blogger.com/)                                                       | 164,511    | 22,934 s     | 139 ms         |
| [PayPal](https://paypal.com)                                                              | 31,520     | 22,720 s     | 721 ms         |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                               | 5,474      | 22,191 s     | 4054 ms        |
| [OneSignal](https://onesignal.com/)                                                       | 60,077     | 22,033 s     | 367 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 65,170     | 21,960 s     | 337 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                              | 12,344     | 21,894 s     | 1774 ms        |
| [Snapchat](https://www.snapchat.com)                                                      | 30,754     | 21,621 s     | 703 ms         |
| LiveJournal                                                                               | 4,500      | 21,480 s     | 4773 ms        |
| Skimbit                                                                                   | 46,988     | 21,148 s     | 450 ms         |
| [Smartsupp](https://www.smartsupp.com)                                                    | 18,378     | 20,413 s     | 1111 ms        |
| Kakao                                                                                     | 34,851     | 20,074 s     | 576 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 118,065    | 18,692 s     | 158 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 57,451     | 17,871 s     | 311 ms         |
| [Intercom](https://www.intercom.com)                                                      | 17,238     | 17,684 s     | 1026 ms        |
| Azure Web Services                                                                        | 31,257     | 17,539 s     | 561 ms         |
| [Quantcast Choice](https://quantcast.com)                                                 | 26,540     | 17,248 s     | 650 ms         |
| [MGID](https://www.mgid.com/)                                                             | 9,445      | 16,674 s     | 1765 ms        |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 18,036     | 16,611 s     | 921 ms         |
| [Mailchimp](https://mailchimp.com/)                                                       | 33,456     | 16,567 s     | 495 ms         |
| Medium                                                                                    | 1,511      | 15,671 s     | 10371 ms       |
| [Tealium](https://tealium.com/)                                                           | 19,194     | 15,569 s     | 811 ms         |
| [Pinterest](https://pinterest.com/)                                                       | 134,837    | 15,503 s     | 115 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 69,838     | 14,889 s     | 213 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 13,549     | 14,846 s     | 1096 ms        |
| [Spotify](https://www.spotify.com/)                                                       | 5,662      | 14,038 s     | 2479 ms        |
| [Optimizely](https://www.optimizely.com/)                                                 | 21,048     | 13,713 s     | 652 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 6,631      | 13,409 s     | 2022 ms        |
| [Judge.me](https://judge.me/)                                                             | 21,829     | 13,286 s     | 609 ms         |
| [Yotpo](https://www.yotpo.com/)                                                           | 17,730     | 13,264 s     | 748 ms         |
| VigLink                                                                                   | 32,265     | 13,242 s     | 410 ms         |
| [Olark](https://www.olark.com/)                                                           | 6,778      | 12,150 s     | 1793 ms        |
| Fastly                                                                                    | 26,320     | 12,138 s     | 461 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 4,242      | 11,947 s     | 2816 ms        |
| Connatix                                                                                  | 4,827      | 11,934 s     | 2472 ms        |
| [CreateJS CDN](https://code.createjs.com/)                                                | 3,083      | 11,694 s     | 3793 ms        |
| Crowd Control                                                                             | 32,988     | 11,016 s     | 334 ms         |
| Tynt                                                                                      | 86,165     | 10,863 s     | 126 ms         |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 2,221      | 10,684 s     | 4810 ms        |
| [Quantcast](https://www.quantcast.com)                                                    | 85,604     | 10,623 s     | 124 ms         |
| [Segment](https://segment.com/)                                                           | 16,962     | 10,616 s     | 626 ms         |
| Privy                                                                                     | 14,399     | 10,414 s     | 723 ms         |
| [Google Optimize](https://marketingplatform.google.com/about/optimize/)                   | 48,878     | 10,362 s     | 212 ms         |
| BlueKai                                                                                   | 63,410     | 10,314 s     | 163 ms         |
| [Sizmek](https://www.sizmek.com/)                                                         | 5,614      | 10,026 s     | 1786 ms        |
| Trust Pilot                                                                               | 28,680     | 9,521 s      | 332 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 21,808     | 8,979 s      | 412 ms         |
| [Attentive](https://attentivemobile.com/)                                                 | 7,332      | 8,947 s      | 1220 ms        |
| [Moat](https://moat.com/)                                                                 | 7,645      | 8,845 s      | 1157 ms        |
| Esri ArcGIS                                                                               | 1,686      | 8,703 s      | 5162 ms        |
| [Instagram](https://www.instagram.com)                                                    | 6,703      | 8,702 s      | 1298 ms        |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)                        | 6,064      | 8,636 s      | 1424 ms        |
| Hexton                                                                                    | 24,872     | 8,590 s      | 345 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 19,961     | 8,512 s      | 426 ms         |
| Index Exchange                                                                            | 84,768     | 8,152 s      | 96 ms          |
| Mapbox                                                                                    | 10,421     | 8,066 s      | 774 ms         |
| iubenda                                                                                   | 40,114     | 8,006 s      | 200 ms         |
| [Adroll](https://www.adroll.com/)                                                         | 24,959     | 7,983 s      | 320 ms         |
| Inspectlet                                                                                | 4,894      | 7,717 s      | 1577 ms        |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 23,673     | 7,715 s      | 326 ms         |
| [Yahoo! JAPAN Ads](https://marketing.yahoo.co.jp/service/yahooads/)                       | 26,721     | 7,681 s      | 287 ms         |
| Infolinks                                                                                 | 4,608      | 7,630 s      | 1656 ms        |
| Ezoic                                                                                     | 2,171      | 7,539 s      | 3472 ms        |
| Trusted Shops                                                                             | 14,150     | 7,240 s      | 512 ms         |
| Embedly                                                                                   | 4,567      | 7,221 s      | 1581 ms        |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 35,530     | 7,114 s      | 200 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 21,052     | 7,089 s      | 337 ms         |
| [AddToAny](https://www.addtoany.com/)                                                     | 59,970     | 6,685 s      | 111 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 3,385      | 6,214 s      | 1836 ms        |
| FullStory                                                                                 | 10,020     | 6,080 s      | 607 ms         |
| AudienceSearch                                                                            | 29,110     | 6,060 s      | 208 ms         |
| [Akamai](https://www.akamai.com/)                                                         | 9,698      | 6,001 s      | 619 ms         |
| Bold Commerce                                                                             | 13,898     | 5,929 s      | 427 ms         |
| Google reCAPTCHA                                                                          | 10,996     | 5,592 s      | 509 ms         |
| SocialShopWave                                                                            | 3,277      | 5,498 s      | 1678 ms        |
| Secomapp                                                                                  | 3,770      | 5,352 s      | 1420 ms        |
| [RD Station](https://www.rdstation.com/en/)                                               | 16,159     | 5,210 s      | 322 ms         |
| uLogin                                                                                    | 1,416      | 5,191 s      | 3666 ms        |
| [PureCars](https://www.purecars.com/)                                                     | 2,761      | 4,934 s      | 1787 ms        |
| Microsoft Hosted Libs                                                                     | 19,907     | 4,914 s      | 247 ms         |
| [LinkedIn](https://www.linkedin.com/)                                                     | 13,936     | 4,763 s      | 342 ms         |
| [Mediavine](https://www.mediavine.com/)                                                   | 8,772      | 4,740 s      | 540 ms         |
| LongTail Ad Solutions                                                                     | 5,295      | 4,569 s      | 863 ms         |
| Dynamic Yield                                                                             | 1,404      | 4,313 s      | 3072 ms        |
| Twitter Online Conversion Tracking                                                        | 59,070     | 4,313 s      | 73 ms          |
| Bugsnag                                                                                   | 6,485      | 4,198 s      | 647 ms         |
| issuu                                                                                     | 2,031      | 4,134 s      | 2035 ms        |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 40,219     | 4,115 s      | 102 ms         |
| [VWO](https://vwo.com)                                                                    | 7,066      | 4,038 s      | 571 ms         |
| [WordPress Site Stats](https://wp.com/)                                                   | 59,245     | 4,012 s      | 68 ms          |
| DTSCOUT                                                                                   | 32,257     | 3,954 s      | 123 ms         |
| Dynatrace                                                                                 | 2,579      | 3,946 s      | 1530 ms        |
| [Ensighten](https://www.ensighten.com/)                                                   | 4,223      | 3,841 s      | 910 ms         |
| CallRail                                                                                  | 15,422     | 3,793 s      | 246 ms         |
| [AppNexus](https://www.appnexus.com/)                                                     | 91,502     | 3,703 s      | 40 ms          |
| Ecwid                                                                                     | 3,196      | 3,530 s      | 1104 ms        |
| Geniee                                                                                    | 10,631     | 3,491 s      | 328 ms         |
| SnapWidget                                                                                | 10,483     | 3,442 s      | 328 ms         |
| [Supership](https://supership.jp/)                                                        | 9,273      | 3,399 s      | 367 ms         |
| LoyaltyLion                                                                               | 3,357      | 3,394 s      | 1011 ms        |
| Teads                                                                                     | 37,270     | 3,293 s      | 88 ms          |
| Gigya                                                                                     | 2,249      | 3,278 s      | 1458 ms        |
| AB Tasty                                                                                  | 3,329      | 3,244 s      | 974 ms         |
| Cxense                                                                                    | 4,360      | 3,191 s      | 732 ms         |
| [fam](http://admin.fam-ad.com/report/)                                                    | 935        | 3,157 s      | 3377 ms        |
| [LivePerson](https://www.liveperson.com/)                                                 | 3,706      | 3,142 s      | 848 ms         |
| LINE Corporation                                                                          | 18,542     | 3,093 s      | 167 ms         |
| StatCounter                                                                               | 31,848     | 3,092 s      | 97 ms          |
| iPerceptions                                                                              | 4,768      | 3,040 s      | 638 ms         |
| Cookie-Script.com                                                                         | 7,668      | 3,014 s      | 393 ms         |
| [Disqus](https://disqus.com/)                                                             | 896        | 2,941 s      | 3282 ms        |
| [LiveRamp IdentityLink](https://liveramp.com/discover-identitylink/)                      | 22,324     | 2,938 s      | 132 ms         |
| Calendly                                                                                  | 3,870      | 2,922 s      | 755 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                                | 17,391     | 2,905 s      | 167 ms         |
| Gemius                                                                                    | 19,760     | 2,884 s      | 146 ms         |
| [Outbrain](https://www.outbrain.com/)                                                     | 7,160      | 2,882 s      | 402 ms         |
| [OptinMonster](https://optinmonster.com/)                                                 | 4,073      | 2,852 s      | 700 ms         |
| Admixer for Publishers                                                                    | 1,169      | 2,851 s      | 2439 ms        |
| Yieldify                                                                                  | 414        | 2,700 s      | 6522 ms        |
| LoopMe                                                                                    | 522        | 2,657 s      | 5090 ms        |
| Adform                                                                                    | 57,801     | 2,650 s      | 46 ms          |
| SearchSpring                                                                              | 616        | 2,600 s      | 4221 ms        |
| Smart AdServer                                                                            | 12,828     | 2,582 s      | 201 ms         |
| [Pendo](https://www.pendo.io)                                                             | 3,754      | 2,575 s      | 686 ms         |
| Polyfill service                                                                          | 1,796      | 2,574 s      | 1433 ms        |
| ContentSquare                                                                             | 2,407      | 2,567 s      | 1067 ms        |
| fluct                                                                                     | 14,550     | 2,534 s      | 174 ms         |
| [Yahoo! Tag Manager](https://marketing.yahoo.co.jp/service/tagmanager/)                   | 10,825     | 2,509 s      | 232 ms         |
| [KARTE](https://karte.io/)                                                                | 1,345      | 2,508 s      | 1865 ms        |
| MaxCDN Enterprise                                                                         | 2,506      | 2,398 s      | 957 ms         |
| Conversant                                                                                | 22,057     | 2,382 s      | 108 ms         |
| [Wunderkind](https://www.wunderkind.co/)                                                  | 1,660      | 2,365 s      | 1425 ms        |
| i-mobile                                                                                  | 12,960     | 2,341 s      | 181 ms         |
| [Mixpanel](https://mixpanel.com/)                                                         | 12,896     | 2,278 s      | 177 ms         |
| LightWidget                                                                               | 8,122      | 2,274 s      | 280 ms         |
| Affirm                                                                                    | 4,621      | 2,272 s      | 492 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 2,013      | 2,227 s      | 1106 ms        |
| sovrn                                                                                     | 10,134     | 2,198 s      | 217 ms         |

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
