---
comments: true
date: 2009-07-27 11:09:00
layout: post
slug: dynamically-adding-user-controls-to-web-page-with-asp-net
title: Dynamically adding user controls to web page with ASP.NET
wordpress_id: 29
---

I've been very busy lately and unfortunately didn't have enough time to stop here to write about things I have been working on. There are other subjects that I'd like to talk about but, for now, I'll share my findings with asp.net user controls dynamically added to the page, difficulties, limitations and solutions.

I'm working on a Ajax based web site that basically contains a content area in the right, where I need to put the dynamic content, based on the user selection on the left menu. The ongoing work can be seen [here](/admin/Pages/www.felipel.com/visiocore/ContentPage.aspx).

The easier way to do this is to create an asp.net UserControl for the content of each page and to dynamically add each control to the page based on the user selection. I also added an UpdateProgress panel for better user experience. However, here is where the problems start. First off, you cannot simply instantiate an asp.net UserControl through its constructor and add it to the page. That won't work. Instead, you'll need to use the factory method `Page.LoadControl()`, providing it the virtual path to your control so that it returns the instance for you. Eg.:

    // Instantiate the user control
    Control c = this.LoadControl("~/MyUserControl.ascx");
    this.ContentArea.Controls.Add(c);    // Add it to the placeholder

Here, we're instantiating the control and adding it to the page. So far, so good. But, what happens if your user control needs to execute some javascript function upon loading? Even if you explicitly put <script> tags in your user control markup, it won't be executed at this time, so the solution is to use RegisterStartupScript to execute the client code:

    ClientScript.RegisterStartupScript(typeof(this), "some script key",
        "<script type="text/javascript">alert('hello world!');</script>");

or, if you're using Ajax, use the ScriptManager static method:

    ScriptManager.RegisterStartupScript(this, typeof(this), "some script key",
        "<script type="text/javascript">alert('hello world!');</script>", false);

Put this and your user control will show up smoothly. If you don't like the fact that the screen may remain unresponsive for some time with Ajax, you can use UpdateProgress to show a "Loading" text, for example, while the content is being loaded. This is fairly easy. Check out this [video](http://www.asp.net/learn/ajax-videos/video-123.aspx) for further information.

Okay, so now, what happens if we need to fire an event inside the UserControl in response to a user click on an image, for example? Right, the click event will fire a page postback and then the event handling code will be fired in the code behind as expected. Right? Definitely no! Since our user controls are being added dynamically to the page, they will not be there anymore after the postback. This means that ASP.Net will not find the control and, therefore, no event will be fired.

Let me refresh some facts about ASP.Net postback functionality before continuing... Whenever you click a server control in the page, javascript **doPostBack function is called (except for Button and ImageButton, that use a different method - form post). The **doPostBack function takes two arguments, eventTarget and eventArgument. The eventTarget contains the ID of the control that causes the postback and the eventArgument contains any additional data associated with the control. Upon page reload, ASP.Net checks both `Request.Params["__EVENTTARGET"]` and `Request.Params["__EVENTARGUMENT"]` parameters for any postback data. If it finds it, it looks for the control ID and method specified in the `__EVENTTARGET` var and calls the specified method, passing the `__EVENTARGUMENT` value as a parameter.

Said that and knowing that our dynamic user control won't be present in the page during the postback, it is easy to conclude that ASP.Net won't find the control for the ID in the `__EVENTTARGET` parameter and, consequently, nothing will happen.

Okay, so we need to re-add our user control to the page during the postback, so that ASP.Net will be able to find it and fire its event handler. In order to accomplish that, we can use the page ViewState to store the name of the control currently in the page, so that we can re-add it in the page OnLoad event.

    protected override void OnLoad(EventArgs e) {
        base.OnLoad(e);
        if (!this.IsPostBack) {
            // If this is not a postback, set our the initial content page
            ChangeSection("~/InitialControl.ascx");
        } else {
            // Else, retrieve the CurrentControl value from the ViewState
            string currentSection = ViewState["CurrentControl"] as string;
            Control c = ChangeSection(currentSection);    // Use the control name to add it to the page
            if (c is Eventos_EventosRealizados) {
                ((Eventos_EventosRealizados)c).UpdateCallback = delCallback;
            }
        }
    }

    public Control ChangeSection(string _sControl) {
        Control c = this.LoadControl(_sControl);
        // Put a 3 seconds delay so that we can see the magic happen -- remove in the final version
        System.Threading.Thread.Sleep(3000);
        this.ContentArea.Controls.Add(c);    // Add the control to the page
        // Important: Set its ID or the event might not be fired,
        // since ASP.Net uses the control ID to find it
        c.ID = "ContentUserControl";
        ViewState["CurrentControl"] = _sControl;  // store the control name in the ViewState
        // Execute some javascript routine to refresh the screen (if needed)
        ScriptManager.RegisterStartupScript(this, typeof(this), "some script key",
            "<script type="text/javascript">refreshPage();</script>", false);
        return c;
    }

So these are just some basic guidelines for handling user controls dynamically. If you need further info, [asp.net](http://asp.net) official website is always a great place to start off and watch with some videos.
