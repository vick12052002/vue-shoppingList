<template>
  <div class="item-list-container">
    <h3 class="title">清單</h3>
    <div class="list-title-container">
      <div class="list-title item-name">名稱</div>
      <div class="list-title">單價</div>
      <div class="list-title">數量</div>
      <div class="list-title"></div>
    </div>
    <div class="list-item item-name" v-if="itemList.length === 0">清單為空</div>
    <div class="item-container" :key="item.id" v-for="item in itemList">
      <div class="list-item item-name">{{ item.name }}</div>
      <div class="list-item">{{ item.price }}</div>
      <div class="list-item">{{ item.amount }}</div>
      <button class="delete-btn btn" @click="deleteItem(item.id)">刪除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemLists',
  props: {
    itemList: {
      type: Array,
      required: true,
    },
  },
};
</script>

