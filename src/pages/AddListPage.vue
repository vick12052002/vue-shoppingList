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
import { isPriceValid, isAmountValid, checkFormValid } from "../utilis";
import { mapMutations } from "vuex";

export default {
  name: "AddList",
  components: {
    AddItem,
    ItemLists,
    Total,
  },
  beforeCreate() {
    console.log("Add beforeCreate.");
  },
  created() {
    console.log("Add created.");
  },
  beforeMount() {
    console.log("Add beforeMount.");
  },
  mounted() {
    console.log("Add mounted.");
  },
  beforeUpdate() {
    console.log("Add beforeUpdate.");
  },
  updated() {
    console.log("Add updated.");
  },
  destroyed() {
    console.log("Add destroyed.");
  },
  beforeRouteEnter(to, from, next) {
    console.log("Add beforeRouterEnter.");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Add beforeRouterUpdate.");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("Add beforeRouterLeave.");
    next();
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
    checkEditedInputsValid({ itemId }) {
      const newItems = this.itemList.map((item) => {
        if (item.id !== itemId) return item;
        item = checkFormValid(item);
        console.log("item的狀態，確認完有無錯誤後的狀態", item);
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
