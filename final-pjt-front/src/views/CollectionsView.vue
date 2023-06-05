<template>
  <div>
    <SideBar />
    <div class="collectionsPage" style="color: white; height: 100%; min-height: 1250px; background-color: black;">
      <h1>{{currentUser.username}}님의 Collections</h1>
      <swiper-container
        effect="cards"
        grab-cursor="true"
        class="mySwiper">
        <swiper-slide 
          v-for="(collection, index) in collections"
          :key="index">
        <img class="border rounded" :src="'https://image.tmdb.org/t/p/w220_and_h330_face'+collection?.poster_path" alt="poster">
        <!-- <p class="fs-2 fw-bold">{{collection.title}}</p> -->
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
// import CollectionList from '@/components/CollectionList'
import { register } from 'swiper/element/bundle'
register()
import 'swiper/css'

import 'swiper/css/effect-cards';


import { EffectCards } from 'swiper';

export default {
  name: 'CollectionsView',
  components:{
    SideBar,
    
  },
  computed:{
    currentUser(){
      return this.$store.getters.currentUser
    },
    movieList(){
      const articles = this.currentUser.article_set
      let movieList = []
      let checkList = []
      articles.forEach((article)=>{
        const movieId = article.movie.pk
        if (!checkList.includes(movieId)){
          checkList.push(movieId)
          movieList.push(article.movie)
        }
      })
      return movieList
    },
    collections(){
      let movieList = this.movieList
      let quaterMovies = this.$store.getters.quaterMovies
      const collections = [...movieList, ...quaterMovies]
      console.log(quaterMovies)
      return collections
    }
  },
  setup() {
    return {
      modules: [EffectCards],
    }
  },
  created(){
    this.$store.dispatch('fetchUser')
  }
}
</script>
<style scoped>
.swiper-container {
  width: 300px;
  height: 500px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

</style>