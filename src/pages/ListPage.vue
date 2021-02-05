<template lang="pug">
.board
  h1.header-title 購物清單
  main.container
    router-link.btn.back-btn(to="/") 返回首頁
    //- AddItem(
    //-   :input="input",
    //-   @handleClick="addItem",
    //-   @handleChange="checkInputsValid"
    //- )
    ItemLists(:itemList="list", @delete="deleteItem($event)")
      .total-container
        //- span.total 總計：{{ total }}
</template>

<script>
import AddItem from "../components/AddItem";
import ItemLists from "../components/ItemLists.vue";
// import { isPriceValid, isAmountValid } from "../utilis";
// import { mapGetters } from "vuex";

export default {
  name: "list",
  components: {
    AddItem,
    ItemLists,
  },
  mounted() {
    console.log("listpage mouted params", this.$route.params);
    console.log(this.$store.getters.getList(this.$route.params));
    console.log(this.$store.getters.getListItems(this.$route.params));
  },
  computed: {
    listInfo() {
      return this.$store.getters.getList(this.$route.params);
    },
     list() {
      return this.$store.getters.getListItems(this.$route.params);
    },

    // ...mapGetters({
    //   list: "getListItems",
    // }),
  },
  methods: {},
};
</script>
