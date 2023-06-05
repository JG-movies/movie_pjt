<template>
  <div class="articleList p-3">
    <MovieArticle
      v-for="(article,index) in articleList" :key="index" :article="article"
      @showArticle="$bvModal.show(`modal-${modalId}`)"
      />

    <b-modal
      :id="'modal-'+modalId"
      :title="modalArticle && modalArticle.username+'의 Article'"
      no-close-on-esc
      ok-only
    >
      <p class="my-3">
        작성자: {{modalArticle && modalArticle.username}}
        <b-button variant="info" @click="toAnotherProfile">Profile</b-button>
      </p>
      <p class="my-3">제목: {{modalArticle && modalArticle.title}}</p>
      <p class="my-3">내용: {{modalArticle && modalArticle.content}}</p>
      <div class="d-flex justify-content-between">
        <font-awesome-icon v-if="modalArticle && !isLike" :icon="['far','thumbs-up']" size="2xl" @click="likeArticle"/>
        <font-awesome-icon v-if="modalArticle && isLike" :icon="['fas','thumbs-up']" size="2xl" @click="likeArticle"/>
        <div v-if="modalArticle && amI">
          <!-- <b-button @click="updateArticle" variant="warning">수정</b-button> -->
          <b-button @click="deleteArticle" variant="danger">삭제</b-button>
        </div>
      </div>
      
      <hr>
      <h3>댓글 목록</h3>
      <ul v-for="(comment, index) in modalArticle?.comment_set" :key="index">
        <li>{{comment.content}}
          <b-button v-if="isWritten"></b-button>
        </li>
      </ul>
      <form ref="form">
        <b-form-group
          label="Content"
          label-for="comment-content-input"
        >
          <b-form-input
            id="comment-content-input"
            v-model.trim="commentContent"
            @keyup.enter="createComment"
          ></b-form-input>
        </b-form-group>
        <b-button @click="createComment">댓글 달기</b-button>
      </form>
    </b-modal>

  </div>
</template>

<script>
import MovieArticle from '@/components/MovieArticle'
export default {
  name: 'MovieArticleList',
  data(){
    return {
      commentContent: '',
    }
  },
  components: {
    MovieArticle
  },
  computed:{
    amI(){
      const ArticleUser = this.modalArticle.user
      const currentUser = this.$store.getters.currentUser.id
      return (ArticleUser === currentUser) ? true : false
    },
    articleList(){
      return this.$store.getters.articleList
    },
    modalArticle(){
      return this.$store.getters.modalArticle
    },
    modalId(){
      return this.$store.getters.modalId
    },
    isLike(){
      const currentUser =  this.$store.getters.currentUser.id
      const LikeUsers = this.$store.getters.modalArticle.like_users
      return (LikeUsers.includes(currentUser) ? true : false)
    }
  },
  methods:{
    createComment(){
      const commentContent = this.commentContent
      const articleId = this.modalId
      const payload = {
        commentContent, articleId
      }
      this.$store.dispatch('createComment', payload)
      this.commentContent = ''
    },
    likeArticle(){
      this.$store.dispatch('likeArticle', this.modalArticle)
    },
    // updateArticle(){
    //   this.$store.dispatch('updateArticle',this.modalArticle)
    // },
    deleteArticle(){
      const modalId = this.$store.getters.modalId
      this.$store.dispatch('deleteArticle',this.modalArticle)
      this.$nextTick(()=>{
        this.$bvModal.hide(`modal-${modalId}`)
      })
    },
    toAnotherProfile(){
      this.$router.push({name: 'AnotherProfileView', params:{ id: this.modalArticle.user}})
    }
  }
}
</script>

<style scoped>
  ul li{
    margin: 0.25rem;
  }
  .articleList {
    min-height: 1250px;
    height: 100%;
  }
</style>