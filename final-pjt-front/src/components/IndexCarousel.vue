<template>
  <div class="carousel">
    <div class="CardTitle">고객님 선호 장르 Top 10</div>
    <carousel
      :loop="true"
      v-bind:autoplay="true"
      :per-page="8"
      :mouse-drag="true"
      :speed="5000"
      :autoplay-timeout="5000"
      style="transition: transform 2s ease 1s"
    >
      <slide v-for="(movie, index) in topFourList" :key="movie.id" :index="index">
        <router-link :to="`/movie/${movie.pk}`">
          <img id="moviePoster" :src="'https://image.tmdb.org/t/p/original/'+movie.fields.poster_path" alt="포스터 이미지" />
        </router-link>
      </slide>
    </carousel>
    <div class="CardTitle2">인기 Top 10</div>
    <carousel
      :loop="true"
      v-bind:autoplay="true"
      :speed="5000"
      :autoplay-timeout="5000"
      :per-page="8"
      :mouse-drag="true"
      style="transition: transform 2s ease 1s"
    >
      <slide v-for="(movie, index) in topmovies" :key="movie.id" :index="index">
        <router-link :to="`/movie/${movie.pk}`">
          <img id="moviePoster" width="100%" :src="'https://image.tmdb.org/t/p/original/'+movie.fields.poster_path" alt="포스터 이미지" />
        </router-link>   
      </slide>
    </carousel>
  </div>
</template>

<script>
import GetData from '@/assets/moviedata_final.json'

const movieList = GetData

import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'IndexCarousel',
  data() {
    return {
      movieList,
    }
  },
  components: {
    Carousel,
    Slide,
  },
  computed: {
    topmovies() {
      return movieList.slice(0, 10)
    },
    topFourList() {
      const topGenreList = [];
      movieList.forEach(movie => {
        const GenreList = movie.fields.genres;
        if (GenreList.includes(parseInt(this.$store.getters.topGenre))) {
          topGenreList.push(movie);
        }
      });
    return topGenreList.slice(0, 10);
    }
  },
};
</script>

<style>
.carousel {
  position: absolute;
  top: 40%;
  left: 8%;
  z-index: 3;
  width: 100%;
}

.CardTitle {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.CardTitle2 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
#moviePoster {
  opacity: 0.8;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 15%;
  margin: 0 10px;
}

</style>

