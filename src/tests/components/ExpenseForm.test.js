import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render empty ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description when input change", () => {
  const value = "New description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input[name='description']").simulate("change", {
    target: { value },
  });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note when input change", () => {
  const value = "New note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea[name='note']").simulate("change", {
    target: { value },
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set valid amount on input change", () => {
  const validAmount = "23.50";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input[name='amount']").simulate("change", {
    target: { value: validAmount },
  });
  expect(wrapper.state("amount")).toBe(validAmount);
});

test("should not set invalid amount on input change", () => {
  const invalidAmount = "12.123456";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input[name='amount']").simulate("change", {
    target: { value: invalidAmount },
  });
  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit with the correct data", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount * 100,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on focus change", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper.state("calendarFocused")).toBe(false);
  wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused: true });
  expect(wrapper.state("calendarFocused")).toBe(true);
});
