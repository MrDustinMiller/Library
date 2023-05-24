const library = (() => {
  const myLibrary = [];

  const makeBook = (title, author, pages) => ({
    title,
    author,
    pages,
    read: false,
  });

  function checkForReadStatus(book, ...mark) {
    const [marks] = mark;
    if (book.read === false) {
      marks.xMark.style.color = 'red';
    } else marks.checkMark.style.color = 'green';
  }

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
    checkForReadStatus(book, { xMark, checkMark });
  }

  function updateLocalStorageLibrary() {
    localStorage.setItem('card', JSON.stringify(myLibrary));
  }

  function deleteCardFromMyLibraryAndDOM({ ...elements }) {
    const { bookToRemove, bookList, cardIndex, books } = elements;

    if (myLibrary.length === 1) {
      myLibrary.length = 0;
      bookList.removeChild(books[0]);
      updateLocalStorageLibrary();
    } else {
      myLibrary.splice(cardIndex, 1);
      bookList.removeChild(bookToRemove);
      updateLocalStorageLibrary();
    }
  }

  function getCardIndexAndBookToRemove(elementToRemove, bookList) {
    const card = elementToRemove;
    const cardIndex = card.dataset.index;
    const books = bookList.children;
    const bookToRemove = books[cardIndex];
    deleteCardFromMyLibraryAndDOM({ bookToRemove, bookList, cardIndex, books });
  }

  function changeStatusToRead(e) {
    const cardIndex = e.target.dataset.index;
    if (!myLibrary[cardIndex].read) {
      myLibrary[cardIndex].read = true;
    } else myLibrary[cardIndex].read = false;
    updateLocalStorageLibrary();
  }

  function bindControlEvents(bookList) {
    const marks = document.querySelectorAll('.fa-regular');
    marks.forEach((mark) => {
      mark.addEventListener('click', (e) => {
        const { className } = e.target;

        if (className === 'fa-sharp fa-regular fa-circle-xmark') {
          e.target.style.color = 'red';
          e.target.nextSibling.style.color = '';
          changeStatusToRead(e);
        } else {
          e.target.style.color = 'green';
          e.target.previousSibling.style.color = '';
          changeStatusToRead(e);
        }
      });
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((elementToRemove) => {
      elementToRemove.addEventListener('click', () => {
        getCardIndexAndBookToRemove(elementToRemove, bookList);
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
    const check = myLibrary.some(
      (book) =>
        book.title === newUserBook.title && book.author === newUserBook.author
    );

    if (check) {
      alert(
        `You already have "${newUserBook.title}" by ${newUserBook.author} saved!`
      );
      return;
    }

    myLibrary.push(newUserBook);
    updateLocalStorageLibrary();
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

  function displayBooksInLocalStorage() {
    const booksInStorage = JSON.parse(localStorage.getItem('card'));

    if (booksInStorage) {
      booksInStorage.forEach((book) => {
        myLibrary.push(book);
      });
    }

    displayBooks();
  }

  function cacheForm() {
    const bookform = document.querySelector('.new-book-form');
    bindFormEvents(bookform);
  }

  function init() {
    cacheForm();
    displayBooksInLocalStorage();
  }

  return { init };
})();

export default library;
