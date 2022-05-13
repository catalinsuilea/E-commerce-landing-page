"use strict";

const btnIncrease = document.querySelector(".btn-plus");
const btnDecrease = document.querySelector(".btn-minus");
const btnParent = document.querySelector(".input_plus_minus");
const btnCart = document.querySelector(".btn-add-to-cart");
const amount = document.querySelector(".amount");
const productPrice = document.querySelector(".price");
const cartContent = document.querySelector(".cart-content");
const message = document.querySelector(".message");
const smallImages = document.querySelectorAll(".img-small");
const bigImages = document.querySelector(".active-big-photo");
const arrowNext = document.querySelector(".arrow-next");
const arrowPrevious = document.querySelector(".arrow-previous");
const lightBox = document.querySelector(".big-photo");
const sneakersContainer = document.querySelector(".sneakers-images");
const overlay = document.querySelector(".overlay");
const overlayBlack = document.querySelector(".overlay-black");
const arrow = document.querySelectorAll(".arrow");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".number");

const showMenu = document.querySelector(".menu");
const openMenu = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".hamburger-close");
const body = document.querySelector("body");

openMenu.addEventListener("click", openHamburger);
closeMenu.addEventListener("click", closeHamburger);

function openHamburger() {
  showMenu.classList.remove("hidden-nav");
  closeMenu.classList.remove("hamburger-close");
  openMenu.classList.add("hidden-nav");
  closeMenu.classList.remove("hidden-nav");
  body.style.overflow = "hidden";
}

function closeHamburger() {
  showMenu.classList.add("hidden-nav");
  closeMenu.classList.add("hamburger");
  closeMenu.classList.add("hidden-nav");
  openMenu.classList.remove("hidden-nav");
  body.style.overflow = "visible";
}

/*
----------------------------->
Normal image container
*/

// Active state small images

smallImages.forEach((img) => {
  img.addEventListener("click", changeImageSetActive);
});

function changeImageSetActive(event) {
  smallImages.forEach((img) => {
    img.classList.remove("active-img");
  });
  event.target.parentElement.classList.add("active-img");
  //console.log(event.target.src);
  console.log(bigImages.src);
  bigImages.src = event.target.src.replace("-thumbnail", "");
}

//Images carousel

//Next and Previous buttons
arrowNext.addEventListener("click", goNext);
arrowPrevious.addEventListener("click", goBack);

function goNext() {
  let imageIndex = getCurrentImageIndex();
  imageIndex++;
  if (imageIndex > 4) imageIndex = 1;
  setHeroImage(imageIndex);
}

function goBack() {
  let imageIndex = getCurrentImageIndex();
  imageIndex--;
  if (imageIndex < 1) imageIndex = 4;
  setHeroImage(imageIndex);
}

function getCurrentImageIndex() {
  const imageIndex = parseInt(
    bigImages.src.split("\\").pop().split("/").pop().split("-").pop()
  );
  return imageIndex;
}

function setHeroImage(imageIndex) {
  bigImages.src = `./src/images/image-product-${imageIndex}.jpg`;
  smallImages.forEach((img) => {
    img.classList.remove("active-img");
  });
  smallImages[imageIndex - 1].classList.add("active-img");
}

/*
----------------------------->
*/

/*
-------------------------------------------------------------------------------------------------------------------->
Lightbox
*/

let lightBoxSmallImg;
let lightBoxBigImage;
let btnClose;
let btnClose2 = document.querySelector(".btn-close-lightbox-container");
//Show overlay and the current image

lightBox.addEventListener("click", () => {
  arrow.forEach((item) => item.classList.remove("arrow-mobile"));

  btnClose2.classList.remove("hidden-btn");
  if (window.innerWidth >= 1440) {
    if (overlay.childElementCount === 0) {
      const newNode = sneakersContainer.cloneNode(true);
      overlay.appendChild(newNode);

      lightBoxSmallImg = overlay.querySelectorAll(".img-small");
      lightBoxBigImage = overlay.querySelector(".active-big-photo");
      lightBoxSmallImg.forEach((item) => {
        item.addEventListener("click", changeImageSetActiveLightBox);
      });

      const lightBoxNextBtn = overlay.querySelector(".arrow-next");
      lightBoxNextBtn.addEventListener("click", goNextLightImage);
      const lightBoxPreviousBtn = overlay.querySelector(".arrow-previous");
      lightBoxPreviousBtn.addEventListener("click", goBackLightImage);

      btnClose = overlay.querySelector(".btn-close-lightbox-container");
      btnClose.addEventListener("click", function () {
        overlay.classList.add("hidden");
        overlayBlack.classList.add("hidden");
        arrow.forEach((item) => item.classList.add("arrow-mobile"));
      });
    }
    btnClose2.classList.add("hidden-btn");
    overlay.classList.remove("hidden");
    overlayBlack.classList.remove("hidden");
  }
});

