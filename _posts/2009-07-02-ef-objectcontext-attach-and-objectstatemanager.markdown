---
comments: true
date: 2009-07-02 07:30:00
layout: post
slug: ef-objectcontext-attach-and-objectstatemanager
title: EF ObjectContext.Attach and ObjectStateManager
wordpress_id: 32
---

When working with the Entity Framework, you've got to be extremely careful when exchanging Entities between different ObjectContexts. You probably know that if you want to modify an Entity which is already added to the database, you have to first attach it to the context before modifying it, so that EF can keep track of the changes you made to that instance and save them to the database later. There is a good reference page at msdn about [attaching related objects](http://msdn.microsoft.com/en-us/library/bb896271.aspx).

Attach assumes your Entity has not been changed while it was not being tracked by the ObjectContext. Otherwise, call **ApplyPropertyChanges** to attach and apply the changes.

Yesterday, I lost almost my entire day trying to translate this exception I was getting in ObjectContext.Attach():

"**System.InvalidOperationException : An object with the same key already exists in the ObjectStateManager. The ObjectStateManager cannot track multiple objects with the same key.**"

EF complains that the Entity you're trying to add actually has an EntityKey identical to one that is already in the database. Okay, this seems obvious to me, since this is the actual purpose of Attach - start tracking changes objects that already exist in the database.

After an entire afternoon searching for an answer, I came accross some pages with other issues related to Attach that some people had, as well some solutions for [them](http://www.codeproject.com/KB/architecture/attachobjectgraph.aspx).

Today I re-read the exception message and the answer just popped on my face: "**I'm already tracking the object you're trying to Attach, dumbass!**". In fact, you cannot Attach an object to an ObjectContext if that object somehow has been already cached by the ObjectStateManager.

Let me exemplify:

```c#
public void UpdateUserBooks(User _user) {
  using (DataEntities db = new DataEntities()) {
    Book userBook = (from b in db.Book.Include("Users")
                    select b).FirstOrDefault();
    db.Attach(_user); // throws InvalidOperationException
    userBook.Users.Add(_user);
    db.SaveChanges();
  }
}
```

What is happening? Your userBook query returns all the Books from the database **AND** their related Users (the Include was there for a reason). When you try to attach your User after_user after the query has been run, the ObjectContext already has \_user under its hood, so trying to Attach it will throw an InvalidOperationException.

The solution is very simple: Always attach all your Entities before doing any operation/query in your ObjectContext. This way, you avoid any double-tracking request. If the ObjectContext needs your Entity later, it will retrieve the instance you attached before and you're good to go! Follow the fixed code:

```c#
public void UpdateUserBooks(User _user) {
  using (DataEntities db = new DataEntities()) {
    db.Attach(_user); // works fine
    Book userBook = (from b in db.Book.Include("Users")
                    select b).FirstOrDefault();
    db.Attach(_user); // throws InvalidOperationException
    userBook.Users.Add(_user);
    db.SaveChanges();
  }
}
```
