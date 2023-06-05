<template>
  <div id="app">
    <SideBar/>
    <div class="mainVideo min-w-full min-h-full">
      <template v-if="!isVideo">
        <img width="100%" :src="'https://image.tmdb.org/t/p/original/' + Key" alt="포스터 이미지" />
      </template>
      <iframe v-else width="100%" height="550" :src="Key" frameborder="0" allowfullscreen></iframe>
    </div>
    <IndexCarousel/>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import IndexCarousel from '@/components/IndexCarousel.vue'
import GetData from '@/assets/moviedata_final.json'

const movieList = GetData

export default {
  name: "TempView",
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
    console.log(this.$store.getters.winner)
  }
}
</script>

<style>
.mainVideo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.mainVideo img {
  max-width: 100%;
  max-height: 600px;
}

</style>