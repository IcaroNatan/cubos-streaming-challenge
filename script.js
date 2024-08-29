const bodyElement = document.querySelector("body");
const moviesElement = document.querySelector(".movies");
const searchInputElement = document.querySelector(".input");
const highlightElement = document.querySelector(".highlight");
const highlightVideo = document.querySelector(".highlight__video");
const highlightTittle = document.querySelector(".highlight__title");
const highlightRating = document.querySelector(".highlight__rating");
const highlightGenres = document.querySelector(".highlight__genres");
const highlightLaunch = document.querySelector(".highlight__launch");
const highlightDescription = document.querySelector(".highlight__description");
const highlightVideoLink = document.querySelector(".highlight__video-link");
const modalElement = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalImage = document.querySelector(".modal__img");
const modalDescription = document.querySelector(".modal__description");
const modalAverage = document.querySelector(".modal__average");
const modalGenres = document.querySelector(".modal__genres");

const moviesPerPage = 5;
const totalPages = 4;
const movieList = [];
let currentPage = 0;
let movieId;

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
  movieElement.style.backgroundImage = `url(${movie.poster_path})`;

  const movieInfoElement = document.createElement("div");
  movieInfoElement.classList.add("movie__info");

  const spanElementTitle = document.createElement("span");
  spanElementTitle.classList.add("movie__title");
  spanElementTitle.textContent = movie.title;

  const spanElementRating = document.createElement("span");
  spanElementRating.classList.add("movie__rating");
  spanElementRating.textContent = movie.vote_average.toFixed(1);

  const imageElement = document.createElement("img");
  imageElement.src = "./assets/estrela.svg";
  imageElement.alt = "Estrela";
  spanElementRating.appendChild(imageElement);

  movieInfoElement.appendChild(spanElementTitle);
  movieInfoElement.appendChild(spanElementRating);

  movieElement.appendChild(movieInfoElement);
  movieElement.addEventListener("click", () => {
    modalElement.classList.remove("hidden");
    movieId = movie.id;
    movieModal(movieId);
  });

  moviesElement.appendChild(movieElement);
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

const movieOfTheDay = async () => {
  try {
    const generalResponse = await fetch(
      "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
    );
    const videoResponse = await fetch(
      "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
    );

    const generalData = await generalResponse.json();
    const videoData = await videoResponse.json();

    highlightVideo.style.backgroundImage = `url(${generalData.poster_path})`;
    highlightTittle.textContent = generalData.title;
    highlightRating.textContent = generalData.vote_average.toFixed(1);
    highlightGenres.textContent = generalData.genres
      .map((genre) => genre.name)
      .join(", ");
    highlightLaunch.textContent = new Date(
      generalData.release_date
    ).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (generalData.overview.length > 350) {
      highlightDescription.textContent =
        generalData.overview.substring(0, 350) + "[...]";
    } else {
      highlightDescription.textContent = generalData.overview;
    }

    highlightVideoLink.href = `https://www.youtube.com/watch?v=${videoData.results[0].key}`;
  } catch (error) {
    console.log(error);
  }
};

movieOfTheDay();

const movieModal = async (idMovie) => {
  try {
    const response = await fetch(
      `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${idMovie}?language=pt-BR`
    );

    const data = await response.json();

    modalTitle.textContent = data.title;
    modalImage.src = data.backdrop_path;
    modalDescription.textContent = data.overview;
    modalAverage.textContent = data.vote_average.toFixed(1);
    modalGenres.innerHTML = "";

    for (let genre of data.genres) {
      const spanModal = document.createElement("span");
      spanModal.classList.add("modal__genre");
      spanModal.textContent = genre.name;
      modalGenres.appendChild(spanModal);
    }
  } catch (error) {
    console.log(error);
  }
};

const closeModal = () => {
  modalElement.classList.add("hidden");
};

const changeTheme = () => {
  bodyElement.classList.toggle("dark-theme");
};
