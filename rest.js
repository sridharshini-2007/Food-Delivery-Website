const menus = {
    "Spice Garden": [
        {
            name: "Chicken Biryani",
            price: 180,
            emoji: "🍗",
            description: "Aromatic basmati rice with spicy chicken."
        },
        {
            name: "Veg Meals",
            price: 120,
            emoji: "🍛",
            description: "Traditional South Indian meals."
        },
        {
            name: "Paneer Butter Masala",
            price: 160,
            emoji: "🥘",
            description: "Creamy paneer cooked in rich tomato gravy."
        },
        {
            name: "Parotta",
            price: 50,
            emoji: "🥞",
            description: "Soft and flaky layered parotta."
        }
    ],
    "Pizza Palace": [
        {
            name: "Margherita Pizza",
            price: 220,
            emoji: "🍕",
            description: "Classic pizza with tomato and mozzarella."
        },
        {
            name: "Chicken Pizza",
            price: 280,
            emoji: "🍕",
            description: "Loaded pizza with spicy chicken."
        },
        {
            name: "Cheese Burst Pizza",
            price: 300,
            emoji: "🧀",
            description: "Extra cheesy pizza with cheese-filled crust."
        },
        {
            name: "Garlic Bread",
            price: 120,
            emoji: "🥖",
            description: "Freshly baked garlic bread."
        }
    ],
    "Burger Point": [
        {
            name: "Chicken Burger",
            price: 160,
            emoji: "🍔",
            description: "Juicy chicken patty with fresh vegetables."
        },
        {
            name: "Veg Burger",
            price: 120,
            emoji: "🍔",
            description: "Crispy vegetarian patty burger."
        },
        {
            name: "French Fries",
            price: 90,
            emoji: "🍟",
            description: "Crispy golden French fries."
        },
        {
            name: "Cold Drink",
            price: 60,
            emoji: "🥤",
            description: "Chilled refreshing beverage."
        }
    ],
    "Green Leaf": [
        {
            name: "Veg Salad",
            price: 130,
            emoji: "🥗",
            description: "Fresh healthy vegetable salad."
        },
        {
            name: "Fruit Bowl",
            price: 150,
            emoji: "🍎",
            description: "Fresh seasonal fruits."
        },
        {
            name: "Paneer Salad",
            price: 170,
            emoji: "🥗",
            description: "Healthy salad with grilled paneer."
        },
        {
            name: "Fresh Juice",
            price: 90,
            emoji: "🧃",
            description: "Freshly prepared fruit juice."
        }
    ]
};
let cart = [];
let selectedRestaurant = "";

function showPage(pageId, button) {
    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });
    document
        .getElementById(pageId)
        .classList.add("active");

        document
        .querySelectorAll("nav button")
        .forEach(btn => {

            btn.classList.remove("active");
        });

    if(button) {
        button.classList.add("active");
    }
    if(pageId === "ownerPage") {
        loadOwnerOrders();
    }
    if(pageId === "profilePage") {
        loadProfileOrders();
    }
}
function searchRestaurants() {
    const search =document.getElementById("searchInput").value.toLowerCase();

    document
        .querySelectorAll(".restaurant-card")
        .forEach(card => {

            const name =card.dataset.name.toLowerCase();

            if(name.includes(search)) {
                card.style.display = "block";
            }
            else {
                card.style.display = "none";
            }
        });
}

function openRestaurant(name) {
    selectedRestaurant = name;
    document.getElementById("selectedRestaurant").innerText = name;

    const descriptions = {
        "Spice Garden":
            "Delicious South Indian food and biryani.",

        "Pizza Palace":
            "Freshly baked Italian pizzas.",

        "Burger Point":
            "Juicy burgers, crispy fries and drinks.",

        "Green Leaf":
            "Healthy and delicious vegetarian food."
    };

    document.getElementById("restaurantDescription").innerText = descriptions[name];

    const menuGrid =document.getElementById("menuGrid");

    menuGrid.innerHTML = "";
    menus[name].forEach((food, index) => {
        menuGrid.innerHTML += `
            <div class="food-card">
                <div class="food-details">
                    <h3>
                        ${food.name}
                    </h3>
                    <p>
                        ${food.description}
                    </p>
                    <span class="food-price">
                        ₹${food.price}
                    </span>
                    <br>
                    <button
                        class="add-button"
                        onclick="addToCart('${name}', ${index})">
                        ADD +
                    </button>
                </div>
                <div class="food-image">
                    ${food.emoji}
                </div>
            </div>
        `;
    });

    document.getElementById("menuSection").classList.remove("hidden");

    document.getElementById("menuSection").scrollIntoView({
            behavior: "smooth"
        });

}

function closeMenu() {
    document.getElementById("menuSection").classList.add("hidden");
}

function addToCart(restaurant, index) {
    const food =menus[restaurant][index];
    const existing =
        cart.find(item =>
            item.name === food.name &&
            item.restaurant === restaurant
        );
    if(existing) {
        existing.quantity++;
    }
    else {
        cart.push({
            restaurant: restaurant,
            name: food.name,
            price: food.price,
            quantity: 1
        });
    }
    updateCart();
    showToast(food.name + " added to cart!");
}

function updateCart() {
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });

    document.getElementById("cartCount").innerText = count;
}

