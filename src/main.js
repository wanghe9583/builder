import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from '../modules/view-design';
import '../modules/view-design/dist/styles/iview.css';
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(VueHighlightJS)
Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')