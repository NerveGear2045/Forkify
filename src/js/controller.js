import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // fetching data
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // rendering
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipe);
};

init();
