import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Layout } from 'antd';

const {
  Content,
} = Layout;

class ListWill extends Component {
  constructor() {
    super();

    this.state = {
      willList: [1, 2],
    };
  }

  renderItem() {
    return (
      <Col sm={12}>
        <div style={{ background: '#ffffff', padding: 20, marginBottom: 20 }}>
          <h3>Test name</h3>
          <Row>
            <Col sm="5">
              <Row>
                <Label sm={4}>Birthday</Label>
                <Col sm={8}>
                  16/02/1992
                </Col>
              </Row>
              <Row>
                <Label sm={4}>Identity number</Label>
                <Col sm={8}>
                  00121212
                </Col>
              </Row>
              <Row>
                <Label sm={4}>Identity issued place</Label>
                <Col sm={8}>
                  00121212
                </Col>
              </Row>
              <Row>
                <Label sm={4}>Identity issued date</Label>
                <Col sm={8}>
                  00121212
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
              <Button>Sign off</Button>
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
              {willList.map((i) => {
                return this.renderItem();
              })}
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
