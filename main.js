import { menuArray } from "./data/data.js";

function getMenuItems(arr) {
    let menuItems = ''
    
    arr.forEach((item) => {
        menuItems += 
            `<div class="menu-item">
                <p>${item.emoji}</p>
                <div class='item-text'>
                    <h3>${item.name}</h3>
                    <p>${item.ingredients.join(', ')}</p>
                    <p>£${item.price}</p>
                </div>
                <p class="add-item">+</p>
            </div>`
        } 
    )
    
    return menuItems
}

function renderMenuItems() {
    document.getElementById("menu-items").innerHTML = getMenuItems(menuArray)
}

renderMenuItems()