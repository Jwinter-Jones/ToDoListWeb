/**
 * Represents a single task on a to do list
 */
var ToDoItem = /** @class */ (function () {
    function ToDoItem(task) {
        this.title = task;
    }
    return ToDoItem;
}());
/* Test ode here...*/
var myItem = new ToDoItem("Learn about cookies=;");
myItem.isCompleted = false;
// OCtober 29th 2019. Month starts at 0
myItem.deadline = new Date(2019, 9, 29);
// stringify converts any object into a JSON string format
var strData = JSON.stringify(myItem);
console.log(strData);
// Setting a cookie called 'todoitems' that expires in a week
Cookies.set("todoitems", strData, { expires: 7 });
/* END TEST CODE */
window.onload = function () {
    var addBtn = document.querySelector("form > input[type=button]");
    addBtn.onclick = main;
};
function main() {
    var item = getItem();
    displayToDoItem(item);
    // Save ToDoItem
}
/**
 * Move selected task to completed section of the web page
 */
function markAsComplete() {
    var currItem = this;
    var completedItems = document.getElementById("completed");
    completedItems.appendChild(currItem);
}
/**
 * Displays ToDoItem on the page
 * @param item The item to be displayed
 */
function displayToDoItem(item) {
    var div = document.createElement("div");
    div.onclick = markAsComplete;
    console.log(div);
    div.innerHTML = '<input type ="checkbox">' + item.title;
    var displayDiv = document.getElementById("todo");
    displayDiv.appendChild(div);
}
/**
 * GEts the user input to do item from the form
 */
function getItem() {
    var title = document.getElementById("title").value;
    var item = new ToDoItem(title);
    var deadline = document.getElementById("deadline").value;
    item.deadline = new Date(deadline);
    item.isCompleted = false;
    return item;
}
