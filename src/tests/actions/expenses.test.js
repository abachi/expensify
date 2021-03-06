import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";
import {
  addExpense,
  startAddExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from "../../actions/expenses";

const createMockStore = configureMockStore([thunk]);

const uid = "abc-123-def-456-ghi-789";
const defaultAuthState = {
  auth: { uid },
};

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expensesData[id] = {
      description,
      amount,
      note,
      createdAt,
    };
  });

  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "abc123" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "abc123",
  });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore({
    expenses,
    auth: defaultAuthState.auth,
  });

  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    database
      .ref(`users/${uid}/expenses/${id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(null);
        done();
      });
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("abc123", {
    note: "Note example",
    amount: "1000",
  });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "abc123",
    updates: {
      note: "Note example",
      amount: "1000",
    },
  });
});

test("should edit expense in firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const updates = {
    description: "Updated description",
    note: "Updated note",
  };
  const id = expenses[2].id;

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({
        amount: expenses[2].amount,
        createdAt: expenses[2].createdAt,
        ...updates,
      });
      done();
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
  const store = createMockStore(defaultAuthState);
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
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultData);
      done();
    });
});

test("should add expense to database and store with provided values", (done) => {
  const store = createMockStore(defaultAuthState);
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
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should setup add expense action object with default values", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

test("should fetch expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});
