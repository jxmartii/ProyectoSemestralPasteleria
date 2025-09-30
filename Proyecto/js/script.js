const PRODUCTOS = [
  { id: "TC001", nombre: "Torta de Chocolate", precio: 45000, imagen: "img/TORTA 1.webp", descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.", categoria:"tortas", stock: 12 },
  { id: "TC002", nombre: "Torta de Frutas", precio: 50000, imagen: "img/TORTA 2.webp", descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", categoria:"tortas", stock: 8 },
  { id: "TT001", nombre: "Torta de Vainilla", precio: 40000, imagen: "img/TORTA 3.webp", descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce.", categoria:"tortas", stock: 10 },
  { id: "TT002", nombre: "Torta de Manjar", precio: 42000, imagen: "img/TORTA 4.webp", descripcion: "Torta tradicional chilena con manjar y nueces.", categoria:"tortas", stock: 6 },
  { id: "TE001", nombre: "Torta Especial de Cumpleaños", precio: 55000, imagen: "img/T_E 1.webp", descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.", categoria:"especiales", stock: 4 },
  { id: "TE002", nombre: "Torta Especial de Bodas", precio: 60000, imagen: "img/T_E 2.webp", descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.", categoria:"especiales", stock: 3 },
  { id: "PV001", nombre: "Torta Vegana de Chocolate", precio: 50000, imagen: "img/P_V 1.webp", descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal.", categoria:"veganos", stock: 5 },
  { id: "PSA002", nombre: "Cheesecake Sin Azúcar", precio: 47000, imagen: "img/S_A 2.webp", descripcion: "Cheesecake denso sin azúcar, ideal para quienes buscan opciones más saludables.", categoria:"sin-azucar", stock: 7 },
  { id: "PG001", nombre: "Brownie Sin Gluten", precio: 4000, imagen: "img/S_G 1.webp", descripcion: "Rico y denso, perfecto para quienes evitan el gluten.", categoria:"sin-gluten", stock: 20 },
  { id: "PV002", nombre: "Galletas Veganas de Avena", precio: 4500, imagen: "img/P_V 2.webp", descripcion: "Pack 6 galletas crujientes y sabrosas, opción vegana.", categoria:"veganos", stock: 30 },
  { id: "PG002", nombre: "Pan Sin Gluten", precio: 3500, imagen: "img/S_G 2.webp", descripcion: "Suave y esponjoso, ideal para sándwiches.", categoria:"sin-gluten", stock: 15 },
  { id: "PI001", nombre: "Mousse de Chocolate", precio: 5000, imagen: "img/POSTRE 1.webp", descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad.", categoria:"postres", stock: 25 },
  { id: "PI002", nombre: "Tiramisú Clásico", precio: 5500, imagen: "img/POSTRE  2.webp", descripcion: "Clásico tiramisú con capas de café y crema.", categoria:"postres", stock: 18 },
  { id: "PT002", nombre: "Tarta de Santiago", precio: 6000, imagen: "img/P_T 2.webp", descripcion: "Tradicional tarta española hecha con almendras.", categoria:"postres", stock: 9 },
  { id: "PT001", nombre: "Empanada de Manzana", precio: 3000, imagen: "img/P_T 1.webp", descripcion: "Pastelería tradicional rellena de manzanas especiadas.", categoria:"postres", stock: 40 },
  { id: "PSA001", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, imagen: "img/S_A 1.webp", descripcion: "Torta ligera y deliciosa, endulzada naturalmente.", categoria:"sin-azucar", stock: 6 }
];

function renderCatalogo() {
  const contenedores = $all('.catalogo');
  if (!contenedores.length) return;
  contenedores.forEach(container => {
    container.innerHTML = '';
    PRODUCTOS.forEach(p => {
      const div = document.createElement('div');
      div.className = 'producto-item card';
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
        <p class="prod-nombre">${p.nombre}</p>
        <p class="prod-precio">${formatCLP(p.precio)}</p>
        <div class="prod-buttons">
          <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
          <button class="btn-ver-detalle" data-id="${p.id}">Ver Detalle</button>
        </div>
      `;
      container.appendChild(div);
    });
  });
}

function renderRecomendaciones() {
  const contenedor = document.querySelector('.recomendaciones');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  const productos = getProductoRandom(PRODUCTOS, 8);
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto-item card';
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <p>${p.nombre}</p>
      <p>${formatCLP(p.precio)}</p>
      <div class="prod-buttons">
        <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
        <button class="btn-ver-detalle" data-id="${p.id}">Ver Detalle</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

function renderRecomendacionesAleatorias(contenedorSelector, cantidad = 5) {
  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) return;

  const productoActualId = new URLSearchParams(location.search).get('id');
  const aleatorios = [...PRODUCTOS]
    .filter(p => p.id !== productoActualId)
    .sort(() => 0.5 - Math.random())
    .slice(0, cantidad);

  contenedor.innerHTML = '';
  aleatorios.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <p>${p.nombre}</p>
      <p>${formatCLP(p.precio)}</p>
      <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
      <button class="btn-ver-detalle" data-id="${p.id}">Ver Detalle</button>
    `;
    contenedor.appendChild(div);
  });
}

const CUPONES = {
  "FELICES50": { tipo: "percent", valor: 10 }
};

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
function guardarLS(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function leerLS(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function formatCLP(n) { return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }); }

let usuarios = leerLS('usuarios', []); 
let usuarioActivo = leerLS('usuarioActivo', null); 
let carrito = leerLS('carrito', []); 
let cuponAplicado = leerLS('cuponAplicado', null); 

function actualizarHeader() {
  const acciones = document.querySelector('.acciones');
  if (!acciones) return;
  const cantidad = carrito.reduce((s, it) => s + it.qty, 0);
  if (usuarioActivo) {
    acciones.innerHTML = `<span>Hola ${escapeHtml(usuarioActivo.nombre)}</span> | <a href="#" id="logout-link">Cerrar sesión</a> | <a href="carrito.html">Carrito (${cantidad})</a>`;
    const logout = $('#logout-link');
    if (logout) logout.addEventListener('click', (e) => { e.preventDefault(); logoutUser(); });
  } else {
    acciones.innerHTML = `<a href="login.html">Iniciar sesión</a> | <a href="registro.html">Registrar usuario</a> | <a href="carrito.html">Carrito (${cantidad})</a>`;
  }
}

function escapeHtml(text) { return String(text).replace(/[&"'<>]/g, function (m) { return ({'&':'&amp;','"':'&quot;','\'':'&#39;','<':'&lt;','>':'&gt;'})[m]; }); }

function actualizarContadorCarrito() {
  $all('.carrito').forEach(el => {
    const cantidad = carrito.reduce((s, it) => s + it.qty, 0);
    el.textContent = `Carrito (${cantidad})`;
  });
  actualizarHeader();
}

function guardarCarrito() { guardarLS('carrito', carrito); actualizarContadorCarrito(); }

function addToCartById(id, cantidad = 1) {
  const prod = PRODUCTOS.find(p => p.id === id);
  if (!prod) { console.warn('Producto no encontrado', id); return false; }
  const idx = carrito.findIndex(it => it.id === id);
  if (idx >= 0) {
    carrito[idx].qty += cantidad;
    if (carrito[idx].qty > prod.stock) carrito[idx].qty = prod.stock;
  } else {
    carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, imagen: prod.imagen, qty: cantidad });
  }
  guardarCarrito();
  return true;
}

document.addEventListener('click', (e) => {
  const btnAgregar = e.target.closest('.btn-agregar');
  if (btnAgregar) {
    const id = btnAgregar.dataset.id || findProductIdByName(btnAgregar.dataset.nombre);
    if (id) {
      addToCartById(id, 1);
      toast(`${getProductNameById(id)} agregado al carrito`);
    }
    return;
  }

  const btnDetalle = e.target.closest('.btn-ver-detalle');
  if (btnDetalle) {
    const id = btnDetalle.dataset.id || findProductIdByName(btnDetalle.dataset.nombre);
    if (id) {
      location.href = `detalle.html?id=${encodeURIComponent(id)}`;
    }
    return;
  }

  const removeBtn = e.target.closest('.remove-item');
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    carrito = carrito.filter(it => it.id !== id);
    guardarCarrito();
    renderCarritoPage();
    return;
  }

  const incBtn = e.target.closest('.qty-increase');
  if (incBtn) {
    const id = incBtn.dataset.id;
    changeQty(id, 1);
    renderCarritoPage();
    return;
  }
  const decBtn = e.target.closest('.qty-decrease');
  if (decBtn) {
    const id = decBtn.dataset.id;
    changeQty(id, -1);
    renderCarritoPage();
    return;
  }

  const applyCupBtn = e.target.closest('#apply-coupon');
  if (applyCupBtn) {
    const input = document.getElementById('coupon-code');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (!code) { setCouponMsg('Ingresa un código.'); return; }
    const c = CUPONES[code];
    if (!c) { setCouponMsg('Cupón no válido.'); return; }
    cuponAplicado = { codigo: code, descuento: c.valor };
    guardarLS('cuponAplicado', cuponAplicado);
    setCouponMsg(`Cupón ${code} aplicado (${c.valor}% off)`);
    renderCarritoPage();
    return;
  }

  const checkoutBtn = e.target.closest('#checkout-btn');
  if (checkoutBtn) {
    doCheckout();
    return;
  }
});

function findProductIdByName(name) {
  if (!name) return null;
  const prod = PRODUCTOS.find(p => p.nombre.toLowerCase().trim() === name.toLowerCase().trim());
  return prod ? prod.id : null;
}
function getProductNameById(id) { const p = PRODUCTOS.find(x => x.id === id); return p ? p.nombre : id; }

let toastTimer = null;
function toast(msg) {
  let el = document.getElementById('mini-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'mini-toast';
    Object.assign(el.style, { position: 'fixed', right: '20px', bottom: '90px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '8px 12px', borderRadius: '6px', zIndex: 99999, fontSize: '0.95rem' });
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.display = 'none'; }, 1200);
}

function setupRegistro() {
  const form = document.getElementById('form-registro');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreEl = form.querySelector('#nombre') || form.querySelector('input[name="nombre"]');
    const correoEl = form.querySelector('#correo') || form.querySelector('input[type="email"]') || form.querySelector('input[name*="correo"]');
    const passEl = form.querySelector('#contrasena') || form.querySelector('#password') || form.querySelector('input[type="password"]');
    const confirmarEl = form.querySelector('#confirmar-contrasena') || form.querySelector('input[name*="confirmar"]');
    const regionEl = form.querySelector('#region');
    const comunaEl = form.querySelector('#comuna');

    const nombre = (nombreEl && nombreEl.value || '').trim();
    const correo = (correoEl && correoEl.value || '').trim().toLowerCase();
    const contrasena = (passEl && passEl.value || '');
    const confirmar = (confirmarEl && confirmarEl.value || '');
    const region = regionEl ? regionEl.value : '';
    const comuna = comunaEl ? comunaEl.value : '';

    const errores = [];
    if (!nombre) errores.push('Nombre es requerido.');
    else if (nombre.length > 100) errores.push('Nombre máximo 100 caracteres.');
    if (!correo) errores.push('Correo es requerido.');
    else if (correo.length > 100) errores.push('Correo máximo 100 caracteres.');
    else if (!/^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)) errores.push('Correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.');
    if (!contrasena) errores.push('Contraseña requerida.');
    else if (contrasena.length < 4 || contrasena.length > 10) errores.push('Contraseña entre 4 y 10 caracteres.');
    if (contrasena !== confirmar) errores.push('Las contraseñas no coinciden.');
    if (!region) errores.push('Región es requerida.');
    if (!comuna) errores.push('Comuna es requerida.');
    if (usuarios.find(u => u.correo === correo)) errores.push('Ya existe un usuario con ese correo.');

    const errorDiv = form.querySelector('.error') || createInlineError(form);
    if (errores.length) { errorDiv.innerHTML = errores.map(r => `<div>${r}</div>`).join(''); return; }

    const nuevo = { nombre, correo, contrasena, region, comuna };
    usuarios.push(nuevo);
    guardarLS('usuarios', usuarios);
    toast('Registro exitoso. Ahora inicia sesión.');
    setTimeout(() => { window.location.href = 'login.html'; }, 700);
  });
}

function setupLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const correoEl = form.querySelector('#correo') || form.querySelector('input[type="email"]') || form.querySelector('input[name*="correo"]');
    const passEl = form.querySelector('#password') || form.querySelector('input[type="password"]') || form.querySelector('#contrasena');
    const correo = (correoEl && correoEl.value || '').trim().toLowerCase();
    const contrasena = (passEl && passEl.value || '');

    const errores = [];
    if (!correo) errores.push('Correo requerido.');
    else if (correo.length > 100) errores.push('Correo máximo 100 caracteres.');
    else if (!/^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)) errores.push('Correo inválido (dominios permitidos).');
    if (!contrasena) errores.push('Contraseña requerida.');
    else if (contrasena.length < 4 || contrasena.length > 10) errores.push('Contraseña entre 4 y 10 caracteres.');

    const errorDiv = form.querySelector('.error') || createInlineError(form);
    if (errores.length) { errorDiv.innerHTML = errores.map(r => `<div>${r}</div>`).join(''); return; }

    const user = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    if (!user) { errorDiv.textContent = 'Correo o contraseña incorrectos.'; return; }
    usuarioActivo = user;
    guardarLS('usuarioActivo', usuarioActivo);
    toast(`Bienvenido(a) ${usuarioActivo.nombre}`);
    setTimeout(() => { window.location.href = 'index.html'; }, 700);
  });
}

