const properties = [
    {
        id: 1,
        title: "Luxury Villa",
        description: "Beautiful villa with stunning views",
        price: 500000,
        image: "https://i.postimg.cc/J7NdV8My/villa.jpg",
        category: "Luxury"
    },
    {
        id: 2,
        title: "Beachfront Condo",
        description: "Spacious condo right on the beach",
        price: 250000,
        image: "https://i.postimg.cc/fb5Tgpy1/condo.jpg",
        category: "Beachfront"
    },

];

// Function to generate property HTML
function generatePropertyHTML(property) {
    return `
        <div class="property">
            <img src="${property.image}" alt="${property.title}">
            <h3>${property.title}</h3>
            <p>${property.description}</p>
            <strong>Price: $${property.price}</strong>
            <span>Category: ${property.category}</span>
        </div>
    `;
}

// Function to display properties
function displayProperties() {
    const propertyList = document.getElementById("property-list");

    // Clear existing property list
    propertyList.innerHTML = "";

    // Generate HTML for each property
    properties.forEach(property => {
        const propertyHTML = generatePropertyHTML(property);
        propertyList.insertAdjacentHTML("beforeend", propertyHTML);
    });
}

// Event listener for page load
window.addEventListener("load", () => {
    displayProperties();

    // Retrieve cart items from localStorage and update the cart count
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cartItems.length;
});

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

// Event listener for page load
window.addEventListener("load", () => {
    displayCartItems();
});

// Function to update the cart count in the navigation
function updateCartCount() {
    // Retrieve cart items from localStorage or perform other necessary actions
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Update the cart count
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartItems.length;
}

// Event listener for page load
window.addEventListener("load", function () {
    updateCartCount();
});

// Event listeners for navigation links
const navigationLinks = document.querySelectorAll("nav ul li a");
navigationLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSectionId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetSectionId);
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});
