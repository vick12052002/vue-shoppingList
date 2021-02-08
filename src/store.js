import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [
      {
        id: 1,
        itemList: [
          {
            name: '111',
            price: 20,
            amount: 210,
            id: 1,
          },
          {
            name: '124',
            price: 90,
            amount: 10,
            id: 2,
          },

          {
            name: '33',
            price: 10,
            amount: 40,
            id: 3,
          },
        ],
        lastItemId: 3,
      },
      {
        id: 2,
        itemList: [
          {
            name: '2222',
            price: 50,
            amount: 220,
            id: 1,
          },
        ],
        lastItemId: 1,
      },
    ],
    input: {
      name: '',
      price: 0,
      amount: 0,
      hasError: {
        name: false,
        amount: false,
        price: false,
      },
    },
    total: 0,
    lastListId: 2,
  },
  getters: {
    getList: (state) => ({ id }) => {
      const target = state.lists.filter((list) => {
        return list.id === Number(id);
      });
      return target;
    },
    getListItems: (state) => ({ id }) => {
      const target = state.lists.filter((list) => {
        return list.id === Number(id);
      });
      return target[0].itemList;
    },
  },
  mutations: {
    addListItem(state, { name, price, amount, listId }) {
      let newList = state.lists.map((list) => {
        if (list.id !== listId) return list;
        list.itemList.push({
          name,
          price,
          amount,
          id: (list.lastItemId += 1),
        });
        list.lastItemId++;
        return list;
      });
      state.lists = newList;
    },
    countTotal() {
      if (this.itemList.length === 0) {
        return (this.total = 0);
      }
      const itemsCount = this.itemList.map((item) => item.price * item.amount);
      this.total = itemsCount.reduce((accum, curr) => accum + curr);
    },
    deleteList(state, id) {
      const newList = state.lists.filter((list) => list.id !== id);
      state.lists = newList;
    },
    deleteListItem(state, { listId, itemId }) {
      let list = state.lists.find((list) => list.id === listId);
      let { itemList } = list;
      const newItemList = itemList.filter((item) => item.id !== itemId);
      const newList = state.lists.map((list) => {
        if (list.id !== listId) return list;
        return {
          ...list,
          itemList: newItemList,
        };
      });
      state.lists = newList;
    },
  },
});
