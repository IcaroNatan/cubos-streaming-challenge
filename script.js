const moviesElement = document.querySelector(".movies");
const searchInputElement = document.querySelector(".input");

const moviesPerPage = 5;
const totalPages = 4;
const movieList = [];
let currentPage = 0;

const movieVizualization = async () => {
  try {
    const response = await fetch(
      "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false"
    );
    const data = await response.json();

    for (let movie of data.results) {
      generateMovies(movie);
    }

    organizeMovies(currentPage);
  } catch (error) {
    console.log(error);
  }
};

movieVizualization();

const generateMovies = (movie) => {
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");

  const movieInfoElement = document.createElement("div");
  movieInfoElement.classList.add("movie__info");

  const spanElementTitle = document.createElement("span");
  spanElementTitle.classList.add("movie__title");

  const spanElementRating = document.createElement("span");
  spanElementRating.classList.add("movie__rating");

  const imageElement = document.createElement("img");
  imageElement.src = "./assets/estrela.svg";
  imageElement.alt = "Estrela";

  spanElementRating.textContent = movie.vote_average.toFixed(1);
  spanElementRating.appendChild(imageElement);

  spanElementTitle.textContent = movie.title;

  movieInfoElement.appendChild(spanElementTitle);
  movieInfoElement.appendChild(spanElementRating);

  movieElement.style.backgroundImage = `url(${movie.poster_path})`;
  movieElement.appendChild(movieInfoElement);

  movieList.push(movieElement);
};

const organizeMovies = (page) => {
  moviesElement.innerHTML = "";

  const start = page * moviesPerPage;
  const end = start + moviesPerPage;

  const moviesToShow = movieList.slice(start, end);

  for (let movie of moviesToShow) {
    moviesElement.appendChild(movie);
  }
};

const previousButton = () => {
  if (currentPage > 0) {
    currentPage--;
  } else {
    currentPage = totalPages - 1;
  }
  organizeMovies(currentPage);
};

const nextButton = () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
  } else {
    currentPage = 0;
  }
  organizeMovies(currentPage);
};

const searchButton = async () => {
  try {
    searchInputElement.addEventListener("keyup", async (event) => {
      if (event.keyCode === 13) {
        const query = searchInputElement.value.trim();

        if (query.length === 0) {
          movieList.length = 0;
          movieVizualization();
          return;
        }

        const response = await fetch(
          `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=${query}`
        );

        const data = await response.json();

        if (data.results.length === 0) {
          movieVizualization();
          return;
        }

        movieList.length = 0;

        for (let movie of data.results) {
          generateMovies(movie);
        }

        organizeMovies(currentPage);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
