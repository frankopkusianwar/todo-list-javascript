const lists = (() => {
  const lists = document.querySelector('.task-list')
  const form = document.querySelector('#form')
  const popupAlert = document.querySelector('.list-alert')

  const addListsItems = (e) => {
    e.preventDefault()
    if (!(e.target.lists.value === "")) {
      const listItems = document.createElement('li')
      listItems.setAttribute('class', 'list-name')
      listItems.textContent = e.target.lists.value;
      lists.appendChild(listItems);
    } else {
      popupAlert.style.display = 'block'
      setTimeout(() => {
        popupAlert.style.display = 'none'
      }, 3000);
    }
    e.target.lists.value = ''
  }

  form.addEventListener('submit', addListsItems) 

  return form
})()

export default lists;