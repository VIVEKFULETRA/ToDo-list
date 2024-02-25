import axios from "axios";

export const getTask = async () => {
  try {
    const response = await axios.get("http://localhost:5000/taskList");
    return response.data;
  } catch (err) {
    console.error("error while fetching data", err);
  }
};

export const postTask = (data) => {
  return fetch("http://localhost:5000/taskList", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  }).then((result) =>
    result
      .json()
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.error("error while fetching data", err);
      })
  );
};

export const putTask = async (id, payload) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/taskList/${id}`,
      payload
    );
    return response.data;
  } catch (err) {
    console.error("error while fetching data", err);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/taskList/${id}`);
    return response;
  } catch (err) {
    console.error("error while fetching data", err);
  }
};
