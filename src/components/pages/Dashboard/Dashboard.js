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
            <h1>{userData.full_name}</h1>
            <p>Protect your loved ones with a legally binding will</p>
            <img
              width="100"
              height="100"
              style={{ borderRadius: 100 }}
              src="https://images-na.ssl-images-amazon.com/images/I/51mIsusDzGL._SX353_BO1,204,203,200_.jpg"
              alt=""
            />
            <br />
            <Link to="/dashboard/create-will" className="btn btn-primary">Start my last will</Link>
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
