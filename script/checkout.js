// Function to display cart items
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsDiv = document.getElementById("cart-items");
    let totalPrice = 0;

    // Clear existing cart items
    cartItemsDiv.innerHTML = "";

    // Generate HTML for each cart item
    cartItems.forEach(property => {
        cartItemsDiv.insertAdjacentHTML("beforeend", `
            <div class="cart-item">
                <img src="${property.image}" alt="${property.title}">
                <h3>${property.title}</h3>
                <p>${property.description}</p>
                <strong>Price: $${property.price}</strong>
            </div>
        `);

        // Update total price
        totalPrice += property.price;
    });

    // Display total price
    const totalPriceDiv = document.getElementById("total-price");
    totalPriceDiv.textContent = `Total: $${totalPrice}`;
}

// Function to generate HTML for a cart item
function generateCartItemHTML(item) {
  return `
    <div class="cart-item">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <strong>Price: $${item.price}</strong>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    </div>
  `;
}

// Event listener for remove item buttons
cartItemList.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-item")) {
    const itemId = e.target.getAttribute("data-id");
    removeItem(itemId);
  }
});

// Update the cart count and display the cart items on page load
window.addEventListener("load", function () {
  updateCartCount();
  displayCartItems();
});
