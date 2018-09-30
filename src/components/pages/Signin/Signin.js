import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button, Form, FormGroup, Label, Input, Row, Col,
} from 'reactstrap';

class Signin extends Component {
  render() {
    return (
      <Row>
        <Col xs="12" md={{ size: 4, offset: 4 }}>
          <div style={styles.formWrapper}>
            <h1 style={{ color: '#ffffff', fontSize: 50 }}>
              <b>TRUST</b>
              <span>&nbsp;</span>
              WILL
            </h1>
            <h3 style={{ color: '#ffffff', marginTop: 50 }}>
              SIGN IN
            </h3>
            <Form>
              <FormGroup>
                <Label for="private_key" style={styles.label}>Private key</Label>
                <StyledInput type="text" name="private_key" id="private_key" placeholder="xxxxxxx" />
              </FormGroup>
              <Button style={styles.buttonSubmit}>Submit</Button>
              <p style={styles.message} className="float-right">
                Don&apos;t have an account?
                <span>&nbsp;</span>
                <Link to="/auth/sign-up" style={{ color: '#39898a' }}>Sign up here</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

const StyledInput = styled(Input)`
  font-size: 22 !important;
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #ffffff !important;
  color: #ffffff !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const styles = {
  formWrapper: {
    height: '100vh',
    marginTop: '10vh',
  },
  message: {
    color: '#ffffff',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
  },
  label: {
    color: '#39898a',
    fontSize: 16,
  },
  link: {
    color: '#ffffff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  buttonSubmit: {
    width: '100%',
    borderRadius: 30,
    fontSize: 22,
    marginTop: 10,
  },
};

export default Signin;
