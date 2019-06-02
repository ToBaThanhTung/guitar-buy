import React, { Component } from 'react'
import {connect} from 'react-redux';
import LoginComponent from './LoginComponent';
import { loginAction } from '../../redux/actions/user_actions';

class LoginContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  componentDidMount() {
   
   
  }

  onChangeText = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  signButton = (e) => {
    e.preventDefault();
    this.props.history.push('/register');
  };

  loginButton = async (e) => {
    
    e.preventDefault();
    
    const userInput = {
      email: this.state.email,
      password: this.state.password,
    };
    await this.props.loginAction(userInput);
      
  };


  render() {
  
    console.log(this.state);
    return (
      <div>
        <LoginComponent 
          data={this.state} 
          onChangeText={this.onChangeText}
          signButton={this.signButton}
          loginButton={this.loginButton}
      />
      </div>
    );

  }
}

LoginContainer.propTypes = {
  
};


const mapStateToProps = (state) => ({
 
})

export default connect(mapStateToProps, { loginAction })(LoginContainer);