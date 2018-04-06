import React from 'react';

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import MapPage from "./Map";

describe("<MapPage />", () => {
  it("should render a Map page", () => {
      // const wrapper = shallow(<MapPage />)
      // expect(wrapper.contains(<h1>Profile</h1>)).toEqual(true)
  });
});
