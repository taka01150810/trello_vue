<template>
  <!-- 
    サブミットイベント時にaddListメソッドを呼び出す。
    @はv-onの省略記法。
    .preventはVサブミット時にリロードされるのを防ぐ。
-->
  <form class="addlist" @submit.prevent="addList">
    <!-- v-modelにtitleを定義することで、dataプロパティとバインド -->
    <input
      v-model="title"
      type="text"
      class="text-input"
      placeholder="リストを追加"
    />
    <button type="submit" class="add-button">追加</button>
  </form>
</template>
<script>
export default {
  data: function () {
    return {
      title: "",
    };
  },
  methods: {
    addList: function () {
      // this.$store.dispatch('アクション名')でactionsを実行
      // 第二引数にオブジェクト型でdataプロパティのtitleを渡す
      this.$store.dispatch("addlist", { title: this.title });
      this.title = "";
    },
  },
};
</script>
