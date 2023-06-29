import Pen from "../images/pen.png";

export default function TodoItem({
    todo,
    onEditClick,
    onDeleteClick
  }) {
    return (
      <li className="todo-item" key={todo.id}>
        {todo.text}
        <div className="btn-container">
          <button className="change-btn" onClick={() => onEditClick(todo)}>
            <img src={Pen} width={18} height={18} alt="Ændre opgaven" />
          </button>
          <button onClick={() => onDeleteClick(todo.id)}>X</button>
        </div>
      </li>
    );
  }