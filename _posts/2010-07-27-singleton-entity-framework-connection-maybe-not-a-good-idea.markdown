---
comments: true
date: 2010-07-27 19:57:00
layout: post
slug: singleton-entity-framework-connection-maybe-not-a-good-idea
title: "Singleton Entity Framework connection: maybe not a good idea"
wordpress_id: 7
---

I've been working on an ASP.NET MVC web service that uses EF for persistence. Been using a good old repository class for handling the connection and returning the entities. At some point I decided to change my repository connection to a singleton.

At first, I thought it would make sense to always reuse the same connection all over the place. However, as days passed, the system started raising creepy EF exceptions at times and eventually entered on an inconsistent state where I had to restart IIS in order to return the system back up. This was really weird and scared the hell out of me.

So, as a note to self, please remember that using a singleton pattern for managing large application's DAL may not be a good idea. Please do not ask me why, because I don't have a clue for the reason why these problems happened. Instead, I decided just to revert changes back and just instantiate a new repository instance whenever I needed to access the data entities.

If anyone out there had a different experience or can explain why this can happen, please do not hesitate to leave me a comment as I would appreciate a lot!

Thanks!
