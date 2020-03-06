import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { routes } from './router.js'
import Viewer from 'v-viewer'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'viewerjs/dist/viewer.css'

const apiUrl = 'http://localhost:8080';

Vue.use(Viewer);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

const router = new VueRouter({routes});

Vue.prototype.$constants = {
  createPost: apiUrl + '/posts',
  getPosts: apiUrl + '/posts',
  createSource: apiUrl + '/sources',
  getSources: apiUrl + '/sources',
  queue: apiUrl + '/queue',
  approveMessage: apiUrl + '/queue/approve',
  declineMessage: apiUrl + '/queue/decline',
  settings: apiUrl + '/settings',
  home: apiUrl + '/'
};

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
