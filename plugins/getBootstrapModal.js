import Vue from 'vue'
import { Modal } from 'bootstrap'
// console.log(Modal);
Vue.mixin({
  methods: {
    getBootstrapModal(id) {
      return new Modal(id)
    },
  },
})