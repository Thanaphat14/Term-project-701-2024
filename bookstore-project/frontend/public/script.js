$(document).ready(() => {
    fetchBooks();
    
    $('#add-book-btn').click(addBook);
});

async function fetchBooks() {
    try {
        const response = await $.ajax({
            url: '/api/books',
            method: 'GET'
        });
        displayBooks(response);
    } catch (err) {
        console.error('Error fetching books:', err);
    }
}

function displayBooks(books) {
    $('#books').empty();
    books.forEach(book => {
        $('#books').append(`
            <div>
                <strong>${book.title}</strong> by ${book.author} - $${book.price}
            </div>
        `);
    });
}

async function addBook() {
    const bookData = {
        title: $('#title').val(),
        author: $('#author').val(),
        price: $('#price').val()
    };

    try {
        const response = await $.ajax({
            url: '/api/books',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(bookData)
        });

        if (response.id) {
            fetchBooks();
            $('#title, #author, #price').val('');
        }
    } catch (err) {
        console.error('Error adding book:', err);
    }
}