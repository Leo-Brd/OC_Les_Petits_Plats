// Tags rendering and interactions
// Uses Array methods (map, forEach, etc.)

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
  
  // Generate HTML for all tags using map and join
  const html = [
    ...tags.ingredients.map(tag => createTagHTML(tag, 'ingredients')),
    ...tags.appliances.map(tag => createTagHTML(tag, 'appliances')),
    ...tags.ustensils.map(tag => createTagHTML(tag, 'ustensils'))
  ].join('');
  
  container.innerHTML = html;
  
  // Attach remove listeners using forEach
  const removeButtons = container.querySelectorAll('.tag-remove');
  
  Array.from(removeButtons).forEach(button => {
    const tag = button.closest('.tag');
    const category = tag.dataset.category;
    const value = tag.dataset.value;
    
    button.addEventListener('click', () => {
      if (onTagRemoved) {
        onTagRemoved(category, value);
      }
    });
  });
}
