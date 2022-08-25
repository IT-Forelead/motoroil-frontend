<script setup>
import TopFooter from './parts/TopFooter.vue';
import MiddleFooter from './parts/MiddleFooter.vue';
import BottomFooter from './parts/BottomFooter.vue';
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
<template>
  <footer class="w-full mt-5">
    <TopFooter />
    <MiddleFooter />
    <BottomFooter />
    <div class="back-to-top" @click="scrollToTop()"><i class="fa fa-angle-up"></i></div>
  </footer>
</template>
<style scoped>
</style>