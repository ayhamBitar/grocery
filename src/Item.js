import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Item({ title, deleteItem, editItem }) {
  return (
    <article className="item-container">
      <div className="item">{title}</div>
      <div className="btn-container">
        <FaEdit className="btn edit-btn" onClick={editItem} />
        <FaTrashAlt className="btn delete-btn" onClick={deleteItem} />
      </div>
    </article>
  );
}

export default Item;
