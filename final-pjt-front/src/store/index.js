import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import createdPersistedState from 'vuex-persistedstate'

import movieModule from './modules/movieModule'
import worldcupModule from './modules/worldcup'

Vue.use(Vuex)
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins:[
    createdPersistedState()
  ],
  state:{
    token: null,
    winner: null,
    topGenre: null,
    currentUser: null,
    profileUser: null
  },
  getters:{
    isLogin(state){
      return state.token ? true : false
    },
    winner(state){
      return state.winner
    },
    topGenre(state){
      return state.topGenre
    },
    currentUser(state){
      return state.currentUser
    },
    profileUser(state){
      return state.profileUser
    },
    userArticles(state){
      return state.profileUser.article_set
    }
  },
  mutations:{
    SAVE_TOKEN(state, token){
      state.token = token
      router.push({name:'WorldCupView'})
    },
    FETCH_USER(state, payload){
      state.currentUser = payload
    },
    FETCH_ANOTHER_PROFILE(state, payload){
      state.profileUser = payload
    },
    FETCH_MY_PROFILE(state){
      state.profileUser = state.currentUser
    }
  },
  actions:{
    signUp(context, payload){
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method:'post',
        url:`${API_URL}/accounts/signup/`,
        data:{
          username, password1, password2
        }
      })
        .then(res=> {
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch(err => {
          alert('다시 확인해주세요!')
          console.error(err)
        })
    },
    login(context, payload){
      const username = payload.username
      const password = payload.password

      axios({
        method:'post',
        url:`${API_URL}/accounts/login/`,
        data:{
          username,password
        }
      })
        .then(res=>{
        context.commit('SAVE_TOKEN',res.data.key)
      })
        .catch(err=>{
          alert('올바른 패스워드를 입력해주세요')
          console.error(err)
        })
    },
    fetchUser(context){
      if(this.getters.isLogin){
        const token = this.state.token
        axios({
          method:'get',
          url: `${API_URL}/api/v1/profile/`,
          headers:{
            Authorization: 'Token ' + token
          }
        })
        .then(res => {
          console.log(res.data)
          context.commit('FETCH_USER',res.data)
        })
      }
    },
    getAnotherProfile(context, payload){
      const token = this.state.token
      const user_id = payload
      axios({
        method:'get',
        url: `${API_URL}/api/v1/profile/${user_id}/`,
        headers:{
          Authorization: 'Token ' + token
        }
      })
      .then(res => {
        console.log(res.data)
        context.commit('FETCH_ANOTHER_PROFILE',res.data)
      })
    },
    followUser(context, payload){
      const token = this.state.token
      const user_id = payload
      axios({
        method:'post',
        url: `${API_URL}/api/v1/follow/${user_id}/`,
        headers:{
          Authorization: 'Token ' + token
        }
      })
      .then(res => {
        console.log(res)
        axios({
          method:'get',
          url: `${API_URL}/api/v1/profile/${user_id}`,
          headers:{
            Authorization: 'Token ' + token
          }          
        })
          .then(res=>{
            console.log(res.data)
            context.commit('FETCH_ANOTHER_PROFILE',res.data)
          })
      })
    }
  },
  modules: {
    movieModule,
    worldcupModule
  }
})
