class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector('#book-list');
    // Create table row element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    // Add to list
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add message
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Disappear after 3 seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

class Store {
  static getBooks(){
    let books;
    // Check if there are books already in LS
    if (localStorage.getItem('books') === null) { // If there aren't
      books = [];
    } else { // Fetch 'em
      books = JSON.parse(localStorage.getItem('books'));
    }
    console.log(books);
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    // Loop through books in LS and add 'em to the UI
    books.forEach(function(book){
      const ui = new UI;

      ui.addBookToList(book);
    });
  }

  static addBook(book){
    let books = Store.getBooks();

    books.push(book);

    // Update local storage
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(){

  }
}

// When the content loads, display books from LS
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listener for add book
const form = document.querySelector('#book-form');

form.addEventListener('submit', function (e) {
  // Get form values
  const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Show error message
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Add book to LS
    Store.addBook(book);
    // Show success message
    ui.showAlert('Book added', 'success');
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete book
const bookList = document.querySelector('#book-list');

bookList.addEventListener('click', function (e) {
  if (e.target.className === 'delete') {
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book removed!', 'success');
  }

  e.preventDefault();
});