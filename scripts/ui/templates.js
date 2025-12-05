// HTML Templates
// Uses only native for/while loops for iterations

import { getUniqueIngredients, getUniqueAppliances, getUniqueUstensils } from '../utils/dataExtractors.js';

/**
 * Create HTML for a filter dropdown
 * @param {string} id - Filter identifier
 * @param {string} label - Filter label
 * @param {Array} items - Items to display
 * @returns {string}
 */
export function createFilterDropdownHTML(id, label, items) {
  let itemsHTML = '';
  
  for (let i = 0; i < items.length; i++) {
    itemsHTML += `<li class="py-1.5 px-4 hover:bg-[#FFD15B] cursor-pointer text-sm font-normal text-[#1B1B1B]" data-value="${items[i]}">${items[i]}</li>`;
  }
  
  return `
    <div class="filter-wrapper w-[195px] h-14 relative" data-filter="${id}">
      <div class="filter-closed bg-white rounded-[11px] shadow-sm w-full px-4 py-4 cursor-pointer">
        <div class="filter-header flex items-center justify-between">
          <span class="font-manrope text-base font-medium text-[#1B1B1B]">${label}</span>
          <img src="assets/logos/arrow_down.svg" alt="" class="w-[13px] h-4 filter-arrow transition-transform duration-200" aria-hidden="true" />
        </div>
      </div>
      
      <div class="filter-opened hidden absolute top-0 left-0 w-full bg-white rounded-[11px] shadow-lg px-4 py-4 z-[9999]">
        <div class="filter-header-open flex items-center justify-between cursor-pointer">
          <span class="font-manrope text-base font-medium text-[#1B1B1B]">${label}</span>
          <img src="assets/logos/arrow_down.svg" alt="" class="w-[13px] h-4 rotate-180" aria-hidden="true" />
        </div>
        <div class="mt-4">
          <div class="flex items-center gap-2 mb-3 py-1.5 px-1 border border-[#C6C6C6]">
            <input 
              type="text" 
              class="filter-input flex-1 text-sm font-normal focus:outline-none font-manrope text-[#1B1B1B] bg-transparent rounded-xs w-[70%]" 
              placeholder=""
            />
            <button type="button" class="filter-clear hidden w-2 h-2 shrink-0 cursor-pointer">
              <img src="assets/logos/cross.svg" alt="Effacer" class="w-2 h-2 block" aria-hidden="true"/>
            </button>
            <img class="w-3.5 h-3.5" src="assets/logos/gray_search_logo.svg" alt="" aria-hidden="true" />
          </div>
          <ul class="filter-list flex flex-col max-h-[200px] overflow-y-auto font-manrope -mx-4">
            ${itemsHTML}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create HTML for the filters bar
 * @param {Array} recipes
 * @returns {string}
 */
export function createFiltersBarHTML(recipes) {
  const ingredients = getUniqueIngredients(recipes);
  const appliances = getUniqueAppliances(recipes);
  const ustensils = getUniqueUstensils(recipes);
  
  return `
    <div class="flex gap-8 justify-start items-center w-full">
      ${createFilterDropdownHTML('ingredients', 'Ingrédients', ingredients)}
      ${createFilterDropdownHTML('appliances', 'Appareils', appliances)}
      ${createFilterDropdownHTML('ustensils', 'Ustensiles', ustensils)}
      <span class="ml-auto mr-16 text-black font-normal text-[21px]" style="font-family: 'Anton', sans-serif;">${recipes.length} recettes</span>
    </div>
  `;
}

/**
 * Create HTML for a recipe card
 * @param {Object} recipe
 * @returns {string}
 */
export function createRecipeCardHTML(recipe) {
  let ingredientsHTML = '';
  
  for (let i = 0; i < recipe.ingredients.length; i++) {
    const ing = recipe.ingredients[i];
    ingredientsHTML += `
      <span>
        <span class="font-medium text-[#1B1B1B]">${ing.ingredient}</span>
        ${ing.quantity ? `<br><span class="font-normal text-[#7A7A7A]">${ing.quantity}${ing.unit ? ` ${ing.unit}` : ''}</span>` : ''}
      </span>
    `;
  }
  
  return `
    <div class="bg-white rounded-[21px] shadow-lg overflow-hidden flex flex-col w-[380px] min-h-[520px] mb-8">
      <div class="relative w-full h-[220px]">
        <img src="assets/menu_photos/${recipe.image}" alt="${recipe.name}" class="object-cover w-full h-full" />
        <span class="absolute top-4 right-4 bg-[#FFD15B] text-black text-xs font-normal px-3 py-1 rounded-[14px]">${recipe.time}min</span>
      </div>
      <div class="p-6 flex flex-col flex-1">
        <h2 class="font-medium text-lg mb-6" style="font-family: 'Anton', sans-serif;">${recipe.name}</h2>
        <h3 class="text-xs font-bold text-[#7A7A7A] mb-2">RECETTE</h3>
        <p class="text-sm text-[#1B1B1B] mb-8 font-normal" style="font-family: 'Manrope', sans-serif;">${recipe.description}</p>
        <h3 class="text-xs font-bold text-[#7A7A7A] mb-4">INGRÉDIENTS</h3>
        <div class="grid grid-cols-2 gap-x-4 gap-y-4 text-sm" style="font-family: 'Manrope', sans-serif;">
          ${ingredientsHTML}
        </div>
      </div>
    </div>
  `;
}

/**
 * Create HTML for a tag
 * @param {string} value
 * @param {string} category
 * @returns {string}
 */
export function createTagHTML(value, category) {
  return `
    <span class="tag w-[195px] flex items-center justify-between bg-[#FFD15B] rounded-[10px] px-4 py-4 text-sm font-normal" data-category="${category}" data-value="${value}" style="font-family: 'Manrope', sans-serif;">
      ${value}
      <button type="button" class="tag-remove cursor-pointer">
        <img src="assets/logos/black_cross.svg" alt="Retirer" class="w-3.5 h-3.5" />
      </button>
    </span>
  `;
}
