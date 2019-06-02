import React, { Component } from 'react'
import { connect } from 'react-redux';
import RegisterComponent from './RegisterComponent';
import { withRouter } from 'react-router-dom';
import { registerAction } from '../../redux/actions/user_actions';



class RegisterContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",

      errors: {},
    };
  }


  submitButton = (e) => {
    e.preventDefault();

    const userInput = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.userName,
      password: this.state.password,
    }
    this.props.registerAction(userInput);
  };

  loginButton = (e) => {
    e.preventDefault();
    this.props.history.push('/login');
  };

  onTicket = () => {
    this.setState({
      student: !this.state.student,
      hr: !this.state.hr,
    });
  };

  onChangeText = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {

    return (
      <div>
        <RegisterComponent
          data={this.state}
          onTicket={this.onTicket}
          onChangeText={this.onChangeText}
          loginButton={this.loginButton}
          submitButton={this.submitButton}
        />
      </div>
    );

  }
}

RegisterContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { registerAction })(withRouter(RegisterContainer));