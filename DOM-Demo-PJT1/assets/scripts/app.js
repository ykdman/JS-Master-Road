/**Modal Pop */
const startAddMovieBtn = document.getElementById('start-add-movie-btn');
const addMovieModal = document.getElementById('add-modal');
const backDropEl = document.getElementById('backdrop');
const modalCancelBtn = document.querySelector(
  '#add-modal .modal__actions .btn.btn--passive'
);
const userInputElements = addMovieModal.querySelectorAll('input');
const modalAddMovieBtn = modalCancelBtn.nextElementSibling;
const entryTextEl = document.getElementById('entry-text');

const movies = [];

const updateEntryText = () => {
  if (movies.length === 0) {
    entryTextEl.style.display = 'block';
  } else {
    entryTextEl.style.display = 'none';
  }
};

const renderNewMovie = (title, imageUrl, rating) => {
  const newMovie = document.createElement('li');
  newMovie.className = 'movie-element';
  newMovie.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 Stars</p>
        </div>
    `;
  const movieListEl = document.getElementById('movie-list');
  movieListEl.appendChild(newMovie);
};

const toggleBackDrop = () => {
  backDropEl.classList.toggle('visible');
};

const clearMovieInput = () => {
  for (const userInputEl of userInputElements) {
    userInputEl.value = '';
  }
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackDrop();
  clearMovieInput();
};

const modalAddMovieBtnHandler = () => {
  const titleValue = [...userInputElements].filter(
    (userInput) => userInput.name === 'title'
  )[0].value;
  const imgUrlValue = [...userInputElements].filter(
    (userInput) => userInput.name === 'image-url'
  )[0].value;
  const ratingValue = [...userInputElements].filter(
    (userInput) => userInput.name === 'rating'
  )[0].value;

  if (
    titleValue.trim() === '' ||
    imgUrlValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('please Enter valid value On modal');
    return;
  }

  const movie = {
    title: titleValue,
    imageUrl: imgUrlValue,
    rating: ratingValue,
  };

  movies.push(movie);
  console.log(movies);
  toggleMovieModal();
  renderNewMovie(movie.title, movie.imageUrl, movie.rating);
  updateEntryText();
};

const backDropClickHandler = () => {
  if (addMovieModal.classList.contains('visible')) {
    toggleMovieModal();
  }
};

startAddMovieBtn.addEventListener('click', toggleMovieModal);
modalCancelBtn.addEventListener('click', toggleMovieModal);
backDropEl.addEventListener('click', backDropClickHandler);
modalAddMovieBtn.addEventListener('click', modalAddMovieBtnHandler);
