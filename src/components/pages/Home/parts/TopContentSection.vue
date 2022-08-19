<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

const modules = [Autoplay, Navigation]
</script>
<template>
  <div class="container content-top-w">
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 col_slla box-advanced-search">
        <div class="so_advanced_search">
          <div class="sas_wrap">
            <div class="sas_inner">
              <div class="heading-title">
                <h2>Select Your Vehical</h2>
              </div>
              <div class="sas_inner-box-search">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 search-boxes">
                    <select name="make" id="so_make0" class="form-control">
                      <option value="">Select Make</option>
                      <option value="1">Acura</option>
                      <option value="2">BMW</option>
                      <option value="3">Chevrolet</option>
                      <option value="4">GMC</option>
                      <option value="5">Honda</option>
                      <option value="6">John deere</option>
                      <option value="7">Kawasaky</option>
                      <option value="8">Lexus</option>
                      <option value="9">mazda</option>
                      <option value="10">Mercedes</option>
                      <option value="11">nuko</option>
                      <option value="12">Opel</option>
                      <option value="13">Yamaha</option>
                    </select>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 search-boxes">
                    <select name="model" id="so_model0" class="form-control">
                      <option value="">Select Model</option>
                      <option value="1">3D Model</option>
                      <option value="2">BMW</option>
                      <option value="3">1000 Rocket</option>
                    </select>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 search-boxes">
                    <select name="engine" id="so_engine0" class="form-control">
                      <option value="">Select Engine</option>
                      <option value="1">320i</option>
                      <option value="2">x5</option>
                      <option value="3">350i</option>
                    </select>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 search-boxes">
                    <select name="year" id="so_year0" class="form-control">
                      <option value="">Select Year</option>
                      <option value="1">2015</option>
                      <option value="2">2016</option>
                      <option value="3">2017</option>
                    </select>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 search-button">
                    <button type="button" id="sas_search_button0">Find My Part</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12 col_htca col-style">
        <div class="slider-container" style="padding-top: 40px">
          <swiper :spaceBetween="30" :centeredSlides="true" :navigation="true" :modules="modules"
            :autoplay="{ delay: 2500, disableOnInteraction: false }" class="mySwiper">
            <swiper-slide v-for="i in 5" :key="i">
              <img src="/src/assets/image/catalog/slideshow/home1/slider-3.jpg" alt="slider3" class="img-responsive">
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>