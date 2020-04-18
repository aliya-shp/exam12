import React, {Component} from 'react';
import {Container} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {logoutUser} from "./store/actions/usersActions";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import Routes from "./Routes";

import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header>
          <Toolbar
            user={this.props.user}
            logout={this.props.logoutUser}
          />
        </header>
        <Container style={{marginTop: '20px'}}>
          <Routes user={this.props.user} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
