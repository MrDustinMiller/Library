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

  function deleteCardFromMyLibrary({ ...elements }) {
    const { bookToRemove, bookList, cardIndex, books } = elements;
    if (myLibrary.length === 1) {
      myLibrary.length = 0;
      bookList.removeChild(books[0]);
    } else {
      myLibrary.splice(cardIndex - 1, 1);
      bookList.removeChild(bookToRemove);
    }
  }

  function deleteCardFromDOM(elementToRemove, bookList) {
    const card = elementToRemove;
    const cardIndex = card.dataset.index;
    const books = bookList.children;
    const bookToRemove = books[cardIndex - 1];
    deleteCardFromMyLibrary({ bookToRemove, bookList, cardIndex, books });
  }

  function bindControlEvents(bookList) {
    const marks = document.querySelectorAll('.fa-regular');
    marks.forEach((mark) => {
      mark.addEventListener('click', (e) => {
        const { className } = e.target;

        if (className === 'fa-sharp fa-regular fa-circle-xmark') {
          e.target.style.color = 'red';
          // to do: add read function that sets book object to read. probably need to add 'read' prop in FF
        } else {
          e.target.style.color = 'green';
          // to do: add read function that sets book object to read
        }
        // do to: if user swithes from not read to read and vice versa change marks
      });
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((elementToRemove) => {
      elementToRemove.addEventListener('click', () => {
        deleteCardFromDOM(elementToRemove, bookList);
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
    bindControlEvents(bookList);
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
    addBookToLibrary(newBook);
  }

  function bindFormEvents(bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      getNewUserBook();
    });
  }

  function cacheForm() {
    const bookform = document.querySelector('.new-book-form');
    bindFormEvents(bookform);
  }

  function init() {
    cacheForm();
  }

  return { init };
})();

library.init();
