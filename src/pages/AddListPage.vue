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
    ItemLists(
      :itemList="list",
      @delete="deleteItem($event)",
      @handleClick="handleEditItem($event)",
      @handleChange="checkEditedInputsValid($event)"
    )
    Total(:total="total", v-if="list.length !== 0")
</template>

<script>
import AddItem from "../components/AddItem";
import ItemLists from "../components/ItemLists.vue";
import Total from "../components/Total.vue";
import { checkFormValid } from "../utilis";
import { mapMutations } from "vuex";

export default {
  name: "AddList",
  components: {
    AddItem,
    ItemLists,
    Total,
  },
  beforeDestroy() {
    console.log("App beforeDestroy.");
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
    total() {
      if (this.itemList.length === 0) return 0;
      const itemsCount = this.itemList.map((item) => item.price * item.amount);
      const total = itemsCount.reduce((accu, curr) => accu + curr);
      return total;
    },
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
        isEditing: false,
        hasError: {
          name: false,
          amount: false,
          price: false,
        },
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
    // 刪除單筆項目
    deleteItem({ itemId }) {
      const newList = this.itemList.filter((item) => {
        if (item.id !== itemId) return item;
      });
      this.itemList = newList;
    },
    checkInputsValid() {
      let isInvalid = false;
      this.input = checkFormValid(this.input);
      isInvalid = Object.values(this.input.hasError).includes(true);
      return isInvalid ? true : false;

    },
    checkEditedInputsValid({ itemId }) {
      const newItems = this.itemList.map((item) => {
        if (item.id !== itemId) return item;
        item = checkFormValid(item);
        return {
          ...item,
        };
      });
      this.itemList = newItems;
    },
    handleEditItem({ itemId }) {
      let item = this.itemList.find((item) => item.id === itemId);
      item = checkFormValid(item);
      const hasError = Object.values(item.hasError).includes(true);
      if (hasError) return;

      item.isEditing = !item.isEditing;
    },
  },
  data() {
    return {
      lastItemId: 0,
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
    };
  },
};
</script>
