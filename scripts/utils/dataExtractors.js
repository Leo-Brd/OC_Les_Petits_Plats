// Data extraction utilities
// Uses only native for/while loops

/**
 * Extract unique ingredients from recipes
 * @param {Array} recipes
 * @returns {Array} - Sorted unique ingredients
 */
export function getUniqueIngredients(recipes) {
  const items = [];
  const seen = {};
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      const key = ingredient.toLowerCase();
      
      if (!seen[key]) {
        seen[key] = true;
        items.push(ingredient);
      }
    }
  }
  
  items.sort((a, b) => a.localeCompare(b));
  return items;
}

/**
 * Extract unique appliances from recipes
 * @param {Array} recipes
 * @returns {Array} - Sorted unique appliances
 */
export function getUniqueAppliances(recipes) {
  const items = [];
  const seen = {};
  
  for (let i = 0; i < recipes.length; i++) {
    const appliance = recipes[i].appliance;
    const key = appliance.toLowerCase();
    
    if (!seen[key]) {
      seen[key] = true;
      items.push(appliance);
    }
  }
  
  items.sort((a, b) => a.localeCompare(b));
  return items;
}

/**
 * Extract unique ustensils from recipes
 * @param {Array} recipes
 * @returns {Array} - Sorted unique ustensils
 */
export function getUniqueUstensils(recipes) {
  const items = [];
  const seen = {};
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      const key = ustensil.toLowerCase();
      
      if (!seen[key]) {
        seen[key] = true;
        items.push(ustensil);
      }
    }
  }
  
  items.sort((a, b) => a.localeCompare(b));
  return items;
}
