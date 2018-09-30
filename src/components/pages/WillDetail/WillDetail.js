import React, { Component } from 'react';
import { Row, Col, Label } from 'reactstrap';
import { Layout, Icon } from 'antd';
import axios from 'axios';
import API_ROOT from '../../../config';

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
    const { params } = this.props.match;
    const publicKey = params.id;
    axios.get(`${API_ROOT}/user`, {
      params: {
        public_key: publicKey,
      },
    }).then((response) => {
      this.setState({
        userData: response.data.data,
      });
    });

    axios.get(`${API_ROOT}/will`, {
      params: {
        public_key: publicKey,
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
          {willDetail.status === 'valid' && (
            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={styles.iconSuccess} />
          )}
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
                        <video width="320" height="240" controls>
                          <source src="https://r4---sn-a5msen76.googlevideo.com/videoplayback?itag=18&source=youtube&fvip=1&requiressl=yes&sparams=clen,dur,ei,expire,gir,id,ip,ipbits,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&ipbits=0&ip=207.246.81.208&id=o-AL8vRpEvOAmLi6wgJMGBbRQCfuYDsd3LGtckUEhTddZP&pl=19&ei=5SywW-ndMePw8gSIxL_ACg&expire=1538294086&c=WEB&key=cms1&mime=video%2Fmp4&signature=2F46A3F3766D975404A0749CE9C114CEBA23635A.5CECF13E11C29068793249898EC4186745936D29&ratebypass=yes&gir=yes&clen=24707183&dur=442.967&lmt=1450089914304535&title=How+to+record+a+self+taped+audition&title=How+to+record+a+self+taped+audition&mip=14.169.188.19&cm2rm=sn-8qj-nboek7z,sn-i3b6s7z&fexp=23763603&req_id=14338c620aada3ee&redirect_counter=2&cms_redirect=yes&mm=34&mn=sn-a5msen76&ms=ltu&mt=1538272473&mv=m" type="video/mp4" />
                        </video>
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
          Trust Will ©2018 Created by G-Team
        </Footer>
      </div>
    );
  }
}

const styles = {
  iconSuccess: {
    fontSize: 40, position: 'absolute', top: 20, right: 20,
  },
};

export default WillDetail;
