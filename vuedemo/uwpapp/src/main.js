import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Main from './Main.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Main)
})
