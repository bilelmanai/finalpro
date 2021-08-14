import React from "react";

const Authd = (state = { authData: null }, action) => {
  switch (action.type) {
    case "auth":
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return { ...state, authData: action?.data };
    case "logout":
      localStorage.clear();
      return { ...state, authData: "null" };
    case "error":
      localStorage.setItem("error", JSON.stringify(action.err));
      return { ...state, authData: action.err };
    default:
      if (localStorage.getItem("error")) {
        localStorage.clear();
      }
      return state;
  }
};

export default Authd;
