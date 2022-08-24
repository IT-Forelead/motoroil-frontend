<script setup>
import { computed, onMounted, ref } from 'vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import { useProductStore } from '../../../stores/product.js'
import { formatDateTime } from '../../../mixins/utils.js';
import { Swiper, SwiperSlide } from "swiper/vue";
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()

const product = ref('')
const rating = ref(0)
const selectedImage = ref('')

onMounted(() => {
  store.getSingleProduct(sessionStorage.getItem('sp_id')).then((data) => {
    product.value = store.singleProduct
    rating.value = Number(store.singleProduct?.product?.rating)
  }).catch((err) => {
    console.log(err);
  })
  store.getOemsAndSpecsByProductId(sessionStorage.getItem('sp_id'))
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const setImageFull = (img) => selectedImage.value = img

const isActiveDesc = ref(true)
const isActiveRew = ref(false)

const changeActiveTab = (tab) => {
  if (tab === 'desc') {
    isActiveDesc.value = true
    isActiveRew.value = false
  }
  else {
    isActiveRew.value = true
    isActiveDesc.value = false
  }
}
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
      <li><a href="#">{{ product?.productGroup?.name + ' ' + product?.viscosityGrade?.name }}</a>
      </li>
    </ul>
    <div class="row">
      <Sidebar />
      <div id="content" class="col-md-9 col-sm-8">
        <div class="product-view row">
          <div class="left-content-product">
            <div class="content-product-left class-honizol col-md-5 col-sm-12 col-xs-12">
              <div class="relative h-[300px] large-image">
                <img class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  :src="selectedImage ? `${API_URL}/image/${selectedImage}` : `${API_URL}/image/${product?.product?.imageUrl[0]}`"
                  title="Chicken swinesha" alt="Chicken swinesha">
                <a class="absolute text-5xl right-10 bottom-10"><i class="fa fa-youtube-play"></i></a>
              </div>
              <swiper :slidesPerView="4" :spaceBetween="20" :pagination="{ clickable: true }"
                :scrollbar="{ hide: true }" class="mt-5 mySwiper" style="height: 75px;">
                <swiper-slide v-for="(image, idx) in product?.product?.imageUrl" :key="idx" @click="setImageFull(image)"
                  class="relative border cursor-pointer" :class="{ 'border-red-500': image === selectedImage }">
                  <img :src="`${API_URL}/image/${image}`" alt="Product Image"
                    class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                </swiper-slide>
              </swiper>
            </div>
            <div class="content-product-right col-md-7 col-sm-12 col-xs-12">
              <div class="title-product">
                <h1>{{ product?.productGroup?.name + ' ' + product?.viscosityGrade?.name }}</h1>
              </div>
              <div class="box-review form-group">
                <div class="ratings">
                  <div class="space-x-2 rating-box">
                    <span v-for="r1 in rating" :key="r1" class="fa fa-stack">
                      <i class="text-2xl fa fa-star fa-stack-1x"></i>
                    </span>
                    <span v-for="r2 in (5 - rating)" :key="r2" class="fa fa-stack">
                      <i class="text-2xl fa fa-star-o fa-stack-1x"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="product-label form-group">
                <div class="flex space-x-2 product_page_price price">
                  <span class="price-new">€ {{ product?.product?.price.toLocaleString('en-US') + '.00' }}</span>
                </div>
                <div class="stock">
                  <span>Availability:</span>
                  <span v-if="product?.product?.quantity !== 0" class="status-stock">In Stock</span>
                  <span v-else class="status-stock">Not Stock</span>
                </div>
              </div>
              <div class="product-box-desc">
                <div class="inner-box-desc">
                  <div><span>Capacity (L):</span> {{ product?.product?.specTypeValue?.value }} </div>
                  <div><span>Viscosity Grade:</span> {{ product?.viscosityGrade?.name }}</div>
                  <div><span>Brand:</span> {{ product?.brand?.name }}</div>
                  <div><span>OEM-Freigabe:</span> {{ store.oemsAndSpecsByProductId?.oems?.map(o => o.name).join(', ') }}
                  </div>
                  <div><span>Spezifikation:</span> {{ store.oemsAndSpecsByProductId?.specifications?.map(o =>
                      o.name).join(', ')
                  }}</div>
                  <div><span>View:</span> {{ product?.product?.views }}</div>
                  <div><span>Likes:</span> {{ product?.product?.likes }}</div>
                  <div><span>Orders:</span> {{ product?.product?.orders }}</div>
                </div>
              </div>
              <div id="product">
                <h4>Available Options</h4>
                <div class="box-checkbox form-group required">
                  <div id="input-option232">
                    <div class="checkbox">
                      <label for="checkbox_1"><input type="checkbox" name="option[232][]" value="36" id="checkbox_1">
                        Checkbox 1 (+$12.00)</label>
                    </div>
                    <div class="checkbox">
                      <label for="checkbox_2"><input type="checkbox" name="option[232][]" value="36" id="checkbox_2">
                        Checkbox 2 (+$36.00)</label>
                    </div>
                    <div class="checkbox">
                      <label for="checkbox_3"><input type="checkbox" name="option[232][]" value="36" id="checkbox_3">
                        Checkbox 3 (+$24.00)</label>
                    </div>
                    <div class="checkbox">
                      <label for="checkbox_4"><input type="checkbox" name="option[232][]" value="36" id="checkbox_4">
                        Checkbox 4 (+$48.00)</label>
                    </div>
                  </div>
                </div>
                <div class="form-group box-info-product">
                  <div class="option quantity">
                    <div class="input-group quantity-control" unselectable="on" style="-webkit-user-select: none;">
                      <label>Qty</label>
                      <input class="form-control" type="text" name="quantity" value="1">
                      <input type="hidden" name="product_id" value="50">
                      <span class="input-group-addon product_quantity_down">−</span>
                      <span class="input-group-addon product_quantity_up">+</span>
                    </div>
                  </div>
                  <div class="cart">
                    <input type="button" data-toggle="tooltip" title="" value="Add to Cart"
                      data-loading-text="Loading..." id="button-cart" class="btn btn-mega btn-lg"
                      onclick="cart.add('42', '1');" data-original-title="Add to Cart">
                  </div>
                  <div class="add-to-links wish_comp">
                    <ul class="blank list-inline">
                      <li class="wishlist">
                        <a class="icon" data-toggle="tooltip" title="" onclick="wishlist.add('50');"
                          data-original-title="Add to Wish List"><i class="fa fa-heart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Product Tabs -->
        <div class="producttab">
          <div class="tabsslider vertical-tabs col-xs-12">
            <ul class="nav nav-tabs col-lg-2 col-sm-3">
              <li :class="{ 'active': isActiveDesc }" @click="changeActiveTab('desc')"><a href="#desc">Description</a>
              </li>
              <li :class="{ 'active': isActiveRew }" @click="changeActiveTab('rew')"><a href="#desc">Reviews (1)</a>
              </li>
            </ul>
            <div class="tab-content col-lg-10 col-sm-9 col-xs-12">
              <div class="tab-pane fade" :class="{ 'active in': isActiveDesc }"
                v-html="product?.productGroup?.description"></div>
              <div class="tab-pane fade" :class="{ 'active in': isActiveRew }" id="rew">
                <form>
                  <div id="review">
                    <table class="table table-striped table-bordered">
                      <tbody>
                        <tr>
                          <td style="width: 50%;"><strong>Super Administrator</strong></td>
                          <td class="text-right">29/07/2015</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <p>Best this product opencart</p>
                            <div class="ratings">
                              <div class="rating-box">
                                <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i
                                    class="fa fa-star-o fa-stack-1x"></i></span>
                                <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i
                                    class="fa fa-star-o fa-stack-1x"></i></span>
                                <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i
                                    class="fa fa-star-o fa-stack-1x"></i></span>
                                <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i
                                    class="fa fa-star-o fa-stack-1x"></i></span>
                                <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i></span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="text-right"></div>
                  </div>
                  <h2 id="review-title">Write a review</h2>
                  <div class="contacts-form">
                    <div class="form-group"> <span class="icon icon-user"></span>
                      <input type="text" name="name" class="form-control" value="Your Name"
                        onblur="if (this.value == '') {this.value = 'Your Name';}"
                        onfocus="if(this.value == 'Your Name') {this.value = '';}">
                    </div>
                    <div class="form-group"> <span class="icon icon-bubbles-2"></span>
                      <textarea class="form-control" name="text"
                        onblur="if (this.value == '') {this.value = 'Your Review';}"
                        onfocus="if(this.value == 'Your Review') {this.value = '';}">Your Review</textarea>
                    </div>
                    <span style="font-size: 11px;"><span class="text-danger">Note:</span> HTML is not translated!</span>

                    <div class="form-group">
                      <b>Rating</b> <span>Bad</span>&nbsp;
                      <input type="radio" name="rating" value="1"> &nbsp;
                      <input type="radio" name="rating" value="2"> &nbsp;
                      <input type="radio" name="rating" value="3"> &nbsp;
                      <input type="radio" name="rating" value="4"> &nbsp;
                      <input type="radio" name="rating" value="5"> &nbsp;<span>Good</span>

                    </div>
                    <div class="clearfix buttons"><a id="button-review" class="btn buttonGray">Continue</a></div>
                  </div>
                </form>
              </div>
              <div id="tab-4" class="tab-pane fade">
                <a href="#">Monitor</a>,
                <a href="#">Apple</a>
              </div>
              <div id="tab-5" class="tab-pane fade">
                <h3 class="custom-color">Take a trivial example which of us ever undertakes</h3>
                <p>Lorem ipsum dolor sit amet, consetetur
                  sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua.
                  At vero eos et accusam et justo duo
                  dolores et ea rebum. Stet clita kasd
                  gubergren, no sea takimata sanctus est
                  Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet, consetetur sadipscing
                  elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore et dolore magna aliquyam
                  erat, sed diam voluptua. </p>
                <p>At vero eos et accusam et justo duo dolores
                  et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum
                  dolor sit amet. Lorem ipsum dolor sit
                  amet, consetetur sadipscing elitr.</p>
                <ul class="marker-simple-list two-columns">
                  <li>Nam liberempore</li>
                  <li>Cumsoluta nobisest</li>
                  <li>Eligendptio cumque</li>
                  <li>Nam liberempore</li>
                  <li>Cumsoluta nobisest</li>
                  <li>Eligendptio cumque</li>
                </ul>
                <p>Sed diam nonumy eirmod tempor invidunt
                  ut labore et dolore magna aliquyam erat,
                  sed diam voluptua. At vero eos et accusam
                  et justo duo dolores et ea rebum. Stet
                  clita kasd gubergren, no sea takimata
                  sanctus est Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>