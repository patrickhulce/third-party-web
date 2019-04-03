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
const { getEntity } = require("third-party-web");
const entity = getEntity("https://d36mpcpuzc4ztk.cloudfront.net/js/visitor.js");
console.log(entity);
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

## Data

### Summary

Across top ~1 million sites, ~800 origins account for ~65% of all script execution time with the top 100 entities already accounting for ~59%. Third party script execution is the majority chunk of the web today, and it's important to make informed choices.

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

Unsurprisingly, ads account for the largest identifiable chunk of third party script execution. Other balloons as a category primarily due to Google Tag Manager which is used to deliver scripts in multiple categories. Google Tag Manager script execution alone is responsible for more than half of the "Mixed / Other" category.

![breakdown by category](./by-category.png)

<a name="ad"></a>

#### Advertising

These scripts are part of advertising networks, either serving or measuring.

| Rank | Name                                                           | Usage     | Average Impact |
| ---- | -------------------------------------------------------------- | --------- | -------------- |
| 1    | ExoClick                                                       | 2,714     | 34 ms          |
| 2    | Nend                                                           | 945       | 42 ms          |
| 3    | Drip                                                           | 204       | 48 ms          |
| 4    | Exponential Interactive                                        | 201       | 53 ms          |
| 5    | Tribal Fusion                                                  | 1,082     | 54 ms          |
| 6    | Delta Projects AB                                              | 128       | 59 ms          |
| 7    | FreakOut                                                       | 147       | 64 ms          |
| 8    | Twitter Online Conversion Tracking                             | 135       | 64 ms          |
| 9    | SublimeSkinz                                                   | 407       | 65 ms          |
| 10   | Friendbuy                                                      | 140       | 66 ms          |
| 11   | DialogTech SourceTrak                                          | 169       | 66 ms          |
| 12   | AWeber                                                         | 147       | 67 ms          |
| 13   | Branch Metrics                                                 | 730       | 68 ms          |
| 14   | Gemius                                                         | 6,998     | 69 ms          |
| 15   | Pagefair                                                       | 144       | 70 ms          |
| 16   | BlueKai                                                        | 2,548     | 71 ms          |
| 17   | Aggregate Knowledge                                            | 246       | 72 ms          |
| 18   | SecuredVisit                                                   | 136       | 72 ms          |
| 19   | Affiliate Window                                               | 911       | 74 ms          |
| 20   | Crowd Control                                                  | 2,553     | 74 ms          |
| 21   | Impact Radius                                                  | 138       | 75 ms          |
| 22   | Tradelab                                                       | 699       | 75 ms          |
| 23   | The ADEX                                                       | 636       | 76 ms          |
| 24   | Swoop                                                          | 133       | 76 ms          |
| 25   | MailMunch                                                      | 4,315     | 77 ms          |
| 26   | Adscale                                                        | 799       | 78 ms          |
| 27   | SaleCycle                                                      | 447       | 78 ms          |
| 28   | fluct                                                          | 6,732     | 79 ms          |
| 29   | Neodata                                                        | 429       | 79 ms          |
| 30   | BannerFlow                                                     | 222       | 80 ms          |
| 31   | Talkable                                                       | 153       | 80 ms          |
| 32   | Weborama                                                       | 441       | 80 ms          |
| 33   | Geniee                                                         | 2,226     | 81 ms          |
| 34   | Tail Target                                                    | 852       | 81 ms          |
| 35   | Rakuten Marketing                                              | 1,540     | 83 ms          |
| 36   | Navegg                                                         | 559       | 84 ms          |
| 37   | Simpli.fi                                                      | 147       | 85 ms          |
| 38   | OnScroll                                                       | 145       | 85 ms          |
| 39   | Appier                                                         | 347       | 85 ms          |
| 40   | Auto Link Maker                                                | 111       | 87 ms          |
| 41   | DialogTech                                                     | 266       | 87 ms          |
| 42   | Adobe Marketing Cloud                                          | 141       | 87 ms          |
| 43   | Ziff Davis Tech                                                | 126       | 87 ms          |
| 44   | GetResponse                                                    | 699       | 88 ms          |
| 45   | PubNation                                                      | 2,499     | 88 ms          |
| 46   | Republer                                                       | 756       | 90 ms          |
| 47   | eXelate                                                        | 263       | 91 ms          |
| 48   | Accordant Media                                                | 196       | 92 ms          |
| 49   | Effective Measure                                              | 620       | 93 ms          |
| 50   | Nativo                                                         | 562       | 94 ms          |
| 51   | [Scorecard Research](https://www.scorecardresearch.com/)       | 9,088     | 94 ms          |
| 52   | Elastic Ad                                                     | 506       | 95 ms          |
| 53   | Unbounce                                                       | 2,338     | 95 ms          |
| 54   | Vibrant Media                                                  | 153       | 101 ms         |
| 55   | Constant Contact                                               | 1,251     | 101 ms         |
| 56   | PushCrew                                                       | 3,335     | 101 ms         |
| 57   | Video Media Groep                                              | 110       | 102 ms         |
| 58   | SlimCut Media Outstream                                        | 130       | 102 ms         |
| 59   | SmartAdServer                                                  | 1,776     | 102 ms         |
| 60   | Unruly Media                                                   | 273       | 102 ms         |
| 61   | Refersion                                                      | 830       | 102 ms         |
| 62   | rewardStyle.com                                                | 590       | 105 ms         |
| 63   | AdRiver                                                        | 113       | 106 ms         |
| 64   | [Rubicon Project](https://rubiconproject.com/)                 | 3,011     | 107 ms         |
| 65   | [Amazon Ads](https://ad.amazon.com/)                           | 24,660    | 108 ms         |
| 66   | Steelhouse                                                     | 296       | 108 ms         |
| 67   | Sweet Tooth                                                    | 131       | 108 ms         |
| 68   | Customer.io                                                    | 150       | 108 ms         |
| 69   | OwnerIQ                                                        | 1,541     | 110 ms         |
| 70   | [Adroll](https://www.adroll.com/)                              | 3,119     | 111 ms         |
| 71   | Exactag                                                        | 129       | 111 ms         |
| 72   | TripleLift                                                     | 349       | 111 ms         |
| 73   | Intercept Interactive                                          | 284       | 113 ms         |
| 74   | OptiMonk                                                       | 930       | 113 ms         |
| 75   | Bizible                                                        | 795       | 115 ms         |
| 76   | Zanox                                                          | 370       | 115 ms         |
| 77   | NetAffiliation                                                 | 212       | 116 ms         |
| 78   | Captify Media                                                  | 292       | 116 ms         |
| 79   | Digital ad Consortium                                          | 3,777     | 117 ms         |
| 80   | AudienceSearch                                                 | 4,389     | 117 ms         |
| 81   | Smart AdServer                                                 | 3,223     | 121 ms         |
| 82   | plista                                                         | 681       | 121 ms         |
| 83   | TrafficStars                                                   | 1,093     | 122 ms         |
| 84   | Lytics                                                         | 556       | 126 ms         |
| 85   | Profitshare                                                    | 386       | 129 ms         |
| 86   | Ambassador                                                     | 204       | 130 ms         |
| 87   | DTSCOUT                                                        | 7,417     | 130 ms         |
| 88   | FLXone                                                         | 164       | 132 ms         |
| 89   | Technorati                                                     | 814       | 133 ms         |
| 90   | Permutive                                                      | 499       | 134 ms         |
| 91   | JustPremium Ads                                                | 459       | 135 ms         |
| 92   | Adyoulike                                                      | 696       | 136 ms         |
| 93   | Adocean                                                        | 1,319     | 136 ms         |
| 94   | Adverline Board                                                | 1,307     | 137 ms         |
| 95   | [The Trade Desk](https://www.thetradedesk.com/)                | 213       | 137 ms         |
| 96   | [Yahoo!](https://www.yahoo.com/)                               | 3,830     | 138 ms         |
| 97   | [Criteo](https://www.criteo.com/)                              | 66,114    | 139 ms         |
| 98   | fifty-five                                                     | 225       | 145 ms         |
| 99   | Skimbit                                                        | 15,074    | 146 ms         |
| 100  | Microad                                                        | 1,328     | 149 ms         |
| 101  | One by AOL                                                     | 801       | 149 ms         |
| 102  | Chitika                                                        | 1,010     | 150 ms         |
| 103  | IPONWEB                                                        | 929       | 151 ms         |
| 104  | Cxense                                                         | 3,773     | 153 ms         |
| 105  | Cross Pixel Media                                              | 479       | 153 ms         |
| 106  | JustUno                                                        | 1,944     | 154 ms         |
| 107  | Tynt                                                           | 25,583    | 154 ms         |
| 108  | Adform                                                         | 9,062     | 155 ms         |
| 109  | Rocket Fuel                                                    | 5,755     | 161 ms         |
| 110  | [MGID](https://www.mgid.com/)                                  | 10,481    | 161 ms         |
| 111  | JuicyAds                                                       | 2,935     | 163 ms         |
| 112  | [Bing Ads](https://bingads.microsoft.com)                      | 13,332    | 167 ms         |
| 113  | eBay                                                           | 615       | 169 ms         |
| 114  | Sharethrough                                                   | 2,195     | 170 ms         |
| 115  | sovrn                                                          | 5,371     | 172 ms         |
| 116  | [Pubmatic](https://pubmatic.com/)                              | 6,439     | 173 ms         |
| 117  | Extole                                                         | 105       | 174 ms         |
| 118  | Klaviyo                                                        | 7,677     | 181 ms         |
| 119  | Adkontekst                                                     | 384       | 182 ms         |
| 120  | Teads                                                          | 6,589     | 187 ms         |
| 121  | [Market GID](https://www.marketgid.com/)                       | 3,124     | 190 ms         |
| 122  | Polar Mobile Group                                             | 497       | 192 ms         |
| 123  | Keywee                                                         | 269       | 192 ms         |
| 124  | Index Exchange                                                 | 3,336     | 196 ms         |
| 125  | WebSpectator                                                   | 218       | 198 ms         |
| 126  | [Taboola](https://www.taboola.com/)                            | 25,671    | 200 ms         |
| 127  | Interpublic Group                                              | 486       | 202 ms         |
| 128  | LongTail Ad Solutions                                          | 2,789     | 203 ms         |
| 129  | Smarter Click                                                  | 477       | 214 ms         |
| 130  | SpotXchange                                                    | 593       | 218 ms         |
| 131  | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 1,165,800 | 221 ms         |
| 132  | Adnium                                                         | 432       | 237 ms         |
| 133  | AdSniper                                                       | 123       | 242 ms         |
| 134  | Sparkflow                                                      | 317       | 243 ms         |
| 135  | Snacktools                                                     | 296       | 248 ms         |
| 136  | Sortable                                                       | 1,028     | 252 ms         |
| 137  | [WordAds](https://wordads.co/)                                 | 33,392    | 252 ms         |
| 138  | ZEDO                                                           | 401       | 254 ms         |
| 139  | [Yandex Ads](https://yandex.com/adv/)                          | 38,205    | 266 ms         |
| 140  | iBillboard                                                     | 3,258     | 272 ms         |
| 141  | Admixer for Publishers                                         | 2,597     | 280 ms         |
| 142  | Perfect Market                                                 | 781       | 295 ms         |
| 143  | ReTargeter                                                     | 223       | 296 ms         |
| 144  | [AppNexus](https://www.appnexus.com/)                          | 14,926    | 308 ms         |
| 145  | Adloox                                                         | 122       | 314 ms         |
| 146  | [Sizmek](https://www.sizmek.com/)                              | 3,935     | 321 ms         |
| 147  | VigLink                                                        | 5,806     | 325 ms         |
| 148  | Ooyala                                                         | 657       | 329 ms         |
| 149  | Adthink                                                        | 219       | 329 ms         |
| 150  | Privy                                                          | 9,952     | 329 ms         |
| 151  | Digioh                                                         | 844       | 333 ms         |
| 152  | [Media.net](https://www.media.net/)                            | 11,818    | 334 ms         |
| 153  | Celtra                                                         | 565       | 339 ms         |
| 154  | Yieldify                                                       | 723       | 346 ms         |
| 155  | piano                                                          | 698       | 348 ms         |
| 156  | Media Management Technologies                                  | 533       | 358 ms         |
| 157  | Onet                                                           | 109       | 364 ms         |
| 158  | [Integral Ad Science](https://integralads.com/uk/)             | 25,277    | 368 ms         |
| 159  | LoopMe                                                         | 441       | 375 ms         |
| 160  | [Media Math](http://www.mediamath.com/)                        | 633       | 402 ms         |
| 161  | bRealTime                                                      | 105       | 408 ms         |
| 162  | SpringServer                                                   | 103       | 425 ms         |
| 163  | FirstImpression                                                | 278       | 428 ms         |
| 164  | smartclip                                                      | 367       | 465 ms         |
| 165  | [MediaVine](https://www.mediavine.com/)                        | 9,768     | 520 ms         |
| 166  | Infolinks                                                      | 4,090     | 524 ms         |
| 167  | [DoubleVerify](https://www.doubleverify.com/)                  | 4,033     | 537 ms         |
| 168  | Meetrics                                                       | 881       | 575 ms         |
| 169  | GumGum                                                         | 4,172     | 589 ms         |
| 170  | Between Digital                                                | 1,107     | 600 ms         |
| 171  | StreamRail                                                     | 127       | 644 ms         |
| 172  | ShopiMind                                                      | 310       | 674 ms         |
| 173  | Underdog Media                                                 | 367       | 674 ms         |
| 174  | [Popads](https://www.popads.net/)                              | 4,548     | 681 ms         |
| 175  | Vidible                                                        | 1,566     | 746 ms         |
| 176  | [Moat](https://moat.com/)                                      | 18,342    | 756 ms         |
| 177  | AdMatic                                                        | 2,707     | 759 ms         |
| 178  | Adtech (AOL)                                                   | 509       | 828 ms         |
| 179  | AvantLink                                                      | 126       | 837 ms         |
| 180  | [33 Across](https://33across.com/)                             | 15,704    | 876 ms         |
| 181  | LKQD                                                           | 2,090     | 885 ms         |
| 182  | Connatix                                                       | 191       | 891 ms         |
| 183  | [OpenX](https://www.openx.com/)                                | 8,892     | 954 ms         |
| 184  | Audience 360                                                   | 413       | 1024 ms        |
| 185  | MonetizeMore                                                   | 109       | 1038 ms        |
| 186  | [fam](http://admin.fam-ad.com/report/)                         | 3,505     | 1086 ms        |
| 187  | WebpageFX                                                      | 329       | 1199 ms        |
| 188  | Yieldmo                                                        | 2,227     | 1235 ms        |
| 189  | StickyADS.tv                                                   | 2,010     | 1292 ms        |
| 190  | Cedato                                                         | 103       | 2159 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                   | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------- | --------- | -------------- |
| 1    | [Alexa](https://www.alexa.com/)                                        | 1,261     | 52 ms          |
| 2    | Sailthru                                                               | 127       | 58 ms          |
| 3    | Net Reviews                                                            | 1,893     | 59 ms          |
| 4    | [Fastly Insights](https://insights.fastlylabs.com)                     | 102       | 60 ms          |
| 5    | StatCounter                                                            | 4,693     | 60 ms          |
| 6    | Woopra                                                                 | 172       | 67 ms          |
| 7    | Amplitude Mobile Analytics                                             | 1,250     | 68 ms          |
| 8    | Hupso Website Analyzer                                                 | 251       | 70 ms          |
| 9    | etracker                                                               | 1,732     | 71 ms          |
| 10   | Roxr Software                                                          | 1,822     | 73 ms          |
| 11   | [GoSquared](https://www.gosquared.com)                                 | 192       | 73 ms          |
| 12   | [Usabilla](https://usabilla.com)                                       | 794       | 73 ms          |
| 13   | linkpulse                                                              | 332       | 74 ms          |
| 14   | Heap                                                                   | 1,859     | 75 ms          |
| 15   | KISSmetrics                                                            | 354       | 76 ms          |
| 16   | ResponseTap                                                            | 299       | 76 ms          |
| 17   | Trust Pilot                                                            | 2,741     | 77 ms          |
| 18   | [Google Analytics](https://www.google.com/analytics/analytics/)        | 1,082,088 | 78 ms          |
| 19   | [Mixpanel](https://mixpanel.com/)                                      | 4,908     | 79 ms          |
| 20   | Apester                                                                | 153       | 81 ms          |
| 21   | Opinion Stage                                                          | 140       | 81 ms          |
| 22   | Infinity Tracking                                                      | 151       | 82 ms          |
| 23   | Feedbackify                                                            | 300       | 83 ms          |
| 24   | CleverTap                                                              | 174       | 83 ms          |
| 25   | Fresh Relevance                                                        | 325       | 85 ms          |
| 26   | Searchanise                                                            | 2,459     | 88 ms          |
| 27   | Smart Insight Tracking                                                 | 794       | 89 ms          |
| 28   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)          | 8,169     | 91 ms          |
| 29   | [Hotjar](https://www.hotjar.com/)                                      | 95,852    | 95 ms          |
| 30   | Exponea                                                                | 298       | 95 ms          |
| 31   | Chartbeat                                                              | 6,959     | 96 ms          |
| 32   | [Marketo](https://www.marketo.com)                                     | 960       | 97 ms          |
| 33   | [VWO](https://vwo.com)                                                 | 6,352     | 102 ms         |
| 34   | Polldaddy                                                              | 150       | 103 ms         |
| 35   | [Quantcast](https://www.quantcast.com)                                 | 6,607     | 107 ms         |
| 36   | CallRail                                                               | 3,843     | 109 ms         |
| 37   | [Snowplow](https://snowplowanalytics.com/)                             | 3,615     | 110 ms         |
| 38   | Convert Insights                                                       | 917       | 112 ms         |
| 39   | Kampyle                                                                | 471       | 113 ms         |
| 40   | Parse.ly                                                               | 2,616     | 113 ms         |
| 41   | Marchex                                                                | 3,844     | 113 ms         |
| 42   | Nosto                                                                  | 2,973     | 114 ms         |
| 43   | [Crazy Egg](https://www.crazyegg.com/)                                 | 9,881     | 114 ms         |
| 44   | VoiceFive                                                              | 188       | 115 ms         |
| 45   | Omniconvert                                                            | 462       | 116 ms         |
| 46   | Zarget                                                                 | 216       | 118 ms         |
| 47   | Clicktale                                                              | 2,351     | 118 ms         |
| 48   | ForeSee                                                                | 2,612     | 124 ms         |
| 49   | Webtrekk                                                               | 189       | 127 ms         |
| 50   | [Byside](http://www.byside.com)                                        | 162       | 131 ms         |
| 51   | Treasure Data                                                          | 9,714     | 131 ms         |
| 52   | Monetate                                                               | 939       | 132 ms         |
| 53   | NetRatings SiteCensus                                                  | 15,441    | 141 ms         |
| 54   | Evidon                                                                 | 1,208     | 142 ms         |
| 55   | Petametrics                                                            | 223       | 149 ms         |
| 56   | Resonance Insights                                                     | 101       | 152 ms         |
| 57   | Clerk.io ApS                                                           | 736       | 159 ms         |
| 58   | Reevoo                                                                 | 374       | 161 ms         |
| 59   | Survicate                                                              | 515       | 166 ms         |
| 60   | Gigya                                                                  | 1,949     | 176 ms         |
| 61   | PowerReviews                                                           | 675       | 177 ms         |
| 62   | [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/) | 184       | 182 ms         |
| 63   | Kaizen Platform                                                        | 290       | 183 ms         |
| 64   | Bazaarvoice                                                            | 3,285     | 184 ms         |
| 65   | Picreel                                                                | 547       | 185 ms         |
| 66   | Mather Economics                                                       | 558       | 187 ms         |
| 67   | Maxymiser                                                              | 1,139     | 189 ms         |
| 68   | Bounce Exchange                                                        | 1,374     | 190 ms         |
| 69   | Reflektion                                                             | 198       | 195 ms         |
| 70   | [Segment](https://segment.com/)                                        | 6,940     | 198 ms         |
| 71   | TruConversion                                                          | 228       | 198 ms         |
| 72   | Yotpo                                                                  | 9,652     | 206 ms         |
| 73   | FullStory                                                              | 4,996     | 223 ms         |
| 74   | Evergage                                                               | 235       | 224 ms         |
| 75   | UserReport                                                             | 987       | 233 ms         |
| 76   | Ezoic                                                                  | 3,016     | 241 ms         |
| 77   | [Optimizely](https://www.optimizely.com/)                              | 13,098    | 249 ms         |
| 78   | Conversant                                                             | 129       | 249 ms         |
| 79   | Feefo.com                                                              | 2,218     | 251 ms         |
| 80   | [Tealium](https://tealium.com/)                                        | 15,237    | 267 ms         |
| 81   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)     | 36,481    | 300 ms         |
| 82   | [Radar](https://www.cedexis.com/radar/)                                | 4,912     | 303 ms         |
| 83   | Better Business Bureau                                                 | 177       | 311 ms         |
| 84   | [Yandex Metrica](https://metrica.yandex.com/about?)                    | 218,992   | 316 ms         |
| 85   | Inspectlet                                                             | 4,984     | 320 ms         |
| 86   | Keen IO                                                                | 2,382     | 373 ms         |
| 87   | SessionCam                                                             | 1,456     | 380 ms         |
| 88   | [Histats](http://histats.com/)                                         | 13,937    | 408 ms         |
| 89   | Decibel Insight                                                        | 521       | 417 ms         |
| 90   | TrackJS                                                                | 816       | 436 ms         |
| 91   | Qubit Deliver                                                          | 343       | 455 ms         |
| 92   | AB Tasty                                                               | 3,111     | 455 ms         |
| 93   | IBM Digital Analytics                                                  | 858       | 482 ms         |
| 94   | [mPulse](https://developer.akamai.com/akamai-mpulse)                   | 2,841     | 543 ms         |
| 95   | Pictela (AOL)                                                          | 785       | 550 ms         |
| 96   | Mouseflow                                                              | 1,391     | 569 ms         |
| 97   | Fanplayr                                                               | 144       | 754 ms         |
| 98   | [Lucky Orange](https://www.luckyorange.com/)                           | 5,987     | 872 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 6,380     | 69 ms          |
| 2    | Kakao                                                | 8,746     | 83 ms          |
| 3    | [Instagram](https://www.instagram.com)               | 5,167     | 85 ms          |
| 4    | Micropat                                             | 22,116    | 89 ms          |
| 5    | [Pinterest](https://pinterest.com/)                  | 15,097    | 102 ms         |
| 6    | Google Plus                                          | 599       | 109 ms         |
| 7    | AddShoppers                                          | 1,147     | 109 ms         |
| 8    | [Facebook](https://www.facebook.com)                 | 1,103,174 | 120 ms         |
| 9    | [LinkedIn](https://www.linkedin.com/)                | 12,119    | 122 ms         |
| 10   | [Yandex Share](https://yastatic.net/share2/share.js) | 30,092    | 133 ms         |
| 11   | [Twitter](https://twitter.com)                       | 260,919   | 147 ms         |
| 12   | Socialphotos                                         | 242       | 165 ms         |
| 13   | News                                                 | 182       | 203 ms         |
| 14   | Stackla PTY                                          | 537       | 224 ms         |
| 15   | [ShareThis](https://www.sharethis.com/)              | 31,606    | 246 ms         |
| 16   | [Shareaholic](https://www.shareaholic.com/)          | 15,606    | 253 ms         |
| 17   | [AddThis](http://www.addthis.com/)                   | 177,056   | 278 ms         |
| 18   | [Disqus](http://disqus.com/)                         | 1,376     | 298 ms         |
| 19   | [Tumblr](https://tumblr.com/)                        | 38,452    | 324 ms         |
| 20   | SocialShopWave                                       | 1,023     | 448 ms         |
| 21   | [PIXNET](https://www.pixnet.net/)                    | 48,564    | 544 ms         |
| 22   | Pixlee                                               | 337       | 630 ms         |
| 23   | LiveJournal                                          | 6,610     | 734 ms         |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage  | Average Impact |
| ---- | -------------------------------------------- | ------ | -------------- |
| 1    | [Vimeo](http://vimeo.com/)                   | 110    | 89 ms          |
| 2    | [YouTube](https://youtube.com)               | 25,349 | 150 ms         |
| 3    | [Wistia](https://wistia.com/)                | 20,701 | 272 ms         |
| 4    | [Brightcove](https://www.brightcove.com/en/) | 4,737  | 587 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Trusted Shops                                                             | 1,322   | 40 ms          |
| 2    | Klevu Search                                                              | 116     | 60 ms          |
| 3    | Symantec                                                                  | 1,246   | 69 ms          |
| 4    | [Stripe](https://stripe.com)                                              | 4,828   | 71 ms          |
| 5    | Riskified                                                                 | 438     | 72 ms          |
| 6    | [New Relic](https://newrelic.com/)                                        | 3,183   | 73 ms          |
| 7    | CyberSource (Visa)                                                        | 156     | 74 ms          |
| 8    | [OneSignal](https://onesignal.com/)                                       | 18,715  | 74 ms          |
| 9    | Sooqr Search                                                              | 408     | 76 ms          |
| 10   | LightWidget                                                               | 444     | 80 ms          |
| 11   | iubenda                                                                   | 9,614   | 83 ms          |
| 12   | GetSiteControl                                                            | 3,144   | 84 ms          |
| 13   | iovation                                                                  | 1,009   | 85 ms          |
| 14   | Siteimprove                                                               | 1,637   | 86 ms          |
| 15   | Github                                                                    | 426     | 88 ms          |
| 16   | TRUSTe                                                                    | 669     | 91 ms          |
| 17   | Highcharts                                                                | 281     | 115 ms         |
| 18   | [Google Maps](https://www.google.com/maps)                                | 247,910 | 119 ms         |
| 19   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 477,821 | 121 ms         |
| 20   | [AppDynamics](https://www.appdynamics.com/)                               | 1,841   | 123 ms         |
| 21   | Shopgate                                                                  | 772     | 127 ms         |
| 22   | Bold Commerce                                                             | 11,530  | 127 ms         |
| 23   | MaxMind                                                                   | 119     | 128 ms         |
| 24   | [Ipify](https://www.ipify.org)                                            | 133     | 131 ms         |
| 25   | Po.st                                                                     | 1,660   | 134 ms         |
| 26   | Sajari Pty                                                                | 202     | 135 ms         |
| 27   | Hull.js                                                                   | 117     | 142 ms         |
| 28   | Sift Science                                                              | 1,117   | 145 ms         |
| 29   | unpkg                                                                     | 215     | 164 ms         |
| 30   | MaxCDN Enterprise                                                         | 2,325   | 170 ms         |
| 31   | Seznam                                                                    | 1,424   | 173 ms         |
| 32   | Key CDN                                                                   | 170     | 175 ms         |
| 33   | Swiftype                                                                  | 1,300   | 177 ms         |
| 34   | Forensiq                                                                  | 419     | 185 ms         |
| 35   | Transifex                                                                 | 104     | 191 ms         |
| 36   | Fraudlogix                                                                | 974     | 209 ms         |
| 37   | Fastly                                                                    | 3,396   | 225 ms         |
| 38   | Postcode Anywhere (Holdings)                                              | 142     | 230 ms         |
| 39   | FoxyCart                                                                  | 281     | 233 ms         |
| 40   | WisePops                                                                  | 417     | 236 ms         |
| 41   | Affirm                                                                    | 1,067   | 245 ms         |
| 42   | Rambler                                                                   | 8,226   | 249 ms         |
| 43   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 5,861   | 254 ms         |
| 44   | GitHub                                                                    | 828     | 260 ms         |
| 45   | Pixalate                                                                  | 327     | 286 ms         |
| 46   | Mobify                                                                    | 327     | 316 ms         |
| 47   | [PayPal](https://paypal.com)                                              | 6,948   | 325 ms         |
| 48   | Secomapp                                                                  | 1,062   | 341 ms         |
| 49   | CDN.net                                                                   | 113     | 368 ms         |
| 50   | SearchSpring                                                              | 529     | 385 ms         |
| 51   | [Yandex APIs](https://yandex.ru/)                                         | 53,493  | 393 ms         |
| 52   | Datacamp                                                                  | 10,609  | 425 ms         |
| 53   | [Distil Networks](https://www.distilnetworks.com/)                        | 10,392  | 445 ms         |
| 54   | Bugsnag                                                                   | 769     | 448 ms         |
| 55   | Cachefly                                                                  | 139     | 502 ms         |
| 56   | [Sentry](https://sentry.io/)                                              | 14,388  | 515 ms         |
| 57   | Okas Concepts                                                             | 1,109   | 573 ms         |
| 58   | Signyfyd                                                                  | 233     | 835 ms         |
| 59   | ThreatMetrix                                                              | 184     | 858 ms         |
| 60   | PerimeterX Bot Defender                                                   | 209     | 997 ms         |
| 61   | Esri ArcGIS                                                               | 731     | 1070 ms        |
| 62   | Mapbox                                                                    | 2,558   | 1215 ms        |
| 63   | Blindado                                                                  | 802     | 2437 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                  | Usage   | Average Impact |
| ---- | ----------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](http://www.blogger.com/)                    | 14,174  | 48 ms          |
| 2    | Civic                                                 | 188     | 77 ms          |
| 3    | [Dealer](https://www.dealer.com/)                     | 28,185  | 130 ms         |
| 4    | [WordPress](https://wp.com/)                          | 127,601 | 138 ms         |
| 5    | Playbuzz                                              | 209     | 151 ms         |
| 6    | [Shopify](https://www.shopify.com/)                   | 208,073 | 176 ms         |
| 7    | Typepad                                               | 181     | 190 ms         |
| 8    | Global-e                                              | 269     | 296 ms         |
| 9    | Yottaa                                                | 165     | 297 ms         |
| 10   | [Weebly](https://www.weebly.com/)                     | 35,308  | 322 ms         |
| 11   | [CDK Dealer Management](https://www.cdkglobal.com/us) | 12,299  | 330 ms         |
| 12   | [Hatena Blog](https://hatenablog.com/)                | 62,215  | 345 ms         |
| 13   | Ecwid                                                 | 609     | 377 ms         |
| 14   | Rackspace                                             | 166     | 377 ms         |
| 15   | [Squarespace](https://www.squarespace.com/)           | 88,270  | 398 ms         |
| 16   | [Wix](https://www.wix.com/)                           | 164,599 | 972 ms         |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [RD Station](https://www.rdstation.com/en/) | 2,819  | 72 ms          |
| 2    | DemandBase                                  | 376    | 82 ms          |
| 3    | Bronto Software                             | 900    | 112 ms         |
| 4    | Madison Logic                               | 798    | 112 ms         |
| 5    | Gleam                                       | 431    | 127 ms         |
| 6    | [Listrak](https://www.listrak.com/)         | 1,078  | 127 ms         |
| 7    | Ghostery Enterprise                         | 234    | 129 ms         |
| 8    | [Beeketing](https://beeketing.com/)         | 59,838 | 137 ms         |
| 9    | [Mailchimp](https://mailchimp.com/)         | 24,237 | 139 ms         |
| 10   | [Drift](https://www.drift.com/)             | 4,126  | 148 ms         |
| 11   | Ve                                          | 3,415  | 157 ms         |
| 12   | [Hubspot](https://hubspot.com/)             | 22,456 | 169 ms         |
| 13   | [OptinMonster](https://optinmonster.com/)   | 1,125  | 248 ms         |
| 14   | [Sumo](https://sumo.com/)                   | 55,139 | 263 ms         |
| 15   | Curalate                                    | 354    | 299 ms         |
| 16   | Bigcommerce                                 | 11,802 | 301 ms         |
| 17   | Pardot                                      | 221    | 341 ms         |
| 18   | Wishpond Technologies                       | 432    | 419 ms         |
| 19   | Zmags                                       | 263    | 467 ms         |
| 20   | [Albacross](https://albacross.com/)         | 1,332  | 732 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                     | Usage  | Average Impact |
| ---- | ---------------------------------------- | ------ | -------------- |
| 1    | SnapEngage                               | 931    | 68 ms          |
| 2    | Freespee                                 | 102    | 75 ms          |
| 3    | Foursixty                                | 1,084  | 79 ms          |
| 4    | AnswerDash                               | 126    | 84 ms          |
| 5    | iPerceptions                             | 2,648  | 88 ms          |
| 6    | ClickDesk                                | 510    | 89 ms          |
| 7    | BoldChat                                 | 443    | 93 ms          |
| 8    | LiveHelpNow                              | 348    | 94 ms          |
| 9    | [LiveChat](https://www.livechatinc.com/) | 16,750 | 96 ms          |
| 10   | iAdvize SAS                              | 2,584  | 100 ms         |
| 11   | LivePerson                               | 4,547  | 114 ms         |
| 12   | Comm100                                  | 1,539  | 119 ms         |
| 13   | WebEngage                                | 603    | 123 ms         |
| 14   | [Freshdesk](https://freshdesk.com/)      | 875    | 154 ms         |
| 15   | WalkMe                                   | 345    | 161 ms         |
| 16   | Pure Chat                                | 4,086  | 162 ms         |
| 17   | [Help Scout](https://www.helpscout.net/) | 629    | 184 ms         |
| 18   | Vee24                                    | 103    | 190 ms         |
| 19   | Tidio Live Chat                          | 5,979  | 309 ms         |
| 20   | [Jivochat](https://www.jivochat.com/)    | 23,555 | 322 ms         |
| 21   | [Olark](https://www.olark.com/)          | 12,238 | 331 ms         |
| 22   | [Intercom](https://www.intercom.com/)    | 16,322 | 334 ms         |
| 23   | Dynamic Yield                            | 1,773  | 340 ms         |
| 24   | [Tawk.to](https://www.tawk.to/)          | 39,669 | 344 ms         |
| 25   | LiveTex                                  | 2,673  | 371 ms         |
| 26   | [24]7                                    | 294    | 507 ms         |
| 27   | [ZenDesk](https://zendesk.com/)          | 84,795 | 508 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | SnapWidget                                | 599    | 41 ms          |
| 2    | Research Online                           | 115    | 68 ms          |
| 3    | Covert Pics                               | 139    | 73 ms          |
| 4    | PhotoBucket                               | 841    | 77 ms          |
| 5    | Accuweather                               | 1,279  | 77 ms          |
| 6    | CPEx                                      | 299    | 80 ms          |
| 7    | Flickr                                    | 120    | 85 ms          |
| 8    | issuu                                     | 686    | 91 ms          |
| 9    | Outbrain                                  | 5,244  | 98 ms          |
| 10   | Betgenius                                 | 133    | 101 ms         |
| 11   | Tencent                                   | 522    | 101 ms         |
| 12   | OpenTable                                 | 1,845  | 107 ms         |
| 13   | The Hut Group                             | 624    | 107 ms         |
| 14   | Revcontent                                | 819    | 113 ms         |
| 15   | Viacom                                    | 124    | 138 ms         |
| 16   | Advance Magazine Group                    | 160    | 165 ms         |
| 17   | TechTarget                                | 131    | 166 ms         |
| 18   | Booking.com                               | 978    | 169 ms         |
| 19   | Medium                                    | 2,491  | 171 ms         |
| 20   | Livefyre                                  | 481    | 201 ms         |
| 21   | Cloudinary                                | 315    | 213 ms         |
| 22   | [AMP](https://www.ampproject.org/)        | 58,086 | 217 ms         |
| 23   | Embedly                                   | 2,686  | 227 ms         |
| 24   | Flowplayer                                | 492    | 237 ms         |
| 25   | [SoundCloud](https://www.soundcloud.com/) | 226    | 270 ms         |
| 26   | [Vox Media](https://www.voxmedia.com/)    | 1,129  | 273 ms         |
| 27   | PERFORM                                   | 459    | 276 ms         |
| 28   | ShopRunner                                | 149    | 293 ms         |
| 29   | Snack Media                               | 118    | 295 ms         |
| 30   | Dailymotion                               | 256    | 327 ms         |
| 31   | Clicktripz                                | 118    | 331 ms         |
| 32   | Expedia                                   | 627    | 332 ms         |
| 33   | Time                                      | 245    | 339 ms         |
| 34   | Digital Media Exchange                    | 271    | 490 ms         |
| 35   | Proper Media                              | 121    | 557 ms         |
| 36   | Trip Advisor                              | 346    | 572 ms         |
| 37   | Opta                                      | 294    | 575 ms         |
| 38   | Kaltura Video Platform                    | 440    | 668 ms         |
| 39   | [Hotmart](https://www.hotmart.com/)       | 855    | 811 ms         |
| 40   | Best Of Media S.A.                        | 254    | 1051 ms        |
| 41   | Sekindo                                   | 219    | 1640 ms        |

<a name="library"></a>

#### Libraries

These are mostly open source libraries (e.g. jQuery) served over different public CDNs. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the libraries being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 928     | 55 ms          |
| 2    | Edge Web Fonts                                               | 149     | 68 ms          |
| 3    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 6,903   | 95 ms          |
| 4    | [FontAwesome CDN](https://fontawesome.com/)                  | 16,717  | 126 ms         |
| 5    | [Yandex CDN](https://yandex.ru/)                             | 1,885   | 138 ms         |
| 6    | Microsoft Hosted Libs                                        | 4,639   | 164 ms         |
| 7    | Bootstrap Chinese network                                    | 276     | 192 ms         |
| 8    | [jQuery CDN](https://code.jquery.com/)                       | 137,421 | 194 ms         |
| 9    | Monotype                                                     | 4,142   | 194 ms         |
| 10   | [Google CDN](https://developers.google.com/speed/libraries/) | 728,840 | 201 ms         |
| 11   | [Cloudflare CDN](https://cdnjs.com/)                         | 94,162  | 202 ms         |
| 12   | Fort Awesome                                                 | 529     | 230 ms         |
| 13   | [Unpkg](https://unpkg.com)                                   | 2,508   | 231 ms         |
| 14   | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 21,987  | 269 ms         |
| 15   | [CreateJS CDN](http://code.createjs.com/)                    | 1,649   | 3048 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage     | Average Impact |
| ---- | ----------------------------------------------------------------------------- | --------- | -------------- |
| 1    | TagCommander                                                                  | 1,213     | 96 ms          |
| 2    | BrightTag                                                                     | 7,380     | 134 ms         |
| 3    | Conversant Tag Manager                                                        | 191       | 175 ms         |
| 4    | Opentag                                                                       | 984       | 175 ms         |
| 5    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,414    | 220 ms         |
| 6    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,043,021 | 471 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                                                | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/) | 551     | 53 ms          |
| 2    | ResponsiveVoice                                                     | 258     | 78 ms          |
| 3    | [ReadSpeaker](https://www.readspeaker.com)                          | 400     | 79 ms          |
| 4    | Sirv                                                                | 177     | 96 ms          |
| 5    | Skype                                                               | 740     | 128 ms         |
| 6    | [Amazon Web Services](https://aws.amazon.com/s3/)                   | 47,840  | 164 ms         |
| 7    | Pagely                                                              | 1,047   | 234 ms         |
| 8    | Sidecar                                                             | 343     | 239 ms         |
| 9    | reEmbed                                                             | 159     | 240 ms         |
| 10   | [All Other 3rd Parties](#by-category)                               | 922,130 | 243 ms         |
| 11   | [Ensighten](https://www.ensighten.com/)                             | 7,689   | 252 ms         |
| 12   | Marketplace Web Service                                             | 305     | 260 ms         |
| 13   | [Parking Crew](http://parkingcrew.net/)                             | 5,208   | 474 ms         |
| 14   | uLogin                                                              | 2,353   | 1170 ms        |
| 15   | Hola Networks                                                       | 151     | 1690 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                          | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 1,043,021  | 491,642 s    | 471 ms         |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                | 1,165,800  | 257,973 s    | 221 ms         |
| [All Other 3rd Parties](#by-category)                                         | 922,130    | 223,876 s    | 243 ms         |
| [Wix](https://www.wix.com/)                                                   | 164,599    | 159,967 s    | 972 ms         |
| [Google CDN](https://developers.google.com/speed/libraries/)                  | 728,840    | 146,739 s    | 201 ms         |
| [Facebook](https://www.facebook.com)                                          | 1,103,174  | 132,167 s    | 120 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)               | 1,082,088  | 84,606 s     | 78 ms          |
| [Yandex Metrica](https://metrica.yandex.com/about?)                           | 218,992    | 69,273 s     | 316 ms         |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)     | 477,821    | 57,719 s     | 121 ms         |
| [AddThis](http://www.addthis.com/)                                            | 177,056    | 49,149 s     | 278 ms         |
| [ZenDesk](https://zendesk.com/)                                               | 84,795     | 43,066 s     | 508 ms         |
| [Twitter](https://twitter.com)                                                | 260,919    | 38,408 s     | 147 ms         |
| [Shopify](https://www.shopify.com/)                                           | 208,073    | 36,713 s     | 176 ms         |
| [Squarespace](https://www.squarespace.com/)                                   | 88,270     | 35,142 s     | 398 ms         |
| [Google Maps](https://www.google.com/maps)                                    | 247,910    | 29,396 s     | 119 ms         |
| [jQuery CDN](https://code.jquery.com/)                                        | 137,421    | 26,651 s     | 194 ms         |
| [PIXNET](https://www.pixnet.net/)                                             | 48,564     | 26,441 s     | 544 ms         |
| [Hatena Blog](https://hatenablog.com/)                                        | 62,215     | 21,442 s     | 345 ms         |
| [Yandex APIs](https://yandex.ru/)                                             | 53,493     | 21,000 s     | 393 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                          | 94,162     | 19,048 s     | 202 ms         |
| [WordPress](https://wp.com/)                                                  | 127,601    | 17,664 s     | 138 ms         |
| [Sumo](https://sumo.com/)                                                     | 55,139     | 14,519 s     | 263 ms         |
| [Moat](https://moat.com/)                                                     | 18,342     | 13,860 s     | 756 ms         |
| [33 Across](https://33across.com/)                                            | 15,704     | 13,753 s     | 876 ms         |
| [Tawk.to](https://www.tawk.to/)                                               | 39,669     | 13,636 s     | 344 ms         |
| [AMP](https://www.ampproject.org/)                                            | 58,086     | 12,591 s     | 217 ms         |
| [Tumblr](https://tumblr.com/)                                                 | 38,452     | 12,464 s     | 324 ms         |
| [Weebly](https://www.weebly.com/)                                             | 35,308     | 11,363 s     | 322 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)            | 36,481     | 10,938 s     | 300 ms         |
| [Yandex Ads](https://yandex.com/adv/)                                         | 38,205     | 10,172 s     | 266 ms         |
| [Integral Ad Science](https://integralads.com/uk/)                            | 25,277     | 9,302 s      | 368 ms         |
| [Criteo](https://www.criteo.com/)                                             | 66,114     | 9,205 s      | 139 ms         |
| [Hotjar](https://www.hotjar.com/)                                             | 95,852     | 9,073 s      | 95 ms          |
| [OpenX](https://www.openx.com/)                                               | 8,892      | 8,483 s      | 954 ms         |
| [WordAds](https://wordads.co/)                                                | 33,392     | 8,418 s      | 252 ms         |
| [Beeketing](https://beeketing.com/)                                           | 59,838     | 8,218 s      | 137 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                             | 47,840     | 7,842 s      | 164 ms         |
| [ShareThis](https://www.sharethis.com/)                                       | 31,606     | 7,763 s      | 246 ms         |
| [Jivochat](https://www.jivochat.com/)                                         | 23,555     | 7,593 s      | 322 ms         |
| [Sentry](https://sentry.io/)                                                  | 14,388     | 7,413 s      | 515 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,414     | 7,117 s      | 220 ms         |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                     | 21,987     | 5,918 s      | 269 ms         |
| [Histats](http://histats.com/)                                                | 13,937     | 5,691 s      | 408 ms         |
| [Wistia](https://wistia.com/)                                                 | 20,701     | 5,640 s      | 272 ms         |
| [Intercom](https://www.intercom.com/)                                         | 16,322     | 5,453 s      | 334 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                  | 5,987      | 5,218 s      | 872 ms         |
| [Taboola](https://www.taboola.com/)                                           | 25,671     | 5,137 s      | 200 ms         |
| [MediaVine](https://www.mediavine.com/)                                       | 9,768      | 5,081 s      | 520 ms         |
| [CreateJS CDN](http://code.createjs.com/)                                     | 1,649      | 5,026 s      | 3048 ms        |
| LiveJournal                                                                   | 6,610      | 4,850 s      | 734 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                            | 10,392     | 4,622 s      | 445 ms         |
| [AppNexus](https://www.appnexus.com/)                                         | 14,926     | 4,592 s      | 308 ms         |
| Datacamp                                                                      | 10,609     | 4,505 s      | 425 ms         |
| [Tealium](https://tealium.com/)                                               | 15,237     | 4,062 s      | 267 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                         | 12,299     | 4,062 s      | 330 ms         |
| [Olark](https://www.olark.com/)                                               | 12,238     | 4,047 s      | 331 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                          | 30,092     | 4,008 s      | 133 ms         |
| Tynt                                                                          | 25,583     | 3,952 s      | 154 ms         |
| [Media.net](https://www.media.net/)                                           | 11,818     | 3,945 s      | 334 ms         |
| [Shareaholic](https://www.shareaholic.com/)                                   | 15,606     | 3,941 s      | 253 ms         |
| [fam](http://admin.fam-ad.com/report/)                                        | 3,505      | 3,807 s      | 1086 ms        |
| [Hubspot](https://hubspot.com/)                                               | 22,456     | 3,805 s      | 169 ms         |
| [YouTube](https://youtube.com)                                                | 25,349     | 3,801 s      | 150 ms         |
| [Dealer](https://www.dealer.com/)                                             | 28,185     | 3,668 s      | 130 ms         |
| Bigcommerce                                                                   | 11,802     | 3,550 s      | 301 ms         |
| [Mailchimp](https://mailchimp.com/)                                           | 24,237     | 3,364 s      | 139 ms         |
| Privy                                                                         | 9,952      | 3,274 s      | 329 ms         |
| [Optimizely](https://www.optimizely.com/)                                     | 13,098     | 3,257 s      | 249 ms         |
| Mapbox                                                                        | 2,558      | 3,107 s      | 1215 ms        |
| [Popads](https://www.popads.net/)                                             | 4,548      | 3,098 s      | 681 ms         |
| [Brightcove](https://www.brightcove.com/en/)                                  | 4,737      | 2,778 s      | 587 ms         |
| uLogin                                                                        | 2,353      | 2,754 s      | 1170 ms        |
| Yieldmo                                                                       | 2,227      | 2,750 s      | 1235 ms        |
| [Amazon Ads](https://ad.amazon.com/)                                          | 24,660     | 2,664 s      | 108 ms         |
| StickyADS.tv                                                                  | 2,010      | 2,598 s      | 1292 ms        |
| [Parking Crew](http://parkingcrew.net/)                                       | 5,208      | 2,469 s      | 474 ms         |
| GumGum                                                                        | 4,172      | 2,455 s      | 589 ms         |
| [PayPal](https://paypal.com)                                                  | 6,948      | 2,255 s      | 325 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                     | 13,332     | 2,224 s      | 167 ms         |
| Skimbit                                                                       | 15,074     | 2,207 s      | 146 ms         |
| NetRatings SiteCensus                                                         | 15,441     | 2,174 s      | 141 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                 | 4,033      | 2,167 s      | 537 ms         |
| Infolinks                                                                     | 4,090      | 2,144 s      | 524 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                                   | 16,717     | 2,112 s      | 126 ms         |
| AdMatic                                                                       | 2,707      | 2,055 s      | 759 ms         |
| Rambler                                                                       | 8,226      | 2,050 s      | 249 ms         |
| Yotpo                                                                         | 9,652      | 1,991 s      | 206 ms         |
| Micropat                                                                      | 22,116     | 1,965 s      | 89 ms          |
| Blindado                                                                      | 802        | 1,954 s      | 2437 ms        |
| [Ensighten](https://www.ensighten.com/)                                       | 7,689      | 1,934 s      | 252 ms         |
| VigLink                                                                       | 5,806      | 1,886 s      | 325 ms         |
| LKQD                                                                          | 2,090      | 1,850 s      | 885 ms         |
| Tidio Live Chat                                                               | 5,979      | 1,849 s      | 309 ms         |
| [MGID](https://www.mgid.com/)                                                 | 10,481     | 1,690 s      | 161 ms         |
| [LiveChat](https://www.livechatinc.com/)                                      | 16,750     | 1,615 s      | 96 ms          |
| Inspectlet                                                                    | 4,984      | 1,594 s      | 320 ms         |
| [Pinterest](https://pinterest.com/)                                           | 15,097     | 1,546 s      | 102 ms         |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                          | 2,841      | 1,544 s      | 543 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                | 5,861      | 1,490 s      | 254 ms         |
| [Radar](https://www.cedexis.com/radar/)                                       | 4,912      | 1,489 s      | 303 ms         |
| [LinkedIn](https://www.linkedin.com/)                                         | 12,119     | 1,475 s      | 122 ms         |
| Bold Commerce                                                                 | 11,530     | 1,465 s      | 127 ms         |
| AB Tasty                                                                      | 3,111      | 1,416 s      | 455 ms         |
| Adform                                                                        | 9,062      | 1,408 s      | 155 ms         |
| Klaviyo                                                                       | 7,677      | 1,391 s      | 181 ms         |
| [OneSignal](https://onesignal.com/)                                           | 18,715     | 1,389 s      | 74 ms          |
| [Segment](https://segment.com/)                                               | 6,940      | 1,371 s      | 198 ms         |
| Treasure Data                                                                 | 9,714      | 1,277 s      | 131 ms         |
| [Sizmek](https://www.sizmek.com/)                                             | 3,935      | 1,263 s      | 321 ms         |
| Teads                                                                         | 6,589      | 1,235 s      | 187 ms         |
| Vidible                                                                       | 1,566      | 1,169 s      | 746 ms         |
| [Crazy Egg](https://www.crazyegg.com/)                                        | 9,881      | 1,127 s      | 114 ms         |
| [Pubmatic](https://pubmatic.com/)                                             | 6,439      | 1,112 s      | 173 ms         |
| FullStory                                                                     | 4,996      | 1,112 s      | 223 ms         |
| LiveTex                                                                       | 2,673      | 993 s        | 371 ms         |
| BrightTag                                                                     | 7,380      | 989 s        | 134 ms         |
| [Albacross](https://albacross.com/)                                           | 1,332      | 975 s        | 732 ms         |
| DTSCOUT                                                                       | 7,417      | 967 s        | 130 ms         |
| Rocket Fuel                                                                   | 5,755      | 926 s        | 161 ms         |
| sovrn                                                                         | 5,371      | 922 s        | 172 ms         |
| Keen IO                                                                       | 2,382      | 888 s        | 373 ms         |
| iBillboard                                                                    | 3,258      | 885 s        | 272 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                      | 9,088      | 857 s        | 94 ms          |
| Monotype                                                                      | 4,142      | 805 s        | 194 ms         |
| iubenda                                                                       | 9,614      | 799 s        | 83 ms          |
| Mouseflow                                                                     | 1,391      | 791 s        | 569 ms         |
| Esri ArcGIS                                                                   | 731        | 782 s        | 1070 ms        |
| Fastly                                                                        | 3,396      | 764 s        | 225 ms         |
| Microsoft Hosted Libs                                                         | 4,639      | 761 s        | 164 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                 | 8,169      | 744 s        | 91 ms          |
| Ezoic                                                                         | 3,016      | 727 s        | 241 ms         |
| Admixer for Publishers                                                        | 2,597      | 726 s        | 280 ms         |
| Kakao                                                                         | 8,746      | 724 s        | 83 ms          |
| [Quantcast](https://www.quantcast.com)                                        | 6,607      | 705 s        | 107 ms         |
| [Hotmart](https://www.hotmart.com/)                                           | 855        | 693 s        | 811 ms         |
| [Blogger](http://www.blogger.com/)                                            | 14,174     | 683 s        | 48 ms          |
| Chartbeat                                                                     | 6,959      | 671 s        | 96 ms          |
| Between Digital                                                               | 1,107      | 664 s        | 600 ms         |
| Pure Chat                                                                     | 4,086      | 662 s        | 162 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                     | 6,903      | 657 s        | 95 ms          |
| Index Exchange                                                                | 3,336      | 654 s        | 196 ms         |
| [VWO](https://vwo.com)                                                        | 6,352      | 648 s        | 102 ms         |
| Okas Concepts                                                                 | 1,109      | 635 s        | 573 ms         |
| [Drift](https://www.drift.com/)                                               | 4,126      | 611 s        | 148 ms         |
| Embedly                                                                       | 2,686      | 611 s        | 227 ms         |
| Dynamic Yield                                                                 | 1,773      | 603 s        | 340 ms         |
| Bazaarvoice                                                                   | 3,285      | 603 s        | 184 ms         |
| [Market GID](https://www.marketgid.com/)                                      | 3,124      | 593 s        | 190 ms         |
| [Unpkg](https://unpkg.com)                                                    | 2,508      | 579 s        | 231 ms         |
| Cxense                                                                        | 3,773      | 579 s        | 153 ms         |
| LongTail Ad Solutions                                                         | 2,789      | 567 s        | 203 ms         |
| Feefo.com                                                                     | 2,218      | 556 s        | 251 ms         |
| SessionCam                                                                    | 1,456      | 553 s        | 380 ms         |
| Ve                                                                            | 3,415      | 538 s        | 157 ms         |
| fluct                                                                         | 6,732      | 532 s        | 79 ms          |
| [Yahoo!](https://www.yahoo.com/)                                              | 3,830      | 527 s        | 138 ms         |
| LivePerson                                                                    | 4,547      | 517 s        | 114 ms         |
| Outbrain                                                                      | 5,244      | 514 s        | 98 ms          |
| AudienceSearch                                                                | 4,389      | 514 s        | 117 ms         |
| Meetrics                                                                      | 881        | 506 s        | 575 ms         |
| Gemius                                                                        | 6,998      | 485 s        | 69 ms          |
| JuicyAds                                                                      | 2,935      | 478 s        | 163 ms         |
| SocialShopWave                                                                | 1,023      | 459 s        | 448 ms         |
| Digital ad Consortium                                                         | 3,777      | 440 s        | 117 ms         |
| [Instagram](https://www.instagram.com)                                        | 5,167      | 440 s        | 85 ms          |
| [VK](https://vk.com/)                                                         | 6,380      | 439 s        | 69 ms          |
| Marchex                                                                       | 3,844      | 435 s        | 113 ms         |
| Pictela (AOL)                                                                 | 785        | 431 s        | 550 ms         |
| Medium                                                                        | 2,491      | 427 s        | 171 ms         |
| Audience 360                                                                  | 413        | 423 s        | 1024 ms        |
| Adtech (AOL)                                                                  | 509        | 421 s        | 828 ms         |
| CallRail                                                                      | 3,843      | 419 s        | 109 ms         |
| IBM Digital Analytics                                                         | 858        | 414 s        | 482 ms         |
| [Disqus](http://disqus.com/)                                                  | 1,376      | 410 s        | 298 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                    | 3,615      | 399 s        | 110 ms         |
| MaxCDN Enterprise                                                             | 2,325      | 395 s        | 170 ms         |
| WebpageFX                                                                     | 329        | 394 s        | 1199 ms        |
| Smart AdServer                                                                | 3,223      | 390 s        | 121 ms         |
| [Mixpanel](https://mixpanel.com/)                                             | 4,908      | 389 s        | 79 ms          |
| Sharethrough                                                                  | 2,195      | 373 s        | 170 ms         |
| Secomapp                                                                      | 1,062      | 362 s        | 341 ms         |
| Sekindo                                                                       | 219        | 359 s        | 1640 ms        |
| TrackJS                                                                       | 816        | 355 s        | 436 ms         |
| [Adroll](https://www.adroll.com/)                                             | 3,119      | 345 s        | 111 ms         |
| Bugsnag                                                                       | 769        | 344 s        | 448 ms         |
| Gigya                                                                         | 1,949      | 342 s        | 176 ms         |
| [Stripe](https://stripe.com)                                                  | 4,828      | 342 s        | 71 ms          |
| Nosto                                                                         | 2,973      | 339 s        | 114 ms         |
| PushCrew                                                                      | 3,335      | 338 s        | 101 ms         |
| MailMunch                                                                     | 4,315      | 331 s        | 77 ms          |
| ForeSee                                                                       | 2,612      | 325 s        | 124 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                | 3,011      | 321 s        | 107 ms         |
| [Vox Media](https://www.voxmedia.com/)                                        | 1,129      | 308 s        | 273 ms         |
| JustUno                                                                       | 1,944      | 299 s        | 154 ms         |
| Parse.ly                                                                      | 2,616      | 296 s        | 113 ms         |
| Kaltura Video Platform                                                        | 440        | 294 s        | 668 ms         |
| StatCounter                                                                   | 4,693      | 283 s        | 60 ms          |
| Digioh                                                                        | 844        | 281 s        | 333 ms         |
| [OptinMonster](https://optinmonster.com/)                                     | 1,125      | 279 s        | 248 ms         |
| Clicktale                                                                     | 2,351      | 278 s        | 118 ms         |
| Best Of Media S.A.                                                            | 254        | 267 s        | 1051 ms        |
| GetSiteControl                                                                | 3,144      | 263 s        | 84 ms          |
| Affirm                                                                        | 1,067      | 262 s        | 245 ms         |
| Bounce Exchange                                                               | 1,374      | 261 s        | 190 ms         |
| [Yandex CDN](https://yandex.ru/)                                              | 1,885      | 260 s        | 138 ms         |
| Sortable                                                                      | 1,028      | 259 s        | 252 ms         |
| iAdvize SAS                                                                   | 2,584      | 259 s        | 100 ms         |
| Hola Networks                                                                 | 151        | 255 s        | 1690 ms        |
| [Media Math](http://www.mediamath.com/)                                       | 633        | 254 s        | 402 ms         |
| Yieldify                                                                      | 723        | 250 s        | 346 ms         |
| Underdog Media                                                                | 367        | 247 s        | 674 ms         |
| Seznam                                                                        | 1,424      | 247 s        | 173 ms         |
| Pagely                                                                        | 1,047      | 245 s        | 234 ms         |
| piano                                                                         | 698        | 243 s        | 348 ms         |
| iPerceptions                                                                  | 2,648      | 232 s        | 88 ms          |
| [New Relic](https://newrelic.com/)                                            | 3,183      | 231 s        | 73 ms          |
| Perfect Market                                                                | 781        | 230 s        | 295 ms         |
| Swiftype                                                                      | 1,300      | 230 s        | 177 ms         |
| UserReport                                                                    | 987        | 230 s        | 233 ms         |
| Ecwid                                                                         | 609        | 229 s        | 377 ms         |
| [AppDynamics](https://www.appdynamics.com/)                                   | 1,841      | 227 s        | 123 ms         |
| Po.st                                                                         | 1,660      | 223 s        | 134 ms         |
| Cedato                                                                        | 103        | 222 s        | 2159 ms        |
| Unbounce                                                                      | 2,338      | 222 s        | 95 ms          |
| PubNation                                                                     | 2,499      | 221 s        | 88 ms          |
| Decibel Insight                                                               | 521        | 217 s        | 417 ms         |
| Searchanise                                                                   | 2,459      | 217 s        | 88 ms          |
| Ooyala                                                                        | 657        | 216 s        | 329 ms         |
| Maxymiser                                                                     | 1,139      | 216 s        | 189 ms         |
| GitHub                                                                        | 828        | 215 s        | 260 ms         |
| Pixlee                                                                        | 337        | 212 s        | 630 ms         |
| Trust Pilot                                                                   | 2,741      | 211 s        | 77 ms          |
| ShopiMind                                                                     | 310        | 209 s        | 674 ms         |
| PerimeterX Bot Defender                                                       | 209        | 208 s        | 997 ms         |
| Expedia                                                                       | 627        | 208 s        | 332 ms         |
| Fraudlogix                                                                    | 974        | 204 s        | 209 ms         |
| SearchSpring                                                                  | 529        | 204 s        | 385 ms         |
| [RD Station](https://www.rdstation.com/en/)                                   | 2,819      | 203 s        | 72 ms          |
| Trip Advisor                                                                  | 346        | 198 s        | 572 ms         |
| Microad                                                                       | 1,328      | 198 s        | 149 ms         |
| OpenTable                                                                     | 1,845      | 197 s        | 107 ms         |
| Signyfyd                                                                      | 233        | 195 s        | 835 ms         |
| Celtra                                                                        | 565        | 191 s        | 339 ms         |
| Media Management Technologies                                                 | 533        | 191 s        | 358 ms         |
| Crowd Control                                                                 | 2,553      | 188 s        | 74 ms          |
| Comm100                                                                       | 1,539      | 184 s        | 119 ms         |
| BlueKai                                                                       | 2,548      | 181 s        | 71 ms          |
| Wishpond Technologies                                                         | 432        | 181 s        | 419 ms         |
| SmartAdServer                                                                 | 1,776      | 181 s        | 102 ms         |
| Geniee                                                                        | 2,226      | 181 s        | 81 ms          |
| Adocean                                                                       | 1,319      | 180 s        | 136 ms         |
| Adverline Board                                                               | 1,307      | 179 s        | 137 ms         |
| Opentag                                                                       | 984        | 172 s        | 175 ms         |
| Evidon                                                                        | 1,208      | 171 s        | 142 ms         |
| smartclip                                                                     | 367        | 171 s        | 465 ms         |
| Connatix                                                                      | 191        | 170 s        | 891 ms         |
| OwnerIQ                                                                       | 1,541      | 170 s        | 110 ms         |
| Opta                                                                          | 294        | 169 s        | 575 ms         |
| LoopMe                                                                        | 441        | 166 s        | 375 ms         |
| Booking.com                                                                   | 978        | 165 s        | 169 ms         |
| Sift Science                                                                  | 1,117      | 162 s        | 145 ms         |
| ThreatMetrix                                                                  | 184        | 158 s        | 858 ms         |
| Qubit Deliver                                                                 | 343        | 156 s        | 455 ms         |
| Chitika                                                                       | 1,010      | 152 s        | 150 ms         |
| [24]7                                                                         | 294        | 149 s        | 507 ms         |
| Siteimprove                                                                   | 1,637      | 141 s        | 86 ms          |
| IPONWEB                                                                       | 929        | 140 s        | 151 ms         |
| Heap                                                                          | 1,859      | 140 s        | 75 ms          |
| [Listrak](https://www.listrak.com/)                                           | 1,078      | 137 s        | 127 ms         |
| [Freshdesk](https://freshdesk.com/)                                           | 875        | 135 s        | 154 ms         |
| TrafficStars                                                                  | 1,093      | 134 s        | 122 ms         |
| Digital Media Exchange                                                        | 271        | 133 s        | 490 ms         |
| Roxr Software                                                                 | 1,822      | 132 s        | 73 ms          |
| SpotXchange                                                                   | 593        | 129 s        | 218 ms         |
| Rakuten Marketing                                                             | 1,540      | 128 s        | 83 ms          |
| PERFORM                                                                       | 459        | 127 s        | 276 ms         |
| Constant Contact                                                              | 1,251      | 126 s        | 101 ms         |
| AddShoppers                                                                   | 1,147      | 125 s        | 109 ms         |
| Monetate                                                                      | 939        | 124 s        | 132 ms         |
| etracker                                                                      | 1,732      | 123 s        | 71 ms          |
| Zmags                                                                         | 263        | 123 s        | 467 ms         |
| Fort Awesome                                                                  | 529        | 122 s        | 230 ms         |
| Stackla PTY                                                                   | 537        | 120 s        | 224 ms         |
| One by AOL                                                                    | 801        | 119 s        | 149 ms         |
| PowerReviews                                                                  | 675        | 119 s        | 177 ms         |
| FirstImpression                                                               | 278        | 119 s        | 428 ms         |
| Clerk.io ApS                                                                  | 736        | 117 s        | 159 ms         |
| Flowplayer                                                                    | 492        | 117 s        | 237 ms         |
| TagCommander                                                                  | 1,213      | 116 s        | 96 ms          |
| [Help Scout](https://www.helpscout.net/)                                      | 629        | 116 s        | 184 ms         |
| MonetizeMore                                                                  | 109        | 113 s        | 1038 ms        |
| Net Reviews                                                                   | 1,893      | 112 s        | 59 ms          |
| Fanplayr                                                                      | 144        | 109 s        | 754 ms         |
| Technorati                                                                    | 814        | 108 s        | 133 ms         |
| Curalate                                                                      | 354        | 106 s        | 299 ms         |
| AvantLink                                                                     | 126        | 106 s        | 837 ms         |
| OptiMonk                                                                      | 930        | 105 s        | 113 ms         |
| Mather Economics                                                              | 558        | 104 s        | 187 ms         |
| eBay                                                                          | 615        | 104 s        | 169 ms         |
| Mobify                                                                        | 327        | 103 s        | 316 ms         |
| Convert Insights                                                              | 917        | 103 s        | 112 ms         |
| Adnium                                                                        | 432        | 102 s        | 237 ms         |
| Smarter Click                                                                 | 477        | 102 s        | 214 ms         |
| ZEDO                                                                          | 401        | 102 s        | 254 ms         |
| Picreel                                                                       | 547        | 101 s        | 185 ms         |
| Bronto Software                                                               | 900        | 100 s        | 112 ms         |
| Accuweather                                                                   | 1,279      | 99 s         | 77 ms          |
| WisePops                                                                      | 417        | 98 s         | 236 ms         |
| Interpublic Group                                                             | 486        | 98 s         | 202 ms         |
| Shopgate                                                                      | 772        | 98 s         | 127 ms         |
| Livefyre                                                                      | 481        | 97 s         | 201 ms         |
| Polar Mobile Group                                                            | 497        | 95 s         | 192 ms         |
| Skype                                                                         | 740        | 95 s         | 128 ms         |
| Adyoulike                                                                     | 696        | 95 s         | 136 ms         |
| Pixalate                                                                      | 327        | 94 s         | 286 ms         |
| ExoClick                                                                      | 2,714      | 93 s         | 34 ms          |
| [Marketo](https://www.marketo.com)                                            | 960        | 93 s         | 97 ms          |
| Revcontent                                                                    | 819        | 92 s         | 113 ms         |
| Bizible                                                                       | 795        | 92 s         | 115 ms         |
| Madison Logic                                                                 | 798        | 89 s         | 112 ms         |
| iovation                                                                      | 1,009      | 85 s         | 85 ms          |
| Amplitude Mobile Analytics                                                    | 1,250      | 85 s         | 68 ms          |
| Foursixty                                                                     | 1,084      | 85 s         | 79 ms          |
| Survicate                                                                     | 515        | 85 s         | 166 ms         |
| Symantec                                                                      | 1,246      | 85 s         | 69 ms          |
| Refersion                                                                     | 830        | 85 s         | 102 ms         |
| Dailymotion                                                                   | 256        | 84 s         | 327 ms         |
| Time                                                                          | 245        | 83 s         | 339 ms         |
| plista                                                                        | 681        | 83 s         | 121 ms         |
| Sidecar                                                                       | 343        | 82 s         | 239 ms         |
| StreamRail                                                                    | 127        | 82 s         | 644 ms         |
| Global-e                                                                      | 269        | 80 s         | 296 ms         |
| Marketplace Web Service                                                       | 305        | 79 s         | 260 ms         |
| Forensiq                                                                      | 419        | 78 s         | 185 ms         |
| Sparkflow                                                                     | 317        | 77 s         | 243 ms         |
| Pardot                                                                        | 221        | 75 s         | 341 ms         |
| WebEngage                                                                     | 603        | 74 s         | 123 ms         |
| Cross Pixel Media                                                             | 479        | 73 s         | 153 ms         |
| Snacktools                                                                    | 296        | 73 s         | 248 ms         |
| Adthink                                                                       | 219        | 72 s         | 329 ms         |
| Smart Insight Tracking                                                        | 794        | 71 s         | 89 ms          |
| Lytics                                                                        | 556        | 70 s         | 126 ms         |
| Adkontekst                                                                    | 384        | 70 s         | 182 ms         |
| Cachefly                                                                      | 139        | 70 s         | 502 ms         |
| Tail Target                                                                   | 852        | 69 s         | 81 ms          |
| Republer                                                                      | 756        | 68 s         | 90 ms          |
| Proper Media                                                                  | 121        | 67 s         | 557 ms         |
| Permutive                                                                     | 499        | 67 s         | 134 ms         |
| Affiliate Window                                                              | 911        | 67 s         | 74 ms          |
| Cloudinary                                                                    | 315        | 67 s         | 213 ms         |
| The Hut Group                                                                 | 624        | 67 s         | 107 ms         |
| ReTargeter                                                                    | 223        | 66 s         | 296 ms         |
| FoxyCart                                                                      | 281        | 65 s         | 233 ms         |
| Google Plus                                                                   | 599        | 65 s         | 109 ms         |
| [Alexa](https://www.alexa.com/)                                               | 1,261      | 65 s         | 52 ms          |
| PhotoBucket                                                                   | 841        | 64 s         | 77 ms          |
| SnapEngage                                                                    | 931        | 63 s         | 68 ms          |
| Rackspace                                                                     | 166        | 63 s         | 377 ms         |
| Adscale                                                                       | 799        | 62 s         | 78 ms          |
| issuu                                                                         | 686        | 62 s         | 91 ms          |
| JustPremium Ads                                                               | 459        | 62 s         | 135 ms         |
| rewardStyle.com                                                               | 590        | 62 s         | 105 ms         |
| GetResponse                                                                   | 699        | 62 s         | 88 ms          |
| [SoundCloud](https://www.soundcloud.com/)                                     | 226        | 61 s         | 270 ms         |
| TRUSTe                                                                        | 669        | 61 s         | 91 ms          |
| Reevoo                                                                        | 374        | 60 s         | 161 ms         |
| [Usabilla](https://usabilla.com)                                              | 794        | 58 s         | 73 ms          |
| Tribal Fusion                                                                 | 1,082      | 58 s         | 54 ms          |
| Effective Measure                                                             | 620        | 58 s         | 93 ms          |
| WalkMe                                                                        | 345        | 56 s         | 161 ms         |
| Better Business Bureau                                                        | 177        | 55 s         | 311 ms         |
| Gleam                                                                         | 431        | 55 s         | 127 ms         |
| Omniconvert                                                                   | 462        | 54 s         | 116 ms         |
| Bootstrap Chinese network                                                     | 276        | 53 s         | 192 ms         |
| Kampyle                                                                       | 471        | 53 s         | 113 ms         |
| Kaizen Platform                                                               | 290        | 53 s         | 183 ms         |
| Tencent                                                                       | 522        | 53 s         | 101 ms         |
| Nativo                                                                        | 562        | 53 s         | 94 ms          |
| Tradelab                                                                      | 699        | 53 s         | 75 ms          |
| Evergage                                                                      | 235        | 53 s         | 224 ms         |
| Trusted Shops                                                                 | 1,322      | 52 s         | 40 ms          |
| Keywee                                                                        | 269        | 52 s         | 192 ms         |
| [Bootstrap CDN](https://www.bootstrapcdn.com/)                                | 928        | 51 s         | 55 ms          |
| Profitshare                                                                   | 386        | 50 s         | 129 ms         |
| Branch Metrics                                                                | 730        | 50 s         | 68 ms          |
| Yottaa                                                                        | 165        | 49 s         | 297 ms         |
| The ADEX                                                                      | 636        | 48 s         | 76 ms          |
| Elastic Ad                                                                    | 506        | 48 s         | 95 ms          |
| Navegg                                                                        | 559        | 47 s         | 84 ms          |
| ClickDesk                                                                     | 510        | 45 s         | 89 ms          |
| TruConversion                                                                 | 228        | 45 s         | 198 ms         |
| SpringServer                                                                  | 103        | 44 s         | 425 ms         |
| ShopRunner                                                                    | 149        | 44 s         | 293 ms         |
| WebSpectator                                                                  | 218        | 43 s         | 198 ms         |
| bRealTime                                                                     | 105        | 43 s         | 408 ms         |
| Zanox                                                                         | 370        | 43 s         | 115 ms         |
| CDN.net                                                                       | 113        | 42 s         | 368 ms         |
| BoldChat                                                                      | 443        | 41 s         | 93 ms          |
| Socialphotos                                                                  | 242        | 40 s         | 165 ms         |
| Onet                                                                          | 109        | 40 s         | 364 ms         |
| Nend                                                                          | 945        | 40 s         | 42 ms          |
| Clicktripz                                                                    | 118        | 39 s         | 331 ms         |
| TripleLift                                                                    | 349        | 39 s         | 111 ms         |
| Reflektion                                                                    | 198        | 39 s         | 195 ms         |
| Adloox                                                                        | 122        | 38 s         | 314 ms         |
| reEmbed                                                                       | 159        | 38 s         | 240 ms         |
| Github                                                                        | 426        | 38 s         | 88 ms          |
| News                                                                          | 182        | 37 s         | 203 ms         |
| LightWidget                                                                   | 444        | 36 s         | 80 ms          |
| Weborama                                                                      | 441        | 35 s         | 80 ms          |
| unpkg                                                                         | 215        | 35 s         | 164 ms         |
| SaleCycle                                                                     | 447        | 35 s         | 78 ms          |
| Snack Media                                                                   | 118        | 35 s         | 295 ms         |
| Typepad                                                                       | 181        | 34 s         | 190 ms         |
| Captify Media                                                                 | 292        | 34 s         | 116 ms         |
| Neodata                                                                       | 429        | 34 s         | 79 ms          |
| [Pingdom RUM](https://www.pingdom.com/product/performance-monitoring/)        | 184        | 34 s         | 182 ms         |
| Conversant Tag Manager                                                        | 191        | 33 s         | 175 ms         |
| Petametrics                                                                   | 223        | 33 s         | 149 ms         |
| LiveHelpNow                                                                   | 348        | 33 s         | 94 ms          |
| Postcode Anywhere (Holdings)                                                  | 142        | 33 s         | 230 ms         |
| fifty-five                                                                    | 225        | 33 s         | 145 ms         |
| Highcharts                                                                    | 281        | 32 s         | 115 ms         |
| Conversant                                                                    | 129        | 32 s         | 249 ms         |
| Steelhouse                                                                    | 296        | 32 s         | 108 ms         |
| Intercept Interactive                                                         | 284        | 32 s         | 113 ms         |
| Riskified                                                                     | 438        | 32 s         | 72 ms          |
| Playbuzz                                                                      | 209        | 32 s         | 151 ms         |
| [ReadSpeaker](https://www.readspeaker.com)                                    | 400        | 31 s         | 79 ms          |
| Sooqr Search                                                                  | 408        | 31 s         | 76 ms          |
| DemandBase                                                                    | 376        | 31 s         | 82 ms          |
| Ghostery Enterprise                                                           | 234        | 30 s         | 129 ms         |
| AdSniper                                                                      | 123        | 30 s         | 242 ms         |
| Key CDN                                                                       | 170        | 30 s         | 175 ms         |
| Appier                                                                        | 347        | 29 s         | 85 ms          |
| [The Trade Desk](https://www.thetradedesk.com/)                               | 213        | 29 s         | 137 ms         |
| [Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)           | 551        | 29 s         | 53 ms          |
| Exponea                                                                       | 298        | 28 s         | 95 ms          |
| Unruly Media                                                                  | 273        | 28 s         | 102 ms         |
| Fresh Relevance                                                               | 325        | 27 s         | 85 ms          |
| Sajari Pty                                                                    | 202        | 27 s         | 135 ms         |
| KISSmetrics                                                                   | 354        | 27 s         | 76 ms          |
| SublimeSkinz                                                                  | 407        | 27 s         | 65 ms          |
| Ambassador                                                                    | 204        | 26 s         | 130 ms         |
| Advance Magazine Group                                                        | 160        | 26 s         | 165 ms         |
| Zarget                                                                        | 216        | 25 s         | 118 ms         |
| Feedbackify                                                                   | 300        | 25 s         | 83 ms          |
| SnapWidget                                                                    | 599        | 25 s         | 41 ms          |
| NetAffiliation                                                                | 212        | 24 s         | 116 ms         |
| linkpulse                                                                     | 332        | 24 s         | 74 ms          |
| Webtrekk                                                                      | 189        | 24 s         | 127 ms         |
| eXelate                                                                       | 263        | 24 s         | 91 ms          |
| CPEx                                                                          | 299        | 24 s         | 80 ms          |
| DialogTech                                                                    | 266        | 23 s         | 87 ms          |
| ResponseTap                                                                   | 299        | 23 s         | 76 ms          |
| TechTarget                                                                    | 131        | 22 s         | 166 ms         |
| FLXone                                                                        | 164        | 22 s         | 132 ms         |
| VoiceFive                                                                     | 188        | 22 s         | 115 ms         |
| [Byside](http://www.byside.com)                                               | 162        | 21 s         | 131 ms         |
| ResponsiveVoice                                                               | 258        | 20 s         | 78 ms          |
| Transifex                                                                     | 104        | 20 s         | 191 ms         |
| Vee24                                                                         | 103        | 20 s         | 190 ms         |
| Extole                                                                        | 105        | 18 s         | 174 ms         |
| Accordant Media                                                               | 196        | 18 s         | 92 ms          |
| Hupso Website Analyzer                                                        | 251        | 18 s         | 70 ms          |
| Aggregate Knowledge                                                           | 246        | 18 s         | 72 ms          |
| BannerFlow                                                                    | 222        | 18 s         | 80 ms          |
| [Ipify](https://www.ipify.org)                                                | 133        | 17 s         | 131 ms         |
| Viacom                                                                        | 124        | 17 s         | 138 ms         |
| Sirv                                                                          | 177        | 17 s         | 96 ms          |
| Hull.js                                                                       | 117        | 17 s         | 142 ms         |
| Customer.io                                                                   | 150        | 16 s         | 108 ms         |
| Vibrant Media                                                                 | 153        | 15 s         | 101 ms         |
| Polldaddy                                                                     | 150        | 15 s         | 103 ms         |
| Resonance Insights                                                            | 101        | 15 s         | 152 ms         |
| MaxMind                                                                       | 119        | 15 s         | 128 ms         |
| CleverTap                                                                     | 174        | 14 s         | 83 ms          |
| Civic                                                                         | 188        | 14 s         | 77 ms          |
| Exactag                                                                       | 129        | 14 s         | 111 ms         |
| Sweet Tooth                                                                   | 131        | 14 s         | 108 ms         |
| [GoSquared](https://www.gosquared.com)                                        | 192        | 14 s         | 73 ms          |
| Betgenius                                                                     | 133        | 13 s         | 101 ms         |
| SlimCut Media Outstream                                                       | 130        | 13 s         | 102 ms         |
| Apester                                                                       | 153        | 12 s         | 81 ms          |
| Simpli.fi                                                                     | 147        | 12 s         | 85 ms          |
| Infinity Tracking                                                             | 151        | 12 s         | 82 ms          |
| OnScroll                                                                      | 145        | 12 s         | 85 ms          |
| Adobe Marketing Cloud                                                         | 141        | 12 s         | 87 ms          |
| Talkable                                                                      | 153        | 12 s         | 80 ms          |
| AdRiver                                                                       | 113        | 12 s         | 106 ms         |
| CyberSource (Visa)                                                            | 156        | 12 s         | 74 ms          |
| Woopra                                                                        | 172        | 12 s         | 67 ms          |
| Opinion Stage                                                                 | 140        | 11 s         | 81 ms          |
| Video Media Groep                                                             | 110        | 11 s         | 102 ms         |
| DialogTech SourceTrak                                                         | 169        | 11 s         | 66 ms          |
| Ziff Davis Tech                                                               | 126        | 11 s         | 87 ms          |
| Exponential Interactive                                                       | 201        | 11 s         | 53 ms          |
| AnswerDash                                                                    | 126        | 11 s         | 84 ms          |
| Impact Radius                                                                 | 138        | 10 s         | 75 ms          |
| Flickr                                                                        | 120        | 10 s         | 85 ms          |
| Edge Web Fonts                                                                | 149        | 10 s         | 68 ms          |
| Covert Pics                                                                   | 139        | 10 s         | 73 ms          |
| Swoop                                                                         | 133        | 10 s         | 76 ms          |
| Pagefair                                                                      | 144        | 10 s         | 70 ms          |
| AWeber                                                                        | 147        | 10 s         | 67 ms          |
| [Vimeo](http://vimeo.com/)                                                    | 110        | 10 s         | 89 ms          |
| Drip                                                                          | 204        | 10 s         | 48 ms          |
| SecuredVisit                                                                  | 136        | 10 s         | 72 ms          |
| Auto Link Maker                                                               | 111        | 10 s         | 87 ms          |
| FreakOut                                                                      | 147        | 9 s          | 64 ms          |
| Friendbuy                                                                     | 140        | 9 s          | 66 ms          |
| Twitter Online Conversion Tracking                                            | 135        | 9 s          | 64 ms          |
| Research Online                                                               | 115        | 8 s          | 68 ms          |
| Freespee                                                                      | 102        | 8 s          | 75 ms          |
| Delta Projects AB                                                             | 128        | 8 s          | 59 ms          |
| Sailthru                                                                      | 127        | 7 s          | 58 ms          |
| Klevu Search                                                                  | 116        | 7 s          | 60 ms          |
| [Fastly Insights](https://insights.fastlylabs.com)                            | 102        | 6 s          | 60 ms          |

## Future Work

1.  Introduce URL-level data for more fine-grained analysis, i.e. which libraries from Cloudflare/Google CDNs are most expensive.
1.  Expand the scope, i.e. include more third parties and have greater entity/category coverage.

## FAQs

### I don't see entity X in the list. What's up with that?

This can be for one of several reasons:

1.  The entity does not have at least 100 references to their origin in the dataset.
1.  The entity's origins have not yet been identified. See [How can I contribute?](#contribute)

### How is the "Average Impact" determined?

The HTTP Archive dataset includes Lighthouse reports for each URL on mobile. Lighthouse has an audit called "bootup-time" that summarizes the amount of time that each script spent on the main thread. The "Average Impact" for an entity is the total execution time of scripts whose domain matches one of the entity's domains divided by the total number of occurences of those scripts.

```
Average Impact = Total Execution Time / Total Occurences
```

### How does Lighthouse determine the execution time of each script?

Lighthouse's bootup time audit attempts to attribute all toplevel main-thread tasks to a URL. A main thread task is attributed to the first script URL found in the stack. If you're interested in helping us improve this logic, see [Contributing](#contributing) for details.

### The data for entity X seems wrong. How can it be corrected?

Verify that the origins in `data/entities.json` are correct. Most issues will simply be the result of mislabelling of shared origins. If everything checks out, there is likely no further action and the data is valid. If you still believe there's errors, file an issue to discuss futher.

<a name="contribute"></a>

### How can I contribute?

Only about 90% of the third party script execution has been assigned to an entity. We could use your help identifying the rest! See [Contributing](#contributing) for details.

## Contributing

### Thanks

A **huge** thanks to [@simonhearne](https://twitter.com/simonhearne) and [@soulgalore](https://twitter.com/soulislove) for their assistance in classifying additional domains!

### Updating the Entities

The domain->entity mapping can be found in `data/entities.json`. Adding a new entity is as simple as adding a new array item with the following form.

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
