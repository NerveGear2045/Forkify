import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

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
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(resultsView.renderError);
    resultsView.renderError();
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
