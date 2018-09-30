import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import API_ROOT from '../../../config';
import history from '../../../services/history';

const {
  Content, Footer,
} = Layout;

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
    };
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

    axios.get(`${API_ROOT}/will`, {
      params: {
        public_key: sessionStorage.getItem('dapp_public_key'),
      },
    }).then(() => {
      history.push('/dashboard/will/id');
    });
  }

  render() {
    const { userData } = this.state;
    return (
      <div>
        <Content>
          <div style={styles.greeting}>
            <h1>{`Hello ${userData.full_name}!`}</h1>
            <p style={{ fontSize: 24 }}>Protect your loved ones with a legally binding will</p>
            <img
              width="120"
              height="120"
              style={{ borderRadius: 120, marginTop: 25, marginBottom: 25 }}
              src="https://images-na.ssl-images-amazon.com/images/I/51mIsusDzGL._SX353_BO1,204,203,200_.jpg"
              alt=""
            />
            <br />
            <Link style={{ fontSize: 20 }} to="/dashboard/create-will" className="btn btn-primary">Start my last will</Link>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Trust Will ©2018 Created by G-Team
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

export default Dashboard;
