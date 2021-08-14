import { combineReducers } from "redux";
import posts from "./Posts";
import Auth from "./Authd";
export default combineReducers({ posts: posts, Auth: Auth });
