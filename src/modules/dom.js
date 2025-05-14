//handles rendering and dom manipulation

import { save, load } from './storage.js';
import { clearElement } from './utils.js';
import { addEditDialogListener } from '../dialogHandlers/taskEditDialogHandler.js';

const listsContainer = document.querySelector('[data-lists]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById("task-template");

//This is a basic in-memory state management system. 
// Instead of relying on global variables like let lists = ... or let selectedListId = ..., 
// we wrap both inside a single object called state.
//this object is shared across the project, and can be directly mutated (thanks to JavaScript's reference behavior for objects)
let state = load(); //load data from local storage

export function setAppState(newState) {
  state = newState;
}

export function getAppState() {
  return state;
}

export function render() {
  clearElement(listsContainer);
  renderLists();

  const selectedList = state.lists.find(list => list.id === state.selectedListId);
  if (!selectedList) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
  save(state.lists, state.selectedListId); //save to local storage after rendering, this is basically renderAndSave()
}


function renderLists() {
  state.lists.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if (list.id === state.selectedListId) {
      listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
  });
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    const dueDatePara = taskElement.querySelector(".show-due-date");
    const priorityPara = taskElement.querySelector(".show-priority");
    const editTaskButton = taskElement.querySelector(".edit-task-btn");

    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    dueDatePara.innerText = task.dueDate;
    priorityPara.innerText = task.priority;
    editTaskButton.id = task.id;
    addEditDialogListener(editTaskButton);

    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
  const taskString = incompleteTaskCount <= 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}



