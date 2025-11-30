import { recipes } from '../assets/recipes.js';
import { renderRecipesUI } from './recipes_template.js';
import { initFilterDropdowns } from './filters/keywordFilterInteractions.js';
import { initMainSearch } from './search/mainSearch.js';

document.addEventListener('DOMContentLoaded', () => {
  renderRecipesUI(recipes);
  initFilterDropdowns();
  initMainSearch(recipes);
});
