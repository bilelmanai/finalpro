import React from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../../Style";
import Form from "../Form/Form";
import { getPosts } from "../../Action/getPosts";
import Post from "../Posts/Posts";
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = style();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.maingrid}
        >
          <Grid item xs={12} sm={12} md={7}>
            <Post setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={10} md={4} className={classes.gridf}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
