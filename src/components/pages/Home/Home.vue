<script setup>
import BlogsSection from './parts/BlogsSection.vue'
import SoCategoriesSection from './parts/SoCategoriesSection.vue'
import ArrivalsSection from './parts/ArrivalsSection.vue'
import DealsSection from './parts/DealsSection.vue'
import BestSellerSection from './parts/BestSellerSection.vue'
import TopContentSection from './parts/TopContentSection.vue'
import FavoriteProductsSection from './parts/FavoriteProductsSection.vue'
import TopViewedProductsSection from './parts/TopViewedProductsSection.vue'
import { onMounted } from '@vue/runtime-core'
import { useAnalyticsStore } from '../../../stores/analytics'
import { useAuthStore } from '../../../stores/auth'

onMounted(() => {
  let eventData = {}
  if (useAuthStore().userId) {
    eventData = {
      name: 'pageVisited',
      visitorId:
        localStorage.getItem('visitorId') || useAnalyticsStore().visitorId,
      userId: useAuthStore().userId,
      page: 'home',
    }
  } else {
    eventData = {
      name: 'pageVisited',
      visitorId:
        localStorage.getItem('visitorId') || useAnalyticsStore().visitorId,
      page: 'home',
    }
  }
  useAnalyticsStore().saveEvent(eventData)
})
</script>
<template>
  <TopContentSection />
  <div class="content-main-w">
    <BestSellerSection />
    <DealsSection />
    <ArrivalsSection />
    <FavoriteProductsSection />
    <TopViewedProductsSection />
    <!-- <SoCategoriesSection /> -->
    <BlogsSection />
  </div>
</template>
<style scoped></style>
