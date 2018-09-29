import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Signup from '../../pages/Signup/Signup';
import Signin from '../../pages/Signin/Signin';

class Authentication extends Component {
  render() {
    const { match } = this.props;
    return (
      <div style={styles.outterContainer}>
        <Container>
          <Route path={`${match.path}/sign-up`} component={Signup} />
          <Route path={`${match.path}/sign-in`} component={Signin} />
        </Container>
      </div>
    );
  }
}

const styles = {
  outterContainer: {
    backgroundColor: '#004f50',
  },
};

export default Authentication;
