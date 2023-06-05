<template>
  <div>
    <SideBar />
    <div class="wrapper">
    <h1>{{profileUser.username}}님의 프로필</h1>
    <div class="DetailDiv">
        <div class="LeftProfile">
        <font-awesome-icon style="width: 100%; height: 200px;" :icon="['fas','circle-user']"/>
        <h3>Name: {{profileUser.username}}</h3>
        <div v-if="!amI" @click="followUser">
          <b-button v-if="isFollowing">팔로우 취소하기</b-button>
          <b-button v-if="!isFollowing">팔로우하기</b-button>
        </div>
      </div>
      <div class="RightProfile">
        <b-tabs content-class="mt-2" style="width: 100%;">
            <b-tab title="Articles Movie">
              <div class="MovieTab">
                <CommentMovie v-for="(movie,index) in movieList" :key="index" :movie="movie"/>
              </div>
            </b-tab>

            <b-tab title="My Article" lazy>
              <h2>{{profileUser.username}}님이 쓰신 Articles</h2>
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
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import ProfileArticleList from '@/components/ProfileArticleList'
import CommentMovie from '@/components/CommentMovie'

export default {
  name: 'AnotherProfileView',
  components:{
    SideBar,
    ProfileArticleList,
    CommentMovie,
  },
  computed: {
    amI(){
      const profileUser = this.profileUser.id
      const currentUser = this.$store.getters.currentUser.id
      return (profileUser === currentUser) ? true : false
    },
    profileUser(){
      return this.$store.getters.profileUser
    },
    isFollowing(){
      const currentUser = this.$store.getters.currentUser.id
      return this.profileUser.followers.includes(currentUser)
    },
    currentUser(){
      return this.$store.getters.currentUser
    },
    movieList(){
      const articles = this.profileUser.article_set
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
    }    
  },
  methods:{
    followUser(){
      const user_id = this.profileUser.id
      this.$store.dispatch('followUser',user_id)
    }
  },
  created(){
    const user_id = this.$route.params.id
    this.$store.dispatch('getAnotherProfile',user_id)
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