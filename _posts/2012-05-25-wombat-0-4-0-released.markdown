---
comments: true
date: 2012-05-25 04:46:22
layout: post
slug: wombat-0-4-0-released
title: Wombat 0.4.0 released!
wordpress_id: 109
tags:
  - gem
  - opensource
  - ruby
  - wombat
---

It has been a while since I've been working on this Ruby [gem](https://rubygems.org/gems/wombat) called [wombat](https://github.com/felipecsl/wombat) and thought it would be worth talking about it here. I just released today the version 0.4.0 with some bug fixes and the addition of another helper method, as you can see in the GitHub [readme](https://github.com/felipecsl/wombat).

Wombat is a gem for making extracting information from web pages, or just crawling, a little less painful. If you were to do that today, you'd probably have to fall back to Nokogiri or another lower level gem and process the data yourself. With Wombat, you can define a structure of how your data should look like in a DSL like format, and Wombat does the work for you. It is pretty handy actually.

It all started with the project [Noite Hoje](http://noitehoje.com.br) where we used to grab shows and parties informations from 3rd party sites and display there, like an indexer. When working on that, I noticed how painful and repetitive it can be to crawl web pages sometimes.

Anyway, if Wombat is/was useful for you, please don't hesitate to drop me a line in the comments, I would be very happy to know.

After meeting great people like [Paul Irish](https://twitter.com/#!/paul_irish) and [Yehuda Katz](https://twitter.com/#!/wycats), you kinda feel almost obligated to share some knowledge with your peers and give back to the open source community.

By the way, if you work with Resque, you should probably also check the great [perform_later](https://github.com/kensodev/perform_later) gem by my friend and coworker [Avi Tzurel](http://kensodev.com/), to which I also have been contributing.

Cheers!
