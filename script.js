const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID(); // Unique ID for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function(){
  this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayLibrary(); // Update display
}

function removeBookFromLibrary(bookId){
  const bookIndex = myLibrary.findIndex(book => book.id === bookId);
  if(bookIndex !== -1){
    myLibrary.splice(bookIndex, 1);
    displayLibrary();
  }
}

function toggleBookReadStatus(bookId){
  const book = myLibrary.find(book => book.id === bookId);
  if(book){
    book.toggleReadStatus();
    displayLibrary();
  }
  
}

function displayLibrary() {
  const libraryContainer = document.getElementById("libraryContainer");
  libraryContainer.innerHTML = ""; // Clear previous display

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
      <button class="remove-btn" onclick="removeBookFromLibrary('${book.id}')">Remove</button>
      <button class="toggle-read-status-btn" onclick="toggleBookReadStatus('${book.id}')">Toggle Read Status</button>
    `;
    libraryContainer.appendChild(bookCard);
  });
}

// Add some test books
data = [
  ["The Hobbit", "J.R.R. Tolkien", 310, true],
  ["1984", "George Orwell", 328, false],
  ["To Kill a Mockingbird", "Harper Lee", 281, true],
  

];
data.forEach(book => addBookToLibrary(...book));

document.getElementById("newBookButton").addEventListener("click", function() {
  const form = document.getElementById("bookForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

document.getElementById("bookForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;
  
  addBookToLibrary(title, author, pages, isRead);
  
  // Clear the form
  document.getElementById("bookForm").reset();
});

