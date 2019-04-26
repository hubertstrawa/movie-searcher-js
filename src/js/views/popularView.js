import { elements } from './base';
import Popular from '../models/Popular';

export const renderPopular = popular => {
   

    popular.results.forEach((el, i) => {
        console.log(popular.results[i]);

        const markup = `
        <figure class="movie__popular-fig">
        <a href="#${popular.results[i].id}"><img src="https://image.tmdb.org/t/p/original${popular.results[i].poster_path}" class="movie__popular-img">
        </a>
        </figure>
        `;
        elements.moviePopular.insertAdjacentHTML('afterbegin', markup)

    })

};


