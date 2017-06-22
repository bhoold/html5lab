import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../src/font/iconfont.css'

import Layout from './page/Layout.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Layout)
})
