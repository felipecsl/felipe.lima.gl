---
comments: true
date: 2009-08-20 19:04:00
layout: post
slug: how-to-enable-session-state-in-asp-net
title: How to enable Session state in ASP.NET
wordpress_id: 23
---

While trying to use the Session state dictionary in a web application, you may eventually receive the following exception:

**Session state can only be used when enableSessionState is set to true, \*\***either in a configuration file or in the Page directive. Please also make sure that System.Web.SessionStateModule or a custom session state module is included in the <configuration>\<system.web>\<httpModules> \***\*section in the application configuration.**

To my surprise, session state has to be enabled before it can be used. I followed some steps that I found while digging for the solution online that might be helpful:

1. Enable the ASP.NET Session State Manager Service (under Control Panel > Administrative Tools > Services)

2. Enable it in the web.config file: **<pages enableSessionState="true">**

3. Add the proper http module to the web.config: **<add name="Session" type="System.Web.SessionState.SessionStateModule" />**

4. At last but not least: Make sure you're accessing the Session object after it has been initialized. This is very important, since if you try to manipulate it in the page constructor, for example (which was my case), you'll still get the above exception, even after executing steps 1, 2 and 3. You should be able to access it after the page **OnLoad** event has been fired.
