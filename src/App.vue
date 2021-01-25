<template>
  <div id="app">
    <main class="container">
      <h1>購物清單</h1>
      <AddItem />
      <ItemLists :itemList="itemList" />
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
    ItemLists
  },
  methods:{

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
        {
          id: 3,
          name: '花雕雞麵',
          price: 90,
          amount: 100,
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
