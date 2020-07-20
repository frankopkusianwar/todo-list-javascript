const task = (() => {
  class Task {
    constructor(title, description, date, notes,check) {
      this.title = title
      this.description = description
      this.date = date
      this.notes = notes
      this.check = check
    }
  }
  const createButton = document.querySelector('.new-task-creator')
  const form = document.querySelector('#task-form')
  
  createButton.addEventListener('click', (e) => {
    const popUpForm = document.querySelector('.pop-up-form')
    popUpForm.style.display = 'block'
  })

  const addTask = (e) => {
    e.preventDefault()
    e.target.title.value
  }

  form.addEventListener('submit', addTask)
  
  return form
})()



