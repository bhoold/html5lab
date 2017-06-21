// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import '../src/css/base.scss'
import '../src/font/iconfont.css'

import Vue from 'vue'
import store from './store/'

import layout from './components/layout'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(layout)
})
