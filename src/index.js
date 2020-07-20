const task = (() => {
  class Task {
    constructor(title, description, date, priority) {
      this.title = title
      this.description = description
      this.date = date
      this.priority = priority
    }
  }

  const createButton = document.querySelector('.new-task-creator')
  const form = document.querySelector('#task-form')
  
  createButton.addEventListener('click', (e) => {
    const popUpForm = document.querySelector('.pop-up-form')
    popUpForm.style.display = 'block'
  })

  const addNewTask = (task) => {
    const todoBody = document.querySelector('.todo-body')
    const divTasks = document.createElement('div');
    divTasks.setAttribute('class', 'tasks');
    const divTask = document.createElement('div');
    divTask.setAttribute('class', 'task');
    const checkboxTask = document.createElement('input');
    checkboxTask.setAttribute('type', 'checkbox');
    checkboxTask.setAttribute('id', 'task-1');
    const labelTask = document.createElement('label');
    labelTask.setAttribute('for', 'task-1')
    const spanTask = document.createElement('span');
    spanTask.setAttribute('class', 'custom-checkbox')
    labelTask.textContent = task.title
    const descriptionTask = document.createElement('p');
    descriptionTask.textContent = task.description
    const dateTask = document.createElement('p');
    dateTask.textContent = task.date
    const priorityTask = document.createElement('p');
    priorityTask.textContent = task.priority
    const trashTask = document.createElement('p');
  
  
    labelTask.appendChild(spanTask)
    divTask.appendChild(checkboxTask)
    divTask.appendChild(labelTask)
    divTask.appendChild(descriptionTask)
    divTask.appendChild(dateTask)
    divTask.appendChild(priorityTask)
    divTask.appendChild(trashTask)
    todoBody.appendChild(divTask)
  }
  

  const addTask = (e) => {
    e.preventDefault()
    const title =e.target.title.value;
    const description =e.target.description.value;
    const date =e.target.date.value;
    const priority =e.target.priority.value;
    const newTask = new Task(title, description, date, priority)
    addNewTask(newTask)
  }

  form.addEventListener('submit', addTask)

  return form
})()



