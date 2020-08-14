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
| 1    | GumGum                                                         | 2,887   | 19 ms          |
| 2    | ExoClick                                                       | 1,212   | 43 ms          |
| 3    | SublimeSkinz                                                   | 1,094   | 58 ms          |
| 4    | MailMunch                                                      | 5,095   | 60 ms          |
| 5    | Geniee                                                         | 1,161   | 68 ms          |
| 6    | Salesforce.com                                                 | 1,017   | 70 ms          |
| 7    | District M                                                     | 2,606   | 72 ms          |
| 8    | Rakuten Marketing                                              | 1,208   | 72 ms          |
| 9    | BlueKai                                                        | 2,302   | 75 ms          |
| 10   | PushCrew                                                       | 2,926   | 76 ms          |
| 11   | FreakOut                                                       | 3,826   | 76 ms          |
| 12   | Constant Contact                                               | 1,314   | 80 ms          |
| 13   | [Scorecard Research](https://www.scorecardresearch.com/)       | 6,956   | 86 ms          |
| 14   | Gemius                                                         | 4,535   | 87 ms          |
| 15   | Tynt                                                           | 22,558  | 87 ms          |
| 16   | [Rubicon Project](https://rubiconproject.com/)                 | 39,353  | 90 ms          |
| 17   | [Popads](https://www.popads.net/)                              | 2,896   | 103 ms         |
| 18   | Nativo                                                         | 1,091   | 103 ms         |
| 19   | [Outbrain](https://www.outbrain.com/)                          | 8,189   | 104 ms         |
| 20   | [AppNexus](https://www.appnexus.com/)                          | 1,248   | 105 ms         |
| 21   | Unbounce                                                       | 3,591   | 105 ms         |
| 22   | [Amazon Ads](https://ad.amazon.com/)                           | 25,338  | 107 ms         |
| 23   | i-mobile                                                       | 3,227   | 110 ms         |
| 24   | LINE Corporation                                               | 5,182   | 113 ms         |
| 25   | Sharethrough                                                   | 1,655   | 114 ms         |
| 26   | [Intent Media](https://intent.com/)                            | 8,019   | 116 ms         |
| 27   | [Bing Ads](https://bingads.microsoft.com)                      | 15,786  | 116 ms         |
| 28   | [Adroll](https://www.adroll.com/)                              | 47,959  | 117 ms         |
| 29   | JuicyAds                                                       | 1,498   | 125 ms         |
| 30   | Smart AdServer                                                 | 5,189   | 126 ms         |
| 31   | DTSCOUT                                                        | 12,679  | 132 ms         |
| 32   | Index Exchange                                                 | 4,946   | 133 ms         |
| 33   | [Attentive](https://attentivemobile.com/)                      | 1,205   | 146 ms         |
| 34   | [WordAds](https://wordads.co/)                                 | 18,478  | 149 ms         |
| 35   | Skimbit                                                        | 15,819  | 167 ms         |
| 36   | [Yahoo!](https://www.yahoo.com/)                               | 6,183   | 172 ms         |
| 37   | OptiMonk                                                       | 1,601   | 173 ms         |
| 38   | Teads                                                          | 3,457   | 177 ms         |
| 39   | Cxense                                                         | 4,374   | 179 ms         |
| 40   | TrafficStars                                                   | 2,040   | 187 ms         |
| 41   | Adform                                                         | 6,772   | 189 ms         |
| 42   | sovrn                                                          | 4,673   | 190 ms         |
| 43   | Tribal Fusion                                                  | 1,050   | 191 ms         |
| 44   | Unruly Media                                                   | 1,189   | 193 ms         |
| 45   | [OpenX](https://www.openx.com/)                                | 3,015   | 193 ms         |
| 46   | Bizible                                                        | 1,300   | 194 ms         |
| 47   | Perfect Market                                                 | 1,595   | 219 ms         |
| 48   | GetResponse                                                    | 1,073   | 219 ms         |
| 49   | Sortable                                                       | 1,551   | 220 ms         |
| 50   | [Criteo](https://www.criteo.com/)                              | 62,125  | 237 ms         |
| 51   | Adyoulike                                                      | 1,234   | 239 ms         |
| 52   | Permutive                                                      | 9,556   | 243 ms         |
| 53   | Refersion                                                      | 1,320   | 249 ms         |
| 54   | VigLink                                                        | 7,097   | 309 ms         |
| 55   | Privy                                                          | 13,047  | 309 ms         |
| 56   | [Yandex Ads](https://yandex.com/adv/)                          | 25,906  | 313 ms         |
| 57   | [Pubmatic](https://pubmatic.com/)                              | 52,613  | 315 ms         |
| 58   | [Media.net](https://www.media.net/)                            | 14,529  | 341 ms         |
| 59   | [Taboola](https://www.taboola.com/)                            | 24,583  | 364 ms         |
| 60   | LongTail Ad Solutions                                          | 3,433   | 365 ms         |
| 61   | Klaviyo                                                        | 14,593  | 392 ms         |
| 62   | piano                                                          | 1,183   | 459 ms         |
| 63   | [DoubleVerify](https://www.doubleverify.com/)                  | 1,772   | 548 ms         |
| 64   | [RevJet](https://www.revjet.com/)                              | 1,210   | 550 ms         |
| 65   | [MGID](https://www.mgid.com/)                                  | 8,210   | 574 ms         |
| 66   | Infolinks                                                      | 3,699   | 579 ms         |
| 67   | [33 Across](https://33across.com/)                             | 1,188   | 615 ms         |
| 68   | Vidible                                                        | 1,146   | 625 ms         |
| 69   | Admixer for Publishers                                         | 1,043   | 642 ms         |
| 70   | [Mediavine](https://www.mediavine.com/)                        | 6,490   | 655 ms         |
| 71   | [Bridgewell DSP](https://www.bridgewell.com/)                  | 14,079  | 791 ms         |
| 72   | [Moat](https://moat.com/)                                      | 6,862   | 817 ms         |
| 73   | LoyaltyLion                                                    | 1,300   | 830 ms         |
| 74   | Adloox                                                         | 5,759   | 921 ms         |
| 75   | [Integral Ad Science](https://integralads.com/uk/)             | 8,013   | 1028 ms        |
| 76   | [Sizmek](https://www.sizmek.com/)                              | 1,484   | 1047 ms        |
| 77   | LKQD                                                           | 1,335   | 1449 ms        |
| 78   | [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/) | 680,948 | 1456 ms        |
| 79   | [fam](http://admin.fam-ad.com/report/)                         | 2,135   | 1807 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                         | Usage     | Average Impact |
| ---- | ---------------------------------------------------------------------------- | --------- | -------------- |
| 1    | StatCounter                                                                  | 3,403     | 59 ms          |
| 2    | Treasure Data                                                                | 4,833     | 62 ms          |
| 3    | [WordPress Site Stats](https://wp.com/)                                      | 3,732     | 64 ms          |
| 4    | Roxr Software                                                                | 1,623     | 66 ms          |
| 5    | Amplitude Mobile Analytics                                                   | 2,429     | 69 ms          |
| 6    | Heap                                                                         | 2,605     | 72 ms          |
| 7    | [Mixpanel](https://mixpanel.com/)                                            | 7,513     | 75 ms          |
| 8    | [Google Analytics](https://www.google.com/analytics/analytics/)              | 1,200,666 | 77 ms          |
| 9    | Chartbeat                                                                    | 4,492     | 79 ms          |
| 10   | [Quantcast](https://www.quantcast.com)                                       | 3,787     | 80 ms          |
| 11   | [Hotjar](https://www.hotjar.com/)                                            | 177,468   | 84 ms          |
| 12   | Parse.ly                                                                     | 3,278     | 91 ms          |
| 13   | Searchanise                                                                  | 4,302     | 91 ms          |
| 14   | Smart Insight Tracking                                                       | 1,161     | 93 ms          |
| 15   | etracker                                                                     | 1,643     | 94 ms          |
| 16   | [Snowplow](https://snowplowanalytics.com/)                                   | 5,845     | 95 ms          |
| 17   | CallRail                                                                     | 7,019     | 101 ms         |
| 18   | [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html) | 11,805    | 102 ms         |
| 19   | Marchex                                                                      | 2,503     | 104 ms         |
| 20   | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                | 10,739    | 106 ms         |
| 21   | [Crazy Egg](https://www.crazyegg.com/)                                       | 4,988     | 110 ms         |
| 22   | Evidon                                                                       | 1,061     | 111 ms         |
| 23   | ContentSquare                                                                | 1,367     | 130 ms         |
| 24   | [VWO](https://vwo.com)                                                       | 4,724     | 158 ms         |
| 25   | Trust Pilot                                                                  | 15,202    | 164 ms         |
| 26   | Net Reviews                                                                  | 2,537     | 176 ms         |
| 27   | [PageSense](https://www.zoho.com/pagesense/)                                 | 1,294     | 180 ms         |
| 28   | FullStory                                                                    | 7,654     | 184 ms         |
| 29   | [Segment](https://segment.com/)                                              | 9,541     | 191 ms         |
| 30   | Kampyle                                                                      | 1,094     | 206 ms         |
| 31   | [Optimizely](https://www.optimizely.com/)                                    | 19,583    | 223 ms         |
| 32   | Nosto                                                                        | 1,946     | 225 ms         |
| 33   | UserReport                                                                   | 1,300     | 228 ms         |
| 34   | [BounceX](https://www.bouncex.com/)                                          | 1,386     | 233 ms         |
| 35   | [mPulse](https://developer.akamai.com/akamai-mpulse)                         | 13,177    | 246 ms         |
| 36   | PowerReviews                                                                 | 1,043     | 261 ms         |
| 37   | [Marketo](https://www.marketo.com)                                           | 1,336     | 359 ms         |
| 38   | Inspectlet                                                                   | 5,605     | 361 ms         |
| 39   | [Histats](http://histats.com/)                                               | 13,537    | 361 ms         |
| 40   | Bazaarvoice                                                                  | 1,845     | 397 ms         |
| 41   | [Snapchat](https://www.snapchat.com)                                         | 13,344    | 410 ms         |
| 42   | [Salesforce](https://www.salesforce.com/products/marketing-cloud/)           | 10,892    | 478 ms         |
| 43   | [Lucky Orange](https://www.luckyorange.com/)                                 | 7,529     | 491 ms         |
| 44   | Feefo.com                                                                    | 1,686     | 502 ms         |
| 45   | Gigya                                                                        | 2,261     | 579 ms         |
| 46   | [Yandex Metrica](https://metrica.yandex.com/about?)                          | 292,542   | 580 ms         |
| 47   | Ezoic                                                                        | 1,329     | 582 ms         |
| 48   | Revolver Maps                                                                | 1,144     | 609 ms         |
| 49   | AB Tasty                                                                     | 3,010     | 1594 ms        |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Usage     | Average Impact |
| ---- | ---------------------------------------------------- | --------- | -------------- |
| 1    | [AddToAny](https://www.addtoany.com/)                | 24,490    | 87 ms          |
| 2    | [Pinterest](https://pinterest.com/)                  | 17,218    | 89 ms          |
| 3    | [LinkedIn](https://www.linkedin.com/)                | 14,038    | 111 ms         |
| 4    | [VK](https://vk.com/)                                | 13,473    | 121 ms         |
| 5    | [Twitter](https://twitter.com)                       | 213,911   | 139 ms         |
| 6    | Kakao                                                | 18,109    | 158 ms         |
| 7    | [Instagram](https://www.instagram.com)               | 9,441     | 184 ms         |
| 8    | [Yandex Share](https://yastatic.net/share2/share.js) | 24,181    | 184 ms         |
| 9    | [Facebook](https://www.facebook.com)                 | 1,461,331 | 229 ms         |
| 10   | [ShareThis](https://www.sharethis.com/)              | 40,133    | 234 ms         |
| 11   | SocialShopWave                                       | 2,044     | 302 ms         |
| 12   | [AddThis](http://www.addthis.com/)                   | 118,289   | 403 ms         |
| 13   | [Disqus](http://disqus.com/)                         | 1,252     | 994 ms         |
| 14   | LiveJournal                                          | 3,680     | 1327 ms        |
| 15   | [PIXNET](https://www.pixnet.net/)                    | 15,434    | 1508 ms        |
| 16   | [Tumblr](https://tumblr.com/)                        | 7,972     | 2048 ms        |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                                         | Usage   | Average Impact |
| ---- | -------------------------------------------- | ------- | -------------- |
| 1    | [Vimeo](http://vimeo.com/)                   | 10,403  | 355 ms         |
| 2    | [Brightcove](https://www.brightcove.com/en/) | 6,615   | 809 ms         |
| 3    | [YouTube](https://youtube.com)               | 408,326 | 849 ms         |
| 4    | [Wistia](https://wistia.com/)                | 13,083  | 928 ms         |
| 5    | [Twitch](https://twitch.tv/)                 | 1,068   | 1896 ms        |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                                      | Usage   | Average Impact |
| ---- | ------------------------------------------------------------------------- | ------- | -------------- |
| 1    | Key CDN                                                                   | 1,468   | 55 ms          |
| 2    | LightWidget                                                               | 2,325   | 66 ms          |
| 3    | Siteimprove                                                               | 1,510   | 76 ms          |
| 4    | Trusted Shops                                                             | 5,639   | 79 ms          |
| 5    | [New Relic](https://newrelic.com/)                                        | 13,062  | 95 ms          |
| 6    | [Accessibe](https://accessibe.com/)                                       | 3,561   | 99 ms          |
| 7    | GetSiteControl                                                            | 1,812   | 99 ms          |
| 8    | Riskified                                                                 | 1,074   | 106 ms         |
| 9    | Affirm                                                                    | 2,500   | 113 ms         |
| 10   | iubenda                                                                   | 12,781  | 124 ms         |
| 11   | [Optanon](https://www.cookielaw.org/)                                     | 8,025   | 128 ms         |
| 12   | Swiftype                                                                  | 1,544   | 135 ms         |
| 13   | Seznam                                                                    | 1,654   | 135 ms         |
| 14   | Bold Commerce                                                             | 13,095  | 144 ms         |
| 15   | [Cookiebot](https://www.cookiebot.com/)                                   | 20,838  | 147 ms         |
| 16   | Sift Science                                                              | 1,080   | 148 ms         |
| 17   | [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/) | 580,415 | 168 ms         |
| 18   | [Amazon Pay](https://pay.amazon.com)                                      | 5,751   | 169 ms         |
| 19   | [TrustArc](https://www.trustarc.com/)                                     | 1,370   | 180 ms         |
| 20   | MaxCDN Enterprise                                                         | 2,394   | 198 ms         |
| 21   | GitHub                                                                    | 1,653   | 232 ms         |
| 22   | Fraudlogix                                                                | 2,244   | 258 ms         |
| 23   | Fastly                                                                    | 6,694   | 275 ms         |
| 24   | [PayPal](https://paypal.com)                                              | 15,436  | 342 ms         |
| 25   | [Stripe](https://stripe.com)                                              | 23,538  | 388 ms         |
| 26   | [Cloudflare](https://www.cloudflare.com/website-optimization/)            | 53,319  | 465 ms         |
| 27   | [Google Maps](https://www.google.com/maps)                                | 267,417 | 520 ms         |
| 28   | [AppDynamics](https://www.appdynamics.com/)                               | 1,281   | 527 ms         |
| 29   | Secomapp                                                                  | 2,150   | 546 ms         |
| 30   | Bugsnag                                                                   | 8,686   | 569 ms         |
| 31   | Rambler                                                                   | 7,698   | 691 ms         |
| 32   | [GoDaddy](https://www.godaddy.com/)                                       | 6,687   | 700 ms         |
| 33   | [Sentry](https://sentry.io/)                                              | 9,061   | 715 ms         |
| 34   | Signyfyd                                                                  | 1,691   | 867 ms         |
| 35   | Mapbox                                                                    | 5,206   | 877 ms         |
| 36   | [Yandex APIs](https://yandex.ru/)                                         | 27,480  | 1080 ms        |
| 37   | [POWr](https://www.powr.io)                                               | 16,407  | 1364 ms        |
| 38   | Esri ArcGIS                                                               | 1,692   | 4750 ms        |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in this category, this can sometimes be the entirety of script on the page, and so the "impact" rank might be misleading. In the case of WordPress, this just indicates the libraries hosted and served _by_ WordPress not all sites using self-hosted WordPress.

| Rank | Name                                                                                      | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Blogger](http://www.blogger.com/)                                                        | 23,674  | 327 ms         |
| 2    | [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 2,623   | 342 ms         |
| 3    | [WordPress](https://wp.com/)                                                              | 92,546  | 404 ms         |
| 4    | [Dealer](https://www.dealer.com/)                                                         | 8,637   | 433 ms         |
| 5    | Ecwid                                                                                     | 1,399   | 739 ms         |
| 6    | [Tilda](http://tilda.cc/)                                                                 | 7,842   | 747 ms         |
| 7    | [Squarespace](https://www.squarespace.com/)                                               | 39,492  | 911 ms         |
| 8    | [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 3,181   | 971 ms         |
| 9    | [Shopify](https://www.shopify.com/)                                                       | 107,323 | 1058 ms        |
| 10   | [Weebly](https://www.weebly.com/)                                                         | 13,271  | 1433 ms        |
| 11   | [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,429   | 1568 ms        |
| 12   | [Hatena Blog](https://hatenablog.com/)                                                    | 13,205  | 1579 ms        |
| 13   | [Wix](https://www.wix.com/)                                                               | 54,909  | 5962 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                        | Usage  | Average Impact |
| ---- | ------------------------------------------- | ------ | -------------- |
| 1    | [Beeketing](https://beeketing.com/)         | 3,984  | 74 ms          |
| 2    | [RD Station](https://www.rdstation.com/en/) | 6,545  | 76 ms          |
| 3    | [iZooto](https://www.izooto.com)            | 1,370  | 83 ms          |
| 4    | Ve                                          | 1,848  | 149 ms         |
| 5    | [Listrak](https://www.listrak.com/)         | 1,073  | 154 ms         |
| 6    | [Hubspot](https://hubspot.com/)             | 33,125 | 181 ms         |
| 7    | [Yotpo](https://www.yotpo.com/)             | 13,629 | 202 ms         |
| 8    | [Mailchimp](https://mailchimp.com/)         | 23,373 | 204 ms         |
| 9    | [OptinMonster](https://optinmonster.com/)   | 7,493  | 260 ms         |
| 10   | Bronto Software                             | 1,056  | 262 ms         |
| 11   | Pardot                                      | 1,435  | 404 ms         |
| 12   | [Albacross](https://albacross.com/)         | 1,920  | 490 ms         |
| 13   | [Sumo](https://sumo.com/)                   | 18,438 | 686 ms         |
| 14   | Bigcommerce                                 | 10,096 | 976 ms         |
| 15   | [Drift](https://www.drift.com/)             | 6,565  | 1279 ms        |
| 16   | [Judge.me](https://judge.me/)               | 8,307  | 1375 ms        |
| 17   | [PureCars](https://www.purecars.com/)       | 2,697  | 1901 ms        |
| 18   | [Tray Commerce](https://www.tray.com.br/)   | 3,173  | 2328 ms        |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                             | Usage  | Average Impact |
| ---- | ------------------------------------------------ | ------ | -------------- |
| 1    | SnapEngage                                       | 1,083  | 59 ms          |
| 2    | Pure Chat                                        | 4,661  | 70 ms          |
| 3    | Foursixty                                        | 1,411  | 81 ms          |
| 4    | [LivePerson](https://www.liveperson.com/)        | 4,302  | 112 ms         |
| 5    | iPerceptions                                     | 1,992  | 132 ms         |
| 6    | Comm100                                          | 1,321  | 134 ms         |
| 7    | [Intercom](https://www.intercom.com)             | 15,656 | 245 ms         |
| 8    | [Help Scout](https://www.helpscout.net/)         | 2,183  | 258 ms         |
| 9    | [Tidio Live Chat](https://www.tidiochat.com/en/) | 12,655 | 383 ms         |
| 10   | [Tawk.to](https://www.tawk.to/)                  | 63,460 | 405 ms         |
| 11   | [LiveChat](https://www.livechatinc.com/)         | 19,468 | 411 ms         |
| 12   | [ContactAtOnce](https://www.contactatonce.com/)  | 3,247  | 491 ms         |
| 13   | [Jivochat](https://www.jivochat.com/)            | 45,110 | 553 ms         |
| 14   | [Olark](https://www.olark.com/)                  | 6,903  | 656 ms         |
| 15   | [Smartsupp](https://www.smartsupp.com)           | 14,862 | 782 ms         |
| 16   | [ZenDesk](https://zendesk.com/)                  | 69,488 | 892 ms         |

<a name="content"></a>

#### Content & Publishing

These scripts are from content providers or publishing-specific affiliate tracking.

| Rank | Name                                      | Usage  | Average Impact |
| ---- | ----------------------------------------- | ------ | -------------- |
| 1    | Research Online                           | 2,222  | 62 ms          |
| 2    | Accuweather                               | 1,491  | 72 ms          |
| 3    | Booking.com                               | 1,656  | 157 ms         |
| 4    | Tencent                                   | 2,257  | 163 ms         |
| 5    | OpenTable                                 | 1,563  | 165 ms         |
| 6    | SnapWidget                                | 2,607  | 174 ms         |
| 7    | Covert Pics                               | 1,007  | 184 ms         |
| 8    | [AMP](https://amp.dev/)                   | 74,549 | 308 ms         |
| 9    | Medium                                    | 1,157  | 474 ms         |
| 10   | Embedly                                   | 5,513  | 514 ms         |
| 11   | [Spotify](https://www.spotify.com/)       | 3,225  | 602 ms         |
| 12   | issuu                                     | 1,934  | 670 ms         |
| 13   | [SoundCloud](https://www.soundcloud.com/) | 4,464  | 986 ms         |
| 14   | Dailymotion                               | 1,838  | 1244 ms        |

<a name="cdn"></a>

#### CDNs

These are a mixture of publicly hosted open source libraries (e.g. jQuery) served over different public CDNs and private CDN usage. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Usage   | Average Impact |
| ---- | ------------------------------------------------------------ | ------- | -------------- |
| 1    | [Bootstrap CDN](https://www.bootstrapcdn.com/)               | 1,445   | 55 ms          |
| 2    | [Adobe TypeKit](https://fonts.adobe.com/)                    | 18,274  | 94 ms          |
| 3    | [Yandex CDN](https://yandex.ru/)                             | 1,572   | 184 ms         |
| 4    | [JSDelivr CDN](https://www.jsdelivr.com/)                    | 97,319  | 193 ms         |
| 5    | Microsoft Hosted Libs                                        | 4,941   | 204 ms         |
| 6    | Monotype                                                     | 4,073   | 212 ms         |
| 7    | Azure Web Services                                           | 10,575  | 225 ms         |
| 8    | [jQuery CDN](https://code.jquery.com/)                       | 167,533 | 269 ms         |
| 9    | [Unpkg](https://unpkg.com)                                   | 6,922   | 274 ms         |
| 10   | [Google CDN](https://developers.google.com/speed/libraries/) | 947,402 | 288 ms         |
| 11   | [Akamai](https://www.akamai.com/)                            | 7,316   | 336 ms         |
| 12   | [Cloudflare CDN](https://cdnjs.com/)                         | 117,287 | 339 ms         |
| 13   | [FontAwesome CDN](https://fontawesome.com/)                  | 47,278  | 413 ms         |
| 14   | [CreateJS CDN](http://code.createjs.com/)                    | 3,516   | 2323 ms        |

<a name="tag-manager"></a>

#### Tag Management

These scripts tend to load lots of other scripts and initiate many tasks.

| Rank | Name                                                                          | Usage   | Average Impact |
| ---- | ----------------------------------------------------------------------------- | ------- | -------------- |
| 1    | [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) | 721,295 | 115 ms         |
| 2    | TagCommander                                                                  | 1,072   | 145 ms         |
| 3    | [BrightTag / Signal](https://www.signal.co)                                   | 3,666   | 158 ms         |
| 4    | [Adobe Tag Manager](https://www.adobe.com/experience-platform/)               | 32,466  | 311 ms         |
| 5    | [Tealium](https://tealium.com/)                                               | 12,103  | 362 ms         |
| 6    | [Ensighten](https://www.ensighten.com/)                                       | 3,761   | 444 ms         |

<a name="other"></a>

#### Mixed / Other

These are miscellaneous scripts delivered via a shared origin with no precise category or attribution. Help us out by identifying more origins!

| Rank | Name                                              | Usage     | Average Impact |
| ---- | ------------------------------------------------- | --------- | -------------- |
| 1    | ResponsiveVoice                                   | 1,241     | 70 ms          |
| 2    | [Amazon Web Services](https://aws.amazon.com/s3/) | 38,265    | 161 ms         |
| 3    | [All Other 3rd Parties](#by-category)             | 1,380,493 | 318 ms         |
| 4    | [Parking Crew](http://parkingcrew.net/)           | 5,147     | 326 ms         |
| 5    | Heroku                                            | 2,002     | 607 ms         |
| 6    | uLogin                                            | 2,316     | 1223 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                                                      | Popularity | Total Impact | Average Impact |
| ----------------------------------------------------------------------------------------- | ---------- | ------------ | -------------- |
| [Google/Doubleclick Ads](https://www.doubleclickbygoogle.com/)                            | 680,948    | 991,570 s    | 1456 ms        |
| [All Other 3rd Parties](#by-category)                                                     | 1,380,493  | 438,401 s    | 318 ms         |
| [YouTube](https://youtube.com)                                                            | 408,326    | 346,661 s    | 849 ms         |
| [Facebook](https://www.facebook.com)                                                      | 1,461,331  | 334,392 s    | 229 ms         |
| [Wix](https://www.wix.com/)                                                               | 54,909     | 327,376 s    | 5962 ms        |
| [Google CDN](https://developers.google.com/speed/libraries/)                              | 947,402    | 272,512 s    | 288 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                       | 292,542    | 169,622 s    | 580 ms         |
| [Google Maps](https://www.google.com/maps)                                                | 267,417    | 138,999 s    | 520 ms         |
| [Shopify](https://www.shopify.com/)                                                       | 107,323    | 113,506 s    | 1058 ms        |
| [Other Google APIs/SDKs](https://developers.google.com/apis-explorer/#p/)                 | 580,415    | 97,529 s     | 168 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)                           | 1,200,666  | 92,871 s     | 77 ms          |
| [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)             | 721,295    | 83,294 s     | 115 ms         |
| [ZenDesk](https://zendesk.com/)                                                           | 69,488     | 62,011 s     | 892 ms         |
| [AddThis](http://www.addthis.com/)                                                        | 118,289    | 47,729 s     | 403 ms         |
| [jQuery CDN](https://code.jquery.com/)                                                    | 167,533    | 45,063 s     | 269 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                                                      | 117,287    | 39,767 s     | 339 ms         |
| [WordPress](https://wp.com/)                                                              | 92,546     | 37,424 s     | 404 ms         |
| [Squarespace](https://www.squarespace.com/)                                               | 39,492     | 35,967 s     | 911 ms         |
| [Twitter](https://twitter.com)                                                            | 213,911    | 29,771 s     | 139 ms         |
| [Yandex APIs](https://yandex.ru/)                                                         | 27,480     | 29,681 s     | 1080 ms        |
| [Tawk.to](https://www.tawk.to/)                                                           | 63,460     | 25,679 s     | 405 ms         |
| [Jivochat](https://www.jivochat.com/)                                                     | 45,110     | 24,937 s     | 553 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)                            | 53,319     | 24,772 s     | 465 ms         |
| [PIXNET](https://www.pixnet.net/)                                                         | 15,434     | 23,272 s     | 1508 ms        |
| [AMP](https://amp.dev/)                                                                   | 74,549     | 22,928 s     | 308 ms         |
| [POWr](https://www.powr.io)                                                               | 16,407     | 22,375 s     | 1364 ms        |
| [Hatena Blog](https://hatenablog.com/)                                                    | 13,205     | 20,853 s     | 1579 ms        |
| [FontAwesome CDN](https://fontawesome.com/)                                               | 47,278     | 19,542 s     | 413 ms         |
| [Weebly](https://www.weebly.com/)                                                         | 13,271     | 19,021 s     | 1433 ms        |
| [JSDelivr CDN](https://www.jsdelivr.com/)                                                 | 97,319     | 18,827 s     | 193 ms         |
| [Pubmatic](https://pubmatic.com/)                                                         | 52,613     | 16,557 s     | 315 ms         |
| [Tumblr](https://tumblr.com/)                                                             | 7,972      | 16,326 s     | 2048 ms        |
| [Hotjar](https://www.hotjar.com/)                                                         | 177,468    | 14,877 s     | 84 ms          |
| [Criteo](https://www.criteo.com/)                                                         | 62,125     | 14,701 s     | 237 ms         |
| [Sumo](https://sumo.com/)                                                                 | 18,438     | 12,647 s     | 686 ms         |
| [Wistia](https://wistia.com/)                                                             | 13,083     | 12,145 s     | 928 ms         |
| [Smartsupp](https://www.smartsupp.com)                                                    | 14,862     | 11,628 s     | 782 ms         |
| [Judge.me](https://judge.me/)                                                             | 8,307      | 11,424 s     | 1375 ms        |
| [Bridgewell DSP](https://www.bridgewell.com/)                                             | 14,079     | 11,133 s     | 791 ms         |
| [Adobe Tag Manager](https://www.adobe.com/experience-platform/)                           | 32,466     | 10,104 s     | 311 ms         |
| Bigcommerce                                                                               | 10,096     | 9,854 s      | 976 ms         |
| [ShareThis](https://www.sharethis.com/)                                                   | 40,133     | 9,398 s      | 234 ms         |
| [Stripe](https://stripe.com)                                                              | 23,538     | 9,143 s      | 388 ms         |
| [Taboola](https://www.taboola.com/)                                                       | 24,583     | 8,950 s      | 364 ms         |
| [Drift](https://www.drift.com/)                                                           | 6,565      | 8,400 s      | 1279 ms        |
| [Integral Ad Science](https://integralads.com/uk/)                                        | 8,013      | 8,241 s      | 1028 ms        |
| [CreateJS CDN](http://code.createjs.com/)                                                 | 3,516      | 8,169 s      | 2323 ms        |
| [Yandex Ads](https://yandex.com/adv/)                                                     | 25,906     | 8,113 s      | 313 ms         |
| Esri ArcGIS                                                                               | 1,692      | 8,036 s      | 4750 ms        |
| [LiveChat](https://www.livechatinc.com/)                                                  | 19,468     | 8,001 s      | 411 ms         |
| [Blogger](http://www.blogger.com/)                                                        | 23,674     | 7,742 s      | 327 ms         |
| [Tray Commerce](https://www.tray.com.br/)                                                 | 3,173      | 7,388 s      | 2328 ms        |
| [Sentry](https://sentry.io/)                                                              | 9,061      | 6,480 s      | 715 ms         |
| [Amazon Web Services](https://aws.amazon.com/s3/)                                         | 38,265     | 6,159 s      | 161 ms         |
| [Hubspot](https://hubspot.com/)                                                           | 33,125     | 6,001 s      | 181 ms         |
| [Tilda](http://tilda.cc/)                                                                 | 7,842      | 5,858 s      | 747 ms         |
| Klaviyo                                                                                   | 14,593     | 5,713 s      | 392 ms         |
| [Adroll](https://www.adroll.com/)                                                         | 47,959     | 5,625 s      | 117 ms         |
| [Moat](https://moat.com/)                                                                 | 6,862      | 5,604 s      | 817 ms         |
| [Snapchat](https://www.snapchat.com)                                                      | 13,344     | 5,466 s      | 410 ms         |
| [CDK Dealer Management](https://www.cdkglobal.com/us)                                     | 3,429      | 5,376 s      | 1568 ms        |
| [Brightcove](https://www.brightcove.com/en/)                                              | 6,615      | 5,352 s      | 809 ms         |
| Rambler                                                                                   | 7,698      | 5,318 s      | 691 ms         |
| Adloox                                                                                    | 5,759      | 5,306 s      | 921 ms         |
| [PayPal](https://paypal.com)                                                              | 15,436     | 5,286 s      | 342 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/)                        | 10,892     | 5,206 s      | 478 ms         |
| [PureCars](https://www.purecars.com/)                                                     | 2,697      | 5,127 s      | 1901 ms        |
| [Media.net](https://www.media.net/)                                                       | 14,529     | 4,949 s      | 341 ms         |
| Bugsnag                                                                                   | 8,686      | 4,945 s      | 569 ms         |
| [Histats](http://histats.com/)                                                            | 13,537     | 4,884 s      | 361 ms         |
| LiveJournal                                                                               | 3,680      | 4,882 s      | 1327 ms        |
| [Tidio Live Chat](https://www.tidiochat.com/en/)                                          | 12,655     | 4,849 s      | 383 ms         |
| AB Tasty                                                                                  | 3,010      | 4,798 s      | 1594 ms        |
| [Mailchimp](https://mailchimp.com/)                                                       | 23,373     | 4,766 s      | 204 ms         |
| [MGID](https://www.mgid.com/)                                                             | 8,210      | 4,716 s      | 574 ms         |
| [GoDaddy](https://www.godaddy.com/)                                                       | 6,687      | 4,678 s      | 700 ms         |
| Mapbox                                                                                    | 5,206      | 4,568 s      | 877 ms         |
| [Olark](https://www.olark.com/)                                                           | 6,903      | 4,528 s      | 656 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)                                      | 24,181     | 4,455 s      | 184 ms         |
| [SoundCloud](https://www.soundcloud.com/)                                                 | 4,464      | 4,404 s      | 986 ms         |
| [Tealium](https://tealium.com/)                                                           | 12,103     | 4,385 s      | 362 ms         |
| [Optimizely](https://www.optimizely.com/)                                                 | 19,583     | 4,375 s      | 223 ms         |
| [Mediavine](https://www.mediavine.com/)                                                   | 6,490      | 4,251 s      | 655 ms         |
| Privy                                                                                     | 13,047     | 4,036 s      | 309 ms         |
| [fam](http://admin.fam-ad.com/report/)                                                    | 2,135      | 3,857 s      | 1807 ms        |
| [Intercom](https://www.intercom.com)                                                      | 15,656     | 3,829 s      | 245 ms         |
| [Dealer](https://www.dealer.com/)                                                         | 8,637      | 3,737 s      | 433 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                                              | 7,529      | 3,699 s      | 491 ms         |
| [Vimeo](http://vimeo.com/)                                                                | 10,403     | 3,689 s      | 355 ms         |
| [Rubicon Project](https://rubiconproject.com/)                                            | 39,353     | 3,558 s      | 90 ms          |
| [WebsiteBuilder.com](https://www.websitebuilder.com)                                      | 738        | 3,441 s      | 4663 ms        |
| [mPulse](https://developer.akamai.com/akamai-mpulse)                                      | 13,177     | 3,243 s      | 246 ms         |
| [Adobe Business Catalyst](https://www.businesscatalyst.com/)                              | 3,181      | 3,089 s      | 971 ms         |
| [Cookiebot](https://www.cookiebot.com/)                                                   | 20,838     | 3,062 s      | 147 ms         |
| Kakao                                                                                     | 18,109     | 2,853 s      | 158 ms         |
| uLogin                                                                                    | 2,316      | 2,832 s      | 1223 ms        |
| Embedly                                                                                   | 5,513      | 2,831 s      | 514 ms         |
| [Yotpo](https://www.yotpo.com/)                                                           | 13,629     | 2,754 s      | 202 ms         |
| [WordAds](https://wordads.co/)                                                            | 18,478     | 2,745 s      | 149 ms         |
| [Amazon Ads](https://ad.amazon.com/)                                                      | 25,338     | 2,710 s      | 107 ms         |
| Skimbit                                                                                   | 15,819     | 2,647 s      | 167 ms         |
| Trust Pilot                                                                               | 15,202     | 2,488 s      | 164 ms         |
| [Akamai](https://www.akamai.com/)                                                         | 7,316      | 2,455 s      | 336 ms         |
| Azure Web Services                                                                        | 10,575     | 2,377 s      | 225 ms         |
| Permutive                                                                                 | 9,556      | 2,326 s      | 243 ms         |
| Dailymotion                                                                               | 1,838      | 2,287 s      | 1244 ms        |
| VigLink                                                                                   | 7,097      | 2,191 s      | 309 ms         |
| Infolinks                                                                                 | 3,699      | 2,143 s      | 579 ms         |
| [AddToAny](https://www.addtoany.com/)                                                     | 24,490     | 2,119 s      | 87 ms          |
| [Twitch](https://twitch.tv/)                                                              | 1,068      | 2,025 s      | 1896 ms        |
| Inspectlet                                                                                | 5,605      | 2,022 s      | 361 ms         |
| Tynt                                                                                      | 22,558     | 1,960 s      | 87 ms          |
| [OptinMonster](https://optinmonster.com/)                                                 | 7,493      | 1,950 s      | 260 ms         |
| [Spotify](https://www.spotify.com/)                                                       | 3,225      | 1,943 s      | 602 ms         |
| LKQD                                                                                      | 1,335      | 1,935 s      | 1449 ms        |
| [Unpkg](https://unpkg.com)                                                                | 6,922      | 1,896 s      | 274 ms         |
| Bold Commerce                                                                             | 13,095     | 1,885 s      | 144 ms         |
| [Hotmart](https://www.hotmart.com/)                                                       | 810        | 1,878 s      | 2318 ms        |
| Fastly                                                                                    | 6,694      | 1,841 s      | 275 ms         |
| [Bing Ads](https://bingads.microsoft.com)                                                 | 15,786     | 1,838 s      | 116 ms         |
| [Segment](https://segment.com/)                                                           | 9,541      | 1,825 s      | 191 ms         |
| [Instagram](https://www.instagram.com)                                                    | 9,441      | 1,734 s      | 184 ms         |
| [Adobe TypeKit](https://fonts.adobe.com/)                                                 | 18,274     | 1,723 s      | 94 ms          |
| DTSCOUT                                                                                   | 12,679     | 1,678 s      | 132 ms         |
| [Parking Crew](http://parkingcrew.net/)                                                   | 5,147      | 1,677 s      | 326 ms         |
| [Ensighten](https://www.ensighten.com/)                                                   | 3,761      | 1,668 s      | 444 ms         |
| [VK](https://vk.com/)                                                                     | 13,473     | 1,631 s      | 121 ms         |
| [ContactAtOnce](https://www.contactatonce.com/)                                           | 3,247      | 1,594 s      | 491 ms         |
| iubenda                                                                                   | 12,781     | 1,586 s      | 124 ms         |
| [LinkedIn](https://www.linkedin.com/)                                                     | 14,038     | 1,559 s      | 111 ms         |
| [Sizmek](https://www.sizmek.com/)                                                         | 1,484      | 1,554 s      | 1047 ms        |
| [Pinterest](https://pinterest.com/)                                                       | 17,218     | 1,536 s      | 89 ms          |
| Signyfyd                                                                                  | 1,691      | 1,466 s      | 867 ms         |
| FullStory                                                                                 | 7,654      | 1,408 s      | 184 ms         |
| Gigya                                                                                     | 2,261      | 1,310 s      | 579 ms         |
| issuu                                                                                     | 1,934      | 1,295 s      | 670 ms         |
| Adform                                                                                    | 6,772      | 1,279 s      | 189 ms         |
| LongTail Ad Solutions                                                                     | 3,433      | 1,252 s      | 365 ms         |
| [Disqus](http://disqus.com/)                                                              | 1,252      | 1,245 s      | 994 ms         |
| [New Relic](https://newrelic.com/)                                                        | 13,062     | 1,242 s      | 95 ms          |
| Heroku                                                                                    | 2,002      | 1,216 s      | 607 ms         |
| [Nielsen NetRatings SiteCensus](http://www.nielsen-online.com/intlpage.html)              | 11,805     | 1,204 s      | 102 ms         |
| Secomapp                                                                                  | 2,150      | 1,174 s      | 546 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                             | 10,739     | 1,141 s      | 106 ms         |
| Okas Concepts                                                                             | 673        | 1,112 s      | 1652 ms        |
| Dynamic Yield                                                                             | 964        | 1,095 s      | 1136 ms        |
| LoyaltyLion                                                                               | 1,300      | 1,079 s      | 830 ms         |
| [Yahoo!](https://www.yahoo.com/)                                                          | 6,183      | 1,062 s      | 172 ms         |
| Sekindo                                                                                   | 376        | 1,054 s      | 2804 ms        |
| Ecwid                                                                                     | 1,399      | 1,033 s      | 739 ms         |
| [Optanon](https://www.cookielaw.org/)                                                     | 8,025      | 1,028 s      | 128 ms         |
| Microsoft Hosted Libs                                                                     | 4,941      | 1,006 s      | 204 ms         |
| [Amazon Pay](https://pay.amazon.com)                                                      | 5,751      | 974 s        | 169 ms         |
| [DoubleVerify](https://www.doubleverify.com/)                                             | 1,772      | 970 s        | 548 ms         |
| [DigiTrust](http://www.digitru.st/)                                                       | 485        | 969 s        | 1999 ms        |
| [Albacross](https://albacross.com/)                                                       | 1,920      | 941 s        | 490 ms         |
| [Intent Media](https://intent.com/)                                                       | 8,019      | 931 s        | 116 ms         |
| [Salesforce Commerce Cloud](https://www.salesforce.com/products/commerce-cloud/overview/) | 2,623      | 897 s        | 342 ms         |
| sovrn                                                                                     | 4,673      | 890 s        | 190 ms         |
| Monotype                                                                                  | 4,073      | 862 s        | 212 ms         |
| [Outbrain](https://www.outbrain.com/)                                                     | 8,189      | 854 s        | 104 ms         |
| Kaltura Video Platform                                                                    | 506        | 852 s        | 1684 ms        |
| Feefo.com                                                                                 | 1,686      | 846 s        | 502 ms         |
| Technorati                                                                                | 830        | 822 s        | 991 ms         |
| Cxense                                                                                    | 4,374      | 783 s        | 179 ms         |
| Ezoic                                                                                     | 1,329      | 773 s        | 582 ms         |
| [VWO](https://vwo.com)                                                                    | 4,724      | 748 s        | 158 ms         |
| Bazaarvoice                                                                               | 1,845      | 732 s        | 397 ms         |
| [33 Across](https://33across.com/)                                                        | 1,188      | 730 s        | 615 ms         |
| AdMatic                                                                                   | 793        | 719 s        | 906 ms         |
| Vidible                                                                                   | 1,146      | 716 s        | 625 ms         |
| CallRail                                                                                  | 7,019      | 710 s        | 101 ms         |
| Revolver Maps                                                                             | 1,144      | 697 s        | 609 ms         |
| Yieldify                                                                                  | 513        | 683 s        | 1332 ms        |
| [AppDynamics](https://www.appdynamics.com/)                                               | 1,281      | 675 s        | 527 ms         |
| Admixer for Publishers                                                                    | 1,043      | 669 s        | 642 ms         |
| [RevJet](https://www.revjet.com/)                                                         | 1,210      | 665 s        | 550 ms         |
| Index Exchange                                                                            | 4,946      | 655 s        | 133 ms         |
| Smart AdServer                                                                            | 5,189      | 654 s        | 126 ms         |
| StickyADS.tv                                                                              | 838        | 650 s        | 776 ms         |
| SocialShopWave                                                                            | 2,044      | 617 s        | 302 ms         |
| Teads                                                                                     | 3,457      | 612 s        | 177 ms         |
| [Scorecard Research](https://www.scorecardresearch.com/)                                  | 6,956      | 600 s        | 86 ms          |
| [Vidyard](https://www.vidyard.com/)                                                       | 536        | 587 s        | 1094 ms        |
| LINE Corporation                                                                          | 5,182      | 585 s        | 113 ms         |
| [OpenX](https://www.openx.com/)                                                           | 3,015      | 583 s        | 193 ms         |
| Fraudlogix                                                                                | 2,244      | 580 s        | 258 ms         |
| Pardot                                                                                    | 1,435      | 579 s        | 404 ms         |
| [BrightTag / Signal](https://www.signal.co)                                               | 3,666      | 578 s        | 158 ms         |
| ZEDO                                                                                      | 794        | 576 s        | 726 ms         |
| [Mixpanel](https://mixpanel.com/)                                                         | 7,513      | 567 s        | 75 ms          |
| [Help Scout](https://www.helpscout.net/)                                                  | 2,183      | 563 s        | 258 ms         |
| [Snowplow](https://snowplowanalytics.com/)                                                | 5,845      | 555 s        | 95 ms          |
| TINT                                                                                      | 224        | 553 s        | 2470 ms        |
| [Crazy Egg](https://www.crazyegg.com/)                                                    | 4,988      | 551 s        | 110 ms         |
| Medium                                                                                    | 1,157      | 549 s        | 474 ms         |
| IBM Digital Analytics                                                                     | 806        | 546 s        | 677 ms         |
| piano                                                                                     | 1,183      | 543 s        | 459 ms         |
| [RD Station](https://www.rdstation.com/en/)                                               | 6,545      | 496 s        | 76 ms          |
| [LivePerson](https://www.liveperson.com/)                                                 | 4,302      | 484 s        | 112 ms         |

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
