---
comments: true
date: 2010-12-12 22:45:15
layout: post
slug: problemas-de-timezone-com-ruby
title: Problemas de Timezone com Ruby?
wordpress_id: 63
tags:
  - datetime
  - ruby
  - timezone
---

Timezones podem ser uma dor de cabeça quando trabalhamos muito com datas. Em ruby, existem pelo menos três classes diferentes para manipulação de data/hora: Date, Time e DateTime.

O nosso grande problema foi que, ao salvar uma data/hora no banco mySQL via ActiveRecord, o timezone estava sendo normalizado para UTC +00:00, enquanto o timezone do sistema é GMT -02:00, pois estamos em horário brasileiro de verão. Normalmente seria GMT -03:00).

Isto se torna um problema quando precisamos comparar datas, que vêm do banco de dados, com a data atual. Utilizando Time.now, estávamos observando um offset de 2h dado pela diferença entre o timezone do banco e o do sistema.

Para solucionar o problema, precisamos normalizar os dois objetos para o mesmo timezone. Resolvemos isto utilizando o método Time.utc, que monta um novo objeto Time baseado no UTC:

```ruby
module ApplicationHelper
  def self.get_utc_time
    now = Time.now
    Time.utc(now.year, now.month, now.day, now.hour, now.min, now.sec)
  end
end
```

Caso alguém tenha uma solução mais elegante para o problema, aceito sugestões :)
