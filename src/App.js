import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './Routes';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import CustomLayout from './containers/Layout';
import * as actions from './store/action/auth';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }  
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }  
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
