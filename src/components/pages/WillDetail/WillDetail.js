import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Layout, Button } from 'antd';
import axios from "axios";

const {
  Content, Footer,
} = Layout;

class WillDetail extends Component {
  constructor() {
    super();

    this.state = {
      willDetail: {},
      userData: {},
    };
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

    axios.get('http://192.168.1.20:8888/will', {
      params: {
        public_key: sessionStorage.getItem('dapp_public_key'),
      },
    }).then((response) => {
      this.setState({
        willDetail: response.data.data,
      });
    });
  }

  render() {
    const { willDetail, userData } = this.state;
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
              <div style={{ background: '#ffffff', padding: 20, marginBottom: 20 }}>
                <h3>Testator Information</h3>
                <Row>
                  <Col sm="12">
                    <Row>
                      <Label sm={2}>Location created</Label>
                      <Col sm={10}>
                        {willDetail.location}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Estates declaration</Label>
                      <Col sm={10}>
                        {willDetail.estates_declaration}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Last will statement</Label>
                      <Col sm={10}>
                        {willDetail.last_will_statement}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Recorded Video</Label>
                      <Col sm={10}>
                        00121212
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Witness #1</Label>
                      <Col sm={10}>
                        {willDetail.witness_1}
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Witness #2</Label>
                      <Col sm={10}>
                        {willDetail.witness_2}
                      </Col>
                    </Row>
                  </Col>
                </Row>
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

export default WillDetail;
