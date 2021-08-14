import React from "react";
import * as api from "../Api/api.js";
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const makePost = (create) => async (dispatch) => {
  try {
    const { data } = await api.createPost(create);

    dispatch({ type: "Create", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const updatepost = (currentId, postData) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, postData);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (currentId) => async (dispatch) => {
  try {
    await api.deletePost(currentId);
    dispatch({ type: "DELETE", payload: currentId });
  } catch (error) {
    console.log(error.message);
  }
};

// export const updateLikes = (id) => async (dispatch) => {
//   try {
//     await api.updateLike(id);
//     dispatch({ type: "like", payload: id });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
export const updateLikes = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateLike(id);
    dispatch({ type: "like", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
