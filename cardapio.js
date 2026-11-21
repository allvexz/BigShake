const PRECOS_CONFIRMADOS = {
  vitaminaAcai: [
    { ml: 700, price: 12 },
    { ml: 500, price: 10 },
    { ml: 400, price: 8 },
    { ml: 200, price: 6 }
  ]
};

// PRECO_PROVISORIO_DEMO: substituir pelos valores oficiais do estabelecimento.
const PRECOS_PROVISORIOS_MILKSHAKE = [
  { ml: 500, price: 18 },
  { ml: 400, price: 15 },
  { ml: 300, price: 12 }
];

const ADICIONAIS_VITAMINA_ACAI = [
  "Leite em pó",
  "Paçoca",
  "Confete",
  "Chocolate ralado",
  "Ovomaltine",
  "Leite condensado",
  "Banana",
  "Morango",
  "Kiwi",
  "Coco ralado"
];

const SABORES_MILKSHAKE_SUGESTAO = [
  "Chocolate",
  "Morango",
  "Baunilha",
  "Ovomaltine"
];

// PRECO_PROVISORIO_DEMO
const PRECOS_PROVISORIOS_PICOLES = [
  { nome: "Picolé de fruta", price: 2.5, image: "./picole-fruta.png" },
  { nome: "Picolé de leite", price: 3.5, image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=700&q=85" },
  { nome: "Picolé de chocolate", price: 4, image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=700&q=85" },
  { nome: "Picolé recheado", price: 5, image: "./picole-recheado.png" },
  { nome: "Picolé premium", price: 12, image: "./picole-premium.png" }
];

const PRECO_INFORMADO_POTE = { nome: "Pote de Sorvete", price: 20 };

const PRECO_PROVISORIO_SALGADO = {
  nome: "Salgadinho Gulão Assado",
  sabor: "Churrasco",
  peso: "120 g",
  price: 8
};

// PRECO_PROVISORIO_DEMO
const PRECOS_PROVISORIOS_BALAS_DOCES = [
  { nome: "Bala", price: 0.5 },
  { nome: "Halls", price: 3 },
  { nome: "Trident", price: 3.5 },
  { nome: "Pirulito", price: 1 }
];

const CATEGORIAS_CARDAPIO = [
  { id: "todos", nome: "Todos" },
  { id: "vitamina-acai", nome: "Vitamina de Açaí" },
  { id: "peso", nome: "Sorvetes e Açaí no Peso" },
  { id: "milk-shakes", nome: "Milk-Shakes" },
  { id: "picoles", nome: "Picolés" },
  { id: "potes", nome: "Potes de Sorvete" },
  { id: "salgados", nome: "Salgados" },
  { id: "balas-doces", nome: "Balas e Doces" }
];

const CARDAPIO = [
  {
    id: "vitamina-acai",
    nome: "Vitamina de Açaí",
    category: "vitamina-acai",
    categoryLabel: "Vitamina de Açaí",
    descricao: "Escolha o tamanho e até dez adicionais.",
    priceType: "confirmed",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85",
    alt: "Imagem ilustrativa de vitamina de açaí"
  },
  {
    id: "sorvete-peso",
    nome: "Sorvete por Peso",
    category: "peso",
    categoryLabel: "Sorvetes e Açaí no Peso",
    descricao: "Escolha suas opções e monte sua combinação. O valor é calculado conforme o peso registrado na balança.",
    priceType: "weight",
    priceLabel: "Preço conforme peso na balança",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=85",
    alt: "Imagem ilustrativa de sorvete por peso"
  },
  {
    id: "acai-peso",
    nome: "Açaí por Peso",
    category: "peso",
    categoryLabel: "Sorvetes e Açaí no Peso",
    descricao: "Escolha suas opções e monte sua combinação. O valor é calculado conforme o peso registrado na balança.",
    priceType: "weight",
    priceLabel: "Preço conforme peso na balança",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85",
    alt: "Imagem ilustrativa de açaí por peso"
  },
  {
    id: "milkshake",
    nome: "Milk-Shake",
    category: "milk-shakes",
    categoryLabel: "Milk-Shakes",
    descricao: "Opções ilustrativas de sabor e tamanho. Preços e sabores provisórios.",
    priceType: "provisional",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=700&q=85",
    alt: "Imagem ilustrativa de milk-shake"
  },
  ...PRECOS_PROVISORIOS_PICOLES.map((product, index) => ({
    id: `picole-${index + 1}`,
    nome: product.nome,
    category: "picoles",
    categoryLabel: "Picolés",
    descricao: "Imagem ilustrativa de picolé.",
    priceType: "provisional",
    price: product.price,
    priceLabel: "Preço provisório",
    image: product.image,
    alt: `Imagem ilustrativa de ${product.nome.toLowerCase()}`
  })),
  {
    id: "pote-sorvete",
    nome: PRECO_INFORMADO_POTE.nome,
    category: "potes",
    categoryLabel: "Potes de Sorvete",
    descricao: "Pote de sorvete.",
    priceType: "informed",
    price: PRECO_INFORMADO_POTE.price,
    priceLabel: "Preço informado",
    image: "./pote-sorvete.png",
    alt: "Imagem ilustrativa de pote de sorvete"
  },
  {
    id: "salgado-gulao",
    nome: PRECO_PROVISORIO_SALGADO.nome,
    category: "salgados",
    categoryLabel: "Salgados",
    descricao: "Salgadinho assado sabor churrasco, embalagem de 120 g.",
    priceType: "provisional",
    price: PRECO_PROVISORIO_SALGADO.price,
    sabor: PRECO_PROVISORIO_SALGADO.sabor,
    peso: PRECO_PROVISORIO_SALGADO.peso,
    priceLabel: "Preço demonstrativo provisório",
    image: "./gulao-assado.png",
    alt: "Salgadinho Gulão Assado sabor churrasco, embalagem de 120 g"
  },
  ...PRECOS_PROVISORIOS_BALAS_DOCES.map((product, index) => ({
    id: `doce-${index + 1}`,
    nome: product.nome,
    category: "balas-doces",
    categoryLabel: "Balas e Doces",
    descricao: "Preço por unidade. Valor provisório.",
    priceType: "provisional",
    price: product.price,
    priceLabel: "Preço provisório por unidade",
    image: product.nome === "Halls"
      ? "./halls.png"
      : product.nome === "Trident"
        ? "./trident.png"
        : product.nome === "Pirulito"
          ? "./pirulito.png"
        : "./balas-doces.png",
    alt: `Imagem ilustrativa de ${product.nome.toLowerCase()}`
  }))
];
