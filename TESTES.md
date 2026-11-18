# Testes

## Testes automatizados

Durante o desenvolvimento, utilizei o Playwright com Chromium para verificar se as páginas e as principais funcionalidades estavam funcionando corretamente.

Os testes ficaram organizados no arquivo `tests/portal.spec.js` e foram divididos entre algumas partes do projeto:

- Abertura da página inicial, título e destaque do Doutor Destino.
- Funcionamento do link para pular diretamente ao conteúdo principal.
- Navegação entre as páginas de início, personagens e contato.
- Verificação de erros de JavaScript nas três páginas.
- Adaptação do site em diferentes larguras de tela (320, 375, 768, 1024 e 1440 px).
- Funcionamento do menu do Bootstrap e do painel informativo com jQuery.
- Pesquisa de personagens existentes e buscas sem resultado.
- Adição, remoção e permanência dos favoritos após atualizar a página.
- Validação do formulário e apresentação da mensagem de envio simulado.

Ao executar os testes com `npm test`, os 9 casos foram aprovados.

Durante as primeiras execuções, encontrei alguns problemas que precisei corrigir. Um dos seletores utilizados nos testes estava identificando mais de um link, então ajustei a busca para encontrar o elemento correto. Também encontrei uma largura mínima no `body` que poderia causar rolagem horizontal. Depois de remover essa restrição, executei a suíte novamente e os testes passaram.

O link para pular o conteúdo também foi verificado utilizando Tab e Enter. Essa verificação, porém, não cobre toda a navegação pelo teclado.

## Verificações manuais

Além dos testes automatizados, também considerei algumas situações que precisam ser observadas diretamente no navegador.

Na parte de responsividade, foram utilizadas cinco larguras diferentes para verificar a presença de rolagem horizontal. Apesar de os testes terem passado, a organização visual dos elementos em cada tamanho de tela não foi conferida manualmente em todos os casos.

Também fazem parte dessas verificações a navegação entre as três páginas, o retorno à página inicial e o funcionamento dos links. Nas funcionalidades, ainda é importante observar diretamente as pesquisas, a inclusão e remoção de favoritos e a permanência dos dados após atualizar a página.

No formulário, considerei situações como o envio sem preencher os campos, o preenchimento parcial, o uso de um e-mail inválido e o preenchimento correto. A validação de preenchimento parcial já foi verificada pelo Playwright, mas as demais situações ainda não tiveram uma conferência manual completa.

## Acessibilidade

A navegação pelo teclado merece uma atenção maior. O link para pular o conteúdo já passou por uma verificação automatizada, mas ainda seria necessário percorrer as páginas utilizando Tab e Shift+Tab, conferir o foco dos elementos e testar se os botões também podem ser acionados pelo teclado.

Também ficaram como pontos de conferência a identificação dos campos, a apresentação das mensagens de erro e sucesso, o comportamento da página com ampliação de 200% e o funcionamento da preferência por movimento reduzido.

O menu em telas menores já foi incluído nos testes automatizados, mas a preferência por movimento reduzido ainda não passou por uma verificação manual.










(fé em Deus)




(amém?)