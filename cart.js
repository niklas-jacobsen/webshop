async function addToCart(event, item) {
  event.preventDefault();

  const itemsInCart = JSON.parse(getCookie("cart")) || [];

  itemsInCart.push(item.id);

  setCookie("cart", JSON.stringify(itemsInCart), 0.5);
}

//to be implemented
async function sumbitOrder() {}
