const menuGrid = document.getElementById("menu-grid");

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderVitaminaCard(item) {
  const sizeOptions = PRECOS_CONFIRMADOS.vitaminaAcai.map((option, index) => `
    <label class="option-pill">
      <input type="radio" name="vitamina-size-${item.id}" value="${option.ml}" data-price="${option.price}" ${index === 0 ? "checked" : ""}>
      <span>${option.ml} ml</span>
    </label>
  `).join("");
  const additionalOptions = ADICIONAIS_VITAMINA_ACAI.map((name) => `
    <label class="check-option">
      <input type="checkbox" name="vitamina-additional" value="${name}">
      <span>${name}</span>
    </label>
  `).join("");

  return `
    <article class="menu-card menu-card--configurable" data-product-id="${item.id}">
      <div class="menu-card__image">
        <img src="${item.image}" alt="${item.alt}" width="700" height="500" loading="lazy">
        <span class="menu-card__tag">${item.categoryLabel}</span>
      </div>
      <div class="menu-card__body">
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <fieldset class="product-options">
          <legend>Tamanho</legend>
          <div class="option-row">${sizeOptions}</div>
        </fieldset>
        <fieldset class="product-options">
          <legend>Adicionais <small>• 2 gratuitos por vitamina</small></legend>
          <div class="check-grid">${additionalOptions}</div>
        </fieldset>
        <div class="addition-summary" data-addition-summary="${item.id}">
          <div><span>Adicionais selecionados</span><strong>0</strong></div>
          <div><span><b class="badge-free">GRÁTIS</b> Adicionais gratuitos</span><strong>0</strong></div>
          <div><span><b class="badge-paid">+ R$ 1,00</b> Adicionais pagos</span><strong>0</strong></div>
          <div><span>Valor dos adicionais</span><strong>R$ 0,00</strong></div>
        </div>
        <div class="product-summary" data-summary="${item.id}">
          <span>Vitamina de Açaí — 700 ml</span>
          <strong>TOTAL: R$ 12,00</strong>
        </div>
        <button class="button add-to-cart" type="button" data-add-id="${item.id}">Adicionar ao carrinho</button>
      </div>
    </article>
  `;
}

function renderMilkshakeCard(item) {
  const sizeOptions = PRECOS_PROVISORIOS_MILKSHAKE.map((option, index) => `
    <label class="option-pill">
      <input type="radio" name="milkshake-size" value="${option.ml}" data-price="${option.price}" ${index === 0 ? "checked" : ""}>
      <span>${option.ml} ml</span>
    </label>
  `).join("");
  const flavorOptions = SABORES_MILKSHAKE_SUGESTAO.map((name, index) => `
    <label class="option-pill">
      <input type="radio" name="milkshake-flavor" value="${name}" ${index === 0 ? "checked" : ""}>
      <span>${name}</span>
    </label>
  `).join("");

  return `
    <article class="menu-card menu-card--configurable" data-product-id="${item.id}">
      <div class="menu-card__image">
        <img src="${item.image}" alt="${item.alt}" width="700" height="500" loading="lazy">
        <span class="menu-card__tag">${item.categoryLabel}</span>
      </div>
      <div class="menu-card__body">
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <fieldset class="product-options">
          <legend>Tamanho</legend>
          <div class="option-row">${sizeOptions}</div>
        </fieldset>
        <fieldset class="product-options">
          <legend>Sabor sugerido <small>(confirmar disponibilidade)</small></legend>
          <div class="option-row">${flavorOptions}</div>
        </fieldset>
        <div class="product-summary" data-summary="${item.id}">500 ml — R$ 18,00</div>
        <button class="button add-to-cart" type="button" data-add-id="${item.id}">Adicionar ao carrinho</button>
      </div>
    </article>
  `;
}

