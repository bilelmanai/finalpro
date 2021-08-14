import React from "react";
import Style from "./Style";
import { Typography, TextField, Paper, Button } from "@material-ui/core";
import { useState } from "react";
import FileBase from "react-file-base64";
import { makePost, updatepost } from "../../Action/getPosts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Form = ({ setCurrentId, currentId }) => {
  const classes = Style();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((x) => x._id === currentId) : null
  );
  const logoff = useSelector((state) =>
    state.Auth.authData ? state.Auth.authData : null
  );
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const [title, setTitle] = useState(false);
  const [message, setMessage] = useState(false);
  const [tags, setTags] = useState(false);
  useEffect(() => {
    if (post) {
      setPostData(post);
    }

    if (logoff) {
      setUserName(JSON.parse(localStorage.getItem("profile")));
    }
    if (!JSON.parse(localStorage.getItem("profile"))) {
      setUserName(null);
    }
  }, [post, logoff]);

  const Hundlesubmit = async (e) => {
    e.preventDefault();
    setTitle(false);
    setMessage(false);
    setTags(false);
    if (postData.title === "") {
      setTitle(true);
    }
    if (postData.message === "") {
      setMessage(true);
    }
    if (postData.tags[0] === "") {
      setTags(true);
    }
    if (
      postData.title !== "" &&
      postData.message !== "" &&
      postData.tags[0] !== ""
    ) {
      if (currentId === 0) {
        dispatch(makePost({ ...postData, name: userName?.result?.name }));
      } else {
        dispatch(
          updatepost(currentId, {
            ...postData,
            name: userName?.result?.name,
          })
        );
      }
      clear();
    }
  };
  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: [""],
      selectedFile: "",
    });
    setCurrentId(0);
    setTitle(false);
    setMessage(false);
    setTags(false);
  };
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [""],
    selectedFile: "",
  });

  if (!userName) {
    return (
      <Paper className={classes.papers}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={Hundlesubmit}
        className={`${classes.form} ${classes.root}`}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} A Memory
        </Typography>

        <TextField
          required
          name="title"
          label="title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
          error={title}
        />
        <TextField
          required
          name="message"
          label="message"
          variant="outlined"
          fullWidth
          value={postData.message}
          multiline
          rows={4}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
          error={message}
        />
        <TextField
          required
          name="tags"
          label="tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
          error={tags}
        />
        <div className={classes.fileInput}>
          <FileBase
            required
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
