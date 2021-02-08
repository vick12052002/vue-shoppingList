<template lang="pug">
.add-item-form
  h3.title 新增單筆
  .inputs
    label.input-container(for="name") 名稱
      input(
        type="text",
        name="name",
        v-model.trim="input.name",
        maxlength="20",
        @change="$emit('handleChange')"
      )
      span.error-message(v-if="input.hasError.name") 名稱不得為空
    label.input-container(for="price") 價格
      input(
        type="number",
        name="price",
        maxlength="8",
        min="1",
        v-model.number="input.price",
        @change="$emit('handleChange')"
      )
      span.error-message(v-if="input.hasError.price") 請輸入數量或正確的格式
    label.input-container(for="amount") 數量
      input(
        type="number",
        name="amount",
        min="1",
        v-model.number="input.amount",
        maxlength="8",
        @change="$emit('handleChange')"
      )
      span.error-message(v-if="input.hasError.amount") 請輸入數量或正確的格式
    button.submit-btn.btn(@click="$emit('handleClick')") 新增
</template>

<script>
export default {
  name: "AddItem",
  props: {
    input: {
      type: Object,
      required: true,
    },
    lastId: {
      type: Number,
    },
  },
};
</script>
