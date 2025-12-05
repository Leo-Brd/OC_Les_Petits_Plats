// Data extraction utilities
// Uses Array methods (forEach, flatMap, reduce, etc.)

/**
 * Extract unique ingredients from recipes
 * @param {Array} recipes
 * @returns {Array} - Sorted unique ingredients
 */
export function getUniqueIngredients(recipes) {
  const seen = new Map();
  
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const key = ing.ingredient.toLowerCase();
      if (!seen.has(key)) {
        seen.set(key, ing.ingredient);
      }
    });
  });
  
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}

/**
 * Extract unique appliances from recipes
 * @param {Array} recipes
 * @returns {Array} - Sorted unique appliances
 */
export function getUniqueAppliances(recipes) {
  const seen = new Map();
  
  recipes.forEach(recipe => {
    const key = recipe.appliance.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, recipe.appliance);
    }
  });
  
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}

/**
 * Extract unique ustensils from recipes
 * @param {Array} recipes
 * @returns {Array} - Sorted unique ustensils
 */
export function getUniqueUstensils(recipes) {
  const seen = new Map();
  
  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      const key = ustensil.toLowerCase();
      if (!seen.has(key)) {
        seen.set(key, ustensil);
      }
    });
  });
  
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}
