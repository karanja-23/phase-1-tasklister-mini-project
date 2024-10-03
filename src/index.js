document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.querySelector('#create-task-form');
  form.addEventListener('submit', function(event){
    event.preventDefault()
    const todoContainer = document.querySelector('#list');
    const createTodo = document.createElement('li');
    const myToDo = document.querySelector('#new-task-description');
    const timeDue = document.getElementById('time')  
    console.log(timeDue.value) 
    createTodo.innerText =` ${myToDo.value} (due at ${timeDue.value})`
    todoContainer.appendChild(createTodo);
    const deleteBtn = document.createElement('button');
    createTodo.appendChild(deleteBtn)
    deleteBtn.textContent = 'X';
    deleteBtn.style.fontsize = "large"
    deleteBtn.style.marginLeft = "5px"
    deleteBtn.addEventListener('click', function (event){
      event.target.parentNode.remove();
    })


    
  form.reset()
  })
});
