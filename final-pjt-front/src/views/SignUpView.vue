<template>
  <div style="color: white; height: 100%; min-height: 1250px; background-color: black;">
    <div class="loginLogo">Sign Up Page</div>
    <form @submit.prevent="signUp">
      <div class="loginSenterDiv">
        <div class="InputBox">

          <label for="username">username : </label>
          <input type="text" id="username" v-model="username" class="loginInput"><br>

          <label for="password1"> password : </label>
          <input type="password" id="password1" v-model="password1" class="loginInput"><br>

          <label for="password2"> password confirmation : </label>
          <input type="password" id="password2" v-model="password2" class="loginInput">
          
          <input class="LockIn" type="submit" value="회원가입">
        </div>
          <span>
            로그인을 하시려면, <router-link to="/login">로그인</router-link>을 누르세요!
          </span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  components: {
  },
  methods: {
    signUp(){
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      
      const payload = {
        username, password1, password2
      }

      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>

<style scoped>
  input{
    margin: 1rem;
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
.LockIn {
  width: 200px;
  height: 50px;
  background-color: blue;
  font-size: 1rem;
  color: white;
  border-radius: 15%;
}
</style>