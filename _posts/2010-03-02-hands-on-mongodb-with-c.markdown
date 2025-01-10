---
comments: true
date: 2010-03-02 06:36:00
layout: post
slug: hands-on-mongodb-with-c
title: Hands on MongoDB with C#
wordpress_id: 13
---

During the last couple days I've been experimenting with [MongoDB](/admin/Pages/www.mongodb.com) and its [C# driver](http://github.com/samus/mongodb-csharp), cleverly written by Sam Corder. I'm investigating it as a replacement for a SQL Server database I am using in a web application that is higly community driven. This specific characteristic is the one that makes the [NoSQL](http://en.wikipedia.org/wiki/NoSQL) movement rise atop regular RDBMS systems like SQL Server or MySQL, since it is hard to mantain relational integrity in these scenarios. Other key features of MongoDB are focus on performance and scalability.

[K. Scott Allen](http://odetocode.com/Blogs/scott/archive/2009/10/13/experimenting-with-mongodb-from-c.aspx) already wrote a quick intro on using the C# driver, so I used it as a tutorial for my first steps. Here are some thoughts I'd like to share on this topic:

- I don't like being held by the verbosity of instantiating Document objects every time I want to manipulate the database, so I've written method overloads for the main operations, like Insert, Update, Find and Delete that receive a plain object and only then convert them to Document. This allows us to leverage anonymous objects in C# and makes the code cleaner:

```c#
Mongo mongo = new Mongo();
mongo.Connect();
Database db = mongo[“testdb”];
var col = db[“users”];
foreach(Document d in col.Find(new { name = “John Doe”}).Documents)
{
  int johnId = d[”_id”];
  int johnName = d[“name”];
}
```

The code with this implementation is available on my fork of the driver at [github](http://github.com/felipecsl/mongodb-csharp) an will hopefully be merged with the master soon.

MongoDB allows storage of files in the database, as well, through the [GridFS specification](http://www.mongodb.org/display/DOCS/GridFS). The C# api is already implemented and functional. Follow an example for writing a file to the database:

```c#

void Main()
{
    Mongo mongo = new Mongo();
    mongo.Connect();
    Database db = mongo[“test”];
    var collection = db[“testcollection”];
    GridFile file = new GridFile(db);
    using(GridFileStream fs = file.Create(“mycv”)) // define the file name
    {
        ReadWriteStream(File.OpenRead(@”C:\Data\felipelima_en.doc”), fs);
    }
}

public static void ReadWriteStream(
    Stream readStream,
    Stream writeStream)

{
    Byte[] buffer = new Byte[Int16.MaxValue];
    int bytesRead = readStream.Read(buffer, 0, Int16.MaxValue);
    // write the required bytes

    while (bytesRead > 0)
    {
        writeStream.Write(buffer, 0, bytesRead);

        bytesRead = readStream.Read(buffer, 0, Int16.MaxValue);

    }
    readStream.Close();
    writeStream.Close();
}
```

Database files work just like plain Documents and will be assigned an Id upon creation. Therefore, they can be later queried just like a regular document.

This was just a quick glance over MongoDB and C# integration. I'm planning on using it on a large project and will post here my findings. More to come.
