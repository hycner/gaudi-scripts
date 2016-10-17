import React, {Component} from 'react';

import style from './kiwis.scss';

export default class Kiwis extends Component {
  render () {
    return (
      <div>
        <p className={style.image}>
          <img src="http://i.imgur.com/13BcDvS.jpg" />
        </p>
      </div>
    );
  }
}
