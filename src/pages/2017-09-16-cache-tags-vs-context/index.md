---
title: Cache Tags vs Cache Contexts
date: "2017-08-29"
path: "/cache-tags-vs-contexts/"
---

When starting to learn about Drupal 8's shiny new caching capabilities, I kept getting hung up on the difference between cache tags and cache contexts. The concepts made sense to me on a high level, but I was having trouble understanding the mechanics of how they were used in practice. The [cache api page](https://api.drupal.org/api/drupal/core!core.api.php/group/cache/8.2.x) and [Cache API documentation](https://www.drupal.org/node/1884796) on D.O is a great introduction, but I've always learned best from examples.

## Cache Tags

Used for cache invalidation, cache tags are strings that tell Drupal's cache system what a particular item in the cache depends on. This record of a cache item's dependencies is important because each cache items is often made up of many interdependent pieces. For example, consider a block that is placed on only 2 pages of your site. Each time that block is updated, the cached response for those two pages needs to be invalidated so that subsequent page loads get fresh data instead of stale, cached data. When you update that block, any item in the cache that contains the cache tags for that block (aka any cache items that depend on that block) are invalidated.

For a concrete example, let's examine the cache tags for the `bartik_footer` block as found in the render cache (`cache_render` table in the db):

`block_view config:block.block.bartik_footer config:system.menu.footer rendered`

Each cache tag is separated by a space, and as we can see this block has 4 cache tags:

- block_view
- config:block.block.bartik_footer
- config:system.menu.footer
- rendered

Any action that changes the data for this block can invalidate this cache item by calling `invalidateTags()` with one or more of these cache tags.

## Cache Contexts

At a basic level, cache contexts are used to create the `cid` (cache ID) of a cache item. Once I understood that, this concept made a lot more sense to me. Here is the `cid` from the `bartik_footer` block we examined above.

`entity_view:block:bartik_footer:[languages:language_interface]=en:[route.menu_active_trails:footer]=menu_trail.footer|:[theme]=bartik:[user.permissions]=a4dcfe419d68eb5b1df38632c9b9d087dbd92163b9031a4ef2ca80db8757b538`

If you take a moment to read through that, you'll notice that it's basically a concatenated string containing all of the ways this rendered element can vary. For example, if you render this block in spanish, you would not want to use the cached output for the english version. That's taken care of by `[languages:language_interface]=en`. If you try to generate this block with spanish as the active interface language, you'll end up with a new variant (aka new row in the `cache_render` table) containing `[languages:language_interface]=es`.

As that example hopefully illustrated for you, cache contexts are used to cache contextually dependent data (one of the contexts being `[languages:language_interface]=en` in the example above). 

## Summary

So as we can see, cache contexts and cache tags work together quite nicely. Cache tags are used to precisely target cache items for invalidation. When anything on the system is updated, we can use its cache tags to invalidate anything else that depends on it.

Cache contexts are used to create `cid`'s with enough specificity as to not serve contextually incorrect data. Any part of a cached item that could vary depending on the context in which that item was created will be concatenated into it's `cid`. That way Drupal knows the context under which that cache item is valid in the future.

## Extra Credit

There is a lot more going in Drupal's caching system than I can cover in a single blog post. It's a complex system with a lot of moving parts, but it's a huge improvement over what we had in Drupal 7. Here are some links that will help you dive deeper into the cache capabilities of Drupal 8.

- [Making Drupal fly - The fastest Drupal ever is here!](https://events.drupal.org/barcelona2015/sessions/making-drupal-fly-fastest-drupal-ever-here) - Drupalcon Barcelona presentation by Wim Leers and Fabian Franz. Highly recommended.
- [Cacheability of render arrays](https://www.drupal.org/docs/8/api/render-api/cacheability-of-render-arrays) - This has some great example code snippets illustrating how to use cache tags and cache contexts on a render array.
- [Easily view cacheability metadata of your site](https://www.drupal.org/docs/8/api/responses/cacheableresponseinterface#debugging)