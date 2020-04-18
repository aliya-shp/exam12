import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Images from "./containers/Images/Images";
import NewImage from "./containers/NewImage/NewImage";

const Routes = ({user}) => {
  return (
    <Switch>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/users/:id" exact component={Images} />
      <Route path="/" exact component={Images} />
      <Route path="/images" exact component={Images} />
      <Route path="/images/new" exact component={NewImage} />
    </Switch>
  );
};

export default Routes;
