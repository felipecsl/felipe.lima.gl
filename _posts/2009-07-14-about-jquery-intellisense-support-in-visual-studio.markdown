---
comments: true
date: 2009-07-14 22:46:00
layout: post
slug: about-jquery-intellisense-support-in-visual-studio
title: About jQuery intellisense support in Visual Studio
wordpress_id: 30
---

I just found out that there is an effort at Microsoft together with the jQuery team in order to add intellisense support for this framework in Visual Studio 2008. We all know that the javascript intellisense support in VS has always been almost none, but now it seems that the guys at Microsoft are changing the way and starting to support it progressively, starting by including it in its ASP.NET MVC package and adding intellisense support for interaction with the AJAX framework.

I've been trying to enable this functionality today and found out that it just isn't worth the effort, at least for the latest jQuery version (1.3.2). Basically, you need to first off [install a patch](http://weblogs.asp.net/scottgu/archive/2008/11/21/jquery-intellisense-in-vs-2008.aspx) to enable the functionality. Then, you'll need a -vsdocs.js file, which is just an API descriptor containing all the documentation for the framework. It is not actually a js file. You can find more detailed information [here](http://blogs.ipona.com/james/archive/2009/01/14/jquery-1.3-and-visual-studio-2008-intellisense.aspx). Then, JScript IntelliSense will parse all the included js files and check for errors. If it thinks that one of your included script files isn't good, intellisense just won't work. The problem is that it complains about the actual jQuery file not being well formed:

**"Warning\*\*** \***\*15\*\*** \***\*Error updating JScript IntelliSense: C:\....\javascript\jquery-1.3.js: Object doesn't support this property or method @ 2069:1"**

Just to shorten the story, you'll get to spend some time trying to make it to work, probably without success and then will give up miserably (my case). The fact is that it just isn't worth all the work, while you still have a [decent online documentation](http://docs.jquery.com/Main_Page) to help.

In the end, you'll have to calm down and wait a little bit while Visual Studio 2010 is still beta since jQuery will be shipped with VS2010 and it will include built-in robust intellisense and documentation (not from a downloaded patch). This is good news for us all! In the meantime, let's wait for the final release :)

[Update 07/17/2009]

Just ran into a great post about this exactly same subject at [learninjquery.com](http://www.learningjquery.com/2009/07/setting-up-visual-studio-intellisense-for-jquery#more-822) which was an eye-opener to me. It is actually very simple to make it work if you know exactly what has to be done. And what has to be done is just to add the /// reference comment to the start of your javascript file and everything works seamlessly. No need to include the -vsdocs in the actual html file at all! Of course that if you have different scenarios like custom controls, dynamically generated javascript, etc., this may become painful again, but for the regular usage, this post at learningjquery.com will set you will all that is needed to be ready to go in minutes.
