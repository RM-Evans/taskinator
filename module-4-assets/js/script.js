// console.dir(window.document);
// var buttonEl = document.querySelector("#save-task");
// console.log(buttonE1);
// buttonE1.addEventListener("click", function(){
//     alert("button clicked");
// })

//longhand
// buttonEl.addEventListener("click", function() {
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";
//     listItemEl.textContent = "This is a new class";
//     tasksToDoEl.appendChild(listItemEl);
// });


var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


//shorthand

//create new list items

var taskFormHandler = function() {
    
    //prevent auto refresh
    event.preventDefault();
    //make console display data as JS object  console.dir   .value
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //console.dir(taskNameInput);
    //will define and display dropdown text
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;
    //console.log(taskTypeInput);
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    if (!taskNameInput || !taskTypeInput) {
        alert("Fill out the task form, idiot!!!!");
        return false;
    }
    formEl.reset();

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj) {
        //create list item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        //create div to hold task info and add to list item
        var taskInfoEl = document.createElement("div");
        //give it a class name!
        taskInfoEl.className = "task-info"
        // add html content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        listItemEl.appendChild(taskInfoEl);
        //text content from user input
        // listItemEl.textContent = taskNameInput;
    
        //ADD ENTIRE LIST ITEM TO LIST
        tasksToDoEl.appendChild(listItemEl);
        console.dir(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);