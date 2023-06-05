<template>
  <div style="color: white; height: 100%; min-height: 1250px; background-color: black;">
    <div class="loginLogo">LogIn Page</div>
    <form @submit.prevent="login">
      <div class="loginSenterDiv">
        <div class="InputBox">

          <label for="username">username : </label>
          <input type="text" id="username" v-model="username" class="loginInput"><br>

          <label for="password">  password : </label>
          <input type="password" id="password" v-model="password" class="loginInput"><br>

          <input type="submit" class="btn btn-primary" value="logIn">
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-center m-3">
      <div id="naver_id_login"></div>
      <div>
        <a id="custom-login-btn" @click="kakaoLogin()">
          <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="150">
        </a>
      </div>
    </div>
    <span>
      회원가입을 하시려면, <router-link to="/signup">회원가입</router-link>을 누르세요!
    </span>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  mounted(){
    const naver_id_login = new window.naver_id_login("*********************", "http://localhost:8080/login/naver");
    const state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 3,32); // 버튼 설정
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
  },
  data() {
    return {
      username:null,
      password:null,
    }
  },
  methods: {
    login(){
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }
      this.$store.dispatch('login', payload)
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: this.getKakaoAccount,
      })
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url:'/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account
          const nickname = kakao_account.nickname
          const email = kakao_account.email
          console.log('nickname', nickname)
          console.log('email', email)

          this.$router.push('/worldcup')
        },
        fail : error => {
          console.log(error)
        }
      })
    }
  }
}

</script>

<style scoped>
  input{
    margin: 5px;
  }
.loginLogo {
  padding: 2rem;
  font-size: 5rem;
}
.InputBox {
  margin: 2rem auto;
  width: 450px;
}
.loginInput {
  font-family: 'Courier New', Courier, monospace;
  width: 400px;
  font-size: 2rem;
  background: none;
  border: 2px solid white;
  border-radius: 5px;
  color: white;
}
.btn {
  width: 200px;
}
</style>