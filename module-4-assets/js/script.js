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

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// referencing page content id on <main>
var pageContentEl = document.querySelector("#page-content");

//event delegation so we can create the stop button with event listener
var taskButtonHandler = function (event) {
    console.log(event.target);

    if (event.target.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        //must run deleteTask through this function
        deleteTask(taskId);
    }
    // if (event.target.matches(".delete-btn")) {
    //     console.log("You clicked a delete button!");
    // }
};

var deleteTask = function (taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // if (event.target.matches(".delete-btn")) {
    //     var taskId = event.target.getAttribute("data-task-id");
    //     deleteTask(taskId);
    // }
};
    pageContentEl.addEventListener("click", taskButtonHandler);



    //create new list items

    var taskFormHandler = function () {

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

    var createTaskEl = function (taskDataObj) {
        //create list item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        //add data-* task id as a custom attribute
        listItemEl.setAttribute("data-task-id", taskIdCounter);
        //create div to hold task info and add to list item
        var taskInfoEl = document.createElement("div");
        //give it a class name!
        taskInfoEl.className = "task-info";
        // add html content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        listItemEl.appendChild(taskInfoEl);
        //text content from user input
        // listItemEl.textContent = taskNameInput;

        var taskActionsEl = createTaskActions(taskIdCounter);
        //console.log(taskActionsEl);
        //append taskActionEl to listItemEl
        listItemEl.appendChild(taskActionsEl)

        //ADD ENTIRE LIST ITEM TO LIST
        tasksToDoEl.appendChild(listItemEl);
        //console.dir(listItemEl);

        //increase task counter for next unique id
        taskIdCounter++;
    };

    var createTaskActions = function (taskId) {
        //create div
        var actionContainerEl = document.createElement("div");
        actionContainerEl.className = "task-actions";
        //create button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = "Edit";
        editButtonEl.className = "btn edit-btn";
        editButtonEl.setAttribute("data-task-id", taskId);
        //actually creating/assigning it
        actionContainerEl.appendChild(editButtonEl);

        //create delete button
        var deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Delete";
        deleteButtonEl.className = "btn delete-btn";
        deleteButtonEl.setAttribute("data-task-id", taskId);
        //creating/assigning it
        actionContainerEl.appendChild(deleteButtonEl);

        //dropdown
        var statusSelectE1 = document.createElement("select");
        statusSelectE1.className = "select-status";
        statusSelectE1.setAttribute("name", "status-change");
        statusSelectE1.setAttribute("data-task-id", taskId);
        //creating/assigning it
        actionContainerEl.appendChild(statusSelectE1);

        //create for loop to create multiple option elements
        //use array to add new options later
        var statusChoices = ["To Do", "In Progress", "Completed"];
        //use array in for loop
        for (var i = 0; i < statusChoices.length; i++) {
            //create option element
            var statusOptionEl = document.createElement("option")
            statusOptionEl.textContent = statusChoices[i];
            statusOptionEl.setAttribute("value", statusChoices[i]);

            //append to select
            statusSelectE1.appendChild(statusOptionEl);

        }
        return actionContainerEl;

    };

    formEl.addEventListener("submit", taskFormHandler);