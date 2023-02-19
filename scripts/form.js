const form = document.querySelector('.new-book-form');
const newBookButton = document.querySelector('.fa-plus');
const submitBtn = document.querySelector('.submit');
const overlay = document.querySelector('.overlay');
const inputs = document.querySelectorAll('input');

newBookButton.addEventListener('click', () => {
  form.style.visibility = 'visible';
  overlay.style.visibility = 'visible';
});

submitBtn.addEventListener('click', () => {
  const itemArray = Array.from(inputs);
  const test = itemArray.every((item) => item.value !== '');

  if (test) {
    form.style.visibility = 'hidden';
    overlay.style.visibility = 'hidden';
  }
});

overlay.addEventListener('click', () => {
  if (form.style.visibility === 'visible') {
    form.style.visibility = 'hidden';
    overlay.style.visibility = 'hidden';
  }
});
