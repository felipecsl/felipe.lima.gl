---
comments: true
date: 2009-10-21 07:01:00
layout: post
slug: asp-net-mvc-and-iis-6
title: ASP.NET MVC and IIS 6
wordpress_id: 19
---

I've been playing lately with ASP.NET MVC 2 Preview 2. I had no previous experience with this and it has been kind of a change in paradigms changing from web forms to mvc. At the same time, I feel very excited about this and believe that It is a big step forward when compared to web forms, mainly due to the separation of concerns and responsibilities.

As a drawback, It is very weird not to be able to drop ASP.NET server controls in the page. Initially, you'll feel a bit 'lost'. MVC uses a different method to render the page. You don't have the runat='server' stuff anymore so, instead, you'll have to render the page mostly based on what you have in your ViewData. It's not my objective to explain its functionality here, but you can find further information at the [official MVC website](http://www.asp.net/mvc/). The latest release can be downloaded from [CodePlex](http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=33836).

While testing my application in my hosting provider, I had a big headache since they have Windows 2003 Server installed, which comes with IIS 6. ASP.NET MVC requires a bit of work in order to work with IIS6, especially if your hosting provider does not have MVC installed in the GAC.

I would definitely suggest [Phil Haack's blog](http://haacked.com/) as the first point for reference on this subject. There are two key posts regarding this issue that I followed in order to make it work.

First of all, MVC assembly needs to be deployed in the application Bin directory if it is not installed in the server. Detailed info [here](http://haacked.com/archive/2008/11/03/bin-deploy-aspnetmvc.aspx).

Second, you'll need to change the application routes for IIS 6 to correctly receive the requests and forward them to the controllers. Haacked.com walkthrough [here](http://haacked.com/archive/2008/11/26/asp.net-mvc-on-iis-6-walkthrough.aspx).

As a last tip, I also found out that my MVC application wouldn't work if I used VS Publish tool to send it to the production server after following the two steps above. No clue why, but just copying the whole website files to the server worked fine. Weird!
