export default function ({ $axios, redirect, error }) {

  //$axios.setHeader('Authorization', '123');//也可以用這種方式設定
  $axios.setBaseURL(process.env.api_url)

    console.log(process.env.api_url);

  
  //每次請求時全域觸發
  $axios.onRequest(config => {
    console.log(config,"config")
  })

  $axios.onResponse(config => {
    console.log(config,"config")
  })
  $axios.onError(data => {
    const code = parseInt(data.response && data.response.status)
    if (code === 500) {
      error('500')
    }
  })
}

