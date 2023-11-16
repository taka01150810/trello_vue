<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
  </div>
</template>
<script>
export default {
  // propsには、親コンポーネントから受け取るデータを定義できる
  // 受け取ったデータはdataプロパティと同じようにアクセスできる
  props: {
    title: {
      type: String, // String型で受け取ること
      required: true, // 必ず受け取ること
    },
    listIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeList: function () {
      if (confirm("本当にこのリストを削除しますか？")) {
        this.$store.dispatch("removelist", { listIndex: this.listIndex });
      }
    },
  },
};
</script>
