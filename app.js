// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI (){}

// UI Prototype
UI.prototype.addBookToList = function(book){
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

// Show message
UI.prototype.showAlert = function(message, className){
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
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target){
  target.parentElement.parentElement.remove();
}

// Clear fields
UI.prototype.clearFields = function(){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

// Event listener for add book
const form = document.querySelector('#book-form');

form.addEventListener('submit', function(e){
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
    // Show success message
    ui.showAlert('Book added', 'success');
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete book
const bookList = document.querySelector('#book-list');

bookList.addEventListener('click', function(e){
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