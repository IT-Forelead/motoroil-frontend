<script setup>
import ContentBox from './SoCategories/ContentBox.vue'
</script>
<template>
  <div class="row-cates">
    <div id="so_categories_11"
      class="so-categories module theme2 cates-layout1 container preset01-3 preset02-2 preset03-2 preset04-2 preset05-1">
      <div class="pre_text">{{$t('topFeaturedCollections')}}</div>
      <h3 class="modtitle"><span>{{$t('shopByCategories')}}</span></h3>
      <div class="modcontent">
        <div class="cat-wrap theme2">
          <ContentBox v-for="i in 6" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>