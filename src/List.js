import React from "react";
import Item from "./Item";

function List({ list, deleteItem, editItem }) {
  return (
    <section className="list">
      {list.map((item) => {
        return (
          <Item
            key={item.id}
            editItem={() => editItem(item.id)}
            {...item}
            deleteItem={() => deleteItem(item.id)}
          />
        );
      })}
    </section>
  );
}

export default List;
