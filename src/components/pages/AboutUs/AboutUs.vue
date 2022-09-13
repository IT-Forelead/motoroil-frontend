<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue';
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import FacebookFIcon from '../../../assets/icons/FacebookFIcon.vue';
import TwitterIcon from '../../../assets/icons/TwitterIcon.vue';
import SkyprIcon from '../../../assets/icons/SkyprIcon.vue';
import AtBoldIcon from '../../../assets/icons/AtBoldIcon.vue';
import DotsThreeVerticalFillIcon from '../../../assets/icons/DotsThreeVerticalFillIcon.vue';
import CloseIcon from '../../../assets/icons/CloseIcon.vue';
import { useAuthStore } from '../../../stores/auth.js';
import { useAboutUsStore } from '../../../stores/aboutUs.js';
import { useModalStore } from '../../../stores/modal.js';
import { computed, onMounted, reactive, ref, watch } from '@vue/runtime-core';
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import $ from 'jquery'
import DropDown from './parts/DropDown.vue'
import WorkerDropDown from './parts/WorkerDropDown.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const authStore = useAuthStore()
const aboutUsStore = useAboutUsStore()
const modalStore = useModalStore()

onMounted(() => {
	aboutUsStore.getAllAboutUsInfos()
	aboutUsStore.getAllWorkers()
})

const informationTitle = ref('')
const informationImage = ref('')

const editInformation = reactive({
  id: '',
  title: '',
  defaultKey: '',
  image: ''
})

watch(
  () => aboutUsStore.singleAboutUs,
  () => {
    editInformation.id = aboutUsStore.getAboutUsId
    editInformation.title = aboutUsStore.getAboutUsTitle
    $('#edit-information-text .ql-editor').html(aboutUsStore.getAboutUsText)
    editInformation.defaultKey = aboutUsStore.getAboutUsDefaultKey
  },
  { deep: true }
)

editInformation.title = aboutUsStore.getAboutUsTitle
function getEditImage(e) {
  if (e?.target?.files[0].type.includes('image')) {
    editInformation.image = e?.target?.files[0]
  }
}

const workerData = reactive({
  "fullname": '',
  "position": '',
  "description": '',
  "image": '',
  "email": '',
  "facebook": '',
  "twitter": '',
  "skype": '',
})

function getImage(e) {
  if (e?.target?.files[0].type.includes('image')) {
    informationImage.value = e?.target?.files[0]
  }
}

function getWorkerImage(e) {
  if (e?.target?.files[0].type.includes('image')) {
    workerData.image = e?.target?.files[0]
  }
}

const submitInformationData = () => {
  const formData = new FormData()
  if (informationTitle.value === ''){
		notify.error({
			message: 'Enter a title!',
			position: 'bottomRight'
		})
	} else if ($('#information-text .ql-editor').html().length < 100){
		notify.error({              
			message: 'Enter a longger description!',
			position: 'bottomRight'
		})
	} else if (informationImage.value === ''){
		notify.error({              
			message: 'Choose a blog image!',
			position: 'bottomRight'
		})
	} else {
    formData.append('aboutUsTitle', informationTitle.value)
    formData.append('aboutUsText', $('#information-text .ql-editor').html())
    formData.append('aboutUsImage', informationImage.value)
    aboutUsStore.createInformation(formData).then(() => {
      informationTitle.value = ''
      informationImage.value = ''
    })
  }
}

const submitEditInformation = () => {
  const formData = new FormData()
  if (editInformation.title === ''){
		notify.error({
			message: 'Enter a title!',
			position: 'bottomRight'
		})
	} else if ($('#edit-information-text .ql-editor').html().length < 100){
		notify.error({              
			message: 'Enter a longger description!',
			position: 'bottomRight'
		})
	} else {
    formData.append('id', editInformation.id)
    formData.append('aboutUsTitle', editInformation.title)
    formData.append('aboutUsText', $('#edit-information-text .ql-editor').html())
    if (editInformation.image){
      formData.append('aboutUsImage', editInformation.image)
    } else {
      formData.append('defaultImageUrl', editInformation.defaultKey)
    }
    aboutUsStore.editInformation(formData).then(() => {
      editInformation.id = ''
      editInformation.title = ''
      editInformation.defaultKey = ''
      editInformation.image = ''
    })
  }
}

