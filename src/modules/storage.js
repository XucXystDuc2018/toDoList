//handle local storage saving/loading

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

export function save(lists, selectedListId) {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

export function load() {
  return {
    lists: JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [],
    selectedListId: localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
  };
}

