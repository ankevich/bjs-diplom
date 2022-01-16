// Кнопка выхода
let logoutButton = new LogoutButton();
logoutButton.action = () => {
  let logoutHandler = (response) => {
    if (response.success == true) {
      location.reload();
    }
  };

  ApiConnector.logout(logoutHandler);
};

// Отображение профиля
ApiConnector.current((response) => {
  if (response.success == true) {
    ProfileWidget.showProfile(response.data);
  }
});

// Отображение курсов валют
let ratesBoard = new RatesBoard();
let getStocks = () => {
  ApiConnector.getStocks((response) => {
    if (response.success == true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
};

getStocks();
setInterval(getStocks, 60000);
