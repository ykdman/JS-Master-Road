const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

let movies = [];

// functions

const renderMovie = (filterTitle = '') => {
  const movieList = document.getElementById('movie-list');

  // movie list Visible
  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }

  // Movies Setting
  movieList.innerHTML = ''; // remove all contents

  const rendermovies = !filterTitle
    ? movies
    : movies.filter((movie) =>
        movie.info.title.toUpperCase().includes(filterTitle.toUpperCase())
      );

  rendermovies.forEach((movie) => {
    const listEl = document.createElement('li');
    let text = `${movie.info.title} - `;
    for (const key in movie.info) {
      if (key !== 'title') {
        text += `${key} : ${movie.info[key]}`;
      }
    }
    listEl.textContent = text;
    movieList.append(listEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;
  // init input value
  document.getElementById('title').value = '';
  document.getElementById('extra-name').value = '';
  document.getElementById('extra-value').value = '';

  // valid input
  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  console.log(
    `User Input title : ${title}, Extra Name : ${extraName}, ExtraValue : ${extraValue}`
  );

  // push new movie
  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: crypto.randomUUID(),
  };

  movies.push(newMovie);
  renderMovie();
};

const searchMovieHandler = () => {
  const filterTitle = document.getElementById('filter-title').value;
  if (!filterTitle) {
    return;
  }
  console.log(`filter title Name : ${filterTitle}`);
  renderMovie(filterTitle);
  document.getElementById('filter-title').value = '';
};

// Event
addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
