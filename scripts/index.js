import { recipes } from '../assets/recipes.js';
import { renderRecipesUI } from './recipes_template.js';

document.addEventListener('DOMContentLoaded', () => {
  renderRecipesUI(recipes);
});
