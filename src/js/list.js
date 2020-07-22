const lists = (() => {
  const lists = document.querySelector('.task-list')
  const form = document.querySelector('#form')
  const popupAlert = document.querySelector('.list-alert')
  const allListItem = document.querySelectorAll('.list-name')
  let localStorageTask = {}
  let currentKey = {'key': ''}
  
  const switchListKey = () => {
    const listTilte = document.querySelector('.list-title')
    const allListItem = document.querySelectorAll('.list-name')
    allListItem.forEach(list => list.addEventListener('click', (e) => {
      const key = e.target.textContent;
      currentKey['key'] = key
      listTilte.textContent = key
    }))
    return currentKey
  }
  
  allListItem.forEach(list => list.addEventListener('click', () => {
    switchListKey()
  }))

  const storedList = () => {
    const object = Object.keys(localStorage).reduce(function (obj, str) {
     if (localStorage.getItem(str) === '') {
       obj[str] = '';
     } else {
       obj[str] = JSON.parse([localStorage.getItem(str)]) || [];
     }
     return obj
    }, {});
   return object
  } 
  
  const clearList = () => {
    const listItems = document.querySelectorAll('.list-name')
    listItems.forEach(item => item.remove())
  }
  
  const render = () => {
    clearList()
    Object.keys(storedList()).forEach(key => {
      const listItems = document.createElement('li')
      listItems.setAttribute('class', 'list-name')
      listItems.textContent = key
      lists.appendChild(listItems);
    })
    switchListKey()
  }
  
  const updateLocalStorage = () => {
    return storedList()
  }

  render()
  
  const addListsItems = (e) => {
    e.preventDefault()
    const listItem = e.target.lists.value
    if (!(listItem === "")) {
      localStorageTask[listItem] = []
      localStorage.setItem(listItem, JSON.stringify([]))
      const listItems = document.createElement('li')
      listItems.setAttribute('class', 'list-name')
      listItems.textContent = listItem
      lists.appendChild(listItems);
      storedList()
      updateLocalStorage()
      switchListKey()
    } else {
      popupAlert.style.display = 'block'
      setTimeout(() => {
        popupAlert.style.display = 'none'
      }, 3000);
    }
    e.target.lists.value = ''
     console.log(storedList())
  }
  
  form.addEventListener('submit', addListsItems) 

  return {
    switchListKey,
    updateLocalStorage,
    localStorageTask
  }
})()

export default lists;