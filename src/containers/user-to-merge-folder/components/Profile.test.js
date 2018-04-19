import React from 'react';

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import ProfilePage from "./Profile";

describe("<ProfilePage />", () => {
  it("should render a profile page", () => {
      const wrapper = shallow(<ProfilePage />)
      expect(wrapper.contains(<h1>My Profile</h1>)).toEqual(true)
  });
});
