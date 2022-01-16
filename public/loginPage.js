"use strict";

let userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  let responseHandler = (response) => {
    if (response.success == true) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
    }
  };

  ApiConnector.login(
    { login: data.login, password: data.password },
    responseHandler
  );
};

userForm.registerFormCallback = (data) => {
  let registrationHandler = (response) => {
    if (response.success == true) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }
  };

  ApiConnector.register(
    { login: data.login, password: data.password },
    registrationHandler
  );
};
