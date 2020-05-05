import authReducer from "../../reducers/auth";

test("should return the correct state for login action", () => {
  const action = {
    type: "LOGIN",
    uid: "abcd1234",
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    uid: action.uid,
  });
});

test("should return the correct state for logout action", () => {
  const action = {
    type: "LOGOUT",
  };
  const state = authReducer({ uid: "abcd1234" }, action);
  expect(state).toEqual({});
});
