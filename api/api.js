const API = {
  member:{
    //會員登入 with email / password
    login: {
      url: "/v1/accounts:signInWithPassword",
      method: "post"
    },
    //會員註冊 with email / password
    registered: {
      url: "/v1/accounts:signUp",
      method: "post"
    },
    //使用 refresh token 換取 ID token
    exchangeToken: {
      url: "/v1/token",
      method: "post"
    },
    //獲得使用者資訊
    getUserInfo:{
      url: "users/:user_id.json",
      method: "get",
    },
  },
  getProduct:{
    url: "/product.json",
    method: "get"
  },
  //取得課程資訊
  getCourses: {
    url: "/courses/:id.json",
    method: "get"
  },
  //取得課程資訊 - 首頁列表
  getCoursesList: {
    url: "/courses.json",
    method: "get"
  },
  //取得課程內容
  getCoursesItem: {
    url: "/courses_item/:id.json",
    method: "get"
  },
  //新增/編輯會員資料
  patchMemberInfo: {
    url: "/users/:user_id.json",
    method: "patch"
  },
  //取得會員資料
  getMemberInfo: {
    url: "/users/:user_id.json",
    method: "get"
  },
};

module.exports = API; //這邊用 node 的寫法，mock 才能呼叫

