// import switchList from './switchList';

const lists = (() => {
  const lists = document.querySelector('.task-list')
  const form = document.querySelector('#form')
  const popupAlert = document.querySelector('.list-alert')
  let localStorageTask = {}

  const keyStorage = (objKey) => {
    localStorageTask[objKey] = []
  }

  const switchList = () => {
    const allListItem = document.querySelectorAll('.list-name')
    allListItem.forEach(list => list.addEventListener('click', (e) => {
      const key = e.target.textContent;
      localStorage.key(key)
      keyStorage(key)
    }))
  } 
  
  const addListsItems = (e) => {
    e.preventDefault()
    if (!(e.target.lists.value === "")) {
      const listItems = document.createElement('li')
      listItems.setAttribute('class', 'list-name')
      listItems.textContent = e.target.lists.value;
      localStorage.setItem(e.target.lists.value, '')
      lists.appendChild(listItems);
      switchList()
    } else {
      popupAlert.style.display = 'block'
      setTimeout(() => {
        popupAlert.style.display = 'none'
      }, 3000);
    }
    e.target.lists.value = ''
  }
  
  form.addEventListener('submit', addListsItems) 

  return {
    form,
    keyStorage, 
    localStorage
  }
})()

export default lists;