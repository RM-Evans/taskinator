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
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// referencing page content id on <main>
var pageContentEl = document.querySelector("#page-content");

var tasks = [];

//event delegation so we can create the stop button with event listener
var taskButtonHandler = function (event) {
    console.log(event.target);
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
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

var editTask = function (taskId) {
    console.log("editing task #" + taskId);
    //get task list item element 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    //know its new task if form has "data-task-id" attribute on it

    formEl.setAttribute("data-task-id", taskId);
    //  console.log(taskId);
};

var deleteTask = function (taskId) {
    console.log("removed task #" + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // if (event.target.matches(".delete-btn")) {
    //     var taskId = event.target.getAttribute("data-task-id");
    //     deleteTask(taskId);
    // }

    //creat new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if tasks[i].id doesnt match the value of taskId lets keep that task
        if (tasks[i].id !== parseInt(taskId)); {
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    //save to local
    saveTasks();
};




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

    var isEdit = formEl.hasAttribute("data-task-id");
    //console.log(isEdit);


    if (!taskNameInput || !taskTypeInput) {
        alert("Fill out the task form, idiot!!!!");
        return false;
    }

    formEl.reset();

    //has data attribute, so get task id and call function to complete process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {

        //package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        //send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }


};

var completeEditTask = function (taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }

    };

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    //save to local
    saveTasks();
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
    console.log(taskDataObj.status)

    if (taskDataObj.status === "to do") {
        tasksToDoEl.appendChild(listItemEl);
    } else if (taskDataObj.status === "in progress") {
        tasksInProgressEl.appendChild(listItemEl);
    } else if (taskDataObj.status === "completed") {
        tasksCompletedEl.appendChild(listItemEl);
    }
    //console.dir(listItemEl);
    //position works but dropdown doesnt match with space

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);


    console.log(taskDataObj);
    console.log(taskDataObj.status);

    //save to local
    saveTasks();

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

    //change status dropdown
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

var taskStatusChangeHandler = function (event) {
    // console.log(event.target);
    // console.log(event.target.getAttribute("data-task-id"));
    //get the task item's Id
    var taskId = event.target.getAttribute("data-task-id");


    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get the currently selected options value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update task's in task array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    //console.log(tasks);

    //save to local
    saveTasks();
};

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function () {

    //reassign tasks variable then retrieve data from localStorage
    var savedTasks = localStorage.getItem("tasks");
    console.log(savedTasks);

    //-------savedTasks undefined???

    if (!savedTasks) {
        return false;
    }
    //else load up saved tasks?

    //parse into array of objects
    savedTasks = JSON.parse(savedTasks);

    //loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
        //pass each task object into the 'createTaskEl() function
        createTaskEl(savedTasks[i]);
        console.log(savedTasks[i]);
    }
};
// console.log(loadTasks);

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();


//  