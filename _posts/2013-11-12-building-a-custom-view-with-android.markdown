---
layout: post
title: "Building a Custom View with Android"
date: 2013-11-12 11:40
comments: true
categories:
---

This week I'm attending [AnDevCon](http://andevcon.com/) in San Francisco and in the first tutorial in the first day of the event, I watched a really nice workshot by [Chiu-Ki Chan's](https://twitter.com/chiuki) titled `Hands-on Android Custom View Workshop`. The code is here on [Github](https://github.com/chiuki/android-fraction-view).

We built a simple custom view using circles, arcs and `onDraw` to draw some kind of pie chart that reacts to click, sends change events, etc.

I implemented the FractionView with some small changes, animating it into some kind of clock/stopwatch thing that animates by itself. Below is a GIF with the sample app running.

Please feel free to play with it and check out my fork on [Github](https://github.com/felipecsl/android-fraction-view).

![](/images/fractionView.gif)
