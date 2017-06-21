import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isBlur: false,
      isModal: false,
      isFullScreen: false
  },
  getters: {
	doneTodos: (state, getters) => {
		return state.isBlur
	}
  },
  mutations: {
    changeFullScreen (state, flag) {
      if(typeof flag == "boolean")
      	state.isFullScreen = flag
    },
    changeModal (state, flag) {
      if(typeof flag == "boolean")
      	state.isModal = flag
    }
  }
})
