import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SEARCH = 1,
      DISCOVER = 2,
      MV = 3,
      LOCAL = 4,
      DOWNLOAD = 5,
      FAVORITE = 6;


export default new Vuex.Store({
  state: { //定义状态
      isBlur: false,
      isModal: false,
      isFullScreen: false,
      currentPage: 'discover'
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
    },
    changeCurrentPage (state, id) {
      switch(id){
        case SEARCH:
        state.currentPage = 'search'
        break;
        case DISCOVER:
        state.currentPage = 'discover'
        break;
        case MV:
        state.currentPage = 'mv'
        break;
        case LOCAL:
        state.currentPage = 'local'
        break;
        case DOWNLOAD:
        state.currentPage = 'download'
        break;
        case FAVORITE:
        state.currentPage = 'favorite'
        break;
      }
    }
  },
  actions: { //操作mutations(用于异步操作)
    changeModal ({commit}) {
      commit('changeModal')
    }
}
})
