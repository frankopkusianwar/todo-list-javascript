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
  
  const addListsItems = (e) => {
    e.preventDefault()
    if (!(e.target.lists.value === "")) {
      const listItems = document.createElement('li')
      listItems.setAttribute('class', 'list-name')
      listItems.textContent = e.target.lists.value;
      localStorageTask[e.target.lists.value] = []
      localStorage.setItem(e.target.lists.value, '')
      lists.appendChild(listItems);
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