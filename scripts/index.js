const submitButton = document.querySelector('.submit');
const bookList = document.querySelector('.book-card-section');
const myLibrary = [];

function MakeBook(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = '';
}

function createBookCard(book, i) {
  const newCard = document.createElement('div');
  newCard.setAttribute('class', 'book-wrapper');
  newCard.setAttribute('data-index', `${i}`);
  const bookTitle = document.createElement('p');
  bookTitle.innerText = book.title;
  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = book.author;
  const bookPages = document.createElement('p');
  bookPages.innerText = book.pages;
  const readBook = document.createElement('div');
  readBook.setAttribute('class', 'read-section');
  readBook.innerText = 'Read\n';
  const xMark = document.createElement('i');
  xMark.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark');
  xMark.setAttribute('data-index', `${i}`);
  readBook.appendChild(xMark);
  const checkMark = document.createElement('i');
  checkMark.setAttribute('class', 'fa-regular fa-circle-check');
  checkMark.setAttribute('data-index', `${i}`);
  readBook.appendChild(checkMark);
  const removeButton = document.createElement('button');
  removeButton.setAttribute('class', 'remove-btn');
  removeButton.setAttribute('data-index', `${i}`);
  removeButton.innerText = 'Remove';

  newCard.appendChild(bookTitle);
  newCard.appendChild(bookAuthor);
  newCard.appendChild(bookPages);
  newCard.appendChild(readBook);
  newCard.appendChild(removeButton);

  const div = document.createElement('div');
  div.setAttribute('class', 'card-info');
  div.append(newCard);
  bookList.appendChild(div);
}

function checkControls() {
  // refactor this so its not two of the same things
  const xMarks = document.querySelectorAll('.fa-circle-xmark');
  xMarks.forEach((element) => {
    element.addEventListener('click', () => {
      const mark = element;
      mark.style.color = 'red';
      const newObj = Object.create(MakeBook.prototype);
      newObj.readBook();
    });
  });

  const checkMarks = document.querySelectorAll('.fa-circle-check');
  checkMarks.forEach((element) => {
    element.addEventListener('click', () => {
      const mark = element;
      mark.style.color = 'green';
      const newObj = Object.create(MakeBook.prototype);
      newObj.readBook();
    });
  });

  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach((element) => {
    element.addEventListener('click', () => {
      const card = element;
      const cardIndex = card.dataset.index;
      myLibrary.splice(cardIndex, 1);
      const books = bookList.children;
      const bookToRemove = books[cardIndex];
      bookList.removeChild(bookToRemove);
    });
  });
}

function displayBooks() {
  bookList.innerHTML = '';
  myLibrary.forEach((book, i) => {
    createBookCard(book, i);
  });
  checkControls();
}

function addBookToLibrary(newBook) {
  const newUserBook = newBook;
  myLibrary.push(newUserBook);
  displayBooks();
}

function getNewUserBook() {
  const title = document.querySelector('.new-title').value;
  const author = document.querySelector('.new-author').value;
  const pages = document.querySelector('.new-pages').value;
  const newBook = new MakeBook(title, author, pages);
  addBookToLibrary(newBook);
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  getNewUserBook();
});

MakeBook.prototype.readBook = function () {
  if (document.querySelector('.fa-circle-xmark').style.color === 'red') {
    this.read = false;
  } else this.read = true;
};

MakeBook.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};
