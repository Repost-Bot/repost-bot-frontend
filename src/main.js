require('dotenv').config({path : '/out/repost-bot-frontend/.env'});

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/index.css';

Vue.use(VueToast);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import { routes } from './router/router.js'
import { store } from './store/store'

const apiUrl = process.env.API_HOST || 'http://localhost:8080';
Vue.http.options.root = apiUrl;

Vue.config.productionTip = false;

const router = new VueRouter({routes});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
