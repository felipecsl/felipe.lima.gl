---
comments: true
date: 2009-07-08 09:55:00
layout: post
slug: automatically-tracking-last-modification-datetime-in-table-column
title: Automatically tracking last modification date/time in table column
wordpress_id: 31
---

Lately I found a very simple and yet consistent way to track the last update made to a Sql Server database table. You can easily store the modification date and time through a table trigger that can set a specific column of the updated row(s) with the `GETDATE()` function.

In order to do that, create a new trigger for your table and use the **Inserted** virtual table to obtain the ID of the entry, in order to update it. We'll use here a **LastModified **column, which will store a datetime:

```sql
CREATE TRIGGER last_modification_timestamp

ON target_table

AFTER INSERT, UPDATE

AS

DECLARE @colID INT

SELECT @colID = (SELECT ID FROM Inserted)

UPDATE target_table SET LastModified = GETDATE() WHERE ID = @colID
```

So, we're basically retrieving the column ID (primary key) from the affected row and using it to update the LastModified column with the current date and time.

This way, you can enforce this policy and guarantee that you'll always get the correct date/time in that column, since the trigger will be automatically executed just after each INSERT and DELETE.

Hope this helps!
