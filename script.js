// script.js

// Array para armazenar os itens do carrinho
let cart = [];

// Selecionar elementos do DOM
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartEmptyMsg = document.getElementById('cart-empty');
const cartClearBtn = document.getElementById('cart-clear');
const productCards = document.querySelectorAll('.product-card');

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
  cartItemsList.innerHTML = ''; // Limpar lista atual

  if (cart.length === 0) {
    cartEmptyMsg.style.display = 'block';
    cartTotalSpan.textContent = 'R$ 0,00';
    return;
  }

  cartEmptyMsg.style.display = 'none';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <span>${item.nome} - Quantidade: ${item.quantidade} - Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
      <button class="btn-remover" data-index="${index}" type="button">Remover</button>
    `;
    cartItemsList.appendChild(li); });

  // Calcular e atualizar total
  calculateTotal();
}

// Função para calcular o total do carrinho
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
}

// Função para adicionar item ao carrinho
function addToCart(nome, preco, quantidade) {
  // Verificar se o item já existe no carrinho
  const existingItem = cart.find(item => item.nome === nome);
  if (existingItem) {
    existingItem.quantidade += quantidade;
  } else {
    cart.push({ nome, preco: parseFloat(preco), quantidade });
  }
  updateCartDisplay();
}

// Função para remover item do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// Função para limpar o carrinho
function clearCart() {
  cart = []; updateCartDisplay();
}

// Função para finalizar compra (simples alerta, pode ser expandido)
function finalizarCompra() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Compra finalizada! Obrigado por escolher Enguloso.');
  clearCart();
}

// Event listeners para controles de quantidade nos produtos
productCards.forEach(card => {
  const decrementBtn = card.querySelector('.decrementar');
  const incrementBtn = card.querySelector('.incrementar');
  const quantitySpan = card.querySelector('.numero-produto');

  decrementBtn.addEventListener('click', () => {
    let qty = parseInt(quantitySpan.textContent);
    if (qty > 1) {
      qty--;
      quantitySpan.textContent = qty;
    }
  });

  incrementBtn.addEventListener('click', () => {
    let qty = parseInt(quantitySpan.textContent);
    qty++;
    quantitySpan.textContent = qty;
  });
});

// Event listeners para botões "Adicionar ao carrinho"
productCards.forEach(card => {
  const addBtn = card.querySelector('.btn-comprar');
  addBtn.addEventListener('click', () => {
    const nome = card.dataset.nome;
    const preco = card.dataset.preco;
    const quantidade = parseInt(card.querySelector('.numero-produto').textContent);
    addToCart(nome, preco, quantidade);
    // Resetar quantidade para 1 após adicionar
    card.querySelector('.numero-produto').textContent = '1';
  });
});

// Event listener para botão limpar carrinho
cartClearBtn.addEventListener('click', clearCart);

// Event listener para botões remover (delegação de eventos)
cartItemsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-remover')) {
    const index = parseInt(e.target.dataset.index);
    removeFromCart(index);
  }
});

// Inicializar exibição do carrinho
updateCartDisplay();
