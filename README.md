# final-pjt


## Getting started
- 개개인의 특성에 맞추어 검색을 할 수 있는 맞춤형 검색엔진을 구현하고자 JG movies를 기획하고 영화 웹사이트를 구현해보았다.

## Making Project

In back-end with DRF,
```
django-admin startproject final_pjt .
python manage.py startapp movies
python manage.py startapp accounts
```

In front-end with Vue,
```
npm install -g @vue/cli
vue create final-pjt-front
vue add vuex
vue add router
```

## Need to install requirements

```
npm install axios

npm install vuex-persistedstate
```

vue-bootstrap 설치하기

```javascript
설치하기
$ npm install vue bootstrap-vue bootstrap

main.js에 bootstrap 관련 내용을 import해준다.
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```

fontawesome을 사용하기 위한 방법
```javascript
공식 사이트에서 보고 다운받는게 제일 안전할듯합니다.
https://fontawesome.com/docs/web/use-with/vue/


$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save-dev @fortawesome/free-solid-svg-icons
$ npm i --save-dev @fortawesome/vue-fontawesome

$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/free-regular-svg-icons
$ npm i --save @fortawesome/free-brands-svg-icons

$ npm i --save @fortawesome/vue-fontawesome@latest-2



final-pjt-front/src에 fontAwesomeIcon.js를 생성하고 코드 작성
import Vue from "vue";

// 설치했던 fontawesome-svg-core와 vue-fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// 설치했던 아이콘파일에서 해당 아이콘만 불러옵니다. 
import { faLink, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

// 불러온 아이콘을 라이브러리에 담습니다. 
library.add(faTrashAlt);
library.add(faLink, faRedo, faUndo);

// fontawesome아이콘을 Vue탬플릿에 사용할 수 있게 등록해 줍니다. 
Vue.component("font-awesome-icon", FontAwesomeIcon);


작성된 fontAwesomeIcon.js는 main.js에서 import해 주면 전역에서 사용할 수 있습니다.


```


- vue carousel을 사용하기 위해
```javascript
vue-carousel을 다운받아주고
$ npm install vue-carousel

import { Carousel, Slide } from 'vue-carousel';

components: {
  Carousel,
  Slide,
},
을 넣어준다.
```

- 네이버 로그인

![naver_login](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FMR5sf%2FbtraL1oTnw1%2FfBpG5MpmKWz6hsPnUVeF91%2Fimg.png)

- public index.html에

```javascript
head위에 써준다.
<script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charset="utf-8"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
```

- router에 
```javascript
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: "/login/naver",
    name: "naver",
    component: () => import("@/views/LoginAccess.vue"),
  },

```
- loginpage에

```javascript
<template>
  <div>
    <div id="naver_id_login"></div>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  mounted(){
    const naver_id_login = new window.naver_id_login("*****************", "http://localhost:8080/login/naver");
    const state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2,40); // 버튼 설정
    naver_id_login.setState(state);
    // naver_id_login.setPopup(); // popup 설정을 위한 코드
    naver_id_login.init_naver_id_login();
  },
}
</script>
```

- loginaccess

```javascript
<template>
  <div>
    <p>Naver Login Access Pages</p>
  </div>
</template>

<script>
export default {
  mounted() {
    new window.naver_id_login("********************", "http://localhost:8080/login/naver");
    // console.log("access token", naver_id_login.getAccessToken()); // 정상적 로그인이 된 경우 access token값 출력
    // 정상적으로 로그인이 되어도 naver_id_login이 undefined되기에 console.log정도는 제거해주었다. ㅎㅎ
  },
};
</script>
```

- kakao login 구현하기


  - main.js
```javascript
window.Kakao.init('************************************') // Kakao Developers에서 요약 정보 -> JavaScript 키
```

```javascript
<template>
    <div>
      <a id="custom-login-btn" @click="kakaoLogin()">
        <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="150">
      </a>
    </div>
</template>

<script>
export default {
  name: 'LogInView',
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

          this.$router.push('/routername')
        },
        fail : error => {
          console.log(error)
        }
      })
    }
  }
}

</script>

```
```javascript
```

- CollectionsView를 VueTinder로 꾸미기

```javascript
$ npm install vue-tinder --save

  - main.js
      import VueTinder from 'vue-tinder'

      Vue.use(VueTinder)
```
## 프로젝트 

영화 추천 및 커뮤니티 웹 페이지 제작

## 주요 기능

1. 회원 가입 페이지

2. 로그인 페이지

3. 영화 월드컵

4. 메인 페이지

5. 영화 검색 페이지
    > 장르별 인기 순으로 10개의 영화를 보여준다.

6. 영화 상세 페이지
    > 해당 영화의 id를 통해 GET 요청을 통하여 영화 데이터를 가져와 포스터, 출연한 영화 배우들, 트레일러를 보여준다.

7. 영화에 대한 article
    > 해당 영화의 상세 페이지에서 `b-tab` 을 이용하여 해당 영화에 대한 article 리스트를 보여준다.
    > 평가하기 버튼을 추가하여 클릭 시 modal에 form을 넣어 article을 작성할 수 있도록 하였다.
    > article list에서 개별 article에 hover을 통해 꾸며주고 클릭 시 해당 article의 작성자, 제목, 내용을 보여준다. 또한 font awesome icon을 적용해 좋아요 버튼을 추가하고 꾸며줬다.
    > Comment 작성 폼을 만들어 article에 대한 comment를 작성할 수 있다.

8. 배우 상세 페이지

9. 프로필

10. Collections 페이지
    > 로그인한 유저가 월드컵 4강에 들어간 영화와 article을 작성한 영화의 포스터를 카드 형식으로 한 번에 모아서 볼 수 있도록 페이지를 구성하였다.
    swiper을 이용해 카드를 옆으로 넘겨 볼 수 있도록 꾸며주었다.

## 느낀점

- 관형: vue와 django template에서 동시에 작업하려고 했으나, 각 프레임워크의 문법이 충돌할 수 있기 때문에 그 방법은 지양해야한다.
- 정모 : diagram을 활용하여 vue router와 django의 흐름을 파악할 수 있도록 만들어주는 작업도 생각보다 할 작업이 많다는 것을 알게 되었다. 그리고 미리 기획을 다 하고 작업에 들어가니 시간이 낭비되는 것과 계획에 따라 프로젝트를 진행할 수 있었다는 점이 좋았던 것 같습니다. 진득하게 한 첫 프로젝트이자 json 파일을 만들며 데이터를 제작하고 backend, frontend 등 다양한 경험을 할 수 있어서 즐거웠습니다.



## 배운점

- Comment create 할 때 serializers.py 에서 read_only_fields에 참조하는 필드들 넣어주어야 한다.

- Article, Comment 생성하고 난 뒤, 사용자에게 웹 페이지에 생성된 결과를 보여주기 위해서는 post 요청 후 데이터를 갱신하기 위한 get 요청을 하여야 한다.

- vuex의 store를 이용하면 코드를 재사용하기 편하다.


***
