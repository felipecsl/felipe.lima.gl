---
comments: true
date: 2009-06-10 11:03:00
layout: post
slug: nunit-framework-assembly-not-found
title: nunit.framework assembly not found
wordpress_id: 36
---

I ran into a FileNotFoundException lately when working with the latest NUnit release 2.5. It seems like its assemblies are not being added to the .Net Framework GAC (Global Assembly Cache), so this means that, unless you manually copy them to the same directory as you're working on, you'll have to manually add them to the GAC.

There is a well explained reply in [StackOverflow](http://stackoverflow.com/questions/176850/nunit-assembly-not-found) (again) telling how to use the "gacutil" to solve this. Basically all you have to do is unregister all your old versions of NUnit (if any) and then use gacutil /i to register the assemblies.
