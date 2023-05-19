const inputForm = {
  bindEvents() {
    this.newBookButton.addEventListener('click', () => {
      this.form.style.visibility = 'visible';
      this.overlay.style.visibility = 'visible';
    });

    this.submitBtn.addEventListener('click', () => {
      const itemArray = Array.from(this.inputs);
      const test = itemArray.every((item) => item.value !== '');

      if (test) {
        this.form.style.visibility = 'hidden';
        this.overlay.style.visibility = 'hidden';
        this.formWrapper.style.visibility = 'hidden';
      }
    });

    this.overlay.addEventListener('click', () => {
      if (this.form.style.visibility === 'visible') {
        this.form.style.visibility = 'hidden';
        this.formWrapper.style.visibility = 'hidden';
        this.overlay.style.visibility = 'hidden';
      }
    });
  },

  CacheDom() {
    this.form = document.querySelector('.new-book-form');
    this.formWrapper = document.querySelector('.form-content');
    this.newBookButton = document.querySelector('.fa-plus');
    this.submitBtn = document.querySelector('.submit');
    this.overlay = document.querySelector('.overlay');
    this.inputs = document.querySelectorAll('input');
  },

  init() {
    this.CacheDom();
    this.bindEvents();
  },
};

inputForm.init();
