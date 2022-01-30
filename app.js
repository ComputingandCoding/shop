import items from "./shop.js";

const cards = document.querySelector(".cards");
const alertHeader = document.querySelector(".alert");

let itemsArr = [];

if (localStorage.getItem("cart") === null) {
  itemsArr = [];
} else {
  itemsArr = JSON.parse(localStorage.getItem("cart"));
}

let shoudAdd = true;

items.forEach((item, i) => {
  const newCard = document.createElement("div");

  newCard.classList.add("card");

  newCard.innerHTML = `<div class="colour-sample" style="background:${item.colour}"></div>
    <div class="card-bottom">
      <div class="description">
        <div class="description-txt">${item.descTxt}</div>
      </div>
      <div class="purchase" id="${i}">
        <div class="details">
          <p class="name">${item.name}</p>
          <p class="price">${item.price}</p>
        </div>
        <button class="add-to-cart">Add To Cart</button>
      </div>
    </div>`;
  cards.appendChild(newCard);
  newCard.querySelector("button").addEventListener("click", addItemToCart);
});

function addItemToCart() {
  const selectedItem = items[this.parentNode.id];
  itemsArr.forEach((item) => {
    if (selectedItem.name === item.name) {
      item.quantity = item.quantity + 1;
      item.price = `$${
        Number(item.price.substring(1)) + Number(item.price.substring(1))
      }.00`;
      shoudAdd = false;
    }
  });
  if (shoudAdd) {
    itemsArr.push({
      name: selectedItem.name,
      colour: selectedItem.colour,
      quantity: 1,
      price: selectedItem.price,
    });
  }
  shoudAdd = true;
  console.log(itemsArr);
  localStorage.setItem("cart", JSON.stringify(itemsArr));

  alertHeader.style.opacity = "1";

  setTimeout(() => {
    alertHeader.style.opacity = "0";
  }, 1500);
}
