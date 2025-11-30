// Filter dropdown interaction handlers using native loops only
import { filterItems } from './keywordParsing.js';

/**
 * Initialize filter dropdown interactions
 */
export function initFilterDropdowns() {
  const filterWrappers = document.querySelectorAll('.filter-wrapper');
  
  // Use for loop to set up each filter
  for (let i = 0; i < filterWrappers.length; i++) {
    const wrapper = filterWrappers[i];
    const filterClosed = wrapper.querySelector('.filter-closed');
    const filterOpened = wrapper.querySelector('.filter-opened');
    const filterHeader = wrapper.querySelector('.filter-header');
    const filterHeaderOpen = wrapper.querySelector('.filter-header-open');
    const filterArrow = wrapper.querySelector('.filter-arrow');
    const filterInput = wrapper.querySelector('.filter-input');
    const filterClear = wrapper.querySelector('.filter-clear');
    const filterList = wrapper.querySelector('.filter-list');
    
    let isOpen = false;
    
    // Store original items
    const originalItems = [];
    const listItems = filterList.querySelectorAll('li');
    for (let j = 0; j < listItems.length; j++) {
      originalItems.push({
        value: listItems[j].dataset.value,
        html: listItems[j].outerHTML
      });
    }
    
    // Open filter on closed header click
    filterHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      openFilter(wrapper);
    });
    
    // Close filter on opened header click
    filterHeaderOpen.addEventListener('click', (e) => {
      e.stopPropagation();
      closeFilter(wrapper);
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
      
      // Extract values from original items
      const values = [];
      for (let k = 0; k < originalItems.length; k++) {
        values.push(originalItems[k].value);
      }
      
      // Filter items
      const filtered = filterItems(values, query);
      
      // Rebuild list
      let newHTML = '';
      for (let k = 0; k < originalItems.length; k++) {
        const item = originalItems[k];
        
        // Check if item is in filtered list
        let isIncluded = false;
        for (let m = 0; m < filtered.length; m++) {
          if (filtered[m] === item.value) {
            isIncluded = true;
            break;
          }
        }
        
        if (isIncluded) {
          newHTML += item.html;
        }
      }
      
      filterList.innerHTML = newHTML;
      
      // Re-attach click listeners
      const newListItems = filterList.querySelectorAll('li');
      for (let k = 0; k < newListItems.length; k++) {
        newListItems[k].addEventListener('click', () => {
          handleItemClick(newListItems[k].dataset.value, wrapper);
        });
      }
    });
    
    // Clear button
    filterClear.addEventListener('click', (e) => {
      e.stopPropagation();
      filterInput.value = '';
      filterClear.classList.add('hidden');
      
      // Restore full list
      let newHTML = '';
      for (let k = 0; k < originalItems.length; k++) {
        newHTML += originalItems[k].html;
      }
      filterList.innerHTML = newHTML;
      
      // Re-attach listeners
      const newListItems = filterList.querySelectorAll('li');
      for (let k = 0; k < newListItems.length; k++) {
        newListItems[k].addEventListener('click', () => {
          handleItemClick(newListItems[k].dataset.value, wrapper);
        });
      }
      
      filterInput.focus();
    });
    
    // Attach click listeners to list items
    for (let j = 0; j < listItems.length; j++) {
      listItems[j].addEventListener('click', () => {
        handleItemClick(listItems[j].dataset.value, wrapper);
      });
    }
    
    // Store methods on wrapper
    wrapper._open = () => {
      isOpen = true;
      filterClosed.classList.add('hidden');
      filterOpened.classList.remove('hidden');
      setTimeout(() => filterInput.focus(), 50);
    };
    
    wrapper._close = () => {
      isOpen = false;
      filterClosed.classList.remove('hidden');
      filterOpened.classList.add('hidden');
      filterInput.value = '';
      filterClear.classList.add('hidden');
      
      // Restore full list
      let newHTML = '';
      for (let k = 0; k < originalItems.length; k++) {
        newHTML += originalItems[k].html;
      }
      filterList.innerHTML = newHTML;
      
      // Re-attach listeners
      const newListItems = filterList.querySelectorAll('li');
      for (let k = 0; k < newListItems.length; k++) {
        newListItems[k].addEventListener('click', () => {
          handleItemClick(newListItems[k].dataset.value, wrapper);
        });
      }
    };
    
    wrapper._isOpen = () => isOpen;
  }
  
  // Close all filters when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-wrapper')) {
      closeAllFilters();
    }
  });
}

/**
 * Open a specific filter
 */
function openFilter(wrapper) {
  // Close all other filters first
  closeAllFilters();
  
  if (wrapper._open) {
    wrapper._open();
  }
}

/**
 * Close all filters
 */
function closeAllFilters() {
  const filterWrappers = document.querySelectorAll('.filter-wrapper');
  for (let i = 0; i < filterWrappers.length; i++) {
    if (filterWrappers[i]._close) {
      filterWrappers[i]._close();
    }
  }
}

/**
 * Close specific filter
 */
function closeFilter(wrapper) {
  if (wrapper._close) {
    wrapper._close();
  }
}

/**
 * Handle item click
 */
function handleItemClick(value, wrapper) {
  console.log('Selected:', value);
  // TODO: Add tag creation and recipe filtering
  closeFilter(wrapper);
}
