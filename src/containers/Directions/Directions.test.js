import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Directions from "./Directions";

configure({ adapter: new Adapter() });

describe.skip("<Directions />", () => {
  it("should", () => {
    const wrapper = shallow(<Directions />);
    // console.log(wrapper);
    // expect(wrapper.contains(<p>Directions</p>)).toEqual(true);
  });
});
