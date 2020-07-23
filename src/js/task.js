import lists from './list';

const task = (() => {
  class Task {
    constructor(title, description, date, priority) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
    }
  }

  const createButton = document.querySelector('.new-task-creator');
  const form = document.querySelector('#task-form');
  const popupAlert = document.querySelector('.pop-up-alert');
  const radioButton = document.querySelectorAll('.radio-button');

  const clearAllTasks = () => {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
      task.remove();
    });
  };

  const renderTasks = (tasks = '') => {
    clearAllTasks();
    if (tasks !== '') {
      Object.values(tasks).forEach((value) => {
        if (value !== undefined) {
          const todoBody = document.querySelector('.todo-body');
          const divTasks = document.createElement('div');
          divTasks.setAttribute('class', 'tasks');
          const divTask = document.createElement('div');
          divTask.setAttribute('class', 'task');
          const checkboxTask = document.createElement('input');
          checkboxTask.setAttribute('type', 'checkbox');
          checkboxTask.setAttribute('id', 'task-1');
          const labelTask = document.createElement('label');
          labelTask.setAttribute('for', 'task-1');
          const spanTask = document.createElement('span');
          spanTask.setAttribute('class', 'custom-checkbox');
          const titleDiv = document.createElement('div');
          titleDiv.textContent = value.title;
          const descriptionTask = document.createElement('p');
          descriptionTask.setAttribute('class', 'description-task');
          descriptionTask.textContent = value.description;
          const dateTask = document.createElement('p');
          dateTask.textContent = value.date;
          dateTask.setAttribute('class', 'date');

          const priorityTask = document.createElement('p');
          priorityTask.textContent = value.priority;
          priorityTask.setAttribute('class', 'priority');
          const trashTask = document.createElement('p');
          trashTask.setAttribute('class', 'delete-tast');
          trashTask.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

          const newTeskAlert = document.querySelector('.task-created-alert');

          labelTask.appendChild(spanTask);
          labelTask.appendChild(titleDiv);
          divTask.appendChild(labelTask);
          divTask.appendChild(checkboxTask);
          divTask.appendChild(descriptionTask);
          divTask.appendChild(dateTask);
          divTask.appendChild(priorityTask);
          divTask.appendChild(trashTask);
          todoBody.appendChild(divTask);

          newTeskAlert.textContent = `${value.title} task successfully created`;
          newTeskAlert.style.display = 'block';

          setTimeout(() => {
            newTeskAlert.textContent = '';
            newTeskAlert.style.display = 'none';
          }, 2000);

          const form = document.querySelector('.pop-up-form');
          form.style.display = 'none';
        }
      });
    }
  };

  const deleteTask = () => {
    const removeTask = document.querySelectorAll('.delete-tast');

    removeTask.forEach(button => button.addEventListener('click', (e) => {
      const task = e.target.parentElement.parentElement.parentElement;
      const taskBody = task.parentElement.parentElement;
      const taskListkey = taskBody.children[0].children[0].textContent;
      const title = task.children[0].children[1].textContent;
      const description = task.children[2].textContent;
      const date = task.children[3].textContent;
      const storageGetTasks = JSON.parse(localStorage.getItem(taskListkey));
      task.classList.toggle('fall');

      const deletedTask = storageGetTasks.find(task => task.title === title
        && task.description === description && task.date === date);

      const updatedStorageTasks = storageGetTasks.filter(obj => obj !== deletedTask);
      const deleteTaskAlert = document.querySelector('.task-deletion-alert');
      deleteTaskAlert.style.display = 'block';
      deleteTaskAlert.textContent = `${title} task successfully deleted`;

      setTimeout(() => {
        deleteTaskAlert.textContent = '';
        deleteTaskAlert.style.display = 'none';
      }, 2000);

      localStorage.setItem(taskListkey, JSON.stringify(updatedStorageTasks));
      task.remove();
    }));
  };

  const deleteList = () => {
    const deleteItem = document.querySelector('.removeList');
    deleteItem.addEventListener('click', () => {
      const currentList = lists.switchListKey();
      const listElement = document.querySelectorAll('.list-name');
      listElement.forEach(list => {
        if (list.textContent === currentList.key) {
          const alertMessage = document.querySelector('.switch-list-alert');
          const taskTitle = document.querySelector('.list-title');
          taskTitle.textContent = '';

          list.remove();
          localStorage.removeItem(currentList.key);
          renderTasks();
          alertMessage.style.display = 'block';
          alertMessage.textContent = `${currentList.key} list successfully deleted`;
          setTimeout(() => {
            alertMessage.textContent = '';
            alertMessage.style.display = 'none';
          }, 2000);
        }
      });
    });
  };

  const switchListAlert = (list = undefined) => {
    const alertMessage = document.querySelector('.switch-list-alert');
    if (list !== undefined) {
      alertMessage.textContent = `Switched to ${list}`;
      alertMessage.style.display = 'block';
    } else {
      alertMessage.style.display = 'block';
      alertMessage.textContent = 'Please select the list to add a task';
    }
    setTimeout(() => {
      alertMessage.textContent = '';
      alertMessage.style.display = 'none';
    }, 2000);
  };

  const renderListTasks = () => {
    const newLists = document.querySelectorAll('.list-name');
    const currentList = lists.switchListKey().key;
    newLists.forEach(list => list.addEventListener('click', (e) => {
      const currentKey = e.target.textContent;
      const getLocalStorageTasks = JSON.parse(localStorage.getItem(currentKey));
      renderTasks(getLocalStorageTasks);
      switchListAlert(currentKey);
      deleteTask();
      deleteList();
    }));
    const getLocalStorageTasks = JSON.parse(localStorage.getItem(currentList));
    renderTasks(getLocalStorageTasks);
    switchListAlert(currentList);
    deleteTask();
    deleteList();
    return currentList;
  };

  createButton.addEventListener('click', () => {
    if (lists.switchListKey().key !== '') {
      const popUpForm = document.querySelector('.pop-up-form');
      popUpForm.style.display = 'block';
    } else {
      switchListAlert();
    }
  });

  const updatedList = document.querySelectorAll('.list-name');
  updatedList.forEach(list => list.addEventListener('click', () => {
    renderListTasks();
  }));

  const updateLocalStorageTask = (newTask) => {
    let storage = lists.updateLocalStorage();
    if (storage === '') {
      storage = [];
    }
    const currentKey = lists.switchListKey().key;
    storage[currentKey].push(newTask);
    localStorage.setItem(currentKey, JSON.stringify(storage[currentKey]));
    const getLocalStorageTasks = JSON.parse(localStorage.getItem(currentKey));
    renderTasks(getLocalStorageTasks);
  };

  const resetForm = (e) => {
    radioButton.forEach(button => { button.checked = false; });
    e.title.value = '';
    e.description.value = '';
    e.date.value = '';
  };

  const checkingValidation = (title, description, date, priority, e) => {
    if (!(title === '' || description === '' || date === '' || priority === '')) {
      const newTask = new Task(title, description, date, priority);
      updateLocalStorageTask(newTask);
      resetForm(e);
      deleteTask();
    } else {
      popupAlert.style.display = 'block';
      setTimeout(() => {
        popupAlert.style.display = 'none';
      }, 2000);
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    const priority = e.target.priority.value;
    checkingValidation(title, description, date, priority, e.target);
  };


  form.addEventListener('submit', addTask);
})();

export default task;
