//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')


//Event LIsteners
document.addEventListener('DOMContentLoaded', loadLocalTodos)
todoButton.addEventListener('click', addTodo);
// todoList.addEventListener('click', checkDelete);

//Functions
function deleteTodo(event){
    // console.log(event.target)
    const todo = event.target.parentElement
    todo.classList.add('fall')
    deleteLocalTodo(todo)
    todo.addEventListener('transitionend', () => todo.remove())
}

function completeTodo(event){
    const todo = event.target.parentElement
    todo.classList.toggle('completed')
    completeLocalTodo(todo)
}

function addTodo(event){
    event.preventDefault()
    if(todoInput.value == ""){
        return
    }
    // console.log('hello')
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value
    // console.log(todoInput.value)
    todoInput.value = ''

    todoDiv.appendChild(newTodo)

    const completedButton = document.createElement('button')
    completedButton.onclick = completeTodo
    completedButton.classList.add('complete-btn')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(completedButton)

    const trashButton = document.createElement('button')
    trashButton.onclick = deleteTodo
    trashButton.classList.add('trash-btn')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    todoDiv.appendChild(trashButton)


    // todoList.appendChild(todoDiv)
    todoList.insertBefore(todoDiv, todoList.firstChild)
    setLocalTodos(todoDiv)
    todoInput.focus()


}

function checkDelete(e){
    const item = e.target

    //delete todo
    if(item.classList[0] == 'trash-btn'){
        item.parentElement.remove()
    }
    else if(item.classList[0] == 'complete-btn'){
        item.parentElement.classList.add('complete')
    }
}

//Localstorage manipulation

function getLocalTodos(){
    let todos = []
    if(localStorage.getItem("todos") != null){
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}

function setLocalTodos(todo){
    let todos = getLocalTodos()
    let cls_arr = []
    todo.classList.forEach(x => {
        if(x){
            cls_arr.push(x)
        }
    })
    let nw_todo = {
        txt: todo.innerText,
        clss: cls_arr
    }

    todos.unshift(nw_todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteLocalTodo(todo){
    let todos = getLocalTodos()
    let txt = todo.innerText

    let todo_indx = todos.map(x => x.txt).indexOf(txt)
    if(todo_indx != -1){
        todos.splice(todo_indx, 1)
    }

    localStorage.setItem("todos", JSON.stringify(todos))
    
}

function completeLocalTodo(todo){
    let todos = getLocalTodos()
    let txt = todo.innerText

    let todo_indx = todos.map(x => x.txt).indexOf(txt)
    let cls_arr = []
    todo.classList.forEach(x => {
        if(x){
            cls_arr.push(x)
        }
    })
    if(todo_indx != -1){
        todos[todo_indx].clss = cls_arr
    }

    localStorage.setItem("todos", JSON.stringify(todos))
}

function loadLocalTodos(){
    let todos = getLocalTodos()
    todos.forEach(x => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add(...x.clss)
        
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo-item')
        newTodo.innerText = x.txt

        todoDiv.appendChild(newTodo)

        const completedButton = document.createElement('button')
        completedButton.onclick = completeTodo
        completedButton.classList.add('complete-btn')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(completedButton)

        const trashButton = document.createElement('button')
        trashButton.onclick = deleteTodo
        trashButton.classList.add('trash-btn')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        todoDiv.appendChild(trashButton)


        todoList.appendChild(todoDiv)
    })
}

