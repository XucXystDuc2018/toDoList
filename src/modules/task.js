//handles list and task creation

export function createList(name){
    return {id: Date.now().toString(), name: name, tasks: []}
}

export function createTask(name, dueDate, priority){
    return {id: Date.now().toString(), name: name, dueDate: dueDate, priority: priority, complete: false}
}
