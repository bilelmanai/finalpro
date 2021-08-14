import React from "react";
import * as api from "../Api/api.js";
export const signUp = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    console.log(data);
    dispatch({ type: "auth", data });
    history.push("/");
  } catch (error) {
    console.log({ error: error.response.data.message });
    const err = await error.response.data.message;
    console.log(err);
    if (err) {
      dispatch({ type: "error", err });
    } else {
      console.log(error);
    }
  }
};
export const login = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.logIn(userData);
    dispatch({ type: "auth", data });
    history.push("/");
  } catch (error) {
    const err = await error.response.data.error;
    if (err) {
      dispatch({ type: "error", err });
    } else {
      console.log(error);
    }
  }
};
