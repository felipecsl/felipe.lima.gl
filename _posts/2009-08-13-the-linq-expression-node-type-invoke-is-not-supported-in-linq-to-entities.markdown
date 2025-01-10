---
comments: true
date: 2009-08-13 11:30:00
layout: post
slug: the-linq-expression-node-type-invoke-is-not-supported-in-linq-to-entities
title: The LINQ expression node type 'Invoke' is not supported in LINQ to Entities.
wordpress_id: 25
---

[Some time ago](/post/More-on-the-Entity-Framework.aspx), I wrote about predicate building with the Entity Framework and how the use of AsExpandable solves the issue. Frequently, people see and ask me about the following error, which is also associated with the same root cause that I blogged about in my previous post. However, it may be a bit confusing as to what is the cause of the following exception:

**_The LINQ expression node type 'Invoke' is not supported in LINQ to Entities._**

Again, as I stated before, calling LinqKit's **AsExpandable **solves this problem. As per [Tomas Petricek](http://tomasp.net/blog/linq-expand.aspx) (the creator of a good part of this great work):

>

>

    "(...) `ToExpandable` creates a thin wrapper around the DLINQ `Table` object.
    Thanks to this wrapper you can use second method called `Invoke` that extends the `Expression`
    class to invoke the lambda expression while making it still possible to translate query to T-SQL. This works
    because when converting to the expression tree, the wrapper replaces all occurrences of `Invoke` method by
    expression trees of the invoked lambda expression and passes these expressions to DLINQ that is able to translate
    the expanded query to T-SQL."

>
