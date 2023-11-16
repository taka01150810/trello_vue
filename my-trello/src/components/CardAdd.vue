<template>
  <form :class="classList" @submit.prevent="addCardToList">
    <input
      v-model="body"
      type="text"
      class="text-input"
      placeholder="カードを追加する"
      @focusin="startEditing"
      @focusout="finishEditing"
    />
    <button type="submit" class="add-button">追加</button>
  </form>
</template>
<script>
export default {
  props: {
    listIndex: {
      type: Number,
      required: true,
      isEditing: false,
    },
  },
  data: function () {
    return {
      body: "",
      isEditing: false,
    };
  },
  computed: {
    classList() {
      const classList = ["addcard"];
      if (this.isEditing) {
        classList.push("active");
      }
      return classList;
    },
  },
  methods: {
    startEditing: function () {
      this.isEditing = true;
    },
    finishEditing: function () {
      this.isEditing = false;
    },
    addCardToList: function () {
      // dispatchでactionsに定義したaddCardToListメソッドを実行
      this.$store.dispatch("addCardToList", {
        body: this.body,
        listIndex: this.listIndex,
      });
      this.body = "";
    },
  },
};
</script>
