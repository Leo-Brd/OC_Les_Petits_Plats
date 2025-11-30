// Utility functions for filters using native loops only

/**
 * Extract unique ingredients from recipes array
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} - Sorted array of unique ingredient names
 */
export function getUniqueIngredients(recipes) {
  const ingredients = [];
  const seen = {};
  
  // Use for loop to iterate through recipes
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    // Use for loop to iterate through ingredients of each recipe
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      const lowerIngredient = ingredient.toLowerCase();
      
      // Add only if not already seen
      if (!seen[lowerIngredient]) {
        seen[lowerIngredient] = true;
        ingredients.push(ingredient);
      }
    }
  }
  
  // Sort alphabetically using native sort
  ingredients.sort((a, b) => a.localeCompare(b));
  
  return ingredients;
}

/**
 * Extract unique appliances from recipes array
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} - Sorted array of unique appliance names
 */
export function getUniqueAppliances(recipes) {
  const appliances = [];
  const seen = {};
  
  // Use for loop to iterate through recipes
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const appliance = recipe.appliance;
    const lowerAppliance = appliance.toLowerCase();
    
    // Add only if not already seen
    if (!seen[lowerAppliance]) {
      seen[lowerAppliance] = true;
      appliances.push(appliance);
    }
  }
  
  // Sort alphabetically using native sort
  appliances.sort((a, b) => a.localeCompare(b));
  
  return appliances;
}

/**
 * Extract unique ustensils from recipes array
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} - Sorted array of unique ustensil names
 */
export function getUniqueUstensils(recipes) {
  const ustensils = [];
  const seen = {};
  
  // Use for loop to iterate through recipes
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    // Use for loop to iterate through ustensils of each recipe
    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      const lowerUstensil = ustensil.toLowerCase();
      
      // Add only if not already seen
      if (!seen[lowerUstensil]) {
        seen[lowerUstensil] = true;
        ustensils.push(ustensil);
      }
    }
  }
  
  // Sort alphabetically using native sort
  ustensils.sort((a, b) => a.localeCompare(b));
  
  return ustensils;
}

/**
 * Filter items based on search query using native loops
 * @param {Array} items - Array of items to filter
 * @param {string} query - Search query
 * @returns {Array} - Filtered array of items
 */
export function filterItems(items, query) {
  if (!query || query.length === 0) {
    return items;
  }
  
  const filtered = [];
  const lowerQuery = query.toLowerCase();
  
  // Use for loop to filter items
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.toLowerCase().includes(lowerQuery)) {
      filtered.push(item);
    }
  }
  
  return filtered;
}
