<template>
  <div>
    <h1>這裡是 demo/ 動態寫法 </h1>
    <p>目前參數是： {{ this.$route.params }}</p>
  </div>
</template>

<script>
export default {
  
  mounted(){
    //網址是動態時，會自動將動態資料綁在 params 上
    // params 會在根據檔名調整 key ，如 index.vue 會是 params.index
    console.log(this.$route.params);
  }
}
</script>