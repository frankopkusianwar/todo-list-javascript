const lists = (() => {
  class List {
    constructor(list) {
      this.list = list
    }
  }

  const lists = document.querySelector('.task-list')
  const form = document.querySelector('#form')
  const popupAlert = document.querySelector('.pop-up-alert')


  const addListsItems = (e) => {
    e.preventDefault()
    const listItems = document.createElement('li')
    listItems.setAttribute('class', 'list-name')
    const listTitle = e.target.lists.value
    listItems.textContent = listTitle;
    if (!(listTitle === "")) {
      lists.appendChild(listItems);
    }else {
      popupAlert.style.display = 'block'
    }
  }

  form.addEventListener('submit', addListsItems) 

  return form
})()

export default lists;