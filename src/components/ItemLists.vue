<template>
  <div class="item-list-container">
    <h3 class="title">清單</h3>
    <div class="list-title-container">
      <div class="list-title item-name">名稱</div>
      <div class="list-title item-price">單價</div>
      <div class="list-title list-title-amount">數量</div>
      <div class="list-title" ></div>
    </div>
    <div class="list-item item-name empty" v-if="itemList.length === 0">清單為空</div>
    <div class="item-container" :key="item.id" v-for="item in itemList">
      <div class="list-item item-name">{{ item.name }}</div>
      <div class="list-item item-price">{{ item.price }}</div>
      <div class="list-item item-amount">{{ item.amount }}</div>
      <button class="delete-btn btn" @click="$emit('delete', item.id)">刪除</button>
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
