const form = document.querySelector('.new-book-form');
const newBookButton = document.querySelector('.insert-book');

newBookButton.addEventListener('click', () => {
  form.style.visibility = 'visible';
});
