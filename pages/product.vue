<template>
  <div>
    <h1>商品購物頁面</h1>
    <Carousel></Carousel>
    <Nuxt-child />
  </div>
</template>
<script>
export default {
  methods:{
    test(){
      this.$router.push({
        path: '/'
      });
      // this.$router.push({
      //   name: 'demo-test'
      // });
    }
  }
}
</script>