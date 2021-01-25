<template>
  <div id="app">
    <h1 class="header-title">購物清單</h1>
    <main class="container">
      <AddItem :input="input" @click="addItem" @keyup.enter="addItem" />
      <ItemLists :itemList="itemList" @click="deleteItem" />
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
        this.lastId = this.itemList[this.itemList.length - 1].id+1;
      }
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
      
    },
    deleteItem(id) {
      const newList = this.itemList.filter((item) => item.id !== id);
      this.itemList = newList;
      this.countTotal();
    },
  },
  data() {
    return {
      itemList: [
        {
          id: 1,
          name: '十全大補湯十全大補湯十全大補湯十全大補湯十全大補湯十全大補湯',
          price: 100,
          amount: 10,
        },
        {
          id: 2,
          name: '東山鴨頭',
          price: 200,
          amount: 3,
        },
      ],
      input: {
        name: '',
        price: 0,
        amount: 0,
      },
      total: 0,
      lastId: '',
      hasError: false,
    };
  },
};
</script>
