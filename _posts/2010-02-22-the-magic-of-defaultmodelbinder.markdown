---
comments: true
date: 2010-02-22 06:52:00
layout: post
slug: the-magic-of-defaultmodelbinder
title: The magic of DefaultModelBinder
wordpress_id: 14
---

During the last days I had to implement a custom model binding for a dynamic view model in a project I'm working on. This had me diving deep in the DefaultModelBinder implementation and how binding works in ASP.NET MVC.

Basically the request carries the data you controller action needs to perform its work. It may come from several different locations, like form variables, the query string and route data, in the form of key/value pairs, string-encoded.

Usually, the DefaultModelBinder implementation will be just fine for you and no additional work will be needed. However, there are situations where we need to tweak settings a bit. Model binding works in a associative manner, where you can assign a binder to a specific type, like this:

```c#
ModelBinders.Binders.Add(
  typeof(DateTime),
  newDateTimeModelBinder());
```

Here, we're saying that all DateTime values should be bound using the DateTimeModelBinder class. DefaultModelBinder will figure that out and call this class when it sees a property of DateTime type. We could say that it works recursivly by looking for the appropriate binder for each property. If no custom binder is found, DefaultModelBinder will take care of it anyway.

![](http://i.pbase.com/o4/60/687660/1/64594355.dte2s9SV.ropeknot.JPG)

The IModelBinder interface defines a single method:

```c#
object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext);
```

The **bindingContext** argument contains information about the mode (type, metadata, name, etc). All you have to do is to use the **bindingContext.ValueProvider** collection to retrieve the correct data for the given model and return it.

Apart from everything, I strongly recommend building the asp.net mvc source code instead of using the installer, so you can debug/step into the mvc classes. You can download the latest MVC 2 RC 2 source code from [codeplex](http://aspnet.codeplex.com/releases/view/39978#DownloadId=104717). Just do not forget to uninstall MVC from the GAC before building or you'll get ambiguous references.
