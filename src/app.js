import { state } from './core.js';
import { render, setAuthMode } from './views.js';
import './interactions.js';
if (!state.session?.loggedIn) setAuthMode('landing');
render();