const submitWorkerData = () => {
  const formData = new FormData()
  if (workerData.fullname === ''){
		notify.error({
			message: 'Please, enter fullname!',
			position: 'bottomRight'
		})
	} else if (workerData.position === ''){
		notify.error({              
			message: 'Please, enter position!',
			position: 'bottomRight'
		})
	} else if (workerData.description === ''){
		notify.error({              
			message: 'Please, enter description!',
			position: 'bottomRight'
		})
	} else if (workerData.image === ''){
		notify.error({              
			message: 'Please, choose a image!',
			position: 'bottomRight'
		})
	} else if (workerData.email === ''){
		notify.error({              
			message: 'Please, enter email!',
			position: 'bottomRight'
		})
	} else {
    formData.append('workerFullName', workerData.fullname)
    formData.append('workerPosition', workerData.position)
    formData.append('workerDesc', workerData.description)
    formData.append('workerImage', workerData.image)
    formData.append('workerEmail', workerData.email)
    formData.append('workerFacebook', workerData.facebook)
    formData.append('workerTwitter', workerData.twitter)
    formData.append('workerSkype', workerData.skype)
    aboutUsStore.createWorker(formData).then(() => {
      workerData.fullname = ''
      workerData.position = ''
      workerData.description = ''
      workerData.image = ''
      workerData.email = ''
      workerData.facebook = ''
      workerData.twitter = ''
      workerData.skype = ''
    })
  }
}
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
        <li class="flex items-center">
          <a href="/about-us" class="text-red-600">{{ $t('aboutUs') }}</a>
        </li>
      </ul>
    </div>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
      <Sidebar />
      <div class="col-span-3 ml-3">
        <div v-if="authStore.user?.role === 'admin'" class="flex justify-end">
          <button @click="modalStore.openAddAboutUsInfoModal()" class="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
            {{$t('addInformation')}}
          </button>
        </div>
        <div v-for="(information, idx) in aboutUsStore.aboutUsInfos" :key="idx">
          <div class="flex items-center justify-between">
            <div class="p-3 text-2xl font-semibold text-gray-700">{{ information?.title }}</div>
            <DropDown :id="information?.id"/>
          </div>
          <div>
            <div class="float-left mb-5 mr-5 w-[30rem]">
              <img :src="API_URL + '/image/' + information?.imageUrl" alt="#"/>
            </div>
            <p class="text-justify text-gray-700 text-md" v-html="information?.text"></p>
          </div>
          <div class="clear-both"></div>
        </div>
        <div class="flex justify-between p-3 mt-3">
          <div class="text-2xl font-semibold text-gray-700">{{ $t('ourMember') }}</div>
          <button v-if="authStore.user?.role === 'admin'" @click="modalStore.openAddWorkerModal()" class="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
            {{ $t('addMember') }}
          </button>
        </div>
        <div class="px-3 py-1 text-center text-gray-500 text-md">
          Consectetur adipiscing elit. Donec pellentesque venenatis elit, quis aliquet mauris malesuada vel. Donec vitae libero dolor, eget dapibus
          justo. <br>
          Aenean facilisis aliquet feugiat. Suspendisse lacinia congue est ac semper. Nulla ut elit magna, vitae volutpat magna.
        </div>
        <div class="grid grid-cols-2 gap-5 mt-2">
          <div v-for="(worker, idx) in aboutUsStore.workers" :key="idx" class="relative flex p-3 border border-red-500 rounded">
            <div class="flex items-center justify-center w-56">
              <img :src="API_URL + '/image/' + worker?.imageUrl" alt="#"/>
            </div>
            <div class="flex flex-col pl-3 space-y-2">
              <div class="text-lg font-medium text-gray-700">{{ worker?.fullName }}</div>
              <div class="text-gray-600 uppercase text-md">{{ worker?.position }}</div>
              <div class="text-sm text-gray-500">{{ worker?.description }}</div>
              <ul class="flex space-x-2">
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'mailto:' + worker?.facebook">
                    <AtBoldIcon class="w-6 h-6"/>
                  </a>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'https://facebook.com/' + worker?.facebook" target="blank">
                    <FacebookFIcon class="w-5 h-5"/>
                  </a>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'https://twitter.com/' + worker?.twitter" target="blank">
                    <TwitterIcon class="w-5 h-5"/>
                  </a>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'https://skype.com/' + worker?.skype" target="blank">
                    <SkyprIcon class="w-6 h-6"/>
                  </a>
                </li>
              </ul>
              <div class="absolute right-0 top-1">
                <WorkerDropDown :id="worker?.id"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Add Information Modal -->
