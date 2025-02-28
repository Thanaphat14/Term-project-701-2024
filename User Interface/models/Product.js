const productGrid = document.getElementById('product-grid');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageNumbersContainer = document.getElementById('page-numbers');
const categoryNav = document.getElementById('categoryNav');

let currentPage = 1;
const productsPerPage = 12;

const categories = [
  { id: 1, name: "Today Deal" },
  { id: 2, name: "Best Sellers" },
  { id: 3, name: "New Arrival" },
  { id: 4, name: "Recommend" },
  { id: 5, name: "Poetry" },
];


let products = [
// Category 1: Today Deal
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "Infinity Heroes Volume 01", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "Infinity Heroes Volume 02", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "Infinity Heroes Volume 03", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "Infinity Heroes Volume 04", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "Infinity Heroes Volume 05", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "Infinity Heroes Volume 06", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "Infinity Heroes Volume 07", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "Infinity Heroes Volume 08", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "Infinity Heroes Volume 09", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "Infinity Heroes Volume 10", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "Infinity Heroes Volume 11", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "Infinity Heroes Volume 12", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "Infinity Heroes Volume 13", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "Infinity Heroes Volume 14", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "Infinity Heroes Volume 15", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "Infinity Heroes Volume 16", price: "฿129", category: "1" , author: "Infinity", brief: "onential" },

// Category 2: Best Sellers
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "Best Seller Heroes Volume 01", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "Best Seller Heroes Volume 02", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "Best Seller Heroes Volume 03", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "Best Seller Heroes Volume 04", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "Best Seller Heroes Volume 05", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "Best Seller Heroes Volume 06", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "Best Seller Heroes Volume 07", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "Best Seller Heroes Volume 08", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "Best Seller Heroes Volume 09", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "Best Seller Heroes Volume 10", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "Best Seller Heroes Volume 11", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "Best Seller Heroes Volume 12", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "Best Seller Heroes Volume 13", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "Best Seller Heroes Volume 14", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "Best Seller Heroes Volume 15", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "Best Seller Heroes Volume 16", price: "฿149", category: "2" , author: "Infinity", brief: "onential" },

// Category 3: New Arrival
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 01", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 02", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 03", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 04", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "New Arrival Heroes Volume 05", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "New Arrival Heroes Volume 06", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 07", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 08", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 09", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 10", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "New Arrival Heroes Volume 11", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "New Arrival Heroes Volume 12", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 13", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 14", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 15", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 16", price: "฿159", category: "3" , author: "Infinity", brief: "onential" },

// Category 4: Recommend
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 01", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 02", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 03", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 04", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "New Arrival Heroes Volume 05", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "New Arrival Heroes Volume 06", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 07", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 08", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 09", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 10", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "New Arrival Heroes Volume 11", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "New Arrival Heroes Volume 12", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 13", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 14", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 15", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 16", price: "฿159", category: "4" , author: "Infinity", brief: "onential" },

  // Category 5: Poetry
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 01", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 02", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 03", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 04", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "New Arrival Heroes Volume 05", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "New Arrival Heroes Volume 06", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 07", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 08", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 09", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 10", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex5.png", title: "New Arrival Heroes Volume 11", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex6.png", title: "New Arrival Heroes Volume 12", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex1.png", title: "New Arrival Heroes Volume 13", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex2.png", title: "New Arrival Heroes Volume 14", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex3.png", title: "New Arrival Heroes Volume 15", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
{ image: "/User Interface/assets/Ex.image/Ex4.png", title: "New Arrival Heroes Volume 16", price: "฿159", category: "5" , author: "Infinity", brief: "onential" },
];


// Function to render categories
function renderCategories() {
  const categoryHtml = categories.map(category => `
    <li class="nav-item">
      <a class="nav-link" href="#" data-category-id="${category.id}">
        ${category.name}
      </a>
    </li>
  `).join('');
  categoryNav.innerHTML = categoryHtml;
}


