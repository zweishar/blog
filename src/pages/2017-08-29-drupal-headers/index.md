---
title: Drupal 8 Response Headers Explained
date: "2017-09-17"
path: "/drupal8-response-headers/"
---

As with most web applications, Drupal makes use of a variety of response headers in order to pass information from the server to the client. Many of these headers are standardized as [defined](https://tools.ietf.org/html/rfc4229) by the IETF and [listed](https://www.iana.org/assignments/message-headers/message-headers.xhtml) by the IANA. Mozzilla web docs also has [a great listing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) of standardized http headers.

In addition to these standardized headers, Drupal makes use of proprietary response headers. Any response header that is prefixed with an `X-` is proprietary, or at least not defined by a standards body.

Before we move on, it may be interesting to note that the use of proprietary http headers prefixed with `X-` has been [deprecated](https://tools.ietf.org/html/rfc6648). Not to worry though, Drupal 8 isn't breaking any rules yet:
> (The IETF) Makes no recommendation as to whether existing "X-" parameters ought to remain in use or be migrated to a format without the "X-"; this is a matter for the creators or maintainers of those parameters.

Another thing to note is that your Drupal application may have different http headers set depending on your configurations, so the following is not meant as an exhaustive list. These are the response headers set by a fresh Drupal 8 install using the standard distribution. In addition, we'll only examine the non-standard headers as the others are documented elsewhere.

## Proprietary Response Headers specific to Drupal

- `X-Drupal-Cache-Tags` - Contains a list of the relevant cache tags for a given page. According to the [change record](https://www.drupal.org/node/2222835), this header allows for cache tag based invalidation of reverse proxies like Varnish. In addition, it makes it easier to debug and write tests for cache tag implementations as a developer. It will only be present if you [configure your site](https://www.drupal.org/docs/8/api/responses/cacheableresponseinterface#debugging) for debugging.
- `X-Drupal-Cache-Contexts` - Goes hand-in-hand with `X-Drupal-Cache-Tags`. This header lists the relevant [cache contexts](https://www.drupal.org/docs/8/api/cache-api/cache-contexts) for a given page. It will only be present if you [configure your site](https://www.drupal.org/docs/8/api/responses/cacheableresponseinterface#debugging) for debugging.
- `X-Drupal-Dynamic-Cache` - Reports [dynamic page cache](https://www.drupal.org/docs/8/core/modules/dynamic-page-cache/overview) status for the current page, either `HIT`, `MISS` or `UNCACHEABLE`. This sounds straightforward, but can be confusing when comparing alongside other cache hit oriented headers like `X-Drupal-Cache`. [This thread](https://www.drupal.org/node/2640292) contains a nice explanation of how this header might be confusing at first as well as a [quick exercise](https://www.drupal.org/node/2640292#comment-11436217) that you can carry out locally to learn more about it. You must have the `dynamic_page_cache` module enabled in order for this header to be set.
- `X-Drupal-Cache` - Reports [internal page cache](https://www.drupal.org/docs/8/administering-drupal-8-site/internal-page-cache) status for a given page, either `HIT` or `MISS`. You must have the `page_cache` module enabled and you must visit the site as an anonymous user in order for this header to be set.

## Non-standard Response Headers

- `X-Content-Type-Options` - Some browsers conduct [MIME Sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#MIME_sniffing) in an attempt to correct improperly set MIME type. This behavior is now considered a security vulnerability as changing the MIME type of a resource can change its ability to be executed. Drupal sets this header to `nosniff`, which instructs the browser to respect the MIME type set by the `Content-Type` header. According to [Mozzilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options) this header was introduced by Microsoft in IE 8. 
- `X-Frame-Options` - Dictates allowed behavior for embedding your site in an `<iframe>`, `<frame>` or `<object>`. [Starting in Drupal 7.5](https://www.drupal.org/node/2735873) this header is set to `SAMEORIGIN` by default. This means that your site cannot be embedded into a site under a different domain name, but can be embedded into any site under the source domain. This is a security measure meant to protect users from [Clickjacking](https://www.owasp.org/index.php/Clickjacking). 
- `X-UA-Compatible` - This header tells Internet Explorer(IE) how to render your page. You can use this header to specify which rendering engine IE should use to render your page. Drupal 8 sets this to `IE=Edge` [by default](https://www.drupal.org/node/1511040), which tells IE to render your page in EdgeHTML mode, the highest standards mode available to the browser.

## How to inspecting headers 
If you're curious about the headers being set by your application, you can inspect them yourself. The two methods that I prefer are:

`curl -I https://your-domain.com`

The output of this command can be hard to read if you have many headers to sift through. If you want to filter the results you can pipe this command through `grep` like this: `curl -I https://your-domain.com | grep X-`.

**Chrome developer tools**
- Right click on the page and select inspect
- Choose the network tab at the top of your dev tools
- Filter down to `Doc` resource type
- Click your document and the a dialogue box with your headers will pop up on the right of the screen. If you don't see your document at first, reload the page