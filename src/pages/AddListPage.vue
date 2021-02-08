<template lang="pug">
.board
  h1.header-title 新增訂單
  main.container
    router-link.btn.back-btn(to="/") 返回首頁
    AddItem(
      :input="input",
      @handleClick="handleAddItem",
      @handleChange="checkInputsValid"
    )
    ItemLists(:itemList="list", @delete="deleteItem($event)")
    Total(:total="total" v-if="list.length!==0")
</template>

<script>
import AddItem from "../components/AddItem";
import ItemLists from "../components/ItemLists.vue";
import Total from "../components/Total.vue";
import { isPriceValid, isAmountValid } from "../utilis";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    AddItem,
    ItemLists,
    Total
  },
  mounted() {
    console.log("mouted!!");
    console.log("mouted params", this.$route.params);
    console.log("mouted path", this.$route.path);
    console.log("mouted query", this.$route.query);
  },
  beforeDestroy() {
    if (this.itemList.length === 0) return;
    this.$store.commit("addList", {
      itemList: this.itemList,
      lastItemId: this.lastItemId,
    });
  },
  computed: {
    list() {
      return this.itemList;
    },
    total(){
       if (this.itemList.length === 0) return 0;
      const itemsCount = this.itemList.map((item) => item.price * item.amount);
      const total = itemsCount.reduce((accu, curr) => accu + curr);
      return total;
    }
  },
  methods: {
    ...mapMutations(["deleteListItem", "addListItem"]),
    handleAddItem() {
      this.checkInputsValid();
      const isValid = this.checkInputsValid();
      if (isValid) return;
      this.itemList.push({
        name: this.input.name,
        price: this.input.price,
        amount: this.input.amount,
        id: (this.lastItemId += 1),
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
    },

    deleteItem({ itemId }) {
      const newList = this.itemList.filter((item) => {
        if (item.id !== itemId) return item;
      });
      this.itemList = newList;
    },
    checkInputsValid() {
      let isInvalid = false;
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
      isInvalid = Object.values(this.input.hasError).includes(true);
      return isInvalid ? true : false;
    },
  },
  data() {
    return {
      lastItemId: 0,
      itemList: [
      ],
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
    };
  },
};
</script>
