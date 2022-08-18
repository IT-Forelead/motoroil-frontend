<script setup>
import ArrivalItem from "./ArrivalItem.vue";
</script>
<template>
  <div class="module extra-layout1">
    <div class="pre_text">
      Top sale in the week
    </div>
    <h3 class="modtitle"><span>New Arrivals</span></h3>
    <div class="modcontent">
      <div class="row">
        <div class="col-md-3" style="padding: 0; text-align: center; margin: 15px 0;" v-for="i in 8" :key="i">
          <ArrivalItem />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>