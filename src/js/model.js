import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULT_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      source: recipe.source_url,
      time: recipe.cooking_time,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.booked = true;
    else state.recipe.booked = false;
  } catch (error) {
    throw error;
  }
};

export const searchRecipe = async query => {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.query = query;

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ingre => {
    ingre.quantity = (ingre.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmark = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = recipe => {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe
  if (recipe.id === state.recipe.id) state.recipe.booked = true;

  // save to local storage
  persistBookmark();
};

export const removeBookmark = id => {
  // remove from bookmark array
  const index = state.bookmarks.findIndex(rec => rec.id === id);
  state.bookmarks.splice(index, 1);

  // unmark current recipe
  if (id === state.recipe.id) state.recipe.booked = false;

  // save to local storage
  persistBookmark();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// clear local storage for development
const clearBookmark = () => {
  localStorage.clear('bookmarks');
};
// clearBookmark();