function renderMenu(category = "todos") {
  const visibleItems = category === "todos"
    ? CARDAPIO
    : CARDAPIO.filter((item) => item.category === category);

  menuGrid.classList.toggle("menu-grid--single", visibleItems.length === 1);

  menuGrid.innerHTML = visibleItems.map((item) => {
    if (item.id === "vitamina-acai") {
      return renderVitaminaCard(item);
    }
    if (item.id === "milkshake") {
      return renderMilkshakeCard(item);
    }
    if (item.priceType === "weight") {
      return `
        <article class="menu-card" data-product-id="${item.id}">
          <div class="menu-card__image">
            <img src="${item.image}" alt="${item.alt}" width="700" height="500" loading="lazy">
            <span class="menu-card__tag">${item.categoryLabel}</span>
          </div>
          <div class="menu-card__body">
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <div class="weight-warning">${item.priceLabel}</div>
            <button class="button weight-consult" type="button" data-weight-id="${item.id}">Consultar preço na loja</button>
          </div>
        </article>
      `;
    }
    return `
      <article class="menu-card menu-card--simple ${item.id === "salgado-gulao" ? "menu-card--gulao" : ""}" data-product-id="${item.id}">
        <div class="menu-card__image">
          <img src="${item.image}" alt="${item.alt}" width="700" height="500" loading="lazy">
          <span class="menu-card__tag">${item.categoryLabel}</span>
        </div>
        <div class="menu-card__body">
          <h3>${item.nome}</h3>
          <p>${item.descricao}</p>
          <div class="simple-price">${formatCurrency(item.price)} <small>${item.priceLabel}</small></div>
          <button class="button add-to-cart" type="button" data-simple-id="${item.id}">Adicionar ao carrinho</button>
        </div>
      </article>
    `;
  }).join("");
}

renderMenu();

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    renderMenu(button.dataset.category);
  });
});

const cart = [];

