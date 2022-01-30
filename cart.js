const checkout = document.querySelector(".checkout-list");
const title = document.querySelector(".title");
const alertHeader = document.querySelector(".alert");
const totalPriceTxt = document.querySelector(".total-price span");
const checkoutBtn = document.querySelector(".pay button");

const cartItems = localStorage.getItem("cart");

let totalPrice = 0;

JSON.parse(cartItems).forEach((cartItem) => {
  const newCartItem = document.createElement("div");

  newCartItem.classList.add("checkout-item");

  newCartItem.innerHTML = `  <div class="checkout-item">
  <div class="colour" style="background: ${cartItem.colour}"></div>
  <div class="info">
    <div class="name">${cartItem.name}</div>
    <div class="quantity">x${cartItem.quantity}</div>
  </div>
  <div class="info">
  <div class="price">${cartItem.price}</div>
  <button class="delete"><i class="fas fa-trash"></i></button>
  </div>
</div>`;

  checkout.appendChild(newCartItem);
  newCartItem.querySelector("button").addEventListener("click", deleteItem);
});

JSON.parse(cartItems).forEach((cartItem) => {
  totalPrice += Number(cartItem.price.substring(1));
});

totalPriceTxt.textContent = "$" + totalPrice + ".00";

function deleteItem() {
  const newArray = JSON.parse(localStorage.getItem("cart"));
  JSON.parse(localStorage.getItem("cart")).forEach((cartItem, i) => {
    if (
      cartItem.name ===
      this.parentNode.parentNode.querySelector(".name").textContent
    ) {
      newArray.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(newArray));

      totalPrice = 0;
      JSON.parse(localStorage.getItem("cart")).forEach((cartItem) => {
        totalPrice += Number(cartItem.price.substring(1));
      });

      totalPriceTxt.textContent = "$" + totalPrice + ".00";

      this.parentNode.parentNode.parentNode.remove();
      if (checkout.innerHTML === "") {
        title.style.display = "block";
        checkoutBtn.style.cursor = "not-allowed";
      }
      alertHeader.style.opacity = "1";

      setTimeout(() => {
        alertHeader.style.opacity = "0";
      }, 1500);
    }
  });
}

if (checkout.innerHTML === "") {
  checkoutBtn.style.cursor = "not-allowed";
  title.style.display = "block";
} else {
  title.style.display = "none";
}

checkoutBtn.addEventListener("click", () => {
  if (checkout.innerHTML === "") {
    alert("You have no items in your cart");
  }
});
