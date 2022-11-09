var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      //Case 1: If everything's true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      //Case 2: Otherwise, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    let todo = prompt('Enter a todo');
    while (todo === null || todo === 'undefined' || todo === "") {
      return;
    }
    todoList.addTodo(todo);
    view.displayTodos();
  },
  changeTodo: function(e) {
    if (e.target.tagName === "P"){
      var newTodo = prompt('What do you want you new todo to be?');
      var currentTodoPosition = parseInt(e.target.parentElement.id);
      todoList.changeTodo(currentTodoPosition, newTodo.toString());
      if (todoList.todos[currentTodoPosition].completed === true){
        todoList.toggleCompleted(currentTodoPosition);
      }
    } else {
      return;
    }
    view.displayTodos();
  },
  deleteTodo: function(e) {
    if (e.target.tagName === "SPAN" && e.target.classList.contains('delete')) {
      var currentTodo = parseInt(e.target.parentElement.id);
      todoList.deleteTodo(currentTodo);
    }
    view.displayTodos();
  },
  toggleCompleted: function(e) {
    if (e.target.tagName === "SPAN" && (e.target.classList.contains('uncomplete') || e.target.classList.contains('complete'))){
      var currentPosition = parseInt(e.target.parentElement.id);
      todoList.toggleCompleted(currentPosition);
    } else {
      return;
    }
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  showNav: function(e) {
    let nav = document.querySelector('#navigation ul');
    nav.style.width = "225px";
  },
  hideNav: function(e) {
    let nav = document.querySelector('#navigation ul');
    nav.style.width = "0";
    // e.stopPropagation halts the click event bubbling over to the navigation
    e.stopPropagation();
  }
};
/* Event handlers for the side nav */
document.querySelector('#navigation').addEventListener('click',handlers.showNav);
document.querySelector('.closeNav').addEventListener('click', handlers.hideNav);

/* Event handlers for the todo list */
var outputUl = document.querySelector('#output-view ul');
outputUl.addEventListener('click', handlers.changeTodo);
outputUl.addEventListener('click', handlers.toggleCompleted);
outputUl.addEventListener('click', handlers.deleteTodo);

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('#output-view ul');
    todosUl.innerHTML = '';

    // Extra check if there are actually todos to display or not. If not, hide the button that toggles all todos
    if (todoList.todos.length < 1) {
      let btnToggleAll = document.querySelector("#btn-toggleAll");
      btnToggleAll.classList.add("hidden");
    } else {

      // this // refers to the view object
      // forEach(callback, this);
      todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement('li');
        todoLi.setAttribute('id', position)

        var todoSpan1 = document.createElement('span');
        todoSpan1.setAttribute('class', 'icon');

        var todoSpan2 = document.createElement('span');
        todoSpan2.setAttribute('class', 'icon delete');

        var todoP = document.createElement('p');
        todoP.innerHTML = todo.todoText;

        if (todo.completed === true) {
          todoSpan1.classList.add('complete');
          todoP.setAttribute('class', 'done');
        } else {
          todoSpan1.classList.add('uncomplete');
        }

        todoLi.appendChild(todoSpan1);
        todoLi.appendChild(todoP);
        todoLi.appendChild(todoSpan2);
        todosUl.appendChild(todoLi);
      }, this);
    }
  }
};

view.displayTodos();