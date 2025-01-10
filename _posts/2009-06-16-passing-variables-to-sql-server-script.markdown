---
comments: true
date: 2009-06-16 12:44:00
layout: post
slug: passing-variables-to-sql-server-script
title: Passing variables to sql server script
wordpress_id: 35
---

Here is something I found out today that might be useful for Sql Server users out there:

If you need to pass a variable to a sql script file in runtime, you can use the **sqlcmd** tool with the **-v option**, for example:

```
sqlcmd -S localhost\SQLEXPRESS -i myscript.sql -v myVar1="myVar1Value" myVar2="myVar2Value"
```

Then, inside the sql script, those variables can be accessed using the $(var) format:

```sql
ALTER TABLE [dbo].[$(myVar1)] INSERT ... VALUES ($(myVar2), $(myVar3) ...)
```

You can also specify these vars inside the sql script with **setvar**. More information in [this MSDN article (Using sqlcmd with Scripting Variables).](http://msdn.microsoft.com/en-us/library/ms188714.aspx)
