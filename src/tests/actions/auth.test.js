import { login, logout } from "../../actions/auth";

test("should return correct action for login", () => {
  const user = {
    uid: "abcd1234",
  };
  const action = login(user);
  expect(action).toEqual({
    type: "LOGIN",
    uid: "abcd1234",
  });
});

test("should return correct action for logout", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT",
  });
});
