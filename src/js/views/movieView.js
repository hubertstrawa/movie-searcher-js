import { elements } from './base';

export const clearMovie = () => {
    elements.movie.innerHTML = '';
};

export const renderMovie = (movie, isLiked) => {
    const markup = `
            <figure class="movie__fig">
                <img src="${movie.img}" onerror="this.onerror=null;this.src='img/bug.jpg';" alt="${movie.title}" class="movie__img">
            <h1 class="movie__title">
                <span>${movie.title}</span>
            </h1>
        </figure>

        <div class="movie__details">
            <div class="movie__info">
                <span class="movie__info-data movie__info-data--minutes">⌛️ ${movie.runtime}</span>
            </div>
            <div class="movie__info">
                <span class="movie__info-data movie__info-data--people"> 🎥 ${movie.genres}</span>
            </div>
            <div class="movie__info">
                <span class="movie__info-data movie__info-data--people"> ⭐️ ${movie.vote_average} (${movie.vote_count} ratings)</span>
            </div>
            <button class="movie__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>



        <div class="movie__desc">

            <p class="movie__description">${movie.description}</p>

            
        </div>

            
        <div class="movie__details">
            <div class="movie__info">
                <span class="movie__info-data movie__info-data--minutes">🚀 year: ${movie.date} </span>
            </div>
            <div class="movie__info">
                <span class="movie__info-data movie__info-data--people">👑 popularity: <strong> ${movie.popularity}</strong> </span>
            </div>
            <div class="movie__info">
                <span class="movie__info-data movie__info-data--people">🗺 ${movie.production}</span>
            </div>
            
        </div>
    `;

    elements.movie.insertAdjacentHTML('afterbegin', markup);
}
