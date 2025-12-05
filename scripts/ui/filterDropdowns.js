// Filter dropdowns rendering and interactions
// Uses only native for/while loops

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
  
  for (let i = 0; i < filterWrappers.length; i++) {
    setupDropdown(filterWrappers[i]);
  }
  
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
  
  // Store original items
  const originalItems = [];
  const listItems = filterList.querySelectorAll('li');
  for (let j = 0; j < listItems.length; j++) {
    originalItems.push({
      value: listItems[j].dataset.value,
      html: listItems[j].outerHTML
    });
  }
  
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
    
    // Get values
    const values = [];
    for (let k = 0; k < originalItems.length; k++) {
      values.push(originalItems[k].value);
    }
    
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
  let html = '';
  
  for (let k = 0; k < originalItems.length; k++) {
    const item = originalItems[k];
    let isIncluded = false;
    
    for (let m = 0; m < filtered.length; m++) {
      if (filtered[m] === item.value) {
        isIncluded = true;
        break;
      }
    }
    
    if (isIncluded) {
      html += item.html;
    }
  }
  
  filterList.innerHTML = html;
  attachListItemListeners(filterList, wrapper);
}

/**
 * Restore full list
 */
function restoreList(filterList, originalItems, wrapper) {
  let html = '';
  for (let k = 0; k < originalItems.length; k++) {
    html += originalItems[k].html;
  }
  filterList.innerHTML = html;
  attachListItemListeners(filterList, wrapper);
}

/**
 * Attach click listeners to list items
 */
function attachListItemListeners(filterList, wrapper) {
  const items = filterList.querySelectorAll('li');
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', () => {
      const category = wrapper.dataset.filter;
      const value = items[i].dataset.value;
      
      if (onItemSelected) {
        onItemSelected(category, value);
      }
      
      if (wrapper._close) {
        wrapper._close();
      }
    });
  }
}

/**
 * Close all filter dropdowns
 */
function closeAllFilters() {
  const filterWrappers = document.querySelectorAll('.filter-wrapper');
  for (let i = 0; i < filterWrappers.length; i++) {
    if (filterWrappers[i]._close) {
      filterWrappers[i]._close();
    }
  }
}
