import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // const key = '79ee890eb5a4f047ba4ac51f917b3a23';
        try {
            const result = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${this.query}`);
    
            this.movies = result.data.results;
            //console.log(this.movies);
        } catch (error) {
            console.log(error);
        }
    }

    async popularMovies() {
        try {
            const key = '79ee890eb5a4f047ba4ac51f917b3a23';

            const result = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${this.query}`);
    
            //console.log(this.result2);
        } catch (error) {
            console.log(error);
        } 
    }
    
}
