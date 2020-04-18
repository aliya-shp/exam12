import React, {Component, Fragment} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  formSubmitHandler = e => {
    e.preventDefault();
    this.props.loginUser({...this.state});
  };

  render() {
    return (
      <Fragment>
        <h2>Login</h2>
        {this.props.error && (
          <Alert color='danger'>
            {this.props.error.error || this.props.error.global || this.props.error.message }
          </Alert>
        )}
        <Form onSubmit={this.formSubmitHandler}>
          <FormElement propertyName='username'
                       title='Username'
                       type='text'
                       value={this.state.username}
                       onChange={this.inputChangeHandler}
                       placeholder='Enter username'
                       autoComplete='current-username'

          />
          <FormElement propertyName='password'
                       title='Password'
                       type='password'
                       value={this.state.password}
                       onChange={this.inputChangeHandler}
                       placeholder='Enter password'
                       autoComplete='current-password'

          />
          <FormGroup row>
            <Col sm={{ offset: 2, size: 10 }}>
              <Button type="submit" color="primary">Login</Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <FacebookLogin/>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.loginError,
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);