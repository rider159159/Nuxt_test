// // export default service
// import Vue from 'vue';
// import axios from 'axios';

// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API,
//   withCredentials: true,
//   timeout: 50000
// })

// service.interceptors.request.use(
// )

// service.interceptors.response.use(
//   (response) => {

//   },
//   (error) => {

    
//     console.log(JSON.stringify(error))
//     const {
//       response
//     } = error;

//     if (response) {
//       errorHandle(response.status, response);
//       return Promise.reject(error);
//     } else {
//       return Promise.reject(error)
//     }
//   }
// )
// export default service
