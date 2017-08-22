import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Planet from './planet';


describe('<Planet />', () => {

  it('Should display the name in an H4', () => {
    const wrapper = shallow(<Planet name="Planet Della" />);

    expect(wrapper.find('h4')).to.have.length(1);
    expect(wrapper.find('h4').text()).to.contain('Planet Dlla');

  });

});
