<template lang="pug">
#app
  .wrapper
  router-view 
</template>

<script>
import "../public/normalize.css";
import "../public/index.css";
import { setLocalStorage } from "./utilis";

export default {
  name: "App",
  components: {},
  updated() {
    console.log("App updated.");
    setLocalStorage(this.$store.state);
  },
};
</script>