function logoutUser() { usuarioActivo = null; localStorage.removeItem('usuarioActivo'); actualizarHeader(); }

function setupContacto() {
  const form = document.getElementById('form-contacto');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = (form.querySelector('#nombre') || form.querySelector('input[name="nombre"]')).value.trim();
    const correo = (form.querySelector('#correo') || form.querySelector('input[type="email"]')).value.trim().toLowerCase();
    const comentario = (form.querySelector('#mensaje') || form.querySelector('#comentario') || form.querySelector('textarea')).value.trim();

    const errores = [];
    if (!nombre) errores.push('Nombre requerido.');
    else if (nombre.length > 100) errores.push('Nombre máximo 100 caracteres.');
    if (correo && correo.length > 100) errores.push('Correo máximo 100 caracteres.');
    if (correo && !/^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)) errores.push('Correo inválido (dominios permitidos).');
    if (!comentario) errores.push('Comentario requerido.');
    else if (comentario.length > 500) errores.push('Comentario máximo 500 caracteres.');

    const errDiv = form.querySelector('.error') || createInlineError(form);
    if (errores.length) { errDiv.innerHTML = errores.map(r => `<div>${r}</div>`).join(''); return; }

    toast('Gracias por contactarnos. Tu mensaje fue enviado.');
    form.reset();
  });
}

