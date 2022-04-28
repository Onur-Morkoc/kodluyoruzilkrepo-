var menu = [
    {
        id: 1,
        title: "Tteokbokki",
        category: "Korea",
        price: 10.99,
        img:
            "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
        desc: `Spicy rice cakes, serving with fish cake.`,
    },
    {
        id: 2,
        title: "Chicken Ramen",
        category: "Japan",
        price: 7.99,
        img:
            "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
        desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
    },
    {
        id: 3,
        title: "Bibimbap",
        category: "Korea",
        price: 8.99,
        img:
            "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
        desc: `Boiling vegetables, serving with special hot sauce`,
    },
    {
        id: 4,
        title: "Dan Dan Mian",
        category: "China",
        price: 5.99,
        img:
            "https://www.savingdessert.com/wp-content/uploads/2019/02/Dan-Dan-Noodles-10.jpg",
        desc: `Dan dan noodle, serving with green onion `,
    },
    {
        id: 5,
        title: "Yangzhou Fried Rice",
        category: "China",
        price: 12.99,
        img:
            "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
        desc: `Yangzhou style fried rice, serving with bean and pickles `,
    },
    {
        id: 6,
        title: "Onigiri",
        category: "Japan",
        price: 9.99,
        img:
            "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
        desc: `Rice Sandwich, serving with soy sauce`,
    },
    {
        id: 7,
        title: "Jajangmyeon",
        category: "Korea",
        price: 15.99,
        img:
            "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
        desc: `Black bean sauce noodle, serving with green onion `,
    },
    {
        id: 8,
        title: "Ma Yi Shang Shu",
        category: "China",
        price: 12.99,
        img:
            "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
        desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
    },

];

let orders = []
let money = 2120

let singleItemList = document.querySelector("#singleItem");
let countryBtns = document.getElementById("btngrp");
let title_html = document.querySelector(".title");

let money_html = document.getElementsByClassName('money')

let countries = menu.map((element) => element.category);
let uniCountry = [...new Set(countries)];
let bgImage = "https://w7.pngwing.com/pngs/921/363/png-transparent-white-dot-background-white-dot-background.png"
document.body.style.backgroundImage = `url(${bgImage})`;

uniCountry.unshift("All");
uniCountry.push("Orders");

let buttons = "";
for (let ele of uniCountry) {//disabled
    if (ele == "Orders") buttons += `<button class="btn btn-primary btn-item orders" id='${ele}' onclick="filtercountry('${ele}')">${ele}</button>`;
    else buttons += `<button class="btn btn-outline-dark btn-item" id='${ele}' onclick="filtercountry('${ele}')">${ele}</button>`;
}

countryBtns.innerHTML = buttons;
title_html.innerHTML += `<h3 class=money>Money: ₺${money}</h3>`
showMenu(menu)


var category = "All"
function filtercountry(b) {
    if (b === "All") {
        showMenu(menu)
        category = "All"
    } else if (b === "Orders") {
        showOrders(orders)
        category = "Orders"
    } else {
        let filteredcountry = menu.filter(a => a.category === b)
        showMenu(filteredcountry)
        category = b
    }
}


function coin(array) {

    let coins = array.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.size * currentValue.price
    }, 0)
    if ((money - coins) >= 0)
        money_html[0].innerHTML = `<h3 class=money>Money: ₺${(money - coins).toFixed(2)}</h3>`

}

function deleteMenu(id) {
    var filtered = menu.filter(c => { return c.id != id });
    menu = [...filtered]
    singleItemList.innerHTML = ``
    filtercountry(category)

}

function deleteOrders(id) {

    var filtered = orders.filter(c => { return c.id != id });
    let elementIndex = orders.findIndex((obj => obj.id == id));
    if (orders[elementIndex].size > 1) {
        orders[elementIndex].size--
    } else {
        orders = [...filtered]
    }
    singleItemList.innerHTML = ``
    filtercountry(category)
    coin(orders)
}

function addOrders(id, title, category, price, img, desc) {
    var filtered = orders.filter(c => { return c.id == id });
    if (!filtered.length) {
        orders.push({ id, title, category, price, img, desc, size: 1 })


    } else {
        let elementIndex = orders.findIndex((obj => obj.id == id));
        orders[elementIndex].size++


    }
    coin(orders)

}

function showMenu(menuone) {
    let items = "";
    menuone.forEach((item, index) => {
        items += `
        
        <div class="menu-items col-6 p-3">
        <img src="${item.img}" alt="Tteokbokki" class="photo">
        <div class="menu-info">
          <div class="menu-title">
            <h4>${item.title}</h4>
            <h4 class="price">₺ ${item.price}</h4>
          </div>
          <div class="menu-text">
            ${item.desc}
          </div>
          <div>
          <button class="btn btn-outline-success" 
          onclick="addOrders('${item.id}','${item.title}','${item.category}','${item.price}','${item.img}','${item.desc}')">Order</button>
        </div>
        </div>
      </div>
        `;
    });
    singleItemList.innerHTML = items;
}

function showOrders(menuone) {
    let items = "";
    menuone.forEach((item, index) => {
        items += `
              
        <div class="menu-items col-6 p-3">
        <img src="${item.img}" alt="Tteokbokki" class="photo">
        <div class="menu-info">
          <div class="menu-title">
            <h4>${item.title}</h4>
            <h4 class="price">${item.size != 1 ? `${item.size} X ₺ ${item.price} = ${(item.size * item.price).toFixed(2)}` : `${item.price}`}  </h4>
          </div>
          <div class="menu-text">
            ${item.desc}
          </div>
          <div>
          <button class="btn btn-outline-danger" onclick="deleteOrders('${item.id}')">Delete</button>
        </div>
        </div>
      </div>
        `;
    });
    singleItemList.innerHTML = items;
}









