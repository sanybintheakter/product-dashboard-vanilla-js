function fetchProductsThen() {
  fetch("https://www.course-api.com/javascript-store-products")
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch("https://www.course-api.com/javascript-store-products");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.slice(0, 5).forEach((product) => {
    const name = product.fields.name;
    const image = product.fields.image[0].url;
    const price = (product.fields.price / 100).toFixed(2);

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>$${price}</p>
    `;

    productContainer.appendChild(productCard);
  });
}

function handleError(error) {
  console.error(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();