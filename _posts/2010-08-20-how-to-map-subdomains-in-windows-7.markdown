---
comments: true
date: 2010-08-20 13:10:00
layout: post
slug: how-to-map-subdomains-in-windows-7
title: How to map subdomains in Windows 7
wordpress_id: 6
tags:
  - asp.net
  - iis
  - membership
  - subdomains
---

Over the last days, I've been working on implementing multiple subdomains with authentication in asp.net for the webapp I'm currently working on.

There are a few steps needed in order to configure IIS, DNS and authentication.

1. Select the website you're working on, in the IIS Manager screen, in the left side tree. Then, click the "Bindings" option in the right pane

![](/images/2010/8/bindings.png)

2. In the Site Bindings window, add each subdomain that you want to map to your site. Unfortunately, wildcard mapping is not supported, so you'll have to manually type all the subdomains before using it.

3. In the windows hosts file (C:\Windows\system32\drivers\etc\hosts), add up each subdomain again, pointing to 127.0.0.1 (see below):

![](/images/2010/8/hosts.png)

4. Lastly, you'll need to update your web.config cookies configuration, so that it is set to work with any subdomain. By default, your login cookies will only be valid for the default subdomain (example.com and www.example.com)

<authentication mode="Forms">

<forms loginUrl="~/Account/Login" timeout="500000" **domain=".example.com"** />

</authentication>

Pay attention for the starting dot in the domain attribute. It is needed in order to work with any subdomain ;)
