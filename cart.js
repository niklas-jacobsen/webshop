async function addToCart(event, item) {
  event.preventDefault();
  console.log(event);

  const itemsInCart = JSON.parse(getCookie("cart")) || [];

  itemsInCart.push(item.id);

  //const response = await fetch(backend_url + "/item/")
  setCookie("cart", JSON.stringify(itemsInCart), 0.5);
}
