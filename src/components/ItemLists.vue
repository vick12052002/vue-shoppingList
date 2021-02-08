<template lang="pug">
.item-list-container
  .list-title-container
    .list-title.item-name 名稱
    .list-title.item-price 單價
    .list-title.list-title-amount 數量
    .list-title 
  .list-item.item-name.empty(v-if="itemList.length === 0") 訂單為空
  .item-container(:key="item.id", v-for="item in itemList")
    .list-item.item-name {{ item.name }}
    .list-item.item-price {{ item.price }}
    .list-item.item-amount {{ item.amount }}
    button.delete-btn.btn(@click="$emit('delete',{ listId  ,itemId:item.id})") 刪除
</template>

<script>
export default {
  name: "ItemLists",
  props: {
    itemList: {
      type: Array,
      required: true,
    },
    listId:{
      type: Number,
    }
  },
};
</script>
