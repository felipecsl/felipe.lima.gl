---
comments: true
date: 2011-01-11 15:03:33
layout: post
slug: problemas-com-iframe-no-ie
title: Problemas com IFrame no IE?
wordpress_id: 67
tags:
  - ie
  - iframe
  - p3p
  - segurança
---

Pois é. Você não é o único. Apesar de funcionar às mil maravilhas em outros navegadores, o IE parece considerar o IFrame uma ameaça de segurança e se recusa a aceitar cookies de sites de terceiros dentro de um IFrame. Legal né? Isto dificulta qualquer tentativa de colocar um formulário de login dentro de um IFrame, por exemplo ou, ainda mais comum, colocar a janela de pagamento de um gateway (no meu caso, [PagSeguro](https://pagseguro.uol.com.br/)) dentro de um IFrame funcionando como uma sobretela. Isto funciona perfeitamente, mas não no IE.

A questão toda é que o IE não irá aceitar nenhum cookie do PagSeguro, pois ele está fora do domínio principal do site que está sendo acessado no momento (o site onde você está tentando comprar algum produto, por exemplo). A maneira para contornarmos esse problema, seria implementando um mecanismo chamado [P3P](http://www.w3.org/P3P/).O que este negócio aí faz, é criar um mecanismo de expor para o browser qual é a política de privacidade do site de maneira programática (através de um cabeçalho no response).

Exemplo:

    response["P3P"] = 'CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"'

Cada uma destas siglas de 3 ou 4 letras acima tem um significado, como por exemplo, expor como o site utiliza os dados do usuário. Esta propriedade deve ser incluida no cabeçalho de todas as páginas que setam um cookie no browser. Mais informações [aqui](http://stackoverflow.com/questions/389456/cookie-blocked-not-saved-in-iframe-in-internet-explorer) e [aqui](http://adamyoung.net/IE-Blocking-iFrame-Cookies).

Isto é o que acontece quando os seus cookies forem bloqueados :)

[![](/images/2011/01/p3p-300x211.png)](/images/2011/01/p3p.png)

No caso do PagSeguro, o que acabava acontecendo é um erro dizendo "Sua sessão expirou.".

Na minha opinião, é responsabilidade do PagSeguro implementar P3P em suas páginas para possibilitar que os desenvolvedores possam utilizar este recurso, já que, como não temos controle sobre o PagSeguro, não temos como implementar o cabeçalho customizado do P3P nas responses.

Com isso, acabamos tendo que mudar a interface para não utilizarmos mais o IFrame, pois não encontramos solução para o problema!

Bom, fica aí mais um motivo pra você que já odiava o IE, agora tem um motivo a mais :D
