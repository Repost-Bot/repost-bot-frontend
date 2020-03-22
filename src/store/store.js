import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
       apiConstants: {
           createPost: 'posts',
           getPosts: 'posts',
           createSource: 'sources',
           getSources: 'sources',
           queue: 'queue',
           settings: 'settings',
           home: '',
           queuePost: 'queue/post'
       }
   }
});