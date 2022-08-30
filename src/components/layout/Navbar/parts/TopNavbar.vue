<script setup>
import CloseIcon from "../../../../assets/icons/CloseIcon.vue";
import FaceBookIcon from '../../../../assets/icons/FaceBookIcon.vue';
import TelegramIcon from '../../../../assets/icons/TelegramIcon.vue';
import InstagramIcon from '../../../../assets/icons/InstagramIcon.vue';
import EmailIcon from '../../../../assets/icons/EmailIcon.vue';
import ChevronDownIcon from '../../../../assets/icons/ChevronDownIcon.vue';
import SignInIcon from '../../../../assets/icons/SignInIcon.vue';
import { useModalStore } from '../../../../stores/modal.js'
import { useAuthStore } from '../../../../stores/auth.js'
import { computed, onMounted, reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useRouter } from "vue-router";
import UserFillIcon from "../../../../assets/icons/UserFillIcon.vue";
import SignOutIcon from "../../../../assets/icons/SignOutIcon.vue";

const router = useRouter()
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useModalStore()
const authStore = useAuthStore()

const isOpenLanguageDropDown = ref(false)
const dropdown = ref(null)
const toggleDropDown = () => {
  isOpenLanguageDropDown.value = !isOpenLanguageDropDown.value
}
onClickOutside(dropdown, () => isOpenLanguageDropDown.value = false)

const user = reactive({
  email: '',
  password: ''
})

const submitLoginData = () => {
  authStore.loginUser(user).then(() => {
    if (authStore.isLogin) {
      router.go('/')
    }
  })
}

onMounted(() => {
  authStore.checkLogin()
  authStore.getUser()
})

const recoveryEmail = ref('')

const submitRecoveryEmail = () => {
  authStore.sendRecoveryEmail(recoveryEmail.value)
}

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
        <li>{{  authStore.checkSSOLogin($router.currentRoute.value?.query?.token)  }}</li>
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
      <div class="flex items-center justify-end space-x-2" v-if="!authStore.isLogin">
        <button @click="store.openModal()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          <SignInIcon class="mr-1" />
          Login
        </button>
        <div class="text-gray-300">/</div>
        <button @click="store.openRegisterModal()"
          class="w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          Registration
        </button>
      </div>
      <div class="flex items-center justify-end space-x-2" v-else>
        <button
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          <UserFillIcon class="mr-1" />
          {{  authStore.user?.username }}
        </button>
        <div class="text-gray-300">/</div>
        <a href="/" @click="authStore.logout()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          <SignOutIcon class="mr-1" />
          Logout
        </a>
      </div>
    </div>

    <!-- Register Modal -->
    <div :class="{ 'hidden': !store.isOpenRegisterModal }"
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
      <div class="relative w-full h-full max-w-xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
        <div class="relative bg-white rounded shadow dark:bg-gray-700">
          <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Register</h3>
            <button type="button" @click="store.closeRegisterModal()"
              class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="defaultModal">
              <CloseIcon />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="px-6 py-3 space-y-6">
            <a :href="`${API_URL}/auth/google`"
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""> <span>Login with
                Google</span>
            </a>
            <button
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/303117/facebook-2-logo.svg" class="w-6 h-6" alt=""> <span>Login
                with
                Facebook</span>
            </button>
            <div class="relative mx-auto">
              <hr />
              <p
                class="absolute px-3 py-2 text-gray-400 uppercase -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 whitespace-nowrap">
                Or</p>
            </div>
            <form action="" class="my-10">
              <div class="flex flex-col space-y-5">
                <label for="full-name">
                  <p class="pb-2 font-medium text-slate-700">Full name</p>
                  <input id="full-name" type="text"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter full name">
                </label>
                <label for="email">
                  <p class="pb-2 font-medium text-slate-700">Email address</p>
                  <input id="email" name="email" type="email"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
                </label>
                <label for="password">
                  <p class="pb-2 font-medium text-slate-700">Password</p>
                  <input id="password" type="password"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password">
                </label>
                <label for="confirm-password">
                  <p class="pb-2 font-medium text-slate-700">Confirm password</p>
                  <input id="confirm-password" type="password"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter confirm password">
                </label>
                <button
                  class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  Registration
                </button>
                <p class="text-center">
                  Already have account?
                  <a @click="store.openModal()"
                    class="inline-flex items-center space-x-1 font-medium text-indigo-600 cursor-pointer">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <div :class="{ 'hidden': !store.isOpen }"
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
      <div class="relative w-full h-full max-w-xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
        <div class="relative bg-white rounded shadow dark:bg-gray-700">
          <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Login</h3>
            <button type="button" @click="store.closeModal()"
              class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="defaultModal">
              <CloseIcon />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="px-6 py-3 space-y-6">
            <button
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""> <span>Login with
                Google</span>
            </button>
            <button
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/303117/facebook-2-logo.svg" class="w-6 h-6" alt=""> <span>Login
                with
                Facebook</span>
            </button>
            <div class="relative mx-auto">
              <hr />
              <p
                class="absolute px-3 py-2 text-gray-400 uppercase -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 whitespace-nowrap">
                Or</p>
            </div>
            <form action="" class="my-10">
              <div class="flex flex-col space-y-5">
                <label for="email-input">
                  <p class="pb-2 font-medium text-slate-700">Email address</p>
                  <input id="email-input" name="email" type="email" v-model="user.email"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
                </label>
                <label for="password-input">
                  <p class="pb-2 font-medium text-slate-700">Password</p>
                  <input id="password-input" name="password" type="password" v-model="user.password"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password">
                </label>
                <div class="flex flex-row justify-between">
                  <div>
                  </div>
                  <div>
                    <a href="#" @click="store.openResetPasswordModal" class="font-medium text-blue-600">Forgot
                      Password?</a>
                  </div>
                </div>
                <button @click.prevent="submitLoginData()"
                  class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  <span>Login</span>
                </button>
                <p class="text-center">
                  Not registered yet?
                  <a @click="store.openRegisterModal()"
                    class="inline-flex items-center space-x-1 font-medium text-indigo-600 cursor-pointer">
                    Register now
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div :class="{ 'hidden': !store.isOpenResetPassword }"
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
      <div class="relative w-full h-full max-w-xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
        <div class="relative bg-white rounded shadow dark:bg-gray-700">
          <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recovery Password</h3>
            <button type="button" @click="store.closeResetPasswordModal()"
              class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900">
              <CloseIcon />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="px-6 py-3 space-y-6">
            <form action="" class="mb-5">
              <div class="flex flex-col space-y-5">
                <label for="recovery-email">
                  <p class="pb-2 font-medium text-slate-700">Email address</p>
                  <input id="recovery-email" name="email" type="email" v-model="recoveryEmail"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
                </label>
                <button @click.prevent="submitRecoveryEmail()"
                  class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  <span>Recovery</span>
                </button>
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