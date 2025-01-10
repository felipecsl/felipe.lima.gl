---
comments: true
date: 2009-08-11 21:46:00
layout: post
slug: upload-and-crop-images-with-asp-net-and-jcrop-revisited
title: Upload and Crop Images with ASP.NET and jCrop - Revisited!
wordpress_id: 26
---

In the last days, while looking for a way to do image cropping in ASP.NET, I found out several high quality tools that do the job very well. The main one is a great jQuery plugin called [jCrop](http://deepliquid.com/content/Jcrop.html). It has many useful features out of the box coupled with a well forged look and feel, which made me choose to use it with no doubt.

What I needed, exactly, was a way to enable users to upload pictures and crop them on the fly before storing them on the website database. I often use ASP.NET [dynamic data](http://asp.net/dynamicdata) to build complete and fully functional data driven websites in minutes. ASP.NET Dynamic Data is based on page templates and field templates that are brought together in runtime using user controls, in order to generate custom forms for manipulating the database tables.

One of these field templates, is DbImage, which is available in the Dynamic Data [preview 4 on Codeplex](http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=27026). Basically, it maps a binary table column to a user control that consists of a FileUpload control, which you can use to upload the image. Then, the image bytes are stored in the database. It is obviously not the best way to store images on a database, but it is extremely convenient. In an ideal scenario, the table would only point to the actual path of the image on the disk.

So, my work was to couple together jCrop and ASP.NET Dynamic Data DbImage control, so that the user may choose to crop the image just before it is saved to the database.

I found a very complete and interesting post on this topic at [mikesdotnetting.com](http://www.mikesdotnetting.com/Article/95/Upload-and-Crop-Images-with-jQuery-JCrop-and-ASP.NET), which handles the actual image cropping part of the work with C#.

My work was then based on Mike's post and jCrop, putting it all together inside a DbImage to enable the whole workflow. The general flow is strongly based on Mike's code using panels and hidden fields to store the selected X, Y, Width and Height, but I moved to a more wizard-like flow, which should be more straightforward to the regular user.

I first added a "Crop.." button to the control that should launch jCrop with the selected image file.

![](/images/2009/8/img1.jpg)

Next step was to open a AJAX [ModalPopupExtender](http://www.asp.net/AJAX/AjaxControlToolkit/Samples/ModalPopup/ModalPopup.aspx) and show the selected image ready to be cropped with jCrop:

![](/images/2009/8/img2new2.jpg)

Last step, check the cropped image and finish the Wizard:

![](/images/2009/8/img3.jpg)

The cropped image is then scaled down and added to the form:

![](/images/2009/8/img4.jpg)

In order to scale down the cropped image, I used a code from [Rick Strahl](http://www.west-wind.com/Weblog/posts/283.aspx) and added to a page called GetThumb.aspx. This page receives the desired filename in the query string, fetches it from the crop temporary files directory and writes it to the response stream.

I am providing the whole set of files needed to accomplish this in a [zip file](http://www.felipel.com/files/dbimage_crop.zip). Follow these instructions for setup:

1. Put the DbImage_Edit.ascx\* files in the \*\*<dynamic data website>\DynamicData\FieldTemplates\*\* folder;

2. Put the GetThumb.aspx\* files in the website root ("~" folder);

3. Put the Limaf.Tools.Web.dll file in <dynamic data website>\bin folder (the Crop and Thumb functions are there).

4. Create an 'images' folder in your project root

If you prefer, you can copy/paste get Mike's Crop and Rick's Thumbnails functions yourself and build them as part of the website. In this case, step 3 above is not needed.

I may have forgotten a file or a step or two, so please let me know if anything goes wrong.

Till next time!
