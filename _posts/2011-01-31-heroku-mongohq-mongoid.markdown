---
comments: true
date: 2011-01-31 23:00:08
layout: post
slug: heroku-mongohq-mongoid
title: Heroku + MongoHQ + Mongoid
wordpress_id: 71
tags:
  - heroku
  - mongodb
  - mongohq
  - mongoid
  - ruby
---

O [Heroku](http://heroku.com) possui um Add-on muito interessante para trabalhar com [MongoDB](http://www.mongodb.org/) chamado [MongoHQ](https://mongohq.com/home). Como de costume, existe tanto um plano grátis, quanto planos pagos.

Isso significa que é possível levantar um site com Ruby on Rails ou Sinatra e MongoDB rapidinho e sem desembolsar um centavo com o Heroku.. Damn good.

Como nem tudo é perfeito, a [documentação](http://docs.heroku.com/mongohq#gem-options-and-setup) do add-on MongoHQ ainda é um tanto quanto "magra" e praticamente nem fala no Mongoid. Perdi uns vários minutos googleando e nada. Até que então encontrei o método from_uri na classe Connection do driver de mongo para Ruby.

Ao habilitarmos este add-on, o Heroku seta uma variável de ambiente chamada MONGOHQ_URL, que utilizamos para estabelecer a conexão com o Mongo server. Não encontrei em lugar nenhum como fazer esta conexão, então deixo aqui caso alguém precise:
