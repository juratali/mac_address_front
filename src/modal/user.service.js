import axios from "axios";
const baseURL = "http://localhost:9090/user";

const api = axios.create({
  baseURL,
});

const getUsers = async () => {
  return await api.get("/");
};

const getUserById = async (id) => {
  return await api.get(`/get/${id}`);
};

const createUser = async (data) => {
  return await api.post("/", data);
};

const updateUser = async (id, data) => {
  return await api.put(`/${id}`, data);
};

const deleteUser = async (id) => {
  return await api.delete(`/${id}`);
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
