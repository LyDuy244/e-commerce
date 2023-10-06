const cartImageWrapper = document.querySelector(".cart-image-wrapper")
const cartList = document.querySelector(".cart-list")
const summaryQuantity = document.querySelector(".summary-quantity")
const summaryTotalProduct = document.querySelector(".summary-total-product")
const summaryTotal = document.querySelector(".summary-total-price")

function createCartItem(obj) {
    const template = `<div class="cart-item">
                            <div class="cart-image">
                                <img src="${obj.image}" alt="">
                            </div>
                            <div class="cart-detail">
                                <h3 class="cart-item-name">${obj.name}</h3>
                                <p class="cart-item-price">${formatter.format(obj.price)}</p>
                            </div>
                            <div class="cart-item-quantity">
                                <button class="cart-item-button cart-item-button-prev">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <span class="cart-item-number">${obj.quantity}</span>
                                <button class="cart-item-button cart-item-button-next">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div class="cart-item-total">${formatter.format(obj.price * obj.quantity)}</div>
                            <button class="cart-item-button cart-item-button-remove">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>`

    cartList.insertAdjacentHTML("beforeend", template)
}

if (Array.isArray(productList) && productList.length > 0) {
    let quantity = 0;
    let total = 0;
    productList.forEach(e => {
        quantity += Number(e["quantity"])
        total += Number(e["quantity"]) * Number(e['price'])
        createCartItem(e)
    })
    summaryQuantity.innerText = quantity;
    summaryTotalProduct.innerHTML = formatter.format(total);
    summaryTotal.innerHTML = formatter.format(total + 20000)
    cartImageWrapper.classList.remove("is-active")
} else {
    cartImageWrapper.classList.add("is-active")
}

cartList.addEventListener("click", function (e) {
    let quantityItem = 0;
    let total = 0;

    if (e.target.matches(".cart-item-button-next")) {
        const cartItem = e.target.closest(".cart-item")
        const itemName = cartItem.querySelector(".cart-item-name").textContent;
        const itemQuantity = e.target.previousElementSibling
        let quantity = Number(itemQuantity.textContent);
        quantity++;
        itemQuantity.textContent = quantity;
        const index = productList.findIndex((item) => item["name"].includes(itemName))
        productList[index]["quantity"] = quantity;

        localStorage && localStorage.setItem("productList", JSON.stringify(productList))

    } else if (e.target.matches(".cart-item-button-prev")) {
        const cartItem = e.target.closest(".cart-item")
        const itemName = cartItem.querySelector(".cart-item-name").textContent;
        const itemQuantity = e.target.nextElementSibling
        let quantity = Number(itemQuantity.textContent);
        if (quantity === 1) {
            return;
        }
        quantity--
        itemQuantity.textContent = quantity;
        const index = productList.findIndex((item) => item["name"].includes(itemName))
        productList[index]["quantity"] = quantity;

        localStorage && localStorage.setItem("productList", JSON.stringify(productList))

    } else if (e.target.matches(".cart-item-button-remove")) {
        if (confirm("Bạn có chắc chắn xóa sản phẩm này chứ?")) {
            const cartItem = e.target.closest(".cart-item")
            const itemName = cartItem.querySelector(".cart-item-name").textContent;
            const index = productList.findIndex((item) => item["name"].includes(itemName))
            productList.splice(index, 1);
            localStorage && localStorage.setItem("productList", JSON.stringify(productList))
        } else {
            return;
        }
    }

    cartList.innerHTML = "";
    topCartList.innerHTML = ""

    productList.forEach(e => {
        quantityItem += Number(e["quantity"])
        total += Number(e["quantity"]) * Number(e['price'])
        createCartItem(e)
        createProductItemInCart(e)
    })


    summaryQuantity.innerText = quantityItem;
    topCartQuantity.innerText = quantityItem;

    summaryTotalProduct.innerHTML = formatter.format(total);
    summaryTotal.innerHTML = formatter.format(total + 20000)

    topCartTotal.textContent = formatter.format(total)
    
    if (quantityItem > 9) {
        topCartCount.innerText = "9+";
    }
    else {
        topCartCount.innerText = quantityItem;
    }

    if (quantityItem > 0) {
        topCartImgWrapper.classList.remove("is-active")
        cartImageWrapper.classList.remove("is-active")
    } else {
        topCartImgWrapper.classList.add("is-active")
        cartImageWrapper.classList.add("is-active")
    }
})