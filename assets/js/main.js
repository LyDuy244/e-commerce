const topCartList = document.querySelector(".top-cart-info-content")
const topCartImgWrapper = document.querySelector(".top-cart-img-wrapper")
const topCartCount = document.querySelector(".top-cart-count")
const topCartQuantity = document.querySelector(".top-cart-quantity")
const topCartTotal = document.querySelector(".top-cart-info-total span")
const orderBtn = document.querySelector(".order-js");
const productPriceSale = document.querySelectorAll(".product-price-sale")


var formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

productPriceSale && productPriceSale.forEach(item => {
    const priceStr = item.textContent;
    const priceFormater = formatter.format(priceStr);

    item.textContent = priceFormater
})


const productList = JSON.parse(localStorage.getItem("productList")) || []
function createProductItemInCart(obj) {
    const template = ` <div class="top-cart-item">
                    <div class="top-cart-item-cover">
                        <img src="${obj.image}"
                            alt="">
                    </div>

                    <div class="top-cart-item-info">
                        <h5 title="${obj.name}">${obj.name}</h5>
                        <p>${obj.quantity} x ${formatter.format(obj.price)}</p>
                        <div class="top-cart-item-btn">
                                <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div> `

    topCartList.insertAdjacentHTML("beforeend", template)
}


if (Array.isArray(productList) && productList.length > 0) {
    let count = 0;
    let total = 0;
    productList.forEach(e => {
        count += Number(e["quantity"])
        total += Number(e["quantity"]) * Number(e['price'])
        createProductItemInCart(e)
    })

    topCartTotal.textContent = formatter.format(total)
    topCartQuantity.innerText = count;
    if (count > 9) {
        topCartCount.innerText = "9+";
    }
    else {
        topCartCount.innerText = count;
    }
    topCartImgWrapper.classList.remove("is-active")


} else {
    topCartImgWrapper.classList.add("is-active")
}

const btnBuy = document.querySelectorAll(".btn-buy-js")

btnBuy.forEach(item => item.addEventListener("click", function (e) {
    e.preventDefault()
    const product = e.currentTarget.closest(".product-item")
    const productName = product.querySelector(".product-name a").innerText
    let productQuantity = 1;
    let count = 0;
    let total = 0;

    const index = productList.findIndex((item) => item["name"] === productName);
    if (index > -1) {
        //                update quantity of the existing object in local storage
        productQuantity = Number(productList[index]["quantity"]) + 1;
        productList[index]["quantity"] = productQuantity;
        localStorage && localStorage.setItem("productList", JSON.stringify(productList))
        topCartList.innerHTML = "";
        productList.forEach(item => createProductItemInCart(item))
    } else {
        const productImg = product.querySelector(".product-cover a img").getAttribute("src");
        const productPrice = product.querySelector(".product-price-sale").innerText

        const price = productPrice.split("");
        const index = price.findIndex((item) => item.includes('₫'))
        price.splice(index, 1);


        const productItem = {}
        productItem.name = productName
        productItem.image = productImg
        productItem.price = price.join('').split(".").join("")
        productItem.quantity = productQuantity
        createProductItemInCart(productItem)
        productList.push(productItem)
        localStorage && localStorage.setItem("productList", JSON.stringify(productList))
    }

    productList.forEach(e => {
        count += Number(e["quantity"])
        total += Number(e["quantity"]) * Number(e['price'])
    })

    topCartQuantity.innerText = count;
    topCartTotal.textContent = formatter.format(total)

    if (count > 9) {
        topCartCount.innerText = "9+";
    }
    else {
        topCartCount.innerText = count;
    }

    if (count > 0) {
        topCartImgWrapper.classList.remove("is-active")
    } else {
        topCartImgWrapper.classList.add("is-active")
    }

}))

orderBtn && orderBtn.addEventListener("click", function (e) {
    e.preventDefault()
    const product = e.currentTarget.closest(".detail-content")
    const productName = product.querySelector(".detail-name").innerText.toLowerCase()
    let productQuantity = +product.querySelector("#detail-quantity").innerText.toLowerCase();

    let count = 0;
    let total = 0;


    const index = productList.findIndex((item) => item["name"].toLowerCase() === productName);
    if (index > -1) {
        //                update quantity of the existing object in local storage
        productQuantity += Number(productList[index]["quantity"]);
        productList[index]["quantity"] = productQuantity;
        localStorage && localStorage.setItem("productList", JSON.stringify(productList))
        topCartList.innerHTML = "";
        productList.forEach(item => createProductItemInCart(item))
    } else {
        const productImg = product.previousElementSibling.querySelectorAll(".img-main-wrapper img")[1].getAttribute("src");
        const productPrice = product.querySelector(".detail-price").innerText

        const price = productPrice.split("");
        const index = price.findIndex((item) => item.includes('₫'))
        price.splice(index, 1);

        const productItem = {}
        productItem.name = productName
        productItem.image = productImg
        productItem.price = price.join('').split(".").join("")
        productItem.quantity = productQuantity
        createProductItemInCart(productItem)
        productList.push(productItem)
        localStorage && localStorage.setItem("productList", JSON.stringify(productList))
    }


    productList.forEach(e => {
        count += Number(e["quantity"])
        total += Number(e["quantity"]) * Number(e['price'])
    })

    topCartQuantity.innerText = count;
    topCartTotal.textContent = formatter.format(total)

    if (count > 9) {
        topCartCount.innerText = "9+";
    }
    else {
        topCartCount.innerText = count;
    }


    if (count > 0) {
        topCartImgWrapper.classList.remove("is-active")
    } else {
        topCartImgWrapper.classList.add("is-active")
    }
})

topCartList.addEventListener("click", function (e) {
    if (e.target.matches(".top-cart-item-btn")) {
        const productName = e.target.previousElementSibling.previousElementSibling.textContent
        let count = 0;
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);

        const index = productList.findIndex((item) => item["name"].includes(productName))
        productList.splice(index, 1);
        localStorage && localStorage.setItem("productList", JSON.stringify(productList))

        if (productList.length > 0) {
            productList.forEach(e => { count += Number(e["quantity"]) })
            topCartQuantity.innerText = count;
            topCartImgWrapper.classList.remove("is-active")

            if (count > 9) {
                topCartCount.innerText = "9+";
            }
            else {
                topCartCount.innerText = count;
            }
        } else {
            topCartQuantity.innerText = "0"
            topCartCount.innerText = "0"
            topCartImgWrapper.classList.add("is-active")
        }
    }
})

