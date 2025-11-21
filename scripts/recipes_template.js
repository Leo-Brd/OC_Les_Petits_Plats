// Template et affichage des filtres + nombre de recettes + cards

// Affiche les filtres et le nombre de recettes
export function renderFiltersAndCount(recipes) {
  const container = document.getElementById('filters-bar');
  if (!container) return;
  container.innerHTML = `
    <div class="flex gap-8 justify-start items-center w-full mb-8">
      <div class="bg-white rounded-[11px] px-3 py-3 shadow-md cursor-pointer w-[195px]">
        <button class="font-manrope text-base font-medium flex items-center gap-2 cursor-pointer w-full justify-between">Ingrédients <img src="assets/logos/arrow_down.svg" alt="" class="w-[13px] h-4 ml-2" aria-hidden="true" /></button>
      </div>
      <div class="bg-white rounded-[11px] px-3 py-3 shadow-md cursor-pointer w-[195px]">
        <button class="font-manrope text-base font-medium flex items-center gap-2 cursor-pointer w-full justify-between">Appareils <img src="assets/logos/arrow_down.svg" alt="" class="w-[13px] h-4 ml-2" aria-hidden="true" /></button>
      </div>
      <div class="bg-white rounded-[11px] px-3 py-3 shadow-md cursor-pointer w-[195px]">
        <button class="font-manrope text-base font-medium flex items-center gap-2 cursor-pointer w-full justify-between">Ustensiles <img src="assets/logos/arrow_down.svg" alt="" class="w-[13px] h-4 ml-2" aria-hidden="true" /></button>
      </div>
      <span class="ml-auto mr-16 text-black font-normal text-[21px]" style="font-family: 'Anton', sans-serif;">${recipes.length} recettes</span>
    </div>
  `;
}

// Card factory pour une recette
export function recipeCard(recipe) {
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
          ${recipe.ingredients.map(ing => `
            <span>
              <span class="font-medium text-[#1B1B1B]">${ing.ingredient}</span>
              ${ing.quantity ? `<br><span class=\"font-normal text-[#7A7A7A]\">${ing.quantity}${ing.unit ? ` ${ing.unit}` : ''}</span>` : ''}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Affiche toutes les cards de recettes
export function renderRecipeCards(recipes) {
  const grid = document.getElementById('recipes-grid');
  if (!grid) return;
  grid.innerHTML = recipes.map(recipeCard).join('');
}

// Fonction d'initialisation à appeler dans index.js
export function renderRecipesUI(recipes) {
  renderFiltersAndCount(recipes);
  renderRecipeCards(recipes);
}
