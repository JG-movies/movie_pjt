import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'
import { faThumbsDown as farThumbsDown } from '@fortawesome/free-regular-svg-icons'
import { faThumbsDown as fasThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons'
import {faHouse, faMagnifyingGlass, faVideo, faCircleUser} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, fasHeart, farHeart, faHouse, faMagnifyingGlass, faVideo, faCircleUser, faTrophy,
  farStar, fasStar, farThumbsUp, farThumbsDown, fasThumbsUp, fasThumbsDown)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.filter('truncate',function(text,stop,clamp){
  return text.slice(0,stop)+(stop<text.length ? clamp||'...':'')
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

window.Kakao.init('*********************') // Kakao Developers에서 요약 정보 -> JavaScript 키
