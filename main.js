import { menuArray } from "./data/data.js";

document.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        addOrderToCart(e.target.dataset.add)
    }
})

const cartArray = []

function addOrderToCart(itemData) {
    const itemObj = menuArray.filter((el) => {
        return el.name == itemData
    })[0]

    cartArray.push(itemObj)
    showCart()
    renderCart(cartArray)
}

function renderCart(arr) {
    const cartItems = document.getElementById("cart-items")
    cartItems.innerHTML = ''
    arr.forEach((item) => {
        cartItems.innerHTML += `
            <p class="cart-item">${item.name}<span class="remove" data-remove="${item.name}">Remove</span><span class="cart-item-price">£${item.price}</span></p>`
    })
}

function showCart() {
    const orderCart = document.getElementById("order-cart")
    orderCart.classList.remove("hidden")
}

function getMenuItems(arr) {
    let menuItems = ''
    
    arr.forEach((item) => {
        menuItems += 
            `<div class="menu-item">
                <p class="item-emoji">${item.emoji}</p>
                <div class='item-text'>
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-ingreds">${item.ingredients.join(' | ')}</p>
                    <p class="item-price">£${item.price}</p>
                </div>
                <button class="add-item" data-add="${item.name}">
                    +
                </button>
            </div>`
        } 
    )
    
    return menuItems
}

function renderMenuItems() {
    document.getElementById("menu-items").innerHTML = getMenuItems(menuArray)
}

renderMenuItems()