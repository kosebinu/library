const newBookButton = document.getElementById('new-book-button');
const bookFormDialog = document.getElementById('book-form-dialog');
const bookForm = document.getElementById('book-form');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

// This add books to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="toggle-read" data-index="${index}">Toggle Read</button>
            <button class="remove-book" data-index="${index}">Remove</button>
        `;
        libraryDiv.appendChild(bookCard);
    });

    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', removeBook);
    });

    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });


}

function removeBook(event) {
    const bookIndex = event.target.getAttribute('data-index');
    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

function toggleReadStatus(event) {
    const bookIndex = event.target.getAttribute('data-index');
    myLibrary[bookIndex].toggleReadStatus();
    displayBooks();
}


newBookButton.addEventListener('click', () => {
    bookFormDialog.showModal();
});

bookForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    bookFormDialog.close();
    bookForm.reset();
});