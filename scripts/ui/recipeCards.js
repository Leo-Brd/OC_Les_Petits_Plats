// Recipe cards rendering
// Uses Array methods (map, forEach, etc.)

import { createRecipeCardHTML } from './templates.js';

// Number of cards per row
const CARDS_PER_ROW = 3;

/**
 * Create invisible placeholder card to fill last row
 * @returns {string}
 */
function createPlaceholderCard() {
  return `<div class="w-[380px] h-0 invisible" aria-hidden="true"></div>`;
}

/**
 * Render recipe cards in the grid
 * @param {Array} recipes
 */
export function renderRecipeCards(recipes) {
  const grid = document.getElementById('recipes-grid');
  if (!grid) return;
  
  // Generate recipe cards HTML using map
  let html = recipes.map(recipe => createRecipeCardHTML(recipe)).join('');
  
  // Add invisible placeholders to fill last row
  const remainder = recipes.length % CARDS_PER_ROW;
  if (remainder !== 0) {
    const placeholdersNeeded = CARDS_PER_ROW - remainder;
    html += Array(placeholdersNeeded).fill(null).map(() => createPlaceholderCard()).join('');
  }
  
  grid.innerHTML = html;
}
