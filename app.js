let products = [];
let categories = [];
let editingProductIndex = null;
let imageData = "";


// Search and Add btns
const dashboardAddBtn = document.querySelector("#dashboard-add-btn");
const productsAddBtn = document.querySelector("#products-add-btn");
const dashboardSearch = document.querySelector("#dashboard-search");
const productsSearch = document.querySelector("#products-search");

// Popup var
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
const productList = document.querySelector("#product-list");
const saveBtn = document.querySelector(".save-btn");
const imagePreview = document.querySelector("#image-preview");
const productsContainer = document.querySelector("#products-container");

// Sidebar variables
const menuItems = document.querySelectorAll(".menu-item");
const dashboardMenu = document.querySelector("#dashboard-menu");
const productsMenu = document.querySelector("#products-menu");
const dashboardPage = document.querySelector("#dashboard-page");
const productsPage = document.querySelector("#products-page");


// Product form variables
const productForm = document.querySelector("#product-form");
const productImage = document.querySelector("#product-image");
const productName = document.querySelector("#product-name");
const category = document.querySelector("#category");
const price = document.querySelector("#price");
const quantity = document.querySelector("#quantity");
const description = document.querySelector("#description");


// Dashboard cards
const totalProducts = document.querySelector("#total-products");
const totalCategories = document.querySelector("#total-categories");
const inStock = document.querySelector("#in-stock");
const outStock = document.querySelector("#out-stock");


// Report Page variables
const reportsPage = document.querySelector("#reports-page");
const reportsMenu = document.querySelector("#reports-menu");

const reportTotalProducts = document.querySelector("#report-total-products");
const reportInStock = document.querySelector("#report-in-stock");
const reportOutStock = document.querySelector("#report-out-stock");
const reportInventoryValue = document.querySelector("#report-inventory-value");

const reportCategoryList = document.querySelector("#report-category-list");


// Settings Page
const settingsPage = document.querySelector("#settings-page");
const settingsMenu = document.querySelector("#settings-menu");
const darkMode = document.querySelector("#dark-mode");
const resetProducts = document.querySelector("#reset-products");

// Focus bar for Sidebar
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });
        item.classList.add("active");
    });
});

//  Open Popup when add button got clicked
dashboardAddBtn.addEventListener("click", () => {
    popup.setAttribute("style", "display:flex;");
    saveBtn.textContent = "Save Product";
});
productsAddBtn.addEventListener("click", () => {
    popup.setAttribute("style", "display:flex;");
    saveBtn.textContent = "Save Product";
});


//Close Popup when x got clicked
closeBtn.addEventListener("click", () => {
    popup.setAttribute("style", "display:none;");
});

//  Close Popup When Clicking Outside 
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.setAttribute("style", "display:none;");
    }

});

productImage.addEventListener("change", () => {

    const selectedFile = productImage.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = function () {

        imageData = reader.result;
        console.log(imageData);
        imagePreview.src = imageData;
        imagePreview.style.display = "block";

    };

    reader.readAsDataURL(selectedFile);

});

// Form Submission
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let productImageData = imageData;

    if (editingProductIndex !== null && imageData === "") {
        productImageData = products[editingProductIndex].image;
    }
    const product = {
        image: imageData,
        name: productName.value,
        category: category.value,
        price: Number(price.value),
        quantity: Number(quantity.value),
        description: description.value
    };
    if (editingProductIndex === null && imageData === "") {
        alert("Please upload a product image.");
        return;
    }
    if (product.name.trim() === "") {
        alert("Please enter the Product Name.");
        return;
    }
    if (product.category.trim() === "") {
        alert("Please enter Category.");
        return;
    }
    if (product.price <= 0) {
        alert("Please enter a valid price.");
        return;
    }
    if (product.description.trim() === "") {
        alert("Please enter Description.");
        return;
    }

    if (editingProductIndex === null) {
        products.push(product);
    }
    else {
        products[editingProductIndex] = product;
    }
    saveProducts();
    updateDashboard();
    updateReports();
    editingProductIndex = null;
    productList.innerHTML = "";
    displayProducts();
    displayProductCards();

    console.log(products);
    productForm.reset();
    popup.setAttribute("style", "display:none;");
    saveBtn.textContent = "Save Product";
});


// Side bar Navigation
dashboardMenu.addEventListener("click", (event) => {
    event.preventDefault();


    dashboardPage.setAttribute("style", "display:block;");
    productsPage.setAttribute("style", "display:none;");
    reportsPage.style.display = "none";
    settingsPage.style.display = "none";

});

productsMenu.addEventListener("click", (event) => {
    event.preventDefault();


    dashboardPage.setAttribute("style", "display:none;");
    reportsPage.style.display = "none";
    productsPage.setAttribute("style", "display:block;");
    settingsPage.style.display = "none";
});

reportsMenu.addEventListener("click", (event) => {
    event.preventDefault();

    dashboardPage.style.display = "none";
    productsPage.style.display = "none";
    reportsPage.style.display = "block";
    settingsPage.style.display = "none";
});

settingsMenu.addEventListener("click", (event) => {
    event.preventDefault();

    dashboardPage.style.display = "none";
    productsPage.style.display = "none";
    reportsPage.style.display = "none";
    settingsPage.style.display = "block";
});

