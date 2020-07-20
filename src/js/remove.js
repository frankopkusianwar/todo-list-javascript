import task from './task';

task;

const remove = (() => {
  const deleteTasks = document.querySelectorAll('.delete-tast')
  console.log(deleteTasks)
  
  deleteTasks.forEach(button => button.addEventListener('click', (e) => {
    const removeTask = document.querySelectorAll('.delete-tast')
    console.log(removeTask)
    removeTask.forEach(button => {
      console.log(button)
      button.parentElement.remove()
    })
    // e.target.parentElement.remove()
    console.log()
  }))

})()

export default remove

