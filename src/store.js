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
        ],
        lastItemId: 2,
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
    getListItems: (state) => ({ id }) =>{
      const target = state.lists.filter((list) => {
        return list.id === Number(id);
      });
      return target[0].itemList;
    },
  },
  mutations: {
    addItem(state, id) {
      if (Object.values(state.input.hasError).includes(true)) return;

      if (state.lastListId !== 0) {
        state.lastListId++;
      }
      if (state.lists.length === 0) {
        state.lastItemId = state.lists[state.lists.length - 1].id;
      }
      state.lastId += 1;
      let { name, price, amount } = state.input;
      if (!id) {
        state.lastListId;
      }
      //   const targetArray = state.lists.filter((target)=>target.id === id )

      state.lists.find.push({
        name,
        price,
        amount,
        id: state.lastId,
      });
      state.input = {
        name: '',
        price: 0,
        amount: 0,
        hasError: {
          name: false,
          amount: false,
          price: false,
        },
      };
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
  },
});
