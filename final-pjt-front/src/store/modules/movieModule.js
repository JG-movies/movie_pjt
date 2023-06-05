import axios from 'axios'
import store from '@/store'
const API_URL = 'http://127.0.0.1:8000'


const movieModule = {
  state:{
    movie: null,
    modalArticle: null,
    modalId: null,
  },
  getters:{
    movie(state){
      return state.movie
    },
    articleList(state){
      return state.movie.article_set
    },
    modalArticle(state){
      return state.modalArticle
    },
    modalId(state){
      return state.modalId
    }
  },
  mutations:{
    GET_MOVIE(state,movie){
      state.movie = movie
    },
    GET_ARTICLE(state,article){
      state.modalArticle = article
    },
    CHANGE_MODAL_ID(state,modalId){
      state.modalId = modalId
      state.movie.article_set.forEach((article)=>{
        if (article.id === modalId){
          state.modalArticle = article
        }
      })
    },
    CREATE_COMMENT(state){
      console.log(state)
    }
  },
  actions:{
    getMovie(context, movieId){
      const movie_id = movieId
      const token = store.state.token
      axios({
        method:'get',
        url:`${API_URL}/api/v1/movie/${movie_id}/`,
        headers:{
          Authorization:'Token '+token
        }
      })
      .then(res=>{
        context.commit('GET_MOVIE',res.data)

      })
    },
    createArticle(context,payload){
      const token = store.state.token
      const movieId = payload.movieId
      const title = payload.title
      const content = payload.content
      const star_rating = payload.starRating
      console.log(payload)
      axios({
        method:'post',
        url: `${API_URL}/api/v1/movie/${movieId}/article/create/`,
        data:{
          title, content, star_rating
        },
        headers:{
          Authorization:'Token ' + token
        }
      })
        .then(res=>{
          const movie_id = res.data.movie.pk
          const token = store.state.token
          axios({
            method:'get',
            url:`${API_URL}/api/v1/movie/${movie_id}/`,
            headers:{
              Authorization:'Token '+token
            }
          })
          .then(res=>{
            context.commit('GET_MOVIE',res.data)
          })
        })
    },
    likeArticle(context,article){
      const token = store.state.token
      const articleId = article.id
      axios({
        method:'post',
        url:`${API_URL}/api/v1/article/${articleId}/like/`,
        headers: {
          Authorization:'Token '+token
        }
      })
      .then(res=>{
        console.log(res)
        const movieId = this.getters.movie.id
        axios({
          method:'get',
          url:`${API_URL}/api/v1/movie/${movieId}/article/${articleId}/`,
          headers: {
            Authorization:'Token '+token
          }
        })
          .then(res => {
            context.commit('GET_ARTICLE', res.data)
          })
      })
    },
    // updateArticle(context,article){
    //   const token = store.state.token
    //   const articleId = article.id
    //   const movieId = this.getters.movie.id
    //   axios({
    //     method:'put',
    //     url:`${API_URL}/api/v1/movie/${movieId}/article/${articleId}/`,
    //     headers: {
    //       Authorization:'Token '+token
    //     }
    //   })
    //   .then(res=>{
    //     console.log(res)
    //     axios({
    //       method:'get',
    //       url:`${API_URL}/api/v1/movie/${movieId}/article/${articleId}/`,
    //       headers: {
    //         Authorization:'Token '+token
    //       }
    //     })
    //       .then(res => {
    //         context.commit('GET_ARTICLE', res.data)
    //       })
    //     })
    // },
    deleteArticle(context,article){
      const token = store.state.token
      const articleId = article.id
      const movieId = this.getters.movie.id
      axios({
        method:'delete',
        url:`${API_URL}/api/v1/movie/${movieId}/article/${articleId}/`,
        headers: {
          Authorization:'Token '+token
        }
      })
      .then(res=>{
        console.log(res)
        axios({
          method:'get',
          url:`${API_URL}/api/v1/movie/${movieId}/`,
          headers:{
            Authorization:'Token '+token
          }
        })
        .then(res=>{
          context.commit('GET_MOVIE',res.data)
        })
      })
    },
    changeModalId(context,modalId){
      context.commit('CHANGE_MODAL_ID',modalId)
    },
    createComment(context, payload){
      const token = store.state.token
      const articleId = payload.articleId
      const content = payload.commentContent
      axios({
        method:'post',
        url: `${API_URL}/api/v1/article/${articleId}/comment/`,
        data:{
          content
        },
        headers: {
          Authorization:'Token ' + token
        }
      })
      .then(res => {
        console.log(res)
        const movieId = this.getters.movie.id
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/movie/${movieId}/article/${articleId}/`,
          headers:{
            Authorization:'Token ' + token
          }
        })
          .then(res=>{
            context.commit('GET_ARTICLE', res.data)
          })
      })
    }
  }
}
export default movieModule