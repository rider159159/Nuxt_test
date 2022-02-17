<template>
  <div>
    <CourseList :courses="get_courses"></CourseList>
  <client-only>
    <Datepicker></Datepicker>
  </client-only>
    <!--
    <img src="@/assets/img/demo.png" alt="">
        <div v-for="n in 10" :key="n">
          <nuxt-link
              :to="{
                name: 'demo-newTest',
                params: {
                  id: n
                }
              }">
            動態 nuxt-link {{n}}
          </nuxt-link> 
        </div> 
    <div class="box">
      <div class="pink"></div>
    </div> -->
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

  // async asyncData(context) {
  //   //回傳 data
  //   //  try{
  //   //     let data = await context.$axios("/api/test2")
  //   //     console.log(data,"data.data")
  //   //     return data.data
  //   //   } catch (e) {
  //   //     console.log(e)
  //   //     context.error({ statusCode: 404, message: 'Page not found' })
  //   //   }

  //   // context.error({ statusCode: 500, message: 'Page Error' })

  //   return {
  //     test: "gg",
  //     title: "test",
  //   };
  // },
  data() {
    return {
      test: "",
    };
  },
  mounted() {
    this.axios();
  },
  methods: {
    axios() {
      this.$axios("/api/test").then((res) => {
        this.test = res;
      });
    },
    pushRouter() {
      this.$router.push({
        path: '/demo/test'
      });
      this.$router.push({
        name: "demo-test",
      });
    },
  },
  computed: {
    get_courses() {
      return this.$store.state.courses;
    },
  },
};
</script>
<style lang="scss">
</style>
