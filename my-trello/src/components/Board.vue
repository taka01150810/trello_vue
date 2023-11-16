<template>
  <div>
    <header>my Trello</header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <div class="list-index">
        <!-- 
          Listコンポーネントに必要なデータを渡している 
          「:」はv-bindの省略
        -->
        <list
          v-for="(item, index) in lists"
          :key="item.id"
          :title="item.title"
          :cards="item.cards"
          :listIndex="index"
        />
        <list-add />
      </div>
    </main>
  </div>
</template>
<script>
import ListAdd from "./ListAdd.vue";
import List from "./List";
import { mapState } from "vuex";

export default {
  components: {
    ListAdd,
    List,
  },
  computed: {
    /*
    1. store/index.jsで定義したstateにthis.$store.stateでアクセスすることもできますが、
    これを複数書いていくことを考えるとコードが助長になる。
    そこで活躍するのがmapStateで、stateで定義されたデータの名前と同じ名前の文字列で
    stateを呼び出すことができる。

    2. computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、「...」を書く必要がある
    */
    ...mapState(["lists"]),
    totalCardCount() {
      // stateのデータから算出したものをコンポーネントで取得したいときにgettersを使う。
      return this.$store.getters.totalCardCount;
    },
  },
};
</script>
