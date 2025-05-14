import { setupEventListeners } from './modules/eventsListener.js';
import { render } from './modules/dom.js';
import {handleTaskDialog} from './dialogHandlers/taskDialogHandler.js'
import {handleTaskEditDialog} from './dialogHandlers/taskEditDialogHandler.js'
import "./styles.css";

render();
setupEventListeners();
handleTaskDialog();
handleTaskEditDialog();
