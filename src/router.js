import Posts from './components/Posts.vue'
import Queue from './components/Queue.vue'
import QueueItem from './components/QueueItem.vue'
import Sources from './components/Sources.vue'
import Settings from './components/SystemSettings.vue'
import Home from './components/Home.vue'
import Confirm from "./components/Confirm";
import Users from "./components/Users";

export const routes = [
    {path: '/posts', component: Posts},
    {path: '/queue', component: Queue},
    {path: '/queue/:queueId', component: QueueItem},
    {path: '/input-sources', component: Sources},
    {path: '/settings', component: Settings},
    {path: '/confirm/:token', component: Confirm},
    {path: '/users', component: Users},
    {path: '/', component: Home},
    {path: '*', redirect: '/'}
];