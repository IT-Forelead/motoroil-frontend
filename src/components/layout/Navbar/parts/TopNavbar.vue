<script setup>
import CloseIcon from "../../../../assets/icons/CloseIcon.vue";
import { ref } from 'vue'
import { useModalStore } from '../../../../stores/modal.js'
const store = useModalStore()
</script>
<template>
  <div class="header-top hidden-compact">
    <div class="container">
      <div class="row">
        <div class="header-top-left col-lg-3 col-md-4 col-sm-5 hidden-xs">
          <div class="telephone ">
            <ul class="socials">
              <li class="facebook"><a href="https://www.facebook.com/smartaddons.page" target="_blank"><i
                    class="fa fa-facebook"></i></a></li>
              <li class="twitter"><a href="https://twitter.com/smartaddons" target="_blank"><i
                    class="fa fa-twitter"></i></a></li>
              <li class="google_plus"><a href="https://plus.google.com/u/0/+Smartaddons/posts" target="_blank"><i
                    class="fa fa-google-plus"></i></a></li>
              <li class="pinterest"><a href="https://www.pinterest.com/smartaddons/" target="_blank"><i
                    class="fa fa-pinterest-p"></i></a></li>
              <li class="instagram"><a href="#" target="_blank"><i class="fa fa-instagram"></i></a></li>
              <li class="linkedin"><a href="#" target="_blank"><i class="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
        <div class="header-top-right col-lg-9 col-md-8 col-sm-7 col-xs-12">
          <ul class="top-link list-inline lang-curr">
            <li class="currency">
              <div class="btn-group currencies-block">
                <form action="index.html" method="post" enctype="multipart/form-data" id="currency">
                  <a class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                    <span class="icon icon-credit "></span> $ US Dollar <span class="fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu btn-xs">
                    <li> <a href="#">(€)&nbsp;Euro</a></li>
                    <li> <a href="#">(£)&nbsp;Pounds </a></li>
                    <li> <a href="#">($)&nbsp;US Dollar </a></li>
                  </ul>
                </form>
              </div>
            </li>
            <li class="language">
              <div class="btn-group languages-block ">
                <form action="index.html" method="post" enctype="multipart/form-data" id="bt-language">
                  <a class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                    <span class="eng">English</span>
                    <span class="fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu">
                    <li><a href="index.html"><img class="image_flag" src="/src/assets/image/catalog/flags/gb.png"
                          alt="English" title="English" /> English </a></li>
                    <li> <a href="html_with_RTL/index.html"> <img class="image_flag"
                          src="/src/assets/image/catalog/flags/ar.png" alt="Arabic" title="Arabic" /> Arabic </a> </li>
                  </ul>
                </form>
              </div>
            </li>
          </ul>
          <ul class="top-log list-inline">
            <li @click="store.openModal()"><i class="fa fa-lock"></i><a href="#">Login</a> / </li>
            <li><a href="#">Register</a></li>
          </ul>
        </div>
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