<template>
  <div>
    <SideBar/>
    <div class="MovieDetail" :style="{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${actor?.movies[0].poster_path}`})`}">
      <div class="DetailDiv">
        <div class="DetailLeft w-100">
          <div class="DetailTitle h2 mb-5">
            <h1>{{ actor?.name }}</h1>
            <!-- <div class="btn btn-primary" @click="window.location.href='https://www.themoviedb.org/person/' + actorId">If you want more details? CLICK!!!</div> -->
          </div>
          <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+actor?.profile_path" alt="">
        </div>
      </div>
      <div class="DetailRight">
        <CastMovie v-for="(movie,index) in actor?.movies" :key="index" :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import CastMovie from '@/components/CastMovie.vue'
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name:'ActorDetailView',
  components:{
    SideBar,
    CastMovie,
  },
  data(){
    return{
      actor:null,
    }
  },
  created(){
      this.getActorData()
  },

  methods:{
    getActorData(){
      console.log(this.$route)
      axios({
        method:'get',
        url:`${API_URL}/api/v1/actor/${this.$route.params.id}/`
      })
        .then(res => {
          console.log(res.data.movies)
          this.actor = res.data
        })
        .catch(err=>{
          console.error(err)
        })
  },
  }

}
</script>

<style scoped>
.MovieDetail {
  padding-top: 2rem;
  display: flex;
  color: white;
  width: 100%;
  height: 100%;
  /* background-repeat: no-repeat; */
  min-height: 100vh;
  position: relative;
  z-index: 1;
  overflow: auto;
}

.MovieDetail::after {
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(
    to left,
    rgba(16, 12, 83, 0.5) 10%,
    rgba(16, 12, 83, 0.7) 25%,
    rgba(16, 12, 83, 0.8) 50%,
    rgba(16, 12, 83, 0.9) 65%,
    rgba(16, 12, 83, 0.9) 100%
  );
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: grayscale(100%);
  opacity: 0.8;
}
.DetailDiv {
  display: flex;
  color: white;
}
.DetailLeft {
  width: 40%;
  margin: 0 50px;
}

.DetailRight {
  width: 60%;
  display: flex;
  margin: 2rem 0;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>