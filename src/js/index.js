import Search from './models/Search';
import Movie from './models/Movie';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as likesView from './views/likesView';
import * as popularView from './views/popularView';
import { elements, renderLoader, clearLoader } from './views/base';
import Likes from './models/Likes';
import Popular from './models/Popular';

const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
    // 1) Get query from the view
    const query = searchView.getInput(); //TODO
    console.log(query);

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for movies
        try { 
            await state.search.getResults();
            
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.movies);
            console.log(state.search);
        } catch (err) {
            console.log(err);
            clearLoader();
        } 
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.movies, goToPage);
    }
});

// MOVIE CONTROLLER

const controlMovie = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        movieView.clearMovie();
        renderLoader(elements.movie);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new movie object
        state.movie = new Movie(id);

        try {
            // Get movie data
            await state.movie.getMovie();

            // Render movie
            console.log(state.movie);
            clearLoader();
            movieView.renderMovie(state.movie, state.likes.isLiked(id));

        } catch (error) {
            console.log(error);
            alert('Error processing a movie!');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlMovie));

// LIKE CONTROLLER

const controlLike = () => {
    if (!state.likes) state.likes = new Likes(); 
    const currentID = state.movie.id;

    // User has NOT yet liked current movie
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(currentID, state.movie.title, state.movie.vote_average, state.movie.date,  state.movie.img);
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

    // User HAS liked current movie
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);
        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Handling movie button clicks

elements.movie.addEventListener('click', e => {
    if (e.target.matches('.movie__love, .movie__love *')) {
        // Like controller
        controlLike();
    }
});

// Restore liked movies on page load 
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
})

// POPULAR MOVIES

const controlPopular = async () => {
    
    state.popular = new Popular();

    try {
        await state.popular.getPopular();
        popularView.renderPopular(state.popular);

    } catch(error) {
        console.log(error);
    }

}

controlPopular();