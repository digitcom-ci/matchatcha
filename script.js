function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

// JavaScript to handle dynamic filtering with dropdown menus

document.getElementById("filter-form").addEventListener("change", function() {
const category = document.getElementById("category").value;
const price = document.getElementById("price").value;
const intensity = document.getElementById("intensity").value;

// Show or hide categories based on selected filters
document.querySelectorAll(".category").forEach(function(categoryDiv) {
  if (category === "all" || categoryDiv.id === category) {
    categoryDiv.style.display = "block";
  } else {
    categoryDiv.style.display = "none";
  }
});

// Filter by price range
document.querySelectorAll(".product-card").forEach(function(product) {
  const productPrice = parseInt(product.querySelector("p").textContent.replace('€', '').trim());
  let show = true;

  // Filter by price range
  if (price !== "all") {
    const priceRange = price.split('-');
    const minPrice = parseInt(priceRange[0]);
    const maxPrice = parseInt(priceRange[1]);

    if (productPrice < minPrice || productPrice > maxPrice) {
      show = false;
    }
  }

  if (show) {
    product.style.display = "block";
  } else {
    product.style.display = "none";
  }
});
});
function toggleFilters() {
const filterForm = document.getElementById("filter-form");
const filterTitle = document.querySelector("#filters h2");

if (filterForm.style.display === "none" || filterForm.style.display === "") {
  filterForm.style.display = "block";
  filterTitle.innerHTML = "Filtres &#9650;"; // Change le symbole vers le haut
} else {
  filterForm.style.display = "none";
  filterTitle.innerHTML = "Filtres &#9660;"; // Change le symbole vers le bas
}
}

let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((product) => {
      cartItemsDiv.innerHTML += `<p>${product.item}: ${product.price} FCFA</p>`;
      total += product.price;
  });

  document.getElementById("total-price").innerText = total;
}

function proceedToCheckout() {
  window.location.href = "checkout.php";
}

