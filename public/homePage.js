let logoutButton = new LogoutButton();
logoutButton.action = () => {
  let logoutHandler = (response) => {
    if (response.success == true) {
      location.reload();
    }
  };

  ApiConnector.logout(logoutHandler);
};
