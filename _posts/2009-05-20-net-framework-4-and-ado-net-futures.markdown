---
comments: true
date: 2009-05-20 22:13:00
layout: post
slug: net-framework-4-and-ado-net-futures
title: .Net Framework 4 and ADO.Net futures
wordpress_id: 40
---

Microsoft has been working on the next version of its .Net Framework 4.0 and the respective IDE: Visual Studio 2010. There is a [video screencast](http://channel9.msdn.com/shows/10-4/10-4-Episode-20-Downloading-and-Installing-Visual-Studio-2010-Beta-1/) at Channel9 for downloading and installing the Beta 1.

Some of the new features in this version 4 are: parallel programming support, functional programming with [F#](http://research.microsoft.com/en-us/um/cambridge/projects/fsharp/default.aspx), [code contracts](http://msdn.microsoft.com/en-us/devlabs/dd491992.aspx), [new WF engine](http://channel9.msdn.com/shows/10-4/10-4-Episode-16-Windows-Workflow-4/), etc.

One of the biggest improvements I found very useful was the [ASP.NET Dynamic Data](http://www.asp.net/dynamicdata/) framework, which was introduced in .Net 3.5 SP1. With this tool, you are able to create an entire data driven website in minutes. It uses Linq to SQL to generate the object/relational data mapping and then builds up pages based on columns data types. There are several built-in Field Templates and Page Templates that are used to build the pages dynamically based on the table schema. Fantastic!

The Dynamic Data Preview 4 can be downloaded from [CodePlex.](http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=27026)

However, Microsoft also introduced the ADO.Net Entity Framework (or Linq to Entities) in .Net 3.5 SP1 as well, that seems to do the same job that L2S proposes to do. There are some discussions in the web around this. [This blog post](http://blogs.msdn.com/swiss_dpe_team/archive/2008/11/06/entity-framework-vs-linq-to-sql.aspx) outlines the main differences between the two technologies. which basically tells us that L2S is more limited that the Entity Framework.

Finally, "... as of .NET 4.0, LINQ to Entities will be the recommended data access solution for LINQ to relational scenarios." ([source](http://stackoverflow.com/questions/8676/entity-framework-vs-linq-to-sql))