// Function to display products
function displayProducts(page, filterCategoryId) {
  productGrid.innerHTML = '';
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);


  // Filter products by category if a category is selected
  const filteredProducts = filterCategoryId
    ? products.filter(product => product.category === String(filterCategoryId))
    : products;


  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);


  // Create product elements and append to grid
  paginatedProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3><a href="/User Interface/views/product-info.html?id=${products.indexOf(product)}&category=${filterCategoryId}">${product.title}</a></h3>
      <p>${product.price}</p>
    `;
    productGrid.appendChild(productDiv);
  });
}


// Function to update pagination buttons
function updatePagination(filterCategoryId) {
  pageNumbersContainer.innerHTML = '';
  const totalProducts = filterCategoryId
    ? products.filter(product => product.category === String(filterCategoryId)).length
    : products.length;


  const totalPages = Math.ceil(totalProducts / productsPerPage);


  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-number');
    if (i === currentPage) pageButton.classList.add('active');
    pageButton.onclick = () => goToPage(i, filterCategoryId);
    pageNumbersContainer.appendChild(pageButton);
  }


  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}


// Function to go to a specific page
function goToPage(page, filterCategoryId) {
  currentPage = page;
  displayProducts(currentPage, filterCategoryId);
  updatePagination(filterCategoryId);
}


// Function to change page (next/prev)
function changePage(step, filterCategoryId) {
  goToPage(currentPage + step, filterCategoryId);
}


// Event listener for category filtering
categoryNav.addEventListener('click', function (e) {
  e.preventDefault();
  const categoryId = e.target.dataset.categoryId;
  if (categoryId) {
    currentPage = 1; // Reset to first page when category changes
    displayProducts(currentPage, categoryId);
    updatePagination(categoryId);
  }
});


// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  displayProducts(currentPage);
  updatePagination();


  // Product details logic
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const categoryId = urlParams.get('category');


  if (productId >= 0 && productId < products.length) {
    const product = products[productId];
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-title-detail').textContent = product.title;
    document.getElementById('product-author').textContent = product.author;
    document.getElementById('product-brief').textContent = product.brief;
    document.getElementById('product-category').textContent = getCategoryName(categoryId);
    document.getElementById('product-name').textContent = product.title;


    // Update breadcrumb dynamically
    updateBreadcrumb(categoryId, product.title);
  } else {
    alert('Product not found!');
  }


  function initializeCarousels() {
    createCarousel("todayDealCarousel", products.filter(p => p.category === "1"));
    createCarousel("bestSellerCarousel", products.filter(p => p.category === "2"));
    createCarousel("newArrivalCarousel", products.filter(p => p.category === "3"));
    createCarousel("recommendCarousel", products.filter(p => p.category === "4"));
    createCarousel("poetryCarousel", products.filter(p => p.category === "5"));
  }


  // Add carousel items dynamically
  const carouselItemsContainer = document.getElementById('carousel-items');
  carouselItemsContainer.innerHTML = ''; // Clear previous content
  let activeClass = 'active';


  // Loop through the products and group them in slices of 5
  for (let i = 0; i < products.length; i += 5) {
    const productSlice = products.slice(i, i + 5);
    const slideItem = document.createElement('div');
    slideItem.classList.add('carousel-item', activeClass);
    activeClass = ''; // Only the first slide gets "active" class


    const row = document.createElement('div');
    row.classList.add('row', 'justify-content-center');


    // Create individual product elements
    productSlice.forEach((product) => {
      const col = document.createElement('div');
      col.classList.add('col-6', 'col-sm-4', 'col-md-2', 'mb-3');


      const img = document.createElement('img');
      img.src = product.image;
      img.classList.add('img-fluid', 'mx-auto', 'd-block');
      img.alt = product.title;


      const productName = document.createElement('a');
      productName.href = '#';
      productName.classList.add('product-name', 'text-start', 'd-block');
      productName.textContent = product.title;


      const productPrice = document.createElement('p');
      productPrice.classList.add('product-price');
      productPrice.textContent = product.price;


      // Add product details to column
      col.appendChild(img);
      col.appendChild(productName);
      col.appendChild(productPrice);
      row.appendChild(col);
    });


    slideItem.appendChild(row);
    carouselItemsContainer.appendChild(slideItem);
  }


  // Initialize carousels
  initializeCarousels();
});


function getCategoryName(categoryId) {
  const category = categories.find(cat => cat.id === parseInt(categoryId));
  return category ? category.name : '';
}


function updateBreadcrumb(categoryId, productTitle) {
  const breadcrumbContainer = document.getElementById('breadcrumb');
  breadcrumbContainer.innerHTML = `
    <a href="/">Home</a> > <a href="/category/${categoryId}">${getCategoryName(categoryId)}</a> > ${productTitle}
  `;
}







