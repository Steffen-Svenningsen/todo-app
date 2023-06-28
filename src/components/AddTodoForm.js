export default function AddTodoForm({
    todo,
    onAddFormSubmit,
    onAddInputChange
  }) {
    return (
      <form className="btn-form">
        <input
          name="todo"
          type="text"
          placeholder="Tilføj en opgave"
          value={todo}
          onChange={onAddInputChange}
        />
        <button onClick={onAddFormSubmit}>Tilføj</button>
      </form>
    );
  }