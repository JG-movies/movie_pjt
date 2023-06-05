<template>
  <div>
    <SideBar/>
    <p>Login Complete</p>
    <h3>Choose the Best Movie For You</h3>
    <div>
      <router-link to="/worldcup" class="h1">
        <font-awesome-icon :icon="['fas','trophy']"/>
       </router-link>
    </div>

  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  components: {
    SideBar,
  },
  mounted() {
    new window.naver_id_login("*********************", "http://localhost:8080/login/naver");
    // console.log("access token", naver_id_login.getAccessToken()); // 정상적 로그인이 된 경우 access token값 출력
  },
};
</script>