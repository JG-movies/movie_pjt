<template>
  <div>
    <li v-b-hover="handleHover" class="border rounded" :class="isHovered ? 'bg-secondary text-white' : ''" @click="showArticle">
      {{article.username}}님이 작성하신 Article   제목: {{ article.title }}
      내용: {{ article.content }}
      <br>
      평점:
      <span v-for="count in counts" :key="count">
        <font-awesome-icon :icon="['fas','star']" style="color: #e3f401;" />
      </span>
    </li>
  </div>
</template>

<script>
export default {
  name:'MovieArticle',
  props:{
    article: Object,
  },
  data(){
    return {
      isHovered: false
    }
  },
  computed:{
    counts(){
      return this.article.star_rating
    }
  },
  methods:{
    likeArticle(){
      this.$store.dispatch('likeArticle', this.article)
    },
    showArticle(){
      const modalId = this.article.id
      this.$store.dispatch('changeModalId', modalId)
      this.$emit('showArticle')
    },
    handleHover(hovered) {
      this.isHovered = hovered
    }
  }
}
</script>

<style scoped>
li{
  height: 4rem;
  font-family: sans-serif;
  cursor: pointer;
}
</style>