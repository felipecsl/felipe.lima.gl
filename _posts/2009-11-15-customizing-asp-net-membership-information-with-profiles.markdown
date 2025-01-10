---
comments: true
date: 2009-11-15 22:51:00
layout: post
slug: customizing-asp-net-membership-information-with-profiles
title: Customizing ASP.NET membership information with Profiles
wordpress_id: 17
---

ASP.NET offers a powerful built-in provider-based support for membership, roles and profile management. That means you get a fully functional set of features for free on your project just out of the box.

I've been working in order to integrate membership and profile management into a MVC application I am developing, so I had to refresh my mind on these topics. There are some gotchas around these topics that are worth sharing.

First of all, the default ASP.NET providers implementation for membership, roles and profiles are based on SQL Server database storage, so you'll have to configure one to start playing. A gotcha here is to run the aspnet_regsql tool to generate the required tables, schemas, stored procedures, etc. in order for the providers to work. Do not forget also to configure them correctly in the web.config file, including the connectionStringName and applicationName properties (very important!).

There are several resources and tutorials around the net explaining how to set up these providers to start working. For profile management, I recommend [this one](http://odetocode.com/Articles/440.aspx). Profiles are the way to go if you need to include additional information pertaining your application users, so, instead of creating a custom membership provider, get along with the default one and set up profile properties in the web.config file. These settings are then stored in the database and associated with the user that is currently logged on. It is possible to add profile data to anonymous users, also, which is great!

So, in order to integrate it with your MVC application, you can easily store and retrieve your profile properties inside your Controller with **this.HttpContext.Profile["ProfilePropertyName"].**

Also, do not forget to declare your property in the web.config file this way:

[code:xml]

<profile defaultProvider="AspNetSqlProfileProvider">

<providers>

<clear/>

<add name="AspNetSqlProfileProvider"

type="System.Web.Profile.SqlProfileProvider, System.Web, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"

connectionStringName="tagsdConnectionString"

applicationName="/"

/>

</providers>

<properties>

<add name="ProfilePropertyName" type="System.String"/>

</properties>

</profile>

[/code]
