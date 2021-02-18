<template lang="pug">
#app
  .wrapper
  router-view 
</template>

<script>
import "../public/normalize.css";
import "../public/index.css";
import { setLocalStorage,getLocalStorage } from "./utilis";

export default {
  name: "App",
  components: {},
  beforeCreate() {
    console.log("App beforeCreate.");
  },
  created() {
    console.log("App created.");
  },
  beforeMount() {
    console.log("App beforeMount.");
  },
  mounted() {
    console.log("App mounted.");
  },
  beforeUpdate() {
    console.log("App beforeUpdate.");
  },
  updated() {
    console.log("App updated.");
    setLocalStorage(this.$store.state);
    console.log(getLocalStorage())
  },
  beforeDestroy() {
    console.log("App beforeDestroy.");
    // setLocalStorage(this.$store.state);
  },
  destroyed() {
    console.log("App destroyed.");
  },
  beforeRouteEnter(to, from, next) {
    console.log("App beforeRouterEnter.");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("App beforeRouterUpdate.");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("App beforeRouterLeave.");
    next();
  },
};
</script>
