//Query Selectors

//Main page gallery variables
let mainImg = document.querySelector("#main-img");
let thumbnailImgs = document.querySelectorAll(".thumbnail-imgs");

//lightbox variables
let lightboxContainer = document.querySelector(".lightbox-container");
let lightboxMainImg = document.querySelector(".lightbox-img");
let lightboxBtns = document.querySelectorAll(".lightbox-btn");

//Lightbox variables for cycling through images
let lightboxThumbnailImgs = document.querySelectorAll('.thumbnail-lightbox-imgs');
let lightboxArray = Array.from(lightboxThumbnailImgs);
const lastImage = lightboxArray.length -1;

let activeImg = 0;
const closeBtn = document.querySelector("#close");
const nextBtn = document.querySelector("#right");
const previousBtn = document.querySelector('#left');

//cart variables
let minus = document.querySelector(".minus-btn");
let add = document.querySelector(".add-btn");
let total = document.querySelector(".number-of-items");
let count = "1";

const cartContainer = document.querySelector(".cart-info-container")
let cartQty = document.querySelector(".number-of-items");
const price = 125.00;
const addToCartBtn = document.querySelector(".cart-btn");
let totalPrice = document.querySelector(".total-price");
let productName = document.querySelector(".product-name");
const cartImg = document.querySelector(".cart-img");
const deleteIcon = document.querySelector(".delete-icon");


//Dropdown variables
const dropdownContent = document.querySelector(".dropdown-wrapper");
let dropdownIcons = document.querySelectorAll(".dropdown");

//Mobile Dropdown Variables
const hamburger = document.querySelector(".hamburger");
const mobileDropdown = document.querySelector(".mobile-dropdown");
//Event Listeners

//Mobile menu dropdown
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileDropdown.classList.toggle("active");
})

dropdownIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        dropdownContent.classList.toggle("active")
    })
})

add.addEventListener("click", () => {
    count ++
    total.textContent = count
    console.log(count)
})

minus.addEventListener("click", () => {
    if(count > 0){
        count --
        total.textContent = count
    } 
})

thumbnailImgs.forEach(img => {
    img.addEventListener("click", () =>{
        let newImgSrc = img.dataset.imgsrc
        mainImg.src = newImgSrc
    })
})



mainImg.addEventListener("click", () => {
    lightboxContainer.classList.add("active")
    lightboxMainImg.src = mainImg.src
})

closeBtn.addEventListener("click", () => {
    lightboxContainer.classList.remove("active")
})



lightboxThumbnailImgs.forEach(img => {
    img.addEventListener("click", () => {setActiveImg(img)})
})


nextBtn.addEventListener("click", () => {
    if(activeImg < lastImage){
    setActiveImg(lightboxArray[activeImg + 1])
    } else{setActiveImg(lightboxArray[0])}
})

previousBtn.addEventListener("click", () => {
    if(activeImg > 0){
        setActiveImg(lightboxArray[activeImg - 1])
    } else {setActiveImg(lightboxArray[lastImage])}
})

function setActiveImg(image){
    lightboxMainImg.src = image.dataset.imgsrc
    activeImg = lightboxArray.indexOf(image)
}

let cart = []
//update the cart 
addToCartBtn.addEventListener("click", () => {
    const button = event.target
    const container = button.closest(".product-info-container")
    const product = container.querySelector(".name-of-product").textContent
    const priceText = container.querySelector(".price").textContent
    const price = parseFloat(priceText.replace('$', ''))
    let qty = Number(count)
    const index = cart.findIndex(item => item.product === product)
    updateCartArray(product, price, qty, index)
    console.log("add")
})

function updateCartSummary(product, price, qty, total){
    const cartSummary = ` <img class="cart-img"  src="assets/image-product-1-thumbnail.jpg">
    <div class="price-container">
    <p class="product-name">${product}</p>
    <p class="total-price">$${price.toFixed(2)} x ${qty} $${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
    
    </div>
    <div><img class="delete-icon" src="assets/icon-delete.svg"></div>`

    
     cartContainer.innerHTML = cartSummary
}

function updateCartArray(product, price, qty,index){
    let productQty = 0
    if(index !== -1){
        cart[index].qty += qty
        console.log("a" + cart)
    } else{ cart.push({product, price, qty})}
    let total = 0
    cart.forEach(product => {
        total += product.price * product.qty
        console.log("this" + total)
        productQty = product.qty
    })
    
    updateCartSummary(product,price,productQty,total)
    count = 1
    
}

cartContainer.addEventListener("click", () => {
    if(event.target.classList.contains("delete-icon")){
        resetCart()
    }
})

function resetCart(){
   cart = []
   const emptyCart = `
        <div class="cart-dropdown-content">
        <div class="price-container">
        <p class="product-name">Cart is empty</p>
        <p class="total-price"></p>
        </div>`
   cartContainer.innerHTML = ''
   cartContainer.innerHTML = emptyCart
}