function openCart() {
  document.getElementById("cart-backdrop").hidden = false;
  document.getElementById("cart-drawer").classList.add("is-open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
  document.querySelector(".cart-toggle").setAttribute("aria-expanded", "true");
}

function closeCart() {
  document.getElementById("cart-backdrop").hidden = true;
  document.getElementById("cart-drawer").classList.remove("is-open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
  document.querySelector(".cart-toggle").setAttribute("aria-expanded", "false");
}

document.querySelector(".cart-toggle").addEventListener("click", openCart);
document.querySelector(".cart-close").addEventListener("click", closeCart);
document.getElementById("cart-backdrop").addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

function getVitaminaSelection(card) {
  const sizeInput = card.querySelector('input[name="vitamina-size-vitamina-acai"]:checked');
  const additions = [...card.querySelectorAll('input[name="vitamina-additional"]:checked')].map((input) => input.value);
  const ml = Number(sizeInput.value);
  const basePrice = Number(sizeInput.dataset.price);
  const freeCount = Math.min(additions.length, 2);
  const paidCount = Math.max(0, additions.length - 2);
  const additionsPrice = paidCount;
  return {
    ml,
    additions,
    freeCount,
    paidCount,
    additionsPrice,
    basePrice,
    price: basePrice + additionsPrice
  };
}

function updateVitaminaSummary(card) {
  const selection = getVitaminaSelection(card);
  const summary = card.querySelector('[data-summary="vitamina-acai"]');
  summary.innerHTML = `
    <span>Vitamina de Açaí — ${selection.ml} ml: ${formatCurrency(selection.basePrice)}</span>
    <strong>TOTAL: ${formatCurrency(selection.price)}</strong>
  `;

  const additionSummary = card.querySelector('[data-addition-summary="vitamina-acai"]');
  additionSummary.innerHTML = `
    <div><span>Adicionais selecionados</span><strong>${selection.additions.length}</strong></div>
    <div><span><b class="badge-free">GRÁTIS</b> Adicionais gratuitos</span><strong>${selection.freeCount}</strong></div>
    <div><span><b class="badge-paid">+ R$ 1,00</b> Adicionais pagos</span><strong>${selection.paidCount}</strong></div>
    <div><span>Valor dos adicionais</span><strong>${formatCurrency(selection.additionsPrice)}</strong></div>
  `;
}

function getMilkshakeSelection(card) {
  const sizeInput = card.querySelector('input[name="milkshake-size"]:checked');
  const flavorInput = card.querySelector('input[name="milkshake-flavor"]:checked');
  return { ml: Number(sizeInput.value), price: Number(sizeInput.dataset.price), flavor: flavorInput.value };
}

function updateMilkshakeSummary(card) {
  const selection = getMilkshakeSelection(card);
  card.querySelector('[data-summary="milkshake"]').textContent =
    `${selection.ml} ml — ${formatCurrency(selection.price)} — ${selection.flavor}`;
}

menuGrid.addEventListener("change", (event) => {
  const card = event.target.closest(".menu-card");
  if (!card) return;
  if (card.dataset.productId === "vitamina-acai") updateVitaminaSummary(card);
  if (card.dataset.productId === "milkshake") updateMilkshakeSummary(card);
});

menuGrid.addEventListener("click", (event) => {
  const simpleButton = event.target.closest("[data-simple-id]");
  if (simpleButton) {
    const product = CARDAPIO.find((item) => item.id === simpleButton.dataset.simpleId);
    const existing = cart.find((item) => item.key === `simple-${product.id}`);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        key: `simple-${product.id}`,
        name: product.nome,
        details: product.categoryLabel,
        price: product.price,
        priceType: "fixed",
        quantity: 1
      });
    }
    renderCart();
    openCart();
  }

  const addButton = event.target.closest("[data-add-id]");
  if (addButton) {
    const card = addButton.closest(".menu-card");
    const productId = addButton.dataset.addId;
    let item;

    if (productId === "vitamina-acai") {
      const selection = getVitaminaSelection(card);
      item = {
        key: `vitamina-${selection.ml}-${selection.additions.join("|")}`,
        name: "Vitamina de Açaí",
        details: `${selection.ml} ml${selection.additions.length ? " — Adicionais: " + selection.additions.join(", ") : " — Sem adicionais"}`,
        size: `${selection.ml} ml`,
        additions: selection.additions,
        freeCount: selection.freeCount,
        paidCount: selection.paidCount,
        additionsPrice: selection.additionsPrice,
        basePrice: selection.basePrice,
        price: selection.price,
        priceType: "fixed",
        quantity: 1
      };
    } else if (productId === "milkshake") {
      const selection = getMilkshakeSelection(card);
      item = {
        key: `milkshake-${selection.ml}-${selection.flavor}`,
        name: "Milk-Shake",
        details: `${selection.ml} ml — Sabor sugerido: ${selection.flavor}`,
        price: selection.price,
        priceType: "fixed",
        quantity: 1
      };
    }

    if (item) {
      const existing = cart.find((entry) => entry.key === item.key);
      if (existing) existing.quantity += 1;
      else cart.push(item);
      renderCart();
      openCart();
    }
  }

  const weightButton = event.target.closest("[data-weight-id]");
  if (weightButton) {
    const product = CARDAPIO.find((item) => item.id === weightButton.dataset.weightId);
    cart.push({
      key: `${product.id}-${Date.now()}`,
      name: product.nome,
      details: "Preço calculado conforme o peso na balança",
      price: null,
      priceType: "weight",
      quantity: 1
    });
    renderCart();
    openCart();
  }
});

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const weightNote = document.getElementById("cart-weight-note");
  const totalElement = document.getElementById("cart-total");
  const countElement = document.getElementById("cart-count");

  if (!cart.length) {
    cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
  } else {
    cartItems.innerHTML = cart.map((item) => {
      const vitaminDetails = item.name === "Vitamina de Açaí" ? `
        <div class="cart-vitamin-details">
          <p><strong>Tamanho:</strong> ${item.size}</p>
          <p><strong>Adicionais:</strong> ${item.additions.length ? item.additions.join(", ") : "Nenhum"}</p>
          <p><span class="badge-free">GRÁTIS</span> ${item.freeCount} adicionais gratuitos</p>
          <p><span class="badge-paid">+ R$ 1,00</span> ${item.paidCount} adicionais pagos — ${formatCurrency(item.additionsPrice)}</p>
          <p><strong>Preço base:</strong> ${formatCurrency(item.basePrice)} · <strong>Preço final:</strong> ${formatCurrency(item.price)}</p>
        </div>
      ` : "";

      return `
      <article class="cart-item">
        <div class="cart-item__main">
          <h3>${item.name}</h3>
          <p>${item.details}</p>
          ${vitaminDetails}
          ${item.priceType === "weight"
            ? '<strong class="cart-item__price">Consultar na loja</strong>'
            : `<strong class="cart-item__price">${formatCurrency(item.price * item.quantity)}</strong>`}
        </div>
        ${item.priceType === "weight"
          ? '<button class="cart-remove" type="button" data-remove-key="' + item.key + '" aria-label="Remover ' + item.name + '">Remover</button>'
          : `<div class="cart-quantity">
              <button type="button" data-quantity="-1" data-item-key="${item.key}" aria-label="Diminuir quantidade">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-quantity="1" data-item-key="${item.key}" aria-label="Aumentar quantidade">+</button>
              <button class="cart-remove" type="button" data-remove-key="${item.key}" aria-label="Remover ${item.name}">Remover</button>
            </div>`}
      </article>
    `}).join("");
  }

  const subtotal = cart
    .filter((item) => item.priceType === "fixed")
    .reduce((total, item) => total + item.price * item.quantity, 0);
  const hasWeight = cart.some((item) => item.priceType === "weight");

  totalElement.textContent = formatCurrency(subtotal);
  weightNote.hidden = !hasWeight;
  countElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart-checkout").disabled = cart.length === 0;
}

