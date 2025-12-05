// Application state - Pure data storage (no logic)
// Uses Array methods (forEach, filter, some, etc.)

const state = {
  allRecipes: [],
  mainSearchQuery: '',
  selectedTags: {
    ingredients: [],
    appliances: [],
    ustensils: []
  }
};

/**
 * Initialize state with all recipes
 * @param {Array} recipes
 */
export function initState(recipes) {
  state.allRecipes = recipes;
}

/**
 * Get all recipes
 * @returns {Array}
 */
export function getAllRecipes() {
  return state.allRecipes;
}

/**
 * Get main search query
 * @returns {string}
 */
export function getMainSearchQuery() {
  return state.mainSearchQuery;
}

/**
 * Set main search query
 * @param {string} query
 */
export function setMainSearchQuery(query) {
  state.mainSearchQuery = query;
}

/**
 * Get selected tags
 * @returns {Object}
 */
export function getSelectedTags() {
  return state.selectedTags;
}

/**
 * Add a tag to a category
 * @param {string} category
 * @param {string} value
 * @returns {boolean} - true if tag was added, false if already exists
 */
export function addTag(category, value) {
  // Check if tag already exists using Array.some()
  const exists = state.selectedTags[category].some(
    tag => tag.toLowerCase() === value.toLowerCase()
  );
  
  if (exists) return false;
  
  state.selectedTags[category].push(value);
  return true;
}

/**
 * Remove a tag from a category
 * @param {string} category
 * @param {string} value
 */
export function removeTag(category, value) {
  state.selectedTags[category] = state.selectedTags[category].filter(
    tag => tag.toLowerCase() !== value.toLowerCase()
  );
}
