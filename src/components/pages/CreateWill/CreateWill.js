import React, { Component } from 'react';
import {
  Row, Col, Form, FormGroup, Label, Button, Input, FormText,
} from 'reactstrap';
import { Layout, message } from 'antd';
import axios from 'axios';
import history from '../../../services/history';
import API_ROOT from '../../../config';

const {
  Content, Footer,
} = Layout;

class CreateWill extends Component {
  constructor() {
    super();

    this.state = {
      showVideo: false,
      willData: {
        location: '',
        estates_declaration: '',
        last_will_statement: '',
        video: 'https://r4---sn-a5msen76.googlevideo.com/videoplayback?itag=18&source=youtube&fvip=1&requiressl=yes&sparams=clen,dur,ei,expire,gir,id,ip,ipbits,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&ipbits=0&ip=207.246.81.208&id=o-AL8vRpEvOAmLi6wgJMGBbRQCfuYDsd3LGtckUEhTddZP&pl=19&ei=5SywW-ndMePw8gSIxL_ACg&expire=1538294086&c=WEB&key=cms1&mime=video%2Fmp4&signature=2F46A3F3766D975404A0749CE9C114CEBA23635A.5CECF13E11C29068793249898EC4186745936D29&ratebypass=yes&gir=yes&clen=24707183&dur=442.967&lmt=1450089914304535&title=How+to+record+a+self+taped+audition&title=How+to+record+a+self+taped+audition&mip=14.169.188.19&cm2rm=sn-8qj-nboek7z,sn-i3b6s7z&fexp=23763603&req_id=14338c620aada3ee&redirect_counter=2&cms_redirect=yes&mm=34&mn=sn-a5msen76&ms=ltu&mt=1538272473&mv=m',
        witness_1: '',
        witness_2: '',
      },
      userData: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get(`${API_ROOT}/user`, {
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
    axios.post(`${API_ROOT}/will/create`, Object.assign(
      {},
      this.state.willData,
      {
        witnesses,
        public_key: sessionStorage.getItem('dapp_public_key'),
      })).then(() => {
      message.success('Create successfully', 2.5, () => {
        history.push('/dashboard/will/id');
      });
    });
  }

  render() {
    const { userData, showVideo } = this.state;
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
                      <Input type="file" name="file" id="exampleFile" accept="video/*" onChange={() => {
                        this.setState({ showVideo: true });
                      }} />
                      {!showVideo && (
                        <FormText color="muted">
                          You need to record a video
                        </FormText>
                      )}
                      {showVideo && (
                        <video width="320" height="240" controls>
                          <source src="https://r4---sn-a5msen76.googlevideo.com/videoplayback?itag=18&source=youtube&fvip=1&requiressl=yes&sparams=clen,dur,ei,expire,gir,id,ip,ipbits,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&ipbits=0&ip=207.246.81.208&id=o-AL8vRpEvOAmLi6wgJMGBbRQCfuYDsd3LGtckUEhTddZP&pl=19&ei=5SywW-ndMePw8gSIxL_ACg&expire=1538294086&c=WEB&key=cms1&mime=video%2Fmp4&signature=2F46A3F3766D975404A0749CE9C114CEBA23635A.5CECF13E11C29068793249898EC4186745936D29&ratebypass=yes&gir=yes&clen=24707183&dur=442.967&lmt=1450089914304535&title=How+to+record+a+self+taped+audition&title=How+to+record+a+self+taped+audition&mip=14.169.188.19&cm2rm=sn-8qj-nboek7z,sn-i3b6s7z&fexp=23763603&req_id=14338c620aada3ee&redirect_counter=2&cms_redirect=yes&mm=34&mn=sn-a5msen76&ms=ltu&mt=1538272473&mv=m" type="video/mp4" />
                        </video>
                      )}
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
          Trust Will ©2018 Created by G-Team
        </Footer>
      </div>
    );
  }
}

export default CreateWill;