// Fonction pour ajouter un produit au panier
function addToCart(productId, productName, productPrice) {
// Récupérer les articles du panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceContainer = document.getElementById('total-price');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartNotification = document.getElementById('cart-notification');

// Vérifier si le panier est vide
if (cart.length === 0) {
  emptyCartMessage.style.display = 'block';
  cartItemsContainer.style.display = 'none';
} else {
  emptyCartMessage.style.display = 'none';
  cartItemsContainer.style.display = 'block';

  // Afficher les articles du panier
  cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
          <div class="remove-item" onclick="removeItem(${index})">×</div>
          <div class="item-image">
              <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
              <h4>${item.name}</h4>
              <p>${item.description}</p>
          </div>
          <div class="item-quantity-price">
              <p>Quantité: ${item.quantity}</p>
              <p>${item.price}€</p>
          </div>
      `;
      cartItemsContainer.appendChild(itemElement);
  });

  // Calculer le total du panier
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  totalPriceContainer.innerHTML = `Total: ${totalPrice.toFixed(2)}€`;
}

// Mettre à jour la notification du panier avec le nombre d'articles
updateCartNotification();

function updateCartNotification() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartNotification.textContent = totalItems;
}

// Fonction pour supprimer un article du panier
function removeItem(index) {
  cart.splice(index, 1); // Supprimer l'article du tableau
  localStorage.setItem('cart', JSON.stringify(cart)); // Mettre à jour le localStorage
  window.location.reload(); // Recharger la page pour refléter les changements
}

// Fonction pour passer à la caisse
document.getElementById('checkout').addEventListener('click', () => {
  window.location.href = 'checkout.html';
});


    function toggleMenu() {
      const navLinks = document.getElementById('nav-links');
      navLinks.classList.toggle('active');
    }

    function updateCartNotification() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      document.getElementById('cart-notification').innerText = totalItems;
    }

    // Fonction pour récupérer l'ID du produit depuis l'URL
    function getProductIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('id');
    }

    const currency = "FCFA"; // Devise dynamique

    const products = [
      {
        id: 1,
        name: "Matcha Bio",
        price: 7000,
        description: "Matcha bio provenant du Japon. Idéal pour un boost naturel.",
        variants: [
          { name: "30g", price: 7000 },
          { name: "50g", price: 10000 },
          { name: "100g", price: 15000 }
        ],
        details: "30g",
        container: "boîte plastique",
        image: "images/matchapoudre.png"
      },
      {
        id: 2,
        name: "Matcha Latte",
        price: 5000,
        description: "Mélange de matcha, de lait (ou de lait végétal), et de sucre.",
        variants: [
          { name: "Classique", price: 5000 },
          { name: "Vanille", price: 5000 },
          { name: "Caramel", price: 5000 },
          { name: "Miel", price: 5000 }
        ],
        details: "250ml",
        container: "cup en plastique",
        image: "images/matchalatte2.jpeg"
      },
      {
        id: 3,
        name: "Matcha Smoothie",
        price: 7500,
        description: "Smoothie au matcha et banane pour une texture crémeuse.",
        variants: [
          { name: "Matcha-Banane", price: 7500 },
          { name: "Détox", price: 7500 }
        ],
        details: "250ml",
        container: "cup en plastique",
        image: "images/matchasmoothie.jpeg"
      },
      {
        id: 4,
        name: "Bubble Matcha",
        price: 7000,
        description: "Boisson unique avec matcha et perles de tapioca.",
        variants: [
          { name: "Lait de coco", price: 7000 },
          { name: "Frappé avec boba", price: 7000 },
          { name: "Sirop de fruits", price: 7000 }
        ],
        details: "250ml",
        container: "cup en plastique",
        image: "images/bubblematcha.jpeg"
      },
      {
        id: 5,
        name: "Thé Matcha",
        price: 3000,
        description: "Boisson traditionnelle japonaise préparée avec du matcha.",
        details: "100ml",
        container: "cup en plastique",
        image: "images/thematcha1.jpeg"
      }
    ];

    function loadProduct() {
      const params = new URLSearchParams(window.location.search);
      const productId = parseInt(params.get("id"));
      const product = products.find(p => p.id === productId);

      if (product) {
        const productContainer = document.getElementById("product-container");
        const productHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <p><strong>Prix:</strong> ${product.price} ${currency}</p>
          <p><strong>Détails:</strong> ${product.details}</p>
          <p><strong>Conditionnement:</strong> ${product.container}</p>
        `;
        productContainer.innerHTML = productHTML;

        const variantSelect = document.getElementById("variant");
        product.variants.forEach(variant => {
          const option = document.createElement("option");
          option.value = variant.name;
          option.textContent = `${variant.name} - ${variant.price} ${currency}`;
          variantSelect.appendChild(option);
        });

        const quantitySelect = document.getElementById("quantity");
        for (let i = 1; i <= 10; i++) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          quantitySelect.appendChild(option);
        }

        const addToCartButton = document.getElementById("add-to-cart");
        quantitySelect.addEventListener("change", () => {
          addToCartButton.disabled = quantitySelect.value < 1;
        });

        loadRelatedProducts(productId);
      }
    }

    function loadRelatedProducts(productId) {
      const relatedProducts = products.filter(p => p.id !== productId);
      const relatedProductsContainer = document.querySelector('.related-products-container');
      relatedProductsContainer.innerHTML = '';

      relatedProducts.forEach(product => {
        const productHTML = `
          <div class="related-product">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p><strong>Prix:</strong> ${product.price} ${currency}</p>
            <a href="product-details.html?id=${product.id}" class="view-details">Voir le produit</a>
          </div>
        `;
        relatedProductsContainer.innerHTML += productHTML;
      });
    }

    function addToCart() {
      const variantSelect = document.getElementById('variant');
      const quantitySelect = document.getElementById('quantity');
      const variant = variantSelect.value;
      const quantity = parseInt(quantitySelect.value);

      const productId = getProductIdFromURL();
      const product = products.find(p => p.id === parseInt(productId));

      if (product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = {
          id: product.id,
          name: product.name,
          variant: variant,
          price: product.price,
          quantity: quantity
        };

        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('message').style.display = 'block';
        updateCartNotification();
      }
    }

    loadProduct();

    // Fonction pour gérer le clic sur l'icône de connexion
    function handleLoginClick() {
        const isLoggedIn = localStorage.getItem('loggedInUser');
        if (isLoggedIn) {
            const confirmLogout = confirm("Voulez-vous vous déconnecter ?");
            if (confirmLogout) {
                logout();
            }
        } else {
            window.location.href = 'login.html';
        }
    }

    // Fonction de déconnexion
    function logout() {
        localStorage.removeItem('loggedInUser');
        alert("Déconnexion réussie.");
        window.location.href = 'index.html';
    }
    });
    
