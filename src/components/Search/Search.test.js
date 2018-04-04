import React from 'react';

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import SearchPage from "./Search";

describe("<SearchPage />", () => {
  it("should render a search page", () => {
      const wrapper = shallow(<SearchPage />)
      // expect(wrapper.contains(<BikePlacesList />)).toEqual(true)
  });
});
