import { createTask } from '../modules/task.js';
import { render, setAppState, getAppState } from '../modules/dom.js';
import { load, save } from '../modules/storage.js';

const editTaskModal = document.querySelector("#edit-task-modal");
const cancelTaskEditButton = document.querySelector('[data-cancel-edit-button]');
const editTaskForm = document.querySelector('[data-edit-task-form]');

const editTaskNameInput = document.querySelector('[data-edit-task-name-input]');
const editTaskDueDateInput = document.querySelector('[data-edit-task-duedate-input]')
const editTaskPriorityInput = document.querySelector('[data-edit-task-priority-input]')

export function addEditDialogListener(button){
    const state = getAppState();

    button.addEventListener('click', e => {
        //get the current data of the selected task
        const selectedList = state.lists.find(list => list.id === state.selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        editTaskForm.dataset.editTaskFormId = e.target.id; //make the data id of the general edit form refers to the current editing task
        
        //put the current data of the selected task inside the input
        editTaskNameInput.value = selectedTask.name;
        editTaskDueDateInput.value = selectedTask.dueDate;
        editTaskPriorityInput.value = selectedTask.priority;

        editTaskModal.showModal();
    })
}

export function handleTaskEditDialog(){

    cancelTaskEditButton.addEventListener('click', () => {
        editTaskModal.close();

    });
 
    editTaskForm.addEventListener('submit', e => {
        e.preventDefault();
        const state = getAppState();
        let taskName = editTaskNameInput.value.trim();
        let taskDueDate = editTaskDueDateInput.value;
        let taskPriority = editTaskPriorityInput.value;

        const selectedList = state.lists.find(list => list.id === state.selectedListId);
        if (!selectedList) return console.error("Selected list not found.");

        const selectedTask = selectedList.tasks.find(task => task.id === editTaskForm.dataset.editTaskFormId);
        if (!selectedTask) return console.error("Task not found.");

        selectedTask.name = taskName;
        selectedTask.dueDate = taskDueDate;
        selectedTask.priority = taskPriority;
        editTaskForm.reset();
        editTaskModal.close();
        render();
    })
}