import React from "react";

const Form = ({ onChange, onClick, title, editId, oncancel }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="text" onChange={onChange} value={title} />
      <button onClick={onClick}> {editId !== 0 ? "Update" : "Add"}</button>
      {editId !== 0 && <button onClick={oncancel}>Cancel</button>}
    </form>
  );
};

export default Form;
