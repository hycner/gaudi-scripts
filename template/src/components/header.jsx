// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';

import styles from './header.scss';
import Symbol from './symbol';

export default class Header extends Component {
  render () {
    return (
      <div className={styles.header}>
        <Link to="/">home</Link>
        <Symbol />
        <Link to="/jeff">jeff</Link>
        <Symbol />
        <Link to="/kiwis">kiwis</Link>
      </div>
    );
  }
}
