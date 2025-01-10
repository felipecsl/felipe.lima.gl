---
comments: true
date: 2010-04-24 11:11:00
layout: post
slug: wcf-data-services-and-the-odata-protocol
title: WCF Data Services and the OData protocol
wordpress_id: 10
---

During the last days, I've been watching some cool MIX'10 videos with Scott Hanselman. One of them took my attention specially, which is this one: [Beyond File | New Company: From Cheesy Sample to
Social Platform.](http://bit.ly/9KjsYr)

Scott takes a simple website like [nerddinner.com](/admin/Pages/nerddinner.com) and shows how they tuned it up to enable several different social collaboration, integration and emergent features in it. It is really worth the time watching.

One of the points that really made me curious, was the new [OData](http://www.odata.org/) protocol. It was introduced in.NET 4 with [WCF Data Services](http://msdn.microsoft.com/en-us/data/bb931106.aspx) (formerly ADO.NET Data Services) and aims to unlock data from its silos that exist in major applications today. What's really impressive about it, is that you are able to query it as a web service and perform complex Linq queries against it (even inserting, updating and deleting are supported!). All this, over a common RESTful Http interface. OData is built upon the [AtomPub](http://en.wikipedia.org/wiki/Atom_%28standard%29) format, so there is nothing being invented here. [This presentation](http://microsoftpdc.com/Sessions/FT12) at PDC'09 with Pablo Castro provides further techincal details and I definitely recommend watching if you plan to make use of this technology.

I'm planning on implementing this on a Website CMS I'm working on and will write about my findings, barriers found and solutions here in the near future. Stay tuned.
