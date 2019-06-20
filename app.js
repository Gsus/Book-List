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
    <td><a href ='#'>X</a></td>
  `;
  // Add to list
  list.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function(){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

// Add event listeners
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

  // Add book to list
  ui.addBookToList(book);

  // Clear fields
  ui.clearFields();

  e.preventDefault();
});
