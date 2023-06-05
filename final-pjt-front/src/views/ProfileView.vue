<template>
  <div>
    <SideBar/>
    <div class="DetailDiv">
      <div class="LeftProfile">
        <h1>My Profile</h1>
        <font-awesome-icon style="width: 100%; height: 200px;" :icon="['fas','circle-user']"/>
        <h3>Name: {{currentUser.username}}</h3>
      </div>
      <div class="RightProfile">
        <b-tabs content-class="mt-2" style="width: 100%;">
            <b-tab title="Articles Movie">
              <div class="MovieTab">
                <CommentMovie v-for="(movieID,index) in movieList" :key="index" :movieID="movieID"/>
              </div>
              <!-- {{movieList}} -->
            </b-tab>

            <b-tab title="My Article" lazy>
              <h2>{{currentUser.username}}님이 쓰신 Articles</h2>
              <hr>
              <div class="scrollable-container">
                <b-scroll class="scrollable-content" style="height: 500px;">
                  <ProfileArticleList />
                </b-scroll>
              </div>
            </b-tab>
          </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import SideBar from '@/components/SideBar'
import ProfileArticleList from '@/components/ProfileArticleList'
import CommentMovie from '@/components/CommentMovie'

export default {
  name:'ProfileView',
  components:{
    SideBar,
    ProfileArticleList,
    CommentMovie,
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    movieList(){
      const articles = this.currentUser.article_set
      let movieList = []
      articles.forEach((article)=>{
        const movie = article.movie
        if (!movieList.includes(movie)){
        movieList.push(movie)
        }
      })
      return movieList
    }
  },
  methods:{
    ...mapMutations({
      setProfileCurrent:'SET_PROFILE_CURRENT'
    })
  },
  created(){
    this.setProfileCurrent()
  }
}
</script>


<style scoped>
.DetailDiv {
  display: flex;
  color: white;
  width: 100%;
  left: 2%;
  height: fit-content;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.DetailDiv::after {
  display: flex;
  width: 100%;
  height: 100%;
  left: 2%;
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
  filter: bluescale(100%);
  opacity: 0.8;
}
.LeftProfile {
  margin: 0px 20px;
}
.RightProfile {
  width: 65%;
  display: flex;
  margin: 2rem 0;
  flex-direction: row;
  flex-wrap: wrap;
}
.MovieTab {
  width: 100%;
  height: 100%;
  padding-right: 50px;
  display: flex;
  margin: 2rem 0;
  flex-direction: row;
  flex-wrap: wrap;
}
.scrollable-container {
  height: 500px;
  overflow-y: auto;
}
/* . tab-pane > MovieTab > active {
  width: 250px;
} */
</style>