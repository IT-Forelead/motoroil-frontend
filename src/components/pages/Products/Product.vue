<script setup>
import { ref } from '@vue/reactivity';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';

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
      <!-- <li><a href="#">{{ store.singleProduct.title }}</a></li> -->
    </ul>
    <div class="row">
      <Sidebar />
      <div id="content" class="col-md-9 col-sm-8">
        <div class="product-view row">
          <div class="left-content-product">
            <div class="content-product-left class-honizol col-md-5 col-sm-12 col-xs-12">
              <div class="large-image ">
                <img itemprop="image" class="product-image-zoom"
                  src="/src/assets/image/catalog/demo/product/replacement/1.jpg" title="Chicken swinesha"
                  alt="Chicken swinesha">
              </div>
              <a class="thumb-video pull-left" href="https://www.youtube.com/watch?v=HhabgvIIXik"><i
                  class="fa fa-youtube-play"></i></a>
            </div>
            <div class="content-product-right col-md-7 col-sm-12 col-xs-12">
              <div class="title-product">
                <h1>Chicken swinesha</h1>
              </div>
              <!-- Review ---->
              <div class="box-review form-group">
                <div class="ratings">
                  <div class="space-x-2 rating-box">
                    <span class="fa fa-stack"><i class="text-2xl fa fa-star-o fa-stack-1x"></i></span>
                    <span class="fa fa-stack"><i class="text-2xl fa fa-star-o fa-stack-1x"></i></span>
                    <span class="fa fa-stack"><i class="text-2xl fa fa-star-o fa-stack-1x"></i></span>
                    <span class="fa fa-stack"><i class="text-2xl fa fa-star-o fa-stack-1x"></i></span>
                    <span class="fa fa-stack"><i class="text-2xl fa fa-star-o fa-stack-1x"></i></span>
                  </div>
                </div>
              </div>
              <div class="product-label form-group">
                <div class="flex space-x-2 product_page_price price">
                  <span class="price-new" itemprop="price">$114.00</span>
                  <span class="price-old">$122.00</span>
                </div>
                <div class="stock"><span>Availability:</span> <span class="status-stock">In Stock</span></div>
              </div>
              <div class="product-box-desc">
                <div class="inner-box-desc">
                  <div class="price-tax"><span>Ex Tax:</span> $60.00</div>
                  <div class="reward"><span>Price in reward points:</span> 400</div>
                  <div class="brand"><span>Brand:</span><a href="#">Apple</a> </div>
                  <div class="model"><span>Product Code:</span> Product 15</div>
                  <div class="reward"><span>Reward Points:</span> 100</div>
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
              <li :class="{ 'active': isActiveDesc }" @click="changeActiveTab('desc')"><a href="#desc">Description</a></li>
              <li :class="{ 'active': isActiveRew }" @click="changeActiveTab('rew')"><a href="#desc">Reviews (1)</a></li>
            </ul>
            <div class="tab-content col-lg-10 col-sm-9 col-xs-12">
              <div class="tab-pane fade" :class="{ 'active in': isActiveDesc }">
                <p>
                  The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed
                  specifically for the creative professional, this display provides more space for easier access to all
                  the tools and palettes needed to edit, format and composite your work. Combine this display with a Mac
                  Pro, MacBook Pro, or PowerMac G5 and there's no limit to what you can achieve. <br>
                  <br>
                  The Cinema HD features an active-matrix liquid crystal display that produces flicker-free images that
                  deliver twice the brightness, twice the sharpness and twice the contrast ratio of a typical CRT
                  display. Unlike other flat panels, it's designed with a pure digital interface to deliver
                  distortion-free images that never need adjusting. With over 4 million digital pixels, the display is
                  uniquely suited for scientific and technical applications such as visualizing molecular structures or
                  analyzing geological data. <br>
                </p>
              </div>
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