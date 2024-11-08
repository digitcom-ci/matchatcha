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