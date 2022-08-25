<script setup>
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center p-5 bg-white">
      <div class="container flex flex-col justify-center">
        <div class="py-5 text-center">
          <div class="space-x-2 text-red-500 uppercase text-md">Top sale in the week</div>
          <div class="flex items-center justify-center">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <div class="mx-3 text-5xl font-bold uppercase">Best Seller</div>
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-8">
          <div v-for="i in 9" :key="i" class="relative max-w-sm">
            <div class="absolute font-normal text-center text-white top-4 sale">-10%</div>
            <div class="absolute font-normal text-center text-white uppercase top-4 new">new</div>
            <a href="#">
              <img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="#">
            </a>
            <div class="p-5 py-3 text-center border border-t-0 border-gray-200">
              <a href="#">
                <div class="text-gray-900 text-md">Prista Extra W10-53</div>
              </a>
              <div class="flex items-center justify-center py-2">
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
              <div class="flex items-center justify-center">
                <div class="mb-2 mr-3 text-lg font-semibold text-red-500">$50.00</div>
                <div class="mb-2 text-gray-500 line-through text-md">$50.00</div>
              </div>
            </div>
          </div>
          <div class="max-w-sm">
            <a href="#">
              <img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="#">
            </a>
            <div class="p-5 py-3 text-center border border-t-0 border-gray-200">
              <a href="#">
                <div class="mb-2 text-gray-900 text-md">Prista Extra W10-53</div>
              </a>
              <div class="flex items-center justify-center py-2">
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
              <div class="mb-2 text-lg font-semibold text-red-500">$25.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sale {
  background-color: #ff2d37;
  font-size: 12px;
  min-width: 60px;
  height: 30px;
  line-height: 30px;
  left: -11px;
  z-index: 2;
}

.sale:before {
  content: "";
  position: absolute;
  top: auto;
  bottom: -7px;
  left: 0;
  right: auto;
  border-bottom: 7px solid transparent;
  border-top: 0 solid transparent;
  border-right: 11px solid #c60009;
}

.new {
  background-color: #3599ff;
  font-size: 12px;
  min-width: 60px;
  height: 30px;
  line-height: 30px;
  right: -11px;
  z-index: 2;
}

.new:before {
  content: "";
  position: absolute;
  top: auto;
  bottom: -7px;
  right: 0;
  left: auto;
  border-bottom: 7px solid transparent;
  border-top: 0 solid transparent;
  border-left: 11px solid #0055ac;
}
</style>