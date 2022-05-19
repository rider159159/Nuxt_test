<template>
  <div>
    <br>
    <div class="testImg"></div>
    <button @click="pushRouter">切換 router</button>
    <img src="@/assets/img/demo.png" alt=""> 
    <div class="box">
      <div class="pink"></div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData (context) { //打ajax (async await)
    let test = await context.$axios("/api/test");
    // 回傳回來會是 正式 res 
    // 上下文物件
    return test.data
  },

  data(){
    return{
      test:'',
      }
    },
  mounted(){
    this.axios()
  },
  methods:{
    axios(){
      // this.$axios('/api/test').then((res)=>{
      //   this.test = res
      // })
    },
    pushRouter(){
    //   this.$router.push({
    //     path: '/demo/test'
    //   });
      this.$router.push({
        name: 'demo-test'
      });
    }
  }
}
</script>
<style lang="scss" >
  // .box{

  //   .pink{
  //     background: pink;
  //         width: 50px;
  //   display: block;
  //   height: 50px;
  //   }
  // }
</style>