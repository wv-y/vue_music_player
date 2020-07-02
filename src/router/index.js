import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Discovery from '../views/Discovery.vue'
import Playlist from '../views/Playlist.vue'
import Playlists from '../views/Playlists.vue'
import Mv from '../views/Mv.vue'
import Mvs from '../views/Mvs.vue'
import Songs from '../views/Songs.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)
/*
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
  },
  {
    path: '/result',
    component: Result
  }
]
*/


const routes = [
	{
		path: '/',
		redirect: '/discovery', 
		component: Index,
		children: [
			{
				path: '/discovery',
				component: Discovery
			},
			{
				path: '/playlists',
				component: Playlists
			},
			{
				path: '/songs',
				component: Songs
			},
			{
				path: '/mvs',
				component: Mvs
			},
			{
				path: '/result/:search',
				component: Result,
				name: 'searchResult',
				
			},
			{
				path: '/playlist',
				component: Playlist,
				name: 'playlistDetail',
			
			},
			{
				path: '/mv',
				component: Mv,
				name: 'MvDetail',
				
			}
		]
	}
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    }
    return {
        x: 0,
        y: 0
    }
  }
})


export default router
