const API_KEY = 'e813c8433f0606be45fb98586b8f6d15';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// fetch movies
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

//display movies on the webpage
function showMovies(movies) {
    main.innerHTML = ''; // Clear previous content
    movies.forEach(movie => {
        const { title, vote_average, overview, poster_path } = movie;
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        
        const rating = vote_average.toFixed(1);

        movieDiv.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getRatingClass(rating)}">${rating}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        
        main.appendChild(movieDiv);
    });
}

// rating class for styling
function getRatingClass(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// search form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        searchMovies(searchTerm);
    } else {
        getMovies(API_URL); // If no search term, get popular movies
    }
});

// search movies by title
async function searchMovies(query) {
    const res = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    showMovies(data.results);
}

document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html'; 
});
// Initial fetch of popular movies
getMovies(API_URL);

