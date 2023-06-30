import Pen from "../images/pen.png";

export default function TodoItem({
  todo,
  onEditClick,
  onDeleteClick
}) {
  const handleDelete = () => {
    onDeleteClick(todo.id);
  };

  const btnClass = todo.deleted ? 'deleted' : 'todo-done-btn';
  const titleClass = todo.deleted ? 'deleted' : 'todo-done-title';
  

  return (
    <li className="todo-item" key={todo.id}>
      <p className={titleClass}>{todo.text}</p>
      <div className="btn-container">
        <button className="change-btn" onClick={() => onEditClick(todo)}>
          <img src={Pen} width={18} height={18} alt="Ændre opgaven" />
        </button>
        <button className={`delete-todo-btn ${btnClass}`} onClick={handleDelete}></button>
      </div>
    </li>
  );
}