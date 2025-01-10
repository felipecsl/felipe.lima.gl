---
comments: true
date: 2009-12-02 18:25:00
layout: post
slug: an-alternative-for-viewing-grid-row-details-in-asp-net-dynamic-data
title: An alternative for viewing grid row details in ASP.NET Dynamic Data
wordpress_id: 16
---

With ASP.NET Dynamic Data you get an entire dynamic data-driven website for free with almost no effort. Of course this has drawbacks, which is that in fact you lose some flexibility and need to do things in the way they **can** be done.

Recently I needed to improve the default List.aspx template `GridView` with some different colors and per-line selection for entry details, instead of clicking through an DynamicHyperlink. The first step was to attach an `OnRowDataBound` event in the grid, in order to set up on onmouseover event in the data rows:

`DynamicData\PageTemplates\List.aspx`:

```xml
<asp:GridView ID="GridView1"
  runat="server"
  DataSourceID="GridDataSource"
  EnablePersistedSelection="true"
  OnRowDataBound="GridView_RowDataBound">
```

Next, attach the event and set up the event (`DynamicData\PageTemplates\List.aspx.cs`):

```c#
protected void GridView_RowDataBound(object sender, GridViewRowEventArgs e) {
  if (e.Row.RowType == DataControlRowType.DataRow) {
    e.Row.Attributes["onclick"] = "location.href = '" + table.GetActionPath("Details", e.Row.DataItem) + "'";
  }
}
```

And I'ts all done. You get an entire row click selection for the entry details :)
