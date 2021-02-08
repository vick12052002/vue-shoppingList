<template lang="pug">
.board
  h1.header-title 所有訂單
  main.container
    router-link.btn.add-btn(to="/addList") 新增訂單
    .item-list-container
      .list-item.item-name.empty(v-if="lists.length === 0") 訂單為空
      .item-container(:key="list.id", v-for="list in lists", )
        router-link.list-item.item-name(:to="{ name: 'list', params: { id:`${ list.id }` }}") {{ list.id }}
        button.delete-btn.btn(@click="deleteList(list.id)") 刪除
</template>

<script>

export default {
  name: "Home",
  components: {},
  beforeMount() {
    console.log("beforeMount!!");
    console.log("beforeMount params", this.$route.params);
    console.log("beforeMount path", this.$route.path);
    console.log("beforeMount query", this.$route.query);
    console.log("beforeMount route", this.$store.state.lists);
  },
  mounted() {
    console.log("mouted!!");
    console.log("mouted params", this.$route.params);
    console.log("mouted path", this.$route.path);
    console.log("mouted query", this.$route.query);
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    deleteList(id) {
      this.$store.commit("deleteList", id);
    },
  },
};
</script>
