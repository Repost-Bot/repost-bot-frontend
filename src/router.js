import Posts from './components/Posts.vue'
import Queue from './components/Queue.vue'
import Sources from './components/Sources.vue'

export const routes = [
    {path: '/posts', component: Posts},
    {path: '/queue', component: Queue},
    {path: '/input-sources', component: Sources}
];