import React, {Component, PropTypes} from 'react';

import Header from './header';
import styles from './app.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <div>
        <Header />

        <div className={styles.wrap}>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
