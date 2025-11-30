// Tags rendering and interactions
// Uses only native for/while loops

import { createTagHTML } from './templates.js';
import { getSelectedTags } from '../state/appState.js';

// Callback when a tag is removed
let onTagRemoved = null;

/**
 * Set callback for when a tag is removed
 * @param {Function} callback - (category, value) => void
 */
export function setOnTagRemoved(callback) {
  onTagRemoved = callback;
}

/**
 * Render all tags
 */
export function renderTags() {
  const container = document.getElementById('tags-container');
  if (!container) return;
  
  const tags = getSelectedTags();
  let html = '';
  
  // Render ingredient tags
  for (let i = 0; i < tags.ingredients.length; i++) {
    html += createTagHTML(tags.ingredients[i], 'ingredients');
  }
  
  // Render appliance tags
  for (let i = 0; i < tags.appliances.length; i++) {
    html += createTagHTML(tags.appliances[i], 'appliances');
  }
  
  // Render ustensil tags
  for (let i = 0; i < tags.ustensils.length; i++) {
    html += createTagHTML(tags.ustensils[i], 'ustensils');
  }
  
  container.innerHTML = html;
  
  // Attach remove listeners
  const removeButtons = container.querySelectorAll('.tag-remove');
  for (let i = 0; i < removeButtons.length; i++) {
    const button = removeButtons[i];
    const tag = button.closest('.tag');
    const category = tag.dataset.category;
    const value = tag.dataset.value;
    
    button.addEventListener('click', () => {
      if (onTagRemoved) {
        onTagRemoved(category, value);
      }
    });
  }
}
