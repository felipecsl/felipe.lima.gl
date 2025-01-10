---
comments: true
date: 2009-06-09 07:56:00
layout: post
slug: serializing-anonymous-types-in-net
title: Serializing anonymous types in .Net
wordpress_id: 37
---

In C#, you are not able to serialize an object that does not have a parameterless constructor. At least, XmlSerializer is not able to do this. It seems like BinaryFormatter is able, as per this [StackOverflow question](http://stackoverflow.com/questions/267724/why-serializable-class-need-a-parameterless-constructor).

This means you are not able to Xml serialize some object like this, also:

[code:c#]

var myObj = new

{

MyPropertyString = "prop1value",

MyPropertyInt = 2,

MyPropertyList = new List<string> { "bananas", "apples", "pees" }

});

[/code]

I needed to be able to serialize this kind of object to database in a human-readable format so, if you don't need to output in Xml format specifically, you can try this great [Json.NET library](http://james.newtonking.com/projects/json-net.aspx) by James Newton-King, that worked smoothly for me, as easy as:

[code:c#]

string jsonString = JsonConvert.SerializeObject(\_myObj);

[/code]

Surely you can do many other things with this library, which you can find out by yourself.
