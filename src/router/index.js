import Vue from 'vue'
import VueRouter from 'vue-router'
import Discovery from '../views/Discovery.vue'
import Playlist from '../views/Playlist.vue'
import Playlists from '../views/Playlists.vue'
import Mv from '../views/Mv.vue'
import Mvs from '../views/Mvs.vue'
import Songs from '../views/Songs.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Discovery
  },
  {
    path: '/discovery',
    component: Discovery
  },
  {
    path: '/playlist',
    component: Playlist
  },
  {
    path: '/playlists',
    component: Playlists
  },
  {
    path: '/mv',
    component: Mv
  },
  {
    path: '/mvs',
    component: Mvs
  },
  {
    path: '/songs',
    component: Songs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
