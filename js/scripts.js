document.addEventListener("DOMContentLoaded", function () {
    console.log("scripts.js loaded ✅");

    const yearSpan = document.getElementById("year");
    const productsSection = document.getElementById("products");
    const cartSection = document.getElementById("cart");
    const checkoutSection = document.getElementById("checkout");
    const confirmationSection = document.getElementById("confirmation");

    const productsContainer = document.getElementById("products-container");
    const cartTableBody = document.querySelector("#cart-table tbody");
    const cartTotalSpan = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const checkoutForm = document.getElementById("checkout-form");
    const confirmationContent = document.getElementById("confirmation-content");

    if (!productsContainer || !cartTableBody || !cartTotalSpan || !checkoutBtn) {
        console.error("One or more main elements are missing in the HTML.");
        return;
    }

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const products = [
        {
            id: 1,
            name: "Adopt a Beehive – Starter",
            description: "Support one small beehive and receive a digital certificate.",
            price: 40,
            image: "img/beehive-starter.jpg"
        },
        {
            id: 2,
            name: "Adopt a Beehive – Family Pack",
            description: "Help maintain two beehives and support a local beekeeper.",
            price: 75,
            image: "img/beehive-family.jpg"
        },
        {
            id: 3,
            name: "Adopt a Beehive – Premium",
            description: "Sponsor a full beehive and get exclusive updates and photos.",
            price: 120,
            image: "img/beehive-premium.jpg"
        },
        {
            id: 4,
            name: "Organic Wildflower Honey Jar",
            description: "Pure local honey from our adopted beehives.",
            price: 8,
            image: "img/honey-jar.jpg"
        },
        {
            id: 5,
            name: "Beeswax Candle Set",
            description: "Natural beeswax candles supporting sustainable beekeeping.",
            price: 15,
            image: "img/beeswax-candles.jpg"
        },
        {
            id: 6,
            name: "Wildflower Seed Mix Pack",
            description: "Plant wildflowers and create a bee-friendly garden.",
            price: 5,
            image: "img/wildflower-seeds.jpg"
        },
        {
            id: 7,
            name: "Bee-Friendly Garden Kit",
            description: "Starter kit with seeds and a small guide.",
            price: 25,
            image: "img/garden-kit.jpg"
        },
        {
            id: 8,
            name: "Sponsor a Beekeeper Suit",
            description: "Help us buy a safe protective suit for new beekeepers.",
            price: 60,
            image: "img/beekeeper-suit.jpg"
        },
        {
            id: 9,
            name: "Educational Bee School Visit",
            description: "Fund an educational session about bees for a local school.",
            price: 90,
            image: "img/bee-school-visit.jpg"
        },
        {
            id: 10,
            name: "Pollinator Friendly Tree",
            description: "Plant a tree that provides nectar and pollen for bees.",
            price: 35,
            image: "img/pollinator-tree.jpg"
        }
    ];

    let cart = [];

    function renderProducts() {
        productsContainer.innerHTML = "";

        products.forEach(product => {
            const col = document.createElement("div");
            col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text small flex-grow-1">${product.description}</p>
                        <p class="fw-bold mb-2">${product.price.toFixed(2)} €</p>
                        <button 
                            class="btn btn-warning w-100 mt-auto add-to-cart-btn" 
                            data-product-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;

            productsContainer.appendChild(col);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        renderCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    }

    function getCartTotals() {
        let subtotal = 0;
        let totalItems = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;
        });

        const discountRate = totalItems >= 3 ? 0.10 : 0;
        const discountAmount = subtotal * discountRate;

        const afterDiscount = subtotal - discountAmount;

        const taxRate = 0.10;
        const taxAmount = afterDiscount * taxRate;

        const finalTotal = afterDiscount + taxAmount;

        return {
            subtotal,
            totalItems,
            discountRate,
            discountAmount,
            taxRate,
            taxAmount,
            finalTotal
        };
    }

    function renderCart() {
        cartTableBody.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.name}</td>
                <td class="text-center">${item.quantity}</td>
                <td class="text-end">${item.price.toFixed(2)}</td>
                <td class="text-end">${subtotal.toFixed(2)}</td>
                <td class="text-center">
                    <button 
                        class="btn btn-sm btn-outline-danger remove-item-btn" 
                        data-product-id="${item.id}">
                        Remove
                    </button>
                </td>
            `;
            cartTableBody.appendChild(tr);
        });

        cartTotalSpan.textContent = total.toFixed(2);
        checkoutBtn.disabled = cart.length === 0;
    }

    function showCheckoutSection() {
        if (!checkoutSection) return;
        checkoutSection.classList.remove("d-none");
        checkoutSection.scrollIntoView({ behavior: "smooth" });
    }

    function validateCheckoutForm() {
        if (!checkoutForm) return null;

        const fullNameInput = document.getElementById("fullName");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const addressInput = document.getElementById("address");
        const zipInput = document.getElementById("zip");
        const cityInput = document.getElementById("city");
        const countryInput = document.getElementById("country");

        [fullNameInput, emailInput, phoneInput, addressInput, zipInput, cityInput, countryInput]
            .forEach(input => input.classList.remove("is-invalid"));

        let isValid = true;

        if (!fullNameInput.value.trim()) {
            fullNameInput.classList.add("is-invalid");
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (!emailValue || !emailValue.includes("@") || !emailValue.includes(".")) {
            emailInput.classList.add("is-invalid");
            isValid = false;
        }

        const phoneValue = phoneInput.value.trim();
        if (!/^[0-9]+$/.test(phoneValue)) {
            phoneInput.classList.add("is-invalid");
            isValid = false;
        }

        if (!addressInput.value.trim()) {
            addressInput.classList.add("is-invalid");
            isValid = false;
        }

        const zipValue = zipInput.value.trim();
        if (!zipValue || zipValue.length > 6) {
            zipInput.classList.add("is-invalid");
            isValid = false;
        }

        if (!cityInput.value.trim()) {
            cityInput.classList.add("is-invalid");
            isValid = false;
        }

        if (!countryInput.value.trim()) {
            countryInput.classList.add("is-invalid");
            isValid = false;
        }

        if (!isValid) {
            return null;
        }

        return {
            fullName: fullNameInput.value.trim(),
            email: emailValue,
            phone: phoneValue,
            address: addressInput.value.trim(),
            zip: zipValue,
            city: cityInput.value.trim(),
            country: countryInput.value.trim()
        };
    }

    function showConfirmation(donorData) {
        if (!confirmationSection || !confirmationContent) return;

        const totals = getCartTotals();

        if (productsSection) productsSection.classList.add("d-none");
        if (cartSection) cartSection.classList.add("d-none");
        if (checkoutSection) checkoutSection.classList.add("d-none");

        confirmationSection.classList.remove("d-none");
        confirmationSection.scrollIntoView({ behavior: "smooth" });

        let itemsHtml = "";
        cart.forEach(item => {
            itemsHtml += `
                <tr>
                    <td>${item.name}</td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-end">${item.price.toFixed(2)}</td>
                    <td class="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        });

        confirmationContent.innerHTML = `
            <div class="col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-header bg-warning-subtle">
                        <h5 class="mb-0">Order Summary</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive mb-3">
                            <table class="table table-sm align-middle">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th class="text-center">Qty</th>
                                        <th class="text-end">Price (€)</th>
                                        <th class="text-end">Subtotal (€)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHtml}
                                </tbody>
                            </table>
                        </div>
                        <ul class="list-group small">
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Subtotal</span>
                                <strong>${totals.subtotal.toFixed(2)} €</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Discount (3+ items)</span>
                                <strong class="${totals.discountAmount > 0 ? 'text-success' : 'text-muted'}">
                                    -${totals.discountAmount.toFixed(2)} €
                                </strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Tax (10%)</span>
                                <strong>${totals.taxAmount.toFixed(2)} €</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total to pay</span>
                                <strong>${totals.finalTotal.toFixed(2)} €</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0">Donor Details</h5>
                    </div>
                    <div class="card-body">
                        <p class="mb-1"><strong>Name:</strong> ${donorData.fullName}</p>
                        <p class="mb-1"><strong>Email:</strong> ${donorData.email}</p>
                        <p class="mb-1"><strong>Phone:</strong> ${donorData.phone}</p>
                        <p class="mb-1">
                            <strong>Address:</strong> 
                            ${donorData.address}, ${donorData.zip} ${donorData.city}, ${donorData.country}
                        </p>
                        <hr>
                        <p class="small text-muted mb-0">
                            This is a fictional charity project created for a Web Technology assignment.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    productsContainer.addEventListener("click", function (event) {
        const btn = event.target.closest(".add-to-cart-btn");
        if (!btn) return;

        const id = Number(btn.dataset.productId);
        addToCart(id);
    });

    cartTableBody.addEventListener("click", function (event) {
        const btn = event.target.closest(".remove-item-btn");
        if (!btn) return;

        const id = Number(btn.dataset.productId);
        removeFromCart(id);
    });

    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) return;
        showCheckoutSection();
    });

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (cart.length === 0) {
                alert("Your cart is empty. Please add at least one item.");
                return;
            }

            const donorData = validateCheckoutForm();
            if (!donorData) {
                return;
            }

            showConfirmation(donorData);
        });
    }
    renderProducts();
    renderCart();
});