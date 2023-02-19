const form = document.querySelector('.new-book-form');
const newBookButton = document.querySelector('.fa-plus');
const submitBtn = document.querySelector('.submit');
const overlay = document.querySelector('.overlay');
const xMark = document.querySelector('.fa-xmark');

newBookButton.addEventListener('click', () => {
  form.style.visibility = 'visible';
  overlay.style.visibility = 'visible';
});

submitBtn.addEventListener('click', () => {
  form.style.visibility = 'hidden';
  overlay.style.visibility = 'hidden';
});

xMark.addEventListener('click', () => {
  form.style.visibility = 'hidden';
  overlay.style.visibility = 'hidden';
});
