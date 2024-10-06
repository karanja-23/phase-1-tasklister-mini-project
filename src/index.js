
const form = document.querySelector('form');
const myTask = document.querySelector('#task');
const dueDate = document.querySelector('#dueDate');
const taskDescription = document.querySelector('#task_description');
const toDos =document.querySelector('.myTodos')
const priority = document.querySelector('#high')



const currentDate = new Date().toDateString();// current date converted to a string 

document.querySelector('#myDate').innerText = currentDate// add current date to DOM

function initialize (){
 
  showTodos();
 
  
  form.addEventListener('submit', function(event){
    event.preventDefault()//prevent automatic submission
    if (myTask.value.length === 0 || dueDate.value.length === 0 || taskDescription.value.length === 0){
      window.alert('Please enter the required values\n ✔ Task Name\n ✔ Task Description\n ✔ DueDate')

    }else{
      
     let toDoObj = {
        name: myTask.value,
        description: taskDescription.value,
        date: dueDate.value,
        priority : priority.checked === true ? 'high' : 'low'
      }
      addTodo(toDoObj);
      
     
      form.reset();
      
      
    }
    
  })
}
function showTodos(){
  
  fetch ('http://localhost:3000/task',{
    method: 'GET',

  })
  .then(response => response.json())
  .then (tasks => {
    displayEachTask(tasks)
  })
}
function displayEachTask(tasks){
  toDos.innerHTML = ''
  tasks.forEach( function(task){
    const list = document.createElement('div')
    list.className = 'mylist'
    list.innerHTML=` `    
    
    list.innerHTML = `
    <div id="task_desc">
    <h3> ✔ ${task.name}: </h3> 
    <i style= " font-weight: 100;">${task.description}</i>
    </div>
    
    <div> Deadline: ${task.date}  </div>
    <div class="priority"> Priority:  ${  task.priority} </div>
    <div class="close"> <i class="fa fa-times" id="close_icon" aria-hidden="true"></i></div>
    `
    if(task.priority === 'high'){
      setTimeout(() => {
        list.querySelector('.priority').style.backgroundColor = 'red'

      },2000)
    }
    const deleteButton = list.querySelector('.fa-times')
    deleteButton.addEventListener('click', function(){
      list.remove()
      function deleteToDoFromServer(){
        fetch (`http://localhost:3000/task/${task.id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          
        })
      }
      deleteToDoFromServer()
    })
    toDos.appendChild(list)
  })
}
function addTodo(toDoObj){
  fetch ('http://localhost:3000/task', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toDoObj)

    
  })
  .then(response =>response.json)
  .then (()=>{
    showTodos()
  })
  
 
}



initialize();