function openCart() {
    const cartItems =
        document.getElementById("cartItems");
    cartItems.innerHTML = "";

    if(cart.length === 0) {
        cartItems.innerHTML = `
            <p style="text-align:center;padding:30px;">
                🛒 Your cart is empty.
            </p>
        `;
        document
            .getElementById("cartTotal")
            .innerText = "₹0";
    }
    else {
        let total = 0;
        cart.forEach((item, index) => {
            total +=
                item.price * item.quantity;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4>
                            ${item.name}
                        </h4>
                        <small>
                            ${item.restaurant}
                        </small>
                        <br>
                        ₹${item.price}
                    </div>
                    <div class="quantity">
                        <button
                            onclick="changeQuantity(${index}, -1)">
                            -
                        </button>
                        <span>
                            ${item.quantity}
                        </span>
                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>
                    </div>
                </div>
            `;
        });

        document.getElementById("cartTotal").innerText = "₹" + total;
    }
    document.getElementById("cartModal").classList.add("show");
}

function closeCart() {
    document.getElementById("cartModal").classList.remove("show");
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if(cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
    openCart();
}

function placeOrder() {
    if(cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }
    const total =
        cart.reduce(
            (sum, item) =>
            sum + item.price * item.quantity,
            0
        );
    const orders =
        JSON.parse(
            localStorage.getItem("foodOrders")
        ) || [];

    const order = {
        id:
            "FH" +
            Math.floor(
                10000 +
                Math.random() * 90000
            ),
        restaurant:
            cart[0].restaurant,
        items:
            [...cart],
        total:
            total,
        status:
            "Pending",
        date:
            new Date().toLocaleString()
    };
    orders.push(order);
    localStorage.setItem(
        "foodOrders",
        JSON.stringify(orders)
    );
    cart = [];
    updateCart();
    closeCart();
    showToast("Order placed successfully! 🎉");
}

function loadOwnerOrders() {
    const orders =
        JSON.parse(
            localStorage.getItem("foodOrders")
        ) || [];

    document.getElementById("totalOrders").innerText = orders.length;

    const pending =orders.filter(order =>order.status !== "Delivered").length;

    const delivered =orders.filter(order =>order.status === "Delivered").length;

    const sales =orders.reduce((sum, order) =>sum + order.total,0);

    document.getElementById("pendingOrders").innerText = pending;

    document.getElementById("deliveredOrders").innerText = delivered;
 
    document.getElementById("totalSales").innerText = "₹" + sales;

    const container = document.getElementById("ordersContainer");

    container.innerHTML = "";
    if(orders.length === 0) {
        container.innerHTML = `
            <div class="order-card">
                <p>
                    📦 No orders received yet.
                </p>
            </div>
        `;
        return;
    }

    orders
        .slice()
        .reverse()
        .forEach((order, reverseIndex) => {
            const index =
                orders.length -
                1 -
                reverseIndex;
            let items = "";
            order.items.forEach(item => {
                items += `
                    <li>
                        ${item.name}
                        × ${item.quantity}
                    </li>
                `;
            });
            let nextButton = "";
            if(order.status === "Pending") {
                nextButton = `
                    <button
                        class="status-button"
                        onclick="updateStatus(${index}, 'Preparing')">
                        Start Preparing
                    </button>
                `;
            }
            else if(
                order.status === "Preparing"
            ) {
                nextButton = `
                    <button
                        class="status-button"
                        onclick="updateStatus(${index}, 'Out for Delivery')">
                        Out for Delivery
                    </button>
                `;
            }
            else if(
                order.status === "Out for Delivery"
            ) {
                nextButton = `
                    <button
                        class="status-button"
                        onclick="updateStatus(${index}, 'Delivered')">
                        Mark Delivered
                    </button>
                `;
            }
            container.innerHTML += `
                <div class="order-card">
                    <div class="order-top">
                        <div>
                            <h3>
                                Order #${order.id}
                            </h3>
                            <small>
                                ${order.date}
                            </small>
                        </div>
                        <span class="order-status">
                            ${order.status}
                        </span>
                    </div>
                    <p>
                        <strong>
                            Restaurant:
                        </strong>
                        ${order.restaurant}
                    </p>
                    <ul class="order-items">
                        ${items}
                    </ul>
                    <div class="order-total">
                        Total:
                        ₹${order.total}
                    </div>
                    ${nextButton}
                </div>
            `;
        });
}

function updateStatus(index, status) {
    const orders = JSON.parse(
            localStorage.getItem("foodOrders")
        ) || [];

    orders[index].status = status;

    localStorage.setItem(
        "foodOrders",
        JSON.stringify(orders)
    );
    loadOwnerOrders();
    showToast("Order status updated!");
}

function loadProfileOrders() {

    const orders =JSON.parse(
            localStorage.getItem("foodOrders")
        ) || [];

    const container = document.getElementById("profileOrders");

    if(orders.length === 0) {
        container.innerHTML = `
            <p>
                You haven't placed any orders yet.
            </p>
        `;
        return;
    }
    container.innerHTML = "";
    orders
        .slice()
        .reverse()
        .forEach(order => {
            container.innerHTML += `
                <div class="profile-row">
                    <strong>
                        ${order.restaurant}
                    </strong>
                    <br>
                    <span>
                        Order #${order.id}
                    </span>
                    <br>
                    <span>
                        ₹${order.total}
                    </span>
                    <br>
                    <span>
                        Status:
                        ${order.status}
                    </span>
                </div>
            `;
        });
}

function showToast(message) {
    const toast =
        document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}
updateCart();
loadOwnerOrders();
loadProfileOrders();
