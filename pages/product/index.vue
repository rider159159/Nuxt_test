<template>
  <div>
    <h1>商品購物頁面</h1>
    <Carousel></Carousel>
    <Nuxt-child />
  </div>
</template>

<script>
  import API from '~/api/api.js'
export default {
  // middleware: ['auth'],
  data(){
    return{
      productList:[],
    }
  },
  mounted(){
    this.getProduct()
  },
  methods:{
    getProduct(){
        this.$axios({
          method: API.getProduct.method,
          url: API.getProduct.url,
          baseURL:  process.env.api_url,
          headers: {
            'Content-Type': 'application/json' 
          },
        }).then((response)=> {
        })
      // this.$router.push({
      //   name: 'demo-test'
      // });
    }
  }
}
</script>