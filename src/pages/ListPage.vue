<template lang="pug">
.board
  h1.header-title 訂單內容
  main.container
    router-link.btn.back-btn(to="/") 返回首頁
    AddItem(
      :input="input",
      :listId="listId",
      @handleClick="handleAddItem($event)",
      @handleChange="checkInputsValid"
    )
    ItemLists(
      :itemList="list",
      :listId="listId",
      @delete="deleteListItem($event)"
    )
    Total(:total="total" v-if="list.length !== 0")
</template>

<script>
import AddItem from "../components/AddItem.vue";
import ItemLists from "../components/ItemLists.vue";
import Total from "../components/Total.vue"
import { isPriceValid, isAmountValid } from "../utilis";
import { mapMutations } from "vuex";

export default {
  name: "list",
  components: {
    AddItem,
    ItemLists,
    Total
  },
  computed: {
    listId() {
      return this.$route.params.id ? Number(this.$route.params.id) : "";
    },
    listInfo() {
      return this.$store.getters.getList(this.$route.params);
    },
    list() {
      return this.$store.getters.getListItems(this.$route.params);
    },
    total() {
      return this.$store.getters.getItemsTotal(this.$route.params);
    },
  },
  methods: {
    ...mapMutations(["deleteListItem", "addListItem"]),
    checkInputsValid() {
      let isInvalid = false;
      if (this.input.name.length === 0) {
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
    handleAddItem() {
      this.checkInputsValid();
      const isValid = this.checkInputsValid();
      console.log("isValid", isValid);
      if (isValid) return;

      this.$store.commit("addListItem", {
        name: this.input.name,
        price: this.input.price,
        amount: this.input.amount,
        listId: this.listId,
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
  },
  data() {
    return {
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
