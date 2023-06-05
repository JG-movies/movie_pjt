<template>
  <div class="MovieImg">
    <router-link :to="`/movie/${movie.pk}`">
      <img class="border rounded" :src="'https://image.tmdb.org/t/p/w220_and_h330_face'+movie.poster_path" alt="movie-poster">
      <p class="h5">{{movie.title}}</p>
    </router-link>   
  </div>

</template>

<script>
export default {
  name:'CastMovie',
  props:{
    movie: Object
  }
}
</script>

<style scoped>
.MovieImg {
  padding: 0;
  margin: 0;
  width: 250px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  border-radius: 100%;

}
</style>