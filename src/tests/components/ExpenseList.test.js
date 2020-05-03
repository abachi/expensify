import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("should render ExpenseList with the given expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render message when there is no expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
