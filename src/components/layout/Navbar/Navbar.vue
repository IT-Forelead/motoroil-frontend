<script setup>
import TopNavbar from './parts/TopNavbar.vue'
import MiddleNavbar from './parts/MiddleNavbar.vue'
import BottomNavbar from './parts/BottomNavbar.vue'
import { onMounted } from '@vue/runtime-core'
import { uuid } from 'vue-uuid'
import { useAnalyticsStore } from '../../../stores/analytics'

onMounted(() => {
  if (!localStorage.getItem('VisitorId')) {
    useAnalyticsStore().setVisitorId(uuid.v4())
  }
})
</script>
<template>
  <header class="w-full">
    <TopNavbar class="fixed top-0 z-20 w-full" />
    <MiddleNavbar class="mt-12" />
    <BottomNavbar />
  </header>
</template>
<style scoped></style>
