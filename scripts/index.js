const submitButton = document.querySelector('.submit');
const bookList = document.querySelector('.book-card-section');
const myLibrary = [];

function MakeBook(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBookCard(book) {
  const card = `<div class="book-wrapper">
  <p class="book-title">${book.title}</p>
  <p class="book-author">${book.author}</p>
  <p class="book-pages">${book.pages}</p>
  <p class="book-read">${book.read}</p>
  </div>`;

  const div = document.createElement('div');
  div.setAttribute('class', 'card-info');
  div.innerHTML = card;
  bookList.appendChild(div);
}

function displayBooks() {
  bookList.innerHTML = '';
  myLibrary.forEach((book) => {
    createBookCard(book);
  });
}

function addBookToLibrary(newBook) {
  const newUserBook = newBook;
  myLibrary.push(newUserBook);
  displayBooks();
}

function getNewUserBook(e) {
  e.preventDefault();
  const title = document.querySelector('.new-title').value;
  const author = document.querySelector('.new-author').value;
  const pages = document.querySelector('.new-pages').value;
  const read = document.querySelector('.new-read').value;
  const newBook = new MakeBook(title, author, pages, read);
  addBookToLibrary(newBook);
}

submitButton.addEventListener('click', (e) => {
  getNewUserBook(e);
});

MakeBook.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};
