# Acessibilidade

Durante o desenvolvimento do Yggdrasil, procurei deixar o site fácil de usar em diferentes dispositivos e também facilitar a navegação para pessoas com diferentes necessidades.

## Estrutura das páginas

Organizei as páginas utilizando elementos do HTML5, como `header`, `nav`, `main` e `footer`, para separar melhor cada parte do conteúdo.

Também coloquei um link no início das páginas para permitir que a pessoa pule diretamente para o conteúdo principal, sem precisar passar por todo o menu.

## Navegação pelo teclado

Preparei os links, botões e campos para permitir o uso pelo teclado.

O link para pular o conteúdo também foi incluído nos testes automatizados. Porém, ainda preciso conferir manualmente a navegação completa utilizando Tab e Shift+Tab.

## Responsividade

Utilizei Flexbox, Grid e Bootstrap para organizar o conteúdo em diferentes tamanhos de tela.

Também testei o site nas larguras de 320, 375, 768, 1024 e 1440 pixels para verificar se o conteúdo continuava organizado e se aparecia alguma rolagem horizontal indesejada.

## Formulário

Organizei os campos com identificações e validações para evitar o envio de informações incorretas ou incompletas.

As mensagens de retorno aparecem próximas ao formulário, facilitando a identificação de erros e a compreensão do resultado.

## Animações

O painel informativo utiliza jQuery para abrir e fechar.

Também incluí um cuidado com a preferência por movimento reduzido, evitando animações desnecessárias para quem utiliza essa configuração.

## Considerações finais

Procurei aplicar esses cuidados ao longo de todo o projeto, mas ainda preciso realizar algumas verificações manuais, principalmente na navegação pelo teclado, para conferir se tudo funciona como esperado.