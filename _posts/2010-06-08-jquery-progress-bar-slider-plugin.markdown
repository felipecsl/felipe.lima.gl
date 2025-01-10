---
comments: true
date: 2010-06-08 15:36:00
layout: post
slug: jquery-progress-bar-slider-plugin
title: JQuery progress bar slider plugin
wordpress_id: 8
---

Hello,

I've written a simple JQuery plugin for a progress bar slider. It was inspired on [Ben's CSS progress bar](http://blog.benogle.com/2009/06/16/simple-css-shiny-progress-bar-technique/), but I needed a more complete one that should be interactive, so I built this one that also leverages [JQuery UI's vertical slider](http://jqueryui.com/demos/slider/#slider-vertical).

You can see the plugin demo [here](https://github.com/felipecsl/jquery-progressbar-slider/demo.htm). TIP: Inspect the source code to see how it works.

You can download the plugin code [here](https://github.com/felipecsl/jquery-progressbar-slider).

Usage:

```javascript
$(function () {
  $("your element selector").progressbarslider();
});
```

Please feel free to leave me a feedback, suggestions and/or use it at your own will on your projects :)
