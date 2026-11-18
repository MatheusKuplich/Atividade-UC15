# Auditoria do projeto

Durante o desenvolvimento, revisei algumas partes do projeto e fiz ajustes para melhorar a organização, a navegação, a acessibilidade e o funcionamento das páginas.

## Página inicial (index.html)

Na página inicial, fiz algumas correções na estrutura e na navegação:

- Coloquei o link para pular diretamente ao conteúdo principal no início das três páginas e corrigi seu destino.
- Atualizei os links do menu, que antes apontavam para páginas antigas e vazias.
- Corrigi o botão "Ver personagens", direcionando-o para a página de eventos.
- Ajustei a identificação de uma seção que estava apontando para um título inexistente.
- Revisei os cards de personagens para evitar a repetição do mesmo destaque.
- Removi uma área de resultado de formulário que estava fora de contexto e organizei as mensagens junto às funcionalidades.
- Corrigi uma tag de formulário que estava sobrando e organizei o formulário na página de contato.
- Ajustei o carregamento do Bootstrap para que seus recursos fossem utilizados corretamente.

## Páginas de eventos e contato

Os arquivos antigos `personagens.html` e `sobre.html` estavam vazios. Por isso, criei as páginas `eventos.html` e `contato.html`, atualizei os links da navegação e removi os arquivos que não seriam mais utilizados.

Também organizei o formulário na página de contato, deixando sua estrutura separada da página inicial.

## Arquivos de apoio

Alguns arquivos necessários para o funcionamento do projeto estavam vazios. Fiz as seguintes alterações:

- Bootstrap: adicionei a versão 5.3.3 para permitir o uso dos estilos e componentes da biblioteca.
- jQuery: adicionei a versão 3.7.1 para utilizar seus recursos no projeto.
- JavaScript: implementei as funcionalidades de pesquisa, favoritos, validação do formulário e interações com jQuery.

## Estilos e responsividade

Revisei o arquivo `style.css`, pois a grade utilizava duas colunas fixas e as imagens tinham uma altura definida que dificultava a adaptação em telas menores.

Refiz a organização dos estilos utilizando a abordagem mobile-first e uma grade adaptável, permitindo que o conteúdo se organize melhor em diferentes tamanhos de tela.

## Documentação e testes

Além das alterações nas páginas e nos arquivos de código, completei a documentação do projeto e configurei os testes automatizados com Playwright para verificar seu funcionamento.

