---
comments: true
date: 2009-06-17 16:23:00
layout: post
slug: hiding-sensitive-data-in-the-query-string
title: Hiding sensitive data in the query string
wordpress_id: 34
---

Sometimes you need to pass data to a web page and at the same time you need to be able to provide a permalink to that URL to the user. In this case, you don't have any option other than passing those parameters through the Query String. Otherwise, you could use the Form, Session state, database or any other persistence or data transport mechanism.

I recently had to create a page that needed to receive some sensitive parameters and, at the same time, I needed to be able to provide the URL to the user, so that he/she could view that same page. However, I needed to somehow make the parameters private to the system, so that no one could decypher what data the actual parameters held. The only solution I found was to [encrypt](http://en.wikipedia.org/wiki/Cryptography) the Query String values!

For those who are not very familiar with the subject (like me), cryptography can be a really scary thing! Thankfully, Jeff Atwood, founder of the famous [codinghorror.com](/admin/Pages/www.codinghorror.com) blog (which of I am a fan also!) wrote a great [article](http://www.codeproject.com/KB/security/SimpleEncryption.aspx) at Code Project with some simple background, definitions and a .NET code for those who do not have a strong background on the subject.

I not only found that very useful but also ported the code to C# to fulfill my needs. [This tool](http://www.developerfusion.com/tools/convert/vb-to-csharp/) helped me with the rough conversion but I still had to do some conversion by hand, since the code did not compile at first try.

I separated the code logically in different files for better reading. It can be downloaded [here](http://www.felipel.com/files/Encryption.zip).

Below is a simple usage of the Simmetric-key class with the Rijndael ([AES](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard)) provider to encrypt the query string variable in one page, send it, and then decrypt in the other side:

```c#
Symmetric symEncryption = new Symmetric(Symmetric.Provider.Rijndael);
symEncryption.Key.Text = "SomeKey";
string sSensitiveText = "Some sensitive data";
string sEncryptedData = symEncryption.Encrypt(new Data(sSensitiveText)).Base64;
// fearlessly send sEncryptedData in your query string
Response.Redirect(
    "http://www.someurl.com/somepage.aspx?data=" + Server.UrlEncode(sEncryptedData));
// in the other side, decrypt the text you just received
string sDecryptedText = symEncryption.Decrypt(
    new Data(Request.QueryString["data"].FromBase64())).Text;
// outputs "Some sensitive data"
Console.WriteLine(sDecryptedText);
```

Hope this helps someone :)
