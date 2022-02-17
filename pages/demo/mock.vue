<template>
  <div>
    mock demo
  </div>
</template>
<script>
export default {
  layout: 'mock',
  data () {
    return {
    }
  },
  created(){
  },
  mounted(){
    this.$axios({
      // headers: {
      //   'RyderCC': 'Basic 123456'
      // },
      method: 'post',
      baseURL: 'http://localhost:3034/api/pet?id=2',
    }).then((response)=>{
      console.log(response)
    })
  },
  computed: {
  },
  methods: {
  },
  components: {
  }
}
</script>
