<template>
  <div>
    mock demo
       Select file to upload:
    <input type="file" id="file" ref="file" @change="uploadFile" class="input-file">

<!-- <button type="button" @click.prevent="pet">123</button>
<button type="button" @click.prevent="showForm">showForm</button>

     <form action="http://localhost:3034/api/form" method="post">
     姓名：<input type="text" name="UserName"><br>
     內容：<textarea name="Content"></textarea><br>
     <input type="submit" value="送出表單">
    </form> -->

  </div>
</template>
<script>
import API from '~/api/api.js'

export default {
  layout: 'mock',
  data () {
    return {
      test:this.$qs.stringify({
        UserName: 'value1',
        Content: 'aaaa2'
      })
    }
  },
  methods:{
    uploadFile(){
     let formData = new FormData(); //form重設
     formData.append("videoFile",this.$refs.file.files[0]);
     console.log(this.$refs.file.files[0])
     formData.append("title","title");
     formData.append("description","description");
      this.$axios({
        method: 'post',
        baseURL: 'http://localhost:3034/api/file',
        headers: {
          'Content-Type': 'multipart/form-data' 
        },
        data: formData
      }).then((response)=> {
          console.log(response.data);
      })
    },

    showForm(){
    this.$axios({
      method: 'post',
      baseURL: 'http://localhost:3034/api/form',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      data: this.$qs.stringify({
        UserName: 'value1',
        Content: 'aaaa2'
      })
    }).then((response)=> {
        console.log(response.data);
    })


    },
    getQuery(){
      this.$axios({
        method: 'get',
        baseURL: 'http://localhost:3034/api/pet1?id=2',
      }).then((response)=>{
        console.log(response)
      })
    },
    postParams(){
      this.$axios({
        method: 'post',
        baseURL: 'http://localhost:3034/api/pet2/rydertest',
      }).then((response)=>{
        console.log(response)
      })
    },
    reqBody(){
      this.$axios({
        method: 'post',
        baseURL: 'http://localhost:3034/api/pet3',
        data:{
          id:'123123',
          name:'Ryder'
        },
        
      }).then((response)=>{
        console.log(response)``
      })
    },
    pet(){
      this.$axios({
      method: 'post',
      baseURL: 'http://localhost:3034/api/pet/44',
      data:{
        "id": 0,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }
        }).then((response)=>{
          console.log(response.data)
        })
    },
  },
  created(){
  },
  mounted(){
        console.log(process.env.api_url);

       this.$axios({
      method: 'post',
      url: API.member.exchangeToken.url,
  //  baseURL:  'http://localhost:3034',
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
  computed: {
  },
  components: {
  }
}
</script>
