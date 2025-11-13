import { addToCart } from "./cart.js";

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

let products = [];

fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  });

function displayProducts(list) {
  productList.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <p>$${p.price}</p>
      <button>Add to Cart</button>
    `;
    div.querySelector("button").addEventListener("click", () => addToCart(p));
    productList.appendChild(div);
  });
}

searchInput.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(q));
  displayProducts(filtered);
});

filterSelect.addEventListener("change", e => {
  const cat = e.target.value;
  const filtered = cat === "all" ? products : products.filter(p => p.category === cat);
  displayProducts(filtered);
});
