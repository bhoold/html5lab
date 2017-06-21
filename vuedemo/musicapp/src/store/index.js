import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //定义状态
      isBlur: false,
      isModal: false,
      isFullScreen: false
  },
  getters: { //返回处理过的状态(不改变状态)
	doneTodos: (state, getters) => {
		return state.isBlur
	}
  },
  mutations: { //更改状态(不能有异步操作)
    changeFullScreen (state, flag) {
      if(typeof flag == "boolean")
      	state.isFullScreen = flag
    },
    changeModal (state, flag) {
      if(typeof flag == "boolean")
      	state.isModal = flag
    }
  },
  actions: { //操作mutations(用于异步操作)
    changeModal ({commit}) {
      commit('changeModal')
    }
}
})
