<script setup>
import { Countdown } from 'vue3-flip-countdown'
</script>
<template>
  <div class="row-image deals-w">
    <div class="container row row-deals">
      <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
        <div class="module deals-layout1" style="height: 475px;">
          <h3 class="modtitle2"><span>Deal of the day</span></h3>
          <div class="modcontent">
            <div id="so_deal_11" class="so-deal">
              <div class="products-list">
                <div class="item product-layout">
                  <div class="transition product-thumb product-item-container">
                    <div class="col-lg-6 col-md-5 col-sm-6 col-xs-12 col-left">
                      <div class="left-block">
                        <div class="product-image-container second_img">
                          <a href="/product" target="_self" title="Sunt in culpa">
                            <img src="/src/assets/image/catalog/demo/product/400/1.jpg" class="img-responsive"
                              alt="image1">
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-7 col-sm-6 col-xs-12 col-right">
                      <div class="right-block">
                        <h4><a href="/product" title="Sunt in culpa" target="_self">Sunt in culpa back wheel</a>
                        </h4>
                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
                          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
                          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
                          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i></span>
                          <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span>
                        </div>
                        <div class="price" style="display: flex; align-items: center;">
                          <span class="price-new">$50.00</span>
                          <span class="price-old" style="margin-left: 10px;">$59.00</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, ..</p>
                        <div style="float: left;">
                          <Countdown :flipAnimation="false"/>
                        </div>
                        <div style="clear: both"></div>
                        <div class="button-group" style="margin-top: 10px">
                          <button type="button" class="addToCart" title="Add to cart">
                            <span>Add to cart </span>
                          </button>
                          <button type="button" class="wishlist btn-button" title="Add to Wish List">
                            <i class="fa fa-heart"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 col-style hidden-xs hidden-sm">
        <div class="banners banners1">
          <div>
            <a href="#"><img src="/src/assets/image/catalog/banners/bn1.jpg" alt="banner"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>