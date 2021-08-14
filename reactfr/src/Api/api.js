import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:5000" });

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchPosts = () => api.get("posts");
export const createPost = (newpost) => api.post("posts", newpost);
export const updatePost = (id, data) => api.patch(`posts/${id}`, data);
export const deletePost = (id) => api.delete(`posts/${id}`);
export const updateLike = (id) => api.patch(`posts/${id}/like`);

export const signUp = (userData, axiosConfig) =>
  api.post("/users/signup", userData, axiosConfig);
export const logIn = (userData) => api.post("/users/login", userData);
