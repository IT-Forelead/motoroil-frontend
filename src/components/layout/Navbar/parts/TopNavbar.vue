<script setup>
import CloseIcon from "../../../../assets/icons/CloseIcon.vue";
import FaceBookIcon from '../../../../assets/icons/FaceBookIcon.vue';
import TelegramIcon from '../../../../assets/icons/TelegramIcon.vue';
import InstagramIcon from '../../../../assets/icons/InstagramIcon.vue';
import EmailIcon from '../../../../assets/icons/EmailIcon.vue';
import ChevronDownIcon from '../../../../assets/icons/ChevronDownIcon.vue';
import SignInIcon from '../../../../assets/icons/SignInIcon.vue';
import { useModalStore } from '../../../../stores/modal.js'
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

const store = useModalStore()

const isOpenLanguageDropDown = ref(false)
const dropdown = ref(null)
const toggleDropDown = () => {
  isOpenLanguageDropDown.value = !isOpenLanguageDropDown.value
}

onClickOutside(dropdown, () => isOpenLanguageDropDown.value = false)
</script>
<template>
  <div class="flex justify-center py-2 bg-gray-900">
    <div class="container grid items-center grid-cols-4 gap-3">
      <ul class="items-center hidden space-x-2 md:flex">
        <li
          class="p-1 text-lg text-gray-400 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-red-500">
          <a href="#" target="_blank">
            <FaceBookIcon />
          </a>
        </li>
        <li
          class="p-1 text-lg text-gray-400 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-red-500">
          <a href="#" target="_blank">
            <TelegramIcon />
          </a>
        </li>
        <li
          class="p-1 text-lg text-gray-400 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-red-500">
          <a href="#" target="_blank">
            <InstagramIcon />
          </a>
        </li>
        <li
          class="p-1 text-lg text-gray-400 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-red-500">
          <a href="#" target="_blank">
            <EmailIcon />
          </a>
        </li>
      </ul>
      <div class="relative col-span-2">
        <button @click="toggleDropDown()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 uppercase md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          English
          <ChevronDownIcon />
        </button>
        <div :class="{ 'hidden': !isOpenLanguageDropDown }" ref="dropdown"
          class="absolute z-10 bg-white divide-y divide-gray-100 rounded shadow top-10 w-44">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
            <li>
              <a href="#"
                class="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">O'zbek</a>
            </li>
            <li>
              <a href="#"
                class="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">English</a>
            </li>
            <li>
              <a href="#"
                class="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">русский</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center justify-end space-x-2">
        <button @click="store.openModal()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          <SignInIcon class="mr-1" />
          Login
        </button>
        <div class="text-gray-300">/</div>
        <button
          class="w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          Registration
        </button>
      </div>
    </div>
    <!-- Login Modal -->
    <div :class="{ 'hidden': !store.isOpen }"
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-500/50">
      <div
        class="relative w-full h-full max-w-3xl p-4 text-xl -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Login Form
            </h3>
            <button type="button" @click="store.closeModal()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal">
              <CloseIcon />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <div class="my-5">
              <button
                class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
                <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""> <span>Login with
                  Google</span>
              </button>
            </div>
            <div class="my-5">
              <button
                class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
                <img src="https://www.svgrepo.com/show/303117/facebook-2-logo.svg" class="w-6 h-6" alt=""> <span>Login
                  with
                  Facebook</span>
              </button>
            </div>
            <div class="relative mx-auto">
              <hr />
              <p class="absolute p-2 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 whitespace-nowrap">Have
                a password? Continue with your email address</p>
            </div>
            <form action="" class="my-10">
              <div class="flex flex-col space-y-5">
                <label for="email">
                  <p class="pb-2 font-medium text-slate-700">Email address</p>
                  <input id="email" name="email" type="email"
                    class="w-full px-3 py-3 border rounded-lg border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
                </label>
                <label for="password">
                  <p class="pb-2 font-medium text-slate-700">Password</p>
                  <input id="password" name="password" type="password"
                    class="w-full px-3 py-3 border rounded-lg border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password">
                </label>
                <div class="flex flex-row justify-between">
                  <div>
                  </div>
                  <div>
                    <a href="#" class="font-medium text-indigo-600">Forgot Password?</a>
                  </div>
                </div>
                <button
                  class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-indigo-600 border-indigo-500 rounded-lg hover:bg-indigo-500 hover:shadow">
                  <span>Login</span>
                </button>
                <p class="text-center">Not registered yet? <a href="#"
                    class="inline-flex items-center space-x-1 font-medium text-indigo-600"><span>Register now
                    </span></a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>