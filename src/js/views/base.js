export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    movie: document.querySelector('.movie'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
    moviePopular: document.querySelector('.movie__popular')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
    <div class="loader" title="5">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="24px" height="30px" viewBox="0 0 24 30"       style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <rect x="0" y="13" width="4" height="5" fill="#F59A83">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5" 
        begin="0s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="13" width="4" height="5" fill="#F59A83">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5" 
        begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="13" width="4" height="5" fill="#F59A83">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5" 
        begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);

};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}