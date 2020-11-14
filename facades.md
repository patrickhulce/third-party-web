# Facade data in third-party-web

In addition to identifying entities and products, third-party-web also includes data on available alternative libraries for products known as _facades_. A _facade_ is a static element which looks similar to the actual embedded resource, but is not functional and therefore much less taxing on the page load.

[Lighthouse](https://github.com/GoogleChrome/lighthouse) 7.0 has a new audit that identifies third-party 
embeds (link coming soon) that can be lazy loaded with a facade. The Lighthouse audit is powered by the facade data in third-party-web.

## Terminology

* **third-party product:** a third-party resource that is included on a page.
    * For example: a YouTube embed iframe.
* **facade**: a frontend component of HTML/CSS/JS/etc that 
  mimics the look of a third-party product and lazily loads it upon user 
  interaction. It's expected to be significantly more lightweight/faster.
    * For example: a [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed).

## Criteria for adding a new facade
### Basic functionality

* Loads an HTML component on page load which looks like the actual third-party 
  embed.
* Replaces that component with the actual third-party embed after some user 
  interaction.
    * User clicks on it, mouses over, etc.

### Well Maintained

* The projects issues and contributions are managed responsibly. Bugs are 
  handled swiftly.
* Is already used in production, ideally by users other than the creator.

### Orthogonal

* The facade handles a use case not covered by existing facades. For example: a 
  lite-youtube clone isn't differentiated, but a react port of lite-youtube 
  would work.

### Small Payload

* Should be significantly smaller in comparison to the deferred third-party 
  product.
    * The JS/CSS/image/etc payload should be the minimum size necessary to mimic 
      the product. (A rough rule of thumb is a facade should be &lt; 10% of the 
      product it's mimicking)
    * We'd expect the facade to score 99+ in Lighthouse if it's tested on an 
      otherwise-blank page.
    * Any required images should be as small as is reasonable. Using blurred, low-res,
      or [SQIP](https://calendar.perfplanet.com/2017/sqip-vague-vectors-for-performant-previews/) 
      techniques may be advantageous.

## Submission Process

Anyone can propose changes, by making a pull request to this repo. Proposals 
don't necessarily need to be submitted by the creator.

Read 
[contributing](https://github.com/patrickhulce/third-party-web#contributing) for 
basics; look in `data/entities.js` for `products` to see how the data is structured.
