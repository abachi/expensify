import React from "react";
import { shallow } from "enzyme";
import { Login } from "../../components/Login";
import {
  githubAuthProvider,
  googleAuthProvider,
} from "../../firebase/firebase";

test("should render Login correctly", () => {
  const wrapper = shallow(<Login />);
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogin", () => {
  const startLoginWithGoogle = jest.fn();
  const startLoginWithGithub = jest.fn();
  const startLogin = jest.fn();
  const wrapper = shallow(<Login startLogin={startLogin} />);
  // login with Google
  wrapper.find("button[name='google-login']").simulate("click");
  expect(startLogin).toHaveBeenLastCalledWith(googleAuthProvider);
  // login with Github
  wrapper.find("button[name='github-login']").simulate("click");
  expect(startLogin).toHaveBeenLastCalledWith(githubAuthProvider);
});
