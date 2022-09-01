<script setup>
import CaretRightIcon from "../../assets/icons/CaretRightIcon.vue";
import HouseIcon from "../../assets/icons/HouseIcon.vue";
import MinusIcon from "../../assets/icons/MinusIcon.vue";
import PlusIcon from "../../assets/icons/PlusIcon.vue";
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="p-2">
        <ul class="flex items-center">
          <li class="flex items-center">
            <a href="/" class="text-gray-700">
              <HouseIcon class="w-4 h-4" />
            </a>
            <CaretRightIcon class="mx-3 text-gray-500" />
          </li>
          <li class="text-gray-700">FAQ</li>
        </ul>
      </div>
      <div class="flex flex-col justify-center">
        <div
          class="text-2xl font-semibold text-center text-gray-800 lg:text-4xl"
        >
          Have any Questions?
        </div>
        <ul class="flex flex-col justify-center mx-48 divide-y">
          <li class="py-5">
            <button class="flex items-center focus:outline-none">
              <MinusIcon class="w-5 h-5 text-red-500" />
              <span class="mx-4 text-xl text-gray-700">
                How i can play for my appoinment ?
              </span>
            </button>
            <div class="p-2 my-5 ml-10 border-l-2 border-red-500">
              <p class="px-2 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
                eum quae. Harum officiis reprehenderit ex quia ducimus minima id
                provident molestias optio nam vel, quidem iure voluptatem,
                repellat et ipsa. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Magni, eum quae. Harum officiis reprehenderit
                ex quia ducimus minima id provident molestias optio nam quidem.
              </p>
            </div>
          </li>
          <li class="py-5">
            <button class="flex items-center focus:outline-none">
              <PlusIcon class="w-5 h-5 text-red-500" />
              <span class="mx-4 text-xl text-gray-700">
                What can i expect at my first consultation ?
              </span>
            </button>
          </li>
          <li class="py-5">
            <button class="flex items-center focus:outline-none">
              <PlusIcon class="w-5 h-5 text-red-500" />
              <span class="mx-4 text-xl text-gray-700">
                What are your opening house ?
              </span>
            </button>
          </li>
          <li class="py-5">
            <button class="flex items-center focus:outline-none">
              <PlusIcon class="w-5 h-5 text-red-500" />
              <span class="mx-4 text-xl text-gray-700">
                Do i need a referral ?
              </span>
            </button>
          </li>
          <li class="py-5">
            <button class="flex items-center focus:outline-none">
              <PlusIcon class="w-5 h-5 text-red-500" />
              <span class="mx-4 text-xl text-gray-700">
                Is the cost of the appoinment covered by private health
                insurance ?
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
