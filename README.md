# Third Party Web

## Table of Contents

1.  [Goals](#goals)
1.  [Methodology](#methodology)
1.  [Data](#data)
    1.  [How to Interpret](#how-to-interpet)
    1.  [Third Parties by Category](#by-category)
        1.  [Ad Network](#ad)
        1.  [Analytics](#analytics)
        1.  [Social](#social)
        1.  [Video](#video)
        1.  [Developer Utilities](#utility)
        1.  [Hosting Platforms](#hosting)
        1.  [Marketing](#marketing)
        1.  [Customer Success](#customer-success)
        1.  [CDN](#cdn)
    1.  [Third Parties by Total Impact](#by-total-impact)
1.  [Future Work](#future-work)
1.  [FAQs](#faqs)
1.  [Contributing](#contributing)

## Goals

1.  Quantify the impact of third party scripts on the web.
1.  Identify the third party scripts on the web that have the greatest performance cost.
1.  Give developers the information they need to make informed decisions about which third parties to include on their sites.
1.  Incentivize responsible third party script behavior.

## Methodology

[HTTP Archive](https://httparchive.org/) is an inititiave that tracks how the web is built. Twice a month, ~1 million sites are crawled with [Lighthouse](https://github.com/GoogleChrome/lighthouse). Lighthouse breaks down the total script execution time of each page and attributes the execution to a URL. Using [BigQuery](https://cloud.google.com/bigquery/), this project aggregates the script execution to the origin-level and assigns each origin to the responsible entity for consumption.

## Data

### How to Interpret

Each entity has a number of data points available.

1.  **Popularity (Total Number of Occurrences)** - how many scripts from their origins were included on pages
1.  **Total Impact (Total Execution Time)** - how many seconds were spent executing their scripts across the web
1.  **Average Impact (Average Execution Time)** - on average, how many milliseconds were spent executing each script
1.  **Category** - what type of script is this

<a name="by-category"></a>

### Third Parties by Category

This section breaks down third parties by category. Perhaps the most important comparisons lie here. You always need to pick an analytics provider, but at least you can pick the most well-behaved analytics provider.

#### Overall Breakdown

Unsurprisingly, ads account for the largest chunk of third party script execution.

![breakdown by category](./by-category.png)

<a name="ad"></a>

#### Ad Network

These scripts are part of advertising networks, either serving or measuring.

| Rank | Name                                               | Popularity | Average Impact |
| ---- | -------------------------------------------------- | ---------- | -------------- |
| 1    | [Criteo](https://www.criteo.com/)                  | 1,879      | 85 ms          |
| 2    | [Pubmatic](https://pubmatic.com/)                  | 4,462      | 98 ms          |
| 3    | [Market GID](https://www.marketgid.com/)           | 1,510      | 134 ms         |
| 4    | [MGID](https://www.mgid.com/)                      | 2,555      | 147 ms         |
| 5    | [Taboola](https://www.taboola.com/)                | 2,848      | 211 ms         |
| 6    | [Yahoo Ads](https://www.media.net/)                | 1,990      | 252 ms         |
| 7    | [AppNexus](https://www.appnexus.com/)              | 2,742      | 266 ms         |
| 8    | [Google Ads](https://www.google.com/adsense/start) | 389,341    | 445 ms         |
| 9    | [Integral Ads](https://integralads.com/uk/)        | 6,679      | 447 ms         |
| 10   | [DoubleVerify](https://www.doubleverify.com/)      | 2,752      | 513 ms         |
| 11   | [Yandex Ads](https://yandex.com/adv/)              | 4,810      | 515 ms         |
| 12   | [Media Math](http://www.mediamath.com/)            | 1,523      | 807 ms         |
| 13   | [Moat](https://moat.com/)                          | 5,599      | 826 ms         |
| 14   | [MediaVine](https://www.mediavine.com/)            | 1,269      | 1137 ms        |
| 15   | [WordAds](https://wordads.co/)                     | 766        | 1979 ms        |
| 16   | [Popads](https://www.popads.net/)                  | 2,808      | 2387 ms        |

<a name="analytics"></a>

#### Analytics

These scripts measure or track users and their actions. There's a wide range in impact here depending on what's being tracked.

| Rank | Name                                                                                | Popularity | Average Impact |
| ---- | ----------------------------------------------------------------------------------- | ---------- | -------------- |
| 1    | [Mixpanel](https://mixpanel.com/)                                                   | 1,371      | 75 ms          |
| 2    | [Google Analytics](https://www.google.com/analytics/analytics/#?modal_active=none)  | 205,702    | 85 ms          |
| 3    | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                       | 12,744     | 90 ms          |
| 4    | [Hotjar](https://www.hotjar.com/)                                                   | 17,635     | 91 ms          |
| 5    | [Adobe Analytics](https://www.adobe.com/data-analytics-cloud/audience-manager.html) | 5,767      | 220 ms         |
| 6    | [Salesforce](https://www.salesforce.com/products/marketing-cloud/data-management/)  | 4,804      | 251 ms         |
| 7    | [Tealium](https://tealium.com/)                                                     | 3,066      | 254 ms         |
| 8    | [Optimizely](https://www.optimizely.com/)                                           | 4,671      | 296 ms         |
| 9    | [Segment](https://segment.com/)                                                     | 1,839      | 301 ms         |
| 10   | [Histats](http://histats.com/)                                                      | 1,524      | 341 ms         |
| 11   | [Connexity](http://connexity.com/)                                                  | 1,744      | 361 ms         |
| 12   | [Yandex Metrica](https://metrica.yandex.com/about?)                                 | 26,891     | 371 ms         |
| 13   | [Lucky Orange](https://www.luckyorange.com/)                                        | 857        | 937 ms         |

<a name="social"></a>

#### Social

These scripts enable social features.

| Rank | Name                                                 | Popularity | Average Impact |
| ---- | ---------------------------------------------------- | ---------- | -------------- |
| 1    | [VK](https://vk.com/)                                | 4,227      | 30 ms          |
| 2    | [Pinterest](https://pinterest.com/)                  | 410        | 61 ms          |
| 3    | [Yandex Share](https://yastatic.net/share2/share.js) | 6,865      | 135 ms         |
| 4    | [Twitter](https://twitter.com)                       | 37,744     | 151 ms         |
| 5    | [Facebook](https://www.facebook.com)                 | 162,080    | 169 ms         |
| 6    | [AddThis](http://www.addthis.com/)                   | 36,499     | 202 ms         |
| 7    | [Tumblr](https://tumblr.com/)                        | 4,717      | 409 ms         |
| 8    | [ShareThis](https://www.sharethis.com/)              | 3,746      | 477 ms         |

<a name="video"></a>

#### Video

These scripts enable video player and streaming functionality.

| Rank | Name                           | Popularity | Average Impact |
| ---- | ------------------------------ | ---------- | -------------- |
| 1    | [Vimeo](http://vimeo.com/)     | 3,543      | 140 ms         |
| 2    | [Wistia](https://wistia.com/)  | 5,062      | 266 ms         |
| 3    | [YouTube](https://youtube.com) | 54,390     | 411 ms         |
| 4    | [Twitch](https://twitch.tv/)   | 319        | 701 ms         |

<a name="utility"></a>

#### Developer Utilities

These scripts are developer utilities (jQuery, bootstrap, Sentry, etc).

| Rank | Name                                                               | Popularity | Average Impact |
| ---- | ------------------------------------------------------------------ | ---------- | -------------- |
| 1    | [Bootstrap CDN](https://bootstrapcdn.com/)                         | 213        | 45 ms          |
| 2    | [New Relic](https://newrelic.com/)                                 | 373        | 59 ms          |
| 3    | [OneSignal](https://onesignal.com/)                                | 6,420      | 93 ms          |
| 4    | [FontAwesome](https://fontawesome.com/)                            | 1,275      | 101 ms         |
| 5    | [App Dynamics](https://www.appdynamics.com/)                       | 397        | 108 ms         |
| 6    | [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/) | 104,190    | 125 ms         |
| 7    | [jQuery CDN](https://code.jquery.com/)                             | 20,140     | 168 ms         |
| 8    | [Distil Networks](https://www.distilnetworks.com/)                 | 1,745      | 298 ms         |
| 9    | [Cloudflare SDK](https://www.cloudflare.com/website-optimization/) | 4,398      | 300 ms         |
| 10   | [Yandex APIs](https://yandex.ru/)                                  | 3,321      | 377 ms         |
| 11   | [Sentry](https://sentry.io/)                                       | 2,268      | 739 ms         |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc).

| Rank | Name                                        | Popularity | Average Impact |
| ---- | ------------------------------------------- | ---------- | -------------- |
| 1    | [WordPress](https://wp.com/)                | 7,118      | 125 ms         |
| 2    | [Shopify](https://www.shopify.com/)         | 8,537      | 217 ms         |
| 3    | [Squarespace](https://www.squarespace.com/) | 2,115      | 390 ms         |
| 4    | [Wix](https://www.wix.com/)                 | 2,097      | 1525 ms        |

<a name="marketing"></a>

#### Marketing

These scripts are from marketing tools that add popups/newsletters/etc.

| Rank | Name                                      | Popularity | Average Impact |
| ---- | ----------------------------------------- | ---------- | -------------- |
| 1    | [Hubspot](https://hubspot.com/)           | 4,887      | 92 ms          |
| 2    | [OptinMonster](https://optinmonster.com/) | 2,352      | 324 ms         |
| 3    | [Sumo](https://sumo.com/)                 | 6,677      | 379 ms         |
| 4    | [Drift](https://www.drift.com/)           | 2,315      | 482 ms         |

<a name="customer-success"></a>

#### Customer Success

These scripts are from customer support/marketing providers that offer chat and contact solutions. These scripts are generally heavier in weight.

| Rank | Name                                     | Popularity | Average Impact |
| ---- | ---------------------------------------- | ---------- | -------------- |
| 1    | [LiveChat](https://www.livechatinc.com/) | 6,252      | 178 ms         |
| 2    | [Tawk.to](https://www.tawk.to/)          | 2,574      | 278 ms         |
| 3    | [Olark](https://www.olark.com/)          | 2,734      | 318 ms         |
| 4    | [Intercom](https://www.intercom.com/)    | 2,795      | 721 ms         |
| 5    | [Zopim](https://www.zopim.com/)          | 6,367      | 726 ms         |
| 6    | [ZenDesk](https://zendesk.com/)          | 2,927      | 766 ms         |

<a name="cdn"></a>

#### CDN

These scripts are delivered via CDN. This category is unique in that the origin may have no responsibility on the performance of what's being served. Note that rank here is largely meaningless and does not imply one CDN is better than the other. It simply identifies that the scripts being served from that CDN are heavier than the ones developers use from another.

| Rank | Name                                                         | Popularity | Average Impact |
| ---- | ------------------------------------------------------------ | ---------- | -------------- |
| 1    | [Cloudflare CDN](https://cdnjs.com/)                         | 15,088     | 192 ms         |
| 2    | [Google CDN](https://developers.google.com/speed/libraries/) | 85,536     | 212 ms         |
| 3    | [Amazon S3](https://aws.amazon.com/s3/)                      | 2,625      | 222 ms         |
| 4    | [JSDelivr](https://www.jsdelivr.com/)                        | 3,537      | 351 ms         |
| 5    | [CreateJS CDN](http://code.createjs.com/)                    | 1,685      | 2457 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

| Name                                                                                | Popularity | Total Impact |
| ----------------------------------------------------------------------------------- | ---------- | ------------ |
| [Google Ads](https://www.google.com/adsense/start)                                  | 389,341    | 173140 s     |
| [Google Analytics](https://www.google.com/analytics/analytics/#?modal_active=none)  | 205,702    | 17504 s      |
| [Facebook](https://www.facebook.com)                                                | 162,080    | 27354 s      |
| [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/)                  | 104,190    | 13031 s      |
| [Google CDN](https://developers.google.com/speed/libraries/)                        | 85,536     | 18098 s      |
| [YouTube](https://youtube.com)                                                      | 54,390     | 22358 s      |
| [Twitter](https://twitter.com)                                                      | 37,744     | 5689 s       |
| [AddThis](http://www.addthis.com/)                                                  | 36,499     | 7383 s       |
| [Yandex Metrica](https://metrica.yandex.com/about?)                                 | 26,891     | 9968 s       |
| [jQuery CDN](https://code.jquery.com/)                                              | 20,140     | 3378 s       |
| [Hotjar](https://www.hotjar.com/)                                                   | 17,635     | 1613 s       |
| [Cloudflare CDN](https://cdnjs.com/)                                                | 15,088     | 2896 s       |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)                       | 12,744     | 1145 s       |
| [Shopify](https://www.shopify.com/)                                                 | 8,537      | 1855 s       |
| [WordPress](https://wp.com/)                                                        | 7,118      | 890 s        |
| [Yandex Share](https://yastatic.net/share2/share.js)                                | 6,865      | 928 s        |
| [Integral Ads](https://integralads.com/uk/)                                         | 6,679      | 2986 s       |
| [Sumo](https://sumo.com/)                                                           | 6,677      | 2528 s       |
| [OneSignal](https://onesignal.com/)                                                 | 6,420      | 600 s        |
| [Zopim](https://www.zopim.com/)                                                     | 6,367      | 4623 s       |
| [LiveChat](https://www.livechatinc.com/)                                            | 6,252      | 1111 s       |
| [Adobe Analytics](https://www.adobe.com/data-analytics-cloud/audience-manager.html) | 5,767      | 1269 s       |
| [Moat](https://moat.com/)                                                           | 5,599      | 4623 s       |
| [Wistia](https://wistia.com/)                                                       | 5,062      | 1345 s       |
| [Hubspot](https://hubspot.com/)                                                     | 4,887      | 452 s        |
| [Yandex Ads](https://yandex.com/adv/)                                               | 4,810      | 2475 s       |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/data-management/)  | 4,804      | 1205 s       |
| [Tumblr](https://tumblr.com/)                                                       | 4,717      | 1931 s       |
| [Optimizely](https://www.optimizely.com/)                                           | 4,671      | 1384 s       |
| [Pubmatic](https://pubmatic.com/)                                                   | 4,462      | 435 s        |
| [Cloudflare SDK](https://www.cloudflare.com/website-optimization/)                  | 4,398      | 1320 s       |
| [VK](https://vk.com/)                                                               | 4,227      | 126 s        |
| [ShareThis](https://www.sharethis.com/)                                             | 3,746      | 1787 s       |
| [Vimeo](http://vimeo.com/)                                                          | 3,543      | 497 s        |
| [JSDelivr](https://www.jsdelivr.com/)                                               | 3,537      | 1243 s       |
| [Yandex APIs](https://yandex.ru/)                                                   | 3,321      | 1253 s       |
| [Tealium](https://tealium.com/)                                                     | 3,066      | 779 s        |
| [ZenDesk](https://zendesk.com/)                                                     | 2,927      | 2241 s       |
| [Parking Crew](http://parkingcrew.net/)                                             | 2,887      | 1229 s       |
| [Taboola](https://www.taboola.com/)                                                 | 2,848      | 600 s        |
| [Popads](https://www.popads.net/)                                                   | 2,808      | 6702 s       |
| [Intercom](https://www.intercom.com/)                                               | 2,795      | 2015 s       |
| [DoubleVerify](https://www.doubleverify.com/)                                       | 2,752      | 1411 s       |
| [AppNexus](https://www.appnexus.com/)                                               | 2,742      | 731 s        |
| [Olark](https://www.olark.com/)                                                     | 2,734      | 868 s        |
| [Amazon S3](https://aws.amazon.com/s3/)                                             | 2,625      | 583 s        |
| [Tawk.to](https://www.tawk.to/)                                                     | 2,574      | 717 s        |
| [MGID](https://www.mgid.com/)                                                       | 2,555      | 375 s        |
| [OptinMonster](https://optinmonster.com/)                                           | 2,352      | 761 s        |
| [Drift](https://www.drift.com/)                                                     | 2,315      | 1116 s       |
| [Sentry](https://sentry.io/)                                                        | 2,268      | 1676 s       |
| [Squarespace](https://www.squarespace.com/)                                         | 2,115      | 825 s        |
| [Wix](https://www.wix.com/)                                                         | 2,097      | 3198 s       |
| [Yahoo Ads](https://www.media.net/)                                                 | 1,990      | 501 s        |
| [Criteo](https://www.criteo.com/)                                                   | 1,879      | 160 s        |
| [Segment](https://segment.com/)                                                     | 1,839      | 553 s        |
| [Distil Networks](https://www.distilnetworks.com/)                                  | 1,745      | 519 s        |
| [Connexity](http://connexity.com/)                                                  | 1,744      | 629 s        |
| [CreateJS CDN](http://code.createjs.com/)                                           | 1,685      | 4140 s       |
| [Stripe](https://stripe.com)                                                        | 1,570      | 364 s        |
| [Histats](http://histats.com/)                                                      | 1,524      | 519 s        |
| [Media Math](http://www.mediamath.com/)                                             | 1,523      | 1230 s       |
| [Market GID](https://www.marketgid.com/)                                            | 1,510      | 202 s        |
| [Mixpanel](https://mixpanel.com/)                                                   | 1,371      | 102 s        |
| [FontAwesome](https://fontawesome.com/)                                             | 1,275      | 128 s        |
| [MediaVine](https://www.mediavine.com/)                                             | 1,269      | 1443 s       |
| [Lucky Orange](https://www.luckyorange.com/)                                        | 857        | 803 s        |
| [WordAds](https://wordads.co/)                                                      | 766        | 1516 s       |
| [PayPayl](https://paypal.com)                                                       | 588        | 145 s        |
| [Pinterest](https://pinterest.com/)                                                 | 410        | 25 s         |
| [App Dynamics](https://www.appdynamics.com/)                                        | 397        | 43 s         |
| [New Relic](https://newrelic.com/)                                                  | 373        | 22 s         |
| [Twitch](https://twitch.tv/)                                                        | 319        | 224 s        |
| [Bootstrap CDN](https://bootstrapcdn.com/)                                          | 213        | 10 s         |

## Future Work

1.  Introduce URL-level data for more fine-grained analysis, i.e. which libraries from Cloudflare/Google CDNs are most expensive.
1.  Expand the scope, i.e. include more third parties and have greater entity/category coverage.

## FAQs

### I don't see entity X in the list. What's up with that?

This can be for one of several reasons:

1.  The entity does not have at least 100 references to their origin in the dataset.
1.  The entity's origins have not yet been identified. See [How can I contribute?](#contribute)

### The data for entity X seems wrong. How can it be corrected?

Verify that the origins in `data/entities.json` are correct. Most issues will simply be the result of mislabelling of shared origins. If everything checks out, there is likely no further action and the data is valid. If you still believe there's errors, file an issue to discuss futher.

<a name="contribute"></a>

### How can I contribute?

Only about 88% of the third party script execution has been assigned to an entity. We could use your help identifying the rest!

## Contributing

### Updating the Data

The query used to compute the origin-level data is in `sql/origin-execution-time-query.sql`, running this against the latest Lighthouse HTTP Archive should give you a JSON export of the latest data that can be checked in at `data/YYYY-MM-DD-origin-scripting.json`.

### Updating this README

This README is auto-generated from the template `lib/template.md` and the computed data. In order to update the charts, you'll need to make sure you have `cairo` installed locally in addition to `yarn install`.

```bash
# Install `cairo` and dependencies for node-canvas
brew install pkg-config cairo pango libpng jpeg giflib
```
