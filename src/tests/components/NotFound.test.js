import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../components/NotFound";

test("should render NotFound", () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});
