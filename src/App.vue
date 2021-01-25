<template>
  <div id="app">
    <h1 class="header-title">購物清單</h1>
    <main class="container">
      <AddItem
        :input="input"
        @handleClick="addItem"
        @handleChange="checkInputsValid"
        @handleKeyup="checkInputsValid"
      />
      <ItemLists :itemList="itemList" @delete="deleteItem($event)" />
      <div class="item-list-container">
        <div class="total-container">
          <span class="total">總計：{{ total }}</span>
        </div>
      </div>
    </main>
  </div>
</template>
ƒ
<script>
import '../public/normalize.css';
import '../public/index.css';
import AddItem from './components/AddItem.vue';
import ItemLists from './components/ItemLists.vue';
import { isPriceValid, isAmountValid } from './utilis';

export default {
  name: 'App',
  components: {
    AddItem,
    ItemLists,
  },
  methods: {
    addItem() {
      this.checkInputsValid();
      if (Object.values(this.input.hasError).includes(true)) return;
      if (this.lastId.length === 0) {
        this.lastId = this.itemList[this.itemList.length - 1].id;
      }
      this.lastId += 1;
      let { name, price, amount } = this.input;
      this.itemList.push({
        name,
        price,
        amount,
        id: this.lastId,
      });
      this.input = {
        name: '',
        price: 0,
        amount: 0,
        hasError: {
          name: false,
          amount: false,
          price: false,
        },
      };
      this.countTotal();
    },
    deleteItem(id) {
      const newList = this.itemList.fＦＦＦilter((item) => item.id !== id);
      this.itemList = newList;
      this.countTotal();
    },
    countTotal() {
      if (this.itemList.length === 0) {
        return (this.total = 0);
      }
      const itemsCount = this.itemList.map((item) => item.price * item.amount);
      this.total = itemsCount.reduce((accum, curr) => accum + curr);
    },
    checkInputsValid() {
      if (this.input.name.length > 20 || this.input.name.length === 0) {
        this.input.hasError.name = true;
      } else {
        this.input.hasError.name = false;
      }

      if (this.input.price === 0 || !isPriceValid(this.input.price)) {
        this.input.hasError.price = true;
      } else {
        this.input.hasError.price = false;
      }

      if (this.input.amount === 0 || !isAmountValid(this.input.amount)) {
        this.input.hasError.amount = true;
      } else {
        this.input.hasError.amount = false;
      }
    },
  },
  data() {
    return {
      itemList: [],
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
      lastId: 0,
    };
  },
};
</script>
