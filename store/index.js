import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import API from '~/api/api.js'

export const state = () => ({
  isUserLoggedIn: false, //是否登入
  userPicture: "", //會員照片
  userName: "", //會員名稱
  userUid: "", //會員 firebase 的 uid
})
export const actions = {

  nuxtServerInit ({ commit }, context) {
    console.log('context',context.req.headers.cookie)
    //這邊是給 Oauth 回來時提早觸發
    // Oauth 回來後，用 setUserLoggedIn 儲存至前端
    if(context.query.id_token && context.query.refresh_token){
      let id_token_Decode = jwtDecode(context.query.id_token); 
        commit('setUserLoggedIn', {
          id_token: context.query.id_token,
          refresh_token: context.query.refresh_token,
          userUid: id_token_Decode.user_id,
          userPicture: id_token_Decode.picture,
          userName: id_token_Decode.name,
        });
        // Oauth cookie 儲存前端，同時也要儲存 nuxt serve 端
        context.app.$cookies.set("id_token",context.query.id_token);
        context.app.$cookies.set("refresh_token",context.query.refresh_token);
        context.app.$cookies.set("userUid",id_token_Decode.user_id);
        context.app.$cookies.set("userPicture",id_token_Decode.picture);
        context.app.$cookies.set("userName",id_token_Decode.name);
        // 使用套件後改成以上寫法
        // context.res.setHeader('Set-Cookie', [
        //   `id_token=${context.query.id_token}`,
        //   `refresh_token=${context.query.id_token}`,
        //   `userUid=${id_token_Decode.user_id}`,
        //   `userPicture=${id_token_Decode.picture}`,
        //   `userName=${escape(id_token_Decode.name)}`
        // ]);
      return
    }
    // 有 cookie 就判斷是登入
    if(context.app.$cookies.get('id_token')){
      //獲得 Serve 端 cookie ，這邊無法在前端看到，用 commit 進入下一個 mutations 後才能看見
      let picture = context.app.$cookies.get('userPicture');
      let name = context.app.$cookies.get('userName');
      let uid = context.app.$cookies.get('userUid');
      commit('setUserLoggedIn',{
        userPicture: picture,
        userName: name,
        userUid : uid
      });  
    }
  },
}
  
  

export const mutations = {
  setUserLoggedIn: (state, payload) => {
    state.isUserLoggedIn = true;
    console.log('userPicture',state.userName);
    state.userPicture = payload.userPicture || "https://bulma.io/images/placeholders/128x128.png";
    state.userName =payload.userName;
    state.userUid = payload.userUid;
    if(process.client){
      Cookie.set("id_token",payload.id_token);
      Cookie.set("refresh_token",payload.refresh_token);
      Cookie.set('userUid', state.userUid);
      Cookie.set('userPicture', state.userPicture); 
      Cookie.set('userName', state.userName);
    }
  },
  set_courses (state, payload) {
    state.courses = payload.courses
  },
  setUserlogout: (state, payload) =>{
    state.isUserLoggedIn = false;
    state.userPicture = "",
    state.userName = ""
    Cookie.remove('id_token');
    Cookie.remove('refresh_token');
    Cookie.remove('userUids');
    Cookie.remove('userPicture'); 
    Cookie.remove('userName');
    // $nuxt.$router.push({ name: 'index' });
  },
}