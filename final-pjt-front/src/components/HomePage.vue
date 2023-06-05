<template>
  <div class="hello">
    <!-- <h1 class="m-5">팀의 영화 페이지에 오신 것을 환영합니다!!!</h1> -->
    <h1 class="m-5"></h1>
    <!-- <div class="Info">
      <div>
        <font-awesome-icon :icon="['fas','house']" size="2xl"/> 홈 화면으로 이동합니다.
      </div>
      <div>
        <font-awesome-icon :icon="['fas','magnifying-glass']" size="2xl"/> 장르별 인기차트를 보여줍니다.
      </div>
      <div>
        <font-awesome-icon :icon="['fas','circle-user']" size="2xl"/> 로그인 및 회원가입 그리고 자신의 profile을 확인할 수 있습니다.
      </div>
      <div>
        <font-awesome-icon :icon="['fas','trophy']" size="2xl"/> 새롭게 자신의 16강 월드컵을 진행할 수 있습니다.
      </div>
      <div>
        <font-awesome-icon :icon="['fas','heart']" size="2xl"/> LOVE YOU!!
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.Info {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-items: left;
  text-align: left;
  margin-left: 100px;
}
</style>
