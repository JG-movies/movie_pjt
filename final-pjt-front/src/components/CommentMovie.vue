<template>
  <div class="MovieImg">
    <router-link class="Router" :to="{name:'MovieDetailView', params:{id: movie.pk} }">
      <img class="border rounded" :src="'https://image.tmdb.org/t/p/w220_and_h330_face'+movie?.poster_path" alt="movie-poster">
      <p class="h5">{{movie?.title}}</p>
    </router-link>   
  </div>

</template>

<script>
// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000'
export default {
  name:'CommentMovie',
  props:{
    movie: Object
  },
  // data(){
  //   return {
  //     movie:null
  //   }
  // },
  created(){
    // const movieId = this.movie.pk
    // const token = this.$store.state.token
    // axios({
    //   method:'get',
    //   url:`${API_URL}/api/v1/movie/${movieId}/`,
    //   headers:{
    //   Authorization:'Token '+token
    //     }
    //   })
    //   .then(res=>{
    //     this.movie = res.data
    //   })
  }
}
</script>

<style scoped>
.Router {
  width: 250px;
}
.MovieImg {
  width: 250px;
  max-width: 250px;
  padding: 0;
  margin: 0;
  text-align: center;
  border-radius: 100%;
}
</style>