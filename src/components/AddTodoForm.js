export default function AddTodoForm({
    todo,
    onAddFormSubmit,
    onAddInputChange
  }) {
    return (
      <form className="btn-form">
        <input
          className="add-todo-input-field"
          name="todo"
          type="text"
          placeholder="Tilføj en opgave"
          value={todo}
          onChange={onAddInputChange}
        />
        <button className="add-todo-btn" onClick={onAddFormSubmit}></button>
      </form>
    );
  }