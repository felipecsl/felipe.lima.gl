---
comments: true
date: 2010-03-19 15:10:00
layout: post
slug: how-to-disable-annoying-request-validation
title: How to disable annoying request validation
wordpress_id: 12
---

If I summed it all up, I must have spent more than a day struggling to disable request validation with asp.net mvc. It is just ridiculously hard to disable it.

It turns out that the only way to disable it once and for all is a combination of a setting in the web.config and the ValidateRequestAttribute.

1. Add the following line to your web.config file right after <system.web>: **<httpRuntime requestValidationMode="2.0" />**
2. Add the **[ValidateInput(false)]** attribute to the controller **and** the action method you want to expose
3. Rebuild the project and go drink a beer.

Remember it may be unsafe to disable request validation due to potential vulnerability [XSS](http://en.wikipedia.org/wiki/Cross-site_scripting) and [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks.

Note: This is targeted to ASP.NET 4, when the [requestValidationMode](<http://www.asp.net/(S(ywiyuluxr3qb2dfva1z5lgeg))/learn/whitepapers/aspnet4/breaking-changes/#_TOC7>) attribute was introduced. In .NET 3.5, you can skip the first step and only do 2 and 3, but I'm not 100% positive about that.

Happy coding :)
