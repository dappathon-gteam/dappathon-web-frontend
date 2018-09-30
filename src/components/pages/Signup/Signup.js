import React, { Component } from 'react';
import axios from 'axios';
import { Upload, message } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button, Form, FormGroup, Label, Input, Row, Col,
} from 'reactstrap';
import AddButton from '../../common/AddButton/AddButton';
import history from '../../../services/history';
import API_ROOT from '../../../config';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      step: 1,
      frontUrl: '',
      backUrl: '',
      selfieUrl: '',
      disableSubmit: false,

      formData: {
        public_key: '',
        full_name: '',
        birthday: '',
        email: '',
        phone_number: '',
        id_number: '',
        id_issued_date: '',
        id_issued_place: '',
      },
    };

    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleBackChange = this.handleBackChange.bind(this);
    this.handleFrontChange = this.handleFrontChange.bind(this);
    this.handleSelfieChange = this.handleSelfieChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;

    this.setState({
      formData,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      disableSubmit: true,
    }, () => {
      axios.post(`${API_ROOT}/register`, this.state.formData).then((response) => {
        sessionStorage.setItem('dapp_public_key', this.state.formData.public_key);
        message.success('Successfully registered', 3, () => {
          history.push('/dashboard');
        });
      });
    });
  }

  handleFrontChange(info) {
    getBase64(info.file.originFileObj, frontUrl => this.setState({
      frontUrl,
    }));
  }

  handleBackChange(info) {
    getBase64(info.file.originFileObj, backUrl => this.setState({
      backUrl,
    }));
  }

  handleSelfieChange(info) {
    getBase64(info.file.originFileObj, selfieUrl => this.setState({
      selfieUrl,
    }));
  }

  handleNextStep() {
    const { step } = this.state;
    const nextStep = step + 1;
    this.setState({
      step: nextStep,
    });
  }

  render() {
    const {
      step, frontUrl, backUrl, selfieUrl, disableSubmit,
    } = this.state;
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
              SIGN UP
            </h3>
            <Form onSubmit={this.handleSubmit}>
              {step === 1 && (
                <div>
                  <FormGroup>
                    <Label for="public_key" style={styles.label}>Public Address</Label>
                    <StyledInput value={this.state.formData.public_key} onChange={this.handleChange} type="text" name="public_key" id="public_key" placeholder="Public Address" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="full_name" style={styles.label}>Full Name</Label>
                    <StyledInput value={this.state.formData.full_name} onChange={this.handleChange} type="text" name="full_name" id="full_name" placeholder="Full Name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="birthday" style={styles.label}>Birthday</Label>
                    <StyledInput value={this.state.formData.birthday} onChange={this.handleChange} type="date" name="birthday" id="birthday" placeholder="Birthday" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email" style={styles.label}>Email</Label>
                    <StyledInput value={this.state.formData.email} onChange={this.handleChange} type="email" name="email" id="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone_number" style={styles.label}>Phone Number</Label>
                    <StyledInput value={this.state.formData.phone_number} onChange={this.handleChange} type="text" name="phone_number" id="phone_number" placeholder="Phone Number" />
                  </FormGroup>
                </div>
              )}
              {step === 2 && (
                <div>
                  <FormGroup>
                    <Label for="id_number" style={styles.label}>Identity number</Label>
                    <StyledInput value={this.state.formData.id_number} onChange={this.handleChange} type="text" name="id_number" id="id_number" placeholder="Identity number" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="id_issued_date" style={styles.label}>Identity issued date</Label>
                    <StyledInput value={this.state.formData.id_issued_date} onChange={this.handleChange} type="date" name="id_issued_date" id="id_issued_date" placeholder="Identity issued date" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="id_issued_place" style={styles.label}>Identity issued place</Label>
                    <StyledInput value={this.state.formData.id_issued_place} onChange={this.handleChange} type="text" name="id_issued_place" id="id_issued_place" placeholder="Identity issued place" />
                  </FormGroup>
                  <FormGroup>
                    <Label style={styles.label}>Proof of identity</Label>
                    <Row>
                      <Col xs="4">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          accept="image/*"
                          // beforeUpload={beforeUpload}
                          onChange={this.handleFrontChange}
                        >
                          {frontUrl ? <img style={{ width: '100%' }} src={frontUrl} alt="Front of ID" /> : <AddButton />}
                        </Upload>
                        <p style={styles.idText}>
                          Front of
                          <br />
                          identity card
                        </p>
                      </Col>
                      <Col xs="4">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          accept="image/*"
                          // beforeUpload={beforeUpload}
                          onChange={this.handleBackChange}
                        >
                          {backUrl ? <img style={{ width: '100%' }} src={backUrl} alt="Back of ID" /> : <AddButton />}
                        </Upload>
                        <p style={styles.idText}>
                          Back of
                          <br />
                          identity card
                        </p>
                      </Col>
                      <Col xs="4">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          accept="image/*"
                          // beforeUpload={beforeUpload}
                          onChange={this.handleSelfieChange}
                        >
                          {selfieUrl ? <img style={{ width: '100%' }} src={selfieUrl} alt="Selfie with ID" /> : <AddButton />}
                        </Upload>
                        <p style={styles.idText}>
                          Selfie with
                          <br />
                          identity card
                        </p>
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
              )}
              {step === 1 && (
                <Button type="button" style={styles.buttonSubmit} onClick={this.handleNextStep}>Next</Button>
              )}
              {step === 2 && (
                <Button type="submit" style={styles.buttonSubmit} disabled={disableSubmit}>Submit</Button>
              )}
              <p style={styles.message} className="float-right">
                Already have an account?
                <span>&nbsp;</span>
                <Link to="/auth/sign-in" style={{ color: '#39898a' }}>Sign in here</Link>
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
  idText: { fontSize: 10, color: '#ffffff', textAlign: 'center' },
  buttonSubmit: {
    width: '100%',
    borderRadius: 30,
    fontSize: 22,
    marginTop: 10,
  },
};

export default Signup;
