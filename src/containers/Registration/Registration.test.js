import React from 'react';

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import RegistrationContainer from "./";

describe.skip("<RegistrationContainer />", () => {
    it("should render a profile page", () => {
        const wrapper = shallow(<RegistrationContainer />);
    });
});
