const library = (() => {
  const makeBook = (title, author, pages) => ({ title, author, pages });
  const myLibrary = [];

  function createBookCard(book, i, bookList) {
    const newCard = document.createElement('div');
    newCard.setAttribute('class', 'book-wrapper');
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
    div.setAttribute('data-index', `${i}`);
    div.append(newCard);
    bookList.appendChild(div);
  }

  function checkControls(bookList) {
    // refactor this so its not two of the same things
    const xMarks = document.querySelectorAll('.fa-circle-xmark');
    xMarks.forEach((element) => {
      element.addEventListener('click', () => {
        const mark = element;
        mark.style.color = 'red';
      });
    });

    const checkMarks = document.querySelectorAll('.fa-circle-check');
    checkMarks.forEach((element) => {
      element.addEventListener('click', () => {
        const mark = element;
        mark.style.color = 'green';
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
    const bookList = document.querySelector('.book-card-section');

    // clear books on display so no multiples
    bookList.innerHTML = '';
    myLibrary.forEach((book, i) => {
      createBookCard(book, i, bookList);
    });
    checkControls(bookList);
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
    const newBook = makeBook(title, author, pages);
    // console.log(newBook);
    addBookToLibrary(newBook);
  }

  function bindEvents(bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      getNewUserBook();
    });
  }

  function cacheDom() {
    const bookform = document.querySelector('.new-book-form');
    bindEvents(bookform);
  }

  function init() {
    cacheDom();
  }

  return { init };
})();

library.init();
