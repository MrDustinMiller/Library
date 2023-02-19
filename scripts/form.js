const form = document.querySelector('.new-book-form');
const newBookButton = document.querySelector('.fa-plus');
const submitBtn = document.querySelector('.submit');
const overlay = document.querySelector('.overlay');

newBookButton.addEventListener('click', () => {
  form.style.visibility = 'visible';
  overlay.style.visibility = 'visible';
});

submitBtn.addEventListener('click', () => {
  form.style.visibility = 'hidden';
  overlay.style.visibility = 'hidden';
});

overlay.addEventListener('click', () => {
  if (form.style.visibility === 'visible') {
    form.style.visibility = 'hidden';
    overlay.style.visibility = 'hidden';
  }
});
