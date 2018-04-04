import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import BikePlacesList from "./BikePlacesList";

describe("<BikePlacesList />", () => {
  it("should render a list of bike places", () => {
    const wrapper = shallow(<BikePlacesList />);
    console.log(101, wrapper);
    // expect(wrapper.contains(<h1>Search</h1>)).toEqual(true)
  });
});
