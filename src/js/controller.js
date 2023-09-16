import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // update results to mark selected
    resultsView.update(model.getSearchResultsPage());

    // updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // fetching data
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // rendering
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    // get query
    const query = searchView.getQuery();
    if (!query) return;

    // fetching data
    await model.searchRecipe(query);

    // rendering
    resultsView.render(model.getSearchResultsPage());
    // render initial pagination
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPagination = goToPage => {
  // rendering new data
  resultsView.render(model.getSearchResultsPage(goToPage));
  // render new buttons
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  // updating data
  model.updateServings(newServings);
  // rendering updates
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  // add to bookmark list
  if (!model.state.recipe.booked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // update bookmark fill
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
