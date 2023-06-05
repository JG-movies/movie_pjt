<template>
  <div>
    <div id="app">
      <SideBar />
    </div>
    <div class="SearchDiv">
      <div class="SearchBar">
        <div>
          <input
            class="searchInput"
            type="text"
            ref="cursor"
            v-model="keyword"
            @keyup.enter="onInputKeyword"
            placeholder="영화 장르별 인기 영화를 찾아보세요"
          />
        </div>
        <div class="SelectDiv">
          <div class="searchLi" @click="selectGenre(null)"></div>
          <div class="searchLi" @click="selectGenre(undefined)">ALL</div>
          <div class="searchLi" @click="selectGenre(10749)">Romance</div>
          <div class="searchLi" @click="selectGenre(35)">Comedy</div>
          <div class="searchLi" @click="selectGenre(28)">Action</div>
          <div class="searchLi" @click="selectGenre(18)">Drama</div>
          <div class="searchLi" @click="selectGenre(53)">Thriller</div>
          <div class="searchLi" @click="selectGenre(878)">Science Fiction</div>
        </div>
      </div>

      <div class="DetailContainer">
        <div class="detailDiv" v-for="movie in filteredGenre" :key="movie.pk">
          <router-link :to="`/movie/${movie.pk}`">
            <div class="movieWrapper">
              <div class="posterWrapper flex-3">
                <img class="posterImg" :src="'https://image.tmdb.org/t/p/original/'+movie.fields.poster_path" alt="포스터 이미지" />
              </div>
              <div class="movieInfo flex-9">
                <div class="detailTitle">{{ movie.fields.title }}</div>
                <div class="detailOverviewDiv">{{ movie.fields.overview|truncate(200, '...')}}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import GetData from "@/assets/moviedata_final.json";

const movieList = GetData;
export default {
  name: "SearchView",
  data() {
    return {
      movieList,
      keyword: "",
      genreSelected: null,   
    };
  },
  components: {
    SideBar,
  },
  computed: {
    filteredGenre() {
      if (this.genreSelected === null) {
        return []
      } else if (this.genreSelected === undefined) {
        return movieList.slice(0, 11);
      } else {
        const selectedGenreList = [];
        movieList.forEach(movie => {
          if (movie.fields.genres.includes(this.genreSelected)) {
            selectedGenreList.push(movie);
          }
        })
        return selectedGenreList.slice(0, 11);
      }
    },
  },
  
  methods: {
    selectGenre(genreId) {
      this.genreSelected = genreId;
    },
  },
};
</script>
  
<style>
.SearchDiv {
  display: flex;
  color: white;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.SearchDiv::after {
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(
    to left,
    rgba(16, 12, 83, 0.5) 10%,
    rgba(16, 12, 83, 0.7) 25%,
    rgba(16, 12, 83, 0.8) 50%,
    rgba(16, 12, 83, 0.9) 65%,
    rgba(16, 12, 83, 0.9) 100%
  );

  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: bluescale(100%);
  opacity: 0.8;
}

.SearchBar {
  width: 30%;
  margin-top: 5rem;
  margin-left: 5%;
  padding: 30px;
}
.searchInput {
  min-width: 250px;
  width: 90%;
  padding: 0;
  border: none;
  align-content: left;
  color: white;
  font-size: 1.5rem;
  border-bottom: 3px solid white;
  background-color: transparent;
  box-shadow: none;
}
.SelectDiv {
  width: 100%;
  justify-content: center;
  margin-top: 3rem;
  cursor: pointer;
}
.SelectDiv .searchLi:first-child {
  pointer-events: none;
}

.searchLi {
  margin: 1rem;
  padding: 0.3rem 1rem;
}
.searchLi:hover {
  border: 1px solid #f80303;
  border-radius: 5px;
}
.searchLi:focus {
  border: 1px solid #f80303;
}

.searchInput:focus {
  border: none;
  box-shadow: none;
  border-bottom: 3px solid white;
  outline: none;
}

.DetailContainer {
  width: 70%;
  margin-top: 3rem;
  margin-right: 3rem;
}

.detailDiv {
  display: flex;
  margin: 40px 0;
  max-width: 1200px;
}


.movieWrapper {
  display: flex;
  align-items: flex-start;
}
.posterWrapper {
  width: 200px;
  height: 300px;
  margin-right: 20px;
  flex-shrink: 0;
}

.posterImg {
  height: 100%;
  width: auto;
  border-radius: 10%;
}

.movieInfo {
  flex-grow: 1;
}

.detailTitle {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.detailOverviewDiv {
  height: 60px;
  /* overflow: hidden;
  text-overflow: ellipsis; */
  font-size: 1.2rem;
  color: rgb(46, 40, 40);
  line-height: 2rem;
}
</style>