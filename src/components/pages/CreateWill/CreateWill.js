import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Button, Input, FormText } from 'reactstrap';
import { Layout } from 'antd';
import axios from 'axios';
import history from '../../../services/history';

const {
  Content, Footer,
} = Layout;

class CreateWill extends Component {
  constructor() {
    super();

    this.state = {
      willData: {
        location: '',
        estates_declaration: '',
        last_will_statement: '',
        witness_1: '',
        witness_2: '',
      },
      userData: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://192.168.1.20:8888/user', {
      params: {
        public_key: sessionStorage.getItem('dapp_public_key'),
      },
    }).then((response) => {
      this.setState({
        userData: response.data.data,
      });
    });
  }

  handleChange(event) {
    const { willData } = this.state;
    willData[event.target.name] = event.target.value;

    this.setState({
      willData,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const witnesses = [
      {
        public_key: this.state.willData.witness_1,
      },
      {
        public_key: this.state.willData.witness_2,
      },
    ];
    axios.post('http://192.168.1.20:8888/will/create', Object.assign(
      {},
      this.state.willData,
      { witnesses, public_key: sessionStorage.getItem('dapp_public_key') })).then((response) => {
      history.push('/dashboard/will/id');
    });
  }

  render() {
    const { userData } = this.state;
    return (
      <div>
        <Content style={{ padding: 20 }}>
          <h2 className="text-center">LAST WILL AND TESTAMENT</h2>
          <p className="text-center">Date: 29/09/2018</p>
          <Row>
            <Col>
              <div style={{ background: '#ffffff', padding: 20, marginBottom: 20 }}>
                <h3>Testator Information</h3>
                <Row>
                  <Col sm="6">
                    <Row>
                      <Label sm={4}>Full Name</Label>
                      <Col sm={8}>
                        {userData.full_name}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={4}>Birthday</Label>
                      <Col sm={8}>
                        {userData.birthday}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={4}>Identity number</Label>
                      <Col sm={8}>
                        {userData.id_number}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={4}>Identity issued place</Label>
                      <Col sm={8}>
                        {userData.id_issued_place}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={4}>Identity issued date</Label>
                      <Col sm={8}>
                        {userData.id_issued_date}
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="6">
                    <Row>
                      <Col sm={6}>
                        <img style={{ width: '100%' }} src="http://dichthuatnhanhhanoi.com/wp-content/uploads/2018/03/giay-chung-minh-thu-nhanh-dan-mat-truoc.jpg" />
                        <p>Front of identity card</p>
                      </Col>
                      <Col sm={6}>
                        <img style={{ width: '100%' }} src="http://dichthuatnhanhhanoi.com/wp-content/uploads/2018/03/giay-chung-minh-thu-nhanh-dan-mat-truoc.jpg" />
                        <p>Back of identity card</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ background: '#ffffff', padding: 20 }}>
                <h3>Last Will Statement</h3>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label sm={2}>Location</Label>
                    <Col sm={10}>
                      <Input value={this.state.willData.location} onChange={this.handleChange} type="text" name="location" placeholder="Location" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Estates Declaration</Label>
                    <Col sm={10}>
                      <Input value={this.state.willData.estates_declaration} onChange={this.handleChange} type="textarea" name="estates_declaration" placeholder="Estate Declaration" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Last Will Statement</Label>
                    <Col sm={10}>
                      <Input value={this.state.willData.last_will_statement} onChange={this.handleChange} type="textarea" name="last_will_statement" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleFile" sm={2}>Recorded video</Label>
                    <Col sm={10}>
                      <Input type="file" name="file" id="exampleFile" />
                      <FormText color="muted">
                        You need to record a video
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Witness #1</Label>
                    <Col sm={10}>
                      <Input value={this.state.willData.witness_1} onChange={this.handleChange} type="text" name="witness_1" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Witness #2</Label>
                    <Col sm={10}>
                      <Input value={this.state.willData.witness_2} onChange={this.handleChange} type="text" name="witness_2" />
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button type="submit">Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </div>
    );
  }
}

const styles = {
  greeting: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh',
  },
};

export default CreateWill;
