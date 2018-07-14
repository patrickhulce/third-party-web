# Third Party Web

This document is a summary of which third party scripts are most responsible for excessive JavaScript execution on the web today.

## Table of Contents

1.  [Goals](#goals)
1.  [Methodology](#methodology)
1.  [Data](#data)
    1.  [How to Interpret](#how-to-interpet)
    1.  [Third Parties by Category](#by-category)
        1.  [Ads](#ad)
        1.  [Analytics](#analytics)
        1.  [Social](#social)
        1.  [Video](#video)
        1.  [Developer Utilities](#utility)
        1.  [Hosting Platforms](#hosting)
        1.  [Marketing](#marketing)
        1.  [Customer Success](#customer-success)
        1.  [Other](#other)
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

### Summary

Across ~1 million sites, ~600 origins account for ~47% of all script execution time with the top 100 entities already accounting for ~42%. Third party script execution is a sizable chunk of the web today, and it's important to make informed choices.

### How to Interpret

Each entity has a number of data points available.

1.  **Popularity (Total Number of Occurrences)** - how many scripts from their origins were included on pages
1.  **Total Impact (Total Execution Time)** - how many seconds were spent executing their scripts across the web
1.  **Average Impact (Average Execution Time)** - on average, how many milliseconds were spent executing each script
1.  **Category** - what type of script is this

<a name="by-category"></a>

### Third Parties by Category

This section breaks down third parties by category. The third parties in each category are ranked from first to last based on the average impact of their scripts. Perhaps the most important comparisons lie here. You always need to pick an analytics provider, but at least you can pick the most well-behaved analytics provider.

#### Overall Breakdown

Unsurprisingly, ads account for the largest chunk of third party script execution followed by social and analytics.

![breakdown by category](./by-category.png)

<a name="ad"></a>

#### Ads

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

| Rank | Name                                                               | Popularity | Average Impact |
| ---- | ------------------------------------------------------------------ | ---------- | -------------- |
| 1    | [Mixpanel](https://mixpanel.com/)                                  | 1,371      | 75 ms          |
| 2    | [Google Analytics](https://www.google.com/analytics/analytics/)    | 205,702    | 85 ms          |
| 3    | [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)      | 12,744     | 90 ms          |
| 4    | [Hotjar](https://www.hotjar.com/)                                  | 17,635     | 91 ms          |
| 5    | [Adobe Analytics](https://www.adobe.com/analytics-cloud.html)      | 5,767      | 220 ms         |
| 6    | [Salesforce](https://www.salesforce.com/products/marketing-cloud/) | 4,804      | 251 ms         |
| 7    | [Tealium](https://tealium.com/)                                    | 3,066      | 254 ms         |
| 8    | [Optimizely](https://www.optimizely.com/)                          | 4,671      | 296 ms         |
| 9    | [Segment](https://segment.com/)                                    | 1,839      | 301 ms         |
| 10   | [Histats](http://histats.com/)                                     | 1,524      | 341 ms         |
| 11   | [Connexity](http://connexity.com/)                                 | 1,744      | 361 ms         |
| 12   | [Yandex Metrica](https://metrica.yandex.com/about?)                | 26,891     | 371 ms         |
| 13   | [Lucky Orange](https://www.luckyorange.com/)                       | 857        | 937 ms         |

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

These scripts are developer utilities (API clients, site monitoring, fraud detection, etc).

| Rank | Name                                                               | Popularity | Average Impact |
| ---- | ------------------------------------------------------------------ | ---------- | -------------- |
| 1    | [New Relic](https://newrelic.com/)                                 | 373        | 59 ms          |
| 2    | [OneSignal](https://onesignal.com/)                                | 6,420      | 93 ms          |
| 3    | [App Dynamics](https://www.appdynamics.com/)                       | 397        | 108 ms         |
| 4    | [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/) | 104,190    | 125 ms         |
| 5    | [Stripe](https://stripe.com)                                       | 1,570      | 232 ms         |
| 6    | [PayPayl](https://paypal.com)                                      | 588        | 247 ms         |
| 7    | [Distil Networks](https://www.distilnetworks.com/)                 | 1,745      | 298 ms         |
| 8    | [Cloudflare](https://www.cloudflare.com/website-optimization/)     | 4,398      | 300 ms         |
| 9    | [Yandex APIs](https://yandex.ru/)                                  | 3,558      | 366 ms         |
| 10   | [Sentry](https://sentry.io/)                                       | 2,268      | 739 ms         |

<a name="hosting"></a>

#### Hosting Platforms

These scripts are from web hosting platforms (WordPress, Wix, Squarespace, etc). Note that in the case of WordPress, this just indicates the libraries hosted and served by WordPress not all sites using self-hosted WordPress.

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
| 2    | [Mailchimp](https://mailchimp.com/)       | 872        | 194 ms         |
| 3    | [OptinMonster](https://optinmonster.com/) | 2,352      | 324 ms         |
| 4    | [Sumo](https://sumo.com/)                 | 6,677      | 379 ms         |
| 5    | [Drift](https://www.drift.com/)           | 2,315      | 482 ms         |

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

<a name="other"></a>

#### Other

These are miscellaneous scripts delivered via a shared CDN. This category is unique in that the origin may have no responsibility for the performance of what's being served. Note that rank here does not imply one CDN is better than the other. It simply indicates that the scripts being served from that origin are lighter/heavier than the ones served by another.

| Rank | Name                                                         | Popularity | Average Impact |
| ---- | ------------------------------------------------------------ | ---------- | -------------- |
| 1    | [Bootstrap CDN](https://bootstrapcdn.com/)                   | 213        | 45 ms          |
| 2    | [FontAwesome CDN](https://fontawesome.com/)                  | 1,275      | 101 ms         |
| 3    | [Yandex CDN](https://yandex.ru/)                             | 311        | 167 ms         |
| 4    | [jQuery CDN](https://code.jquery.com/)                       | 20,140     | 168 ms         |
| 5    | [Cloudflare CDN](https://cdnjs.com/)                         | 15,088     | 192 ms         |
| 6    | [Google CDN](https://developers.google.com/speed/libraries/) | 85,536     | 212 ms         |
| 7    | [Amazon S3](https://aws.amazon.com/s3/)                      | 2,625      | 222 ms         |
| 8    | [JSDelivr](https://www.jsdelivr.com/)                        | 3,537      | 351 ms         |
| 9    | [Parking Crew](http://parkingcrew.net/)                      | 2,887      | 426 ms         |
| 10   | [CreateJS CDN](http://code.createjs.com/)                    | 1,685      | 2457 ms        |

<a name="by-total-impact"></a>

### Third Parties by Total Impact

This section highlights the entities responsible for the most script execution across the web. This helps inform which improvements would have the largest total impact.

| Name                                                               | Popularity | Total Impact | Average Impact |
| ------------------------------------------------------------------ | ---------- | ------------ | -------------- |
| [Google Ads](https://www.google.com/adsense/start)                 | 389,341    | 173140 s     | 445 ms         |
| [Facebook](https://www.facebook.com)                               | 162,080    | 27354 s      | 169 ms         |
| [YouTube](https://youtube.com)                                     | 54,390     | 22358 s      | 411 ms         |
| [Google CDN](https://developers.google.com/speed/libraries/)       | 85,536     | 18098 s      | 212 ms         |
| [Google Analytics](https://www.google.com/analytics/analytics/)    | 205,702    | 17504 s      | 85 ms          |
| [Google APIs/SDK](https://developers.google.com/apis-explorer/#p/) | 104,190    | 13031 s      | 125 ms         |
| [Yandex Metrica](https://metrica.yandex.com/about?)                | 26,891     | 9968 s       | 371 ms         |
| [AddThis](http://www.addthis.com/)                                 | 36,499     | 7383 s       | 202 ms         |
| [Popads](https://www.popads.net/)                                  | 2,808      | 6702 s       | 2387 ms        |
| [Twitter](https://twitter.com)                                     | 37,744     | 5689 s       | 151 ms         |
| [Zopim](https://www.zopim.com/)                                    | 6,367      | 4623 s       | 726 ms         |
| [Moat](https://moat.com/)                                          | 5,599      | 4623 s       | 826 ms         |
| [CreateJS CDN](http://code.createjs.com/)                          | 1,685      | 4140 s       | 2457 ms        |
| [jQuery CDN](https://code.jquery.com/)                             | 20,140     | 3378 s       | 168 ms         |
| [Wix](https://www.wix.com/)                                        | 2,097      | 3198 s       | 1525 ms        |
| [Integral Ads](https://integralads.com/uk/)                        | 6,679      | 2986 s       | 447 ms         |
| [Cloudflare CDN](https://cdnjs.com/)                               | 15,088     | 2896 s       | 192 ms         |
| [Sumo](https://sumo.com/)                                          | 6,677      | 2528 s       | 379 ms         |
| [Yandex Ads](https://yandex.com/adv/)                              | 4,810      | 2475 s       | 515 ms         |
| [ZenDesk](https://zendesk.com/)                                    | 2,927      | 2241 s       | 766 ms         |
| [Intercom](https://www.intercom.com/)                              | 2,795      | 2015 s       | 721 ms         |
| [Tumblr](https://tumblr.com/)                                      | 4,717      | 1931 s       | 409 ms         |
| [Shopify](https://www.shopify.com/)                                | 8,537      | 1855 s       | 217 ms         |
| [ShareThis](https://www.sharethis.com/)                            | 3,746      | 1787 s       | 477 ms         |
| [Sentry](https://sentry.io/)                                       | 2,268      | 1676 s       | 739 ms         |
| [Hotjar](https://www.hotjar.com/)                                  | 17,635     | 1613 s       | 91 ms          |
| [WordAds](https://wordads.co/)                                     | 766        | 1516 s       | 1979 ms        |
| [MediaVine](https://www.mediavine.com/)                            | 1,269      | 1443 s       | 1137 ms        |
| [DoubleVerify](https://www.doubleverify.com/)                      | 2,752      | 1411 s       | 513 ms         |
| [Optimizely](https://www.optimizely.com/)                          | 4,671      | 1384 s       | 296 ms         |
| [Wistia](https://wistia.com/)                                      | 5,062      | 1345 s       | 266 ms         |
| [Cloudflare](https://www.cloudflare.com/website-optimization/)     | 4,398      | 1320 s       | 300 ms         |
| [Yandex APIs](https://yandex.ru/)                                  | 3,558      | 1303 s       | 366 ms         |
| [Adobe Analytics](https://www.adobe.com/analytics-cloud.html)      | 5,767      | 1269 s       | 220 ms         |
| [JSDelivr](https://www.jsdelivr.com/)                              | 3,537      | 1243 s       | 351 ms         |
| [Media Math](http://www.mediamath.com/)                            | 1,523      | 1230 s       | 807 ms         |
| [Parking Crew](http://parkingcrew.net/)                            | 2,887      | 1229 s       | 426 ms         |
| [Salesforce](https://www.salesforce.com/products/marketing-cloud/) | 4,804      | 1205 s       | 251 ms         |
| [Baidu Analytics](https://tongji.baidu.com/web/welcome/login)      | 12,744     | 1145 s       | 90 ms          |
| [Drift](https://www.drift.com/)                                    | 2,315      | 1116 s       | 482 ms         |
| [LiveChat](https://www.livechatinc.com/)                           | 6,252      | 1111 s       | 178 ms         |
| [Yandex Share](https://yastatic.net/share2/share.js)               | 6,865      | 928 s        | 135 ms         |
| [WordPress](https://wp.com/)                                       | 7,118      | 890 s        | 125 ms         |
| [Olark](https://www.olark.com/)                                    | 2,734      | 868 s        | 318 ms         |
| [Squarespace](https://www.squarespace.com/)                        | 2,115      | 825 s        | 390 ms         |
| [Lucky Orange](https://www.luckyorange.com/)                       | 857        | 803 s        | 937 ms         |
| [Tealium](https://tealium.com/)                                    | 3,066      | 779 s        | 254 ms         |
| [OptinMonster](https://optinmonster.com/)                          | 2,352      | 761 s        | 324 ms         |
| [AppNexus](https://www.appnexus.com/)                              | 2,742      | 731 s        | 266 ms         |
| [Tawk.to](https://www.tawk.to/)                                    | 2,574      | 717 s        | 278 ms         |
| [Connexity](http://connexity.com/)                                 | 1,744      | 629 s        | 361 ms         |
| [OneSignal](https://onesignal.com/)                                | 6,420      | 600 s        | 93 ms          |
| [Taboola](https://www.taboola.com/)                                | 2,848      | 600 s        | 211 ms         |
| [Amazon S3](https://aws.amazon.com/s3/)                            | 2,625      | 583 s        | 222 ms         |
| [Segment](https://segment.com/)                                    | 1,839      | 553 s        | 301 ms         |
| [Histats](http://histats.com/)                                     | 1,524      | 519 s        | 341 ms         |
| [Distil Networks](https://www.distilnetworks.com/)                 | 1,745      | 519 s        | 298 ms         |
| [Yahoo Ads](https://www.media.net/)                                | 1,990      | 501 s        | 252 ms         |
| [Vimeo](http://vimeo.com/)                                         | 3,543      | 497 s        | 140 ms         |
| [Hubspot](https://hubspot.com/)                                    | 4,887      | 452 s        | 92 ms          |
| [Pubmatic](https://pubmatic.com/)                                  | 4,462      | 435 s        | 98 ms          |
| [MGID](https://www.mgid.com/)                                      | 2,555      | 375 s        | 147 ms         |
| [Stripe](https://stripe.com)                                       | 1,570      | 364 s        | 232 ms         |
| [Twitch](https://twitch.tv/)                                       | 319        | 224 s        | 701 ms         |
| [Market GID](https://www.marketgid.com/)                           | 1,510      | 202 s        | 134 ms         |
| [Mailchimp](https://mailchimp.com/)                                | 872        | 169 s        | 194 ms         |
| [Criteo](https://www.criteo.com/)                                  | 1,879      | 160 s        | 85 ms          |
| [PayPayl](https://paypal.com)                                      | 588        | 145 s        | 247 ms         |
| [FontAwesome CDN](https://fontawesome.com/)                        | 1,275      | 128 s        | 101 ms         |
| [VK](https://vk.com/)                                              | 4,227      | 126 s        | 30 ms          |
| [Mixpanel](https://mixpanel.com/)                                  | 1,371      | 102 s        | 75 ms          |
| [Yandex CDN](https://yandex.ru/)                                   | 311        | 52 s         | 167 ms         |
| [App Dynamics](https://www.appdynamics.com/)                       | 397        | 43 s         | 108 ms         |
| [Pinterest](https://pinterest.com/)                                | 410        | 25 s         | 61 ms          |
| [New Relic](https://newrelic.com/)                                 | 373        | 22 s         | 59 ms          |
| [Bootstrap CDN](https://bootstrapcdn.com/)                         | 213        | 10 s         | 45 ms          |

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

Only about 90% of the third party script execution has been assigned to an entity. We could use your help identifying the rest! See [Contributing](#contributing) for details.

## Contributing

### Updating the Data

The query used to compute the origin-level data is in `sql/origin-execution-time-query.sql`, running this against the latest Lighthouse HTTP Archive should give you a JSON export of the latest data that can be checked in at `data/YYYY-MM-DD-origin-scripting.json`.

### Updating this README

This README is auto-generated from the template `lib/template.md` and the computed data. In order to update the charts, you'll need to make sure you have `cairo` installed locally in addition to `yarn install`.

```bash
# Install `cairo` and dependencies for node-canvas
brew install pkg-config cairo pango libpng jpeg giflib
```
