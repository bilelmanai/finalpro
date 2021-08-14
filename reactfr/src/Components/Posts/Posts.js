import React from "react";
import Post from "./Post/Post";
import Style from "./Style";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
const Posts = ({ setCurrentId }) => {
  const classes = Style();
  const posts = useSelector((state) => state.posts);

  return posts.length == 0 ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={3} className={classes.grdiCont}>
      {posts.map((post) => {
        return (
          <Grid item xs={12} sm={8} md={6} key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
