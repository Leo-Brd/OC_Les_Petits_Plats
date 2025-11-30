// Main search bar interactions

// Callback when search query changes
let onSearchChange = null;

/**
 * Set callback for when search changes
 * @param {Function} callback - (query) => void
 */
export function setOnSearchChange(callback) {
  onSearchChange = callback;
}

/**
 * Initialize main search bar
 */
export function initMainSearch() {
  const searchInput = document.getElementById('main-search-input');
  const searchForm = document.getElementById('main-search-form');
  const clearButton = document.getElementById('main-search-clear');
  
  if (!searchInput || !searchForm || !clearButton) {
    console.error('Main search elements not found');
    return;
  }
  
  // Prevent form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  // Listen for input changes
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // Show/hide clear button
    if (query.length > 0) {
      clearButton.classList.remove('hidden');
    } else {
      clearButton.classList.add('hidden');
    }
    
    if (onSearchChange) {
      onSearchChange(query);
    }
  });
  
  // Clear button click
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.classList.add('hidden');
    
    if (onSearchChange) {
      onSearchChange('');
    }
    
    searchInput.focus();
  });
}
