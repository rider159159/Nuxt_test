<template>
  <div>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
  開啟註冊彈窗
</button>

<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
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
export default {
  data(){
    return{
      email:'',
      password:'',
    }
  },
  methods:{
       loginModalSubmit(){
    // if(data.modalTyple == "login"){
    //   this.$axios({
    //     method: 'post',
    //     baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.firebaseApiKey,
    //     headers: {
    //       'Content-Type': 'application/json' 
    //     },
    //     data: {
    //       ...data,
    //       returnSecureToken: true
    //     }
    //   }).then((response)=> {
    //     console.log(response.data);
    //     this.openModal =false
    //   }).catch(error => {
    //       console.log(error)
    //   });
    // }
    // if(data.modalTyple == "registered"){
    // }
      this.$axios({
        method: 'post',
        baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.firebaseApiKey,
        headers: {
          'Content-Type': 'application/json' 
        },
        data: {
          "password":this.password,
          "email":this.email
        }
      }).then((response)=> {
        console.log(response.data);
        this.openModal =false
      }).catch(error => {
          console.log(error)
      });
}
  },

}
</script>

<style>

</style>