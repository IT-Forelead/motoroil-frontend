<script setup>
import BestSellerItem from './BestSeller/BestSellerItem.vue'
</script>
<template>
  <div class="container">
    <div class="module extra-layout1">
      <div class="pre_text">
        Top sale in the week
      </div>
      <h3 class="modtitle"><span>Best Seller</span></h3>
      <div class="modcontent">
        <div class="row">
          <div class="col-md-3" style="padding: 0; text-align: center; margin: 15px 0;" v-for="i in 8" :key="i">
            <BestSellerItem/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>