---
comments: true
date: 2009-10-03 11:52:00
layout: post
slug: how-to-fix-image-upload-with-fckeditor-and-asp-net
title: How to fix image upload with FCKEditor and ASP.NET
wordpress_id: 20
---

[CKEditor](/admin/Pages/ckeditor.com) is a great open source wysiwyg editor for the web. It was formerly called FCKEditor and, one of its previous versions contained a nice implementation for ASP.NET integration. The current version (3.0) has been completely rebuilt from scratch and does not support quick upload yet (I read in the forums it will be available in version 3.1).

I've been using the FCKEditor 2.6.3 for .NET, which includes an ASP.NET control for seamless integration. However, I could never make one of its great features to work: the ability to upload images on the fly and embed them in the text. There are some things that need to be set up before.

    1. FCKEditor config file (fckconfig.js), when you download it, comes with its connectors default language to php. You need to change it to aspx:



    var _FileBrowserLanguage	= 'aspx' ;	// asp | aspx | cfm | lasso | perl | php | py


    var _QuickUploadLanguage	= 'aspx' ;	// asp | aspx | cfm | lasso | perl | php | py




    2. Configure the folder that contains the fckeditor scripts in FCKEditor.cs (You will need to create a virtual directory in IIS with this path):






    [ DefaultValue( "/fckeditor/" ) ]






    public string BasePath






    3. Enable the upload connector in fckeditor\editor\filemanager\connectors\aspx\config.ascx (SECURITY WARNING: do not forget to implement 	authentication verification here!):






    private bool CheckAuthentication()






    { return true; }






    4. Configure the directory that will receive the uploaded images (same file as above) - This can be overriden in your website web.config appSettings 	section, creating a setting called FCKeditor:UserFilesPath






    UserFilesPath = "/userfiles/";

This should be everything that is needed in order to make file upload to work. See ya!

[UPDATE]:

For those of you that saw this working fine in your development machine but unexplainably not working on the production server, please refer to [this forum post](http://cksource.com/forums/viewtopic.php?f=6&t=12112) for the fix.

[UPDATE 2]:

Another issue that I found regarding the update above is that in a server, it did not fix the problem an I was getting a 'permission denied' JS error on the window.parent.OnUploadCompleted event. If that happens, try [this fix](http://dev.fckeditor.net/ticket/2115) (scroll to the bottom of the page for the code)
