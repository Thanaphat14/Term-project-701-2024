const productGrid = document.getElementById('product-grid');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageNumbersContainer = document.getElementById('page-numbers');

let currentPage = 1;
const productsPerPage = 12;

let products = [
  { image: "/User Interface/Ex.image/Ex1.png", title: "Infinity Heroes Volume 01", price: "฿129" },
            { image: "/User Interface/Ex.image/Ex2.png", title: "Infinity Heroes Volume 02", price: "฿139" },
            { image: "/User Interface/Ex.image/Ex3.png", title: "Infinity Heroes Volume 03", price: "฿149" },
            { image: "/User Interface/Ex.image/Ex4.png", title: "Infinity Heroes Volume 04", price: "฿159" },
            { image: "/User Interface/Ex.image/Ex5.png", title: "Infinity Heroes Volume 05", price: "฿169" },
            { image: "/User Interface/Ex.image/Ex6.png", title: "Infinity Heroes Volume 06", price: "฿179" },
            { image: "/User Interface/Ex.image/Ex1.png", title: "Infinity Heroes Volume 07", price: "฿189" },
            { image: "/User Interface/Ex.image/Ex2.png", title: "Infinity Heroes Volume 08", price: "฿199" },
            { image: "/User Interface/Ex.image/Ex3.png", title: "Infinity Heroes Volume 09", price: "฿209" },
            { image: "/User Interface/Ex.image/Ex4.png", title: "Infinity Heroes Volume 10", price: "฿219" },
            { image: "/User Interface/Ex.image/Ex5.png", title: "Infinity Heroes Volume 11", price: "฿229" },
            { image: "/User Interface/Ex.image/Ex6.png", title: "Infinity Heroes Volume 12", price: "฿239" },
            { image: "/User Interface/Ex.image/Ex1.png", title: "Infinity Heroes Volume 13", price: "฿129" },
            { image: "/User Interface/Ex.image/Ex2.png", title: "Infinity Heroes Volume 14", price: "฿139" },
            { image: "/User Interface/Ex.image/Ex3.png", title: "Infinity Heroes Volume 15", price: "฿149" },
            { image: "/User Interface/Ex.image/Ex4.png", title: "Infinity Heroes Volume 16", price: "฿159" },
            { image: "/User Interface/Ex.image/Ex5.png", title: "Infinity Heroes Volume 17", price: "฿169" },
            { image: "/User Interface/Ex.image/Ex6.png", title: "Infinity Heroes Volume 18", price: "฿179" },
            { image: "/User Interface/Ex.image/Ex1.png", title: "Infinity Heroes Volume 19", price: "฿189" },
            { image: "/User Interface/Ex.image/Ex2.png", title: "Infinity Heroes Volume 20", price: "฿199" },
];

function displayProducts(page) {
  productGrid.innerHTML = '';
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);

  for (let i = startIndex; i < endIndex; i++) {
    const product = products[i];
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price}</p>
    `;
    productGrid.appendChild(productDiv);
  }
}

function updatePagination() {
  pageNumbersContainer.innerHTML = '';
  let totalPages = Math.ceil(products.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-number');
    if (i === currentPage) pageButton.classList.add('active');
    pageButton.onclick = () => goToPage(i);
    pageNumbersContainer.appendChild(pageButton);
  }

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

function goToPage(page) {
  currentPage = page;
  displayProducts(currentPage);
  updatePagination();
}

function changePage(step) {
  goToPage(currentPage + step);
}

displayProducts(currentPage);
updatePagination();

// Function to toggle dropdown visibility
function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
  
  // Function to sort products
  function sortProducts(order) {
    if (order === "az") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "za") {
      products.sort((a, b) => b.title.localeCompare(a.title));
    }
  
    displayProducts(currentPage);
    updatePagination();
  }
  
  // Close dropdown if clicked outside
  document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("dropdown");
    if (!event.target.closest(".filter")) {
      dropdown.style.display = "none";
    }
  });
  

//   link products page
  function displayProducts(page) {
    productGrid.innerHTML = '';
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);
  
    for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
      `;
  
      // Add a click event to navigate to the product info page
      productDiv.onclick = function() {
        window.location.href = `product-info.html?id=${i}`;
      };
  
      productGrid.appendChild(productDiv);
    }
  }
  
  