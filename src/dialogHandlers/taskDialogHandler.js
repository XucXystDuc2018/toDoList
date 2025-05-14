import { createTask } from '../modules/task.js';
import { render, setAppState, getAppState } from '../modules/dom.js';
import { load } from '../modules/storage.js';

const openTaskFormButton = document.querySelector('[data-open-task-form-button]');
const cancelSubmitButton = document.querySelector('[data-cancel-submit-button]');
const modal = document.querySelector('#modal');
const newTaskForm = document.querySelector('[data-new-task-form]');

const newTaskNameInput = document.querySelector('[data-new-task-name-input]');
const newTaskDueDateInput = document.querySelector('[data-new-task-duedate-input]');
const newTaskPriorityInput = document.querySelector('[data-new-task-priority-input]');

export function handleTaskDialog(){
    const { lists, selectedListId } = load();
    setAppState({ lists, selectedListId });

    openTaskFormButton.addEventListener('click', e => {
        modal.show();
    })

    cancelSubmitButton.addEventListener('click', e => {
        newTaskForm.reset();
        modal.close();
    })

    newTaskForm.addEventListener('submit', e => {
        e.preventDefault();
        const state = getAppState();

        let taskName = newTaskNameInput.value.trim();
        let taskDueDate = newTaskDueDateInput.value;
        let taskPriority = newTaskPriorityInput.value;
        if (!taskName || !taskDueDate || !taskPriority){
            return;
        } else {
            const newTask = createTask(taskName, taskDueDate, taskPriority);
            newTaskForm.reset(); //clear task form input
            modal.close();
            const selectedList = state.lists.find(list => list.id === state.selectedListId);
            selectedList.tasks.push(newTask);
            render();
        }
        
    })

}
