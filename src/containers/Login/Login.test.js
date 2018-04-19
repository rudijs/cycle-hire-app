import React from 'react';

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import LoginContainer from "./";

describe.skip("<LoginContainer />", () => {
    it("should render a profile page", () => {
        const wrapper = shallow(<LoginContainer />);
    });
});
