import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  getToken,
  removeToken
} from './auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 50000
})

service.interceptors.request.use(
  (config) => {
    const token = getToken();
    token && (config.headers['X-Token'] = token);
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data && response.data.result) {
      const firstIreKeyList = Object.keys(response.data.result);
      firstIreKeyList.forEach((resultItemKey) => {
        response.data.result[resultItemKey] = typeof response.data.result[resultItemKey] === 'string' ? response.data.result[resultItemKey].trim() : response.data.result[resultItemKey];
        if(response.data.result[resultItemKey]) {
          let secondIreKeyList =  Object.keys(response.data.result[resultItemKey])
          if(typeof response.data.result[resultItemKey] !=='string' && secondIreKeyList  && Array.isArray(secondIreKeyList) && secondIreKeyList.length> 0) {
            secondIreKeyList.forEach((secondItemKey)=>{
              response.data.result[resultItemKey][secondItemKey] = typeof response.data.result[resultItemKey][secondItemKey] === 'string' ? response.data.result[resultItemKey][secondItemKey].trim() : response.data.result[resultItemKey][secondItemKey];
            })
          }
        }
      });
    }

    if (response.data && response.data.data) {
      const firstIreKeyList = Object.keys(response.data.data);
      firstIreKeyList.forEach((resultItemKey) => {
        response.data.data[resultItemKey] = typeof response.data.data[resultItemKey] === 'string' ? response.data.data[resultItemKey].trim() : response.data.data[resultItemKey];
        if(response.data.data[resultItemKey]) {       
          let secondIreKeyList = Object.keys(response.data.data[resultItemKey])
          if(typeof response.data.data[resultItemKey] !=='string' && secondIreKeyList &&  Array.isArray(secondIreKeyList) && secondIreKeyList.length> 0) {
            secondIreKeyList.forEach((secondItemKey)=>{
              response.data.data[resultItemKey][secondItemKey] = typeof response.data.data[resultItemKey][secondItemKey] === 'string' ? response.data.data[resultItemKey][secondItemKey].trim() : response.data.data[resultItemKey][secondItemKey];
            })
          }
        }
      });
    }
    if (response.data.code !== 200) {
      Vue.prototype.$swal.fire({
        icon: 'error',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
    return response
  },
  (error) => {
    console.log(JSON.stringify(error))
    const {
      response
    } = error;

    if (response) {
      errorHandle(response.status, response);
      return Promise.reject(error);
    } else {
      return Promise.reject(error)
    }
  }
)

const errorHandle = (status, response) => {
  switch (status) {
    case 401:
      if (response.config.url !== "s7x_SysMessage/LoadMsg") {
        tokenExpire();
      }
      break;

    case 404:
      window.$nuxt.$router.replace('/404')
      break;

    default:
      console.log(response);
      break;
  }
}

const tokenExpire = () => {
  // 白名單就過，不是就跳登入頁
  // console.log(window.$nuxt.$route.path, window.$nuxt.$route.matched[0]?.path);
  let whiteList = ['/login','/login/userLogin','/login/userLogin/Student','/login/userLogin/Teacher','/login/userLogin/Admin', '/useAgree', '/', '/reserve', '/introduce', '/news', '/about', '/faq', '/doc', '/404'];
  if (whiteList.includes(window.$nuxt.$route.path) == -1 || whiteList.includes(window.$nuxt.$route.matched[0]?.path) == -1) {
    if (window.$nuxt.$route.path !== "/login") {
      Swal.fire({
        icon: "warning",
        title: '登入逾時...請重新登入',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          removeToken()
          window.$nuxt.$router.replace("/login")
        }
      })
    }
  }
}

export default service