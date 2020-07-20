const lists = (() => {
  class List {
    constructor(list) {
      this.list = list
    }
  }

  const lists = document.querySelector('.task-list')
  const form = document.querySelector('#form')


  const addListsItems = (e) => {
    e.preventDefault()
    const listItems = document.createElement('li')
    listItems.setAttribute('class', 'list-name')
    listItems.textContent = e.target.lists.value;
    lists.appendChild(listItems);
  }

  form.addEventListener('submit', addListsItems) 

  return form
})()

export default lists;