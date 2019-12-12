/**
 * Represents a single task on a todo list
 */
class ToDoItem{
    title:string;
    deadline:Date;
    isCompleted:boolean;

    constructor(task:string){
        this.title = task;
    }
}

/* Test code here... */
let myItem = new ToDoItem("Learn about cookies=;");
myItem.isCompleted = false;
// October 29th 2019. Month starts at 0
myItem.deadline = new Date(2019, 9, 29);

// stringify converts any object into a JSON string format
let strData = JSON.stringify(myItem);
console.log(strData);


const cookieKey = "todoitems";
// Setting a cookie called 'todoitems' that expires in a week
Cookies.set(cookieKey, strData, { expires : 7});

// Read ToDoItem from cookie
let cookieItem:ToDoItem = 
    JSON.parse(Cookies.get(cookieKey));
console.log("Read cookie data....");
console.log(cookieItem.title + " " + 
                        cookieItem.deadline);

const storageKey = "Task";
// TODO: Store ToDo item using HTML5 Web Storage
if(typeof(Storage) != "undefined"){
    localStorage.setItem(storageKey, strData);
    let storageStr = localStorage.getItem(storageKey)
    let item:ToDoItem = JSON.parse(storageStr);
    console.log("Reading storage data....");
    console.log(item.title);
}

/* END TEST CODE */


window.onload = function(){
    let addBtn = <HTMLElement>
        document.querySelector("form > input[type=button]");
    addBtn.onclick = main;
};

function main(){
    let item:ToDoItem = getItem();
    displayToDoItem(item);

    let allItems = readToDoItems();
    allItems.push(item);        //Add new item to existing list
    saveToDoItems(allItems);

    for(let i = 0; i < allItems.length; i++){
        alert(allItems[i].title);
    }
}

/**
 * Move selected task to completed section
 * of the web page
 */
function markAsComplete(){
    let currItem = <HTMLDivElement>this;

    let completedItems =
        document.getElementById("completed");
    
    completedItems.appendChild(currItem);
}

/**
 * Displays ToDoItem on the page
 * @param item The item to be displayed
 */
function displayToDoItem(item:ToDoItem):void{
    let div = document.createElement("div");
    div.onclick = markAsComplete;
    div.innerHTML = 
        '<input type="checkbox">' +
            item.title;

    console.log(div);
    // display new div on page
    let displayDiv = 
        document.getElementById("todo");
    displayDiv.appendChild(div);
}

/**
 * Gets the user input todo item
 * from the form
 */
function getItem():ToDoItem{
    let title = (<HTMLInputElement>
        document.getElementById("title")).value;
    let item = new ToDoItem(title);

    let deadline = (<HTMLInputElement>
        document.getElementById("deadline")).value;
    item.deadline = new Date(deadline);
    item.isCompleted = false;

    return item;
}

const theStorageKey = "MyItems";

function saveToDoItems(items:Array<ToDoItem>){
    let stringData = JSON.stringify(items);
    localStorage.setItem(theStorageKey, stringData);
}

function readToDoItems():Array<ToDoItem>{
    let stringData = localStorage.getItem(theStorageKey);

    if(stringData == null)
        return new Array<ToDoItem>();

    return <ToDoItem[]>JSON.parse(stringData);
    //let itemArr:ToDoItem[] = JSON.parse(stringData);
    //return itemArr;
}