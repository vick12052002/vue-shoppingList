<template lang="pug">
#app
  .wrapper
    router-link.btn.delete-btn(to="/") 首頁
    router-link.btn.delete-btn(to="/addList") 新增訂單
  router-view 
</template>

<script>
import "../public/normalize.css";
import "../public/index.css";

export default {
  name: "App",
  components: {},
beforeCreate () {
    console.log('App beforeCreate.');
  },
  created () {
    console.log('App created.');
  },
  beforeMount () {
    console.log('App beforeMount.');
  },
  mounted () {
    console.log('App mounted.');
  },
  beforeUpdate () {
    console.log('App beforeUpdate.');
  },
  updated () {
    console.log('App updated.');
  },
  beforeDestroy () {
    console.log('App beforeDestroy.');
  },
  destroyed () {
    console.log('App destroyed.');
  },
  beforeRouteEnter (to, from, next) {
    console.log('App beforeRouterEnter.');
    next();
  },
  beforeRouteUpdate (to, from, next) {
    console.log('App beforeRouterUpdate.');
    next();
  },
  beforeRouteLeave (to, from, next) {
    console.log('App beforeRouterLeave.');
    next();
  }
};
</script>
