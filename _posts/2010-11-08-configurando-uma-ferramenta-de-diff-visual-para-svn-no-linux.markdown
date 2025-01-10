---
comments: true
date: 2010-11-08 23:37:56
layout: post
slug: configurando-uma-ferramenta-de-diff-visual-para-svn-no-linux
title: Configurando uma ferramenta de diff visual para SVN no Linux
wordpress_id: 55
tags:
  - diff
  - linux
  - rails
  - subversion
  - svn
---

Cá estou eu aqui postando após vários dias parado. Tenho trabalhado diariamente com Ubuntu durante os últimos dias devido a um projeto em Rails 3 que estamos tocando aqui na [Quavio](http://www.quavio.com.br). Por isso, tenho penado bastante com configuração de ambiente, familiarização com o framework (ainda estou aprendendo muito) e, consequentemente, tenho tido ainda menos tempo do que o usual.

Vou aproveitar só para deixar um rápido passo-a-passo que utilizei para configurar uma ferramenta de diff visual para SVN no Ubuntu. No Windows eu vinha usando o ótimo [WinMerge](http://winmerge.org/). No Linux, fui recomendado ao [meld](http://meld.sourceforge.net/) nesta [pergunta](http://stackoverflow.com/questions/1141686/visual-svn-diff-and-compare-tools-for-linux) no stackoverflow. Bom, vamos aos passos:

- `sudo apt-get install meld`
- `gedit ~/diffwrap.sh`
- Cole o seguinte conteúdo dentro do arquivo recém criado e salve (adaptado [daqui](http://svnbook.red-bean.com/en/1.2/svn.advanced.externaldifftools.html)):

  !/bin/sh

  # Configure your favorite diff program here.

  DIFF="/usr/local/bin/my-diff-tool"

  # Subversion provides the paths we need as the sixth and seventh

  # parameters.

  LEFT=${6}
    RIGHT=${7}

  # Call the diff command (change the following line to make sense for

  # your merge program).

  $DIFF $LEFT $RIGHT

  # Return an errorcode of 0 if no differences were detected, 1 if some were.

  # Any other errorcode will be treated as fatal.

- `chmod a+x diffwrap.sh`
- `gedit ~/.subversion/config`
- Procure a linha onde diz "diff-cmd" (linha 57, no meu arquivo)
- Remove o "#" do início da linha para descomentá-la
- Digite /home/<nome do seu usuário>/diffwrap.sh no final da linha. O resultado deve ser algo assim: `diff-cmd = /home/<nome do usuario>/diffwrap.sh
`. Não esqueça de trocar **<nome do usuário>** pelo nome real do seu usuário no sistema
- Pronto. Ao digitar `svn diff arquivo.rb`, o meld será executado com dois arquivos abertos: o seu, com suas modificações locais, e a cópia origina que está no repositório.

Por hoje é isso. Nos próximos dias pretendo escrever um guia sobre como publicar uma aplicação Rails 3 do zero num cloud server do Rackspace.

Até mais!
