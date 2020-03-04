import Posts from './components/Posts.vue'
import Queue from './components/Queue.vue'
import QueueItem from './components/QueueItem.vue'
import Sources from './components/Sources.vue'
import Settings from './components/SystemSettings.vue'

export const routes = [
    {path: '/posts', component: Posts},
    {path: '/queue', component: Queue},
    {path: '/queue/:queueId', component: QueueItem},
    {path: '/input-sources', component: Sources},
    {path: '/settings', component: Settings}
];