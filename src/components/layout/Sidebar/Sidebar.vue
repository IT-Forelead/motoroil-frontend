<script setup>
import TopSidebarItem from './parts/TopSidebarItem.vue';
import MiddleSidebarItem from './parts/MiddleSidebarItem.vue';
import BottomSidebarItem from './parts/BottomSidebarItem.vue';

</script>
<template>
 <div>
  <aside class="col-sm-4 col-md-3 content-aside" id="column-left">
    <TopSidebarItem/>
    <MiddleSidebarItem/>
    <BottomSidebarItem/>
  </aside>
 </div>
</template>
<style scoped>
</style>