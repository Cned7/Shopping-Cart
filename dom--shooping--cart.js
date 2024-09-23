// Get all product cards
let productCards = Array.from(document.getElementsByClassName("product--card"));

// Function to update the total price
const totalPriceElement = document.querySelector(
  ".checkout--total--container h3 span"
);

function updateTotalPrice() {
  let total = 0;
  console.log(productCards);
  productCards.forEach((card) => {
    const quantityInput = card.querySelector(".input--field");
    const priceElement = card.querySelector(".product--name--price p span");

    // Validate quantity input and parse to integer
    let quantity = quantityInput.value;
    if (quantity === "") {
      quantityInput.value = 1; // Set default quantity to 1
      quantity = 1;
    }

    const price = Number(priceElement.textContent);
    console.log(price);
    total += parseInt(quantity) * price;
  });

  totalPriceElement.textContent = total.toFixed(2);
}

// Add event listeners to buttons
productCards.forEach((card) => {
  const plusBtn = card.querySelector(".plus--btn");
  const minusBtn = card.querySelector(".minus--btn");
  const deleteBtn = card.querySelector(".delete--btn");
  const heartIcon = card.querySelector(".delete--heart--icon i");
  const quantityInput = card.querySelector(".input--field");

  plusBtn.addEventListener("click", () => {
    const newQuantity = parseInt(quantityInput.value) + 1;
    if (!isNaN(newQuantity)) {
      quantityInput.value = newQuantity;
      updateTotalPrice();
    }
  });

  minusBtn.addEventListener("click", () => {
    const newQuantity = parseInt(quantityInput.value) - 1;
    if (!isNaN(newQuantity) && newQuantity > 0) {
      quantityInput.value = newQuantity;
      updateTotalPrice();
    }
  });

  deleteBtn.addEventListener("click", (e) => {
    let currentElement = e.target;
    let clickedProduct =
      currentElement.parentElement.parentElement.parentElement.innerText;
    let updatedProductCards = productCards.filter(
      (item) => item.innerText != clickedProduct
    );
    card.remove();
    productCards = updatedProductCards;
    updateTotalPrice();
    console.log(productCards);
  });

  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("fa-solid");
    heartIcon.classList.toggle("fa-regular");
  });
});

// Initial total price calculation
updateTotalPrice();
