//Query Selectors

//Main page gallery variables
let mainImg = document.querySelector("#main-img");
let thumbnailImgs = document.querySelectorAll(".thumbnail-imgs");
const thumbnailArry = Array.from(thumbnailImgs)

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
const cartBtn = document.querySelector(".cart-sum-btn")

//Mobile Dropdown Variables
const hamburger = document.querySelector(".hamburger");
const mobileDropdown = document.querySelector(".mobile-dropdown");
//Event Listeners

//Mobile menu dropdown
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileDropdown.classList.toggle("active");
})


let openCart = false;
cartBtn.addEventListener("click", () => {
    if(openCart === false){
        dropdownContent.classList.add("active")
        openCart = true
    }else{
        dropdownContent.classList.remove("active")
        openCart = false
    }
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
        thumbnailImgs.forEach(img => {
            img.classList.remove("active")
        })
        img.classList.add("active")
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
    img.addEventListener("click", () => 
    {lightboxThumbnailImgs.forEach(img => {
        img.classList.remove("active")
    })
    img.classList.add("active")
    setActiveImg(img)
}) 
})


nextBtn.addEventListener("click", () => {
    if(activeImg < lastImage){
    setActiveImg(lightboxArray[activeImg + 1])
    lightboxArray[activeImg].classList.add("active");
    lightboxArray[activeImg - 1].classList.remove("active")
    } else{
        setActiveImg(lightboxArray[0])
        lightboxArray[lastImage].classList.remove("active")
        lightboxArray[0].classList.add("active")
    }
})

previousBtn.addEventListener("click", () => {
    if(activeImg > 0){
        setActiveImg(lightboxArray[activeImg - 1])
        lightboxArray[activeImg].classList.add("active")
        lightboxArray[activeImg + 1].classList.remove("active")
    } else {
        setActiveImg(lightboxArray[lastImage])
        lightboxArray[0].classList.remove("active")
        lightboxArray[lastImage].classList.add("active")
    }
})

function setActiveImg(image){
    lightboxMainImg.src = image.dataset.imgsrc
    activeImg = lightboxArray.indexOf(image)

    

    if (activeImg < lastImage) {
        // Remove "active" class from the next thumbnail
        
    }

    // Handle the case where activeImg is the last image
    else if (activeImg === 0) {
        // Remove "active" class from the first thumbnail
        lightboxArray[0].classList.add("active");
        lightboxArray[lastImage].remove("active")
    }
}

function toggleActive(){

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
    total.textContent = 1
    console.log("add")
})

function updateCartSummary(total){
const cartSummary = cart.map(item => 
    `<img class="cart-img"  src="assets/image-product-1-thumbnail.jpg">
    <div class="price-container">
    <p class="product-name">${item.product}</p>
    <p class="total-price">$${item.price.toFixed(2)} x ${item.qty} $${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
    
    </div>
    <div><img class="delete-icon" src="assets/icon-delete.svg"></div>`
)
    
    cartContainer.innerHTML = cartSummary
    
  
    
    
    console.log(cartContainer)
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
    
    updateCartSummary(total)
    count = 1
    
}

document.addEventListener("DOMContentLoaded", () => {
    cartContainer.addEventListener("click", () => {
    if(event.target.classList.contains("delete-icon")){
        resetCart()
    }
})
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

