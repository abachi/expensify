import React from "react";
import { shallow } from "enzyme";
import { DateRangePicker } from "react-dates";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { defaultFilters, filters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={defaultFilters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters with default data correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with different data correctly", () => {
  wrapper.setProps({ filters });
  expect(wrapper).toMatchSnapshot();
});

test("should handle search text change", () => {
  const value = "abc";
  wrapper
    .find('input[name="search"]')
    .simulate("change", { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should change sortBy to date", () => {
  wrapper
    .find('select[name="sortBy"]')
    .simulate("change", { target: { value: "date" } });
  expect(sortByDate).toHaveBeenCalled();
});

test("should change sortBy to amount", () => {
  wrapper
    .find('select[name="sortBy"]')
    .simulate("change", { target: { value: "amount" } });
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle start and end dates change", () => {
  wrapper.find(DateRangePicker).prop("onDatesChange")(filters);
  expect(setStartDate).toHaveBeenLastCalledWith(filters.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(filters.endDate);
});

test("should set calendar focus", () => {
  wrapper.find(DateRangePicker).prop("onFocusChange")("startDate");
  expect(wrapper.state("calendarFocus")).toBe("startDate");
});
