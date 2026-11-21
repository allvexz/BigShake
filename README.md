# BIG SHAKE

Site comercial estático desenvolvido em HTML5, CSS e JavaScript puro para publicação no GitHub Pages.

## Executar localmente

1. Abra a pasta do projeto no VS Code.
2. Abra `index.html` no navegador ou use a extensão Live Server.
3. Não é necessário instalar dependências nem executar um servidor Node.js.

## Publicar no GitHub Pages

O projeto inclui o workflow `.github/workflows/pages.yml`.

1. Envie o projeto para a branch `main`.
2. Crie um repositório vazio no GitHub e conecte-o a esta pasta com `git remote add origin <URL_DO_REPOSITORIO>`, caso ainda não haja um remoto.
3. No GitHub, acesse **Settings > Pages**.
4. Em **Build and deployment > Source**, selecione **GitHub Actions**.
5. Aguarde o workflow **Deploy BIG SHAKE to GitHub Pages** concluir.
6. Abra o endereço exibido pelo workflow ou pelo ambiente `github-pages`.

## Atualizações

- Produtos, preços e categorias: edite `js/cardapio.js`.
- Instagram: edite `js/config.js`.
- Horários: edite `js/config.js` e, se necessário, o texto em `index.html`.
- Mapa: o Google Maps usa o CEP e o bairro informados; confirme o pin com o endereço completo.
- Imagens: imagens externas são ilustrativas até que sejam fornecidas fotos reais da BIG SHAKE.
- Vitamina de Açaí e adicionais: edite `PRECOS_CONFIRMADOS` e `ADICIONAIS_VITAMINA_ACAI` em `js/cardapio.js`.
- Preços provisórios dos Milk-Shakes: edite `PRECOS_PROVISORIOS_MILKSHAKE` em `js/cardapio.js`.
- Sabores demonstrativos dos Milk-Shakes: edite `SABORES_MILKSHAKE_SUGESTAO` em `js/cardapio.js`.
- Produtos por peso: a modalidade é controlada por `priceType: "weight"` em `js/cardapio.js`; não utilize preço por unidade ou por quilograma.
- Picolés, pote de sorvete, salgados e balas/doces: edite os dados centralizados em `js/cardapio.js`.
- Preços provisórios podem ser identificados pelas constantes `PRECOS_PROVISORIOS_*` e pelos campos `priceType: "provisional"`.
- Vitamina de Açaí: os dois primeiros adicionais selecionados são gratuitos em cada unidade; a cobrança adicional é calculada em `getVitaminaSelection`.
- Salgadinho Gulão Assado: os dados estão em `PRECO_PROVISORIO_SALGADO`; a imagem local `assets/gulao-reference-pending.svg` é provisória até a foto de referência oficial ser adicionada ao projeto.

## Dados pendentes

- O estabelecimento não disponibilizou telefone ou WhatsApp.
- Endereço com número de rua.
- Coordenadas ou pin exato no Google Maps.
- Preços e descrições oficiais dos produtos.
- Confirmação dos horários informados.
- Integração real do formulário de contato.
