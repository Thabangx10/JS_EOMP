// JavaScript code for admin.html page

// Get the property form element
const propertyForm = document.getElementById("property-form");

// Event listener for property form submission
propertyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get property form values
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value;

    // Create a new property object
    const property = {
        title,
        description,
        price,
        image,
        category
    };

    // Add the property to localStorage or perform other necessary actions
    // ...

    // Clear the property form fields
    propertyForm.reset();
});
