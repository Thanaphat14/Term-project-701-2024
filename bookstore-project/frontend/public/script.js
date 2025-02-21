let selectedTags = [];
$(document).ready(() => {
    fetchBooks();
    fetchTags();
    
    $('#add-book-btn').click(addBook);
    $('#add-tag-btn').click(addTag);
    $('#filter-btn').click(applyFilters);  
});

// Book operations
async function fetchBooks() {
    try {
        $('#books').html('<div class="loading">Loading books...</div>');
        const response = await $.ajax({
            url: `/api/books${selectedTags.length ? `?tags=${selectedTags.join(',')}` : ''}`,
            method: 'GET'
        });
        displayBooks(response);
    } catch (err) {
        console.error('Error fetching books:', err);
        $('#books').html(`<div class="error-message">Error loading books: ${err.responseJSON?.error || err.statusText}</div>`);
    }
}

function displayBooks(books) {
    $('#books').empty();
    books.forEach(book => {
        $('#books').append(`
            <div class="book-card">
                <img src="${book.image}" alt="${book.title} image" class="book-image">
                <div class="book-card-content">
                    <h3>${book.title}</h3>
                    <p>Seller: ${book.seller || 'Unknown'}</p>
                    ${book.description ? `<p>${book.description}</p>` : ''}
                    <p>Price: $${book.price} ${book.discounted_price ? 
                        `<del>$${book.discounted_price}</del>` : ''}</p>
                    <div class="tags">Tags: ${book.tags?.join(', ') || 'None'}</div>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                </div>
            </div>
        `);
    });
}


async function addBook() {
    const bookData = {
        title: $('#book-title').val(),
        seller: $('#seller').val(),
        description: $('#description').val(),
        price: $('#price').val(),
        discounted_price: $('#discounted-price').val() || null
    };

    try {
        await $.ajax({
            url: '/api/books',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(bookData)
        });
        fetchBooks();
    } catch (err) {
        console.error('Error adding book:', err);
    }
}

async function deleteBook(id) {
    try {
        await $.ajax({
            url: `/api/books/${id}`,
            method: 'DELETE'
        });
        fetchBooks();
    } catch (err) {
        console.error('Error deleting book:', err);
    }
}

// Tag operations
async function fetchTags() {
    try {
        $('#tags').html('<div class="loading">Loading tags...</div>');
        const response = await $.ajax({
            url: '/api/tags',
            method: 'GET'
        });
        populateTagFilter(response);
        displayTags(response);
    } catch (err) {
        console.error('Error fetching tags:', err);
    }
}

function populateTagFilter(tags) {
    const container = $('#tag-container');
    container.empty();
    
    tags.forEach(tag => {
        const isSelected = selectedTags.includes(tag.name);
        container.append(`
            <div class="filter-tag ${isSelected ? 'selected' : ''}" 
                 data-tag="${tag.name}">
                ${tag.name}
            </div>
        `);
    });

    // Add click handlers
    $('.filter-tag').off('click').on('click', function() {
        const tag = $(this).data('tag');
        toggleTag(tag);
    });
}

function toggleTag(tag) {
    const index = selectedTags.indexOf(tag);
    
    if (index === -1) {
        selectedTags.push(tag);
    } else {
        selectedTags.splice(index, 1);
    }
    
    // Update visual state
    $(`.filter-tag[data-tag="${tag}"]`).toggleClass('selected');
}



function displayTags(tags) {
    $('#tags').empty();
    tags.forEach(tag => {
        $('#tags').append(`
            <div class="tag-card">
                <span>${tag.name}</span>
                <button onclick="deleteTag(${tag.id})">Delete</button>
            </div>
        `);
    });
}

async function addTag() {
    const name = $('#tag-name').val().trim();
    if (!name) {
        alert('Please enter a tag name');
        return;
    }

    try {
        const response = await $.ajax({
            url: '/api/tags',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name })
        });
        
        if (response.id) {
            fetchTags();
            $('#tag-name').val('');
        }
    } catch (err) {
        alert(`Error adding tag: ${err.responseJSON?.error || err.statusText}`);
    }
}

async function deleteTag(id) {
    try {
        await $.ajax({
            url: `/api/tags/${id}`,
            method: 'DELETE'
        });
        fetchTags();
    } catch (err) {
        console.error('Error deleting tag:', err);
    }
}

// Filtering
function applyFilters() {
    fetchBooks(selectedTags);
}

function resetFilters() {
    selectedTags = [];
    $('.filter-tag').removeClass('selected');
    fetchBooks();
}