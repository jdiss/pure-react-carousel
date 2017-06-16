import React from 'react';
import { shallow } from 'enzyme';
import clone from 'clone';
import CarouselProvider from '../';
import components from '../../helpers/component-config';

let props;

describe('<CarouselProvider />', () => {
  beforeEach(() => {
    props = clone(components.CarouselProvider.props);
  });
  it('should render', () => {
    const wrapper = shallow((
      <CarouselProvider
        {...props}
      >
        Hello
      </CarouselProvider>
    ));
    expect(wrapper.exists()).toBe(true);
  });
  it('utility function getStoreState should return the state', () => {
    const wrapper = shallow((
      <CarouselProvider
        {...props}
        orientation="vertical"
      >Hello</CarouselProvider>
    ));
    const instance = wrapper.instance();
    expect(instance.getStore()).toBe(instance.store);
  });
  it('should update the store values for slideSize and slideTraySize if totalSlides prop changes', () => {
    const wrapper = shallow(<CarouselProvider {...props} totalSlides={4} />);
    const instance = wrapper.instance();
    expect(instance.store.state.slideSize).toBe(25);
    expect(instance.store.state.slideTraySize).toBe(400);
    wrapper.setProps({ totalSlides: 2 });
    expect(instance.store.state.slideSize).toBe(50);
    expect(instance.store.state.slideTraySize).toBe(200);
  });
  it('should update the store values for slideSize and slideTraySize if visibleSlides prop changes', () => {
    const wrapper = shallow(<CarouselProvider {...props} totalSlides={4} />);
    const instance = wrapper.instance();
    expect(instance.store.state.slideSize).toBe(25);
    expect(instance.store.state.slideTraySize).toBe(400);
    wrapper.setProps({ visibleSlides: 2 });
    expect(instance.store.state.slideSize).toBe(25);
    expect(instance.store.state.slideTraySize).toBe(200);
  });
  it('should not update the store if some prop we do not track changes', () => {
    const wrapper = shallow(<CarouselProvider {...props} data-foo={1} />);
    const instance = wrapper.instance();
    const start = clone(instance.store.state);
    wrapper.setProps({ 'data-foo': 2 });
    const end = clone(instance.store.state);
    expect(start).toEqual(end);
  });
});
