import React from "react";
import { Switch, Route } from "react-router-dom";
import Starred from "./pages/Starred";
import Home from "./pages/Home";
function App() {
  return (
    <Switch>
      <Route exact path="/starred">
        <Starred />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <div>404! Page Not Found</div>
      </Route>
    </Switch>
  );
}

export default App;
