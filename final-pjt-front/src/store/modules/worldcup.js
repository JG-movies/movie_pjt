import router from '@/router'
import axios from 'axios'
import store from '@/store'

const API_URL = 'http://127.0.0.1:8000'
function getMode(array){
  const counts = array.reduce((pv,cv)=>{
    pv[cv] = (pv[cv] || 0)+1
    return pv
  },{})
  const keys = Object.keys(counts)
  let mode = keys[0]
  keys.forEach((val)=>{
    if(counts[val]>counts[mode]){
      mode = val
    }
  })
  return mode
}
const worldcupModule = {
  state:{
    current_round: [],
    next_round: [],
    roundNum: 16,
    left: null,
    right: null,
    startFlag: false,
    finishFlag: false,
    quaterGenres:[],
    quaterMovies:[]
  },
  getters:{
    current_round(state){
      return state.current_round
    },
    next_round(state){
      return state.next_round
    },
    roundNum(state){
      return state.roundNum
    },
    startFlag(state){
      return state.startFlag
    },
    finishFlag(state){
      return state.finishFlag
    },    
    left(state){
      return state.left
    },
    right(state){
      return state.right
    },
    quaterGenres(state){
      return state.quaterGenres
    },
    quaterMovies(state){
      return state.quaterMovies
    }
  },
  mutations:{
    RANDOM_MOVIE_CALL(state,movies){
      state.left = null
      state.right = null
      state.current_round = movies
      state.next_round = []
      state.startFlag = false
      state.finishFlag = false
      state.roundNum = 16
      state.quaterGenres = []
      state.quaterMovies = []
    },
    LEFT_CHOOSE(state){
      state.next_round.push(state.left)
      state.left = null
      state.right = null
      
    },
    RIGHT_CHOOSE(state){
      state.next_round.push(state.right)
      state.left = null
      state.right = null
    },
    START_WORLDCUP(state){
      state.startFlag = !state.startFlag
    },
    NEXT_STEP(state){
      state.left = state.current_round.pop()
      state.right = state.current_round.pop()
      console.log(state.left)
      console.log(state.right)
    },
    IS_ROUND_FINISHED(state){
      state.current_round = store.getters.next_round
      state.next_round = []
      state.roundNum = store.getters.current_round.length
      console.log(state.current_round)
      if (state.roundNum === 4){
        this.getters.current_round.forEach(element => {
          state.quaterGenres.push(...element.genres)
          state.quaterMovies.push(element)
        });
      }
    },
    IS_WORLDCUP_FINISHED(state, data){
        store.state.winner = state.left
        state.finishFlag = true
        store.state.topGenre = getMode(data.genres)
        router.push({name:'about'})
    },
  },
  actions:{
    randomMovieCall(context){
      const token = store.state.token
      axios({
        method:'get',
        url: `${API_URL}/api/v1/worldcup/`,
        headers: {
          Authorization: 'Token ' + token
        }
      })
      .then(res => {
          context.commit('RANDOM_MOVIE_CALL',res.data)
        })
    },
    leftChoose(context){
      context.commit('LEFT_CHOOSE')
    },
    rightChoose(context){
      context.commit('RIGHT_CHOOSE')
    },
    startWorldcup(context){
      context.commit('START_WORLDCUP')
    },
    nextStep(context){
      context.commit('NEXT_STEP')
    },
    isRoundFinished(context){
      context.commit('IS_ROUND_FINISHED')
    },
    isWorldCupFinished(context){
      const token = store.state.token
      const winner_id = store.getters.left.pk
      const genres = store.getters.quaterGenres
      console.log(winner_id, genres)
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movie/${winner_id}`,
        headers: {
          Authorization:'Token '+token
        }
      })
        .then(res=>{
          const data = {
            genres:genres,
            movie:res.data
          }
          context.commit('IS_WORLDCUP_FINISHED',data)
        })
    },    
  }
}

export default worldcupModule