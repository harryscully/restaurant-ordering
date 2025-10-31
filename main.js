import { menuArray } from "./data/data.js";

document.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        addOrderToCart(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeItemFromCart(e.target.dataset.remove)
    } else if (e.target.id == "complete-order") {
        showPaymentModal()
    } else if (e.target.id == "pay") {
        // hidePaymentModal()
    }
})

const cartArray = []

function addOrderToCart(itemData) {
    const itemObj = menuArray.filter((el) => {
        return el.name == itemData
    })[0]
    const existingItem = cartArray.find(item => item.name == itemData)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cartArray.push({...itemObj, quantity: 1})
    }

    showCart()
    renderCart(cartArray)
}

function removeItemFromCart(itemData) {
    const item = cartArray.find(el => el.name == itemData)

    if (item.quantity > 1) {
        item.quantity -= 1
    } else {
        const itemIndex = cartArray.findIndex(el => el.name == itemData)
        if (itemIndex !== -1) {
            cartArray.splice(itemIndex,1)
        }
    }
    
    if (cartArray.length) {
        renderCart(cartArray)
    } else {
        hideCart()
    }
}

function renderCart(arr) {
    const cartItems = document.getElementById("cart-items")
    cartItems.innerHTML = ''
    arr.forEach((item) => {
        cartItems.innerHTML += `
            <p class="cart-item">${item.name} ${item.quantity > 1 ? `x${item.quantity}` : ``}<span class="remove" data-remove="${item.name}">Remove</span><span class="cart-item-price">£${item.price * item.quantity}</span></p>`
    })

    document.getElementById("total-price").textContent = `£${calculateTotalPrice(arr)}`
}

function calculateTotalPrice(arr) {
    return arr.reduce((total, item) => {
        return total + (item.quantity * item.price)
    }, 0)
}

function showCart() {
    const orderCart = document.getElementById("order-cart")
    orderCart.classList.remove("hidden")
}

function hideCart() {
    const orderCart = document.getElementById("order-cart")
    orderCart.classList.add("hidden")
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

function showPaymentModal() {
    document.getElementById("my-modal").classList.toggle("hidden")
}

function hidePaymentModal() {
    document.getElementById("my-modal").classList.add("hidden")
}

renderMenuItems()