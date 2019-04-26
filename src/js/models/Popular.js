import axios from 'axios';
import { key } from '../config';

export default class Popular {
    constructor() {
    }

    async getPopular() {
        try {
            const result = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc`);
            console.log(result);

            this.results = result.data.results.slice(14);
            this.idArray = this.results.map(el => el.id);
            
            // console.log(this.results);
            // console.log(this.idArray);
        } catch(error) {
            console.log(error);
        }
        
    }
}