"use strict";

let userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  ApiConnector.login({ login: data.login, password: data.password }, responseHandler);
};

let responseHandler = (response) => {
  if (response.success == true) {
    location.reload()
  } else {
    userForm.setLoginErrorMessage(response.error)
  }
};
