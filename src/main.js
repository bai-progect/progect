// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//import VConsole from 'vconsole/dist/vconsole.min.js' //引入Vconsole
//let vConsole = new VConsole()
import Vant from 'vant';
import 'vant/lib/index.css';

import CnRegionPicker from 'cn-region-picker'   //城市控件
Vue.use(CnRegionPicker)


Vue.use(Vant)

import '@/utils/validate.js'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
