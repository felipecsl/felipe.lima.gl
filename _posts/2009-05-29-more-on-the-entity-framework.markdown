---
comments: true
date: 2009-05-29 11:56:00
layout: post
slug: more-on-the-entity-framework
title: More on the Entity Framework
wordpress_id: 39
---

In my last blog post I wrote a quick introduction on the Entity Framework. I've been playing with it for the last couple days. I must say I had a bit of a hard time trying to make it work. The good part is that I discovered some nice stuff when searching for solutions.

With Linq, you are able to build a query predicate dinamically with the extension method IQueryable<TSource> Where<TSource>:

```c#
var queryResults = from p in db.Products;
                   select p;
queryResults = queryResults.Where(p => p.Price < 1000);
```

But what happens if later your business logic finds out that you need to include in your results products which also cost more than $3000?

No problem! Just call "Where" again:

```c#
// (...)
queryResults = queryResults.Where(p => p.Price > 3000);
```

Right? **NO! **This would result in a query that filters the products for Price < 1000 **AND** Price > 3000. That means, you won't get any results at all! :) What you need, is an **OR** operator between your two Where predicates.

The solution for this is the [LinqKit](http://www.albahari.com/nutshell/linqkit.aspx)! It comes with a neat pack of tools for Linq, including a [PredicateBuilder](http://www.albahari.com/nutshell/predicatebuilder.aspx) with some extension method that allow you to do something like:

```c#
(...)
var queryResults = from p in db.Products;
                   select p;

var predicate = PredicateBuilder.False<Product>();
predicate = predicate.Or(p => p.Price < 1000);
predicate = predicate.Or(p => p.Price > 3000);
queryResults = queryResults.AsExpandable().Where(predicate);  // p.Price < 1000 OR p.Price > 3000
```

You must have noticed the AsExpandable() call above. As per LinqKit documentation:

"Entity Framework's query processing pipeline cannot
handle _invocation_ _expressions_, which is why you need to call **
AsExpandable** on the first object in the query. By calling AsExpandable, you
activate LINQKit's expression visitor class which substitutes invocation
expressions with simpler constructs that Entity Framework can understand."

The Entity Framework has some limitations when compared with Linq to SQL so that some method are not supported. You can check out that is supported and what is not [here](http://msdn.microsoft.com/en-us/library/bb738550.aspx).

If one attempts to use any of these unsupported methods, a runtime exception will be thrown.

PS: Thanks to [this blog post](http://www.coderesearchcenter.com/post/How-to-format-code-with-blogenginenet.aspx), I was able to write nice formatted C# source code in this post.
