import Pen from "../images/pen.png";

export default function TodoItem({
  todo,
  onEditClick,
  onDeleteClick,
  onDoubleClick 
}) {
  const handleDelete = () => {
    onDeleteClick(todo.id);
  };

  
  const btnClass = todo.deleted ? 'todo-done-btn' : '';
  const titleClass = todo.deleted ? 'todo-done-title' : '';
  
  const handleDoubleClick = (event) => {
      onDoubleClick(todo.id);
  };


  return (
    <li className="todo-item" key={todo.id} onDoubleClick={handleDoubleClick}>
      <p className={titleClass}>{todo.text}</p>
      <div className="btn-container">
        <button className="change-btn" onClick={() => onEditClick(todo)}>
          <img src={Pen} width={20} height={20} alt="Ændre opgaven" />
        </button>
        <button className={`delete-todo-btn ${btnClass}`} onClick={handleDelete}></button>
      </div>
    </li>
  );
}