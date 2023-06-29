import {React, useState, useEffect} from 'react';
import './App.sass';
import moment from 'moment';
import 'moment/locale/da';
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';
import EditTodoForm from './components/EditTodoForm';
import LogoImg from './images/logo.png';
import DarkMode from "./components/DarkMode";

function App() {
  moment.locale();
  const date = moment().format('dddd [d.] D MMMM');

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }
    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  return (
    <div className="App">
      <header>
        <img src={LogoImg} width={38} height={38} alt="Simple Todo Logo" />
        <p className='date'>{date}</p>
        <DarkMode />
      </header>
      <main>
        <h1>Mine opgaver</h1>
        {isEditing ? (
        <EditTodoForm
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditFormSubmit}
        />
        ) : (
          <AddTodoForm
            todo={todo}
            onAddInputChange={handleInputChange}
            onAddFormSubmit={handleFormSubmit}
          />
        )}
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
