// JavaScript code for checkout.html page

// Get the cart item list element
const cartItemList = document.getElementById("cart-item-list");

// Get the total amount element
const totalAmount = document.getElementById("amount");

// Function to calculate and display the total amount
function calculateTotalAmount() {
    // Retrieve cart items from localStorage or perform other necessary actions
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Calculate the total amount
    let sum = 0;
    cartItems.forEach(item => {
        sum += item.price;
    });

    // Display the total amount
    totalAmount.textContent = sum;
}

// Function to display the cart items
function displayCartItems() {
    // Retrieve cart items from localStorage or perform other necessary actions
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Clear existing cart items
    cartItemList.innerHTML = "";

    // Generate HTML for each cart item
    cartItems.forEach(item => {
        const cartItemHTML = generateCartItemHTML(item);
        cartItemList.insertAdjacentHTML("beforeend", cartItemHTML);
    });

    // Calculate and display the total amount
    calculateTotalAmount();
}

// Event listener for page load
window.addEventListener("load", displayCartItems);