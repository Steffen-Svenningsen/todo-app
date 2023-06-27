export default function EditForm({
    currentTodo,
    setIsEditing,
    onEditInputChange,
    onEditFormSubmit
  }) {
    return (
      <form onSubmit={onEditFormSubmit}>
        <input
          name="updateTodo"
          type="text"
          placeholder="Update todo"
          value={currentTodo.text}
          onChange={onEditInputChange}
        />
        <button type="submit" onClick={onEditFormSubmit}>Gem</button>
      </form>
    );
  }