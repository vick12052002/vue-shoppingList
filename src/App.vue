<template>
  <div id="app">
    <h1 class="header-title">購物清單</h1>
    <main class="container">
      <AddItem :input="input" @click="addItem" />
      <ItemLists :itemList="itemList" @delete="deleteItem($event)" />
      <div class="item-list-container">
        <div class="total-container">
          <span class="total">總計：{{ total }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import '../public/normalize.css';
import '../public/index.css';
import AddItem from './components/AddItem.vue';
import ItemLists from './components/ItemLists.vue';

export default {
  name: 'App',
  components: {
    AddItem,
    ItemLists,
  },
  methods: {
    addItem() {
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
      };
      this.countTotal();
    },
    deleteItem(id) {
      const newList = this.itemList.filter((item) => item.id !== id);
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
  },
  data() {
    return {
      itemList: [
      ],
      input: {
        name: '',
        price: 0,
        amount: 0,
      },
      total: 0,
      lastId: 0,
      hasError: false,
    };
  },
};
</script>
