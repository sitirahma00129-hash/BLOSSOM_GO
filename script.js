// ===============================
// BLOSSOM GO E-COMMERCE SCRIPT
// ===============================


// Ambil data cart dari localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// TAMBAH PRODUK KE KERANJANG
// ===============================

const cartButtons = document.querySelectorAll(".cart-btn");


cartButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const product = button.closest(".product-card");

        const name = product.querySelector("h3").innerText;
        const priceText = product.querySelector("span").innerText;
        const image = product.querySelector("img").src;


        const price = Number(
            priceText.replace("Rp", "")
                .replace(".", "")
                .replace(".", "")
        );


        const existing = cart.find(item => item.name === name);


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                name: name,
                price: price,
                image: image,
                quantity: 1

            });

        }


        saveCart();


        alert(name + " berhasil ditambahkan ke keranjang 🛒🌸");


    });

});


// ===============================
// SIMPAN CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ===============================
// TAMPILKAN KERANJANG
// ===============================

const cartList = document.querySelector(".cart-container");


if (cartList) {

    displayCart();

}



function displayCart() {


    cartList.innerHTML = "";


    let total = 0;



    if (cart.length === 0) {

        cartList.innerHTML =

            `
        <h2>Keranjang masih kosong 🛒</h2>
        `;

        return;

    }



    cart.forEach((item, index) => {


        total += item.price * item.quantity;



        cartList.innerHTML +=


            `

        <div class="cart-item">

            <img src="${item.image}" width="100">


            <div>

                <h3>${item.name}</h3>

                <p>Rp${item.price.toLocaleString()}</p>


                <button onclick="changeQty(${index},-1)">
                -
                </button>


                <span>
                ${item.quantity}
                </span>


                <button onclick="changeQty(${index},1)">
                +
                </button>


                <br>


                <button onclick="removeItem(${index})">
                Hapus
                </button>


            </div>

        </div>


        `;


    });



    cartList.innerHTML +=


        `

    <div class="cart-summary">

        <h2>Total :
        Rp${total.toLocaleString()}
        </h2>


        <button class="checkout-btn"
        onclick="checkout()">

        Checkout

        </button>


    </div>

    `;


}



// ===============================
// JUMLAH PRODUK
// ===============================


function changeQty(index, value) {


    cart[index].quantity += value;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();


}




// ===============================
// HAPUS PRODUK
// ===============================


function removeItem(index) {


    cart.splice(index, 1);


    saveCart();

    displayCart();


}



// ===============================
// CHECKOUT
// ===============================


function checkout() {


    if (cart.length === 0) {

        alert("Keranjang masih kosong!");

        return;

    }


    window.location.href = "payment.html";


}
// ===============================
// CHECKOUT FORM
// ===============================

const checkoutForm = document.querySelector("#checkoutForm");


if (checkoutForm) {


    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const customer = {

            name: document.querySelector("#name").value,

            phone: document.querySelector("#phone").value,

            address: document.querySelector("#address").value,

            payment: document.querySelector(
                'input[name="payment"]:checked'
            ).value,


            products: cart,

            status: "Pembayaran berhasil"


        };


        localStorage.setItem(
            "order",
            JSON.stringify(customer)
        );


        localStorage.removeItem("cart");


        alert(
            "Pembayaran berhasil! Pesanan kamu sudah dibuat 🌸"
        );


        window.location.href = "order.html";


    });


}
// ===============================
// DISPLAY ORDER
// ===============================


const orderData = document.querySelector("#orderData");


if (orderData) {


    const order = JSON.parse(
        localStorage.getItem("order")
    );



    if (order) {


        let list = "";


        order.products.forEach(item => {


            list += `

<div class="cart-item">

<h3>${item.name}</h3>

<p>
Jumlah : ${item.quantity}
</p>

<p>
Harga : Rp${item.price.toLocaleString()}
</p>


</div>

`;



        });



        orderData.innerHTML = `


<div class="cart-summary">


<h2>Pesanan Berhasil 🎉</h2>


<p>
Nama : ${order.name}
</p>


<p>
Pembayaran :
${order.payment}
</p>


<p>
Alamat :
${order.address}
</p>


<h3>Status:
${order.status}
</h3>


${list}


</div>


`;



    } else {


        orderData.innerHTML =
            "<h2>Belum ada pesanan</h2>";


    }


}
// ===============================
// FILTER PRODUK
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        productCards.forEach(card => {

            if (category === "all") {

                card.style.display = "block";

            } else if (card.dataset.category === category) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});
// ===============================
// SEARCH PRODUK
// ===============================

const searchInput = document.querySelector("#search");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        productCards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(keyword)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}
// ===============================
// FILTER DARI HOME
// ===============================

const params = new URLSearchParams(window.location.search);

const selectedCategory = params.get("category");
const best = params.get("best");

const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {

    let show = true;

    if (selectedCategory) {
        show = card.dataset.category === selectedCategory;
    }

    if (best === "yes") {
        show = card.dataset.best === "yes";
    }

    card.style.display = show ? "block" : "none";

});
// ======================
// BUY NOW
// ======================

const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        window.location.href = "payment.html";

    });

});