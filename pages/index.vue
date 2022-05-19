<template>
  <div>
    <CourseList :courses="get_courses"></CourseList>
  <client-only>
    <Datepicker></Datepicker>
  </client-only>
  </div>
</template>

<script>
import API from '~/api/api.js'
export default {
  async asyncData(context) {
    context.$axios({
      method: 'post',
      url: API.member.exchangeToken.url,
      baseURL:  'http://localhost:3034',
      headers: {
        'Content-Type': 'application/json' 
      },
      data: {}
    }).then((response)=>{
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    });
  },
  data() {
    return {
      test: "",
    };
  },
  mounted() {
    console.log('new');
  },
  methods: {
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
