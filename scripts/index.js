// Application entry point
import { recipes } from '../assets/recipes.js';
import { initState } from './state/appState.js';
import { initFilterController } from './controllers/filterController.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize state with all recipes
  initState(recipes);
  
  // Initialize filter controller (sets up UI and interactions)
  initFilterController();
});
