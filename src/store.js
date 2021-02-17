import Vue from 'vue';
import Vuex from 'vuex';
import { getLocalStorage, checkFormValid } from './utilis';


Vue.use(Vuex);
let localLists = getLocalStorage()
console.log('app getLocalList',localLists)

export default new Vuex.Store({
  state:localLists,
  getters: {
    getList: (state) => ({ id }) => {
      console.log('store 內的 id',id)
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
    getListItem: (state) => ({ listId, itemId }) => {
      const target = state.lists.filter((list) => {
        return list.id === Number(listId);
      });
      const targetList = target[0].itemList;
      const item = targetList.filter((item) => {
        if (item.id === itemId) return item;
      });
      return item[0];
    },
    getItemsTotal: (state) => ({ id }) => {
      const targetList = state.lists.filter((list) => {
        return list.id === Number(id);
      });

      if (targetList[0].itemList.length === 0) return 0;
      const itemsCount = targetList[0].itemList.map((item) => {
        return item.price * item.amount;
      });
      const total = itemsCount.reduce((accu, curr) => accu + curr);
      return total;
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
          hasError: {
            amount: false,
            name: false,
            price: false,
          },
        });
        list.lastItemId++;
        return list;
      });
      state.lists = newList;
    },
    addList(state, newList) {
      state.lists.push({
        ...newList,
        id: (state.lastListId += 1),
      });
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
    handleChangeEdit(state, { listId, itemId }) {
      const newList = state.lists.map((list) => {
        if (list.id !== listId) return list;

        const newItem = list.itemList.map((item) => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            isEditing: !item.isEditing,
          };
        });

        return {
          ...list,
          itemList: newItem,
        };
      });

      state.lists = newList;
    },
    checkEditedInputValid(state, { listId, itemId }) {
      const newList = state.lists.map((list) => {
        if (list.id !== listId) return list;

        const newItem = list.itemList.map((item) => {
          if (item.id !== itemId) return item;
          checkFormValid(item);
          console.log('item的狀態，確認完有無錯誤後的狀態', item);
          return {
            ...item,
          };
        });

        return {
          ...list,
          itemList: newItem,
        };
      });

      state.lists = newList;
    },
  },
});
