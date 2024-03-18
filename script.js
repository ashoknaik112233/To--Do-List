const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');


let editTodo = null;//goblel var for both fun aceess

//function to Add to do
const addTodo = () => {

    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("you must write something in your Todo");
        return false;
    }

    if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";


    }


    else {



        //Dom manipulation creation elements in js
        //creating p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText; //copy value from input to p 
        li.appendChild(p); //Append in LI


        //creating edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);


        //creating delete button
        const dltBtn = document.createElement("button");
        dltBtn.innerText = "Remove";
        dltBtn.classList.add("btn", "deleteBtn"); //added class to style css{btn}
        li.appendChild(dltBtn);



        todoList.appendChild(li);
        inputBox.value = "";
        saveLocalTodos(inputText);
    }
}


//Function to update todo (edit and delete)
const updateTodo = (e) => {
    // console.log(e.target.innerHTML);
    if (e.target.innerHTML === "Remove") {
        //parent ele remove--LI-parent and p,edit are remove siblings
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);//for deleete items in local storage
    }

    if (e.target.innerHTML === "Edit") {
        //return to input box and prev sibling is p tag and there value ,need to be present in
        //input box and then edit
        inputBox.value = e.target.previousElementSibling.innerHTML; //innerhtml will show the value
        inputBox.focus(); //cursor focus on input box
        addBtn.value = "Edit"; //add btn will change to edit
        editTodo = e;
    }

}

//for stroing todos
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos")); //convert string to object
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));//convert object to string
    //console.log(todos);

}

//to display stored todos ..we need local values ..that should be in a list
//
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos")); //convert string to object
        todos.forEach(todo => {
            //created list of previous btns and li lists
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo; //copy value from todo to p 
            li.appendChild(p); //Append in LI


            //creating edit button
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);


            //creating delete button
            const dltBtn = document.createElement("button");
            dltBtn.innerText = "Remove";
            dltBtn.classList.add("btn", "deleteBtn"); //added class to style css{btn}
            li.appendChild(dltBtn);



            todoList.appendChild(li);

        });

    }
}

//delete local storage todos
const deleteLocalTodos = (todo) => {

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos")); //convert string to object
    }
    let todoText = todo.children[0].innerHTML; //to do delete p tag
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));


    //console.log(todo.children[0].innerHTML);

}


const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));


}
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
