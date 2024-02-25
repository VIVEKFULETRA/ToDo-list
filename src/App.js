import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoList from "./ToDoList";
import ToDoListApi from "./ToDoListApi";
import "./ToDoListApi.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDoListApi />} />
          <Route path="/todo" element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
