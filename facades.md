# Adding a new facade to third-party-web

Lighthouse 7.0 includes a new audit to flag third-party 
embeds (link coming soon) that can be lazy loaded with a facade. The 
documentation lists recommended facades. If you'd like to add a facade to the 
list of recommendations, please read the guidance below.

## Terminology

* **third-party product:** a third-party resource that is included on a page.
    * For example: a YouTube embed iframe.
* **facade**: a frontend component/library/project of HTML/CSS/JS/etc that 
  mimics the look of a third-party product and lazily loads it upon user 
  interaction.
    * For example: a [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed).

## Criteria
### Functions as a facade

* Loads a HTML component on page load which looks like the actual third-party 
  embed.
* Replaces that component with the actual third-party embed after some user 
  interaction
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
    * Any required images should be small as is reasonable.

## Submitting

Anyone can propose changes, by making a pull request to this repo. Proposals 
don't necessarily need to be submitted by the creator.

Read 
[contributing](https://github.com/patrickhulce/third-party-web#contributing) for 
basics; look in `data/entities.js` for `products` to see how the data is structured.
