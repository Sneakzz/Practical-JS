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
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
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

document.querySelector('#navigation').addEventListener('click',handlers.showNav);
document.querySelector('.closeNav').addEventListener('click', handlers.hideNav);

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('#output-view ul');
    todosUl.innerHTML = '';

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
      } else {
        todoSpan1.classList.add('uncomplete');
      }

      todoLi.appendChild(todoSpan1);
      todoLi.appendChild(todoP);
      todoLi.appendChild(todoSpan2);
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
    
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();