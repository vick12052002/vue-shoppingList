<template>
  <div class="add-item-form">
    <h3 class="title">新增單筆</h3>
    <div class="inputs">
      <label class="input-container" for="name">名稱
        <input type="text" name="name" v-model.trim="input.name" />
        <span class="error-message">名稱不得為空</span>
      </label>
      <label class="input-container" for="price">價格
        <input type="number" name="price" v-model="input.price" />
        <span class="error-message">請輸入數量</span>
      </label>
      <label class="input-container" for="amount">數量
        <input type="number" name="amount" v-model="input.amount" />
        <span class="error-message">請輸入數量</span>
      </label>
      <button class="submit-btn btn" @click="addItem()" @keyup.enter="addItem()">新增</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddItem',
  props: {
    input: {
      type:Object,
      required:true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
