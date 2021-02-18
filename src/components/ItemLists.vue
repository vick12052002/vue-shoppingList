<template lang="pug">
.item-list-container
  .list-title-container
    .list-title.item-name 名稱
    .list-title.item-price 單價
    .list-title.list-title-amount 數量
    .btn-group
  .list-item.item-name.empty(v-if="itemList.length === 0") 訂單為空
  transition-group(name="fade", tag="div")
    .item-container(:key="item.id", v-for="item in itemList")
      .list-item.item-name
        span(v-if="!item.isEditing") {{ item.isEditing ? '' : item.name }}
        input.input.input-name.item-name(
          type="text",
          maxlength="20",
          v-if="item.isEditing && !item.hasError.name",
          v-model="item.name",
          @change="$emit('handleChange', { itemId: item.id, listId })"
        )
        span.edited-error-message(v-if="item.hasError.name") 名稱不得為空
        transition(name="slide", tag="div")
          input.input.input-name.item-name(
            type="text",
            maxlength="20",
            v-if="item.hasError.name",
            v-model="item.name",
            @change="$emit('handleChange', { itemId: item.id, listId })"
          )
      .list-item.item-price
        span(v-if="!item.isEditing") {{ item.isEditing ? '' : item.price }}
        input.input.input-price.item-price(
          type="number",
          maxlength="8",
          min="1",
          v-if="item.isEditing && !item.hasError.price",
          v-model="item.price",
          @change="$emit('handleChange', { itemId: item.id, listId })"
        )
        span.edited-error-message(v-if="item.hasError.price") 請輸入數量或正確的格式
        transition(name="slide", tag="div")
          input.input.input-price.item-price(
            type="number",
            maxlength="8",
            min="1",
            v-if="item.hasError.price",
            v-model="item.price",
            @change="$emit('handleChange', { itemId: item.id, listId })"
          )
      .list-item.item-amount
        span(v-if="!item.isEditing") {{ item.isEditing ? '' : item.amount }}
        input.input.input-amount.item-amount(
          type="number",
          v-if="item.isEditing && !item.hasError.amount",
          maxlength="8",
          min="1",
          v-model="item.amount",
          @change="$emit('handleChange', { itemId: item.id, listId })"
        ) 
        transition(name="slide", tag="div")
          input.input.input-amount.item-amount(
            type="number",
            v-if="item.hasError.amount",
            maxlength="8",
            min="1",
            v-model="item.amount",
            @change="$emit('handleChange', { itemId: item.id, listId })"
          )
        span.edited-error-message(v-if="item.hasError.amount") 請輸入數量或正確的格式
      .btns
        button.delete-btn.btn(
          @click="$emit('delete', { listId, itemId: item.id })"
        ) 刪除
        button.edit-btn.btn(
          @click="$emit('handleClick', { listId, itemId: item.id })"
        ) {{ item.isEditing ? '儲存' : '編輯' }}
</template>

<script>
export default {
  name: "ItemLists",
  props: {
    itemList: {
      type: Array,
      required: true,
    },
    listId: {
      type: Number,
    },
  },
};
</script>
