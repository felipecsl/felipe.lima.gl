---
comments: true
date: 2009-08-20 06:43:00
layout: post
slug: copying-linq-non-datarow-query-results-to-datatable
title: Copying Linq (non-DataRow) query results to DataTable
wordpress_id: 24
---

How to use the results of a database query using Linq to fill a DataGrid? It should be no big deal since there is a useful [CopyToDataTable](http://msdn.microsoft.com/en-us/library/bb396189.aspx) extension method:

{% highlight c# %}
public static DataTable CopyToDataTable<T>(
this IEnumerable<T> source
)
where T : DataRow
{% endhighlight %}

However, there is a problem: **T has to be a DataRow**. When returning query results from the database, especially with EF, your query results are not DataRows (and I wonder if the same is true for Linq to Sql too). So, in this case, you'll have to fill the DataTable by hand. Thanks to this [good blog post](http://unboxedsolutions.com/sean/archive/2009/06/06/15961.aspx), I was able to fill it:

{% highlight c# %}
DataTable dataTable = new DataTable();
dataTable.TableName = "ResultsTable";
dataTable.Columns.Add("User", typeof(string));
dataTable.Columns.Add("TotalJobs", typeof(int));
var query = /_ your linq query comes here. no restrictions! _/
{% endhighlight %}

we have the DataTable and the query set up. Now, the tricky part!

{% highlight c# %}
var results = query.Select(anonym => new Func<DataRow, int, int, DataRow>(
(DataRow row, int index, int count) => {
row["User"] = index;
row["TotalJobs"] = count;
return row;
})
.Invoke(dataTable.NewRow(), anonym.Index, anonym.TotalJobs));
results.ToList().ForEach(row => dataTable.Rows.Add(row));
{% endhighlight %}

Absolutely a good piece of unreadable code :)

\_query \_variable are your Linq query results, which may be an IEnumerable of some of your data entities or even a anonymous type. It doesn't matter! For each element of this enumeration, we're creating a DataRow and assigning some values to its columns. Then, we call \_Invoke \_to indeed invoke our anonymous delegate Func, passing in our anonymous type properties, that are used later to fill the `DataTable`.

You'll probably gonna need to read it a couple times to digest it a bit and still it will look "WTF did I really wrote this code?!?" after a couple days :)
