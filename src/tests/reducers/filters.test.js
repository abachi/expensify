import moment from "moment";
import filtersReducer from "../../reducers/filters";

const prevState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month"),
};

test("should setup default values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(prevState);
});

test("should setup default values", () => {
  const action = { type: "SET_TEXT_FILTER", text: "abc" };
  const state = filtersReducer(prevState, action);
  expect(state.text).toEqual("abc");
});

test("should set sort by amount filter", () => {
  expect(prevState.sortBy).toEqual("date");
  const state = filtersReducer(prevState, { type: "SET_SORT_BY_AMOUNT" });
  expect(state.sortBy).toEqual("amount");
});

test("should set sort by date filter", () => {
  prevState.sortBy = "amount";
  expect(prevState.sortBy).toEqual("amount");
  const state = filtersReducer(prevState, { type: "SET_SORT_BY_DATE" });
  expect(state.sortBy).toEqual("date");
});

test("should set start date with the provided date", () => {
  const action = {
    type: "SET_START_DATE",
    date: 2000,
  };
  const state = filtersReducer(prevState, action);
  expect(state.startDate).toEqual(2000);
});

test("should set start date to undefined", () => {
  const action = {
    type: "SET_START_DATE",
  };
  const state = filtersReducer(prevState, action);
  expect(state.startDate).toBe(undefined);
});

test("should set end date with the provided date", () => {
  const action = {
    type: "SET_END_DATE",
    date: 5000,
  };
  const state = filtersReducer(prevState, action);
  expect(state.endDate).toEqual(5000);
});

test("should set end date to undefined", () => {
  const action = {
    type: "SET_END_DATE",
  };
  const state = filtersReducer(prevState, action);
  expect(state.endDate).toBe(undefined);
});
