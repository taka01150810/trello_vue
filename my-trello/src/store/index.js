import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
  },
  // stateを更新する。(唯一更新できる)
  /*
  mutationsの重要なルールとして、同期的でなければならないので
  基本的にコンポーネントでの操作はactionsで行うことが推奨。
  */
  mutations: {
    // コミット時に受け取る引数payloadはオブジェクト型で受け取ると、複数のプロパティを受け取ることができるため、推奨。
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: [] });
    },
  },
  // Mutationを実行(commit)する
  actions: {
    // 第一引数はストアインスタンスのメソッドやプロパティを呼び出せるオブジェクトを受け取ることができる
    // 第二引数には、mutationsに渡す引数を指定することができる
    addlist(context, payload) {
      context.commit("addlist", payload);
    },
  },
  modules: {},
});
