<script setup>
import { toRefs } from 'vue'
import { useProductStore } from '../../../../stores/product.js'
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const store = useProductStore()

const props = defineProps({
  product: Object
})
const { product } = toRefs(props)

const showProduct = (id) => {
  store.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}
</script>
<template>
  <div class="product-layout">
    <div class="product-item-container item--static">
      <div class="relative h-72 left-block">
        <div class="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <router-link to="/product" target="_self">
            <img :src="API_URL + '/image/' + product.product.imageUrl[0]" class="w-full max-h-full" alt="image1">
          </router-link>
        </div>
        <span class="label-product label-new">New</span>
        <!--quickview-->
        <div class="so-quickview">
          <router-link @click="showProduct(product.product.id)"
            class="iframe-link btn-button quickview quickview_handler visible-lg" to="/product" title="Quick view"><i
              class="fa fa-search"></i><span>Quick
              view</span></router-link>
        </div>
        <!--end quickview-->
      </div>
      <div class="right-block">
        <div class="button-group cartinfo--static">
          <button type="button" class="wishlist btn-button" title="Add to Wish List"><i
              class="fa fa-heart"></i></button>
          <button type="button" class="addToCart" title="Add to cart">
            <span>Add to cart </span>
          </button>
          <button type="button" class="compare btn-button" title="Compare this Product"><i
              class="fa fa-refresh"></i></button>
        </div>
        <h4>
          <router-link to="/product" @click="showProduct(product.product.id)"
            :title="product.productGroup.productGroup.name + ' ' + product.productGroup.viscosityGrade.name" target="_self">
            {{ product.productGroup.productGroup.name + ' ' + product.productGroup.viscosityGrade.name }}</router-link>
        </h4>
        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
          <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span>
        </div>
        <div class="price">
          <span class="price">$48.00</span>
        </div>
        <div class="description item-desc">
          <p>{{ product.productGroup.productGroup.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>