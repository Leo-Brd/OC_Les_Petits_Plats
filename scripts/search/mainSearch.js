// Main search algorithm using only native for/while loops
import { renderRecipeCards, renderFiltersAndCount } from '../recipes_template.js';

/**
 * Check if a string contains the search query (case-insensitive)
 * @param {string} text - Text to search in
 * @param {string} query - Search query
 * @returns {boolean}
 */
function containsQuery(text, query) {
  if (!text || !query) return false;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  // Use indexOf to check if query exists in text
  return lowerText.indexOf(lowerQuery) !== -1;
}

/**
 * Check if a recipe matches the search query
 * Searches in: title, description, and ingredients
 * @param {Object} recipe - Recipe object
 * @param {string} query - Search query
 * @returns {boolean}
 */
function recipeMatchesQuery(recipe, query) {
  // Check title
  if (containsQuery(recipe.name, query)) {
    return true;
  }
  
  // Check description
  if (containsQuery(recipe.description, query)) {
    return true;
  }
  
  // Check ingredients using for loop
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (containsQuery(recipe.ingredients[i].ingredient, query)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Filter recipes based on search query using native for loop
 * @param {Array} recipes - All recipes
 * @param {string} query - Search query
 * @returns {Array} - Filtered recipes
 */
export function searchRecipes(recipes, query) {
  // If query is less than 3 characters, return all recipes
  if (!query || query.length < 3) {
    return recipes;
  }
  
  const filteredRecipes = [];
  
  // Use for loop to filter recipes
  for (let i = 0; i < recipes.length; i++) {
    if (recipeMatchesQuery(recipes[i], query)) {
      filteredRecipes.push(recipes[i]);
    }
  }
  
  return filteredRecipes;
}

/**
 * Initialize main search functionality
 * @param {Array} recipes - All recipes
 */
export function initMainSearch(recipes) {
  const searchInput = document.getElementById('main-search-input');
  const searchForm = document.getElementById('main-search-form');
  
  if (!searchInput || !searchForm) {
    console.error('Main search elements not found');
    return;
  }
  
  // Prevent form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  // Listen for input changes
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // Filter recipes
    const filteredRecipes = searchRecipes(recipes, query);
    
    // Update display
    renderRecipeCards(filteredRecipes);
    renderFiltersAndCount(filteredRecipes);
  });
}
