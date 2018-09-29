import React, { Component } from 'react';
import { Icon } from 'antd';

class AddButton extends Component {
  render() {
    const { match } = this.props;
    return (
      <div style={styles.outterContainer}>
        <div style={styles.buttonWrapper}>
          <Icon type="plus-circle" theme="outlined" />
          <p style={{ padding: 0, fontSize: 14 }}>Add Image</p>
        </div>
      </div>
    );
  }
}

const styles = {
  buttonWrapper: {
    textAlign: 'center',
  },
  button: {
    background: 'none',
    border: 'none',
  },
  outterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
};

export default AddButton;
