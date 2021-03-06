/* eslint-disable */
import task from './task';
/* eslint-enable */

const lists = (() => {
  const lists = document.querySelector('.task-list');
  const form = document.querySelector('#form');
  const popupAlert = document.querySelector('.list-alert');
  const allListItem = document.querySelectorAll('.list-name');
  const localStorageTask = {};
  const currentKey = { key: '' };

  const switchListKey = () => {
    const listTilte = document.querySelector('.list-title');
    const allListItem = document.querySelectorAll('.list-name');
    allListItem.forEach(list => list.addEventListener('click', (e) => {
      const key = e.target.textContent;
      currentKey.key = key;
      listTilte.textContent = key;
      task.renderTasks();
    }));
    return currentKey;
  };

  allListItem.forEach(list => list.addEventListener('click', () => {
    switchListKey();
  }));

  const storedList = () => {
    const object = Object.keys(localStorage).reduce((obj, str) => {
      if (str !== 'loglevel:webpack-dev-server') {
        obj[str] = JSON.parse([localStorage.getItem(str)]) || [];
      }
      return obj;
    }, {});
    return object;
  };

  const clearList = () => {
    const listItems = document.querySelectorAll('.list-name');
    listItems.forEach(item => item.remove());
  };

  const render = () => {
    clearList();
    Object.keys(storedList()).forEach(key => {
      const listItems = document.createElement('li');
      listItems.setAttribute('class', 'list-name');
      listItems.textContent = key;
      lists.appendChild(listItems);
    });
    switchListKey();
  };

  const updateLocalStorage = () => storedList();

  render();

  const successAlert = (list) => {
    const listCreatedAlert = document.querySelector('.task-created-alert');
    listCreatedAlert.style.display = 'block';
    listCreatedAlert.textContent = `${list} list successfully created`;

    setTimeout(() => {
      listCreatedAlert.textContent = '';
      listCreatedAlert.style.display = 'none';
    }, 5000);
  };

  const addListsItems = (e) => {
    e.preventDefault();
    const listItem = e.target.lists.value;
    if (!(listItem === '')) {
      localStorageTask[listItem] = [];
      localStorage.setItem(listItem, JSON.stringify([]));
      const listItems = document.createElement('li');
      listItems.setAttribute('class', 'list-name');
      listItems.textContent = listItem;
      lists.appendChild(listItems);
      storedList();
      switchListKey();
      successAlert(listItem);
    } else {
      popupAlert.style.display = 'block';
      setTimeout(() => {
        popupAlert.style.display = 'none';
      }, 3000);
    }
    e.target.lists.value = '';
  };

  form.addEventListener('submit', addListsItems);

  return {
    switchListKey,
    updateLocalStorage,
    localStorageTask,
  };
})();

export default lists;
