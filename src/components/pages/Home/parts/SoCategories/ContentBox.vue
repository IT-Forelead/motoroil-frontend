<script setup>
</script>
<template>
  <div class="content-box">
    <div class="inner">
      <div class="parent-cat">
        <div class="image-cat">
          <!-- <a href="#"><img src="/src/assets/image/catalog/demo/category/cate1.jpg" alt="image" /></a> -->
        </div>
      </div>
      <div class="cat-title"><a href="#">{{$t('wheelsAndTires')}}</a></div>
      <div class="child-cat">
        <div class="child-cat-title"><a href="#">{{$t('tires')}}</a></div>
        <div class="child-cat-title"><a href="#">{{$t('tiresChains')}}</a></div>
        <div class="child-cat-title"><a href="#">{{$t('tiresAccessories')}}</a></div>
        <div class="child-cat-title"><a href="#">{{$t('wheels')}}</a></div>
        <div class="child-cat-title"><a href="#">{{$t('wheelsAccessories')}}</a></div>
        <a class="viewmore" href="#">{{$t('viewMore')}}</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>