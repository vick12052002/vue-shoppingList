<template  lang="pug">
.pagination-container

  .page-btn.prev-btn(@click="$emit('handlePrevPage')" v-if="currentPage !== 1 ") &lt;
  span 第{{ currentPage }}頁
  .page-btn.next-btn(@click="$emit('handleNextPage')" v-if="currentPage !== total ") &gt;
</template > 

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    limit:{
      type:Number,
      required: true
    },
    total:{
      type:Number,
      required: true
    }
  },
};
</script>
