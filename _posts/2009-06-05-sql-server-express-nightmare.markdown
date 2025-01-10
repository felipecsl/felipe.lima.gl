---
comments: true
date: 2009-06-05 17:19:00
layout: post
slug: sql-server-express-nightmare
title: SQL Server Express nightmare
wordpress_id: 38
---

Whoever tried to use SQL Server Express for any medium sized project, has probably experienced some really painful problems accessing the database file.

Express is a free version of this well known Microsoft database engine which is targeted for smaller business. It has some [limitations](http://www.microsoft.com/sqlserver/2005/en/us/compare-features.aspx) when compared to the other enterprise-targeted versions.

One of its key differences is that, unlike the other versions, you don't need a database instance to start working. The only thing you need is an empty MDF file to start off. It can be created from Visual Studio (Add New Item > SQL Server Database) and you're ready to go. However, here is where the problems start...

The big issue is that the MDF is a regular windows file, like any other. This means that **only one process is able to modify it at a time**.

If you use Visual Studio and/or SQL Server Management Studio regularly, you have probably run into this error when working with SQL Server Express:

![](/images/2009/6/image.axd.png)

There are several reason reasons that could cause this. Here are two that I found most recurring:

**Cause 1.** The NETWORK SERVICE user is not able to open the database file because it does not have rights to do so.

**Solution 1.** Edit the file permissions and grant Read/Write rights to it: Right mouse click on file or containing folder > Security > Advanced > Edit

If the NETWORK SERVICE is already on the list, make sure it has read/write permission.

Else, click Add... and type NETWORK SERVICE in the edit field. Add the proper permissions and click Ok in all the open Windows. Reload the webpage.

In some machines, I've seen the user IIS_IUSRS instead of NETWORK SERVICE, so you can try this one as well. (if it exists)

**Cause 2.** Visual Studio is locking the database file. In some cases, when you edit the database inside VS using the Server Explorer window, the handle remais open even after you close the connection with the database.

**Solution 2.** If your Visual Studio is open, go to the Server Explorer window and make sure the database connection closed.

![](/images/2009/6/Sem+t%c3%adtulo.png)

If you are using SQL Server Management Studio Express, you have to Detach the database (do not forget to check the checkbox "Drop Connections" in the subsequent screen):

![](/images/2009/6/Sem+t%c3%adtulo2.png)

Go to your webpage and try reloading it. It should work now. In case it doesn't work, try closing your Solution inside VS or close the whole VS window. I've seen cases where VS keeps the database locked even after you closed the connection in the Server Explorer. Unfortunately, the error above isn't related to an open connection and this is why it sometimes it gets really hard to diagnose the issue.

As I said before, only one connection may be open with the SQL Express database file at a time, so always make sure there is no other program with it open. This does not mean that it does not allow concurrent users using the database, but Visual Studio and Management Studio manage to open it in such a way that locks the file entirely. The reason is unknown to me.
