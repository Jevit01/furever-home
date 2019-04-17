import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MyProvider from "./provider/MyProvider";
import Navbar from "./Navbar/Navbar";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/breeds" component={Navbar} />
            <Route path="/community" component={Navbar} />
          </Switch>
        </MyProvider>
      </div>
    );
  }
}

export default App;
