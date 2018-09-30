import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { Route, Link } from 'react-router-dom';
import ListWill from '../../pages/ListWill/ListWill';
import CreateWill from '../../pages/CreateWill/CreateWill';
import WillDetail from '../../pages/WillDetail/WillDetail';
import Dashboard from '../../pages/Dashboard/Dashboard';

const {
  Sider,
} = Layout;

class ListLayout extends Component {
  render() {
    const { match, location } = this.props;
    return (
      <Layout>
        <Sider collapsible style={styles.sider}>
          <h3 style={styles.logo}>
            <b>TRUST</b>
            <span>&nbsp;</span>
            WILL
          </h3>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key={`${match.path}`}>
              <Link to={`${match.path}`}>
                <Icon type="user" />
                <span className="nav-text">My Last Will</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`${match.path}/list-will`}>
              <Link to={`${match.path}/list-will`}>
                <Icon type="video-camera" />
                <span className="nav-text">Witness Sign-off</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Route exact path={`${match.path}`} component={Dashboard} />
          <Route path={`${match.path}/list-will`} component={ListWill} />
          <Route path={`${match.path}/create-will`} component={CreateWill} />
          <Route path={`${match.path}/will/:id`} component={WillDetail} />
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  logo: {
    color: '#ffffff',
    marginTop: 20,
    textAlign: 'center',
  },
  sider: {
    overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
  },
};

export default ListLayout;
