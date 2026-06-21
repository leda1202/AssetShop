// ─── Product & Subscription Data ───────────────────────────────────────────
// Replace `payhipUrl` with your actual PayHip product links
const products = [
  { id: 1, name: 'Starter Pack',    desc: 'Essential assets to kick off any project',   price: 9.99,  emoji: '📦', badge: 'Hot',  payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 2, name: 'Sound Kit Vol.1', desc: '120 royalty-free audio loops & effects',      price: 19.99, old: 29.99, emoji: '🎧', badge: 'Sale', payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 3, name: 'Icon Bundle',     desc: '500+ polished icons, 3 formats',              price: 14.99, emoji: '⚡', payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 4, name: 'UI Template Pro', desc: 'Figma & HTML template set',                  price: 34.99, emoji: '🎨', badge: 'New', payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 5, name: 'Font Collection', desc: '12 premium typefaces, all weights',           price: 24.99, emoji: '🔤', payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 6, name: 'Motion Pack',     desc: 'Lottie animations for any platform',         price: 17.99, emoji: '✨', payhipUrl: 'https://payhip.com/b/YOUR_ID' },
];

const newItems = [
  { id: 7,  name: '3D Asset Pack',   desc: '50 game-ready 3D models',              price: 44.99, emoji: '🌀', badge: 'New',  payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 8,  name: 'Code Snippets',   desc: '100+ production-ready JS snippets',    price: 12.99, emoji: '💻', payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 9,  name: 'Preset Bundle',   desc: 'Lightroom & Capture One presets',      price: 22.99, old: 32.99, emoji: '📷', badge: 'Sale', payhipUrl: 'https://payhip.com/b/YOUR_ID' },
  { id: 10, name: 'Social Kit',      desc: '300 social media templates',           price: 16.99, emoji: '🚀', badge: 'New',  payhipUrl: 'https://payhip.com/b/YOUR_ID' },
];

const subs = [
  {
    id: 'basic', name: 'Basic Pass', price: 4.99, period: '/ month', icon: '🌑', cls: 'basic',
    features: ['5 downloads / month', 'Standard assets', 'Email support', 'Community access'],
    payhipUrl: 'https://payhip.com/b/YOUR_BASIC_ID'
  },
  {
    id: 'pro', name: 'Pro Pass', price: 12.99, period: '/ month', icon: '⭐', cls: 'pro', popular: true,
    features: ['Unlimited downloads', 'Premium assets', 'Priority support', 'Early access drops', 'Commercial licence'],
    payhipUrl: 'https://payhip.com/b/YOUR_PRO_ID'
  },
  {
    id: 'elite', name: 'Elite Pass', price: 34.99, period: '/ month', icon: '🌌', cls: 'elite',
    features: ['Everything in Pro', '1-on-1 sessions', 'Custom requests', 'API access', 'Team seats (3)'],
    payhipUrl: 'https://payhip.com/b/YOUR_ELITE_ID'
  },
];

// ─── Cart State ─────────────────────────────────────────────────────────────
let cart = [];

// ─── Toast Notification ──────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// ─── Cart ────────────────────────────────────────────────────────────────────
function addToCart(id, name, payhipUrl, btn) {
  cart.push({ id, name, payhipUrl });
  document.getElementById('cartCount').textContent = cart.length;
  btn.classList.add('added');
  btn.textContent = '✓';
  setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 1800);
  showToast('Added "' + name + '" to cart');
}

function openCart() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  // With PayHip you typically link directly to product pages.
  // For a proper cart, integrate PayHip's embed widget or redirect to your store page.
  showToast(cart.length + ' item(s) — opening PayHip checkout...');
  // Redirect to first item as example:
  // window.open(cart[0].payhipUrl, '_blank');
}

// ─── Render Product Card ─────────────────────────────────────────────────────
function renderProduct(p, container) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    ${p.badge ? `<div class="product-badge${p.badge === 'Sale' ? ' sale' : ''}">${p.badge}</div>` : ''}
    <div class="product-img">${p.emoji}</div>
    <div class="product-info">
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-footer">
        <div class="product-price">
          ${p.old ? `<span class="old">€${p.old.toFixed(2)}</span>` : ''}
          €${p.price.toFixed(2)}
        </div>
        <button class="add-btn" onclick="addToCart(${p.id}, '${p.name}', '${p.payhipUrl}', this)">+</button>
      </div>
    </div>`;
  // Clicking the card body (not the button) goes to PayHip product page
  div.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-btn')) {
      window.open(p.payhipUrl, '_blank');
    }
  });
  container.appendChild(div);
}

// ─── Render Subscription Card ────────────────────────────────────────────────
function renderSub(s, container) {
  const div = document.createElement('div');
  div.className = 'sub-card' + (s.popular ? ' popular' : '');
  div.innerHTML = `
    ${s.popular ? '<div class="sub-popular-badge">Most Popular</div>' : ''}
    <div class="sub-icon ${s.cls}">${s.icon}</div>
    <div class="sub-name">${s.name}</div>
    <div class="sub-price">€${s.price.toFixed(2)}<span> ${s.period}</span></div>
    <ul class="sub-features">
      ${s.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <button class="sub-btn" onclick="window.open('${s.payhipUrl}', '_blank')">Get ${s.name}</button>`;
  container.appendChild(div);
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const pg = document.getElementById('productGrid');
  const ng = document.getElementById('newGrid');
  const sg = document.getElementById('subsGrid');
  products.forEach(p => renderProduct(p, pg));
  newItems.forEach(p => renderProduct(p, ng));
  subs.forEach(s => renderSub(s, sg));
});