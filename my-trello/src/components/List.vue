<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
    <card
      v-for="(item, index) in cards"
      :body="item.body"
      :key="item.id"
      :cardIndex="index"
      :listIndex="listIndex"
    />
    <card-add :listIndex="listIndex" />
  </div>
</template>
<script>
import CardAdd from "./CardAdd";
import Card from "./Card";

export default {
  components: {
    CardAdd,
    Card,
  },
  // propsには、親コンポーネントから受け取るデータを定義できる
  // 受け取ったデータはdataプロパティと同じようにアクセスできる
  props: {
    title: {
      type: String, // String型で受け取ること
      required: true, // 必ず受け取ること
    },
    cards: {
      type: Array,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalCardInList() {
      return this.cards.length;
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
