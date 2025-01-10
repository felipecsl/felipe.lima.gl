---
comments: true
date: 2009-09-03 11:21:00
layout: post
slug: will-html-5-create-a-new-milestone-in-web-development
title: Will HTML 5 create a new milestone in Web development?
wordpress_id: 22
---

If you've been on the latest news on the web development standards, you probably know that [HTML version 5](http://en.wikipedia.org/wiki/HTML_5) is slowly being adopted by mainstream browsers, despite it has not reached its final release yet (it is still a draft). I've always been a fan of the impressive results that you can get with Adobe Flash and, since it is today present in [almost 99% of the browsers](http://www.adobe.com/products/player_census/flashplayer/version_penetration.html), it has been almost a no-brainer for anyone that wanted to create a highly dynamic and interactive website for the last couple years. Despite its many drawbacks, Flash has managed to become almost ubiquitous and extremely popular in the web. Just to cite a few of these weaknesses:

- It is a proprietary technology held by Adobe. This, by definition, is not good for the community, since we're all in Adobe's hands;
- Even after 10 major releases during the last 13 years, Adobe did not managed to create a decent IDE for it, which today still relies mainly on a timeframe for movie clip creation and has poor debugging support;
- Its programming language, [ActionScript](http://en.wikipedia.org/wiki/ActionScript), which only recently became more robust with its version 3, is based on ECMAScript (prototype oriented), which implies loose typing and few compile time checks -> more runtime errors.

Now that HTML5 is here, we're clearly seeing that Flash is slowly and progressively losing market share, mostly because of the new [**canvas**](http://en.wikipedia.org/wiki/Canvas_%28HTML_element%29) element introduced with this standard. Canvas allows 2D vector based drawing directly to the browser. This opens an entire new world of possibilities to web development, allowing creators to leverage the HTML 5 open standard to switch from Flash to canvas and, therefore, forcing browsers to implement it and improve rendering performance. Other elements like audio and video embedding are also planned to be available in this standard.

[Performance](http://www.codinghorror.com/blog/archives/001023.html) is another topic apart that, however, cannot be ignored. Some of the latest [canvas experiments](http://www.chromeexperiments.com/) in the web show that we have a severe performance reduction with canvas, when compared to Flash, especially when it comes to animations and 3D. This is something that still blows me today: How do browsers manage to have such a big performance difference? Google Chrome, which is the fastest browser i've ever seen, cannot be compared to Firefox when it comes to JavaScript performance, not to mention Internet Explorer, which must be some kind of joke of internet browsers. Even its latest version 8 did not manage to have half of the Chrome speed. I cannot understand what is so hard about JavaScript processing which makes it such a processor intensive task even for the modern browsers.

I really wish to see the web in the near future in a very different way than what we have now. With the adpotion of HTML 5 by all mainstream browsers (IE does not implement it yet), I hope we can all abandon Flash for good and focus on improving browsers performance to be able to afford with canvas the same interactivity that we have today with Flash. Besides that, I'd like to see more and more improvements to JavaScript frameworks like jQuery and hopefully, we'll enter Web 3.0 with an entire new set of web applications!
