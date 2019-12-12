/**
 * Represents a single task on a todo list
 */
var ToDoItem = /** @class */ (function () {
    function ToDoItem(task) {
        this.title = task;
    }
    return ToDoItem;
}());
/* Test code here... */
var myItem = new ToDoItem("Learn about cookies=;");
myItem.isCompleted = false;
// October 29th 2019. Month starts at 0
myItem.deadline = new Date(2019, 9, 29);
// stringify converts any object into a JSON string format
var strData = JSON.stringify(myItem);
console.log(strData);
var cookieKey = "todoitems";
// Setting a cookie called 'todoitems' that expires in a week
Cookies.set(cookieKey, strData, { expires: 7 });
// Read ToDoItem from cookie
var cookieItem = JSON.parse(Cookies.get(cookieKey));
console.log("Read cookie data....");
console.log(cookieItem.title + " " +
    cookieItem.deadline);
var storageKey = "Task";
// TODO: Store ToDo item using HTML5 Web Storage
if (typeof (Storage) != "undefined") {
    localStorage.setItem(storageKey, strData);
    var storageStr = localStorage.getItem(storageKey);
    var item = JSON.parse(storageStr);
    console.log("Reading storage data....");
    console.log(item.title);
}
/* END TEST CODE */
window.onload = function () {
    var addBtn = document.querySelector("form > input[type=button]");
    addBtn.onclick = main;
};
function main() {
    var item = getItem();
    displayToDoItem(item);
    var allItems = readToDoItems();
    allItems.push(item); //Add new item to existing list
    saveToDoItems(allItems);
    for (var i = 0; i < allItems.length; i++) {
        alert(allItems[i].title);
    }
}
/**
 * Move selected task to completed section
 * of the web page
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
    div.innerHTML =
        '<input type="checkbox">' +
            item.title;
    console.log(div);
    // display new div on page
    var displayDiv = document.getElementById("todo");
    displayDiv.appendChild(div);
}
/**
 * Gets the user input todo item
 * from the form
 */
function getItem() {
    var title = document.getElementById("title").value;
    var item = new ToDoItem(title);
    var deadline = document.getElementById("deadline").value;
    item.deadline = new Date(deadline);
    item.isCompleted = false;
    return item;
}
var theStorageKey = "MyItems";
function saveToDoItems(items) {
    var stringData = JSON.stringify(items);
    localStorage.setItem(theStorageKey, stringData);
}
function readToDoItems() {
    var stringData = localStorage.getItem(theStorageKey);
    if (stringData == null)
        return new Array();
    return JSON.parse(stringData);
    //let itemArr:ToDoItem[] = JSON.parse(stringData);
    //return itemArr;
}