<div :class="{ hidden: !modalStore.isOpenAddAboutUsInfoModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
  <div class="relative w-full h-full max-w-3xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
    <div class="relative bg-white rounded shadow dark:bg-gray-700">
      <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{$t('addInformation')}}</h3>
        <button type="button" @click="modalStore.closeAddAboutUsInfoModal()" class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900" data-modal-toggle="defaultModal">
          <CloseIcon />
          <span class="sr-only">{{ $t('closeModal') }}</span>
        </button>
      </div>
      <div class="px-6 py-3 space-y-6">
        <form class="my-3">
          <div class="flex flex-col space-y-5">
            <label for="information-title">
              <p class="pb-2 font-medium text-slate-700">{{ $t('title') }}</p>
              <input
                id="information-title"
                type="text"
                v-model="informationTitle"
                class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter title"
              />
            </label>
            <label for="information-text">
              <p class="mt-2 font-medium text-slate-700">{{ $t('text') }}</p>
              <QuillEditor theme="snow" id="information-text" />
            </label>
            <label for="information-text">
              <p class="mt-2 font-medium text-slate-700">{{ $t('image') }}</p>
              <input type="file" class="w-full px-3 py-3" @change="getImage"/>
            </label>
            <button @click.prevent="submitInformationData()" class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              <span>{{ $t('add') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- Edit Information Modal -->
<div :class="{ hidden: !modalStore.isOpenEditAboutUsInfoModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
  <div class="relative w-full h-full max-w-3xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
    <div class="relative bg-white rounded shadow dark:bg-gray-700">
      <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Information</h3>
        <button type="button" @click="modalStore.closeEditAboutUsInfoModal()" class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900" data-modal-toggle="defaultModal">
          <CloseIcon />
          <span class="sr-only">{{ $t('closeModal') }}</span>
        </button>
      </div>
      <div class="px-6 py-3 space-y-6">
        <form @submit.prevent="submitEditInformation()" class="my-3">
          <div class="flex flex-col space-y-5">
            <label for="edit-information-title">
              <p class="pb-2 font-medium text-slate-700">{{ $t('title') }}</p>
              <input
                id="edit-information-title"
                v-model="editInformation.title"
                type="text"
                class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter title"
              />
            </label>
            <label for="edit-information-text">
              <p class="mt-2 font-medium text-slate-700">{{ $t('text') }}</p>
              <div class="overflow-y-auto max-h-96">
                <QuillEditor theme="snow" id="edit-information-text" />
              </div>
            </label>
            <label for="edit-information-image">
              <p class="mt-2 font-medium text-slate-700">{{ $t('image') }}</p>
              <input type="file" @change="getEditImage" class="w-full px-3 py-3"/>
            </label>
            <button class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              <span>{{ $t('save') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- Add Worker Modal -->
<div :class="{ hidden: !modalStore.isOpenAddWorkerModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
  <div class="relative w-full h-full max-w-5xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
    <div class="relative bg-white rounded shadow dark:bg-gray-700">
      <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add worker</h3>
        <button type="button" @click="modalStore.closeAddWorkerModal()" class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900" data-modal-toggle="defaultModal">
          <CloseIcon />
          <span class="sr-only">{{ $t('closeModal') }}</span>
        </button>
      </div>
      <div class="px-6 py-3">
        <form class="my-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col space-y-5">
              <label for="worker-fullname">
                <p class="pb-2 font-medium text-slate-700">Full name</p>
                <input
                  id="worker-fullname"
                  type="text"
                  v-model="workerData.fullname"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter title"
                />
              </label>
              <label for="worker-position">
                <p class="pb-2 font-medium text-slate-700">Position</p>
                <input
                  id="worker-position"
                  type="text"
                  v-model="workerData.position"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter Position"
                />
              </label>
              <label for="worker-description">
                <p class="pb-2 font-medium text-slate-700">Description</p>
                <input
                  id="worker-description"
                  type="text"
                  v-model="workerData.description"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter description"
                />
              </label>
              <label for="worker-image">
                <p class="mt-2 font-medium text-slate-700">Image</p>
                <input id="worker-image" type="file" class="w-full px-3 py-3" @change="getWorkerImage"/>
              </label>
            </div>
            <div class="flex flex-col space-y-5">
              <label for="worker-email">
                <p class="pb-2 font-medium text-slate-700">Email</p>
                <input
                  id="worker-email"
                  type="email"
                  v-model="workerData.email"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter worker's email"
                />
              </label>
              <label for="worker-facebook">
                <p class="pb-2 font-medium text-slate-700">Facebook</p>
                <input
                  id="worker-facebook"
                  type="text"
                  v-model="workerData.facebook"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter facebook username"
                />
              </label>
              <label for="worker-twitter">
                <p class="pb-2 font-medium text-slate-700">Twitter</p>
                <input
                  id="worker-twitter"
                  type="text"
                  v-model="workerData.twitter"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter twitter username"
                />
              </label>
              <label for="worker-skype">
                <p class="pb-2 font-medium text-slate-700">Skype</p>
                <input
                  id="worker-skype"
                  type="text"
                  v-model="workerData.skype"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter skype username"
                />
              </label>
            </div>
          </div>
          <div class="flex justify-end pt-3 mt-3 border-t border-gray-300">
            <button @click.prevent="submitWorkerData()" class="inline-flex items-center justify-center py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded w-28 hover:bg-red-400 hover:shadow">
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- Edit Worker Modal -->
<div :class="{ hidden: !modalStore.isOpenEditWorkerModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
  <div class="relative w-full h-full max-w-5xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
    <div class="relative bg-white rounded shadow dark:bg-gray-700">
      <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit worker</h3>
        <button type="button" @click="modalStore.closeEditWorkerModal()" class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900" data-modal-toggle="defaultModal">
          <CloseIcon />
          <span class="sr-only">{{ $t('closeModal') }}</span>
        </button>
      </div>
      <div class="px-6 py-3">
        <form class="my-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col space-y-5">
              <label for="edit-worker-fullname">
                <p class="pb-2 font-medium text-slate-700">Full name</p>
                <input
                  id="edit-worker-fullname"
                  type="text"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter title"
                />
              </label>
              <label for="edit-worker-position">
                <p class="pb-2 font-medium text-slate-700">Position</p>
                <input
                  id="edit-worker-position"
                  type="text"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter Position"
                />
              </label>
              <label for="edit-worker-description">
                <p class="pb-2 font-medium text-slate-700">Description</p>
                <input
                  id="edit-worker-description"
                  type="text"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter description"
                />
              </label>
              <label for="edit-worker-image">
                <p class="mt-2 font-medium text-slate-700">Image</p>
                <input id="edit-worker-image" type="file" class="w-full px-3 py-3"/>
              </label>
            </div>
            <div class="flex flex-col space-y-5">
              <label for="edit-worker-email">
                <p class="pb-2 font-medium text-slate-700">Email</p>
                <input
                  id="edit-worker-email"
                  type="email"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter worker's email"
                />
              </label>
              <label for="edit-worker-facebook">
                <p class="pb-2 font-medium text-slate-700">Facebook</p>
                <input
                  id="edit-worker-facebook"
                  type="text"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter facebook username"
                />
              </label>
              <label for="edit-worker-twitter">
                <p class="pb-2 font-medium text-slate-700">Twitter</p>
                <input
                  id="edit-worker-twitter"
                  type="text"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter twitter username"
                />
              </label>
              <label for="edit-worker-skype">
                <p class="pb-2 font-medium text-slate-700">Skype</p>
                <input
                  id="edit-worker-skype"
                  type="text"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter skype username"
                />
              </label>
            </div>
          </div>
          <div class="flex justify-end pt-3 mt-3 border-t border-gray-300">
            <button class="inline-flex items-center justify-center py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded w-28 hover:bg-red-400 hover:shadow">
              <span>{{ $t('save') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>