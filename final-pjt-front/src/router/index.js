import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView'
import WorldCupView from '../views/WorldCupView'
import ActorDetailView from '../views/ActorDetailView'
import AboutView from '../views/AboutView'
import SearchView from '../views/SearchView'
import TempView from '../views/TempView'
import MovieDetailView from '../views/MovieDetailView'
import ProfileView from '../views/ProfileView'
import AnotherProfileView from '../views/AnotherProfileView'
import CollectionsView from '../views/CollectionsView'
// import SearchDetailView from '../views/SearchDetailView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: "/login/naver",
    name: "naver",
    component: () => import("@/views/LoginAccess.vue"),
  },
  {
    path: '/worldcup',
    name: 'WorldCupView',
    component: WorldCupView
  },
  {
    path: '/actor/:id',
    name: 'ActorDetailView',
    component: ActorDetailView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/temp',
    name: 'TempView',
    component: TempView
  },
  
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/movie/:id',
    name: 'MovieDetailView',
    component: MovieDetailView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/profile/:id',
    name: 'AnotherProfileView',
    component: AnotherProfileView
  },
  {
    path: '/collections',
    name: 'collections',
    component: CollectionsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
