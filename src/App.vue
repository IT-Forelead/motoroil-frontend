<script setup>
import Navbar from './components/layout/Navbar/Navbar.vue';
import Footer from './components/layout/Footer/Footer.vue';
import Home from './components/pages/Home/Home.vue';

</script>

<template>
  <div id="wrapper" class="wrapper-fluid banners-effect-5">
    <Navbar />
    <div class="main-container">
      <div id="content">
        <Home />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
</style>
