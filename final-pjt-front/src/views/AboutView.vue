<template>
  <div id="app">
    <SideBar/>
    <!-- <div class="mainTitle">
        {{this.$store.getters.winner.title}}
    </div> -->
      <div class="bg-overlay"></div>

      <div class="mainVideo min-w-full min-h-full">
        <template v-if="!isVideo">
          <img width="100%" height="1200px" :src="'https://image.tmdb.org/t/p/original/' + Key" alt="포스터 이미지" />
        </template>
        <!-- <youtube :video-id="video_key" ref="youtube" @playing="playing"></youtube> -->
        <iframe v-else width="100%" height="600px" :src="Key" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="MainCarousel">
        <IndexCarousel/>
    </div>
  </div>
</template>

<script>

import SideBar from '@/components/SideBar.vue'
import IndexCarousel from '@/components/IndexCarousel.vue'
import GetData from '@/assets/moviedata_final.json'
const movieList = GetData

export default {
  name: "AboutView",
  data() {
    return {
      movieList,
    }
  },
  components: {
    SideBar,
    IndexCarousel,
  },
  computed: {
    Key() {
      if (this.$store.getters.winner.video_key === "") {
        return 'https://image.tmdb.org/t/p/original/' + this.$store.getters.winner.poster_path
      }
      return 'https://www.youtube.com/embed/' + this.$store.getters.winner.video_key + '?amp;autoplay=1&mute=1&amp;playlist=' + this.$store.getters.winner.video_key + '&loop=1'
    },
    isVideo() {
      return this.$store.getters.winner.video_key !== ""
    },
  },
  created() {
    this.$store.dispatch('fetchUser')
  }
}
</script>

<style>
.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 1250px;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
  z-index: -1;
}



.mainVideo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
/* .mainTitle {
  color: white;
  position: absolute;
  top: 10%;
  left: 3%;
  width: 400px;
  font-size: 3rem;
} */
.mainVideo img {
  max-width: 100%;
}
.MainCarousel {
  color: white;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 1%;
  text-align: left;
  font-size: 5rem;
  z-index: 3;
}
</style>