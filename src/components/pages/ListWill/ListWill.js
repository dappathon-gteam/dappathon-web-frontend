import React, { Component } from 'react';
import {
  Row, Col, Label, Button,
} from 'reactstrap';
import { Layout, message } from 'antd';
import axios from 'axios';
import API_ROOT from '../../../config';

const {
  Content,
} = Layout;

class ListWill extends Component {
  constructor() {
    super();

    this.state = {
      willList: [],
    };
    this.handleSignOff = this.handleSignOff.bind(this);
  }

  componentDidMount() {
    axios.get(`${API_ROOT}/will/list`, {
      params: {
        public_key: sessionStorage.getItem('dapp_public_key'),
      },
    }).then((response) => {
      this.setState({
        willList: response.data.data,
      });
    });
  }

  getWillStatus(will) {
    const { witnesses } = will;
    let currentStatus = null;
    witnesses.forEach((item) => {
      if (item.public_key === sessionStorage.getItem('dapp_public_key')) {
        currentStatus = item.status;
      }
    });

    return currentStatus;
  }

  handleSignOff(ownerKey) {
    axios.get(`${API_ROOT}/will/witness_sign`, {
      params: {
        public_key: ownerKey,
        witness: sessionStorage.getItem('dapp_public_key'),
      },
    }).then(() => {
      message.success('Sign successfully', 2.5, () => {
        window.location.reload();
      });
    });
  }

  renderItem(will) {
    const { testator } = will;
    return (
      <Col sm={12}>
        <div style={{ background: '#ffffff', padding: 20, marginBottom: 20 }}>
          <h3>{testator.full_name}</h3>
          <Row>
            <Col sm="5">
              <Row>
                <Label sm={4}>Birthday</Label>
                <Col sm={8}>
                  {testator.birthday}
                </Col>
              </Row>
              <Row>
                <Label sm={4}>Identity number</Label>
                <Col sm={8}>
                  {testator.id_number}
                </Col>
              </Row>
              <Row>
                <Label sm={4}>Identity issued place</Label>
                <Col sm={8}>
                  {testator.id_issued_place}
                </Col>
              </Row>
              <Row>
                <Label sm={4}>Identity issued date</Label>
                <Col sm={8}>
                  {testator.id_issued_date}
                </Col>
              </Row>
            </Col>
            <Col sm="5">
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
            <Col sm="2">
              {this.getWillStatus(will) === 'signed' && (
                <Button className="btn btn-success">Signed</Button>
              )}
              {this.getWillStatus(will) !== 'signed' && (
                <Button onClick={() => { this.handleSignOff(will.public_key); }}>Sign off</Button>
              )}
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  render() {
    const { willList } = this.state;
    return (
      <div>
        <Content style={{ padding: 20 }}>
          <div style={styles.list}>
            <h2 className="text-center">LAST WILLS YOU ARE WITNESS</h2>
            <Row>
              {willList.map(will => this.renderItem(will))}
            </Row>
          </div>
        </Content>
      </div>
    );
  }
}

const styles = {
  list: {
    height: '100vh',
  },
};

export default ListWill;
