---
comments: true
date: 2010-03-29 19:04:00
layout: post
slug: pure-as3-lightbox-clone
title: Pure as3 Lightbox clone
wordpress_id: 11
---

There are a plenty of [lightbox](http://leandrovieira.com/projects/jquery/lightbox/) [implementations](http://www.huddletogether.com/projects/lightbox2/) around the web. Whenever you need one, you won't need to make up your own for sure. Just pick one of the available options. However, if you're restricted to flash only, the options get reduced drastically. This is why I came up with [my own lightbox](https://github.com/felipecsl/actionscript3-lightbox) implementation with ActionScript. You can see it in action in my company's [website](http://www.quavio.com.br).

![Flash Lightbox screenshot](/images/2010/3/lightbox.png)

It works just like the regular lightbox versions:

```javascript


var:Lightbox myLb = new Lightbox(
  _sTitle: String, // lightbox title
  _sLinkToVisit: String = null,  // link to the page that will be visited upon click
  _sImageText: String = "Imagem", // 'Image' text
  _sOfText: String = "de"); // 'Of' text

// shows the lighbox with the provided array of images
myLb.show(['image1.jpg', 'image2.jpg', ...]);
myLb.hide(); // closes the lightbox

```

Please be aware that, in order to use it, you'll have to create a Lightbox movieclip in the Flash IDE with the following elements inside it:

**\_txtClientName**,** \_txtCurrPos**, **\_btnNext**, **\_btnPrev \_btnClose**, **\_bg** and **\_btnAcesse**.

These elements are referenced inside the Lightbox class, so you'll need to create elements that match these names in the IDE so that the class will find them.

Additionally, you'll need two static variables containing the stage original width and height. This is needed in order to automatically reposition the lightbox in the middle of the screen on stage resize.

Also, you'll need to download [TweenLite](http://www.greensock.com/tweenlite/) for the all the effects to work!

Please let me know if you have any suggestions of bug fixes and/or improvements and I will be happy to answer your requests.
