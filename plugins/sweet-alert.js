import Swal from 'sweetalert2'

const defaultSwal = Swal.mixin({
    timer: 1500,
    timerProgressBar: true,
})

// Vue.prototype.$swal = defaultSwal;

export default (ctx,inject) => {
  inject('swal',defaultSwal)
}