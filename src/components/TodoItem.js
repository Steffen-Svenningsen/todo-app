export default function TodoItem({
    todo,
    onEditClick,
    onDeleteClick
  }) {
    return (
      <li key={todo.id}>
        {todo.text}
        <button onClick={() => onEditClick(todo)}>Ændre</button>
        <button onClick={() => onDeleteClick(todo.id)}>Færdig</button>
      </li>
    );
  }