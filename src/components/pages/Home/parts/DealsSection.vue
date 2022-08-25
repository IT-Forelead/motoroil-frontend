<script setup>
import { Countdown } from 'vue3-flip-countdown'
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
</script>

<template>
  <div class="flex justify-center p-5 bg-gray-100">
    <div class="container grid grid-cols-3 gap-20 p-5">
      <div class="relative col-span-2 p-5 bg-white">
        <div class="absolute top-0 py-2 font-medium text-white uppercase bg-red-500 rounded-b px-7 text-md deal">Deal of
          the day</div>
        <div class="flex items-center justify-center h-full p-3 space-x-5">
          <div class="w-full">
            <img src="/src/assets/image/catalog/demo/product/400/1.jpg" class="img-responsive" alt="image1">
          </div>
          <div>
            <div class="text-gray-900 text-md">Prista Extra W10-53</div>
            <div class="flex items-center py-2">
              <ul class="flex">
                <li>
                  <StarFillIcon class="text-yellow-300" />
                </li>
                <li>
                  <StarFillIcon class="text-yellow-300" />
                </li>
                <li>
                  <StarFillIcon class="text-yellow-300" />
                </li>
                <li>
                  <StarFillIcon class="text-gray-300" />
                </li>
                <li>
                  <StarFillIcon class="text-gray-300" />
                </li>
              </ul>
            </div>
            <div class="flex items-center">
              <div class="mb-2 mr-3 text-lg font-semibold text-red-500">$50.00</div>
              <div class="mb-2 text-gray-500 line-through text-md">$50.00</div>
            </div>
            <div class="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis reiciendis voluptates pariatur
              libero quam doloremque deleniti earum illum provident quo error repudiandae enim, eius repellendus cum?
              Tempore fuga at aut. Fugiat maxime exercitationem odit quia adipisci enim nesciunt nulla! Eaque
              necessitatibus inventore minus ad! Fugit vitae delectus sunt veritatis iure!
            </div>
            <Countdown class="float-left" :flipAnimation="false" />
            <div class="clear-both"></div>
          </div>
        </div>
      </div>
      <div>
        <img src="/src/assets/image/catalog/demo/product/400/1.jpg" class="img-responsive" alt="image1">
      </div>
    </div>
  </div>
</template>

<style scoped>
.deal {
  margin: -9px 40px 0;
  z-index: 2;
}

.deal:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: auto;
  left: -22px;
  right: auto;
  border-bottom: 0 solid transparent;
  border-top: 9px solid transparent;
  border-right: 10px solid #c60009;
  border-left: 12px solid transparent;
}

.deal:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: auto;
  left: auto;
  right: -22px;
  border-bottom: 0 solid transparent;
  border-top: 9px solid transparent;
  border-left: 10px solid #c60009;
  border-right: 12px solid transparent;
}
</style>