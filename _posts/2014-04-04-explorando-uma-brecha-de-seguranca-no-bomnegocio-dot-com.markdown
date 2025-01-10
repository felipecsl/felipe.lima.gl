---
layout: post
title: "(pt-br) Explorando uma brecha de segurança no bomnegocio.com"
date: 2014-04-04 23:51:34 -0300
comments: true
published: false
categories:
---

# Introdução

Aqui no Brasil tem vários sites de compra e venda de cacarecos online. Sempre usei o [Mercado Livre](http://mercadolivre.com.br) desde a época da faculdade para comprar e vender principalmente coisas usadas. Entretanto, com o tempo ele foi ficando mais caro para anunciar e outros concorrentes apareceram.

Mais recentemente, notei a entrada no mercado (a propósito, com os dois pés na porta) do [Bom Negócio](http://bomnegocio.com) e do [OLX](http://olx.com.br). Ambos fazendo muita propaganda na TV, inclusive em horário nobre da Grobo. Me chamou a atenção a propaganda do Bom Negócio, muito engraçada por sinal, com a participação do [Compadre Washington](https://twitter.com/compadrewash) falando, entre outras largadinhas clássicas, o "sabe de nada, inocente!". Hilário.

Estamos fazendo reforma aqui no apartamento e precisamos nos desfazer de alguns pertences, entre eles, uma mesa redonda, antiga, de madeira de Gramado com quatro cadeiras, muito bonita, por sinal.

Resolvi dar uma chance para o Bom Negócio e anunciar lá. Fiz upload das imagens, coloquei uma descrição, preço camarada e criei o anúncio. Em poucos minutos, depois de ter sido aprovado (a moderação é manual!) já comecei a receber SMS e emails de pessoas interessadas. Como coloquei um bom preço para vender logo, imaginei que fosse vender rápido, mas nunca imaginei que seria assim tão rápido.

Acabei fechando negócio com um magrão gente boa que veio e buscou a mesa e cadeiras cerca de 2h depois de eu ter criado o anúncio. Tudo isso de graça. Performance impressionante! Me surpreendi.

# Investigação

Por ser programador, desde o momento que entrei no site, comecei a reparar nos detalhes das páginas, como foram implementadas, as URLs, padrões, etc. Notei que havia algo de estranho na maneira que ele tratava as páginas internas do usuário, mas uma em especial me chamou a atenção, o link de Editar Anúncio.

[![](/images/2014/04/bnegocio_editar.png)](/images/2014/04/bnegocio_editar.png)

Notei que ao clicar no link acontecia um redirect estranho que me levava para uma página com a URL mais ou menos assim: `http://www2.bomnegocio.com/ai/form/0?cmd=edit&ticket=2cc84e2e9f0d41387d79794b12ceba07990cf0c2`. Entretanto, o link de editar anúncio tinha o href bem diferente. Esse era o formato: `https://www3.bomnegocio.com/password_page/load_page/0?list_id=437898346&cmd=edit&type=AD_EDIT&data=1343242`. Isso me deixou com uma pulga atrás da orelha.

Ao olhar para essa URL, a primeira coisa que me veio à cabeça foi de alterar o número do parâmetro `list_id` para o ID de outro produto do site. Não foi difícil obter o ID de outro produto. Olhando para a URL de um anúncio (`http://rs.bomnegocio.com/regioes-de-porto-alegre-torres-e-santa-cruz-do-sul/computadores-e-acessorios/monitor-17-proview-preto-tela-plana-31904501`), fica claro que o ID se trata do último segmento do path, mais precisamente, neste caso, `31904501`. Também era possível encontrar este ID na própria descrição do produto, pois ele vem na página mesmo, entitulado **Código do anúncio**:

[![](/images/2014/04/bnegocio_id_anuncio.png)](/images/2014/04/bnegocio_id_anuncio.png)

Em seguida, o que fiz foi apenas testar este ID novo naquela URL de editar anúncio, alterando o parâmetro `list_id`. Com a alteração, ficaria mais ou menos assim: `https://www3.bomnegocio.com/password_page/load_page/0?list_id=31904501&cmd=edit&type=AD_EDIT&data=1343242`.

Ao fazer esta simples alteração, algo mágico aconteceu. O Bom Negócio simplesmente me redirecionou para a página de editar anúncio, com todas as informações preenchidas do anúncio referente ao ID `31904501` (que pertencia a outro usuário), além dos dados pessoais do usuário que tinha originalmente postado aquele anúncio (Nome completo, e-mail, telefone, etc).

[![](/images/2014/04/bnegocio_anuncio.png)](/images/2014/04/bnegocio_anuncio.png)

Nesse momento me dei conta que tinha me deparado com uma falha de segurança muito grave. Mas não era só isso. Ao olhar para o cabeçalho do site, vi que na verdade o Bom Negócio tinha também me logado com o usuário que postou o anúncio originalmente!

[![](/images/2014/04/bnegocio_header.png)](/images/2014/04/bnegocio_header.png)

Esse foi um momento bizarro! Basicamente consegui me autenticar no site como outro usuário, apenas manipulando uma URL de editar anúncio, usando o ID do anúncio dele!

[![](/images/2014/04/bnegocio_anuncios.png)](/images/2014/04/bnegocio_anuncios.png)

Decidi ir mais adiante. Minha teoria era de que, manipulando a URL através da alteração do parâmetro `list_id`, eu poderia me logar como qualquer usuário, bastando para isso ter o ID de um dos anúncios dele. Fui tentando com IDs de outros anúncios, mas rapidamente acabei caindo na tela de login. Fui deslogado automaticamente do sistema. Algo não estava certo.

Voltando a analisar a URL de editar anúncio, reparei que ela possuia outro parâmetro um pouco mais obscuro: `data`. Se tratava de outro número aparentemente sem relação com o `list_id`, esse dava pouca indicação de onde vinha. Eu estava desconfiado pois em momento algum o ID do usuário entrava na jogada, então depois de alguns minutos comecei a suspeitar que o parâmetro `data` se tratava na verdade de um ID de usuário. Não estava certo ainda de qual usuário seria, teria que ser ou do dono do anúncio, ou do usuário logado atualmente. Depois de fazer mais alguns testes, ficou claro que `data` se tratava do ID do usuário que estava logado no momento.

Acontece que, ao tomar posse da conta de outro usuário, automaticamente meu ID de usuário alterava, pois eu estava na verdade me passando por outra pessoa, portanto deveria enviar um parâmetro `data` diferente.

Não foi difícil obter o ID de usuário. Este estava um pouco mais escondido, mas facilmente encontrado no código fonte da página:

[![](/images/2014/04/bnegocio_data.png)](/images/2014/04/bnegocio_data.png)

Com esses ingredientes, eu basicamente tinha uma receita para me autenticar no bomnegocio.com como qualquer usuário do site, bastando atender a apenas dois simples pré-requisitos:

- Estar logado inicialmente em uma conta qualquer. Para isto, bastava criar um usuário fictício;
- Ter o link para qualquer anúncio do usuário que desejo personificar. Facilmente encontrado nas páginas de listagem de anúncios do site.

# Ação

Com estas informações em mãos, parti para a parte divertida: construir uma prova de conceito :)

Escrevi um exploit em Ruby, utilizando [Mechanize](http://mechanize.rubyforge.org/) que se autentica no bomnegocio.com utilizando um usuário de testes e varre as todas as páginas de anúncios do site, personificando cada usuário que criou cada um dos anúncios e salvando suas informações em um arquivo de texto, em formato CSV.

Logo, vi que um simples arquivo de texto não seria suficiente, devido ao grande volume de dados e duplicação de informações, visto que frequentemente o mesmo usuário anuncia vários produtos de uma vez só.

Em um segundo momento, resolvi mover os dados para um simples banco de dados MySQL, salvando as informações em uma tabela de usuários com ID, Email, Nome Completo e Telefone. Desta maneira, seria mais fácil de evitar registros duplicados, pois o ID seria a chave primária.

Segue abaixo o código completo do exploit que varre o bomnegocio.com e extrai informações de todos os usuários que encontrar :)

```ruby

```

Vale lembrar que poderiamos armazenar muitas outras informações dos usuários, por exemplo, CPF/CNPJ, CEP, Endereço, Estado, Municipio, etc. Todas estas informações estão disponíveis no momento em que nos apoderamos da sessão do usuário. Esta é apenas uma prova de conceito para ilustrar a falha de seguranca, entretanto, as dimensões deste problema são muito maiores do que apenas uma lista de nomes, email e telefone.

# Conclusão

Com este artigo, espero poder alertar as empresas e os desenvolvedores de quão frágil é a segurança dos sites atualmente. Mesmo com todos os recursos disponíveis para tornar os sistemas o mais seguro possível, ainda hoje podemos facilmente encontrar falhas escancaradas como essa em sites de alto tráfego e volume de usuários.

Este é um problema bastante grave que expoe os dados pessoais de milhões de usuários que confiaram suas informações ao site bomnegocio.com, que falhou em armazená-los de forma segura, muito pelo contrário, deixando um verdadeiro rombo de segurança e expondo todas as informações, de absolutamente todos os seus usuários, a qualquer hacker que disponha o tempo e paciência de extraí-los.