overlayBlack.addEventListener("click", function () {
  overlay.classList.add("hidden");
  overlayBlack.classList.add("hidden");
  arrow.forEach((item) => item.classList.add("arrow-mobile"));
});

//Active states Lightbox

function changeImageSetActiveLightBox(event) {
  lightBoxSmallImg.forEach((img) => {
    img.classList.remove("active-img");
  });
  event.target.parentElement.classList.add("active-img");
  //console.log(event.target.src);
  console.log(bigImages.src);
  lightBoxBigImage.src = event.target.src.replace("-thumbnail", "");
}

// Lightbox Next and Previous buttons

function goNextLightImage() {
  let imageIndex = getCurrentLightBoxImage();
  imageIndex++;
  if (imageIndex > 4) imageIndex = 1;
  setHeroLightBoxImage(imageIndex);
}

function goBackLightImage() {
  let imageIndex = getCurrentLightBoxImage();
  imageIndex--;
  if (imageIndex < 1) imageIndex = 4;
  setHeroLightBoxImage(imageIndex);
}

function getCurrentLightBoxImage() {
  const imageIndex = parseInt(
    lightBoxBigImage.src.split("\\").pop().split("/").pop().split("-").pop()
  );
  return imageIndex;
}

function setHeroLightBoxImage(imageIndex) {
  lightBoxBigImage.src = `./src/images/image-product-${imageIndex}.jpg`;
  lightBoxSmallImg.forEach((img) => {
    img.classList.remove("active-img");
  });
  lightBoxSmallImg[imageIndex - 1].classList.add("active-img");
}

/*
-------------------------------------------------------------------------------------------------------------------->
Lightbox
*/

// Amount buttons +/-
btnParent.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-minus");
  console.log(btn);

  if (btn) {
    +amount.value > 1 ? +amount.value-- : "";
    updatePriceDOM(+amount.value);
  }
});
btnParent.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-plus");
  console.log(btn);

  if (btn) {
    +amount.value < 10 ? +amount.value++ : "";
    updatePriceDOM(+amount.value);
  }
});
////Add the product and the amount to cart
btnCart.addEventListener("click", function () {
  message.style.display = "none";
  addToCart();
  updateCartCount();
});
let price = 125;
const updatePriceDOM = (item) => {
  productPrice.innerHTML = `$${item * price}.00`;
};
const updateCartCount = function () {
  console.log(cartCount);
  cartCount.classList.remove("cart-count-hidden");
  cartItems.textContent = amount.value;
};

//Function generate markup to cart
const addToCart = function () {
  let markup = document.createElement("div");
  markup.innerHTML = ` <div class="cart-content">
  <div class="preview">
    <img
      class="image-product"
      src="src/images/image-product-1-thumbnail.jpg"
      alt=""
    />
    <div class="product-details">
      <span class="sneakers_description"
        >Fall Limited Edition Sneakers <span class="amount-cart">$125.00</span> x ${
          amount.value
        }
        =<strong> $${125.0 * +amount.value}</strong></span
      >
    </div>
    <div class="delete-content-cart" onclick=deleteCartContent()>
      <img src="src/images/icon-delete.svg" alt="" />
    </div>
  </div>
  <div class="checkout">
    <button class="btn-checkout">Checkout</button>
  </div>;
  </div>
  `;

  cartContent.insertAdjacentElement("afterbegin", markup);
};

//Delete the cart content
const deleteCartContent = function () {
  cartContent.innerHTML = "";
  const el = document.createElement("div");
  el.innerHTML = `<li class="message">Your cart is empty.</li>`;
  cartContent.insertAdjacentElement("afterbegin", el);
  cartCount.classList.add("cart-count-hidden");
};

/*

--------------------------->

*/
