import React from "react";
import { shallow } from "enzyme";
import { Create } from "../../components/Create";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let wrapper, addExpense, history;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<Create addExpense={addExpense} history={history} />);
});

test("should render Create expense correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render Create expense correctly", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[0]);
  expect(history.push).toHaveBeenCalled();
  expect(addExpense).toHaveBeenCalledWith(expenses[0]);
});
