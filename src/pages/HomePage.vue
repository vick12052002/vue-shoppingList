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
  beforeCreate () {
    console.log('HomePage beforeCreate.');
  },
  created () {
    console.log('HomePage created.');
  },
  beforeMount () {
    console.log('HomePage beforeMount.');
  },
  mounted () {
    console.log('HomePage mounted.');
  },
  beforeUpdate () {
    console.log('HomePage beforeUpdate.');
  },
  updated () {
    console.log('HomePage updated.');
  },
  beforeDestroy () {
    console.log('HomePage beforeDestroy.');
  },
  destroyed () {
    console.log('HomePage destroyed.');
  },
  beforeRouteEnter (to, from, next) {
    console.log('HomePage beforeRouterEnter.');
    next();
  },
  beforeRouteUpdate (to, from, next) {
    console.log('HomePage beforeRouterUpdate.');
    next();
  },
  beforeRouteLeave (to, from, next) {
    console.log('HomePage beforeRouterLeave.');
    next();
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