// Product Info
function displayProduct(product, productIndex) {
    // creating table cells

    const productRow = document.createElement("tr");
    const productNameCell = document.createElement("td");
    const productCategoryCell = document.createElement("td");
    const productPriceCell = document.createElement("td");
    const productQuantityCell = document.createElement("td");
    const productStatusCell = document.createElement("td");
    const productActionCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", () => {
        // Popup cont
        popup.setAttribute("style", "display:flex;");
        productName.value = product.name;
        category.value = product.category;
        price.value = product.price;
        quantity.value = product.quantity;
        description.value = product.description;
        saveBtn.textContent = "Update Product";
        editingProductIndex = productIndex;

    });


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        const confirmDelete = confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmDelete) {
            return;
        }
        products.splice(productIndex, 1);
        saveProducts();
        updateDashboard();
        updateReports();
        displayProducts();
        displayProductCards();

    });


    productActionCell.append(editBtn, deleteBtn);
    // Setting cell values 

    productNameCell.textContent = product.name;
    productCategoryCell.textContent = product.category;
    productPriceCell.textContent = product.price;
    productQuantityCell.textContent = product.quantity;
    if (product.quantity > 0) {
        productStatusCell.textContent = "In Stock";
    }
    else {
        productStatusCell.textContent = "Out of Stock";
    }

    productRow.append(
        productNameCell,
        productCategoryCell,
        productPriceCell,
        productQuantityCell,
        productStatusCell,
        productActionCell
    );
    productList.append(productRow);

}

function displayProducts() {
    productList.innerHTML = "";
    products.forEach((product, productIndex) => {
        displayProduct(product, productIndex);
    });
}

function displayProductCard(product, productIndex) {
    const column = document.createElement("div");
    column.classList.add("col-lg-4", "col-md-6");
    column.innerHTML = `
    <div class="card shadow-sm h-100">

        <img src="${product.image}" class="card-img-top" alt="Product Image">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="text-muted mb-2">
                Category : ${product.category}
            </p>
            <p class="mb-3">
                ${product.description}
            </p>
            <h6 class="text-success fw-bold">
                ₹${product.price}
            </h6>
            <p class="mb-3">
                Quantity : ${product.quantity}
            </p>
            <span class="badge ${product.quantity > 0 ? "bg-success" : "bg-danger"}">
                ${product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
        </div>
        <div class="card-footer ">
            <div class="row g-2">

        <div class="col-6">
            <button class="btn btn-success w-100 edit-btn">
                ✏️
            </button>
        </div>

        <div class="col-6">
            <button class="btn btn-danger w-100 delete-btn">
                🗑️
            </button>
        </div>

    </div>
        </div>
    </div>
    `;
    const editBtn = column.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        // Popup cont
        popup.setAttribute("style", "display:flex;");
        productName.value = product.name;
        category.value = product.category;
        price.value = product.price;
        quantity.value = product.quantity;
        description.value = product.description;
        saveBtn.textContent = "Update Product";
        editingProductIndex = productIndex;

    });

    const deleteBtn = column.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        products.splice(productIndex, 1);
        saveProducts();
        updateDashboard();
        updateReports();
        productList.innerHTML = "";
        displayProducts();
        displayProductCards();

    });

    productsContainer.append(column);
}

function displayProductCards() {
    productsContainer.innerHTML = "";
    products.forEach((product, productIndex) => {
        displayProductCard(product, productIndex);
    });
}

// Saving the Products to localStorage
function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

function loadProducts() {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        updateDashboard();
        updateReports();
        displayProducts();
        displayProductCards();
    }
}
loadProducts();

function updateDashboard() {
    totalProducts.textContent = products.length;

    const categories = products.map(product => product.category);
    const uniqueCategories = new Set(categories);
    totalCategories.textContent = uniqueCategories.size;

    const availableProducts = products.filter(product => product.quantity > 0);
    inStock.textContent = availableProducts.length;

    outStock.textContent = products.length - availableProducts.length;
}

function updateReports() {

    reportTotalProducts.textContent = products.length;

    const availableProducts = products.filter(
        product => product.quantity > 0
    );

    reportInStock.textContent = availableProducts.length;

    reportOutStock.textContent =
        products.length - availableProducts.length;

    const inventoryValue = products.reduce(
        (total, product) =>
            total + (product.price * product.quantity),
        0
    );

    reportInventoryValue.textContent =
        `₹${inventoryValue}`;

    reportCategoryList.innerHTML = "";

    const categoryMap = {};

    products.forEach(product => {

        if (!categoryMap[product.category]) {
            categoryMap[product.category] = {
                products: 0,
                quantity: 0,
                value: 0
            };
        }

        categoryMap[product.category].products++;

        categoryMap[product.category].quantity +=
            product.quantity;

        categoryMap[product.category].value +=
            product.price * product.quantity;
    });


    Object.keys(categoryMap).forEach(category => {
        const data = categoryMap[category];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category}</td>
            <td>${data.products}</td>
            <td>${data.quantity}</td>
            <td>₹${data.value}</td>
        `;

        reportCategoryList.append(row);
    });
}

function searchProducts(searchText) {

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    productList.innerHTML = "";
    productsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No products found
                </td>
            </tr>
        `;
        productsContainer.innerHTML = `
            <div class="col-12 text-center">
                <h4 class="text-muted">No products found</h4>
            </div>
        `;

        return;
    }

    filteredProducts.forEach((product, index) => {
        displayProduct(product, index);
        displayProductCard(product, index);
    });

}

// Search bars
dashboardSearch.addEventListener("input", () => {
    searchProducts(dashboardSearch.value);
});
productsSearch.addEventListener("input", () => {
    searchProducts(productsSearch.value);
});


// Settigns page events 

darkMode.addEventListener("change", () => {

    if (darkMode.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

});

resetProducts.addEventListener("click", () => {

    const confirmReset = confirm(
        "Are you sure you want to delete all products?"
    );

    if (!confirmReset) {
        return;
    }

    products = [];

    localStorage.removeItem("products");

    updateDashboard();
    updateReports();

    displayProducts();
    displayProductCards();

    alert("All products have been deleted.");
});