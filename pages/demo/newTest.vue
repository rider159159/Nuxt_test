<template>
  <div>
    <h1>這裡是 new</h1>
    <!-- <p>{{ $route}}</p> -->
  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this.$route);
  }
}
</script>