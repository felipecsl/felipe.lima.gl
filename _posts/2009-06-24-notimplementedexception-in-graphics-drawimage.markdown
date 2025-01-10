---
comments: true
date: 2009-06-24 11:13:00
layout: post
slug: notimplementedexception-in-graphics-drawimage
title: NotImplementedException in Graphics.DrawImage
wordpress_id: 33
---

It is a bit weird to notice that a .Net Framework method returns `NotImplementedException`.
At least it was for me, mainly because it is not documented anywhere in the msdn documentation.

It turns out that `Graphics.DrawImage` throws this exception when an Image object is passed in. This is really funny, since this method actually expects an Image object as its first argument, so my first-try code to print an image file was:

    public void PrintImage(string fileName) {
        Image img = Image.FromFile(fileName);
        PrintDocument printDoc = new PrintDocument();
        printDoc.DocumentName = this.m_sFilename;
        printDoc.PrintPage += new PrintPageEventHandler(PrintPage);
        printDoc.Print();
    }

    private void PrintPage(object sender, PrintPageEventArgs e) {
         // Throws NotImplementedException!!!
        e.Graphics.DrawImage(this.printedImage,
            new Point(e.MarginBounds.Left, e.MarginBounds.Top));
        e.HasMorePages = false;
    }

Weird, eh?! So, the solution?

    Bitmap img = (Bitmap)Image.FromFile(fileName);

Bitmap class extends Image, so, IMHO, `DrawImage` should determine in runtime that the image passed in is actually is a Bitmap and do whatever it has to do, but, strangely, it complains and throws a NotImplementedException for the exactly same runtime object.

Can anyone explain what is happening here?
