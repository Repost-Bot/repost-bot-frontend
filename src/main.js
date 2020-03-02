import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const apiUrl = process.env.API_URL || 'http://localhost:8080';

Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.prototype.$constants = {
  createPost: apiUrl + '/posts/create',
  getPosts: apiUrl + '/vk/posts'
};

new Vue({
  render: h => h(App),
}).$mount('#app');
