import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";
import {
  addExpense,
  startAddExpense,
  editExpense,
  removeExpense,
} from "../../actions/expenses";

const createMockStore = configureMockStore([thunk]);

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
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[0],
  });
});

test("should add expense to database and store with default values", (done) => {
  const store = createMockStore({});
  const defaultData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0,
  };
  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultData,
        },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultData);
      done();
    });
});

test("should add expense to database and store with provided values", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This is better",
    createdAt: 1000,
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

// test("should setup add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// });
