// Filter Controller - Coordinates state, algorithm, and UI
// Uses only native for/while loops

import { 
  getAllRecipes, 
  getMainSearchQuery, 
  setMainSearchQuery, 
  getSelectedTags, 
  addTag, 
  removeTag 
} from '../state/appState.js';

import { filterRecipes } from '../algorithms/searchAlgorithm.js';

import { renderRecipeCards } from '../ui/recipeCards.js';
import { renderFiltersBar, initFilterDropdowns, setOnItemSelected } from '../ui/filterDropdowns.js';
import { renderTags, setOnTagRemoved } from '../ui/tags.js';
import { initMainSearch, setOnSearchChange } from '../ui/mainSearchBar.js';

/**
 * Apply all filters and update UI
 */
function applyFilters() {
  const recipes = getAllRecipes();
  const query = getMainSearchQuery();
  const tags = getSelectedTags();
  
  // Filter recipes
  const filtered = filterRecipes(recipes, query, tags);
  
  // Update UI
  renderRecipeCards(filtered);
  renderFiltersBar(filtered);
  initFilterDropdowns();
}

/**
 * Handle main search change
 * @param {string} query
 */
function handleSearchChange(query) {
  setMainSearchQuery(query);
  applyFilters();
}

/**
 * Handle tag added from dropdown
 * @param {string} category
 * @param {string} value
 */
function handleTagAdded(category, value) {
  const added = addTag(category, value);
  if (added) {
    renderTags();
    applyFilters();
  }
}

/**
 * Handle tag removed
 * @param {string} category
 * @param {string} value
 */
function handleTagRemoved(category, value) {
  removeTag(category, value);
  renderTags();
  applyFilters();
}

/**
 * Initialize the filter controller
 * Sets up all callbacks and initial render
 */
export function initFilterController() {
  // Set up callbacks
  setOnSearchChange(handleSearchChange);
  setOnItemSelected(handleTagAdded);
  setOnTagRemoved(handleTagRemoved);
  
  // Initialize UI components
  initMainSearch();
  
  // Initial render
  const recipes = getAllRecipes();
  renderRecipeCards(recipes);
  renderFiltersBar(recipes);
  initFilterDropdowns();
}
