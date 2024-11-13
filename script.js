// Fonction pour basculer le menu de navigation
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

// Gestion des filtres dynamiques avec les menus déroulants
document.getElementById("filter-form").addEventListener("change", function () {
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const intensity = document.getElementById("intensity").value;

  // Affichage des catégories en fonction des filtres
  document.querySelectorAll(".category").forEach(function (categoryDiv) {
    if (category === "all" || categoryDiv.id === category) {
      categoryDiv.style.display = "block";
    } else {
      categoryDiv.style.display = "none";
    }
  });

  // Filtrage par tranche de prix
  document.querySelectorAll(".product-card").forEach(function (product) {
    const productPrice = parseInt(product.querySelector("p").textContent.replace('FCFA', '').trim());
    let show = true;

    if (price !== "all") {
      const priceRange = price.split('-');
      const minPrice = parseInt(priceRange[0]);
      const maxPrice = parseInt(priceRange[1]);

      if (productPrice < minPrice || productPrice > maxPrice) {
        show = false;
      }
    }

    product.style.display = show ? "block" : "none";
  });
});

// Gestion du panier
let cart = [];

// Ajouter un produit au panier
function addToCart(productId, variantId, productName, productPrice) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === productId && item.variantId === variantId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, variantId, name: productName, price: productPrice, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Mettre à jour l'affichage du panier
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const totalPriceContainer = document.getElementById("total-price");
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    cartItemsDiv.style.display = 'none';
    totalPriceContainer.innerHTML = "Total: 0 FCFA";
  } else {
    emptyCartMessage.style.display = 'none';
    cartItemsDiv.style.display = 'block';

    cart.forEach(item => {
      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <h4>${item.name} (${item.variantId})</h4>
          <p>Prix: ${item.price} FCFA</p>
          <p>Quantité: ${item.quantity}</p>
        </div>`;
      total += item.price * item.quantity;
    });

    totalPriceContainer.innerHTML = `Total: ${total} FCFA`;
  }
}

// Passer à la caisse
function proceedToCheckout() {
  window.location.href = "checkout.html";
}

// Chargement des produits
const currency = "FCFA";

const products = [
  {
    id: 1,
    name: "Matcha Bio",
    price: 7000,
    description: "Matcha bio provenant du Japon. Idéal pour un boost naturel.",
    image: "images/matchapoudre.png",
    variants: [
      { id: "100g", price: 7000 },
      { id: "200g", price: 12000 },
    ]
  },
  {
    id: 2,
    name: "Matcha Latte",
    price: 5000,
    description: "Mélange de matcha, lait (ou lait végétal) et sucre.",
    image: "images/matchalatte2.jpeg",
    variants: [
      { id: "Regular", price: 5000 },
      { id: "Grande", price: 7500 },
    ]
  },
  {
    id: 3,
    name: "Matcha Detox",
    price: 8000,
    description: "Un mélange de matcha et d'herbes pour purifier le corps.",
    image: "images/matchadetox.png",
    variants: [
      { id: "Standard", price: 8000 },
      { id: "Premium", price: 10000 },
    ]
  }
  // Ajoutez d'autres produits ici
];

// Charger les produits sur la page
function loadProducts() {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach(product => {
    product.variants.forEach(variant => {
      productContainer.innerHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name} (${variant.id})</h3>
          <p>${product.description}</p>
          <p>${variant.price} ${currency}</p>
          <button onclick="addToCart(${product.id}, '${variant.id}', '${product.name}', ${variant.price})">Ajouter au panier</button>
        </div>`;
    });
  });
}

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  updateCartDisplay();
});
