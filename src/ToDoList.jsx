import React, { useState } from "react";
import {
  faCircleCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToDoList = () => {
  const [data, setData] = useState("");
  const [allData, setAllData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editDataIndex, setEditDataIndex] = useState(null);
  const [editDataTxt, setEditDataTxt] = useState("");

  const handleChange = (value) => {
    isEdit ? setEditDataTxt(value) : setData(value);
  };
  const handleAdd = () => {
    setAllData([...allData, data]);
    setData("");
  };
  const handleEdit = (allDataindex) => {
    setIsEdit(true);
    const updatedAllData = [...allData];
    setEditDataTxt(updatedAllData[allDataindex]);
    setEditDataIndex(allDataindex);
  };
  const handleUpdate = () => {
    const updatedAllData = [...allData];
    updatedAllData.splice(editDataIndex, 1, editDataTxt);
    setAllData([...updatedAllData]);
    setIsEdit(false);
    setEditDataIndex(null);
  };
  const handleDelete = (allDataindex) => {
    const updatedAllData = [...allData];
    const filterAllData = updatedAllData.filter((_, i) => {
      return allDataindex !== i;
    });
    setAllData(filterAllData);
  };
  return (
    <div className="container">
      <h1 className="title-name">ToDo-List</h1>
      <div className="add-input-btn-wrapper">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter a Task"
            value={data}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
      {allData &&
        allData.map((ele, allDataindex) => {
          return (
            <div key={allDataindex} className="task-wrapper">
              {allDataindex === editDataIndex ? (
                <input
                  type="text"
                  value={editDataTxt}
                  onChange={(e) => handleChange(e.target.value)}
                />
              ) : (
                <div className="task-txt">
                  {ele.charAt(0).toUpperCase() + ele.slice(1)}
                </div>
              )}
              <div>
                <div className="task-btn-wrapper">
                  <div>
                    {allDataindex === editDataIndex ? (
                      // <button onClick={() => handleUpdate()}>Update</button>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        onClick={() => handleUpdate()}
                        className="icon"
                      />
                    ) : (
                      // <button onClick={() => handleEdit(allDataindex)}>
                      //   Edit
                      // </button>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() => handleEdit(allDataindex)}
                        className="icon"
                      />
                    )}
                  </div>
                  <div>
                    {/* <button onClick={() => handleDelete(allDataindex)}>
                    Delete
                  </button> */}
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(allDataindex)}
                      className="icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ToDoList;
