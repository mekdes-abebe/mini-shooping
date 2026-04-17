
let cart = [];

document.addEventListener("DOMContentLoaded", function () {

    console.log("JS loaded successfully");

    // ===================== LOAD CART =====================
    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }

    // ===================== SIGNUP OPEN =====================
    document.getElementById("signupLink").onclick = function (e) {
        e.preventDefault();
        document.getElementById("authBox").style.display = "flex";
    };

    // CLOSE SIGNUP
    document.getElementById("cb").onclick = function () {
        document.getElementById("authBox").style.display = "none";
        clearSignupInputs();
    };

    // ===================== SIGNUP =====================
    document.querySelector(".ca").onclick = function () {

        let name = document.getElementById("signupName").value.trim();
        let email = document.getElementById("signupEmail").value.trim();
        let pass = document.getElementById("signupPass").value.trim();
        let confirm = document.getElementById("confirmPass").value.trim();

        if (!name || !email || !pass || !confirm) {
            alert("Fill all fields ❌");
            return;
        }

        if (pass !== confirm) {
            alert("Passwords do not match ❌");
            return;
        }

        localStorage.setItem("user", JSON.stringify({ name, email, pass }));

        alert("Signup successful ✅");
        clearSignupInputs();
        document.getElementById("authBox").style.display = "none";
    };

    // ===================== LOGIN OPEN =====================
    window.showLogin = function () {
        document.getElementById("authBox").style.display = "none";
        document.getElementById("loginBox").style.display = "block";
    };

    window.showSignup = function () {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("authBox").style.display = "flex";
    };

    window.hideLogin = function () {
        document.getElementById("loginBox").style.display = "none";
    };

    // ===================== LOGIN =====================
    document.querySelector(".wlo").onclick = function () {

        let email = document.getElementById("loginEmail").value.trim();
        let pass = document.getElementById("loginPass").value.trim();

        let user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("No user found ❌ Please sign up first");
            return;
        }

        if (email === user.email && pass === user.pass) {
            alert("Login successful 🎉");
            document.getElementById("loginBox").style.display = "none";
            clearLoginInputs();
        } else {
            alert("Wrong email or password ❌");
        }
    };

    // ===================== SEARCH =====================
//    

let searchInput = document.getElementById("searchInput");
let base = document.querySelector(".base");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        let value = this.value.toLowerCase().trim();
        let products = Array.from(document.querySelectorAll(".boxs"));

        // if search is empty → restore original order
        if (value === "") {
            products.forEach(p => {
                p.style.display = "block";
                base.appendChild(p);
            });
            return;
        }

        let matched = [];
        let unmatched = [];

        products.forEach(product => {
            let name = product.querySelector("h5").innerText.toLowerCase();

            if (name.includes(value)) {
                product.style.display = "block";
                matched.push(product);
            } else {
                product.style.display = "none";
                unmatched.push(product);
            }
        });

        // MOVE MATCHED TO TOP
        matched.forEach(product => {
            base.prepend(product);
        });

    });
}

 // ===================== VIEW ALL =====================
    let hiddenItems = document.querySelectorAll(".boxs:nth-child(n+6)");
    let viewBtn = document.getElementById("nv");
    let showingAll = false;

    hiddenItems.forEach(item => item.style.display = "none");

    if (viewBtn) {
        viewBtn.onclick = function () {

            if (!showingAll) {
                hiddenItems.forEach(item => item.style.display = "block");
                viewBtn.innerText = "Show Less ←";
                showingAll = true;
            } else {
                hiddenItems.forEach(item => item.style.display = "none");
                viewBtn.innerText = "View All →";
                showingAll = false;
            }
        };
    }

    // ===================== CART BUTTONS =====================
    document.querySelectorAll(".cart-btn").forEach(btn => {
        btn.onclick = function () {

            let name = this.dataset.name;
            let price = Number(this.dataset.price);

            let item = cart.find(i => i.name === name);

            if (item) {
                item.qty++;
            } else {
                cart.push({ name, price, qty: 1 });
            }

            updateCart();
        };
    });

});

// ===================== CART FUNCTIONS =====================
function updateCart() {

    let cartCount = document.getElementById("cartCount");
    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    let count = 0;
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
        count += item.qty;
        total += item.qty * item.price;

        let div = document.createElement("div");

        div.innerHTML = `
            <span>${item.name} (${item.qty})</span>
            <span>
                <button onclick="decreaseItem('${item.name}')">-</button>
                <button onclick="increaseItem('${item.name}')">+</button>
                ${item.qty * item.price} ETB
            </span>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotal.textContent = "Total: " + total + " ETB";

    localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseItem(name) {
    let item = cart.find(i => i.name === name);
    if (item) item.qty++;
    updateCart();
}

function decreaseItem(name) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty--;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function openCart() {
    document.getElementById("cartBox").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartBox").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty ❌");
        return;
    }

    let total = 0;
    cart.forEach(i => total += i.price * i.qty);

    alert("Order placed! Total: " + total + " ETB 🎉");

    cart = [];
    updateCart();
}

// ===================== CLEAR INPUTS =====================
function clearSignupInputs() {
    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPass").value = "";
    document.getElementById("confirmPass").value = "";
}

function clearLoginInputs() {
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPass").value = "";
}








