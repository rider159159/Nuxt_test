<template>
  <div>
   <Header></Header>
    <div class="container-fluid">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

export default {
  mounted(){
    // console.log('default',Cookie.get("id_token"));
    // 進入頁面判斷是否有 cookie，若有執行 VueX
    if(Cookie.get("id_token")) {
      this.$store.dispatch('getUserInfo',
        Cookie.get("userUid"),
      )
      // this.$store.commit('setUserLoggedIn', {
      //   id_token: Cookie.get("id_token"),
      //   refresh_token: Cookie.get("refresh_token"),
      //   userUid: Cookie.get("userUid"),
      //   userPicture: Cookie.get("userPicture"),
      //   userName: Cookie.get("userName"),
      // });
    }
  },
  data(){
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
