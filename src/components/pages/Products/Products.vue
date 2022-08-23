
<script setup>
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import ProductsSection from './parts/ProductsSection.vue';
</script>
<template>
  <div class="container main-container">
    <ul class="breadcrumb">
      <li>
        <router-link to="/"><i class="fa fa-home"></i></router-link>
      </li>
      <li>
        <router-link to="/products">Products</router-link>
      </li>
    </ul>
    <div class="row">
      <Sidebar />
      <div class="col-md-9 col-sm-8">
        <div class="flex items-center justify-between mb-5">
          <h3 class="flex-1 text-3xl font-bold">Our Products</h3>
          <div class="flex items-center flex-5">
            <label class="mb-0 mr-3 text-3xl control-label" for="input-sort"><i class="fa fa-filter"></i></label>
            <select class="p-0 text-xl border-none form-control">
              <option value="" selected="selected">Default</option>
              <option value="">Name (A - Z)</option>
              <option value="">Name (Z - A)</option>
              <option value="">Price (Low &gt; High)</option>
              <option value="">Price (High &gt; Low)</option>
              <option value="">Rating (Highest)</option>
              <option value="">Rating (Lowest)</option>
              <option value="">Model (A - Z)</option>
              <option value="">Model (Z - A)</option>
            </select>
          </div>
        </div>
        <ProductsSection />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>