<template>
  <div>
    <h1>這裡是 new</h1>
        <CourseList :courses="get_courses"></CourseList>

    <!-- <p>{{ $route}}</p> -->
  </div>
</template>
<script>
export default {
  fetch(context){
    return context.$axios("api/course").then((data)=>{
      console.log(data)
      context.store.commit("set_courses",{
        ...data.data
      })
    })
  },
  mounted(){
    console.log(this.$route);
  },
   middleware: ['auth'],
  computed: {
    get_courses() {
      return this.$store.state.courses;
    },
  },
}
</script>