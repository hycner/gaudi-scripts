import React, {Component} from 'react';

import style from './jeff.scss';

export default class Jeff extends Component {
  render () {
    return (
      <div>
        <p className={style.image}>
          <img src="http://i.imgur.com/tW9N7Sj.jpg" />
        </p>
      </div>
    );
  }
}
