import { elements } from './base';
import { limitMovieTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.movie__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" onerror="this.onerror=null;this.src='img/bug.jpg';" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitMovieTitle(like.title)}</h4>
                <p class="likes__author">🚀 ${like.date} <span style="margin-right: 1rem;"></span> ⭐️ ${like.vote}</p>
            </div>
        </a>
    </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;

    if (el) el.parentElement.removeChild(el);
};