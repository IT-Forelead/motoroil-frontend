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
    <div class="container grid grid-cols-1 md:grid-cols-4 gap-7">
      <div>
        <div class="font-semibold uppercase text-mf">{{ $t('aboutUs') }}</div>
        <ul class="py-5">
          <li class="flex items-center py-3 space-x-3">
            <MapPinIcon class="text-red-500 w-9 h-9" />
            <div class="text-gray-500 text-md">Urgench, Khorezm, Uzbekistan</div>
          </li>
          <li class="flex items-center py-3 space-x-3">
            <PhoneIcon class="text-red-500 w-7 h-7" />
            <div class="text-gray-500 text-md">+998 (91) 092-99-92</div>
          </li>
          <li class="flex items-center py-3 space-x-3">
            <EnvelopeIcon class="text-red-500 w-7 h-7" />
            <div class="text-gray-500 text-md">no-reply@motoroelexpress.de</div>
          </li>
          <li class="flex items-center py-3 space-x-3">
            <AlarmIcon class="text-red-500 w-7 h-7" />
            <div class="text-gray-500 text-md">7 days a week from 10:00 AM to 6:00 PM</div>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-semibold uppercase text-mf">{{ $t('categories') }}</div>
        <ul class="py-5">
          <li class="py-1.5">
            <router-link to="/" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">
              {{ $t('home') }}
            </router-link>
          </li>
          <li class="py-1.5">
            <router-link to="/products" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">
              {{ $t('products') }}
            </router-link>
          </li>
          <li class="py-1.5">
            <router-link to="/blogs" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">
              {{ $t('blogs') }}
            </router-link>
          </li>
          <li class="py-1.5">
            <router-link to="/faq" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">
              {{ $t('faq') }}
            </router-link>
          </li>
          <li class="py-1.5">
            <router-link to="/about-us" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">
              {{ $t('aboutUs') }}
            </router-link>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('supportPage') }}</a>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-semibold uppercase text-mf">directory</div>
        <ul class="py-5">
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('brands') }}</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">Partners</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('affiliates') }}</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('specials') }}</a>
          </li>
          <li class="py-1.5">
            <router-link to="/faq" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">
              {{ $t('faqs') }}
            </router-link>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('customLink') }}</a>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-semibold uppercase text-mf">{{ $t('information') }}</div>
        <ul class="py-5">
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('eventAndPartySupplies') }}</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('homeImprovement') }}</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('supportPage') }}</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('productSupport') }}</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('customerService') }}</a>
          </li>
          <li class="py-1.5">
            <a href="#" class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-3">{{ $t('warrantyAndServices') }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex justify-center py-3">
    <div class="container grid grid-cols-1 md:grid-cols-3 md:mb-0">
      <div class="flex items-center justify-center px-5 py-4 bg-gray-700 md:py-7">
        <div class="flex justify-center">
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
      <div class="items-center justify-between hidden col-span-2 px-12 bg-gray-800 md:flex py-7">
        <div class="text-xl font-medium text-white uppercase indent-3">{{ $t('signUpForNewsletter') }}</div>
        <div class="flex rounded bg-white w-[30rem]">
          <input type="search" class="w-full px-4 py-1 text-gray-900 bg-transparent border-none outline-none focus:outline-none" placeholder="Your email address..." />
          <button type="button" class="px-4 py-2 text-white uppercase bg-red-500 rounded-r"> {{ $t('subscribe') }} </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>