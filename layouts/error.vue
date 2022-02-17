<template>
  <div >
    {{error}}
    error 錯誤頁面
  </div>
</template>
<script>
export default {
  //錯誤頁面，props 同樣由後端傳來
  props:['error']
}
</script>