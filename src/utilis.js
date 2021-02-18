const Token_Name = 'lists';

export const getLocalStorage = function() {
  let data = JSON.parse(localStorage.getItem(Token_Name));
  if (!data) {
    setLocalStorage(initList);
    return initList;
  } else {
    return data;
  }
};

export const initList = {
  lists: [
    {
      id: 1,
      lastItemId: 3,
      itemList: [
        {
          name: '111',
          price: 20,
          amount: 210,
          id: 1,
          isEditing: false,
          hasError: {
            name: false,
            amount: false,
            price: false,
          },
        },
        {
          name: '124',
          price: 90,
          amount: 10,
          id: 2,
          isEditing: false,
          hasError: {
            name: false,
            amount: false,
            price: false,
          },
        },
        {
          name: '33',
          price: 10,
          amount: 40,
          id: 3,
          isEditing: false,
          hasError: {
            name: false,
            amount: false,
            price: false,
          },
        },
      ],
    },
    {
      id: 2,
      lastItemId: 1,
      itemList: [
        {
          name: '2222',
          price: 10,
          amount: 20,
          id: 1,
          isEditing: false,
          hasError: {
            name: false,
            amount: false,
            price: false,
          },
        },
      ],
    },
  ],
  lastListId: 2,
};

export const setLocalStorage = function(data) {
  localStorage.setItem(Token_Name, JSON.stringify(data));
};

export const isPriceValid = function(price) {
  const rule = /^[1-9]\d{0,7}$/;
  return rule.test(price);
};

export const isAmountValid = function(amount) {
  const rule = /^[1-9]\d{0,7}$/;
  return rule.test(amount);
};

export const checkFormValid = function(list) {
  const { name, price, amount, hasError } = list;

  if (name.length === 0) {
    hasError.name = true;
  } else {
    hasError.name = false;
  }

  if (price === 0 || !isPriceValid(price)) {
    hasError.price = true;
  } else {
    hasError.price = false;
  }

  if (amount === 0 || !isAmountValid(amount)) {
    hasError.amount = true;
  } else {
    hasError.amount = false;
  }
  return list;
};
