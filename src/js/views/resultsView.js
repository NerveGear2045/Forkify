import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _error = "We couldn't find any recipe with that name. Please try again!";
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(rec) {
    return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="${rec.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
  }
}

export default new ResultsView();
