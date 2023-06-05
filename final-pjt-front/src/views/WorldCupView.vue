<template>
  <div class="container worldcup" :style="{backgroundImage:`url(${`https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_1280.jpg`})`}">

    <div v-if="!finishFlag">
      <h1>더 좋아하는 영화를 선택해 주세요</h1>
      <hr>
      <div v-if="!startFlag">
        <b-button @click="startWorldcup" variant="primary">월드컵 시작하기</b-button>
      </div>
      <div>
        <h1>{{ roundNum }}강</h1>
      </div>
      <div class="row"
        align="center"
        justify="center"
      >
        <div class="col" cols="6" align="center">
          <WorldCupChoice :movie="left" @selected="leftChoice" />
        </div>
        <div class="col" cols="6" align="center">
          <WorldCupChoice :movie="right" @selected="rightChoice" />
        </div>
      </div>
    </div>

    <div v-if="finishFlag">
      <h1>우승!</h1>
      <hr>
      <div class="row"
        align="center"
        justify="center"
      >
        <div class="col" cols="6">
          <WorldCupChoice id="winner" :movie="left"/>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import WorldCupChoice from '@/components/WorldCupChoice.vue'

export default {
  components: {
    WorldCupChoice,
  },

  computed:{
    startFlag(){
      return this.$store.getters.startFlag
    },
    roundNum(){
      return this.$store.getters.roundNum
    },
    finishFlag(){
      return this.$store.getters.finishFlag
    },    
    left(){
      return this.$store.getters.left
    },
    right(){
      return this.$store.getters.right
    }
  },
  
  methods: {
    randomMovieCall() {
      this.$store.dispatch('randomMovieCall')
    },

    leftChoice() {
      this.$store.dispatch('leftChoose')
      this.$store.dispatch('nextStep')
    },

    rightChoice() {
      this.$store.dispatch('rightChoose')
      this.$store.dispatch('nextStep')
    },

    nextStep() {
      this.$store.dispatch('nextStep')
    },
    startWorldcup(){
      this.$store.dispatch('startWorldcup')
      this.$store.dispatch('nextStep')
    }
  },

  watch: {
    //라운드 종료 판별
    left() {
      if (this.$store.getters.current_round.length === 0 && !this.$store.getters.left){
        this.$store.dispatch('isRoundFinished')
        this.$store.dispatch('nextStep')
      }
    },
    //우승자 판별
    right() {
      if(this.$store.getters.next_round.length === 0 && this.$store.getters.current_round.length === 0 && this.$store.getters.left && !this.$store.getters.right){
        console.log('winner!')
        this.$store.dispatch('isWorldCupFinished')
      }
    }

  },
  created() {
    this.randomMovieCall()
  },
}
</script>

<style>
  .container{
    width: 100vw;
    min-width: 1250px;
    height: 100vh;
    font-family: 'Comic Sans MS', cursive;
    color: white;
    font-size: 2rem;
    z-index: -2;
    filter: bluescale(100%);
    opacity: 0.8;
    background-size: cover;
    /* background-repeat: no-repeat; */
  }
</style>