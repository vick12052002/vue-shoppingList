<template  lang="pug">
.total-container
  span.total 總計：{{ total }}
</template > 

<script>
export default {
  name: "Total",
  props: {
    total: {
      type: Number,
    },
  },
};
</script>
