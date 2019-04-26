import axios from 'axios';
import { key } from '../config';

export default class Movie {
    constructor(id) {
        this.id = id;
    }

    async getMovie() {
        try {
            const res = await axios(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${key}`);
            console.log(res);

            this.title = res.data.title;
            this.description = res.data.overview;
            this.img = `https://image.tmdb.org/t/p/original${res.data.poster_path}`;
            this.runtime = `${res.data.runtime} mins`;
            this.vote_average = res.data.vote_average;
            this.vote_count = res.data.vote_count;            
            this.homepage = res.data.homepage;
            this.popularity = res.data.popularity.toFixed(2);
            this.date = res.data.release_date.split('-')[0];
            this.genres = res.data.genres.map(el => el.name).join(', ');
            this.production = res.data.production_countries.map(el => el.name).join(', ');
        } catch (error) {
            console.log(error);
        }
    }
}