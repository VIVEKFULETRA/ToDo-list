import React, { useEffect, useState } from "react";
import { deleteTask, getTask, postTask, putTask } from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

const ToDoListApi = () => {
  const [addValue, setAddValue] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [addDetailValue, setAddDetailValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editDetailValue, setEditDetailValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getTask();
      setAllTasks(response);
    } catch (err) {
      console.error("error while fetching data", err);
    }
  };

  const handleAdd = async () => {
    const payload = { task: addValue, details: addDetailValue };
    await postTask(payload);
    fetchData();
    setAddValue("");
    setAddDetailValue("");
  };

  const handleEdit = async (id, taskValue, detailValue) => {
    setEditId(id);
    setEditValue(taskValue);
    setEditDetailValue(detailValue);
  };

  const handleUpdate = async () => {
    const payload = { task: editValue, details: editDetailValue };
    await putTask(editId, payload);
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchData();
  };

  return (
    <section className="toDo-container">
      <div className="container">
        <h1 className="title-name">ToDo List</h1>
        <div className="add-input-btn-wrapper">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Task"
              value={addValue}
              onChange={(e) => {
                setAddValue(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Details"
              value={addDetailValue}
              onChange={(e) => {
                setAddDetailValue(e.target.value);
              }}
            />
          </div>
          <div className="add-btn">
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>
        {allTasks &&
          allTasks.map((ele, allTasksIndex) => {
            return (
              <div key={allTasksIndex} className="task-wrapper">
                {editId === ele.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Task"
                      value={editValue}
                      onChange={(e) => {
                        setEditValue(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Details"
                      value={editDetailValue}
                      onChange={(e) => {
                        setEditDetailValue(e.target.value);
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="task-txt">
                      {ele.task.charAt(0).toUpperCase() + ele.task.slice(1)}
                    </div>
                    {/* <div>{ele.details}</div> */}
                  </div>
                )}

                <div className="task-btn-wrapper">
                  <div>
                    {editId === ele.id ? (
                      // <button onClick={handleUpdate}>Update</button>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        onClick={handleUpdate}
                        className="icon"
                      />
                    ) : (
                      // <button
                      //   onClick={() => handleEdit(ele.id, ele.task, ele.details)}
                      // >
                      //   Edit
                      // </button>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() =>
                          handleEdit(ele.id, ele.task, ele.details)
                        }
                        className="icon"
                      />
                    )}
                  </div>
                  <div>
                    {/* <button onClick={() => handleDelete(ele.id)}>Delete</button> */}
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(ele.id)}
                      className="icon"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ToDoListApi;
