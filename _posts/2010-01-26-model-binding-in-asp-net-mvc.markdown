---
comments: true
date: 2010-01-26 19:30:00
layout: post
slug: model-binding-in-asp-net-mvc
title: Model binding in ASP.NET MVC
wordpress_id: 15
---

![](http://i.zdnet.com/blogs/agile-is-cool.jpg)

Ever since I started discovering the MVC world I decided to completely forget Web Forms and actually adopt asp.net MVC as my web programming framework of choice. What's great about it is that you have complete control over the generated html output and absolute separation of business logic, presentation layer and model. It's all about [convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration)! This is one of the reasons why I decided to learn Ruby on Rails some time ago. It is clear that the <strike>ASP.NET MVC</strike> .NET Framework 3.5 SP1 release was somewhat influenced by Rails.

One of the great things about ASP.NET MVC is model binding. K. Scott Allen wrote a [great blog post](http://odetocode.com/Blogs/scott/archive/2009/04/27/6-tips-for-asp-net-mvc-model-binding.aspx) with tips on binding. Basically, it collects your request data and fills up your view model with the incoming data.

There is a search pattern that the DefaultModelBinder uses to look for the data in the request. Basically you need to name your form elements with the same name of your model properties. For example:

1. The view model:

```c#
public class NewsModuleViewModel
{
    [ScaffoldColumn(false)]
    public int ID { get; set; }

    [DisplayName(“News Date”)]
    [DisplayFormat(DataFormatString = “d”, ApplyFormatInEditMode = true)]
    [Required(ErrorMessage = “Por favor selecione uma data”)]
    public DateTime? Date { get; set; }

    [DisplayName(“Title”)]
    [Required(ErrorMessage = “Por favor digite um titulo”)]
    public string Title { get; set; }



    [DisplayName(“Resume”)]
    public string Resume { get; set; }

    [DisplayName(“My Text”)]
    [UIHint(“HtmlText”)]
    [Required(ErrorMessage = “Por favor digite um texto para a noticia”)]
    public string Text { get; set; }


    [DisplayName(“Image”)]
    [UIHint(“DbImage”, null, “AspectRatio”, 1.0)]
    public string ImagePath { get; set; }
}
```

The form:

```html
<form action=”/uac/NewsModule/Edit/12” enctype=”multipart/form-data” method=”post”>
    <p class=”datalist-form”>
        <label for=”Date”>Date</label>
        <input type=”text” id=”Date” name=”Date” value=”22/1/2010” />
    </p>

    <p class=”datalist-form”>
        <label for=”Title”>Title</label>
        <input class=”text-box single-line” id=”Title” name=”Title” type=”text” />
     </p>
     <p class=”datalist-form”>
         <label for=”Resume”>Resume</label>
         <input class=”text-box single-line” id=”Resume” name=”Resume” type=”text” />
     </p>
</form>
```

(I've reduced the HTML markup snippet for the sake of simplicity).

Please note that the input field name properties match the view model property names. The DefaultModelBinder will look for these names when doing the data binding!

[
You can even bind complex objects like lists](http://haacked.com/archive/2008/10/23/model-binding-to-a-list.aspx), for example, but, in this case, you'll have to name your input fields according to the element index on the list! Eg.:

    <span class="lnum">   1:  </span><span class="kwrd"><</span><span class="html">input</span> <span class="attr">type</span><span class="kwrd">="text"</span> <span class="attr">name</span><span class="kwrd">="<strong>ImageList[0].FileName</strong>" size="</span><span class="attr">44</span>" <span class="kwrd">/></span>

It is really straightforward once you get used to it. Just always make sure to create a ViewModel class for you, instead of using the data classes directly (eg.: with LINQ to SQL).

If you need to bind uploaded files as well, it gets a bit more complicated. The best solution I've found so far was **not **to bind file input control and later retrieve the uploaded file in the controller action from the Request.Files collection.
