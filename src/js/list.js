const lists = (() => {
  const lists = document.querySelector('.task-list')
  const form = document.querySelector('#form')
  const popupAlert = document.querySelector('.list-alert')
  let localStorageTask = {}
  let key;
  
  const switchListKey = () => {
    const allListItem = document.querySelectorAll('.list-name')
    allListItem.forEach(list => list.addEventListener('click', (e) => {
      key = e.target.textContent;
    }))
    return key;
  }

  const updateLocalStorage = () => {
    return localStorageTask
  }

  
  const storedList = Object.keys(localStorage).reduce(function (obj, str) {
    obj[str] = localStorage.getItem(str);
    return obj
  }, {});
  console.log(storedList)
  
  const render = (() => {
    Object.keys(storedList).forEach(key => {
      const listItems = document.createElement('li')
      listItems.setAttribute('class', 'list-name')
      listItems.textContent = key
      lists.appendChild(listItems);
    })
  })()
  
  const addListsItems = (e) => {
    e.preventDefault()
    const listItem = e.target.lists.value
    if (!(listItem === "")) {
      const listItems = document.createElement('li')
      listItems.setAttribute('class', 'list-name')
      listItems.textContent = listItem
      lists.appendChild(listItems);
      localStorageTask[listItem] = []
      localStorage.setItem(listItem, '')
      switchListKey()
      updateLocalStorage()
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
    switchListKey,
    updateLocalStorage,
    localStorageTask
  }
})()

export default lists;