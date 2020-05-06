import React from "react";
import { shallow } from "enzyme";
import { Edit } from "../../components/Edit";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import ConfirmationModal from "../../components/ConfirmationModal";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <Edit
      startEditExpense={startEditExpense}
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
  expect(startEditExpense).toHaveBeenCalledWith(expenses[0].id, expenses[0]);
  expect(history.push).toHaveBeenCalled();
});

test("should handle remove expense", () => {
  wrapper.find(ConfirmationModal).prop("onRemove")(expenses[0]);
  expect(startRemoveExpense).toHaveBeenCalledWith(expenses[0]);
  expect(history.push).toHaveBeenCalled();
});

test("should hide modal", () => {
  wrapper.find("button[name='remove-btn']").simulate("click");
  expect(wrapper.state("isRemoveModalOpen")).toBe(true);
});