function createInlineError(form) {
  let el = form.querySelector('.error');
  if (!el) {
    el = document.createElement('div');
    el.className = 'error';
    el.style.marginBottom = '12px';
    form.insertBefore(el, form.firstChild);
  }
  return el;
}

function renderDetallePage() {
  if (!document.getElementById('detalle-nombre')) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) return;
  const prod = PRODUCTOS.find(p => p.id === id);
  if (!prod) return;

  $('#detalle-img').src = prod.imagen;
  $('#detalle-nombre').textContent = prod.nombre;
  $('#detalle-precio').textContent = formatCLP(prod.precio);
  $('#detalle-descripcion').textContent = prod.descripcion;

  const agregarBtn = document.querySelector('.agregar-carrito');
  if (agregarBtn) {
    const nuevoBtn = agregarBtn.cloneNode(true);
    agregarBtn.parentNode.replaceChild(nuevoBtn, agregarBtn);

    nuevoBtn.addEventListener('click', () => {
      const qtyEl = document.getElementById('cantidad-producto');
      const qty = qtyEl ? Math.max(1, parseInt(qtyEl.value, 10) || 1) : 1;
      addToCartById(prod.id, qty);
      toast(`${prod.nombre} agregado al carrito`);
    });
  }
}


function renderCarritoPage() {
  const container = document.getElementById('carrito-contenedor') || document.getElementById('cart-items') || null;
  if (!container) return;
  container.innerHTML = '';

  const title = document.createElement('h2'); title.textContent = 'Tu Carrito'; container.appendChild(title);

  if (!carrito.length) { container.innerHTML += '<p>Tu carrito está vacío.</p>'; actualizarContadorCarrito(); return; }

  const table = document.createElement('table'); table.className = 'tabla-carrito';
  table.innerHTML = `
    <thead>
      <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  carrito.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align:left; padding:8px;"><div style="display:flex; gap:8px; align-items:center;"><img src="${item.imagen}" style="width:64px; height:auto; border-radius:6px;"><div><div style="font-weight:600">${item.nombre}</div></div></div></td>
      <td>${formatCLP(item.precio)}</td>
      <td><button class="qty-decrease" data-id="${item.id}">-</button> <span class="qty-value">${item.qty}</span> <button class="qty-increase" data-id="${item.id}">+</button></td>
      <td>${formatCLP(item.precio * item.qty)}</td>
      <td><button class="remove-item" data-id="${item.id}">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });

  container.appendChild(table);

  const subtotal = carrito.reduce((s, it) => s + it.precio * it.qty, 0);
  const resumen = document.createElement('div'); resumen.style.marginTop = '12px';
  resumen.innerHTML = `
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <div><strong>Subtotal:</strong> ${formatCLP(subtotal)}</div>
      <div>
        <label for="coupon-code">Cupón:</label>
        <input id="coupon-code" placeholder="Código (ej: FELICES50)" style="padding:6px; border-radius:6px; border:1px solid #ccc;">
        <button id="apply-coupon" style="padding:6px 8px; border-radius:6px; border:none; cursor:pointer;">Aplicar</button>
        <div id="coupon-msg" style="margin-top:6px;color:#555;">${cuponAplicado ? `Cupón ${cuponAplicado.codigo} aplicado (${cuponAplicado.descuento}%)` : ''}</div>
      </div>
      <div><strong>Total:</strong> <span id="total-final">${formatCLP(calcTotalWithCoupon(subtotal))}</span></div>
      <div><button id="checkout-btn" style="padding:8px 12px; border-radius:6px; border:none; cursor:pointer;">Pagar</button></div>
    </div>
  `;
  container.appendChild(resumen);

  actualizarContadorCarrito();
}

function setCouponMsg(msg) { const el = document.getElementById('coupon-msg'); if (el) el.textContent = msg; }

function changeQty(id, delta) {
  const idx = carrito.findIndex(it => it.id === id);
  if (idx === -1) return;
  carrito[idx].qty += delta;
  if (carrito[idx].qty <= 0) carrito.splice(idx, 1);
  guardarCarrito();
}

function calcTotalWithCoupon(subtotal) {
  const applied = cuponAplicado || leerLS('cuponAplicado', null);
  if (!applied) return subtotal;
  if (CUPONES[applied.codigo]) {
    const val = CUPONES[applied.codigo].valor;
    return Math.round(subtotal * (1 - val / 100));
  }
  return subtotal;
}

function doCheckout() {
  if (!carrito.length) { toast('Carrito vacío.'); return; }
  if (!usuarioActivo) {
    if (confirm('Debes iniciar sesión para finalizar la compra. Ir a iniciar sesión?')) location.href = 'login.html';
    return;
  }
  const subtotal = carrito.reduce((s, it) => s + it.precio * it.qty, 0);
  const total = calcTotalWithCoupon(subtotal);
  alert(`Compra realizada. Total a pagar: ${formatCLP(total)}`);
  carrito = [];
  cuponAplicado = null;
  guardarLS('carrito', carrito);
  guardarLS('cuponAplicado', cuponAplicado);
  actualizarContadorCarrito();
  renderCarritoPage();
}

(function bindStaticButtons() {
  $all('.btn-agregar').forEach(b => {
    if (b.dataset.id) return; 
    if (b.dataset.bound) return;
    b.dataset.bound = '1';
    b.addEventListener('click', () => {
      const id = b.dataset.id || findProductIdByName(b.dataset.nombre);
      if (id) addToCartById(id, 1);
    });
  });
  $all('.btn-ver-detalle').forEach(b => {
    if (b.dataset.id) return;
    if (b.dataset.bound) return;
    b.dataset.bound = '1';
    b.addEventListener('click', () => {
      const id = b.dataset.id || findProductIdByName(b.dataset.nombre);
      if (id) location.href = `detalle.html?id=${encodeURIComponent(id)}`;
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  usuarios = leerLS('usuarios', usuarios);
  usuarioActivo = leerLS('usuarioActivo', usuarioActivo);
  carrito = leerLS('carrito', carrito);
  cuponAplicado = leerLS('cuponAplicado', cuponAplicado);

  renderCatalogo();
  setupRegistro();
  setupLogin();
  setupContacto();
  renderCarritoPage();
  renderDetallePage();
  actualizarContadorCarrito();
  actualizarHeader();
});

