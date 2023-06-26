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
let activeImg;
const closeBtn = document.querySelector("#close");
const nextBtn = document.querySelector("#right");
const previousBtn = document.querySelector('#left');

//cart variables
let minus = document.querySelector(".minus-btn");
let add = document.querySelector(".add-btn");
let total = document.querySelector(".number-of-items");
let count = "0";

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

//input for adding product to cart
minus.addEventListener("click", () =>{
    if(count > 0){
    count --;
    total.textContent = count;
}
});

add.addEventListener("click", () =>{
    count ++;
    total.textContent = count;
})

//Activates dropdown content
dropdownIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        dropdownContent.classList.toggle('active')
    });
});



//This will call the function responsible for adding the total
addToCartBtn.addEventListener('click', () => {totalPriceCalculation()});


/*Next and previous btn event listeners for lightbox*/
nextBtn.addEventListener('click', () => {nextImg()});
previousBtn.addEventListener('click', () =>{previousImg()});

/*Open and close event listeners for lightbox*/
mainImg.addEventListener('click', () => {openLightbox()});
closeBtn.addEventListener('click', () => {closeLightbox()});

//Reset Cart
deleteIcon.addEventListener("click" , () => {resetCart()});

//Functions

//open and close lightbox
const openLightbox = () => {lightboxContainer.classList.add('active')};
const closeLightbox = () => {lightboxContainer.classList.remove('active');}

//cycle through images
const nextImg = () => {
    if (activeImg < lastImage) {
      setActiveImg(lightboxArray[activeImg + 1]);
    } else {
      setActiveImg(lightboxArray[0]);
    }
  };

const previousImg = () => {
    if (activeImg > 0){
        setActiveImg(lightboxArray[activeImg -1]);
    } else {
        setActiveImg(lightboxArray[lastImage]);
    }
};





/*Updates the active img by updating the src of the mainimg, also this updates 
the activeImg variable to reflect the index of the img in the lightboxArray vaariable.
This function will be called when cycling through images using the next and previous buttons*/
const setActiveImg = (image) => {
    lightboxMainImg.src = image.dataset.imgsrc;
    activeImg = lightboxArray.indexOf(image);
}


//When an image is clicked it will display as the main img
thumbnailImgs.forEach((image) => {
    image.addEventListener("click", () => {
        let newImgSrc = image.dataset.imgsrc;
        mainImg.setAttribute("src", newImgSrc);
    });
});


lightboxThumbnailImgs.forEach((image) => {
    image.addEventListener('click', () => {
        let newImgSrc = image.dataset.imgsrc;
        lightboxMainImg.setAttribute('src', newImgSrc);
    })
});

//Function for adding items to cart

//Calculate total price for cart
const totalPriceCalculation = () => {
    const quantity = count;
    const totalCalc = quantity * price;
    totalPrice.textContent = "$125 x " + quantity + " $" + totalCalc;
    productName.textContent = "Fall Limited Time Sneakers";
    deleteIcon.classList.add("active");
    cartImg.classList.add("active");
    

}


//Reset Cart Function
const resetCart = () => {
    totalPrice.textContent = "";
    productName.textContent = "Cart is empty";
    cartImg.classList.remove("active");
    deleteIcon.classList.remove("active");
}


