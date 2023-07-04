export default function EditForm({
    currentTodo,
    setIsEditing,
    onEditInputChange,
    onEditFormSubmit
  }) {
    return (
      <div className="edit-popup">
        <form className="edit-form" onSubmit={onEditFormSubmit}>
          <input
            name="updateTodo"
            type="text"
            placeholder="Update todo"
            value={currentTodo.text}
            onChange={onEditInputChange}
          />
          <button className="save-btn" type="submit" onClick={onEditFormSubmit}>Gem</button>
        </form>
      </div>
    );
  }