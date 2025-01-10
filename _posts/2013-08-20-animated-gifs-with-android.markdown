---
layout: post
title: Handling Animated GIFs with Android the right way
date: 2013-08-20 21:05
comments: true
categories:
---

Working with animated GIFs on Android can be a painful task. In the [We Heart It app](https://play.google.com/store/apps/details?id=com.weheartit) we deal with a lot of images, but also animated GIFs. Since we support Android back to API Level 8 (2.2), `WebView` is by far the simplest solution, however is not an option for us, since it [doesn't work](https://code.google.com/p/android/issues/detail?id=3422) on most of older Android versions.

By looking at this excellent tutorial by [Johannes Borchardt](http://droid-blog.net/2011/10/15/tutorial-how-to-play-animated-gifs-in-android-%E2%80%93-part-2/), I decided to take `GifDecoder` approach, which seems to be the most reliable solution. However, the [GifDecoder](https://code.google.com/p/android-gifview/source/browse/trunk/GifPlayer/src/jp/tomorrowkey/android/gifplayer/GifDecoder.java) class suggested by Johannes is not very memory efficient since it keeps in memory the bitmap data for every frame in the GIF.

By doing some more research, I found this great [gist](https://gist.github.com/devunwired/4479231) with an optimized implementation of `GifDecoder` that, as described there, "decodes images on-the-fly, and only the minimum data to create the next frame in the sequence is kept".

The class interface is however not exactly the same as the one exposed by the original `GifDecoder` class provided, thus the `GifDecoderView` class had to be adjusted. I made the adjustments required to interact with this version and also start/stop the animation. By default it will loop the GIF animation, even if the view is not on the screen, so you have to be careful to call `startAnimation()` and `stopAnimation()` correctly to avoid GIFs playing in the background, which can eat up all your memory very quickly.

My interaction looks basically like this:

```java
  // In my fragment class...

  public void onCreate() {
    gifView = new GifDecoderView(getActivity());
    gifView.setBytes(bitmapData);
    gifView.startAnimation();
  }

  public void setUserVisibleHint(boolean isVisibleToUser) {
    super.setUserVisibleHint(isVisibleToUser);

    if (!isVisibleToUser) {
      gifView.stopAnimation();
    }
  }
```

You can get all the code here in this [Gist](https://gist.github.com/felipecsl/6289457).
