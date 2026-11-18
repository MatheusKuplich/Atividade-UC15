# Yggdrasil

## Sobre o projeto

O Yggdrasil é um projeto acadêmico que desenvolvi com a ideia de criar um portal sobre personagens do universo Marvel.

A proposta foi reunir algumas informações e funcionalidades em um mesmo site, permitindo explorar personagens, pesquisar por eles e guardar os favoritos.

O projeto funciona diretamente pelo navegador. Não cheguei a trabalhar com banco de dados ou cadastro de usuários, então as informações ficam limitadas ao próprio funcionamento do site.

**Versão:** 1.0.0 (preparada, mas ainda não publicada).

## Tecnologias utilizadas

Durante o desenvolvimento, acabei utilizando algumas tecnologias que foram necessárias para montar o site e suas funcionalidades:

- **HTML5 e CSS3:** utilizados para criar e organizar as páginas.
- **Bootstrap 5.3.3:** utilizado principalmente na navegação e na adaptação para telas menores.
- **JavaScript:** responsável pela pesquisa, pelos favoritos e pela validação do formulário.
- **jQuery 3.7.1:** utilizado na animação de abertura e fechamento do painel informativo.
- **Playwright:** utilizado para testar algumas funcionalidades e verificar se as páginas estavam funcionando corretamente.

O Bootstrap e o jQuery estão dentro das pastas do próprio projeto, então não é necessário buscar esses arquivos pela internet para abrir o site.

## Páginas do site

O projeto acabou ficando dividido em três páginas:

- **index.html:** é a página inicial, onde apresento o portal e alguns personagens em destaque, principalmente o Doutor Destino.
- **eventos.html:** é onde fica o catálogo de personagens, com a opção de pesquisar e adicionar favoritos.
- **contato.html:** reúne algumas informações sobre o portal e o formulário de contato.

## Funcionalidades

As principais funcionalidades que implementei foram:

- Pesquisa de personagens pelo nome ou descrição.
- Adição e remoção de personagens dos favoritos.
- Salvamento dos favoritos utilizando `localStorage`.
- Validação dos campos e do e-mail no formulário.
- Menu que se adapta a diferentes tamanhos de tela.
- Painel informativo com abertura e fechamento animados.

Uma coisa importante é que os favoritos ficam salvos apenas no navegador utilizado. Se abrir o site em outro dispositivo ou navegador, a lista não será a mesma.

O formulário também não realiza um envio real de mensagens. Por enquanto, ele apenas verifica os dados preenchidos e simula o resultado.

As imagens dos personagens ainda estão representadas por espaços reservados.

## Organização dos arquivos

Para não deixar tudo misturado, organizei os arquivos em algumas pastas, separando os estilos, os scripts e os testes.

```text
.
├── index.html
├── eventos.html
├── contato.html
├── css/
│   ├── bootstrap.min.css
│   └── style.css
├── js/
│   ├── bootstrap.bundle.min.js
│   ├── jquery.min.js
│   └── script.js
├── scripts/
│   └── serve.js
├── tests/
│   └── portal.spec.js
├── playwright.config.js
├── package.json
└── documentação (*.md)
```

## Como executar o projeto

Para abrir o site no computador, é necessário ter o Node.js e o npm instalados.

Primeiro, abra o terminal na pasta do projeto e execute:

```bash
npm install
```

Na primeira vez, também será necessário instalar o navegador utilizado nos testes:

```bash
npx playwright install chromium
```

Depois disso, inicie o servidor com:

```bash
npm start
```

Com ele funcionando, basta acessar o endereço:

`http://127.0.0.1:4173`

Quando terminar, é só voltar ao terminal e utilizar `Ctrl+C` para encerrar.

Esse servidor foi utilizado para facilitar a visualização do site e a execução dos testes. Ele não funciona como um backend da aplicação.

## Testes

Também preparei alguns testes automatizados utilizando Playwright.

Para executá-los, basta utilizar:

```bash
npm test
```

Eles verificam algumas das funcionalidades do portal e ajudam a identificar se alguma alteração acabou afetando o funcionamento do site.

Deixei os resultados e as observações sobre os testes no arquivo [TESTES.md](./TESTES.md).


## Limitações conhecidas

Apesar das funcionalidades implementadas, algumas partes ainda possuem limitações:

- Os favoritos ficam salvos somente no navegador utilizado.
- O formulário não envia mensagens de verdade.
- As imagens dos personagens ainda precisam ser escolhidas e adicionadas.
- O projeto é independente e não possui vínculo oficial com a Marvel.

## Histórico de desenvolvimento

O projeto se resumiu em diferentes etapas para facilitar o meu ritímo em relação ao desenvolvimento. Até o momento, ele não foi subido no Git devido algumas dificuldades de entendimento sobre a plataforma (e ter esquecido um pouco também).