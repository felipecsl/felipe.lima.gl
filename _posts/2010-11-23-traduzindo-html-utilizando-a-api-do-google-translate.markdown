---
comments: true
date: 2010-11-23 13:44:42
layout: post
slug: traduzindo-html-utilizando-a-api-do-google-translate
title: Traduzindo HTML utilizando a API do Google Translate
wordpress_id: 59
tags:
  - asp.net mvc
  - google translate
  - jquery
---

Pessoal,

Para quem quiser utilizar a API do Google Translate para traduzir partes de um documento HTML, segue uma implementação que tive que fazer recentemente utilizando jQuery e ASP.NET MVC:

- Controller Action para fazer o request para a API REST:

```c#
[ValidateInput(false)]
public ActionResult Translate(FormCollection vars) {
string reqUri = "https://www.googleapis.com/language/translate/v2?key=YOUR_GOOGLE_API_KEY&source=pt&target=en&format=html";`


var webRequest = (HttpWebRequest)WebRequest.Create(reqUri);`


webRequest.ContentType = "application/x-www-form-urlencoded";
webRequest.Method = "POST";`

byte[] bytes = Encoding.UTF8.GetBytes("q=" + vars["q"]);
webRequest.ContentLength = bytes.Length;
webRequest.Headers.Add("X-HTTP-Method-Override", "GET");`

using (Stream outputStream = webRequest.GetRequestStream()) {
outputStream.Write(bytes, 0, bytes.Length);
}

using (WebResponse webResponse = webRequest.GetResponse()) {
if (webResponse == null) {
return null;
}
using (StreamReader sr = new StreamReader(webResponse.GetResponseStream())) {
return Content(sr.ReadToEnd().Trim(), "text/json");
}
}
}
```

Algumas considerações sobre esta action:

- Não estamos validando o parâmetro **q** de entrada. Seria interessante validar a presença deste parâmetro no form e lançar uma exceção caso ele não esteja presente;

- Não esqueça de passar para o parâmetro **key** a sua chave da API do google;

- Uma melhoria seria receber via form também o código do idioma fonte e destino (parâmetros **source** e **target** da URL).

Vamos agora para o código de cliente (JavaScript) para atualizar a view:

```javascript
var translateUrl = '<%= Url.Action("Translate") %>';

$(function () {
  translateElement("caseText");
  translateElement("caseTitle");
});

function translateElement(elemId) {
  $.ajax({
    url: translateUrl,
    dataType: "json",
    type: "POST",
    data: {
      q: $("#" + elemId).html(),
    },
    success: function (json) {
      // TODO: I've found that the returned translated text from Google may be incomplete
      // if we send any   elements within the text. We should remove any occurrences
      // of this in the input string.
      $("#" + elemId).html(unescape(json.data.translations[0].translatedText));
    },
  });
}
```

O que este código faz é apenas chamar a Action **Translate** que, por sua vez, chama a API do Google e retorna o JSON com o texto traduzido. Feito isso, a função **translateElement** apenas atualiza o conteúdo do elemento com a tradução.

Acredito que o código seja auto explicativo. Qualquer dúvida, por favor perguntem nos comentários :)

Documentação da api [aqui](http://code.google.com/apis/language/translate/v2/using_rest.html) e [aqui](http://code.google.com/apis/language/translate/v2/getting_started.html#JSONP).

Abraços!
