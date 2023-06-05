<template>
  <div class="home" :style="{backgroundImage:`url(${`https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_1280.jpg`})`}">
    <div class="mainVideo">
      <!-- <video ref="videoPlayer" muted autoplay loop class="w-full h-full"> -->
      <video muted autoplay loop class="w-full h-full">
        <source src="@/assets/startvideo.mp4" type="video/mp4;" />
      </video>
    </div>
    <div class="d-flex m-3 justify-content-end">
      <router-link class="btn btn-primary m-3" to="/signup">SignUp</router-link>
      <router-link class="btn btn-info m-3" to="/login">Login</router-link>
    </div>
      
    <HomePage />
  </div>
</template>

<script>
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'HomeView',
  components: {
    HomePage
  },
//   mounted() {
//     const videoPlayer = this.$refs.videoPlayer;
//     const hideDuration = 10000;

//     setTimeout(() => {
//       videoPlayer.style.display = 'none';
//     }, hideDuration);
//   }
}
</script>

<style scoped>
  .home{
    width: 100vw;
    height: 100vh;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2rem;
    z-index: -1;
    filter: bluescale(100%);
    opacity: 0.8;
    background-size: cover;
    background-repeat: no-repeat;
  }
  
  .mainVideo {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    object-fit: fill;
    z-index: 0;
  }
  .btn {
    z-index: 1;
  }
</style>