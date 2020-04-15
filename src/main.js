require('dotenv').config({path : '/out/repost-bot-frontend/.env'});

import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { routes } from './router.js'
import VueToast from 'vue-toast-notification';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/index.css';

Vue.use(VueToast);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const apiUrl = process.env.API_HOST || 'http://localhost:8080/';
// Vue.http.options.root = apiUrl;

Vue.config.productionTip = false;

const router = new VueRouter({routes});

Vue.prototype.$constants = {
  createPost: apiUrl + 'posts',
  getPosts: apiUrl + 'posts',
  createSource: apiUrl + 'sources',
  getSources: apiUrl + 'sources',
  queue: apiUrl + 'queue',
  settings: apiUrl + 'settings',
  home: apiUrl + '',
  queuePost: apiUrl + 'queue/post',
  users: apiUrl + 'users',
  confirmUser: apiUrl + 'users/confirm'
};

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
