import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { 
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArray = Array.from(document.querySelectorAll('.results__link'));
    resultsArray.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

// pirates of the caribbean
// split = ['pirates' 'of' 'the' 'caribbean']

export const limitMovieTitle = (title, limit = 18) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderMovie = movie => {
    const markup = `
        <li>
            <a class="results__link" href="#${movie.id}">
                <figure class="results__fig">
                <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" onerror="this.onerror=null;this.src='img/bug.jpg';" alt="${movie.title}"/>
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitMovieTitle(movie.title)}</h4>
                    <p class="results__author">⭐️ ${movie.vote_average} (${movie.vote_count} ratings)</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (numResults > 10) {
        if (page === 1 && pages > 1) {
            // Only button to go to next page
            button = createButton(page, 'next');
        } else if (page < pages) {
            // Both buttons
            button = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
            `;
        } else if (page === pages && pages > 1) {
            // Button to go to previous page
            button = createButton(page, 'prev');
        }

        elements.searchResPages.insertAdjacentHTML('afterbegin', button);
    }
}

export const renderResults = (movies, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    movies.slice(start, end).forEach(el => renderMovie(el));

    // render pagination buttons
    renderButtons(page, movies.length, resPerPage);
};