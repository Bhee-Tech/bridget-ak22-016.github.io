/* ==========================================================
   Margin Notes — the shopping basket
   Bridget Moses Chukwu — AK22/PHS/CSC/016

   THE MAIN IDEA
   -------------
   There is one list below called "cart". It is the only place
   the basket is stored. Nothing is ever read back off the screen.

   Every time the list changes, I erase the basket area on the
   page and draw it again from the list. So the screen is always
   just a picture of the list.
   ========================================================== */


/* This is the list. It starts empty.
   When you add a book, an object goes in here, like:
       { id: 1, title: "The Weight of Rain", price: 7500, quantity: 2 }   */
var cart = [];


/* Delivery costs 1,500 naira, unless you spend 20,000 or more. */
var DELIVERY_COST = 1500;
var FREE_DELIVERY_FROM = 20000;


/* ----------------------------------------------------------
   ADDING A BOOK
   The "Add to basket" buttons in the HTML call this function
   and pass it the book's id, title and price.
   ---------------------------------------------------------- */
function addToCart(id, title, price) {

  /* First check whether this book is already in the basket. */
  var i;
  for (i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      /* It is already there, so just add one more. */
      cart[i].quantity = cart[i].quantity + 1;
      drawBasket();
      return;
    }
  }

  /* It was not in the basket, so put it in as a new item. */
  cart.push({
    id: id,
    title: title,
    price: price,
    quantity: 1
  });

  drawBasket();
}


/* ----------------------------------------------------------
   THE PLUS AND MINUS BUTTONS
   "change" is either 1 (plus) or -1 (minus).
   ---------------------------------------------------------- */
function changeQuantity(id, change) {

  var i;
  for (i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {

      cart[i].quantity = cart[i].quantity + change;

      /* If the quantity has dropped to zero, take the book out. */
      if (cart[i].quantity < 1) {
        removeFromCart(id);
        return;
      }

      drawBasket();
      return;
    }
  }
}


/* ----------------------------------------------------------
   THE X BUTTON — take a book out of the basket completely
   ---------------------------------------------------------- */
function removeFromCart(id) {

  var newCart = [];
  var i;

  /* Copy every book EXCEPT the one being removed into a new list. */
  for (i = 0; i < cart.length; i++) {
    if (cart[i].id !== id) {
      newCart.push(cart[i]);
    }
  }

  cart = newCart;
  drawBasket();
}


/* ----------------------------------------------------------
   EMPTY THE WHOLE BASKET
   ---------------------------------------------------------- */
function emptyBasket() {
  cart = [];
  drawBasket();
}


/* ----------------------------------------------------------
   WORKING OUT THE TOTALS
   ---------------------------------------------------------- */
function getSubtotal() {
  var total = 0;
  var i;

  for (i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
  }

  return total;
}


function getDelivery() {
  /* Nothing in the basket means nothing to deliver. */
  if (cart.length === 0) {
    return 0;
  }

  /* Free delivery on big orders. */
  if (getSubtotal() >= FREE_DELIVERY_FROM) {
    return 0;
  }

  return DELIVERY_COST;
}


/* Turns 7500 into "₦7,500" so it reads properly on the page. */
function showMoney(amount) {
  return "\u20A6" + amount.toLocaleString();
}


/* ----------------------------------------------------------
   DRAWING THE BASKET ON THE PAGE
   This is the important one. It runs every single time the
   cart list changes.
   ---------------------------------------------------------- */
function drawBasket() {

  var list = document.getElementById("basket-list");
  var totalBox = document.getElementById("basket-total");

  /* Step 1: wipe whatever is currently in the basket area. */
  list.innerHTML = "";

  /* Step 2: if the basket is empty, say so and stop here. */
  if (cart.length === 0) {
    list.innerHTML = "<p class='basket-empty'>Your basket is empty. Choose a book from the shelf above.</p>";
    totalBox.style.display = "none";
    return;
  }

  /* Step 3: there is something in the basket, so show the totals box. */
  totalBox.style.display = "block";

  /* Step 4: build one row of HTML for every book in the list. */
  var html = "";
  var i;

  for (i = 0; i < cart.length; i++) {

    var book = cart[i];
    var rowCost = book.price * book.quantity;

    html = html +
      "<div class='basket-row'>" +

        "<div class='title'>" + book.title +
          "<span class='each'>" + showMoney(book.price) + " each</span>" +
        "</div>" +

        "<div class='counter'>" +
          "<button onclick='changeQuantity(" + book.id + ", -1)'>&minus;</button>" +
          "<span class='number'>" + book.quantity + "</span>" +
          "<button onclick='changeQuantity(" + book.id + ", 1)'>+</button>" +
        "</div>" +

        "<span class='row-cost'>" + showMoney(rowCost) + "</span>" +

        "<button class='remove-button' onclick='removeFromCart(" + book.id + ")'>&times;</button>" +

      "</div>";
  }

  /* Step 5: put all those rows onto the page at once. */
  list.innerHTML = html;

  /* Step 6: fill in the three total figures. */
  var delivery = getDelivery();

  document.getElementById("subtotal").innerHTML = showMoney(getSubtotal());

  if (delivery === 0) {
    document.getElementById("delivery").innerHTML = "Free";
  } else {
    document.getElementById("delivery").innerHTML = showMoney(delivery);
  }

  document.getElementById("grand-total").innerHTML = showMoney(getSubtotal() + delivery);
}


/* ----------------------------------------------------------
   PLACING THE ORDER
   ---------------------------------------------------------- */
function checkout() {

  /* Do nothing if there is nothing to buy. */
  if (cart.length === 0) {
    return;
  }

  /* Count how many books altogether. */
  var howMany = 0;
  var i;
  for (i = 0; i < cart.length; i++) {
    howMany = howMany + cart[i].quantity;
  }

  var amountPaid = getSubtotal() + getDelivery();

  /* Make up an order number, e.g. MN-482913 */
  var orderNumber = "MN-" + Math.floor(100000 + Math.random() * 900000);

  /* Write the receipt and show it. */
  document.getElementById("receipt-title").innerHTML = "Order " + orderNumber;

  document.getElementById("receipt-text").innerHTML =
    howMany + " book(s) &mdash; " + showMoney(amountPaid) + " paid.<br>" +
    "Your books will be wrapped and posted within two working days.";

  document.getElementById("receipt").style.display = "block";

  /* The order is placed, so the basket starts again from empty. */
  emptyBasket();
}


/* ----------------------------------------------------------
   "ORDER SOMETHING ELSE" — hides the receipt again
   ---------------------------------------------------------- */
function startAgain() {
  document.getElementById("receipt").style.display = "none";
}


/* ----------------------------------------------------------
   When the page first loads, draw the basket once so that the
   "your basket is empty" message appears.
   ---------------------------------------------------------- */
drawBasket();
