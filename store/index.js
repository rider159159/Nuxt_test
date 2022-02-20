export const state = () => ({
  isUserLoggedIn: false, //是否登入
  userPicture: "", //會員照片
  userName: "", //會員名稱
  userUid: "", //會員 firebase 的 uid
})

export const mutations = {
  set_courses (state, payload) {
    state.courses = payload.courses
  }
}
