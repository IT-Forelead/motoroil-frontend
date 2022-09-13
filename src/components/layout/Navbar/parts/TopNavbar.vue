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
import { useUserStore } from '../../../../stores/user.js'
import { onMounted, reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useRouter } from "vue-router";
import UserFillIcon from "../../../../assets/icons/UserFillIcon.vue";
import SignOutIcon from "../../../../assets/icons/SignOutIcon.vue";
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import HeartFillIcon from "../../../../assets/icons/HeartFillIcon.vue";
import ShoppingCartFillIcon from "../../../../assets/icons/ShoppingCartFillIcon.vue";
import MapPinFillIcon from "../../../../assets/icons/MapPinFillIcon.vue";
import ShoppingBagOpenFillIcon from "../../../../assets/icons/ShoppingBagOpenFillIcon.vue";
import BellFillIcon from "../../../../assets/icons/BellFillIcon.vue";
import BellIcon from "../../../../assets/icons/BellIcon.vue";
import { formatDateTime } from "../../../../mixins/utils.js";

const router = useRouter()
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useModalStore()
const authStore = useAuthStore()
const userStore = useUserStore()

const isOpenLanguageDropDown = ref(false)
const dropdown = ref(null)
const toggleDropDown = () => {
  isOpenLanguageDropDown.value = !isOpenLanguageDropDown.value
}
onClickOutside(dropdown, () => isOpenLanguageDropDown.value = false)

const isOpenUserActionDropDown = ref(false)
const userActionDropDown = ref(null)
const toggleUserActionDropDown = () => {
  isOpenUserActionDropDown.value = !isOpenUserActionDropDown.value
}
onClickOutside(userActionDropDown, () => isOpenUserActionDropDown.value = false)

const isOpenNotificationDropDown = ref(false)
const notificationDropDown = ref(null)
const toggleNotificationDropDown = () => {
  isOpenNotificationDropDown.value = !isOpenNotificationDropDown.value
}
onClickOutside(notificationDropDown, () => isOpenNotificationDropDown.value = false)

const user = reactive({
  email: '',
  password: ''
})

const currentLang = ref('')

const submitLoginData = () => {
  authStore.loginUser(user).then(() => {
    if (authStore.isLogin) {
      router.go('/')
    }
  })
}

onMounted(() => {
  if (router.currentRoute.value?.query?.token) {
    authStore.checkSSOLogin(router.currentRoute.value?.query?.token)
  } else {
    authStore.checkLogin()
  }
  if (authStore.token) {
    authStore.getUser()
    userStore.getNotifications()
  }
})

const recoveryEmail = ref('')

const submitRecoveryEmail = () => {
  authStore.sendRecoveryEmail(recoveryEmail.value)
}

const changeLang = (lang) => {
  localStorage.setItem('lang', lang)
  window.location.reload()
}

switch (localStorage.getItem('lang')) {
  case 'uz':
    currentLang.value = "o'zbek";
    break;
  case 'ru':
    currentLang.value = "русский";
    break;
  default:
    currentLang.value = "english";
    break;
}

const userForm = reactive({
  "confirmPassword": '',
  "email": '',
  "name": '',
  "password": ''
})

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/

const submitUserData = () => {
  if (userForm.name === '') {
    notify.warning({
      message: 'Please, enter fullname!',
      position: 'bottomRight',
    })
  } else if (!emailRegex.test(userForm.email)) {
    notify.warning({
      message: 'Please, enter right email address!',
      position: 'bottomRight',
    })
  } else if (!strongRegex.test(userForm.password)) {
    notify.warning({
      message: 'Password must have: one lowercase, one uppercase, one digit, one special character and length greater than 6 character!',
      position: 'bottomRight',
    })
  } else if (userForm.password !== userForm.confirmPassword) {
    notify.warning({
      message: 'Password doesn\'t match!',
      position: 'bottomRight',
    })
  } else {
    authStore.registerUser(userForm).then(() => {
      userForm.name = ''
      userForm.email = ''
      userForm.password = ''
      userForm.confirmPassword = ''
    })
  }
}
</script>

