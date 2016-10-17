import React from 'react';
import {shallow, mount, render} from 'enzyme';

import Header from '../header';
import Symbol from '../symbol';

describe("Header:", () => {
  it("renders the correct # of Symbols", () => {
    expect(shallow(
      <Header />
    ).find(
      Symbol
    )).length.toBe(2);
  });
});
