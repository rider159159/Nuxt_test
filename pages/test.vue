<template>
  <div>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-whatever="@mdo">
  開啟註冊彈窗
</button>

<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body test">
        test
        <a href="/auth/" class="button is-fullwidth google">
          <span>使用 google 帳號 </span>
        </a>
        <input v-model="email" placeholder="請輸入 email" type="email" >
        <input v-model="password" placeholder="請輸入 password" type="password" >
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="loginModalSubmit" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import API  from '~/api/api.js'

export default {
  data(){
    return{
      email:'',
      password:'',
    }
  },
  methods:{
    loginModalSubmit(){
      this.$axios({
        method: API.member.login.method,
        url: API.member.login.url,
        baseURL:  process.env.google_api_url,
        headers: {
          'Content-Type': 'application/json' 
        },
        data: {
          "password":this.password,
          "email":this.email
        }
      }).then((response)=> {
        this.openModal =false
        this.$store.commit('setUserLoggedIn', {
        id_token: response.data.idToken,
        refresh_token: response.data.refreshToken,
        userUid: response.data.localId,
        userName: response.data.email,
      });
      }).catch(error => {
        const code = parseInt(error.response &&error.response.status)  //取得status code
        console.log(code);
        console.log(error.response.data) //取得資料
        console.log("TO DO error !")
      });
    }
  },
  mounted(){
    // this.loginModalSubmit()
    console.log('test');
  }

}
</script>

<style>

</style>