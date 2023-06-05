<template>
  <div>
    <div v-b-hover="handleHover" class="border rounded" :class="isHovered ? 'bg-secondary text-white' : ''" >
      <p class="my-auto">제목:{{article.title}}</p>
      <p class="my-auto">내용:{{article.content}}</p>
      <p class="my-auto">해당 영화 평점:
      <span v-for="count in counts" :key="count">
        <font-awesome-icon :icon="['fas','star']" style="color: #e3f401;" />
      </span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileArticle',
  props: {
    article: Object
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
    handleHover(hovered) {
      this.isHovered = hovered
    }
  }  
}
</script>