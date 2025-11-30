import { recipes } from '../assets/recipes.js';
import { renderRecipesUI } from './recipes_template.js';
import { initFilterDropdowns } from './utils/filterInteractions.js';

document.addEventListener('DOMContentLoaded', () => {
  renderRecipesUI(recipes);
  initFilterDropdowns();
});
