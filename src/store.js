import Vue from 'vue';
import Vuex from 'vuex';
import { getLocalStorage, checkFormValid } from './utilis';

Vue.use(Vuex);
let localLists = getLocalStorage();
console.log('app getLocalList', localLists);
const pageInit = 1;
const limitInit = 5;

export default new Vuex.Store({
  state: localLists,
  getters: {
    getLists: (state) => ({ page, limit }) => {
      let target = [];
      let limitNum = Number(limit);
      let pageAmount = Number(page);
      const listsLength = state.lists.length;
      let start;
      let end;
      // 如果參數 page 小餘或不是數字，則預設為初始值 1
      if (pageAmount < 0|| pageAmount === 0 || isNaN(pageAmount)) {
        pageAmount = pageInit;
        start = 0;
      }

      // 如果參數 limit 小餘或不是數字，則預設為初始值 5
      if (limitNum < 0 ||limitNum === 0 || isNaN(limitNum)) {
        limitNum = limitInit;
        end = 5;
      }

      // 如果 limit 大於 lists 陣列長度，就直接等於 lists 的長度
      if (limitNum > listsLength) {
        limitNum = listsLength;
      }

      start = (pageAmount - 1) * limitNum;
      end = limitNum * pageAmount;
      const totalPages = Math.ceil(listsLength / limitNum);
      
      if (totalPages === pageAmount || pageAmount > totalPages) {
        end = listsLength;
        start = (totalPages - 1) * limit
      }
      for (let i = start; i < end; i += 1) {
        target.push(state.lists[i]);
      }
      return target;
    },
    getTotalPages:(state) => ({ limit }) =>{
      let limitNum = Number(limit);
      const listsLength = state.lists.length;
      const totalPages = Math.ceil(listsLength / limitNum);
      return totalPages
    },
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
