<template>
  <div>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-white">About</a></li>
          </ul>

          <div v-if="!isUserLoggedIn" class="text-end">
            <button type="button" class="btn btn-outline-light me-2" @click="openModal('login')">Login</button>
            <button type="button" class="btn btn-warning" @click="openModal('sign')">Sign-up</button>
          </div>
          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <figure class="image is-32x32" style="margin-right:10px;display:inline-block">
                <img style="max-height: inherit;" class="is-rounded" :src="getUserPicture">
              </figure>
              <span style=" vertical-align: top;line-height: 32px;">
                使用者名稱: {{ getUserName }}
              </span>
            </a>
            <div class="navbar-dropdown is-boxed">
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">登出</a>
            </div>
          </div>

        </div>
      </div>
    </header>
    <!-- modal -->

    <div class="modal fade" id="loginModal" ref="headerModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalAction === 'login'?'登入':'註冊' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <a v-if="modalAction ==='login'" href="/auth/" class="button is-fullwidth google">
                <span>使用 google 帳號 </span>
              </a>
              <div class="mb-3">
                <label for="email" class="col-form-label">請輸入帳號</label>
                <input v-model="userInfo.email" type="text" class="form-control" id="email">
              </div>
              <div class="mb-3">
                <label for="password" class="col-form-label">請輸入密碼</label>
                <input v-model="userInfo.password" type="password" class="form-control" id="password">
              </div>
              <div v-if="modalAction ==='sign'" class="mb-3">
                <label for="userName" class="col-form-label">請輸入使用者名稱</label>
                <input v-model="userInfo.userName" type="text" class="form-control" id="userName">
              </div>
              <div class="d-flex flex-column justify-content-center align-items-center">
                <label @change="fileUpload($event)" class="btn btn-primary mb-3 " for="userImage">上傳使用者照片
                  <input id="userImage" class="d-none" type="file" />
                </label>
                <img v-if="avatarImg ==='' || !avatarImg" src="~/static/user-teacher.png" class="w-300" alt="">
                <img v-else :src="avatarImg" class="w-200" alt="">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">關閉</button>
            <button type="button" class="btn btn-primary"  @click="loginModalSubmit">送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import API from '~/api/api.js'
  import Menu from './Menu';
  import Search from './Search';

export default {
  name: 'Header',
  data () {
    return {
      isMenuOpen: false,
      modalAction: '',
      modal: null,
      loginStatus:false,
      userInfo:{
        email:'',
        password:'',
        userName:'',
      },
      avatarImg:{}
    }
  },
  async mounted(){
    const modal = this.$bootstrap.Modal
    this.modal = new modal(this.$refs.headerModal, {
      keyboard: false
    })
  },
  
  methods:{
    closeModal(){
      this.modal.hide()
    },
    openModal(action){
      this.modalAction = action;
      this.modal.show()
    },
    loginModalSubmit(){
      if(this.modalAction === "login") {
        // 登入
        this.$axios({
          method: API.member.login.method,
          url: API.member.login.url,
          baseURL:  process.env.google_api_url,
          headers: {
            'Content-Type': 'application/json' 
          },
          data: {
            "password":this.userInfo.password,
            "email":this.userInfo.email
          }
        }).then((response)=> {
          // 將回傳資料丟置 VueX 儲存資訊
          this.$store.commit('setUserLoggedIn', {
            id_token: response.data.idToken,
            refresh_token: response.data.refreshToken,
            userUid: response.data.localId,
          });
          // 獲得使用者詳細資訊，非 oauth 登入時，使用者資料需從資料庫另外拉
          this.$store.dispatch('getUserInfo',{
            userUid:response.data.localId
          })
          this.closeModal()
        })
        .catch(error => {
          const code = parseInt(error.response &&error.response.status)  //取得status code
          console.log(error.response.data) //取得資料
          console.log("TO DO error !")
        });
      } else {
        // 註冊
        this.$axios({
          method: API.member.registered.method,
          url: API.member.registered.url,
          baseURL:  process.env.google_api_url,
          headers: {
            'Content-Type': 'application/json' 
          },
          data: {
            "password":this.userInfo.password,
            "email":this.userInfo.email,
          }
        }).then((response)=> {
          // 將註冊資料回傳至資料庫
          console.log('response',response);
          this.$store.dispatch("saveMemberInfo",{
            // email: this.userInfo.email,
            userName: this.userInfo.userName,
            picture: this.avatarImg || 'default',
            userUid: response.data.localId
          });

          this.$swal.fire({
            title: '已成功註冊，請重新登入',
            timer: 1500,
          })
          this.closeModal()
        }).catch(error => {
          console.log(error)
        });
      }
    },
    // 使用者頭像上傳
    async fileUpload(e) {
      const formFile = new FormData()
      formFile.append('files', e.target.files[0], e.target.files[0].name)
      const ImgurClient = require('imgur')
      const client = new ImgurClient({ clientId: '187531bde890461' })
      const response = await client.upload({
        image: e.target.files[0]
      })
      this.avatarImg = response.data.link
    },
    logout () {
      this.$store.commit('setUserlogout');
    }
  },
  computed: {
    getUserName (){
      return this.$store.state.userName
    },
    getUserPicture () {
      if(!this.$store.state.userPicture) return "https://bulma.io/images/placeholders/128x128.png"
      return this.$store.state.userPicture
    },
    isUserLoggedIn () {
      return this.$store.state.isUserLoggedIn
    }
  },
  components: {
    Search,
    Menu,
  }
};
</script>

<style lang="scss" scoped>
  @import "./header.scss";

  .w-300{
    width: 200px;
  }
</style>

