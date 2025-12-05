// Search algorithm - Pure filtering logic (no UI)
// Uses Array methods (forEach, filter, some, every, etc.)

/**
 * Check if text contains query (case-insensitive)
 * @param {string} text
 * @param {string} query
 * @returns {boolean}
 */
function containsQuery(text, query) {
  if (!text || !query) return false;
  return text.toLowerCase().includes(query.toLowerCase());
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
  
  // Check ingredients using Array.some()
  return recipe.ingredients.some(ing => containsQuery(ing.ingredient, query));
}

/**
 * Check if recipe contains all selected ingredient tags
 * @param {Object} recipe
 * @param {Array} tags
 * @returns {boolean}
 */
function matchesIngredientTags(recipe, tags) {
  if (tags.length === 0) return true;
  
  // All tags must be found (every), and for each tag, at least one ingredient must match (some)
  return tags.every(tag => {
    const lowerTag = tag.toLowerCase();
    return recipe.ingredients.some(ing => 
      ing.ingredient.toLowerCase().includes(lowerTag)
    );
  });
}

/**
 * Check if recipe matches all selected appliance tags
 * @param {Object} recipe
 * @param {Array} tags
 * @returns {boolean}
 */
function matchesApplianceTags(recipe, tags) {
  if (tags.length === 0) return true;
  
  // All tags must match the appliance
  return tags.every(tag => 
    recipe.appliance.toLowerCase().includes(tag.toLowerCase())
  );
}

/**
 * Check if recipe contains all selected ustensil tags
 * @param {Object} recipe
 * @param {Array} tags
 * @returns {boolean}
 */
function matchesUstensilTags(recipe, tags) {
  if (tags.length === 0) return true;
  
  // All tags must be found (every), and for each tag, at least one ustensil must match (some)
  return tags.every(tag => {
    const lowerTag = tag.toLowerCase();
    return recipe.ustensils.some(ustensil => 
      ustensil.toLowerCase().includes(lowerTag)
    );
  });
}

/**
 * Filter recipes based on search query and tags
 * @param {Array} recipes - All recipes
 * @param {string} searchQuery - Main search query
 * @param {Object} tags - Selected tags { ingredients: [], appliances: [], ustensils: [] }
 * @returns {Array} - Filtered recipes
 */
export function filterRecipes(recipes, searchQuery, tags) {
  return recipes.filter(recipe => {
    // Check all filters (AND logic)
    if (!matchesMainSearch(recipe, searchQuery)) return false;
    if (!matchesIngredientTags(recipe, tags.ingredients)) return false;
    if (!matchesApplianceTags(recipe, tags.appliances)) return false;
    if (!matchesUstensilTags(recipe, tags.ustensils)) return false;
    
    return true;
  });
}

/**
 * Filter items list based on query (for dropdown search)
 * @param {Array} items
 * @param {string} query
 * @returns {Array}
 */
export function filterDropdownItems(items, query) {
  if (!query || query.length === 0) return items;
  
  const lowerQuery = query.toLowerCase();
  return items.filter(item => item.toLowerCase().includes(lowerQuery));
}
