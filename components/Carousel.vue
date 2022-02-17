<template>
  <div>
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="~/assets/img/cat1.jpeg"  class="d-block w-100" alt="~/assets/img/cat1">
          </div>
          <div class="carousel-item">
            <img src="~/assets/img/cat2.jpeg" class="d-block w-100" alt="~/assets/img/cat2">
          </div>
          <div class="carousel-item">
            <img src="~/assets/img/cat3.jpeg" class="d-block w-100" alt="~/assets/img/cat3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.carousel-inner{
  img{
    object-fit: cover;
    height: 500px;
        vertical-align: middle;
  }
}
</style>