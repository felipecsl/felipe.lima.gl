---
comments: true
date: 2009-10-22 08:57:00
layout: post
slug: asp-net-mvc-custom-errors-with-the-handleerror-attribute
title: ASP.NET MVC custom errors with the HandleError attribute
wordpress_id: 18
---

Handling exceptions in ASP.NET MVC is quite easy once you get to know the details surrounding the `HandleError` attribute. You can specify that a controller or a specific Action will handle errors and you can even choose which View to show based on the exception being thrown. Scott Guthrie [wrote](http://weblogs.asp.net/scottgu/archive/2008/07/14/asp-net-mvc-preview-4-release-part-1.aspx) about this.

What he didn't tell us, is that there are some prerequisites for it to work as expected. First of all, you need to enable custom errors in the application web.config file:

```xml
<customErrors mode="On" />
```

Second, the order that you put the HandleError attributes will affect which View will actualy gonna be rendered at the end. I was trying to render a custom view based on an InvalidOperationException being throw on my action. The code looked like this:

```c#

[HandleError]
public class HomeController : QuavioController {
    [HandleError(ExceptionType = typeof(InvalidOperationException), View = <span class="str">"InvalidOpJoinRoom")]
    public ActionResult JoinRoom() {
        throw new InvalidOperationException();
    }
}
```

What happened is that the `JoinRoom` was returning the shared Error View, instead of the `InvalidOpJoinRoom` View. This happens because the `HomeController` contains a `HandleError` attribute (line 1), which overrides the JoinRoom's `HandleError` behavior (line 4), which should return the InvalidOpJoinRoom View.

The fix is very simple: Remove the `HandleError` atribute from the controller and let the actual actions define the proper error handling behavior.

Conclusion: Be aware that multiple `HandleError` attributes in a controller may alter the order which View evaluation is executed and then causing the final View not to be the view you were actually expecting.
