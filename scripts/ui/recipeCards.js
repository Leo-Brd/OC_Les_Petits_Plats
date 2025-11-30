// Recipe cards rendering
import { createRecipeCardHTML } from './templates.js';

/**
 * Render recipe cards in the grid
 * @param {Array} recipes
 */
export function renderRecipeCards(recipes) {
  const grid = document.getElementById('recipes-grid');
  if (!grid) return;
  
  let html = '';
  for (let i = 0; i < recipes.length; i++) {
    html += createRecipeCardHTML(recipes[i]);
  }
  
  grid.innerHTML = html;
}
