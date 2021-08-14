import "./App.css";
import { Container } from "@material-ui/core";
import NavBar from "./Components/navBar/NavBar";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "./Components/Auth/Auth.js";
function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
