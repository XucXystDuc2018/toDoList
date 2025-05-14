import { createList, createTask } from './task.js';
import { render, setAppState, getAppState } from './dom.js';
import { load, save } from './storage.js';

const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');

const tasksContainer = document.querySelector('[data-tasks]');

export function setupEventListeners() {
  const { lists, selectedListId } = load();
  setAppState({ lists, selectedListId });

  listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
      const state = getAppState();
      state.selectedListId = e.target.dataset.listId;
      render()
    }
  });

  tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const state = getAppState();
      const selectedList = state.lists.find(list => list.id === state.selectedListId);
      const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
      selectedTask.complete = e.target.checked;
      render();
    }
  });

  deleteListButton.addEventListener('click', () => {
    const state = getAppState();
    state.lists = state.lists.filter(list => list.id !== state.selectedListId);
    state.selectedListId = null;
    render()
  });

  clearCompleteTasksButton.addEventListener('click', () => {
    const state = getAppState();
    const selectedList = state.lists.find(list => list.id === state.selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    render()
  });

  newListForm.addEventListener('submit', e => {
    e.preventDefault();//prevent form submiting itself and reload the page
    const state = getAppState();
    const listName = newListInput.value.trim();
    if (!listName) return;
    const list = createList(listName);
    newListInput.value = null; //clear list input
    state.lists.push(list);
    render()
  });

}
