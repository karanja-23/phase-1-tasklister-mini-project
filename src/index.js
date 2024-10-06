// declared global variables from DOM
const form = document.querySelector('form');
const myTask = document.querySelector('#task');
const dueDate = document.querySelector('#dueDate');
const taskDescription = document.querySelector('#task_description');
const toDos =document.querySelector('.myTodos')
const priority = document.querySelector('#high')


// adds a current date
const currentDate = new Date().toDateString();// current date converted to a string 

document.querySelector('#myDate').innerText = currentDate// add current date to DOM


function initialize (){// function to initialize the app
 
  showTodos();// shows any to dos that exist in JSON server
 
  // adds event listener to the form
  form.addEventListener('submit', function(event){
    event.preventDefault()//prevent automatic submission
    // checks if all the required fields are filled and returns an alert if not
    if (myTask.value.length === 0 || dueDate.value.length === 0 || taskDescription.value.length === 0){
      window.alert('Please enter the required values\n ✔ Task Name\n ✔ Task Description\n ✔ DueDate')

    }else{
      //describes the object that will be sent to the JSON server and adds the content to the form as the values in the object
     let toDoObj = {
        name: myTask.value,
        description: taskDescription.value,
        date: dueDate.value,
        priority : priority.checked === true ? 'high' : 'low'
      }
      // calls the function addTodo to add the object to the JSON server after the form is submitted
      addTodo(toDoObj);
      
     //resets the elements in the form to original values after submission
      form.reset();
      
      
    }
    
  })
}
//Gets the tasks from the JSON server and calls function displayEachTask to display them in the DOM
function showTodos(){
  
  fetch ('http://localhost:3000/task',{
    method: 'GET',

  })
  .then(response => response.json())//converts JSON object into a javascript object
  .then (tasks => {
    displayEachTask(tasks)// displays the tasks in the DOM
  })
}

//displays the tasks from Javascript object in function showTodos in the DOM
function displayEachTask(tasks){
  toDos.innerHTML = ''  //clears out the DOM before displaying the new list of tasks: prevents dublicating the tasks after adding new task(s)
  tasks.forEach( function(task){
    const list = document.createElement('div') //creates a new div element for each task in the array tasks
    list.className = 'mylist'
    // creates new html elements for each task and adds data from JSON server to them to be displayed in the DOM
    list.innerHTML = `
    <div id="task_desc">
    <h3> ✔ ${task.name}: </h3> 
    <i style= " font-weight: 100;">${task.description}</i>
    </div>
    
    <div> Deadline: ${task.date}  </div>
    <div class="priority"> Priority:  ${  task.priority} </div>
    <div class="close"> <i class="fa fa-times" id="close_icon" aria-hidden="true"></i></div>
    `
    //changes the background color for the alert to red if the task is checked as a high priority task; the function is called a minute after the task is loaded to the DOM
    if(task.priority === 'high'){
      setTimeout(() => {
        list.querySelector('.priority').style.backgroundColor = 'red'

      },1000)
    }
    // event listener for the delete button deletes the task from the DOM
    const deleteButton = list.querySelector('.fa-times')
    deleteButton.addEventListener('click', function(){
      list.remove()
      // deletes the task from the JSON server
      function deleteToDoFromServer(){
        fetch (`http://localhost:3000/task/${task.id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          
        })
      }
      deleteToDoFromServer()//calls the function deleteToDoFromServer
    })
    toDos.appendChild(list)
  })
}
// adds a new task to the JSON server to be called after form submission
function addTodo(toDoObj){
  fetch ('http://localhost:3000/task', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toDoObj)// converts the javascript object, toDoObj, to a JSON string

    
  })
  .then(response =>response.json)
  .then (()=>{
    showTodos() // shows a list of new tasks after a new entry has been made
  })
  
 
}



initialize(); // calls the function initialize
