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

var createTaskHandler = function() {
    
    //prevent auto refresh
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new class";
    tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", createTaskHandler);