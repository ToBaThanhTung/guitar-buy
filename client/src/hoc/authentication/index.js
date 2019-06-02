import React, { Component } from 'react'
import { connect } from 'react-redux';
import { auth } from '../../redux/actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposeClass, reload, adminRoute = null) { 
  class AuthenticationCheck extends Component {
    
    state = {
      loading: true,
      isAuth: false,
    }

    async componentDidMount() {
      await this.props.auth();
      this.setState({ loading: false });
    }

    render() {
      if(this.state.loading) {
        return (
          <div>
            <CircularProgress />
          </div>
        )
      }
      return(
        <div>
          <ComposeClass {...this.props} user={this.props.user}/>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    user: state.user.userData,
  });

  return connect(mapStateToProps, {auth})(AuthenticationCheck);
}

