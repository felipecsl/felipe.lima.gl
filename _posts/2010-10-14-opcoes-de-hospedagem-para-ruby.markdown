---
comments: true
date: 2010-10-14 23:34:37
layout: post
slug: opcoes-de-hospedagem-para-ruby
title: Opções de hospedagem para Ruby
wordpress_id: 45
tags:
  - hospedagem
  - rails
  - ruby
  - sinatra
---

Na Quavio, empresa onde trabalho e sou um dos sócios, uma boa parcela dos projetos executados são basicamente sites e hotsites de clientes. Isto implica em necessidades específicas de hospedagem, como por exemplo, uma boa infraestrutura para envio/recebimento de emails (com webmail), painel de controle, suporte técnico para eventuais problemas de instabilidade, baixo custo mensal, pouca utilização de espaço em disco, backup automático, etc. Basicamente, não queremos nos responsabilizar pelo gerenciamento da infra-estrutura que abriga cada um destes projetos, que acabam se tornando muitos com o passar do tempo.

Resumindo, precisamos de um fornecedor de hospedagem que atenda a estas necessidades e que, ao mesmo tempo, ofereça um bom suporte às tecnologias que utilizamos.

Recentemente, decidimos por utilizar exclusivamente Ruby e, preferencialmente, Sinatra (ou Rails) para este tipo de projeto devido a uma série de fatores. Eu diria que os principais seriam a extrema simplicidade de uso e alta produtividade que obtemos com estas ferramentas.

Esta decisão, por sua vez, implica em uma maior dificuldade na escolha do nosso fornecedor de hospedagem, visto que a maioria deles simplesmente não possui suporte a estas tecnologias ou, se possui, é bastante precária ou ineficiente.

Vínhamos utilizando até então, preferencialmente, a [Kinghost](http://www.kinghost.com.br) para este fim. Entretanto, chegamos à conclusão de que o suporte a Ruby on Rails é bastante precário e limitado. Isso pra não falar de Sinatra. Ao ligar para o Call Center, o atendente, que se dizia técnico, me pediu que soletrasse a palavra "Sinatra" para ele. Desisti na hora.

Outra opção era a [Locaweb](http://www.kinghost.com.br), que também vinhamos utilizamos em alguns casos específicos e que se mostrou relativamente satisfatória em se tratando de suporte a Ruby. Entretanto, considero o custo/benefício da Locaweb baixo (o preço da hospedagem compartilhada parte de R$ 29/mês) quando comparada a outras hospedagens gringas. Além disso, tivemos uns problemas sérios lá com SSH recentemente, o que nos deixou bastante insatisfeitos com o serviço da Locaweb também.

Não nos restaram muitas opções no Brasil, por isso estamos pensando seriamente em procurar alternativas fora daqui para hospedar nossos projetos. Eu realmente não queria ter que fazer isso, pois queriamos muito fomentar o desenvolvimento das hospedagens para essas tecnologias no Brasil, mas infelizmente não nos resta outra alternativa, já que não encontramos um fornecedor que nos atenda de forma satisfatória por aqui.

Não é à toa que vemos manifestações [deste tipo](http://blog.kinghost.com.br/2010/09/empresas-de-hospedagem-de-sites-divulgam-esclarecimento/) no mercado brasileiro, pois concordo que a reclamação dos consumidores tem fundamento.

Aceito sugestões de boas hospedagens para Ruby/Sinatra/Rails no Brasil ou fora.

Me surpreendi positivamente esses dias com o excelente serviço que [heroku](http://heroku.com) oferece. Achei fantástico. O deploy é simplesmente um git push. Mais fácil, impossível!

Seria muito bom termos algo nesse nível aqui no Brasil!
