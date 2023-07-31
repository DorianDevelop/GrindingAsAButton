import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Backpack from '@/views/Backpack.vue'

const routes = [
    {
        path:'/',
        name:'public',
        children : [
            {path:'', name:'home', component: Home},
            {path:'backpack', name:'account', component: Backpack},
        ]
    }
]

const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router