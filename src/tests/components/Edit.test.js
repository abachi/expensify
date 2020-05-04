import React from "react";
import { shallow } from "enzyme";
import { Edit } from "../../components/Edit";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <Edit
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />
  );
});

test("should render the Edit correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should submit and handle expense updates", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[0]);
  expect(editExpense).toHaveBeenCalledWith(expenses[0].id, expenses[0]);
  expect(history.push).toHaveBeenCalled();
});

test("should handle remove expense", () => {
  wrapper.find("button").prop("onClick")(expenses[0]);
  expect(startRemoveExpense).toHaveBeenCalledWith(expenses[0]);
  expect(history.push).toHaveBeenCalled();
});
