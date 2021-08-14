import React, { useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";

import memories from "../../Images/memories.png";
import Style from "./Style";
import decode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
const NavBar = () => {
  const location = useLocation();
  const classes = Style();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "logout" });
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decoded = decode(token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          variant="h2"
          align="center"
          className={classes.heading}
        >
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to={location.pathname === "/auth" ? "/" : "/auth"}
            variant="contained"
            color="primary"
          >
            {location.pathname === "/auth" ? "acceuil" : "login"}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
