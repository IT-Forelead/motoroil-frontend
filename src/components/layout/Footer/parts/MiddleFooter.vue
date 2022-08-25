<script setup>
import MapPinIcon from '../../../../assets/icons/MapPinIcon.vue';
import PhoneIcon from '../../../../assets/icons/PhoneIcon.vue';
import EnvelopeIcon from '../../../../assets/icons/EnvelopeIcon.vue';
import AlarmIcon from '../../../../assets/icons/AlarmIcon.vue';
import FacebookFIcon from '../../../../assets/icons/FacebookFIcon.vue';
import TwitterIcon from '../../../../assets/icons/TwitterIcon.vue';
import TelegramIcon from '../../../../assets/icons/TelegramIcon.vue';
import InstagramIcon from '../../../../assets/icons/InstagramIcon.vue';
import YoutubeIcon from '../../../../assets/icons/YoutubeIcon.vue';

</script>

<template>
  <div class="flex justify-center px-5 pt-10 bg-white">
    <div class="container grid grid-cols-4 gap-7">
      <div>
        <div class="font-semibold uppercase text-mf">Contact us</div>
        <ul class="py-5">
          <li class="flex items-center py-3 space-x-3">
            <MapPinIcon class="text-red-500 w-9 h-9" />
            <div class="text-gray-500 text-md">5611 Wellington Road, Suite 115, Gainesville, VA 20155</div>
          </li>
          <li class="flex items-center py-3 space-x-3">
            <PhoneIcon class="text-red-500 w-7 h-7" />
            <div class="text-gray-500 text-md">888 9344 6000 - 888 1234 6789</div>
          </li>
          <li class="flex items-center py-3 space-x-3">
            <EnvelopeIcon class="text-red-500 w-7 h-7" />
            <div class="text-gray-500 text-md">contact@motoroelexpress.de</div>
          </li>
          <li class="flex items-center py-3 space-x-3">
            <AlarmIcon class="text-red-500 w-7 h-7" />
            <div class="text-gray-500 text-md">7 days a week from 10:00 AM to 6:00 PM</div>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-semibold uppercase text-mf">INFORMATION</div>
        <ul class="py-5">
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">About Us</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Faq</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Warranty And Services</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Support 24/7 page</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Product Registration</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Product Support</a>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-semibold uppercase text-mf">My Account</div>
        <ul class="py-5">
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Brands</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Gift Certificates</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Affiliates</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Specials</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">FAQs</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Custom Link</a>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-semibold uppercase text-mf">Categories</div>
        <ul class="py-5">
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Event & Party Supplies</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Home Improvement</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Lamps & Light Fixtures</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Kitchen & Bath Fixtures</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Customer Service</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Kitchen & Dining</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex justify-center py-3">
    <div class="container grid grid-cols-3">
      <div class="col-span-1 px-5 bg-gray-700 py-7">
        <div class="flex">
          <div class="flex items-center justify-center w-10 h-10 mx-1 text-gray-700 bg-white rounded hover:bg-red-500 hover:text-white">
            <FacebookFIcon/>
          </div>
          <div class="flex items-center justify-center w-10 h-10 mx-1 text-gray-700 bg-white rounded hover:bg-red-500 hover:text-white">
            <TwitterIcon/>
          </div>
          <div class="flex items-center justify-center w-10 h-10 mx-1 text-gray-700 bg-white rounded hover:bg-red-500 hover:text-white">
            <TelegramIcon/>
          </div>
          <div class="flex items-center justify-center w-10 h-10 mx-1 text-gray-700 bg-white rounded hover:bg-red-500 hover:text-white">
            <InstagramIcon/>
          </div>
          <div class="flex items-center justify-center w-10 h-10 mx-1 text-gray-700 bg-white rounded hover:bg-red-500 hover:text-white">
            <YoutubeIcon/>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between col-span-2 px-12 bg-gray-800 py-7">
        <div class="text-xl font-medium text-white uppercase indent-3">Sign Up for Newsletter</div>
        <div class="flex rounded bg-white w-[30rem]">
          <input type="search" class="w-full px-4 py-1 text-gray-900 bg-transparent border-none outline-none focus:outline-none" placeholder="Your email address..." />
          <button type="button" class="px-4 py-2 text-white uppercase bg-red-500 rounded-r"> Subscribe </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>