export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, vote, date, img) {
        const like = { id, title, vote, date, img };
        this.likes.push(like);

        // Persist data in localstorage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in localstorage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restore likes from the localStorage
        if (storage) this.likes = storage;
    }
}