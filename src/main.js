// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import Vconsole from 'vconsole';  //手机端显示console
// const vConsole = new Vconsole()
// Vue.use(vConsole)

import { Button,Form,Field,NavBar,Cell, CellGroup,Picker,Popup,Step, Steps,Swipe, SwipeItem  } from 'vant'
Vue.use(Button)
   .use(Form)
   .use(Field)
   .use(NavBar)
   .use(Cell)
   .use(CellGroup)
   .use(Picker)
   .use(Popup)
   .use(Step)
   .use(Steps)
   .use(Swipe)
   .use(SwipeItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})





