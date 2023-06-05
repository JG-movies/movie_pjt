<template>

  <div>
    <h2>{{movie?.title}}</h2>
    <!-- <v-b-hover
      v-slot:default="{ hover }"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :disabled="disabled"
      :value="value"
      max-height="600px"
    > -->
      <img v-if="movie"
        @click="selected"
        :src="'https://image.tmdb.org/t/p/w220_and_h330_face'+movie.poster_path"
        alt="movie-poster"
        width="400px"
        height="600px"
      >
    <!-- </v-b-hover> -->
  </div>

</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      // movieObject: null,
      // disabled: false,
      // openDelay: '0',
      // closeDelay: '0',
      // value: false,
    }
  },
  
  props: {
    movie:{
      type: Object,
      required: false,
    }
  },

  methods: {
    selected() {
      this.$emit('selected', true)
    }
  }

}
</script>

<style>

</style>