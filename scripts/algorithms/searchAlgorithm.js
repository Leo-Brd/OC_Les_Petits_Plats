// Search algorithm - Pure filtering logic (no UI)
// Uses only native for/while loops

/**
 * Check if text contains query (case-insensitive)
 * @param {string} text
 * @param {string} query
 * @returns {boolean}
 */
function containsQuery(text, query) {
  if (!text || !query) return false;
  return text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
}

/**
 * Check if recipe matches main search query
 * Searches in: title, description, ingredients
 * @param {Object} recipe
 * @param {string} query
 * @returns {boolean}
 */
function matchesMainSearch(recipe, query) {
  if (!query || query.length < 3) return true;
  
  // Check title
  if (containsQuery(recipe.name, query)) return true;
  
  // Check description
  if (containsQuery(recipe.description, query)) return true;
  
  // Check ingredients using for loop
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (containsQuery(recipe.ingredients[i].ingredient, query)) return true;
  }
  
  return false;
}

/**
 * Check if recipe contains all selected ingredient tags
 * @param {Object} recipe
 * @param {Array} tags
 * @returns {boolean}
 */
function matchesIngredientTags(recipe, tags) {
  if (tags.length === 0) return true;
  
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i].toLowerCase();
    let found = false;
    
    for (let j = 0; j < recipe.ingredients.length; j++) {
      if (recipe.ingredients[j].ingredient.toLowerCase().indexOf(tag) !== -1) {
        found = true;
        break;
      }
    }
    
    if (!found) return false;
  }
  
  return true;
}

/**
 * Check if recipe matches all selected appliance tags
 * @param {Object} recipe
 * @param {Array} tags
 * @returns {boolean}
 */
function matchesApplianceTags(recipe, tags) {
  if (tags.length === 0) return true;
  
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i].toLowerCase();
    if (recipe.appliance.toLowerCase().indexOf(tag) === -1) {
      return false;
    }
  }
  
  return true;
}

/**
 * Check if recipe contains all selected ustensil tags
 * @param {Object} recipe
 * @param {Array} tags
 * @returns {boolean}
 */
function matchesUstensilTags(recipe, tags) {
  if (tags.length === 0) return true;
  
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i].toLowerCase();
    let found = false;
    
    for (let j = 0; j < recipe.ustensils.length; j++) {
      if (recipe.ustensils[j].toLowerCase().indexOf(tag) !== -1) {
        found = true;
        break;
      }
    }
    
    if (!found) return false;
  }
  
  return true;
}

/**
 * Filter recipes based on search query and tags
 * @param {Array} recipes - All recipes
 * @param {string} searchQuery - Main search query
 * @param {Object} tags - Selected tags { ingredients: [], appliances: [], ustensils: [] }
 * @returns {Array} - Filtered recipes
 */
export function filterRecipes(recipes, searchQuery, tags) {
  const filtered = [];
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    // Check all filters (AND logic)
    if (!matchesMainSearch(recipe, searchQuery)) continue;
    if (!matchesIngredientTags(recipe, tags.ingredients)) continue;
    if (!matchesApplianceTags(recipe, tags.appliances)) continue;
    if (!matchesUstensilTags(recipe, tags.ustensils)) continue;
    
    filtered.push(recipe);
  }
  
  return filtered;
}

/**
 * Filter items list based on query (for dropdown search)
 * @param {Array} items
 * @param {string} query
 * @returns {Array}
 */
export function filterDropdownItems(items, query) {
  if (!query || query.length === 0) return items;
  
  const filtered = [];
  const lowerQuery = query.toLowerCase();
  
  for (let i = 0; i < items.length; i++) {
    if (items[i].toLowerCase().indexOf(lowerQuery) !== -1) {
      filtered.push(items[i]);
    }
  }
  
  return filtered;
}
