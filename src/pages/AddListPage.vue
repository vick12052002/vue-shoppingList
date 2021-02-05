<template lang="pug">
.board
  h1.header-title 新增購物清單
  main.container
    router-link.btn.back-btn(to="/") 返回首頁
    AddItem(
      :input="input",
      @handleClick="addItem",
      @handleChange="checkInputsValid"
    )
    ItemLists(:itemList="itemList", @delete="deleteItem($event)")
      .total-container
        span.total 總計：{{ total }}
</template>

<script>
import AddItem from "../components/AddItem";
import ItemLists from "../components/ItemLists.vue";
import { isPriceValid, isAmountValid } from "../utilis";

export default {
  name: "App",
  components: {
    AddItem,
    ItemLists,
  },
   beforeMount() {
    console.log("beforeMount!!");
    console.log("beforeMount params", this.$route.params);
    console.log("beforeMount path", this.$route.path);
    console.log("beforeMount query", this.$route.query);
  },
  mounted() {
    console.log("mouted!!");
    console.log("mouted params", this.$route.params);
    console.log("mouted path", this.$route.path);
    console.log("mouted query", this.$route.query);
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
        name: "",
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
        name: "",
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