<template>
  <div class="flex justify-between md:justify-center py-2 bg-gray-900">
    <div class="flex w-full justify-between md:container md:grid items-center md:grid-cols-4 gap-3 mx-2">
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
      <div class="relative md:col-span-2">
        <button @click="toggleDropDown()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 uppercase md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          {{ currentLang }}
          <ChevronDownIcon />
        </button>
        <div :class="{ 'hidden': !isOpenLanguageDropDown }" ref="dropdown"
          class="absolute z-10 bg-white divide-y divide-gray-100 rounded shadow top-10 w-44">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
            <li @click="changeLang('uz')">
              <a href="#"
                class="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">O'zbek</a>
            </li>
            <li @click="changeLang('en')">
              <a href="#"
                class="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">English</a>
            </li>
            <li @click="changeLang('ru')">
              <a href="#"
                class="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Русский</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center md:justify-end space-x-2" v-if="!(authStore.isLogin || authStore.isSSOLogin)">
        <button @click="store.openModal()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          <SignInIcon class="mr-1" />
          {{ $t('login') }}
        </button>
        <div class="text-gray-300">/</div>
        <button @click="store.openRegisterModal()"
          class="w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          {{ $t('registration') }}
        </button>
      </div>
      <div class="flex items-center md:justify-end space-x-2" v-else>
        <div class="relative">
          <button @click="toggleNotificationDropDown()" class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
            <BellFillIcon class="w-5 h-5 mx-3" />
          </button>
          <div :class="{ 'hidden': !isOpenNotificationDropDown }" ref="dropdown"
            class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow w-96 top-10">
            <div v-for="(notification, idx) in userStore.notifications" :key="idx" class="flex items-center justify-between px-5 py-3 text-md">
              <div class="flex items-center px-1 mr-3">
                <div v-if="notification?.viewed === false" class="relative bottom-1.5 mr-3">
                  <div class="absolute top-0 right-0 animate-ping rounded-full bg-blue-500 p-1.5"></div>
                  <div class="absolute top-0 right-0 rounded-full bg-blue-500 p-1.5"></div>
                </div>
                <div class="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div class="pt-1 text-lg font-bold text-center text-gray-600 dark:text-gray-300">
                    <BellIcon class="h-7 w-7" />
                  </div>
                </div>
              </div>
              <div @click="userStore.viewNotification(notification?.id)" :class="{'cursor-pointer':notification?.viewed === false}">
                <p class="font-semibold text-gray-900 dark:text-gray-300">{{ formatDateTime(notification?.createdAt) }}</p>
                <p class="text-gray-600 text-md dark:text-gray-400">{{ notification?.text }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <button @click="toggleUserActionDropDown()" class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
            <UserFillIcon class="mr-1" />
            <span class="hidden md:block">{{ authStore.user?.username }}</span>
          </button>
          <div :class="{ 'hidden': !isOpenUserActionDropDown }" ref="dropdown"
               class="absolute right-0 z-10 w-72 bg-white divide-y divide-gray-100 rounded shadow top-10">
            <div class="p-2">
              <p class="text-sm text-gray-700">{{ $t('hello') }}, <span
                  class="font-medium text-md">{{ authStore.user?.username }}</span></p>
              <p class="text-sm text-gray-700">{{ $t('yourEmail') }}: <span
                  class="font-medium text-md">{{ authStore.user?.email }}</span></p>
            </div>
            <ul v-if="authStore.user?.role === 'user'" class="py-1 text-sm text-gray-700">
              <li @click="toggleUserActionDropDown()" class="block p-2 capitalize hover:bg-gray-100">
                <router-link to="/wishlist" class="flex items-center">
                  <HeartFillIcon class="w-4 h-4 mr-1"/>
                  <span>{{ $t('myWishlist') }}</span>
                </router-link>
              </li>
              <li @click="toggleUserActionDropDown()" class="block p-2 capitalize hover:bg-gray-100">
                <router-link to="/cart" class="flex items-center">
                  <ShoppingCartFillIcon class="w-4 h-4 mr-1"/>
                  <span>{{ $t('myCart') }}</span>
                </router-link>
              </li>
              <li @click="toggleUserActionDropDown()" class="block p-2 capitalize hover:bg-gray-100">
                <router-link to="/orders" class="flex items-center">
                  <ShoppingBagOpenFillIcon class="w-4 h-4 mr-1"/>
                  <span>{{ $t('myOrders') }}</span>
                </router-link>
              </li>
              <li @click="toggleUserActionDropDown()" class="block p-2 capitalize hover:bg-gray-100">
                <router-link to="/address" class="flex items-center">
                  <MapPinFillIcon class="w-4 h-4 mr-1"/>
                  <span>{{ $t('myAddresses') }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="text-gray-300">/</div>
        <a href="/" v-if="authStore.isLogin" @click="authStore.logout()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          <SignOutIcon class="mr-1" />
          <span class="hidden md:block">{{ $t('logout') }}</span>
        </a>
        <p v-else @click="authStore.ssoLogout()"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-300 text-md md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 md:w-auto ">
          <SignOutIcon class="mr-1" />
          {{ $t('logout') }}
        </p>
      </div>
    </div>

    <!-- Register Modal -->
    <div :class="{ 'hidden': !store.isOpenRegisterModal }"
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
      <div class="relative w-full h-full max-w-xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
        <div class="relative bg-white rounded shadow dark:bg-gray-700">
          <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('register') }}</h3>
            <button type="button" @click="store.closeRegisterModal()"
              class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="defaultModal">
              <CloseIcon />
              <span class="sr-only">{{ $t('closeModal') }}</span>
            </button>
          </div>
          <div class="px-6 py-3 space-y-6">
            <a :href="`${API_URL}/auth/google`"
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""> <span>{{ $t('loginWithGoogle') }}</span>
            </a>
            <a :href="`${API_URL}/auth/facebook`"
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/303117/facebook-2-logo.svg" class="w-6 h-6" alt=""> <span>{{ $t('loginWithFacebook') }}</span>
            </a>
            <div class="relative mx-auto">
              <hr />
              <p
                class="absolute px-3 py-2 text-gray-400 uppercase -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 whitespace-nowrap">
                Or</p>
            </div>
            <form @submit.prevent="submitUserData()" class="my-10">
              <div class="flex flex-col space-y-5">
                <label for="full-name">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('fullName') }}</p>
                  <input id="full-name" v-model="userForm.name" type="text"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter full name">
                </label>
                <label for="email">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('emailAddress') }}</p>
                  <input id="email" v-model="userForm.email" name="email" type="email"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
                </label>
                <label for="password">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('password') }}</p>
                  <input id="password" v-model="userForm.password" type="password"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password">
                </label>
                <label for="confirm-password">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('confirmPassword') }}</p>
                  <input id="confirm-password" v-model="userForm.confirmPassword" type="password"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter confirm password">
                </label>
                <button
                  class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  {{ $t('registration') }}
                </button>
                <p class="text-center">
                  {{ $t('alreadyHaveAccount') }}
                  <a @click="store.openModal()"
                    class="inline-flex items-center space-x-1 font-medium text-indigo-600 cursor-pointer">
                    {{ $t('login') }}
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
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('login') }}</h3>
            <button type="button" @click="store.closeModal()"
              class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="defaultModal">
              <CloseIcon />
              <span class="sr-only">{{ $t('closeModal') }}</span>
            </button>
          </div>
          <div class="px-6 py-3 space-y-6">
            <a :href="`${API_URL}/auth/google`"
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""> <span>{{ $t('loginWithGoogle') }}</span>
            </a>
            <a :href="`${API_URL}/auth/facebook`"
              class="flex items-center justify-center w-full py-3 my-3 space-x-2 text-center transition duration-150 border rounded border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img src="https://www.svgrepo.com/show/303117/facebook-2-logo.svg" class="w-6 h-6" alt=""> <span>{{ $t('loginWithFacebook') }}</span>
            </a>
            <div class="relative mx-auto">
              <hr />
              <p
                class="absolute px-3 py-2 text-gray-400 uppercase -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 whitespace-nowrap">
                {{ $t('or') }}</p>
            </div>
            <form action="" class="my-10">
              <div class="flex flex-col space-y-5">
                <label for="email-input">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('emailAddress') }}</p>
                  <input id="email-input" name="email" type="email" v-model="user.email"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
                </label>
                <label for="password-input">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('password') }}</p>
                  <input id="password-input" name="password" type="password" v-model="user.password"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password">
                </label>
                <div class="flex flex-row justify-between">
                  <div>
                  </div>
                  <div>
                    <a href="#" @click="store.openResetPasswordModal" class="font-medium text-blue-600">{{ $t('forgotPassword') }}</a>
                  </div>
                </div>
                <button @click.prevent="submitLoginData()"
                  class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  <span>{{ $t('login') }}</span>
                </button>
                <p class="text-center">
                  {{ $t('notRegisteredYet') }}
                  <a @click="store.openRegisterModal()"
                    class="inline-flex items-center space-x-1 font-medium text-indigo-600 cursor-pointer">
                    {{ $t('registerNow') }}
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
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('recoveryPassword') }}</h3>
            <button type="button" @click="store.closeResetPasswordModal()"
              class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900">
              <CloseIcon />
              <span class="sr-only">{{ $t('closeModal') }}</span>
            </button>
          </div>
          <div class="px-6 py-3 space-y-6">
            <form action="" class="mb-5">
              <div class="flex flex-col space-y-5">
                <label for="recovery-email">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('emailAddress') }}</p>
                  <input id="recovery-email" name="email" type="email" v-model="recoveryEmail"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
                </label>
                <button @click.prevent="submitRecoveryEmail()"
                  class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  <span>{{ $t('recovery') }}</span>
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