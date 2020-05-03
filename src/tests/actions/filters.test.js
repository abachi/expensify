import moment from "moment";
import {
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate,
  setTextFilter,
} from "../../actions/filters";

test("should setup set start date action object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    date: moment(0),
  });
});

test("should setup set end date action object", () => {
  const action = setEndDate(moment(100));
  expect(action).toEqual({
    type: "SET_END_DATE",
    date: moment(100),
  });
});

test("should setup set start date action object to undefined", () => {
  const action = setStartDate();
  expect(action).toEqual({
    type: "SET_START_DATE",
    date: undefined,
  });
});

test("should setup set end date action object to undefined", () => {
  const action = setEndDate();
  expect(action).toEqual({
    type: "SET_END_DATE",
    date: undefined,
  });
});

test("should setup sort by amount action object", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SET_SORT_BY_AMOUNT",
  });
});

test("should setup sort by date action object", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SET_SORT_BY_DATE",
  });
});

test("should setup set text action object", () => {
  const action = setTextFilter("foo");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "foo",
  });
});

test("should setup set text action object with an empty value", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});
