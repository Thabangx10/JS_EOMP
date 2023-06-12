// Get the property form element
const propertyForm = document.getElementById("property-form");

// Function to generate a unique ID for each property
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Function to display the properties table
function displayProperties() {
  const propertiesTable = document.getElementById("properties-table");
  propertiesTable.innerHTML = "";

  // Retrieve existing properties from local storage or initialize an empty array
  const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];

  // Generate HTML for each property row
  storedProperties.forEach((property, index) => {
    const row = propertiesTable.insertRow();

    // Property ID cell
    const idCell = row.insertCell();
    idCell.textContent = index + 1;

    // Property Title cell
    const titleCell = row.insertCell();
    titleCell.textContent = property.title;

    // Property Description cell
    const descriptionCell = row.insertCell();
    descriptionCell.textContent = property.description;

    // Property Price cell
    const priceCell = row.insertCell();
    priceCell.textContent = property.price;

    // Property Category cell
    const categoryCell = row.insertCell();
    categoryCell.textContent = property.category;

    // Property Actions cell
    const actionsCell = row.insertCell();

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editProperty(index);
    });
    actionsCell.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteProperty(index);
    });
    actionsCell.appendChild(deleteButton);
  });
}

// Function to handle property edit
function editProperty(index) {
  // Retrieve existing properties from local storage
  const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];

  // Retrieve the property at the specified index
  const property = storedProperties[index];

  // Populate the property form with the property data
  document.getElementById("title").value = property.title;
  document.getElementById("description").value = property.description;
  document.getElementById("price").value = property.price;
  document.getElementById("image").value = property.image;
  document.getElementById("category").value = property.category;

  // Update the submit event listener of the property form to handle property update
  propertyForm.removeEventListener("submit", addProperty);
  propertyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get updated property form values
    const updatedTitle = document.getElementById("title").value;
    const updatedDescription = document.getElementById("description").value;
    const updatedPrice = document.getElementById("price").value;
    const updatedImage = document.getElementById("image").value;
    const updatedCategory = document.getElementById("category").value;

    // Update the property object
    property.title = updatedTitle;
    property.description = updatedDescription;
    property.price = updatedPrice;
    property.image = updatedImage;
    property.category = updatedCategory;

    // Store the updated properties back in local storage
    localStorage.setItem("properties", JSON.stringify(storedProperties));

    // Clear the property form fields
    propertyForm.reset();

    // Display a success message
    displaySuccessMessage();

    // Refresh the properties table
    displayProperties();

    // Reset the submit event listener of the property form to handle property creation
    propertyForm.removeEventListener("submit", updateProperty);
    propertyForm.addEventListener("submit", addProperty);
  });
}

// Function to handle property deletion
function deleteProperty(index) {
  // Retrieve existing properties from local storage
  const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];

  // Remove the property at the specified index from the array
  storedProperties.splice(index, 1);

  // Store the updated properties back in local storage
  localStorage.setItem("properties", JSON.stringify(storedProperties));

  // Refresh the properties table
  displayProperties();
}

// Event listener for property form submission
function addProperty(e) {
  e.preventDefault();

  // Get property form values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;

  // Create a new property object
  const property = {
    id: generateUniqueId(),
    title,
    description,
    price,
    image,
    category
  };

  // Retrieve existing properties from local storage or initialize an empty array
  const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];

  // Add the new property to the array
  storedProperties.push(property);

  // Store the updated array back in local storage
  localStorage.setItem("properties", JSON.stringify(storedProperties));

  // Clear the property form fields
  propertyForm.reset();

  // Display a success message
  displaySuccessMessage();

  // Refresh the properties table
  displayProperties();
}

// Display the properties table when the page loads
window.addEventListener("load", function () {
  displayProperties();
});

// Add event listener for property form submission
propertyForm.addEventListener("submit", addProperty);

// Function to display a success message (you can customize this part)
function displaySuccessMessage() {
  alert("Property updated successfully!");
}

// Function to add a property to the cart
function addToCart(propertyId) {
    // Find the selected property by its ID
    const property = properties.find(property => property.id === propertyId);

    // Add the property to the cart (localStorage)
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(property);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Display a success message (you can customize this part)
    alert("Property added to cart!");
}

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