document.getElementById("cart-items").addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  if (quantityButton) {
    const item = cart.find((entry) => entry.key === quantityButton.dataset.itemKey);
    if (!item) return;
    item.quantity += Number(quantityButton.dataset.quantity);
    if (item.quantity < 1) item.quantity = 1;
    renderCart();
  }

  const removeButton = event.target.closest("[data-remove-key]");
  if (removeButton) {
    const index = cart.findIndex((entry) => entry.key === removeButton.dataset.removeKey);
    if (index >= 0) cart.splice(index, 1);
    renderCart();
  }
});

document.querySelector(".cart-checkout").addEventListener("click", () => {
  closeCart();
  document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
});

const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 600);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const instagramLink = document.getElementById("instagram-link");
const instagramButton = document.getElementById("instagram-button");
const mapLink = document.getElementById("map-link");

instagramLink.href = SITE_CONFIG.contact.instagramUrl;
instagramLink.target = "_blank";
instagramLink.rel = "noopener noreferrer";
instagramLink.querySelector("strong").textContent = SITE_CONFIG.contact.instagramUser;

instagramButton.href = SITE_CONFIG.contact.instagramUrl;
instagramButton.target = "_blank";
instagramButton.rel = "noopener noreferrer";

mapLink.href = SITE_CONFIG.googleMapsUrl;

document.getElementById("year").textContent = new Date().getFullYear();
renderCart();

const today = new Date().getDay();
const todayHours = document.querySelector(`.hours__list [data-day="${today}"]`);
if (todayHours) {
  todayHours.classList.add("is-today");
  todayHours.setAttribute("aria-current", "date");
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function isStoreOpen(now, schedule) {
  const daySchedule = schedule[now.getDay()];
  if (!daySchedule) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openingMinutes = timeToMinutes(daySchedule.open);
  const closingMinutes = timeToMinutes(daySchedule.close);

  return currentMinutes >= openingMinutes && currentMinutes < closingMinutes;
}

function updateOpeningStatus() {
  const statusElement = document.getElementById("opening-status");
  if (!statusElement) return;

  const now = new Date();
  const isOpen = isStoreOpen(now, SITE_CONFIG.hours.schedule);

  statusElement.textContent = isOpen ? "● ABERTO AGORA" : "● FECHADO AGORA";
  statusElement.classList.toggle("is-open", isOpen);
  statusElement.classList.toggle("is-closed", !isOpen);
}

updateOpeningStatus();
window.setInterval(updateOpeningStatus, 30000);
