let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

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

// Операции с деньгами

// Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success == true) {
      ProfileWidget.showProfile(response.data);
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

// Конвертация валют
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success == true) {
      ProfileWidget.showProfile(response.data);
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

// Перевод бабла
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success == true) {
      ProfileWidget.showProfile(response.data);
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

// Работа с избранным
// Начальный список избранного
ApiConnector.getFavorites((response) => {
  if (response.success == true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

// Добавление пользователя в список избранного
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success == true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь добавлен");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

// Удаление пользователя
favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success == true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь удалён");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};
