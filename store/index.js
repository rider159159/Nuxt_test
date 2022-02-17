export const state = () => ({
  courses:[]
})
export const mutations = {
  set_courses (state, payload) {
    state.courses = payload.courses
  }
}
