<template>
  <!-- 
    サブミットイベント時にaddListメソッドを呼び出す。
    @はv-onの省略記法。
    .preventはVサブミット時にリロードされるのを防ぐ。
-->
  <form :class="classList" @submit.prevent="addList">
    <!-- v-modelにtitleを定義することで、dataプロパティとバインド -->
    <input
      v-model="title"
      type="text"
      class="text-input"
      placeholder="リストを追加"
      @focusin="startEditing"
      @focusout="finishEditing"
    />
    <button type="submit" class="add-button" v-if="isEditing || titleExists">
      追加
    </button>
  </form>
</template>
<script>
export default {
  data: function () {
    return {
      title: "",
      isEditing: false,
    };
  },
  // computedはdataの状態を監視できる
  computed: {
    classList() {
      const classList = ["addlist"];
      if (this.isEditing) {
        // activeはグレー
        classList.push("active");
      }
      if (this.titleExists) {
        // addableは緑
        classList.push("addable");
      }
      return classList;
    },
    titleExists() {
      return this.title.length > 0;
    },
  },
  methods: {
    addList: function () {
      // this.$store.dispatch('アクション名')でactionsを実行
      // 第二引数にオブジェクト型でdataプロパティのtitleを渡す
      this.$store.dispatch("addlist", { title: this.title });
      this.title = "";
    },
    startEditing: function () {
      this.isEditing = true;
    },
    finishEditing: function () {
      this.isEditing = false;
    },
  },
};
</script>
