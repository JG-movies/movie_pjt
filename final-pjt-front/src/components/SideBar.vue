<template>
  
  <div id="app">
    <nav>
      <div class="navDiv">
        <div>
          <router-link :to="{ name: 'about' }">
             <font-awesome-icon :icon="['fas','house']"/>

          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'search' }">
            <font-awesome-icon :icon="['fas','magnifying-glass']"/>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'AnotherProfileView', params: { id: userID } }">
            <font-awesome-icon :icon="['fas','circle-user']"/>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'WorldCupView' }">
            <font-awesome-icon :icon="['fas','trophy']"/>
          </router-link>
        </div>
        <div>
          <router-link :to="{name : 'collections'}">
            <font-awesome-icon :icon="['fas','heart']"/>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed:{
    userID(){
      const user = this.$store.getters.currentUser
      return user.id
    }
  }
}
</script>

<style>

#app {
  width: 100%;
}

nav {
  background-color: black;
  padding-top: 10px;
  width: 50px;
  text-align: center;
  height: 100vh;
  z-index: 5;
  position: fixed;
}
.navDiv {
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 6;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.5rem;
}

nav a.router-link-active {
  color: #ffda4f;
}
a {
  text-decoration: none;
  color: white;
}
</style>