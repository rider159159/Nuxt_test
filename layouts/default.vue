<template>
  <div>
   <Header 
      @loginClick="loginClick" 
      @registeredClick="registeredClick" 
      title="wayne1894 教學網"
    ></Header>
    <div class="container-fluid">
      <div class="row">
        <nav
          id="sidebarMenu"
          class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <span data-feather="home"></span>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file"></span>
                  Orders
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  Products
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="users"></span>
                  Customers
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="bar-chart-2"></span>
                  Reports
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="layers"></span>
                  Integrations
                </a>
              </li>
            </ul>

            <h6
              class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
              <span>Saved reports</span>
              <a class="link-secondary" href="#" aria-label="Add a new report">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Current month
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Last quarter
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Social engagement
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Year-end sale
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Nuxt />
        </main>
      </div>
    </div>
    <!-- <LayoutFooter></LayoutFooter> -->
      <ModalLoginModal
      v-if="openModal" 
      @loginModalSubmit="loginModalSubmit" 
      :modalTyple="modalTyple" 
      :openModal.sync="openModal" 
    ></ModalLoginModal>

  </div>
</template>

<script>
   import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

export default {
mounted(){
    if(this.$route.query.id_token && this.$route.query.refresh_token){
      // let id_token_Decode = jwtDecode(this.$route.query.id_token);
      // this.$store.commit('setUserLoggedIn', {
      //   id_token: this.$route.query.id_token,
      //   refresh_token: this.$route.query.refresh_token,
      //   userUid: id_token_Decode.user_id,
      //   userPicture: id_token_Decode.picture,
      //   userName: id_token_Decode.name,
      // });
      window.history.replaceState(null, null, window.location.pathname);
      return
    }
    if(Cookie.get("id_token")) {
      this.$store.commit('setUserLoggedIn', {
        id_token: Cookie.get("id_token"),
        refresh_token: Cookie.get("refresh_token"),
        userUid: Cookie.get("userUid"),
        userPicture: Cookie.get("userPicture"),
        userName: Cookie.get("userName"),
      });          
   }

  },

data () {
    return {
      openModal: false,
      modalTyple: ""
    }
  },
 methods:{
    loginClick(){
      this.openModal = !this.openModal;
      this.modalTyple = "login"
    },
    registeredClick(){
      this.openModal = !this.openModal;
      this.modalTyple = "registered"
    },
       loginModalSubmit(data){
    if(data.modalTyple == "login"){
      this.$axios({
        method: 'post',
        baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.firebaseApiKey,
        headers: {
          'Content-Type': 'application/json' 
        },
        data: {
          ...data,
          returnSecureToken: true
        }
      }).then((response)=> {
        console.log(response.data);
        this.openModal =false
      }).catch(error => {
          console.log(error)
      });
    }
    if(data.modalTyple == "registered"){
      this.$axios({
        method: 'post',
        baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.firebaseApiKey,
        headers: {
          'Content-Type': 'application/json' 
        },
        data: {
          ...data,
          returnSecureToken: true
        }
      }).then((response)=> {
        console.log(response.data);
        this.openModal =false
      }).catch(error => {
          console.log(error)
      });
    }
}
  },
};
</script>

<style lang="scss" scoped></style>
