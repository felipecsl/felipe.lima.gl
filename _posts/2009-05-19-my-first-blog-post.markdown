---
comments: true
date: 2009-05-19 21:00:00
layout: post
slug: my-first-blog-post
title: My first blog post
wordpress_id: 41
---

I've been lately playing with this blog, customizing preparing the floor for this first post. I've used for this, the [BlogEngine.NET](http://www.dotnetblogengine.net/), which seems to be very powerfull and versatile.

I opted for a simple and clean dark look instead of a heavy fractal background image and transparency on posts, which was pretty cool, but bad for reading. For the title gradient look, I was inspired by a nice post in Tutorial9 website, which has some good web design tips and tutorials. [Check out](http://www.tutorial9.net/photoshop/5-pixel-popping-techniques/).

The intent of this blog is to register and share my findigs on any topic, language and subject that is related to programming and software development in a general way. I'll post my findings as soon as I have something new and useful to post!

My interests are .NET Framework development, specially web-based (ASP.NET) with C#; Javascript, HTML, CSS, Flash Development (ActionScript) and so forth.

So, to officially open this blog, I start with a quick z-axis CSS trick that I found out lately:

In order to be able to specify a z-index to an element in an HTML page, that element must be absolutely positioned (position: absolute), as per [w3-schools.](http://www.w3schools.com/Css/pr_pos_z-index.asp) You can achieve this by setting only your inner-most div to position:absolute, since absolute positioned elements are not repositioned when the window is resized, so it would be probably useful to put it inside a centered div in order to not to compromise the whole page appearance.
