import { format, differenceInMinutes, differenceInDays, formatRelative, formatDistance, subDays } from 'date-fns'
import lists from './list'

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
  const popupAlert = document.querySelector('.pop-up-alert')
  const radioButton = document.querySelectorAll('.radio-button')
  
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
    // const dt = new Date();
    // const currentDate = task.date
    
    const priorityTask = document.createElement('p');
    priorityTask.textContent = task.priority
    const trashTask = document.createElement('p');
    trashTask.setAttribute('class', 'delete-tast')
    trashTask.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    
    const newTeskAlert = document.querySelector('.task-created-alert')
    newTeskAlert.textContent = `${task.title} was successfully created`
    newTeskAlert.style.display = 'block'
    
    labelTask.appendChild(spanTask)
    divTask.appendChild(checkboxTask)
    divTask.appendChild(labelTask)
    divTask.appendChild(descriptionTask)
    divTask.appendChild(dateTask)
    divTask.appendChild(priorityTask)
    divTask.appendChild(trashTask)
    todoBody.appendChild(divTask)
    
    setTimeout(() => {
      newTeskAlert.textContent = ''
      newTeskAlert.style.display = 'none'
    }, 3000);
  }
  
  const checkingValidation = (title, description, date, priority, e) => {
    if (!(title === "" || description === "" || date === "" || priority === "")) {
      const newTask = new Task(title, description, date, priority)
      const listName = switchList()
      localStorageTask.listName.push(newTask)
      console.log(listName)
      localStorage.setItem(switchList(), JSON.stringify(localStorageTask.listName))
      addNewTask(newTask)
      resetForm(e)
    } else {
      popupAlert.style.display = 'block'
      setTimeout(() => {
        popupAlert.style.display = 'none'
      }, 3000);
    }
  }
  
  const resetForm = (e) => {
    e.title.value = ''
    e.description.value = ''
    e.date.value = ''
    radioButton.forEach(button => button.checked = false)
  }
  
  const deleteTask = () => {
    const removeTask = document.querySelectorAll('.delete-tast')
    
    removeTask.forEach(button => button.addEventListener('click', (e) => {
      const task = e.target.parentElement.parentElement.parentElement
      task.classList.toggle('fall')
    }))
  }
  
  const addTask = (e) => {
    e.preventDefault()
    const title = e.target.title.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    const priority = e.target.priority.value;
    checkingValidation(title, description, date, priority, e.target)
    deleteTask()
  }
  
  form.addEventListener('submit', addTask)
})()

export default task