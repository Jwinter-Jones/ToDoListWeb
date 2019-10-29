/**
 * Represents a single task on a to do list
 */
class ToDoItem{
    title:string;
    deadline:Date;
    isCompleted:boolean;

    constructor(task:string){
        this.title = task;
    }
}

/* Test ode here...*/
let myItem = new ToDoItem("Learn about cookies=;");
myItem.isCompleted = false;
// OCtober 29th 2019. Month starts at 0
myItem.deadline = new Date(2019, 9, 29);

// stringify converts any object into a JSON string format
let strData = JSON.stringify(myItem);
console.log(strData);

// Setting a cookie called 'todoitems' that expires in a week
Cookies.set("todoitems", strData, {expires : 7});
Cookies.set("todoitems", strData, {expires : 7});


/* END TEST CODE */

window.onload = function(){
    let addBtn =
        <HTMLElement>document.querySelector("form > input[type=button]");
    addBtn.onclick = main;
};

function main(){
    let item:ToDoItem = getItem();

    displayToDoItem(item);

    // Save ToDoItem
}

/**
 * Move selected task to completed section of the web page
 */
function markAsComplete(){
    let currItem = <HTMLDivElement>this;
    let completedItems = document.getElementById("completed")

    completedItems.appendChild(currItem);
}

/**
 * Displays ToDoItem on the page
 * @param item The item to be displayed
 */
function displayToDoItem(item:ToDoItem):void{
    let div = document.createElement("div");
    div.onclick = markAsComplete;

    console.log(div);
    div.innerHTML = '<input type ="checkbox">' + item.title;
    let displayDiv = document.getElementById("todo");
    displayDiv.appendChild(div);

}

/**
 * GEts the user input to do item from the form
 */
function getItem():ToDoItem{
    let title = (<HTMLInputElement>document.getElementById("title")).value;
    let item = new ToDoItem(title);
    let deadline = (<HTMLInputElement>document.getElementById("deadline")).value;
    item.deadline = new Date(deadline);
    item.isCompleted = false;

    return item;
}