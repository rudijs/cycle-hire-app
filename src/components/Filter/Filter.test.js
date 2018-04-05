import React from 'react';

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import FilterPage from "./Filter";

describe("<FilterPage />", () => {
  it("should render a filter page", () => {
      const wrapper = shallow(<FilterPage />)
      // expect(wrapper.contains(<BikePlacesList />)).toEqual(true)
  });
});
