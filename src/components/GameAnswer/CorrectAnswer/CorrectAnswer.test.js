import React from 'react';
import { shallow } from 'enzyme';

import CorrectAnswer from './CorrectAnswer';

describe('<CorrectAnswer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CorrectAnswer />);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.CorrectAnswer')).toHaveLength(1);
  });
});
