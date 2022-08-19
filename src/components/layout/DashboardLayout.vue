<template>
  <div id="wrapper" class="wrapper-fluid banners-effect-5">
    <Navbar />
    <div class="main-container">
      <div id="content">
        <router-view v-slot="{ Component }">
          <!-- <transition name="fade" mode="out-in"> -->
            <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './Navbar/Navbar.vue';
import Footer from './Footer/Footer.vue';
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}
</style>
