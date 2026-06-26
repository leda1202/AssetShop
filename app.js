// ─── Data ────────────────────────────────────────────────────────────────────
// Replace payhipUrl values with your actual PayHip product links

const products = [
  { id:1,  name:'Starter Pack',    desc:'Essential assets to kick off any project',  price:2.99,  cover_image:'/images/products/product1.png', badge:'Hot',  payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:2,  name:'Sound Kit Vol.1', desc:'120 royalty-free audio loops & effects',    price:19.99, old:29.99, cover_image:'/images/products/product2.png', badge:'Sale', payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:3,  name:'Icon Bundle',     desc:'500+ polished icons in 3 formats',          price:14.99, cover_image:'/images/products/product3.png', payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:4,  name:'UI Template Pro', desc:'Figma & HTML template set',                price:34.99, cover_image:'/images/products/product4.png', badge:'New', payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:5,  name:'Font Collection', desc:'12 premium typefaces, all weights',         price:24.99, cover_image:'/images/products/product5.png', payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:6,  name:'Motion Pack',     desc:'Lottie animations for any platform',        price:17.99, cover_image:'/images/products/product6.png', payhipUrl:'https://payhip.com/b/J7Fiq' },
];

const bundles = [
  { id:7,  name:'3D Asset Pack',  desc:'50 game-ready 3D models',             price:44.99, cover_image:'/images/bundles/bundle1.png', badge:'New',  payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:8,  name:'Code Snippets',  desc:'100+ production-ready JS snippets',   price:12.99, cover_image:'/images/bundles/bundle2.png', payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:9,  name:'Preset Bundle',  desc:'Lightroom & Capture One presets',     price:22.99, old:32.99, cover_image:'/images/bundles/bundle3.png', badge:'Sale', payhipUrl:'https://payhip.com/b/J7Fiq' },
  { id:10, name:'Social Kit',     desc:'300 social media templates',          price:16.99, cover_image:'/images/bundles/bundle4.png', badge:'New',  payhipUrl:'https://payhip.com/b/J7Fiq' },
];

const subs = [
  {
    id:'basic', name:'Basic', tier:'Starter', price:4.99, period:'/mo', emoji:'🌑', cls:'basic',
    features:['5 downloads / month','Standard asset library','Email support','Community access'],
    payhipUrl:'https://payhip.com/b/J7Fiq'
  },
  {
    id:'pro', name:'Pro', tier:'Most Popular', price:12.99, period:'/mo', emoji:'⭐', cls:'pro', popular:true,
    features:['Unlimited downloads','Premium asset library','Priority support','Early access drops','Commercial licence'],
    payhipUrl:'https://payhip.com/b/J7Fiq'
  },
  {
    id:'elite', name:'Elite', tier:'Team', price:34.99, period:'/mo', emoji:'🌌', cls:'elite',
    features:['Everything in Pro','1-on-1 sessions','Custom requests','API access','Team seats (3)'],
    payhipUrl:'https://payhip.com/b/J7Fiq'
  },
];

// ─── Cart ────────────────────────────────────────────────────────────────────
let cart = [];

function addToCart(id, name, price, payhipUrl, btn) {
  cart.push({ id, name, price, payhipUrl });
  updateCartUI();
  btn.classList.add('added');
  btn.textContent = '✓';
  setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 1600);
  showToast(`"${name}" added to cart`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  document.getElementById('cartCount').textContent = cart.length;
}

function renderCartItems() {
  const list = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    list.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  list.innerHTML = cart.map((item, i) => `
    <li class="cart-item">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">€${item.price.toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
    </li>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  document.getElementById('cartTotal').textContent = '€' + total.toFixed(2);
}

function openCart() {
  renderCartItems();
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function checkoutAll() {
  if (cart.length === 0) return;
  // Open the first item's PayHip page; replace with your store/checkout URL
  window.open(cart[0].payhipUrl, '_blank');
  showToast('Redirecting to PayHip checkout…');
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── Render product card ──────────────────────────────────────────────────────
function renderProduct(p, container) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <div class="product-thumb">
      ${p.badge ? `<div class="product-badge${p.badge === 'Sale' ? ' sale' : ''}">${p.badge}</div>` : ''}
      <img src="${p.cover_image}" alt="${p.name}">
    </div>
    <div class="product-body">
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-foot">
        <div class="product-price">
          ${p.old ? `<span class="old">€${p.old.toFixed(2)}</span>` : ''}
          €${p.price.toFixed(2)}
        </div>
        <button class="add-btn" title="Add to cart"></button>
      </div>
    </div>`;

  div.querySelector('.add-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(p.id, p.name, p.price, p.payhipUrl, e.currentTarget);
  });

  div.addEventListener('click', () => window.open(p.payhipUrl, '_blank'));
  container.appendChild(div);
}

// ─── Render subscription card ─────────────────────────────────────────────────
function renderSub(s, container) {
  const div = document.createElement('div');
  div.className = 'sub-card' + (s.popular ? ' popular' : '');
  div.innerHTML = `
    ${s.popular ? `<div class="sub-popular-badge">${s.tier}</div>` : ''}
    <div class="sub-tier">${s.popular ? 'Pro' : s.tier}</div>
    <div class="sub-name">${s.name}</div>
    <div class="sub-price">€${s.price.toFixed(2)}<span> ${s.period}</span></div>
    <hr class="sub-divider">
    <ul class="sub-features">
      ${s.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <button class="sub-btn" onclick="window.open('${s.payhipUrl}','_blank')">Get ${s.name}</button>`;
  container.appendChild(div);
}

// ─── Active nav link on scroll ────────────────────────────────────────────────
function initNavHighlight() {
  const sections = [
    { id: 'shop',    el: document.getElementById('shop') },
    { id: 'bundles', el: document.getElementById('bundles') },
    { id: 'passes',  el: document.getElementById('passes') },
  ];
  const links = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => s.el && observer.observe(s.el));
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  products.forEach(p => renderProduct(p, document.getElementById('productGrid')));
  bundles.forEach(p  => renderProduct(p, document.getElementById('newGrid')));
  subs.forEach(s    => renderSub(s,    document.getElementById('subsGrid')));
  initNavHighlight();
});