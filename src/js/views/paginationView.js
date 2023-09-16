import { RESULT_PER_PAGE } from '../config';
import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const lastPage = Math.ceil(this._data.results.length / RESULT_PER_PAGE);

    // page 1 but has next page
    if (this._data.page === 1 && lastPage > 1) {
      return this._generateMarkupNext(currentPage);
    }
    // page > 1 has pre & next page btn
    if (this._data.page > 1 && this._data.page < lastPage) {
      return [
        this._generateMarkupPre(currentPage),
        this._generateMarkupNext(currentPage),
      ].join('');
    }
    // last page
    if (this._data.page === lastPage && lastPage > 1) {
      return this._generateMarkupPre(currentPage);
    }
    // just 1 page => no buttons
    return '';
  }

  _generateMarkupPre(page) {
    return `<button data-goto=${
      page - 1
    } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>`;
  }

  _generateMarkupNext(page) {
    return `<button data-goto=${
      page + 1
    } class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> `;
  }
}

export default new PaginationView();
