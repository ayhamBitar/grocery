import Alert from "./Alert";
import List from "./List";
import { v4 as uuid } from "uuid";

import React, { useState, useEffect } from "react";

function App() {
  const storage = localStorage.getItem("item");
  const [item, setItem] = useState("");
  const [list, setList] = useState(JSON.parse(storage));
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    const uinqueId = uuid();
    if (item && !isEditing) {
      const singleItem = { id: uinqueId, title: item };
      setList([...list, singleItem]);

      getAlert(true, "success", "New item added!");
      setItem("");
    } else if (item && isEditing) {
      newItem["title"] = item;
      setIsEditing(false);
      setItem("");
    } else {
      getAlert(true, "danger", "Please provide a value!");
    }
  };

  const getAlert = (state = true, type = "", msg = "") => {
    setIsAlert(state);
    setAlert({ type: type, msg: msg });
  };
  const clearList = () => {
    setList([]);
    getAlert(true, "danger", "The list is empty!");
  };

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    getAlert(true, "danger", "One item was deleted!");
  };

  const editItem = (id) => {
    let targetItem = list.find((item) => item.id === id);
    setItem(targetItem.title);
    setNewItem(targetItem);

    setIsEditing(true);
  };

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(list));
    const timingAlert = setTimeout(() => {
      getAlert();
    }, 2000);
    return () => clearTimeout(timingAlert);
  }, [list, alert]);

  return (
    <div className="App">
      <div className="form-container">
        {isAlert && <Alert {...alert} />}
        <h2>Grocery Bud</h2>
        <form onSubmit={formHandler}>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="e.g. eggs"
            autoComplete="off"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
        </form>
        <List list={list} deleteItem={deleteItem} editItem={editItem} />
        {list.length > 0 && (
          <button className="clear" onClick={clearList}>
            Clear Items
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
