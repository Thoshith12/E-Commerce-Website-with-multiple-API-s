
let items;
let key;
let filteredItems;
let cart = [];
let main = document.querySelector('main');
let home = document.querySelector('.home');
let categories = document.querySelectorAll('.cat');
let select = document.querySelector('select');
let cartCount = document.getElementById('cartCount');
let cat = document.querySelector('#cartPage');
let cartNav = document.querySelector('#cartNav');
let removeDuplicates = [];


fetchProducts(); // Calling the function to display all products by default

async function fetchProducts() {
    cat.classList.add('cartPage')
    items = await fetch('https://dummyjson.com/products');
    let items2 = await fetch('https://fakestoreapi.com/products/');
    items = await items.json();
    items2 = await items2.json();
    items = items.products;
    items = [...items, ...items2];
    items = items.filter(e => 'OPPOF19' !== e.title);    // removing oppo smartphoine due to bad dimensions of product image
    displayData(items);
    filteredItems = items;
}

function displayData(filteredItems) {
    cat.classList.add('cartPage');
    main.innerHTML = '';
    let toHtml = filteredItems.map((product, index) => {
        return (`<article onclick='productDisplay(${index})'>
        <img src='${product?.images ? product.images[0] : product.image}'/>
        <h3>${product.title.slice(0, 15)}</h3>
        <h4>${product.description.slice(0, 300)}</h4>
        <h2>$${product.price}</h2>
    </article>`);
    });
    main.innerHTML = toHtml.join('');
}

function productDisplay(index) {
    cat.classList.add('cartPage');
    let product = filteredItems.find((e, i) => index == i);
    main.innerHTML = '';
    main.innerHTML = `<section>
    <img src='${product?.images ? product.images[0] : product.image}'/>
    <aside>
        <h3>${product.title}</h3>
        <h4>${product.description}</h4>
        <h2>$${product.price}</h2>
        <div id="btn" onclick="addToCart(${index})">Add to Cart</div>
    </aside>
    </section>`;
}

function addToCart(index) {
    let product = filteredItems.find((e, i) => index == i);
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    cartCount.innerText = cart.length;
}

home.addEventListener('click', fetchProducts);
cartNav.addEventListener('click', showCart)

select.addEventListener('change', (event) => {
    let text = select.options[select.selectedIndex].text;
    text = text.toLowerCase();
    filteredItems = items.filter((e) => text == e.category);
    displayData(filteredItems);
});

categories.forEach((category) => {
    category.addEventListener('click', (event) => {
        key = event.target.outerText.toLowerCase();
        filteredItems = items.filter(e => key == e.category);
        displayData(filteredItems);
    });
});

document.getElementById('cartNav').addEventListener('click', showCart);

function showCart() {
    let cartPage = document.getElementById('cartPage');
    let cartItems = document.getElementById('cartItems');
    let totalPrice = document.getElementById('totalPrice');
    main.innerHTML = "";
    cartItems.innerHTML = "";
    let cartTotalPrice = 0;
    cat.classList.remove('cartPage');

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let items = cart.map((product, id) => {
            let numberOfItems = 0;
            cart.forEach((e, i) => {
                if (e.title == product.title) {
                    numberOfItems += 1;
                    if (id !== i) {

                    }
                }
            })
            product.count = numberOfItems;
            cartTotalPrice += product.price;
            return product;

        });
        displayItemsInCart(items)
    }

    totalPrice.innerText = `Total Price: $${cartTotalPrice.toFixed(2)}`;

    cartPage.style.display = 'block';
}


function displayItemsInCart(items) {
    let filteredArray = [];
    items.forEach((e, i) => {
        if (!removeDuplicates.includes(e.title)) {
            removeDuplicates.push(e.title)
        }
    })
    console.log(removeDuplicates)
    removeDuplicates.forEach((t) => {
       let findItem=items.find((e)=>e.title==t);
       filteredArray.push(findItem);
    })
    console.log(filteredArray)
    cartItems.innerHTML = '';
    filteredArray.forEach((product) => {
        cartItems.innerHTML += `<article >
                <img src='${product?.images ? product.images[0] : product.image}'/>
                <h3>${product.title.slice(0, 15)}</h3>
                <h4>${product.description.slice(0, 300)}</h4>
                <h2>$${product.price}</h2>
                <h6>${product.count}</h6>
            </article>`;
    })
}