import { saveCart, loadCart } from "./storage.js";

let cart = loadCart();

const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const clearCart = document.getElementById("clearCart");
const confirmOrder = document.getElementById("confirmOrder");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");

export function updateCart() {
  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button onclick="decreaseQty(${index})">-</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeItem(${index})">X</button>
    `;
    cartItems.appendChild(div);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
  saveCart(cart);
}

export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCart();
  cartSidebar.classList.add("active");
}

window.removeItem = (i) => { cart.splice(i, 1); updateCart(); };
window.increaseQty = (i) => { cart[i].qty++; updateCart(); };
window.decreaseQty = (i) => {
  if (cart[i].qty > 1) cart[i].qty--;
  else cart.splice(i, 1);
  updateCart();
};

cartIcon.addEventListener("click", () => cartSidebar.classList.add("active"));
closeCart.addEventListener("click", () => cartSidebar.classList.remove("active"));
clearCart.addEventListener("click", () => { cart = []; updateCart(); });

confirmOrder.addEventListener("click", () => {
  alert("✅ Order confirmed! Thank you for shopping with us.");
  cart = [];
  updateCart();
  cartSidebar.classList.remove("active");
});

updateCart();
