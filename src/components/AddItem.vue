<template>
  <div class="add-item-form">
    <h3 class="title">新增單筆</h3>
    <div class="inputs">
      <label class="input-container" for="name"
        >名稱
        <input
          type="text"
          name="name"
          v-model.trim="input.name"
          maxlength="20"
          @change="$emit('handleChange')"
        />
        <span class="error-message" v-if="input.hasError.name">名稱不得為空</span>
      </label>
      <label class="input-container" for="price"
        >價格
        <input
          type="number"
          name="price"
          maxlength="8"
          min="1"
          v-model.number="input.price"
          @change="$emit('handleChange')"
        />
        <span class="error-message" v-if="input.hasError.price">請輸入數量<br />或正確的格式</span>
      </label>
      <label class="input-container" for="amount"
        >數量
        <input
          type="number"
          name="amount"
          min="1"
          v-model.number="input.amount"
          maxlength="8"
          @change="$emit('handleChange')"
        />
        <span class="error-message" v-if="input.hasError.amount">請輸入數量<br />或正確的格式</span>
      </label>
      <button class="submit-btn btn" @click="$emit('handleClick')">新增</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddItem',
  props: {
    input: {
      type: Object,
      required: true,
    },
  },
};
</script>
