<template lang="pug">
.board
  h1.header-title 所有訂單
  main.container
    .find-container
      .btn.find-btn(@click="findList") {{ isFinding ? '取消' : '查詢訂單' }}
      input.input-find(type="text", v-if="isFinding", v-model="orderId")
    router-link.btn.add-btn(to="/addList") 新增訂單
    .item-list-container
      .list-item.item-name.empty(v-if="lists.length === 0") 訂單為空
      .item-container(:key="list.id", v-for="list in lists")
        router-link.list-item.item-name(
          :to="{ name: 'list', params: { id: `${list.id}` } }"
        ) {{ list.id }}
        button.delete-btn.btn(@click="deleteList(list.id)") 刪除
  Pagination(
    :currentPage="this.page",
    :limit="this.limit",
    :total="total"
    @handlePrevPage="handlePrevPage",
    @handleNextPage="handleNextPage"
  )
</template>

<script>
import Pagination from "../components/ Pagination.vue";
import { setLocalStorage } from '../utilis'
export default {
  name: "Home",
  components: { Pagination },
  beforeCreate() {
    console.log("HomePage beforeCreate.");
  },
  created() {
    console.log("HomePage created.");
    console.log("query", this.$route.query);
  },
  beforeMount() {
    console.log("HomePage beforeMount.");
  },
  mounted() {
    console.log("HomePage mounted.");
  },
  beforeUpdate() {
    console.log("HomePage beforeUpdate.");
  },
  updated() {
    console.log("HomePage updated.");
    setLocalStorage(this.$store.state)
  },
  beforeDestroy() {
    console.log("HomePage beforeDestroy.");
  },
  destroyed() {
    console.log("HomePage destroyed.");
  },
  beforeRouteEnter(to, from, next) {
    console.log("HomePage beforeRouterEnter.");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("HomePage beforeRouterUpdate.");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("HomePage beforeRouterLeave.");
    next();
  },
  computed: {
    lists() {
      console.log(this.orderId.length === 0);
      if (this.orderId.length === 0)
        return this.$store.getters.getLists({
          page: this.page,
          limit: this.limit,
        });
      return this.$store.getters.getList({ id: this.orderId });
    },
    total() {
      return this.$store.getters.getTotalPages({
        limit: this.limit,
      });
    },
  },
  methods: {
    deleteList(id) {
      this.$store.commit("deleteList", id);
    },
    findList() {
      // 結束查詢，清除 orderId
      if (this.isFinding) {
        this.orderId = "";
      }
      this.isFinding = !this.isFinding;
    },
    handlePrevPage() {
      if (this.page === 1) return;
      this.page -= 1;
    },
    handleNextPage() {
      this.page += 1;
    },
  },
  data() {
    return {
      isFinding: false,
      orderId: "",
      page: 1,
      limit: 5,
    };
  },
};
</script>
