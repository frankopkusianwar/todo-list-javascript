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



// < div class="tasks" >
//   <div class="task">
//     <input type="checkbox" id="task-1" />
//     <label for="task-1">
//       <span class="custom-checkbox"></span>
//       record todo list video
//       </label>
//     <p> soem sffssafdas</p>
//     <p> 10-23-33</p>
//     <p id='high'>High </p>
//     <p><i class="fa fa-trash" aria-hidden="true"></i></p>
//   </div>
//   </div >


  const addTask = (e) => {
    e.preventDefault()
  }

  form.addEventListener('submit', addTask)

  return form
})()



