
// import lists from './js/list'
// import form from './js/list'


console.log('heeleo')



// export { form }
// export default lists()
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
  const form = document.querySelector('#task-form')
  const addTask = (e) => {
    e.preventDefault()
    e.target.title.value
  }
  form.addEventListener('submit', addTask)
  return form
})()


// task()
// form