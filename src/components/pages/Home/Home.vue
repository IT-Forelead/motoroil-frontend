<script setup>
import BlogsSection from './parts/BlogsSection.vue';
import SoCategoriesSection from './parts/SoCategoriesSection.vue';
import ArrivalsSection from './parts/ArrivalsSection.vue';
import DealsSection from './parts/DealsSection.vue';
import BestSellerSection from './parts/BestSellerSection.vue';
import TopContentSection from './parts/TopContentSection.vue';

</script>
<template>
  <TopContentSection />
  <div class="content-main-w">
    <BestSellerSection />
    <DealsSection />
    <ArrivalsSection />
    <SoCategoriesSection />
    <BlogsSection />
  </div>
</template>
<style scoped>
</style>