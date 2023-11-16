import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// localStorageに保存したリストを取得
const savedLists = localStorage.getItem("trello-lists");

const store = new Vuex.Store({
  state: {
    // localStorageに保存されたリストがあれば取得、なければデフォルトのリスト配列を設置
    lists: savedLists
      ? JSON.parse(savedLists)
      : [
          {
            title: "Backlog",
            cards: [{ body: "English" }, { body: "Mathematics" }],
          },
          {
            title: "Todo",
            cards: [{ body: "Science" }],
          },
          {
            title: "Doing",
            cards: [],
          },
        ],
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
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1);
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body });
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1);
    },
    updateList(state, payload) {
      state.lists = payload.lists;
    },
  },
  // Mutationを実行(commit)する
  actions: {
    // 第一引数はストアインスタンスのメソッドやプロパティを呼び出せるオブジェクトを受け取ることができる
    // 第二引数には、mutationsに渡す引数を指定することができる
    addlist(context, payload) {
      context.commit("addlist", payload);
    },
    removelist(context, payload) {
      context.commit("removelist", payload);
    },
    addCardToList(context, payload) {
      context.commit("addCardToList", payload);
    },
    removeCardFromList(context, payload) {
      context.commit("removeCardFromList", payload);
    },
    updateList(context, payload) {
      context.commit("updateList", payload);
    },
  },
  getters: {
    // 第一引数にstate、第二引数に他のgettersを受け取ることができる
    // 他のgettersで算出したものから、さらに何か算出したいという実装も可能
    totalCardCount(state) {
      let count = 0;
      state.lists.map((content) => (count += content.cards.length));
      return count;
    },
  },
  modules: {},
});

// データの状態を更新後にlocalStorageへデータの状態を保存
// subscribeはストアのインスタンスメソッドで全てのmutationの後に呼ばれます。
// 第一引数にmutationインスタンス、第二引数にmutation後のデータの状態を受け取る。
store.subscribe((mutation, state) => {
  localStorage.setItem("trello-lists", JSON.stringify(state.lists));
});

export default store;
