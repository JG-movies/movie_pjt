<template>
  <div>
    <Sidebar/>
    <div class="MovieDetail" :style="{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${this.movie.poster_path}`})`}">

      <div class="DetailDiv">
        <div class="DetailLeft">
          <div class="DetailTitle h2 mb-5">
            {{movie && movie.title}}
          </div>
          <img width="95%" height="500px" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="포스터 이미지" />
          <div class="h4 m-5" style="width: 90%;">
            <!-- {{movie && movie.overview}} -->
            {{movie && movie.overview|truncate(150, '...')}}
          </div>
        </div>
        <div class="DetailRight">
          <b-tabs content-class="mt-2">
            <b-tab title="TRAILER&ACTORS">

              <div>
                <div class="MovieBox" v-if="movie.video_key">
                  <iframe width="100%" height="500px" :src="`https://www.youtube.com/embed/${movie.video_key}?amp;autoplay=1&mute=1&amp;playlist=${movie.video_key}&loop=1`" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>
                </div>

                <div class="ActorContainer">
                  <div v-for="actor in movie && movie.actors" :key="actor.pk">
                    <div v-for="people in actorList" :key="people.pk">
                      <template v-if="actor === people.pk">
                        <router-link :to="`/actor/${people.pk}`">
                          <template v-if="!people.fields.profile_path">
                            <font-awesome-icon style="width: 80px; height: 150px; color: white;" :icon="['fas', 'circle-user']" size="2xl"/>
                          </template>
                          <template v-else>
                            <img class="ActorImg" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${people.fields.profile_path}`" alt="">
                          </template>
                          <p class="h6">{{ people.fields.name }}</p>
                        </router-link>   
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>

            <b-tab title="COMMUNITY" lazy>
              <b-button v-b-modal.create-form variant="info">평가하기</b-button>
                <MovieArticleList />
            </b-tab>
          </b-tabs>

        </div>
      </div>
    </div>

    <b-modal
      id="create-form"
      ref="modal"
      title="Article 작성하기"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ok-only
    >
      <form ref="form" @submit.stop.prevent="createArticle">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="제목을 입력해주세요."
          :state="titleState"
        >
        <b-form-input
          id="title-input"
          v-model="title"
          :state="titleState"
          required
        ></b-form-input> 
        </b-form-group>

        <b-form-group
          label="Content"
          label-for="content-input"
          invalid-feedback="내용을 입력해주세요."
          :state="contentState"
        >
        <b-form-textarea
          id="content-input"
          v-model="content"
          :state="contentState"
          required
        ></b-form-textarea> 
        </b-form-group>

        <b-form-group
         label="평점"
         label-for="star-rating"
         invalid-feedback="영화에 대한 평점을 남겨주세요."
         :state="ratingState">
          <b-form-rating
            id="star-rating"
            v-model="starRating"
            :state="ratingState"
            required
          ></b-form-rating>
        </b-form-group>
          
        
      </form>
      <template #modal-footer="{ ok }">
        <b-button size="md" variant="success" @click="ok()">Create</b-button>
      </template>  
    </b-modal>

  </div>
</template>

<script>
import Sidebar from '@/components/SideBar.vue'
import MovieArticleList from '@/components/MovieArticleList'
import actorData from "@/assets/actor.json";

const actorList = actorData;
export default {
  name:'MovieDetailView',
  data(){
    return{
      title:'',
      content:'',
      starRating: 0,
      actorList,
    }
  },
  components:{
    Sidebar,
    MovieArticleList
  },
  computed:{
    movie(){
      return this.$store.getters.movie
    },
    titleState(){
      return (this.title ? true : false)
    },
    contentState(){
      return (this.content ? true : false)
    },
    ratingState(){
      return (this.starRating ? true : false)
    },
  },
  methods:{
    checkFormValidity(){
      const valid = this.$refs.form.checkValidity()
      this.formState = valid
      return valid
    },
    resetModal(){
      this.title = ''
      this.content = ''
      this.formState = null
      this.starRating = null
    },
    handleOk(bvModalEvent){
      bvModalEvent.preventDefault()
      this.createArticle()
    },
    createArticle(){
      if(!this.checkFormValidity()){
        return
      }
      const movieId = this.$route.params.id
      const title = this.title
      const content = this.content
      const starRating = this.starRating
      const payload = {
        movieId, title, content, starRating
      }
      this.$store.dispatch('createArticle', payload)
      this.$nextTick(()=>{
        this.$bvModal.hide('create-form')
      })
    }
  },
  created(){
    const movieId = this.$route.params.id
    this.$store.dispatch('getMovie', movieId)
  }
}
</script>

<style scoped>
.ActorContainer {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 700px;
}
.ActorImg {
  padding: 0;
  margin: 0;
  width: 100px;
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: 0 10px;
  border-radius: 100%;
}
.MovieDetail {
  padding-top: 2rem;
  display: flex;
  color: white;
  width: 100%;
  height: 100%;
  /* background-repeat: no-repeat; */
  min-height: 50vh;
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
  height: 100%;
  min-height: 1250px;

  color: white;
}
.DetailLeft {
  width: 35%;
  margin: 0 50px;
}

.DetailRight {
  width: 65%;
  height: 100%;
  padding-right: 100px;
}
.MovieBox {
  height: 500px;
}

</style>