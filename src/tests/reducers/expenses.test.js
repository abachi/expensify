import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state.length).toEqual(2);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  expect(expenses.length).toBe(3);
  const state = expensesReducer(expenses, action);
  expect(state.length).toEqual(3);
  expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test("should add a new expense", () => {
  const newExpense = {
    id: "4",
    description: "abc",
    note: "",
    amount: 300,
    createdAt: 0,
  };
  const action = {
    type: "ADD_EXPENSE",
    expense: newExpense,
  };
  expect(expenses.length).toBe(3);
  const state = expensesReducer(expenses, action);
  expect(state.length).toEqual(4);
  expect(state).toEqual(expenses.concat(newExpense));
});

test("should edit expense by id", () => {
  const updates = {
    description: "abc",
    amount: 300,
  };
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates,
  };
  expect(expenses.length).toBe(3);
  const state = expensesReducer(expenses, action);
  expect(state.length).toEqual(3);
  expect(state[1].id).toEqual(expenses[1].id);
  expect(state[1].description).toEqual(updates.description);
  expect(state[1].amount).toEqual(updates.amount);
});

test("should not edit expense if id not found", () => {
  const updates = {
    description: "abc",
    amount: 300,
  };
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should set expenses to store", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses,
  };
  const state = expensesReducer([], action);
  expect(state).toEqual(expenses);
});
