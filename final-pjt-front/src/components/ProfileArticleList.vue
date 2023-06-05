<template>
  <div>
    <ProfileArticle v-for="(article, index) in articles" :key="index" :article="article"/>

  </div>
</template>

<script>
import ProfileArticle from '@/components/ProfileArticle'
export default {
  name:'ProfileArticleList',
  components:{
    ProfileArticle
  },
  computed:{
    articles(){
      return this.$store.getters.userArticles
    }
  }
}
</script>