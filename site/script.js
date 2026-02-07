// CART
let cart = JSON.parse(localStorage.getItem('coreva_cart') || '[]');

function saveCart() {
  localStorage.setItem('coreva_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }
  saveCart();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty < 1) {
    cart.splice(index, 1);
  }
  saveCart();
}

function updateCartUI() {
  var countEl = document.getElementById('cart-count');
  var bodyEl = document.getElementById('cart-body');
  var totalEl = document.getElementById('cart-total');

  if (!countEl) return;

  var totalItems = cart.reduce(function(s, i) { return s + i.qty; }, 0);
  countEl.textContent = totalItems;

  if (cart.length === 0) {
    bodyEl.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    totalEl.textContent = 'R0.00';
    return;
  }

  var html = '';
  var total = 0;
  cart.forEach(function(item, i) {
    total += item.price * item.qty;
    html += '<div class="cart-item">' +
      '<img src="' + item.image + '" alt="' + item.name + '">' +
      '<div class="cart-item-info">' +
        '<h4>' + item.name + '</h4>' +
        '<div class="cart-item-price">R' + (item.price * item.qty).toFixed(2) + '</div>' +
        '<div class="cart-item-qty">' +
          '<button class="qty-btn" onclick="changeQty(' + i + ', -1)">&minus;</button>' +
          '<span>' + item.qty + '</span>' +
          '<button class="qty-btn" onclick="changeQty(' + i + ', 1)">+</button>' +
        '</div>' +
      '</div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + i + ')">Remove</button>' +
    '</div>';
  });

  bodyEl.innerHTML = html;
  totalEl.textContent = 'R' + total.toFixed(2);
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
}

// MOBILE MENU
function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('open');
}

// CONTACT FORM
function handleContact(e) {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  e.target.reset();
}

// CAROUSEL
var currentSlide = 0;
function runCarousel() {
  var track = document.getElementById('carousel-track');
  if (!track) return;
  var slides = track.children.length;
  setInterval(function() {
    currentSlide = (currentSlide + 1) % slides;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
  }, 3000);
}

// INIT
document.addEventListener('DOMContentLoaded', function() {
  updateCartUI();
  runCarousel();
});
