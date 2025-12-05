// Filter dropdowns rendering and interactions
// Uses Array methods (map, forEach, filter, etc.)

import { createFiltersBarHTML } from './templates.js';
import { filterDropdownItems } from '../algorithms/searchAlgorithm.js';

// Callback when a filter item is selected
let onItemSelected = null;

/**
 * Set callback for when an item is selected
 * @param {Function} callback - (category, value) => void
 */
export function setOnItemSelected(callback) {
  onItemSelected = callback;
}

/**
 * Render filters bar
 * @param {Array} recipes
 */
export function renderFiltersBar(recipes) {
  const container = document.getElementById('filters-bar');
  if (!container) return;
  
  container.innerHTML = createFiltersBarHTML(recipes);
}

/**
 * Initialize filter dropdown interactions
 */
export function initFilterDropdowns() {
  const filterWrappers = document.querySelectorAll('.filter-wrapper');
  
  // Use forEach on NodeList (converted to Array)
  Array.from(filterWrappers).forEach(wrapper => setupDropdown(wrapper));
  
  // Close all filters when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-wrapper')) {
      closeAllFilters();
    }
  });
}

/**
 * Setup a single dropdown
 * @param {HTMLElement} wrapper
 */
function setupDropdown(wrapper) {
  const filterClosed = wrapper.querySelector('.filter-closed');
  const filterOpened = wrapper.querySelector('.filter-opened');
  const filterHeader = wrapper.querySelector('.filter-header');
  const filterHeaderOpen = wrapper.querySelector('.filter-header-open');
  const filterInput = wrapper.querySelector('.filter-input');
  const filterClear = wrapper.querySelector('.filter-clear');
  const filterList = wrapper.querySelector('.filter-list');
  
  // Store original items using map
  const listItems = filterList.querySelectorAll('li');
  const originalItems = Array.from(listItems).map(item => ({
    value: item.dataset.value,
    html: item.outerHTML
  }));
  
  // Open filter
  filterHeader.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllFilters();
    filterClosed.classList.add('hidden');
    filterOpened.classList.remove('hidden');
    setTimeout(() => filterInput.focus(), 50);
  });
  
  // Close filter
  filterHeaderOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    closeDropdown(wrapper, filterClosed, filterOpened, filterInput, filterClear, filterList, originalItems);
  });
  
  // Search input
  filterInput.addEventListener('input', (e) => {
    const query = e.target.value;
    
    // Show/hide clear button
    if (query.length > 0) {
      filterClear.classList.remove('hidden');
    } else {
      filterClear.classList.add('hidden');
    }
    
    // Get values using map
    const values = originalItems.map(item => item.value);
    
    // Filter and rebuild list
    const filtered = filterDropdownItems(values, query);
    rebuildList(filterList, originalItems, filtered, wrapper);
  });
  
  // Clear button
  filterClear.addEventListener('click', (e) => {
    e.stopPropagation();
    filterInput.value = '';
    filterClear.classList.add('hidden');
    restoreList(filterList, originalItems, wrapper);
    filterInput.focus();
  });
  
  // Initial click listeners
  attachListItemListeners(filterList, wrapper);
  
  // Store close method on wrapper
  wrapper._close = () => {
    closeDropdown(wrapper, filterClosed, filterOpened, filterInput, filterClear, filterList, originalItems);
  };
}

/**
 * Close a dropdown
 */
function closeDropdown(wrapper, filterClosed, filterOpened, filterInput, filterClear, filterList, originalItems) {
  filterClosed.classList.remove('hidden');
  filterOpened.classList.add('hidden');
  filterInput.value = '';
  filterClear.classList.add('hidden');
  restoreList(filterList, originalItems, wrapper);
}

/**
 * Rebuild list with filtered items
 */
function rebuildList(filterList, originalItems, filtered, wrapper) {
  // Filter originalItems to keep only those in filtered, then map to HTML
  const html = originalItems
    .filter(item => filtered.includes(item.value))
    .map(item => item.html)
    .join('');
  
  filterList.innerHTML = html;
  attachListItemListeners(filterList, wrapper);
}

/**
 * Restore full list
 */
function restoreList(filterList, originalItems, wrapper) {
  const html = originalItems.map(item => item.html).join('');
  filterList.innerHTML = html;
  attachListItemListeners(filterList, wrapper);
}

/**
 * Attach click listeners to list items
 */
function attachListItemListeners(filterList, wrapper) {
  const items = filterList.querySelectorAll('li');
  
  Array.from(items).forEach(item => {
    item.addEventListener('click', () => {
      const category = wrapper.dataset.filter;
      const value = item.dataset.value;
      
      if (onItemSelected) {
        onItemSelected(category, value);
      }
      
      if (wrapper._close) {
        wrapper._close();
      }
    });
  });
}

/**
 * Close all filter dropdowns
 */
function closeAllFilters() {
  const filterWrappers = document.querySelectorAll('.filter-wrapper');
  
  Array.from(filterWrappers).forEach(wrapper => {
    if (wrapper._close) {
      wrapper._close();
    }
  });
}
