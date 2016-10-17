import React, {Component} from 'react';

import styles from './symbol.scss';

export default class Symbol extends Component {
  render () {
    return (
      <span className={styles.wrap}>
        &#9773;
      </span>
    );
  }
}
