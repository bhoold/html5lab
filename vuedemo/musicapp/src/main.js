// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../src/font/iconfont.css'

import Vue from 'vue'
import Layout from './page/Layout'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Layout)
})
