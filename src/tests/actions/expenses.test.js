import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup remove expense action object", () => {
  const result = removeExpense({ id: "abc123" });
  expect(result).toEqual({
    type: "REMOVE_EXPENSE",
    id: "abc123",
  });
});

test("should setup edit expense action object", () => {
  const result = editExpense("abc123", {
    note: "Note example",
    amount: "1000",
  });
  expect(result).toEqual({
    type: "EDIT_EXPENSE",
    id: "abc123",
    updates: {
      note: "Note example",
      amount: "1000",
    },
  });
});

test("should setup add expense action object with the provided values", () => {
  const data = {
    description: "Rent",
    note: "Some note",
    amount: 1500,
    createdAt: 120,
  };

  const action = addExpense(data);

  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...data,
      id: expect.any(String),
    },
  });
});

test("should setup add expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
    },
  });
});
