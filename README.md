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

| Rank | Name                                                           | Usage     | Average Impact |
| ---- | -------------------------------------------------------------- | --------- | -------------- |
| 1    | Nend                                                           | 1,713     | 40 ms          |
| 2    | ExoClick                                                       | 4,263     | 56 ms          |
| 3    | Elastic Ad                                                     | 1,762     | 63 ms          |
| 4    | fluct                                                          | 4,240     | 64 ms          |
| 5    | MailMunch                                                      | 9,263     | 65 ms          |
| 6    | Affiliate Window                                               | 1,849     | 68 ms          |
| 7    | CleverDATA                                                     | 1,197     | 71 ms          |
| 8    | FreakOut                                                       | 7,279     | 72 ms          |
| 9    | Adyoulike                                                      | 2,750     | 74 ms          |
| 10   | Tradelab                                                       | 1,240     | 75 ms          |
| 11   | BlueKai                                                        | 11,372    | 75 ms          |
| 12   | Tail Target                                                    | 2,217     | 76 ms          |
| 13   | District M                                                     | 19,216    | 76 ms          |
| 14   | Rakuten Marketing                                              | 2,977     | 77 ms          |
| 15   | Tynt                                                           | 52,237    | 80 ms          |
| 16   | Geniee                                                         | 1,256     | 81 ms          |
| 17   | Constant Contact                                               | 3,036     | 83 ms          |
| 18   | GetResponse                                                    | 1,535     | 84 ms          |
| 19   | Crowd Control                                                  | 4,505     | 85 ms          |
| 20   | PushCrew                                                       | 7,655     | 85 ms          |
| 21   | Effective Measure                                              | 1,024     | 85 ms          |
| 22   | [The Trade Desk](https://www.thetradedesk.com/)                | 1,142     | 86 ms          |
| 23   | LinkedIn Ads                                                   | 1,220     | 86 ms          |
| 24   | Autopilot                                                      | 1,314     | 87 ms          |
| 25   | Rocket Fuel                                                    | 1,322     | 89 ms          |
| 26   | [Outbrain](https://www.outbrain.com/)                          | 9,003     | 89 ms          |
| 27   | Gemius                                                         | 15,970    | 90 ms          |
| 28   | [F@N Communications](https://www.fancs.com/)                   | 1,216     | 90 ms          |
| 29   | [Scorecard Research](https://www.scorecardresearch.com/)       | 56,910    | 91 ms          |
| 30   | Nativo                                                         | 1,140     | 92 ms          |
| 31   | DialogTech                                                     | 1,751     | 94 ms          |
| 32   | OwnerIQ                                                        | 1,476     | 97 ms          |
| 33   | Unbounce                                                       | 5,583     | 104 ms         |
| 34   | [Amazon Ads](https://ad.amazon.com/)                           | 37,633    | 105 ms         |
| 35   | [Pubmatic](https://pubmatic.com/)                              | 239,535   | 107 ms         |
| 36   | DTSCOUT                                                        | 10,470    | 107 ms         |
| 37   | Refersion                                                      | 2,484     | 108 ms         |
| 38   | AudienceSearch                                                 | 1,355     | 108 ms         |
| 39   | [Adroll](https://www.adroll.com/)                              | 5,475     | 112 ms         |
| 40   | plista                                                         | 1,488     | 116 ms         |
| 41   | [Popads](https://www.popads.net/)                              | 7,435     | 117 ms         |
| 42   | Sharethrough                                                   | 4,307     | 118 ms         |
| 43   | [Rubicon Project](https://rubiconproject.com/)                 | 64,786    | 120 ms         |
| 44   | Smart AdServer                                                 | 4,855     | 121 ms         |
| 45   | rewardStyle.com                                                | 1,165     | 121 ms         |
| 46   | JuicyAds                                                       | 4,980     | 121 ms         |
| 47   | Permutive                                                      | 1,172     | 124 ms         |
| 48   | OptiMonk                                                       | 2,755     | 126 ms         |
| 49   | Lytics                                                         | 1,255     | 128 ms         |
| 50   | Bizible                                                        | 2,050     | 139 ms         |
| 51   | [Yahoo!](https://www.yahoo.com/)                               | 42,141    | 139 ms         |
| 52   | Skimbit                                                        | 37,640    | 140 ms         |
| 53   | [Bridgewell DSP](https://www.bridgewell.com/)                  | 72,535    | 142 ms         |
| 54   | [Bing Ads](https://bingads.microsoft.com)                      | 31,774    | 149 ms         |
| 55   | [DMD Marketing](https://www.dmdconnects.com/)                  | 1,311     | 151 ms         |
| 56   | Digital ad Consortium                                          | 5,737     | 152 ms         |
| 57   | [AOL / Oath / Verizon Media](https://www.oath.com/)            | 3,688     | 157 ms         |
| 58   | [Criteo](https://www.criteo.com/)                              | 178,755   | 157 ms         |
| 59   | [RevJet](https://www.revjet.com/)                              | 5,763     | 160 ms         |
| 60   | [Media Math](http://www.mediamath.com/)                        | 3,427     | 162 ms         |
| 61   | [Media.net](https://www.media.net/)                            | 53,308    | 168 ms         |
| 62   | SmartAdServer                                                  | 5,903     | 169 ms         |
| 63   | Teads                                                          | 16,806    | 172 ms         |
| 64   | Adform                                                         | 37,341    | 180 ms         |
| 65   | sovrn                                                          | 7,038     | 184 ms         |
| 66   | Cxense                                                         | 8,958     | 184 ms         |
| 67   | TrafficStars                                                   | 3,973     | 186 ms         |
| 68   | eBay                                                           | 1,585     | 187 ms         |
| 69   | Adocean                                                        | 2,378     | 188 ms         |
| 70   | IPONWEB                                                        | 1,728     | 190 ms         |
| 71   | Adverline Board                                                | 2,345     | 193 ms         |
| 72   | Index Exchange                                                 | 6,240     | 206 ms         |
| 73   | Smarter Click                                                  | 1,093     | 207 ms         |
| 74   | Sortable                                                       | 2,729     | 210 ms         |
| 75   | Celtra                                                         | 1,384     | 211 ms         |
| 76   | Snacktools                                                     | 1,598     | 211 ms         |
| 77   | Auto Link Maker                                                | 2,421     | 223 ms         |
| 78   | [Taboola](https://www.taboola.com/)                            | 43,546    | 223 ms         |
| 79   | Branch Metrics                                                 | 2,076     | 226 ms         |
| 80   | Perfect Market                                                 | 1,829     | 232 ms         |
| 81   | VigLink                                                        | 16,444    | 238 ms         |
| 82   | LongTail Ad Solutions                                          | 8,052     | 240 ms         |
| 83   | Infolinks                                                      | 7,283     | 248 ms         |
| 84   | [MGID](https://www.mgid.com/)                                  | 18,885    | 249 ms         |
| 85   | One by AOL                                                     | 3,525     | 255 ms         |
| 86   | Klaviyo                                                        | 21,188    | 258 ms         |
| 87   | [WordAds](https://wordads.co/)                                 | 47,149    | 265 ms         |
| 88   | [OpenX](https://www.openx.com/)                                | 13,508    | 266 ms         |
| 89   | Privy                                                          | 24,476    | 270 ms         |
| 90   | GumGum                                                         | 5,832     | 275 ms         |
| 91   | Adloox                                                         | 7,979     | 276 ms         |
| 92   | piano                                                          | 1,739     | 286 ms         |
| 93   | [Intent Media](https://intent.com/)                            | 4,506     | 286 ms         |
| 94   | [Market GID](https://www.marketgid.com/)                       | 2,072     | 288 ms         |
| 95   | Adnium                                                         | 3,882     | 290 ms         |
| 96   | [AppNexus](https://www.appnexus.com/)                          | 55,728    | 296 ms         |
| 97   | Between Digital                                                | 2,337     | 304 ms         |
| 98   | [33 Across](https://33across.com/)                             | 16,956    | 338 ms         |
| 99   | Neodata                                                        | 2,708     | 344 ms         |
| 100  | iBillboard                                                     | 3,754     | 348 ms         |
| 101  | [Sizmek](https://www.sizmek.com/)                              | 13,924    | 361 ms         |
| 102  | [Polar](https://polar.me/)                                     | 1,353     | 371 ms         |
| 103  | Yieldmo                                                        | 3,013     | 381 ms         |
| 104  | Digioh                                                         | 2,150     | 390 ms         |
| 105  | BannerFlow                                                     | 8,849     | 392 ms         |
| 106  | Media Management Technologies                                  | 1,349     | 395 ms         |
| 107  | Technorati                                                     | 1,091     | 408 ms         |
| 108  | [DoubleVerify](https://www.doubleverify.com/)                  | 25,251    | 426 ms         |
| 109  | [MediaVine](https://www.mediavine.com/)                        | 14,060    | 429 ms         |
| 110  | [Integral Ad Science](https://integralads.com/uk/)             | 62,677    | 431 ms         |
| 111  | Tribal Fusion                                                  | 3,706     | 438 ms         |
| 112  | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 3,531,833 | 459 ms         |
| 113  | Simplicity Marketing                                           | 6,128     | 464 ms         |
| 114  | Admixer for Publishers                                         | 3,289     | 473 ms         |
| 115  | [Yandex Ads](https://yandex.com/adv/)                          | 24,094    | 476 ms         |
| 116  | Ooyala                                                         | 1,360     | 502 ms         |
| 117  | Vidible                                                        | 4,406     | 549 ms         |
| 118  | Meetrics                                                       | 1,623     | 582 ms         |
| 119  | LoyaltyLion                                                    | 3,047     | 606 ms         |
| 120  | Yieldify                                                       | 1,835     | 667 ms         |
| 121  | AdMatic                                                        | 4,062     | 710 ms         |
| 122  | [Moat](https://moat.com/)                                      | 41,664    | 834 ms         |
| 123  | [AdScore](https://www.adscore.com/)                            | 2,654     | 860 ms         |
| 124  | [Supership](https://supership.jp/)                             | 1,128     | 1034 ms        |
| 125  | LKQD                                                           | 4,733     | 1048 ms        |
| 126  | [fam](http://admin.fam-ad.com/report/)                         | 5,032     | 1325 ms        |
| 127  | StickyADS.tv                                                   | 7,693     | 1393 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                              | 2,350     | 55 ms          |
| 2    | [WordPress Site Stats](https://wp.com/)                                      | 10,174    | 64 ms          |
| 3    | Roxr Software                                                                | 4,804     | 69 ms          |
| 4    | Treasure Data                                                                | 11,283    | 70 ms          |
| 5    | StatCounter                                                                  | 16,374    | 72 ms          |
| 6    | Amplitude Mobile Analytics                                                   | 5,400     | 74 ms          |
| 7    | Searchanise                                                                  | 4,750     | 75 ms          |
| 8    | Heap                                                                         | 4,211     | 78 ms          |
| 9    | [Quantcast](https://www.quantcast.com)                                       | 6,563     | 78 ms          |
| 10   | [Mixpanel](https://mixpanel.com/)                                            | 13,179    | 80 ms          |
| 11   | Chartbeat                                                                    | 13,104    | 80 ms          |
| 12   | [Google Analytics](https://www.google.com/analytics/analytics/)              | 2,509,867 | 81 ms          |
| 13   | [Hotjar](https://www.hotjar.com/)                                            | 286,465   | 91 ms          |
| 14   | Smart Insight Tracking                                                       | 1,467     | 92 ms          |
| 15   | [Radar](https://www.cedexis.com/radar/)                                      | 1,357     | 93 ms          |
| 16   | [Usabilla](https://usabilla.com)                                             | 1,611     | 96 ms          |
| 17   | etracker                                                                     | 3,877     | 100 ms         |
| 18   | CallRail                                                                     | 13,947    | 106 ms         |
| 19   | Marchex                                                                      | 8,566     | 109 ms         |
| 20   | ContentSquare                                                                | 2,288     | 109 ms         |
| 21   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 24,220    | 111 ms         |
| 22   | Parse.ly                                                                     | 6,259     | 111 ms         |
| 23   | [Snowplow](https://snowplowanalytics.com/)                                   | 6,077     | 114 ms         |
| 24   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 27,003    | 119 ms         |
| 25   | [Crazy Egg](https://www.crazyegg.com/)                                       | 28,656    | 122 ms         |
| 26   | Picreel                                                                      | 1,042     | 128 ms         |
| 27   | [VWO](https://vwo.com)                                                       | 11,885    | 131 ms         |
| 28   | Survicate                                                                    | 1,142     | 133 ms         |
| 29   | Net Reviews                                                                  | 5,520     | 136 ms         |
| 30   | Convert Insights                                                             | 1,968     | 136 ms         |
| 31   | Nosto                                                                        | 5,112     | 142 ms         |
| 32   | [BounceX](https://www.bouncex.com/)                                          | 2,744     | 150 ms         |
| 33   | [Marketo](https://www.marketo.com)                                           | 2,516     | 150 ms         |
| 34   | Monetate                                                                     | 1,932     | 153 ms         |
| 35   | PowerReviews                                                                 | 1,342     | 161 ms         |
| 36   | Kampyle                                                                      | 1,360     | 163 ms         |
| 37   | Trust Pilot                                                                  | 30,441    | 167 ms         |
| 38   | Evidon                                                                       | 15,544    | 168 ms         |
| 39   | Mather Economics                                                             | 1,496     | 169 ms         |
| 40   | Gigya                                                                        | 7,027     | 178 ms         |
| 41   | ForeSee                                                                      | 4,507     | 185 ms         |
| 42   | [DigiTrust](http://www.digitru.st/)                                          | 8,804     | 188 ms         |
| 43   | [Segment](https://segment.com/)                                              | 19,443    | 192 ms         |
| 44   | Clicktale                                                                    | 3,814     | 193 ms         |
| 45   | FullStory                                                                    | 12,228    | 219 ms         |
| 46   | Maxymiser                                                                    | 2,539     | 234 ms         |
| 47   | Clerk.io ApS                                                                 | 1,678     | 242 ms         |
| 48   | UserReport                                                                   | 2,659     | 243 ms         |
| 49   | Bazaarvoice                                                                  | 4,825     | 265 ms         |
| 50   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 22,192    | 273 ms         |
| 51   | Ezoic                                                                        | 7,870     | 282 ms         |
| 52   | [Optimizely](https://www.optimizely.com/)                                    | 24,691    | 305 ms         |
| 53   | [Keen](https://keen.io/)                                                     | 5,043     | 311 ms         |
| 54   | [Histats](http://histats.com/)                                               | 28,082    | 337 ms         |
| 55   | Feefo.com                                                                    | 4,355     | 367 ms         |
| 56   | Reviews.co.uk                                                                | 1,197     | 367 ms         |
| 57   | Inspectlet                                                                   | 11,796    | 396 ms         |
| 58   | Decibel Insight                                                              | 1,116     | 414 ms         |
| 59   | TrackJS                                                                      | 1,660     | 423 ms         |
| 60   | [Snapchat](https://www.snapchat.com)                                         | 16,476    | 427 ms         |
| 61   | SessionCam                                                                   | 3,128     | 467 ms         |
| 62   | [Lucky Orange](https://www.luckyorange.com/)                                 | 15,254    | 501 ms         |
| 63   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 497,461   | 506 ms         |
| 64   | Mouseflow                                                                    | 3,345     | 618 ms         |
| 65   | Revolver Maps                                                                | 1,558     | 644 ms         |
| 66   | IBM Digital Analytics                                                        | 1,812     | 709 ms         |
| 67   | AB Tasty                                                                     | 6,661     | 732 ms         |
| 68   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 101,775   | 951 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 54,057    | 59 ms          |
| 2    | Micropat                                             | 48,427    | 74 ms          |
| 3    | [Shareaholic](https://www.shareaholic.com/)          | 9,532     | 88 ms          |
| 4    | Kakao                                                | 23,274    | 94 ms          |
| 5    | [Pinterest](https://pinterest.com/)                  | 31,567    | 107 ms         |
| 6    | [LinkedIn](https://www.linkedin.com/)                | 33,425    | 110 ms         |
| 7    | [Twitter](https://twitter.com)                       | 535,642   | 129 ms         |
| 8    | AddShoppers                                          | 1,100     | 133 ms         |
| 9    | [Yandex Share](https://yastatic.net/share2/share.js) | 93,048    | 141 ms         |
| 10   | [Instagram](https://www.instagram.com)               | 18,393    | 143 ms         |
| 11   | [Facebook](https://www.facebook.com)                 | 3,590,088 | 161 ms         |
| 12   | [ShareThis](https://www.sharethis.com/)              | 88,885    | 233 ms         |
| 13   | Stackla PTY                                          | 1,307     | 311 ms         |
| 14   | [AddThis](http://www.addthis.com/)                   | 378,302   | 328 ms         |
| 15   | SocialShopWave                                       | 2,855     | 434 ms         |
| 16   | [Disqus](http://disqus.com/)                         | 5,702     | 529 ms         |
| 17   | Pixlee                                               | 1,588     | 535 ms         |
| 18   | [PIXNET](https://www.pixnet.net/)                    | 113,430   | 619 ms         |
| 19   | [Tumblr](https://tumblr.com/)                        | 49,240    | 715 ms         |
| 20   | LiveJournal                                          | 10,451    | 1057 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage     | Average Impact |
| ---- | -------------------------------------------- | --------- | -------------- |
| 1    | [Vimeo](http://vimeo.com/)                   | 70,542    | 477 ms         |
| 2    | [Wistia](https://wistia.com/)                | 44,577    | 523 ms         |
| 3    | [Twitch](https://twitch.tv/)                 | 3,058     | 651 ms         |
| 4    | [Brightcove](https://www.brightcove.com/en/) | 12,629    | 697 ms         |
| 5    | [YouTube](https://youtube.com)               | 1,215,399 | 700 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage     | Average Impact |
| ---- | ------------------------------------------------------------------------- | --------- | -------------- |
| 1    | Trusted Shops                                                             | 3,829     | 39 ms          |
| 2    | LightWidget                                                               | 5,623     | 65 ms          |
| 3    | Riskified                                                                 | 1,038     | 71 ms          |
| 4    | Symantec                                                                  | 2,348     | 78 ms          |
| 5    | [Optanon](https://www.cookielaw.org/)                                     | 1,931     | 78 ms          |
| 6    | [OneSignal](https://onesignal.com/)                                       | 40,889    | 79 ms          |
| 7    | GetSiteControl                                                            | 3,473     | 86 ms          |
| 8    | iubenda                                                                   | 26,534    | 88 ms          |
| 9    | Siteimprove                                                               | 3,278     | 89 ms          |
| 10   | TRUSTe                                                                    | 1,917     | 90 ms          |
| 11   | [New Relic](https://newrelic.com/)                                        | 11,813    | 93 ms          |
| 12   | [Cookiebot](https://www.cookiebot.com/)                                   | 22,102    | 102 ms         |
| 13   | iovation                                                                  | 2,215     | 103 ms         |
| 14   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 1,144,404 | 120 ms         |
| 15   | Github                                                                    | 1,115     | 125 ms         |
| 16   | Bold Commerce                                                             | 22,797    | 129 ms         |
| 17   | [AppDynamics](https://www.appdynamics.com/)                               | 3,118     | 137 ms         |
| 18   | AddEvent                                                                  | 1,395     | 143 ms         |
| 19   | Sift Science                                                              | 3,432     | 146 ms         |
| 20   | Forensiq                                                                  | 2,038     | 154 ms         |
| 21   | [Amazon Pay](https://pay.amazon.com)                                      | 27,030    | 156 ms         |
| 22   | MaxCDN Enterprise                                                         | 5,000     | 166 ms         |
| 23   | Swiftype                                                                  | 2,941     | 169 ms         |
| 24   | Shopgate                                                                  | 1,228     | 178 ms         |
| 25   | Po.st                                                                     | 2,418     | 185 ms         |
| 26   | [TrustArc](https://www.trustarc.com/)                                     | 17,277    | 191 ms         |
| 27   | [Google Maps](https://www.google.com/maps)                                | 1,029,420 | 202 ms         |
| 28   | Fraudlogix                                                                | 1,641     | 216 ms         |
| 29   | Seznam                                                                    | 3,966     | 219 ms         |
| 30   | WisePops                                                                  | 1,062     | 234 ms         |
| 31   | Affirm                                                                    | 2,742     | 251 ms         |
| 32   | GitHub                                                                    | 2,469     | 278 ms         |
| 33   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 27,866    | 302 ms         |
| 34   | Fastly                                                                    | 9,893     | 302 ms         |
| 35   | [Stripe](https://stripe.com)                                              | 40,199    | 320 ms         |
| 36   | [PayPal](https://paypal.com)                                              | 30,278    | 323 ms         |
| 37   | Rambler                                                                   | 17,774    | 335 ms         |
| 38   | [Distil Networks](https://www.distilnetworks.com/)                        | 21,147    | 344 ms         |
| 39   | [GoDaddy](https://www.godaddy.com/)                                       | 25,895    | 369 ms         |
| 40   | Secomapp                                                                  | 2,606     | 387 ms         |
| 41   | Datacamp                                                                  | 26,376    | 408 ms         |
| 42   | [Vidyard](https://www.vidyard.com/)                                       | 1,532     | 422 ms         |
| 43   | [Sentry](https://sentry.io/)                                              | 21,759    | 425 ms         |
| 44   | Bugsnag                                                                   | 2,323     | 461 ms         |
| 45   | Okas Concepts                                                             | 1,903     | 737 ms         |
| 46   | [Yandex APIs](https://yandex.ru/)                                         | 24,628    | 1105 ms        |
| 47   | Mapbox                                                                    | 9,933     | 1170 ms        |
| 48   | Esri ArcGIS                                                               | 4,593     | 1624 ms        |
| 49   | Blindado                                                                  | 1,567     | 1915 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [WordPress](https://wp.com/)                                                              | 267,613 | 190 ms         |
| 2    | Rackspace                                                                                 | 1,381   | 284 ms         |
| 3    | [Shopify](https://www.shopify.com/)                                                       | 359,922 | 293 ms         |
| 4    | [Dealer](https://www.dealer.com/)                                                         | 51,793  | 298 ms         |
| 5    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 4,380   | 370 ms         |
| 6    | [Blogger](http://www.blogger.com/)                                                        | 69,145  | 404 ms         |
| 7    | [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 17,453  | 481 ms         |
| 8    | Ecwid                                                                                     | 1,811   | 496 ms         |
| 9    | [Squarespace](https://www.squarespace.com/)                                               | 163,470 | 514 ms         |
| 10   | [Weebly](https://www.weebly.com/)                                                         | 69,962  | 563 ms         |
| 11   | [Hatena Blog](https://hatenablog.com/)                                                    | 102,990 | 609 ms         |
| 12   | [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 5,333   | 1050 ms        |
| 13   | [Wix](https://www.wix.com/)                                                               | 488,005 | 1104 ms        |
| 14   | [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 1,422   | 3136 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [iZooto](https://www.izooto.com)            | 1,400  | 70 ms          |
| 2    | [RD Station](https://www.rdstation.com/en/) | 3,542  | 71 ms          |
| 3    | Madison Logic                               | 1,260  | 86 ms          |
| 4    | Dataxu                                      | 11,295 | 97 ms          |
| 5    | [Beeketing](https://beeketing.com/)         | 46,576 | 107 ms         |
| 6    | Bronto Software                             | 1,864  | 115 ms         |
| 7    | [Listrak](https://www.listrak.com/)         | 2,153  | 124 ms         |
| 8    | [Hubspot](https://hubspot.com/)             | 52,412 | 140 ms         |
| 9    | Ve                                          | 6,509  | 145 ms         |
| 10   | [Mailchimp](https://mailchimp.com/)         | 51,011 | 156 ms         |
| 11   | [Yotpo](https://www.yotpo.com/)             | 24,868 | 216 ms         |
| 12   | [OptinMonster](https://optinmonster.com/)   | 16,882 | 243 ms         |
| 13   | [Sumo](https://sumo.com/)                   | 86,955 | 322 ms         |
| 14   | [Drift](https://www.drift.com/)             | 29,364 | 364 ms         |
| 15   | Bigcommerce                                 | 25,497 | 422 ms         |
| 16   | Pardot                                      | 2,500  | 432 ms         |
| 17   | Wishpond Technologies                       | 1,363  | 446 ms         |
| 18   | [Albacross](https://albacross.com/)         | 3,842  | 679 ms         |
| 19   | [Tray Commerce](https://www.tray.com.br/)   | 9,418  | 1176 ms        |
| 20   | [PureCars](https://www.purecars.com/)       | 5,103  | 1962 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage   | Average Impact |
| ---- | ------------------------------------------------ | ------- | -------------- |
| 1    | SnapEngage                                       | 2,138   | 62 ms          |
| 2    | ClickDesk                                        | 1,234   | 75 ms          |
| 3    | Foursixty                                        | 2,510   | 86 ms          |
| 4    | iPerceptions                                     | 4,165   | 98 ms          |
| 5    | [LivePerson](https://www.liveperson.com/)        | 9,838   | 103 ms         |
| 6    | Comm100                                          | 3,177   | 119 ms         |
| 7    | WebEngage                                        | 1,277   | 134 ms         |
| 8    | Pure Chat                                        | 8,189   | 143 ms         |
| 9    | iAdvize SAS                                      | 3,652   | 143 ms         |
| 10   | [ContactAtOnce](https://www.contactatonce.com/)  | 10,595  | 215 ms         |
| 11   | [LiveChat](https://www.livechatinc.com/)         | 53,109  | 252 ms         |
| 12   | [Tawk.to](https://www.tawk.to/)                  | 108,512 | 314 ms         |
| 13   | [Tidio Live Chat](https://www.tidiochat.com/en/) | 17,081  | 329 ms         |
| 14   | [Jivochat](https://www.jivochat.com/)            | 61,315  | 353 ms         |
| 15   | [Olark](https://www.olark.com/)                  | 24,902  | 365 ms         |
| 16   | [Intercom](https://www.intercom.com)             | 35,357  | 372 ms         |
| 17   | [Help Scout](https://www.helpscout.net/)         | 2,884   | 377 ms         |
| 18   | LiveTex                                          | 7,185   | 408 ms         |
| 19   | [ZenDesk](https://zendesk.com/)                  | 175,823 | 518 ms         |
| 20   | Dynamic Yield                                    | 2,637   | 622 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage   | Average Impact |
| ---- | ----------------------------------------- | ------- | -------------- |
| 1    | Accuweather                               | 3,088   | 69 ms          |
| 2    | Clicktripz                                | 6,194   | 83 ms          |
| 3    | Adobe Scene7                              | 1,234   | 83 ms          |
| 4    | Covert Pics                               | 1,021   | 106 ms         |
| 5    | CPEx                                      | 1,759   | 113 ms         |
| 6    | Revcontent                                | 1,233   | 115 ms         |
| 7    | Tencent                                   | 2,445   | 117 ms         |
| 8    | OpenTable                                 | 5,458   | 145 ms         |
| 9    | SnapWidget                                | 7,989   | 147 ms         |
| 10   | Booking.com                               | 5,723   | 147 ms         |
| 11   | Cloudinary                                | 1,043   | 188 ms         |
| 12   | Medium                                    | 4,756   | 229 ms         |
| 13   | [AMP](https://amp.dev/)                   | 133,133 | 247 ms         |
| 14   | [Vox Media](https://www.voxmedia.com/)    | 1,431   | 265 ms         |
| 15   | Embedly                                   | 8,268   | 488 ms         |
| 16   | issuu                                     | 6,457   | 491 ms         |
| 17   | [Spotify](https://www.spotify.com/)       | 5,243   | 500 ms         |
| 18   | Dailymotion                               | 5,365   | 519 ms         |
| 19   | [SoundCloud](https://www.soundcloud.com/) | 9,106   | 858 ms         |
| 20   | [Hotmart](https://www.hotmart.com/)       | 2,788   | 875 ms         |
| 21   | Kaltura Video Platform                    | 1,634   | 982 ms         |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage     | Average Impact |
| ---- | ------------------------------------------------------------ | --------- | -------------- |
| 1    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 2,849     | 59 ms          |
| 2    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 20,723    | 94 ms          |
| 3    | Microsoft Hosted Libs                                        | 11,263    | 166 ms         |
| 4    | [Yandex CDN](https://yandex.ru/)                             | 3,636     | 176 ms         |
| 5    | [jQuery CDN](https://code.jquery.com/)                       | 343,212   | 195 ms         |
| 6    | [Google CDN](https://developers.google.com/speed/libraries/) | 1,094,288 | 222 ms         |
| 7    | [FontAwesome CDN](https://fontawesome.com/)                  | 56,240    | 228 ms         |
| 8    | [Unpkg](https://unpkg.com)                                   | 8,489     | 244 ms         |
| 9    | [Akamai](https://www.akamai.com/)                            | 24,867    | 260 ms         |
| 10   | Azure Web Services                                           | 13,035    | 263 ms         |
| 11   | [Cloudflare CDN](https://cdnjs.com/)                         | 219,769   | 273 ms         |
| 12   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 64,286    | 355 ms         |
| 13   | Fort Awesome                                                 | 1,774     | 531 ms         |
| 14   | Monotype                                                     | 10,906    | 691 ms         |
| 15   | [CreateJS CDN](http://code.createjs.com/)                    | 13,015    | 2853 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | [BrightTag / Signal](https://www.signal.co)                                   | 23,136    | 94 ms          |
| 2    | TagCommander                                                                  | 2,803     | 119 ms         |
| 3    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,199,366 | 141 ms         |
| 4    | Opentag                                                                       | 1,987     | 205 ms         |
| 5    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 74,192    | 243 ms         |
| 6    | [Tealium](https://tealium.com/)                                               | 30,953    | 252 ms         |
| 7    | [Ensighten](https://www.ensighten.com/)                                       | 14,717    | 310 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage     | Average Impact |
| ---- | ------------------------------------------------- | --------- | -------------- |
| 1    | Skype                                             | 1,705     | 143 ms         |
| 2    | [Amazon Web Services](https://aws.amazon.com/s3/) | 80,948    | 153 ms         |
| 3    | [All Other 3rd Parties](#by-category)             | 1,421,438 | 246 ms         |
| 4    | Pagely                                            | 1,828     | 251 ms         |
| 5    | ResponsiveVoice                                   | 2,296     | 302 ms         |
| 6    | [Parking Crew](http://parkingcrew.net/)           | 6,550     | 483 ms         |
| 7    | uLogin                                            | 4,862     | 1139 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                            | 3,531,833  | 1,621,163 s  | 459 ms         |
| [YouTube](https://youtube.com)                                                            | 1,215,399  | 851,147 s    | 700 ms         |
| [Facebook](https://www.facebook.com)                                                      | 3,590,088  | 578,109 s    | 161 ms         |
| [Wix](https://www.wix.com/)                                                               | 488,005    | 538,579 s    | 1104 ms        |
| [All Other 3rd Parties](#by-category)                                                     | 1,421,438  | 349,368 s    | 246 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 497,461    | 251,897 s    | 506 ms         |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 1,094,288  | 242,755 s    | 222 ms         |
| [Google Maps](https://www.google.com/maps)                                                | 1,029,420  | 207,618 s    | 202 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)                           | 2,509,867  | 202,171 s    | 81 ms          |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 1,199,366  | 169,474 s    | 141 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 1,144,404  | 137,524 s    | 120 ms         |
| [AddThis](http://www.addthis.com/)                                                        | 378,302    | 123,970 s    | 328 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 359,922    | 105,346 s    | 293 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)                        | 101,775    | 96,802 s     | 951 ms         |
| [ZenDesk](https://zendesk.com/)                                                           | 175,823    | 91,048 s     | 518 ms         |
| [Squarespace](https://www.squarespace.com/)                                               | 163,470    | 83,977 s     | 514 ms         |
| [PIXNET](https://www.pixnet.net/)                                                         | 113,430    | 70,177 s     | 619 ms         |
| [Twitter](https://twitter.com)                                                            | 535,642    | 69,190 s     | 129 ms         |
| [jQuery CDN](https://code.jquery.com/)                                                    | 343,212    | 67,062 s     | 195 ms         |
| [Hatena Blog](https://hatenablog.com/)                                                    | 102,990    | 62,680 s     | 609 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 219,769    | 60,094 s     | 273 ms         |
| [WordPress](https://wp.com/)                                                              | 267,613    | 50,940 s     | 190 ms         |
| [Weebly](https://www.weebly.com/)                                                         | 69,962     | 39,402 s     | 563 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                                 | 13,015     | 37,128 s     | 2853 ms        |
| [Tumblr](https://tumblr.com/)                                                             | 49,240     | 35,194 s     | 715 ms         |
| [Moat](https://moat.com/)                                                                 | 41,664     | 34,732 s     | 834 ms         |
| [Tawk.to](https://www.tawk.to/)                                                           | 108,512    | 34,118 s     | 314 ms         |
| [Vimeo](http://vimeo.com/)                                                                | 70,542     | 33,641 s     | 477 ms         |
| [AMP](https://amp.dev/)                                                                   | 133,133    | 32,887 s     | 247 ms         |
| [Criteo](https://www.criteo.com/)                                                         | 178,755    | 28,095 s     | 157 ms         |
| [Sumo](https://sumo.com/)                                                                 | 86,955     | 27,982 s     | 322 ms         |
| [Blogger](http://www.blogger.com/)                                                        | 69,145     | 27,950 s     | 404 ms         |
| [Yandex APIs](https://yandex.ru/)                                                         | 24,628     | 27,215 s     | 1105 ms        |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 62,677     | 27,041 s     | 431 ms         |
| [Hotjar](https://www.hotjar.com/)                                                         | 286,465    | 25,950 s     | 91 ms          |
| [Pubmatic](https://pubmatic.com/)                                                         | 239,535    | 25,544 s     | 107 ms         |
| [Wistia](https://wistia.com/)                                                             | 44,577     | 23,321 s     | 523 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 64,286     | 22,848 s     | 355 ms         |
| [Jivochat](https://www.jivochat.com/)                                                     | 61,315     | 21,637 s     | 353 ms         |
| [ShareThis](https://www.sharethis.com/)                                                   | 88,885     | 20,692 s     | 233 ms         |
| [Wicked Reports](https://www.wickedreports.com/)                                          | 640        | 19,323 s     | 30193 ms       |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 74,192     | 18,054 s     | 243 ms         |
| [AppNexus](https://www.appnexus.com/)                                                     | 55,728     | 16,496 s     | 296 ms         |
| [Dealer](https://www.dealer.com/)                                                         | 51,793     | 15,445 s     | 298 ms         |
| [LiveChat](https://www.livechatinc.com/)                                                  | 53,109     | 13,371 s     | 252 ms         |
| [Intercom](https://www.intercom.com)                                                      | 35,357     | 13,155 s     | 372 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                                      | 93,048     | 13,084 s     | 141 ms         |
| [Stripe](https://stripe.com)                                                              | 40,199     | 12,856 s     | 320 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 56,240     | 12,847 s     | 228 ms         |
| [WordAds](https://wordads.co/)                                                            | 47,149     | 12,510 s     | 265 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 80,948     | 12,399 s     | 153 ms         |
| Mapbox                                                                                    | 9,933      | 11,619 s     | 1170 ms        |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 24,094     | 11,457 s     | 476 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                                 | 9,418      | 11,073 s     | 1176 ms        |
| LiveJournal                                                                               | 10,451     | 11,050 s     | 1057 ms        |
| Bigcommerce                                                                               | 25,497     | 10,772 s     | 422 ms         |
| Datacamp                                                                                  | 26,376     | 10,763 s     | 408 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                             | 25,251     | 10,751 s     | 426 ms         |
| StickyADS.tv                                                                              | 7,693      | 10,713 s     | 1393 ms        |
| [Drift](https://www.drift.com/)                                                           | 29,364     | 10,674 s     | 364 ms         |
| [Bridgewell DSP](https://www.bridgewell.com/)                                             | 72,535     | 10,270 s     | 142 ms         |
| [PureCars](https://www.purecars.com/)                                                     | 5,103      | 10,010 s     | 1962 ms        |
| [PayPal](https://paypal.com)                                                              | 30,278     | 9,792 s      | 323 ms         |
| [Taboola](https://www.taboola.com/)                                                       | 43,546     | 9,708 s      | 223 ms         |
| [GoDaddy](https://www.godaddy.com/)                                                       | 25,895     | 9,552 s      | 369 ms         |
| [Histats](http://histats.com/)                                                            | 28,082     | 9,475 s      | 337 ms         |
| [Sentry](https://sentry.io/)                                                              | 21,759     | 9,243 s      | 425 ms         |
| [Olark](https://www.olark.com/)                                                           | 24,902     | 9,089 s      | 365 ms         |
| [Media.net](https://www.media.net/)                                                       | 53,308     | 8,955 s      | 168 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                              | 12,629     | 8,801 s      | 697 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 27,866     | 8,411 s      | 302 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 17,453     | 8,390 s      | 481 ms         |
| [Mailchimp](https://mailchimp.com/)                                                       | 51,011     | 7,942 s      | 156 ms         |
| [Tealium](https://tealium.com/)                                                           | 30,953     | 7,813 s      | 252 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 9,106      | 7,810 s      | 858 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                            | 64,786     | 7,785 s      | 120 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 15,254     | 7,647 s      | 501 ms         |
| Monotype                                                                                  | 10,906     | 7,535 s      | 691 ms         |
| [Optimizely](https://www.optimizely.com/)                                                 | 24,691     | 7,527 s      | 305 ms         |
| Esri ArcGIS                                                                               | 4,593      | 7,459 s      | 1624 ms        |
| [Hubspot](https://hubspot.com/)                                                           | 52,412     | 7,329 s      | 140 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                                        | 21,147     | 7,281 s      | 344 ms         |
| [Snapchat](https://www.snapchat.com)                                                      | 16,476     | 7,038 s      | 427 ms         |
| Adform                                                                                    | 37,341     | 6,739 s      | 180 ms         |
| [fam](http://admin.fam-ad.com/report/)                                                    | 5,032      | 6,670 s      | 1325 ms        |
| Privy                                                                                     | 24,476     | 6,606 s      | 270 ms         |
| [Akamai](https://www.akamai.com/)                                                         | 24,867     | 6,456 s      | 260 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 22,192     | 6,064 s      | 273 ms         |
| [MediaVine](https://www.mediavine.com/)                                                   | 14,060     | 6,025 s      | 429 ms         |
| Rambler                                                                                   | 17,774     | 5,960 s      | 335 ms         |
| [Yahoo!](https://www.yahoo.com/)                                                          | 42,141     | 5,872 s      | 139 ms         |
| [33 Across](https://33across.com/)                                                        | 16,956     | 5,723 s      | 338 ms         |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 17,081     | 5,628 s      | 329 ms         |
| [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 5,333      | 5,598 s      | 1050 ms        |
| uLogin                                                                                    | 4,862      | 5,538 s      | 1139 ms        |
| Klaviyo                                                                                   | 21,188     | 5,477 s      | 258 ms         |
| [Yotpo](https://www.yotpo.com/)                                                           | 24,868     | 5,360 s      | 216 ms         |
| Skimbit                                                                                   | 37,640     | 5,270 s      | 140 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                                  | 56,910     | 5,174 s      | 91 ms          |
| Trust Pilot                                                                               | 30,441     | 5,078 s      | 167 ms         |
| [Sizmek](https://www.sizmek.com/)                                                         | 13,924     | 5,032 s      | 361 ms         |
| [Beeketing](https://beeketing.com/)                                                       | 46,576     | 4,972 s      | 107 ms         |
| LKQD                                                                                      | 4,733      | 4,961 s      | 1048 ms        |
| AB Tasty                                                                                  | 6,661      | 4,876 s      | 732 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 31,774     | 4,731 s      | 149 ms         |
| [MGID](https://www.mgid.com/)                                                             | 18,885     | 4,703 s      | 249 ms         |
| Inspectlet                                                                                | 11,796     | 4,667 s      | 396 ms         |
| [Ensighten](https://www.ensighten.com/)                                                   | 14,717     | 4,561 s      | 310 ms         |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 1,422      | 4,460 s      | 3136 ms        |
| [Amazon Pay](https://pay.amazon.com)                                                      | 27,030     | 4,215 s      | 156 ms         |
| Tynt                                                                                      | 52,237     | 4,184 s      | 80 ms          |
| [OptinMonster](https://optinmonster.com/)                                                 | 16,882     | 4,104 s      | 243 ms         |
| Embedly                                                                                   | 8,268      | 4,038 s      | 488 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 37,633     | 3,950 s      | 105 ms         |
| VigLink                                                                                   | 16,444     | 3,910 s      | 238 ms         |
| [Segment](https://segment.com/)                                                           | 19,443     | 3,731 s      | 192 ms         |
| [LinkedIn](https://www.linkedin.com/)                                                     | 33,425     | 3,690 s      | 110 ms         |
| [OpenX](https://www.openx.com/)                                                           | 13,508     | 3,596 s      | 266 ms         |
| Micropat                                                                                  | 48,427     | 3,583 s      | 74 ms          |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 28,656     | 3,500 s      | 122 ms         |
| BannerFlow                                                                                | 8,849      | 3,467 s      | 392 ms         |
| Azure Web Services                                                                        | 13,035     | 3,429 s      | 263 ms         |
| [Pinterest](https://pinterest.com/)                                                       | 31,567     | 3,377 s      | 107 ms         |
| [TrustArc](https://www.trustarc.com/)                                                     | 17,277     | 3,294 s      | 191 ms         |
| [OneSignal](https://onesignal.com/)                                                       | 40,889     | 3,245 s      | 79 ms          |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 27,003     | 3,219 s      | 119 ms         |
| [VK](https://vk.com/)                                                                     | 54,057     | 3,215 s      | 59 ms          |
| issuu                                                                                     | 6,457      | 3,169 s      | 491 ms         |
| [Parking Crew](http://parkingcrew.net/)                                                   | 6,550      | 3,165 s      | 483 ms         |
| [Disqus](http://disqus.com/)                                                              | 5,702      | 3,017 s      | 529 ms         |
| Blindado                                                                                  | 1,567      | 3,001 s      | 1915 ms        |
| Fastly                                                                                    | 9,893      | 2,987 s      | 302 ms         |
| LiveTex                                                                                   | 7,185      | 2,934 s      | 408 ms         |
| Bold Commerce                                                                             | 22,797     | 2,931 s      | 129 ms         |
| Teads                                                                                     | 16,806     | 2,887 s      | 172 ms         |
| AdMatic                                                                                   | 4,062      | 2,882 s      | 710 ms         |
| Simplicity Marketing                                                                      | 6,128      | 2,841 s      | 464 ms         |
| Dailymotion                                                                               | 5,365      | 2,782 s      | 519 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 24,220     | 2,688 s      | 111 ms         |
| FullStory                                                                                 | 12,228     | 2,674 s      | 219 ms         |
| [Instagram](https://www.instagram.com)                                                    | 18,393     | 2,638 s      | 143 ms         |
| [Spotify](https://www.spotify.com/)                                                       | 5,243      | 2,622 s      | 500 ms         |
| Evidon                                                                                    | 15,544     | 2,614 s      | 168 ms         |
| [Albacross](https://albacross.com/)                                                       | 3,842      | 2,609 s      | 679 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 2,788      | 2,441 s      | 875 ms         |
| Vidible                                                                                   | 4,406      | 2,418 s      | 549 ms         |
| iubenda                                                                                   | 26,534     | 2,323 s      | 88 ms          |
| [AdScore](https://www.adscore.com/)                                                       | 2,654      | 2,281 s      | 860 ms         |
| [ContactAtOnce](https://www.contactatonce.com/)                                           | 10,595     | 2,276 s      | 215 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 22,102     | 2,252 s      | 102 ms         |
| Ezoic                                                                                     | 7,870      | 2,217 s      | 282 ms         |
| Adloox                                                                                    | 7,979      | 2,199 s      | 276 ms         |
| [BrightTag / Signal](https://www.signal.co)                                               | 23,136     | 2,184 s      | 94 ms          |
| Kakao                                                                                     | 23,274     | 2,181 s      | 94 ms          |
| [Unpkg](https://unpkg.com)                                                                | 8,489      | 2,070 s      | 244 ms         |
| Mouseflow                                                                                 | 3,345      | 2,066 s      | 618 ms         |
| [Twitch](https://twitch.tv/)                                                              | 3,058      | 1,989 s      | 651 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 20,723     | 1,941 s      | 94 ms          |
| LongTail Ad Solutions                                                                     | 8,052      | 1,936 s      | 240 ms         |
| Microsoft Hosted Libs                                                                     | 11,263     | 1,866 s      | 166 ms         |
| LoyaltyLion                                                                               | 3,047      | 1,847 s      | 606 ms         |
| Infolinks                                                                                 | 7,283      | 1,806 s      | 248 ms         |
| [DigiTrust](http://www.digitru.st/)                                                       | 8,804      | 1,657 s      | 188 ms         |
| Cxense                                                                                    | 8,958      | 1,647 s      | 184 ms         |
| Dynamic Yield                                                                             | 2,637      | 1,640 s      | 622 ms         |
| Tribal Fusion                                                                             | 3,706      | 1,625 s      | 438 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 4,380      | 1,619 s      | 370 ms         |
| Kaltura Video Platform                                                                    | 1,634      | 1,605 s      | 982 ms         |
| GumGum                                                                                    | 5,832      | 1,601 s      | 275 ms         |
| Feefo.com                                                                                 | 4,355      | 1,596 s      | 367 ms         |
| Opta                                                                                      | 874        | 1,581 s      | 1809 ms        |
| [Keen](https://keen.io/)                                                                  | 5,043      | 1,567 s      | 311 ms         |
| Admixer for Publishers                                                                    | 3,289      | 1,557 s      | 473 ms         |
| [VWO](https://vwo.com)                                                                    | 11,885     | 1,552 s      | 131 ms         |
| CallRail                                                                                  | 13,947     | 1,481 s      | 106 ms         |
| District M                                                                                | 19,216     | 1,466 s      | 76 ms          |
| SessionCam                                                                                | 3,128      | 1,462 s      | 467 ms         |
| Gemius                                                                                    | 15,970     | 1,436 s      | 90 ms          |
| Okas Concepts                                                                             | 1,903      | 1,402 s      | 737 ms         |
| iBillboard                                                                                | 3,754      | 1,307 s      | 348 ms         |
| sovrn                                                                                     | 7,038      | 1,291 s      | 184 ms         |
| [Intent Media](https://intent.com/)                                                       | 4,506      | 1,290 s      | 286 ms         |
| IBM Digital Analytics                                                                     | 1,812      | 1,285 s      | 709 ms         |
| Index Exchange                                                                            | 6,240      | 1,282 s      | 206 ms         |
| Bazaarvoice                                                                               | 4,825      | 1,278 s      | 265 ms         |
| Gigya                                                                                     | 7,027      | 1,248 s      | 178 ms         |
| SocialShopWave                                                                            | 2,855      | 1,238 s      | 434 ms         |
| Yieldify                                                                                  | 1,835      | 1,224 s      | 667 ms         |
| WebpageFX                                                                                 | 911        | 1,215 s      | 1334 ms        |
| StatCounter                                                                               | 16,374     | 1,183 s      | 72 ms          |
| SnapWidget                                                                                | 7,989      | 1,171 s      | 147 ms         |
| Pure Chat                                                                                 | 8,189      | 1,170 s      | 143 ms         |
| [Supership](https://supership.jp/)                                                        | 1,128      | 1,167 s      | 1034 ms        |
| Yieldmo                                                                                   | 3,013      | 1,147 s      | 381 ms         |
| Adnium                                                                                    | 3,882      | 1,127 s      | 290 ms         |
| DTSCOUT                                                                                   | 10,470     | 1,121 s      | 107 ms         |
| Dataxu                                                                                    | 11,295     | 1,100 s      | 97 ms          |
| [New Relic](https://newrelic.com/)                                                        | 11,813     | 1,099 s      | 93 ms          |
| Medium                                                                                    | 4,756      | 1,091 s      | 229 ms         |
| [Help Scout](https://www.helpscout.net/)                                                  | 2,884      | 1,088 s      | 377 ms         |
| Pardot                                                                                    | 2,500      | 1,080 s      | 432 ms         |
| Bugsnag                                                                                   | 2,323      | 1,072 s      | 461 ms         |
| [Mixpanel](https://mixpanel.com/)                                                         | 13,179     | 1,053 s      | 80 ms          |
| Chartbeat                                                                                 | 13,104     | 1,048 s      | 80 ms          |
| [LivePerson](https://www.liveperson.com/)                                                 | 9,838      | 1,016 s      | 103 ms         |
| Secomapp                                                                                  | 2,606      | 1,010 s      | 387 ms         |
| Revolver Maps                                                                             | 1,558      | 1,003 s      | 644 ms         |
| SmartAdServer                                                                             | 5,903      | 998 s        | 169 ms         |
| Meetrics                                                                                  | 1,623      | 944 s        | 582 ms         |
| Fort Awesome                                                                              | 1,774      | 942 s        | 531 ms         |
| Ve                                                                                        | 6,509      | 941 s        | 145 ms         |
| Marchex                                                                                   | 8,566      | 936 s        | 109 ms         |
| Neodata                                                                                   | 2,708      | 932 s        | 344 ms         |
| Sekindo                                                                                   | 413        | 926 s        | 2242 ms        |
| [RevJet](https://www.revjet.com/)                                                         | 5,763      | 924 s        | 160 ms         |
| Ecwid                                                                                     | 1,811      | 899 s        | 496 ms         |
| One by AOL                                                                                | 3,525      | 898 s        | 255 ms         |
| Digital ad Consortium                                                                     | 5,737      | 871 s        | 152 ms         |
| Seznam                                                                                    | 3,966      | 870 s        | 219 ms         |
| [Popads](https://www.popads.net/)                                                         | 7,435      | 870 s        | 117 ms         |
| BlueKai                                                                                   | 11,372     | 857 s        | 75 ms          |
| Pixlee                                                                                    | 1,588      | 850 s        | 535 ms         |
| Booking.com                                                                               | 5,723      | 842 s        | 147 ms         |
| [Shareaholic](https://www.shareaholic.com/)                                               | 9,532      | 839 s        | 88 ms          |
| Digioh                                                                                    | 2,150      | 839 s        | 390 ms         |
| ForeSee                                                                                   | 4,507      | 833 s        | 185 ms         |
| MaxCDN Enterprise                                                                         | 5,000      | 831 s        | 166 ms         |
| [Outbrain](https://www.outbrain.com/)                                                     | 9,003      | 805 s        | 89 ms          |
| OpenTable                                                                                 | 5,458      | 792 s        | 145 ms         |
| Treasure Data                                                                             | 11,283     | 791 s        | 70 ms          |
| Cedato                                                                                    | 551        | 776 s        | 1409 ms        |
| Net Reviews                                                                               | 5,520      | 748 s        | 136 ms         |
| TrafficStars                                                                              | 3,973      | 741 s        | 186 ms         |
| Clicktale                                                                                 | 3,814      | 738 s        | 193 ms         |
| Audience 360                                                                              | 800        | 725 s        | 906 ms         |
| Nosto                                                                                     | 5,112      | 724 s        | 142 ms         |
| Between Digital                                                                           | 2,337      | 710 s        | 304 ms         |
| TrackJS                                                                                   | 1,660      | 703 s        | 423 ms         |
| TINT                                                                                      | 695        | 697 s        | 1003 ms        |
| Parse.ly                                                                                  | 6,259      | 696 s        | 111 ms         |
| ResponsiveVoice                                                                           | 2,296      | 694 s        | 302 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                                | 6,077      | 693 s        | 114 ms         |
| Affirm                                                                                    | 2,742      | 688 s        | 251 ms         |
| GitHub                                                                                    | 2,469      | 685 s        | 278 ms         |
| Ooyala                                                                                    | 1,360      | 683 s        | 502 ms         |
| LeasdBoxer                                                                                | 229        | 663 s        | 2894 ms        |
| Hola Networks                                                                             | 428        | 654 s        | 1528 ms        |
| [WordPress Site Stats](https://wp.com/)                                                   | 10,174     | 653 s        | 64 ms          |
| PushCrew                                                                                  | 7,655      | 649 s        | 85 ms          |
| [Vidyard](https://www.vidyard.com/)                                                       | 1,532      | 646 s        | 422 ms         |
| UserReport                                                                                | 2,659      | 646 s        | 243 ms         |
| [Yandex CDN](https://yandex.ru/)                                                          | 3,636      | 639 s        | 176 ms         |
| [Adroll](https://www.adroll.com/)                                                         | 5,475      | 616 s        | 112 ms         |
| Wishpond Technologies                                                                     | 1,363      | 608 s        | 446 ms         |
| JuicyAds                                                                                  | 4,980      | 605 s        | 121 ms         |
| MailMunch                                                                                 | 9,263      | 599 s        | 65 ms          |
| [Market GID](https://www.marketgid.com/)                                                  | 2,072      | 596 s        | 288 ms         |
| Maxymiser                                                                                 | 2,539      | 593 s        | 234 ms         |
| Smart AdServer                                                                            | 4,855      | 586 s        | 121 ms         |
| Unbounce                                                                                  | 5,583      | 581 s        | 104 ms         |
| [AOL / Oath / Verizon Media](https://www.oath.com/)                                       | 3,688      | 578 s        | 157 ms         |
| Sortable                                                                                  | 2,729      | 573 s        | 210 ms         |
| [Media Math](http://www.mediamath.com/)                                                   | 3,427      | 555 s        | 162 ms         |
| Zmags                                                                                     | 395        | 551 s        | 1396 ms        |
| [Verizon Digital Media CDN](https://www.verizondigitalmedia.com/)                         | 722        | 548 s        | 759 ms         |
| Auto Link Maker                                                                           | 2,421      | 539 s        | 223 ms         |
| Media Management Technologies                                                             | 1,349      | 532 s        | 395 ms         |
| ThreatMetrix                                                                              | 558        | 526 s        | 943 ms         |
| FreakOut                                                                                  | 7,279      | 524 s        | 72 ms          |
| iAdvize SAS                                                                               | 3,652      | 523 s        | 143 ms         |
| [Quantcast](https://www.quantcast.com)                                                    | 6,563      | 514 s        | 78 ms          |
| Clicktripz                                                                                | 6,194      | 512 s        | 83 ms          |
| Signyfyd                                                                                  | 504        | 508 s        | 1007 ms        |
| Sharethrough                                                                              | 4,307      | 506 s        | 118 ms         |
| [Polar](https://polar.me/)                                                                | 1,353      | 502 s        | 371 ms         |
| Sift Science                                                                              | 3,432      | 501 s        | 146 ms         |
| Swiftype                                                                                  | 2,941      | 497 s        | 169 ms         |
| piano                                                                                     | 1,739      | 497 s        | 286 ms         |
| [Quantum Metric](https://www.quantummetric.com/)                                          | 684        | 495 s        | 723 ms         |
| Branch Metrics                                                                            | 2,076      | 470 s        | 226 ms         |
| PerimeterX Bot Defender                                                                   | 582        | 467 s        | 803 ms         |
| Decibel Insight                                                                           | 1,116      | 462 s        | 414 ms         |
| Experian Cross-Channel Marketing Platform                                                 | 276        | 462 s        | 1673 ms        |
| Pagely                                                                                    | 1,828      | 459 s        | 251 ms         |
| Adverline Board                                                                           | 2,345      | 452 s        | 193 ms         |
| Adocean                                                                                   | 2,378      | 447 s        | 188 ms         |
| Po.st                                                                                     | 2,418      | 446 s        | 185 ms         |
| Technorati                                                                                | 1,091      | 445 s        | 408 ms         |
| Mobify                                                                                    | 442        | 442 s        | 999 ms         |
| Reviews.co.uk                                                                             | 1,197      | 440 s        | 367 ms         |
| Gleam                                                                                     | 878        | 439 s        | 500 ms         |
| [AppDynamics](https://www.appdynamics.com/)                                               | 3,118      | 429 s        | 137 ms         |
| Perfect Market                                                                            | 1,829      | 425 s        | 232 ms         |
| TripAdvisor                                                                               | 805        | 420 s        | 522 ms         |
| [BounceX](https://www.bouncex.com/)                                                       | 2,744      | 411 s        | 150 ms         |
| iPerceptions                                                                              | 4,165      | 410 s        | 98 ms          |
| Opentag                                                                                   | 1,987      | 408 s        | 205 ms         |
| Stackla PTY                                                                               | 1,307      | 407 s        | 311 ms         |
| Clerk.io ApS                                                                              | 1,678      | 407 s        | 242 ms         |
| infogr.am                                                                                 | 295        | 402 s        | 1362 ms        |
| Amplitude Mobile Analytics                                                                | 5,400      | 398 s        | 74 ms          |
| Touch Commerce                                                                            | 418        | 394 s        | 943 ms         |
| Rackspace                                                                                 | 1,381      | 392 s        | 284 ms         |
| etracker                                                                                  | 3,877      | 389 s        | 100 ms         |
| Crowd Control                                                                             | 4,505      | 382 s        | 85 ms          |
| Expedia                                                                                   | 889        | 382 s        | 430 ms         |
| SearchSpring                                                                              | 858        | 380 s        | 443 ms         |
| ShopiMind                                                                                 | 614        | 380 s        | 619 ms         |
| [Vox Media](https://www.voxmedia.com/)                                                    | 1,431      | 380 s        | 265 ms         |
| [Marketo](https://www.marketo.com)                                                        | 2,516      | 377 s        | 150 ms         |
| Comm100                                                                                   | 3,177      | 377 s        | 119 ms         |
| LightWidget                                                                               | 5,623      | 367 s        | 65 ms          |
| Searchanise                                                                               | 4,750      | 356 s        | 75 ms          |
| Fraudlogix                                                                                | 1,641      | 354 s        | 216 ms         |
| GetIntent RTBSuite                                                                        | 593        | 352 s        | 594 ms         |
| OptiMonk                                                                                  | 2,755      | 348 s        | 126 ms         |
| SpotXchange                                                                               | 789        | 344 s        | 436 ms         |
| MonetizeMore                                                                              | 279        | 338 s        | 1212 ms        |
| Snacktools                                                                                | 1,598      | 337 s        | 211 ms         |
| LoopMe                                                                                    | 906        | 337 s        | 372 ms         |
| TagCommander                                                                              | 2,803      | 334 s        | 119 ms         |
| StreamRail                                                                                | 399        | 334 s        | 836 ms         |
| Roxr Software                                                                             | 4,804      | 333 s        | 69 ms          |
| Qubit Deliver                                                                             | 768        | 332 s        | 432 ms         |
| Heap                                                                                      | 4,211      | 328 s        | 78 ms          |
| IPONWEB                                                                                   | 1,728      | 328 s        | 190 ms         |
| Connatix                                                                                  | 402        | 321 s        | 799 ms         |
| Forensiq                                                                                  | 2,038      | 313 s        | 154 ms         |
| GetSiteControl                                                                            | 3,473      | 299 s        | 86 ms          |
| eBay                                                                                      | 1,585      | 296 s        | 187 ms         |
| Monetate                                                                                  | 1,932      | 295 s        | 153 ms         |
| Celtra                                                                                    | 1,384      | 292 s        | 211 ms         |
| Siteimprove                                                                               | 3,278      | 290 s        | 89 ms          |
| Tencent                                                                                   | 2,445      | 286 s        | 117 ms         |
| Bizible                                                                                   | 2,050      | 284 s        | 139 ms         |
| fluct                                                                                     | 4,240      | 271 s        | 64 ms          |
| Global-e                                                                                  | 876        | 269 s        | 307 ms         |
| Refersion                                                                                 | 2,484      | 268 s        | 108 ms         |
| Convert Insights                                                                          | 1,968      | 267 s        | 136 ms         |
| [Listrak](https://www.listrak.com/)                                                       | 2,153      | 267 s        | 124 ms         |
| FirstImpression                                                                           | 587        | 259 s        | 441 ms         |
| AvantLink                                                                                 | 315        | 255 s        | 809 ms         |
| Mather Economics                                                                          | 1,496      | 253 s        | 169 ms         |
| Constant Contact                                                                          | 3,036      | 252 s        | 83 ms          |
| [RD Station](https://www.rdstation.com/en/)                                               | 3,542      | 250 s        | 71 ms          |
| Fanplayr                                                                                  | 373        | 250 s        | 671 ms         |
| ContentSquare                                                                             | 2,288      | 250 s        | 109 ms         |
| WisePops                                                                                  | 1,062      | 248 s        | 234 ms         |
| Gfycat                                                                                    | 314        | 245 s        | 779 ms         |
| Skype                                                                                     | 1,705      | 243 s        | 143 ms         |
| Calendly                                                                                  | 722        | 240 s        | 332 ms         |
| ExoClick                                                                                  | 4,263      | 239 s        | 56 ms          |
| Moovweb                                                                                   | 160        | 238 s        | 1487 ms        |
| Curalate                                                                                  | 796        | 233 s        | 292 ms         |
| [24]7                                                                                     | 395        | 229 s        | 579 ms         |
| Rakuten Marketing                                                                         | 2,977      | 228 s        | 77 ms          |
| iovation                                                                                  | 2,215      | 228 s        | 103 ms         |
| Adtech (AOL)                                                                              | 781        | 226 s        | 290 ms         |
| Evergage                                                                                  | 974        | 226 s        | 232 ms         |
| Smarter Click                                                                             | 1,093      | 226 s        | 207 ms         |
| Apester                                                                                   | 641        | 223 s        | 348 ms         |
| Kampyle                                                                                   | 1,360      | 222 s        | 163 ms         |
| Flowplayer                                                                                | 839        | 220 s        | 262 ms         |
| GIPHY                                                                                     | 452        | 218 s        | 483 ms         |
| Shopgate                                                                                  | 1,228      | 218 s        | 178 ms         |
| Knight Lab                                                                                | 280        | 217 s        | 776 ms         |
| PowerReviews                                                                              | 1,342      | 216 s        | 161 ms         |
| Foursixty                                                                                 | 2,510      | 215 s        | 86 ms          |
| Bronto Software                                                                           | 1,864      | 213 s        | 115 ms         |
| Accuweather                                                                               | 3,088      | 212 s        | 69 ms          |
| Bootstrap Chinese network                                                                 | 822        | 209 s        | 255 ms         |
| [mParticle](https://www.mparticle.com/)                                                   | 450        | 207 s        | 461 ms         |
| Conversant                                                                                | 583        | 206 s        | 353 ms         |
| Adyoulike                                                                                 | 2,750      | 204 s        | 74 ms          |
| ZEDO                                                                                      | 710        | 203 s        | 285 ms         |
| AddEvent                                                                                  | 1,395      | 200 s        | 143 ms         |
| CPEx                                                                                      | 1,759      | 199 s        | 113 ms         |
| [DMD Marketing](https://www.dmdconnects.com/)                                             | 1,311      | 198 s        | 151 ms         |
| Flickr                                                                                    | 580        | 196 s        | 338 ms         |
| Cloudinary                                                                                | 1,043      | 196 s        | 188 ms         |
| Marketplace Web Service                                                                   | 675        | 192 s        | 284 ms         |
| [Auth0](https://auth0.com/)                                                               | 489        | 184 s        | 377 ms         |
| Interpublic Group                                                                         | 937        | 184 s        | 197 ms         |
| Symantec                                                                                  | 2,348      | 182 s        | 78 ms          |
| Yottaa                                                                                    | 505        | 182 s        | 361 ms         |
| Reviews.io                                                                                | 361        | 180 s        | 499 ms         |
| plista                                                                                    | 1,488      | 173 s        | 116 ms         |
| TRUSTe                                                                                    | 1,917      | 172 s        | 90 ms          |
| WebEngage                                                                                 | 1,277      | 172 s        | 134 ms         |
| Tail Target                                                                               | 2,217      | 169 s        | 76 ms          |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                            | 2,849      | 168 s        | 59 ms          |
| DialogTech                                                                                | 1,751      | 165 s        | 94 ms          |
| Janrain                                                                                   | 246        | 164 s        | 665 ms         |
| Lytics                                                                                    | 1,255      | 161 s        | 128 ms         |
| Intercept Interactive                                                                     | 952        | 160 s        | 168 ms         |
| Better Business Bureau                                                                    | 193        | 159 s        | 823 ms         |
| Adkontekst                                                                                | 815        | 158 s        | 194 ms         |
| Key CDN                                                                                   | 508        | 155 s        | 305 ms         |
| [Usabilla](https://usabilla.com)                                                          | 1,611      | 155 s        | 96 ms          |
| WalkMe                                                                                    | 634        | 154 s        | 244 ms         |
| TubeMogul                                                                                 | 500        | 152 s        | 305 ms         |
| Zanox                                                                                     | 971        | 152 s        | 157 ms         |
| AdSniper                                                                                  | 453        | 152 s        | 335 ms         |
| Underdog Media                                                                            | 545        | 151 s        | 278 ms         |
| Survicate                                                                                 | 1,142      | 151 s        | 133 ms         |
| [Optanon](https://www.cookielaw.org/)                                                     | 1,931      | 151 s        | 78 ms          |
| smartclip                                                                                 | 866        | 151 s        | 174 ms         |
| Chitika                                                                                   | 711        | 150 s        | 211 ms         |
| Livefyre                                                                                  | 569        | 150 s        | 264 ms         |
| Sidecar                                                                                   | 602        | 150 s        | 249 ms         |
| Trusted Shops                                                                             | 3,829      | 150 s        | 39 ms          |
| eXelate                                                                                   | 476        | 148 s        | 311 ms         |
| AudienceSearch                                                                            | 1,355      | 147 s        | 108 ms         |
| Time                                                                                      | 446        | 147 s        | 329 ms         |
| AddShoppers                                                                               | 1,100      | 147 s        | 133 ms         |
| PERFORM                                                                                   | 383        | 145 s        | 379 ms         |
| Permutive                                                                                 | 1,172      | 145 s        | 124 ms         |
| Investis                                                                                  | 113        | 144 s        | 1275 ms        |
| ReTargeter                                                                                | 410        | 143 s        | 349 ms         |
| OwnerIQ                                                                                   | 1,476      | 143 s        | 97 ms          |
| Highcharts                                                                                | 816        | 142 s        | 174 ms         |
| Revcontent                                                                                | 1,233      | 141 s        | 115 ms         |
| rewardStyle.com                                                                           | 1,165      | 141 s        | 121 ms         |
| Github                                                                                    | 1,115      | 139 s        | 125 ms         |
| Smart Insight Tracking                                                                    | 1,467      | 135 s        | 92 ms          |
| The Hut Group                                                                             | 802        | 134 s        | 167 ms         |
| Reevoo                                                                                    | 641        | 134 s        | 209 ms         |
| SnapEngage                                                                                | 2,138      | 133 s        | 62 ms          |
| Picreel                                                                                   | 1,042      | 133 s        | 128 ms         |
| FoxyCart                                                                                  | 652        | 133 s        | 204 ms         |
| Glassdoor                                                                                 | 100        | 132 s        | 1325 ms        |
| [Freshdesk](https://freshdesk.com/)                                                       | 862        | 130 s        | 151 ms         |
| Adobe Test & Target                                                                       | 366        | 130 s        | 355 ms         |
| [Alexa](https://www.alexa.com/)                                                           | 2,350      | 130 s        | 55 ms          |
| GetResponse                                                                               | 1,535      | 129 s        | 84 ms          |
| Kameleoon                                                                                 | 303        | 128 s        | 424 ms         |
| White Ops                                                                                 | 490        | 128 s        | 262 ms         |
| [Concert](https://concert.io/)                                                            | 729        | 127 s        | 174 ms         |
| [Radar](https://www.cedexis.com/radar/)                                                   | 1,357      | 126 s        | 93 ms          |
| Affiliate Window                                                                          | 1,849      | 125 s        | 68 ms          |
| ShopRunner                                                                                | 289        | 123 s        | 427 ms         |
| BoldChat                                                                                  | 982        | 123 s        | 125 ms         |
| Best Of Media S.A.                                                                        | 405        | 121 s        | 299 ms         |
| Simpli.fi                                                                                 | 747        | 119 s        | 160 ms         |
| Rocket Fuel                                                                               | 1,322      | 118 s        | 89 ms          |
| C3 Metrics                                                                                | 609        | 118 s        | 193 ms         |
| PlayAd Media Group                                                                        | 355        | 116 s        | 326 ms         |
| WebSpectator                                                                              | 677        | 115 s        | 170 ms         |
| unpkg                                                                                     | 588        | 115 s        | 195 ms         |
| Autopilot                                                                                 | 1,314      | 114 s        | 87 ms          |
| RebelMouse                                                                                | 112        | 112 s        | 999 ms         |
| Sajari Pty                                                                                | 472        | 111 s        | 234 ms         |
| Elastic Ad                                                                                | 1,762      | 110 s        | 63 ms          |
| [F@N Communications](https://www.fancs.com/)                                              | 1,216      | 110 s        | 90 ms          |
| Arbor                                                                                     | 637        | 108 s        | 170 ms         |
| Madison Logic                                                                             | 1,260      | 108 s        | 86 ms          |
| Covert Pics                                                                               | 1,021      | 108 s        | 106 ms         |
| Unruly Media                                                                              | 825        | 107 s        | 129 ms         |
| Weborama                                                                                  | 725        | 105 s        | 145 ms         |
| Nativo                                                                                    | 1,140      | 105 s        | 92 ms          |
| LinkedIn Ads                                                                              | 1,220      | 105 s        | 86 ms          |
| Onet                                                                                      | 220        | 104 s        | 474 ms         |
| AdsWizz                                                                                   | 301        | 104 s        | 345 ms         |
| Adobe Scene7                                                                              | 1,234      | 103 s        | 83 ms          |
| Geniee                                                                                    | 1,256      | 102 s        | 81 ms          |
| Sparkflow                                                                                 | 854        | 101 s        | 118 ms         |
| Kaizen Platform                                                                           | 502        | 99 s         | 197 ms         |
| TripleLift                                                                                | 354        | 99 s         | 279 ms         |
| [iZooto](https://www.izooto.com)                                                          | 1,400      | 98 s         | 70 ms          |
| [The Trade Desk](https://www.thetradedesk.com/)                                           | 1,142      | 98 s         | 86 ms          |
| Playbuzz                                                                                  | 450        | 98 s         | 217 ms         |
| Heroku                                                                                    | 396        | 97 s         | 244 ms         |
| Forter                                                                                    | 166        | 94 s         | 568 ms         |
| Tradelab                                                                                  | 1,240      | 93 s         | 75 ms          |
| Ambassador                                                                                | 414        | 93 s         | 225 ms         |
| Adthink                                                                                   | 262        | 93 s         | 355 ms         |
| ClickDesk                                                                                 | 1,234      | 92 s         | 75 ms          |
| InSkin Media                                                                              | 195        | 92 s         | 472 ms         |
| Edge Web Fonts                                                                            | 620        | 91 s         | 147 ms         |
| [Adition](https://www.adition.com)                                                        | 781        | 91 s         | 116 ms         |
| Reflektion                                                                                | 316        | 87 s         | 275 ms         |
| Effective Measure                                                                         | 1,024      | 87 s         | 85 ms          |
| CleverDATA                                                                                | 1,197      | 86 s         | 71 ms          |
| Typepad                                                                                   | 544        | 85 s         | 157 ms         |
| Adscale                                                                                   | 832        | 83 s         | 100 ms         |
| Profitshare                                                                               | 596        | 83 s         | 140 ms         |
| Republer                                                                                  | 908        | 82 s         | 90 ms          |
| Socialphotos                                                                              | 444        | 81 s         | 183 ms         |
| Keywee                                                                                    | 490        | 80 s         | 164 ms         |
| SkyScanner                                                                                | 272        | 79 s         | 291 ms         |
| [ReadSpeaker](https://www.readspeaker.com)                                                | 749        | 79 s         | 105 ms         |
| Mediahawk                                                                                 | 276        | 78 s         | 284 ms         |
| TruConversion                                                                             | 496        | 77 s         | 156 ms         |
| Kargo                                                                                     | 145        | 77 s         | 533 ms         |
| Transifex                                                                                 | 297        | 77 s         | 258 ms         |
| Triblio                                                                                   | 185        | 77 s         | 414 ms         |
| SpringServer                                                                              | 200        | 76 s         | 379 ms         |
| Appier                                                                                    | 842        | 75 s         | 89 ms          |
| Qualaroo                                                                                  | 928        | 75 s         | 80 ms          |
| Riskified                                                                                 | 1,038      | 74 s         | 71 ms          |
| NetFlix                                                                                   | 834        | 74 s         | 89 ms          |
| ReCollect                                                                                 | 150        | 73 s         | 489 ms         |
| MLveda                                                                                    | 171        | 73 s         | 424 ms         |
| SaleCycle                                                                                 | 990        | 72 s         | 72 ms          |
| SurveyMonkey                                                                              | 484        | 71 s         | 146 ms         |
| Dynamic Converter                                                                         | 188        | 69 s         | 366 ms         |
| FuelX                                                                                     | 352        | 69 s         | 195 ms         |
| News                                                                                      | 330        | 68 s         | 207 ms         |
| Nend                                                                                      | 1,713      | 68 s         | 40 ms          |
| BlueCava                                                                                  | 208        | 68 s         | 325 ms         |
| Talkable                                                                                  | 677        | 67 s         | 100 ms         |
| Omniconvert                                                                               | 738        | 67 s         | 90 ms          |
| Sooqr Search                                                                              | 880        | 65 s         | 74 ms          |
| Tagboard                                                                                  | 273        | 65 s         | 237 ms         |
| Fresh Relevance                                                                           | 768        | 64 s         | 84 ms          |
| [Moxie](https://www.gomoxie.com/)                                                         | 203        | 64 s         | 315 ms         |
| LiveHelpNow                                                                               | 697        | 63 s         | 91 ms          |
| [InAuth](https://www.inauth.com/)                                                         | 170        | 63 s         | 370 ms         |
| Vee24                                                                                     | 202        | 63 s         | 311 ms         |
| Petametrics                                                                               | 428        | 63 s         | 146 ms         |
| [Pusher](https://pusher.com/)                                                             | 289        | 62 s         | 216 ms         |
| Kiosked                                                                                   | 126        | 62 s         | 493 ms         |
| Viacom                                                                                    | 360        | 62 s         | 172 ms         |
| JustPremium Ads                                                                           | 686        | 62 s         | 90 ms          |
| Conversant Tag Manager                                                                    | 312        | 61 s         | 197 ms         |
| Pixalate                                                                                  | 354        | 60 s         | 170 ms         |
| Opinion Stage                                                                             | 483        | 58 s         | 121 ms         |
| User Replay                                                                               | 162        | 57 s         | 351 ms         |
| Dropbox                                                                                   | 112        | 57 s         | 506 ms         |
| Postcode Anywhere (Holdings)                                                              | 319        | 56 s         | 177 ms         |
| [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)                       | 947        | 56 s         | 59 ms          |
| Steelhouse                                                                                | 629        | 56 s         | 89 ms          |
| reEmbed                                                                                   | 306        | 55 s         | 180 ms         |
| Resonance Insights                                                                        | 244        | 55 s         | 225 ms         |
| Aggregate Knowledge                                                                       | 200        | 55 s         | 274 ms         |
| DemandBase                                                                                | 660        | 54 s         | 82 ms          |
| FLXone                                                                                    | 324        | 54 s         | 166 ms         |
| VoiceFive                                                                                 | 589        | 53 s         | 91 ms          |
| KISSmetrics                                                                               | 766        | 53 s         | 69 ms          |
| Feedbackify                                                                               | 617        | 52 s         | 85 ms          |
| [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)                    | 236        | 51 s         | 216 ms         |
| [Innovid](https://www.innovid.com/)                                                       | 132        | 51 s         | 385 ms         |
| SublimeSkinz                                                                              | 834        | 50 s         | 60 ms          |
| CNET Content Solutions                                                                    | 142        | 50 s         | 349 ms         |
| Zolando                                                                                   | 112        | 49 s         | 436 ms         |
| [Ipify](https://www.ipify.org)                                                            | 472        | 49 s         | 103 ms         |
| [Connexity](http://connexity.com/)                                                        | 114        | 48 s         | 418 ms         |
| [Attentive](https://attentivemobile.com/)                                                 | 555        | 48 s         | 86 ms          |
| Advance Magazine Group                                                                    | 382        | 47 s         | 123 ms         |
| [Widespace](https://www.widespace.com)                                                    | 359        | 46 s         | 128 ms         |
| Customer.io                                                                               | 382        | 46 s         | 119 ms         |
| Performio                                                                                 | 335        | 45 s         | 136 ms         |
| Council ad Network                                                                        | 356        | 45 s         | 126 ms         |
| linkpulse                                                                                 | 618        | 45 s         | 73 ms          |
| Google Plus                                                                               | 497        | 44 s         | 89 ms          |
| Zarget                                                                                    | 418        | 43 s         | 103 ms         |
| Accordant Media                                                                           | 489        | 42 s         | 86 ms          |
| Sirv                                                                                      | 430        | 42 s         | 97 ms          |
| Alliance for Audited Media                                                                | 166        | 41 s         | 249 ms         |
| Snack Media                                                                               | 249        | 41 s         | 164 ms         |
| TechTarget                                                                                | 170        | 41 s         | 239 ms         |
| Ad6Media                                                                                  | 162        | 40 s         | 247 ms         |
| United Internet                                                                           | 118        | 40 s         | 336 ms         |
| Proper Media                                                                              | 218        | 39 s         | 181 ms         |
| Wow Analytics                                                                             | 242        | 39 s         | 162 ms         |
| MaxMind                                                                                   | 288        | 39 s         | 136 ms         |
| fifty-five                                                                                | 254        | 39 s         | 152 ms         |
| Silverpop                                                                                 | 526        | 38 s         | 73 ms          |
| Sweet Tooth                                                                               | 422        | 38 s         | 90 ms          |
| Reklama                                                                                   | 109        | 38 s         | 350 ms         |
| Vergic AB                                                                                 | 166        | 38 s         | 229 ms         |
| Highwinds                                                                                 | 105        | 38 s         | 361 ms         |
| SlimCut Media Outstream                                                                   | 256        | 38 s         | 148 ms         |
| Salesforce.com                                                                            | 534        | 37 s         | 69 ms          |
| Delta Projects AB                                                                         | 555        | 37 s         | 67 ms          |
| VidPulse                                                                                  | 172        | 37 s         | 214 ms         |
| AWeber                                                                                    | 318        | 35 s         | 111 ms         |
| epoq internet services                                                                    | 342        | 35 s         | 103 ms         |
| Borderfree                                                                                | 130        | 34 s         | 261 ms         |
| bRealTime                                                                                 | 233        | 33 s         | 144 ms         |
| NetAffiliation                                                                            | 354        | 33 s         | 93 ms          |
| Hull.js                                                                                   | 208        | 33 s         | 158 ms         |
| Bookatable                                                                                | 304        | 33 s         | 108 ms         |
| Storygize                                                                                 | 216        | 32 s         | 150 ms         |
| PebblePost                                                                                | 128        | 32 s         | 253 ms         |
| Hupso Website Analyzer                                                                    | 487        | 32 s         | 66 ms          |
| AdsNative                                                                                 | 304        | 32 s         | 105 ms         |
| ResponseTap                                                                               | 441        | 32 s         | 72 ms          |
| AdvertServe                                                                               | 247        | 31 s         | 126 ms         |
| AdTrue                                                                                    | 400        | 31 s         | 77 ms          |
| The Publisher Desk                                                                        | 125        | 30 s         | 243 ms         |
| Vergic Engage Platform                                                                    | 134        | 30 s         | 226 ms         |
| The ADEX                                                                                  | 470        | 30 s         | 64 ms          |
| [TrafficJunky](https://www.trafficjunky.com/)                                             | 28         | 29 s         | 1047 ms        |
| Fonecall                                                                                  | 149        | 29 s         | 195 ms         |
| [Byside](http://www.byside.com)                                                           | 192        | 29 s         | 151 ms         |
| AdRiver                                                                                   | 194        | 29 s         | 149 ms         |
| LoginRadius                                                                               | 160        | 29 s         | 180 ms         |
| Impact Radius                                                                             | 300        | 28 s         | 94 ms          |
| Conversio                                                                                 | 362        | 28 s         | 78 ms          |
| Infinity Tracking                                                                         | 311        | 28 s         | 90 ms          |
| Ceros                                                                                     | 111        | 28 s         | 250 ms         |
| Civic                                                                                     | 436        | 28 s         | 63 ms          |
| Datawrapper                                                                               | 154        | 28 s         | 179 ms         |
| Drip                                                                                      | 578        | 27 s         | 47 ms          |
| Meltwater Group                                                                           | 150        | 27 s         | 182 ms         |
| [Iterate](https://iteratehq.com/)                                                         | 114        | 27 s         | 238 ms         |
| Rakuten LinkShare                                                                         | 212        | 27 s         | 127 ms         |
| Klevu Search                                                                              | 416        | 26 s         | 64 ms          |
| Prezi                                                                                     | 196        | 26 s         | 134 ms         |
| Exactag                                                                                   | 254        | 26 s         | 102 ms         |
| Raygun                                                                                    | 211        | 26 s         | 122 ms         |
| Betgenius                                                                                 | 270        | 26 s         | 95 ms          |
| AdSpruce                                                                                  | 104        | 25 s         | 245 ms         |
| Cookie-Script.com                                                                         | 279        | 25 s         | 90 ms          |
| cloudIQ                                                                                   | 241        | 25 s         | 104 ms         |
| HP Optimost                                                                               | 70         | 25 s         | 356 ms         |
| PowerFront                                                                                | 120        | 24 s         | 203 ms         |
| [Acceptable Ads](https://acceptableads.com/)                                              | 222        | 24 s         | 109 ms         |
| CyberSource (Visa)                                                                        | 359        | 24 s         | 67 ms          |
| Woopra                                                                                    | 339        | 24 s         | 71 ms          |
| Sourcepoint                                                                               | 120        | 24 s         | 196 ms         |
| Navegg                                                                                    | 372        | 23 s         | 61 ms          |
| Mopinion                                                                                  | 190        | 23 s         | 120 ms         |
| Adobe Marketing Cloud                                                                     | 276        | 22 s         | 81 ms          |
| Flockler                                                                                  | 160        | 22 s         | 139 ms         |
| Vibrant Media                                                                             | 275        | 22 s         | 80 ms          |
| Vertical Mass                                                                             | 134        | 22 s         | 163 ms         |
| [GoSquared](https://www.gosquared.com)                                                    | 277        | 22 s         | 78 ms          |
| VisScore                                                                                  | 318        | 21 s         | 68 ms          |
| AnswerDash                                                                                | 223        | 21 s         | 96 ms          |
| DemandJump                                                                                | 128        | 21 s         | 165 ms         |
| Admitad                                                                                   | 288        | 21 s         | 72 ms          |
| Datonics                                                                                  | 284        | 21 s         | 73 ms          |
| RichRelevance                                                                             | 116        | 20 s         | 177 ms         |
| CANDDi                                                                                    | 186        | 20 s         | 108 ms         |
| Polyfill service                                                                          | 120        | 20 s         | 167 ms         |
| Ekm Systems                                                                               | 238        | 19 s         | 82 ms          |
| Cookie Reports                                                                            | 200        | 19 s         | 94 ms          |
| Friendbuy                                                                                 | 222        | 19 s         | 83 ms          |
| SecuredVisit                                                                              | 264        | 18 s         | 69 ms          |
| Twitter Online Conversion Tracking                                                        | 219        | 18 s         | 83 ms          |
| HotelsCombined                                                                            | 136        | 18 s         | 132 ms         |
| Extole                                                                                    | 146        | 18 s         | 122 ms         |
| Oracle Recommendations On Demand                                                          | 212        | 18 s         | 84 ms          |
| Freespee                                                                                  | 205        | 18 s         | 86 ms          |
| Reactful                                                                                  | 168        | 18 s         | 104 ms         |
| Elecard StreamEye                                                                         | 128        | 17 s         | 134 ms         |
| Braintree Payments                                                                        | 161        | 17 s         | 106 ms         |
| Scoota                                                                                    | 94         | 16 s         | 175 ms         |
| CleverTap                                                                                 | 186        | 16 s         | 88 ms          |
| Cross Pixel Media                                                                         | 114        | 16 s         | 142 ms         |
| Optimove                                                                                  | 162        | 16 s         | 99 ms          |
| [Netlify](https://www.netlify.com/)                                                       | 220        | 16 s         | 71 ms          |
| Barilliance                                                                               | 148        | 15 s         | 103 ms         |
| Exponential Interactive                                                                   | 329        | 15 s         | 46 ms          |
| Remintrex                                                                                 | 186        | 15 s         | 81 ms          |
| Web Dissector                                                                             | 113        | 15 s         | 133 ms         |
| Cachefly                                                                                  | 130        | 15 s         | 115 ms         |
| Spot.IM                                                                                   | 100        | 15 s         | 148 ms         |
| OnScroll                                                                                  | 126        | 14 s         | 114 ms         |
| UPS i-parcel                                                                              | 110        | 14 s         | 131 ms         |
| Attribution                                                                               | 186        | 14 s         | 76 ms          |
| Exponea                                                                                   | 199        | 14 s         | 70 ms          |
| AdSupply                                                                                  | 118        | 13 s         | 113 ms         |
| Video Media Groep                                                                         | 131        | 13 s         | 101 ms         |
| AIR.TV                                                                                    | 197        | 13 s         | 67 ms          |
| content.ad                                                                                | 129        | 13 s         | 101 ms         |
| Bet365                                                                                    | 140        | 13 s         | 92 ms          |
| Site24x7 Real User Monitoring                                                             | 174        | 12 s         | 71 ms          |
| RightNow Service Cloud                                                                    | 122        | 12 s         | 100 ms         |
| Ziff Davis Tech                                                                           | 180        | 12 s         | 68 ms          |
| [TurnTo](https://www.turntonetworks.com/)                                                 | 115        | 12 s         | 103 ms         |
| Adunity                                                                                   | 103        | 12 s         | 114 ms         |
| Swoop                                                                                     | 166        | 12 s         | 70 ms          |
| Browser-Update.org                                                                        | 186        | 11 s         | 61 ms          |
| Boomtrain                                                                                 | 148        | 11 s         | 74 ms          |
| Ghostery Enterprise                                                                       | 129        | 11 s         | 85 ms          |
| Microad                                                                                   | 136        | 11 s         | 79 ms          |
| ShopStorm                                                                                 | 132        | 11 s         | 81 ms          |
| Sailthru                                                                                  | 184        | 10 s         | 57 ms          |
| NaviStone                                                                                 | 116        | 10 s         | 89 ms          |
| Tag Inspector                                                                             | 115        | 10 s         | 89 ms          |
| StumbleUpon                                                                               | 106        | 10 s         | 94 ms          |
| Channel.me                                                                                | 83         | 10 s         | 118 ms         |
| Wufoo                                                                                     | 148        | 10 s         | 66 ms          |
| Hawk Search                                                                               | 141        | 9 s          | 64 ms          |
| Bluecore                                                                                  | 112        | 9 s          | 80 ms          |
| UpSellit                                                                                  | 105        | 9 s          | 86 ms          |
| [emetriq](https://www.emetriq.com/)                                                       | 157        | 8 s          | 54 ms          |
| MailPlus                                                                                  | 116        | 8 s          | 72 ms          |
| [Bidswitch](https://www.bidswitch.com/)                                                   | 118        | 8 s          | 65 ms          |
| Realytics                                                                                 | 108        | 8 s          | 70 ms          |
| [Catchpoint](https://www.catchpoint.com/)                                                 | 144        | 7 s          | 49 ms          |
| Sonobi                                                                                    | 39         | 7 s          | 172 ms         |
| DialogTech SourceTrak                                                                     | 116        | 7 s          | 57 ms          |
| Intilery                                                                                  | 102        | 6 s          | 63 ms          |
| Polldaddy                                                                                 | 75         | 6 s          | 85 ms          |
| Flipboard                                                                                 | 112        | 6 s          | 55 ms          |
| Improve Digital                                                                           | 46         | 6 s          | 126 ms         |
| Qualtrics                                                                                 | 46         | 6 s          | 123 ms         |
| JustUno                                                                                   | 328        | 6 s          | 17 ms          |
| Webtrends                                                                                 | 29         | 6 s          | 190 ms         |
| MathJax                                                                                   | 46         | 4 s          | 98 ms          |
| [Xaxis](https://www.xaxis.com/)                                                           | 44         | 4 s          | 80 ms          |
| ConvertMedia                                                                              | 45         | 3 s          | 76 ms          |
| ARM                                                                                       | 29         | 3 s          | 117 ms         |
| Research Online                                                                           | 43         | 3 s          | 75 ms          |
| DistroScale                                                                               | 43         | 3 s          | 74 ms          |
| StackExchange                                                                             | 42         | 3 s          | 76 ms          |
| StackAdapt                                                                                | 35         | 3 s          | 90 ms          |
| eGain                                                                                     | 41         | 3 s          | 75 ms          |
| Soundest                                                                                  | 44         | 3 s          | 66 ms          |
| YoYo                                                                                      | 24         | 3 s          | 116 ms         |
| BuySellAds                                                                                | 42         | 3 s          | 66 ms          |
| Sociomantic Labs                                                                          | 46         | 3 s          | 58 ms          |
| AdCurve                                                                                   | 38         | 3 s          | 67 ms          |
| Nanorep                                                                                   | 33         | 3 s          | 78 ms          |
| Webtrekk                                                                                  | 24         | 2 s          | 100 ms         |
| AliveChat                                                                                 | 38         | 2 s          | 57 ms          |
| Click4Assistance                                                                          | 27         | 2 s          | 77 ms          |
| Fastest Forward                                                                           | 33         | 2 s          | 57 ms          |
| Pagefair                                                                                  | 35         | 2 s          | 53 ms          |
| [Fastly Insights](https://insights.fastlylabs.com)                                        | 23         | 1 s          | 64 ms          |
| PrintFriendly                                                                             | 28         | 1 s          | 49 ms          |
| PhotoBucket                                                                               | 15         | 1 s          | 89 ms          |
| Eyeota                                                                                    | 15         | 1 s          | 75 ms          |
| Pictela (AOL)                                                                             | 3          | 1 s          | 367 ms         |
| ContextWeb                                                                                | 14         | 1 s          | 74 ms          |
| Vindico                                                                                   | 4          | 1 s          | 190 ms         |
| Captify Media                                                                             | 8          | 0 s          | 60 ms          |
| Intent IQ                                                                                 | 4          | 0 s          | 68 ms          |
| [Freshchat](https://www.freshworks.com/live-chat-software/)                               | 2          | 0 s          | 57 ms          |
| PubNation                                                                                 | 2          | 0 s          | 55 ms          |

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

1.  Edit `bootup-time-scripting.partial.sql` to query the correct month's HTTPArchive run.
2.  Run `origin-query.generated.sql` in BigQuery.
3.  Download the results and check them in at `data/YYYY-MM-DD-origin-scripting.json`.
4.  Run `yarn build` to regenerate the latest canonical domain mapping.
5.  Create a new table in `lighthouse-infrastructure.third_party_web` BigQuery table of the format `YYYY_MM_DD` with the csv in `dist/domain-map.csv` with three columns `domain`, `canonicalDomain`, and `category`.
6.  Edit `bootup-time-scripting.partial.sql` to join on the table you just created.
7.  Run `yarn build` to regenerate the queries.
8.  Run `entity-per-page.generated.sql` in BigQuery.
9.  Download the results and check them in at `data/YYYY-MM-DD-entity-scripting.json`.

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
