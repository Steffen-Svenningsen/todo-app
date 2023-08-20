import {React, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.sass';
import moment from 'moment';
import 'moment/locale/da';
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';
import EditTodoForm from './components/EditTodoForm';
import LogoImg from './images/logo.png';
import DarkMode from "./components/DarkMode";
import InfoIcon from "./images/info.png";
import CloseBtn from "./images/close.png";

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
      const newTodo = {
        id: uuidv4(),
        text: todo.trim(),
        deleted: false
      };
  
      setTodos([newTodo, ...todos]); // Add the new todo at the beginning of the array
    }
    setTodo("");
  }

  function handleDoubleClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleDeleteClick(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, deleted: !todo.deleted };
      }
      return todo;
    });
  
    const sortedTodos = updatedTodos.sort((a, b) => {
      if (a.deleted && !b.deleted) {
        return 1; // Move a to the bottom
      }
      if (!a.deleted && b.deleted) {
        return -1; // Move b to the bottom
      }
      return 0; // Maintain the original order
    });
  
    setTodos(sortedTodos);
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

  const [isOpen, setIsOpen] = useState(false);

  function toggleInfoScreen() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <div className={`App ${isOpen ? 'no-scroll' : ''}`}>
      <header>
        <div className="header-main">
          <div className="header-logo-btn-container">
            <img src={LogoImg} width={38} height={38} alt="Simple Todo Logo" />
            <button onClick={toggleInfoScreen}>
              <img src={InfoIcon} width={24} height={24} alt="Info icon" />
            </button>
          </div>
          <p className='date'>{date}</p>
          <DarkMode />
        </div>
        <h1>Mine opgaver</h1>
      </header>
      {isOpen && 
      (<div className="info-screen">
        <button onClick={toggleInfoScreen} className='close-btn'>
          <img src={CloseBtn} width={24} height={24} alt="Luk" />
        </button>
        <h1>App info</h1>
        <p>Optimer din dag med denne intuitive to-do app. Organisér opgaver, få påmindelser og øg din produktivitet. Simplificér din hverdag nu.</p>
        <h3>Sådan virker det:</h3>
        <ol>
          <li>Skriv en opgave ind som du skal huske at fuldføre.
            <ul>
              <li>Har du skrevet forkert kan du rette opgaven ved at trykke på 'Pen-ikonet'.</li>
              <li>Her kan du rette til og gemme opgaven ved at trykke 'Gem'.</li>
            </ul>
          </li>
          <li>Når du har gennemført opgaven, kan du trykke på cirklen for at markere den som fuldført.</li>
          <li>Opgaven bliver streget over og sendt til bunden af dine opgaver.</li>
          <li>For at slette opgaven helt fra din liste kan du dobbeltklikke på opgaven.</li>
        </ol>
        <button className='get-started' onClick={toggleInfoScreen}>
          Kom igang
        </button>
      </div>)
      }
      <main>
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
              key={todo.id}
              todo={todo}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onDoubleClick={handleDoubleClick}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
