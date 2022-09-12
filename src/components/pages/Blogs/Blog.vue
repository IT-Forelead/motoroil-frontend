<script setup>
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import UserFillIcon from '../../../assets/icons/UserFillIcon.vue';
import CalendarFillIcon from '../../../assets/icons/CalendarFillIcon.vue';
import { onMounted } from 'vue';
import { useBlogStore } from '../../../stores/blog.js'
import { useModalStore } from '../../../stores/modal.js'
import { useAuthStore } from '../../../stores/auth.js';
import { useAnalyticsStore } from '../../../stores/analytics.js';
import { formatDateTime } from '../../../mixins/utils.js';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import CloseIcon from '../../../assets/icons/CloseIcon.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useBlogStore()
const authStore = useAuthStore()
const analyticsStore = useAnalyticsStore()

onMounted(() => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
	store.getSingleBlog(sessionStorage.getItem('sb_id'))

	let eventData = {}
	if (authStore.userId) {
		eventData = {
			name: 'pageVisited',
			visitorId:
			localStorage.getItem('visitorId') || analyticsStore.visitorId,
			userId: authStore.userId,
			page: 'blogs',
		} 
	} else {
		eventData = {
			name: 'pageVisited',
			visitorId:
			localStorage.getItem('visitorId') || analyticsStore.visitorId,
			page: 'blogs',
		}
	}
	analyticsStore.saveEvent(eventData)
})
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
					<a href="/blogs" class="text-gray-700">{{ $t('blogs') }}</a>
					<CaretRightIcon class="mx-3 text-gray-500" />
				</li>
				<li class="text-red-700">{{ store.singleBlog.title }}</li>
			</ul>
		</div>
		<div class="grid grid-cols-1 gap-10 md:grid-cols-4">
			<Sidebar />
			<div class="col-span-3 px-3">
				<div class="py-3 text-2xl font-semibold text-gray-700">{{ store.singleBlog.title }}</div>
				<ul class="flex items-center space-x-5 text-sm text-gray-400">
					<li class="flex items-center justify-between">
						<CalendarFillIcon class="mr-1" />
						<span>{{ formatDateTime(store.singleBlog.createdAt) }}</span>
					</li>
					<li class="flex items-center justify-between">
						<UserFillIcon class="mr-1" />
						<span>{{ $t('author') }}: {{ store.singleBlog.userName }}</span>
					</li>
				</ul>
				<img :src="API_URL + '/image/' + store.singleBlog.imageUrl" class="object-fill" alt="#">
				<div class="py-3 font-normal text-gray-700 text-md" v-html="store.singleBlog?.text"></div>
				<ul v-if="authStore.user?.role === 'admin'" class="flex p-2 space-x-3 border-t border-gray-600">
					<li @click="useModalStore().openEditBlogModal()" class="flex items-center text-gray-600 cursor-pointer">
						<PencilDuotoneIcon class="w-5 h-5 mr-1"/>
						<span>Edit</span>
					</li>
					<li @click="store.deleteBlog(store.singleBlog.id)" class="flex items-center text-gray-600 cursor-pointer">
						<TrashIcon class="w-5 h-5 mr-1"/>
						<span>Delete</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
<!-- Add Blog Modal -->
<div :class="{ hidden: !useModalStore().isOpenEditBlogModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
	<div class="relative w-full h-full max-w-3xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
		<div class="relative bg-white rounded shadow dark:bg-gray-700">
			<div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('editBlog') }}</h3>
				<button type="button" @click="useModalStore().closeEditBlogModal()" class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900" data-modal-toggle="defaultModal">
					<CloseIcon />
					<span class="sr-only">{{ $t('closeModal') }}</span>
				</button>
			</div>
			<div class="px-6 py-3 space-y-6">
				<form class="my-3">
					<div class="flex flex-col space-y-5">
						<label for="blog-title">
							<p class="pb-2 font-medium text-slate-700">{{ $t('blogTitle') }}</p>
							<input id="blog-title" type="text" class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter blog title" />
						</label>
						<label for="blog-text">
							<p class="mt-2 font-medium text-slate-700">{{ $t('blogContent') }}</p>
							<QuillEditor theme="snow" id="blog-text" />
						</label>
						<label for="blog-text">
							<p class="mt-2 font-medium text-slate-700">{{ $t('blogImage') }}</p>
							<input type="file" class="w-full px-3 py-3"/>
						</label>
						<button class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
							<span>{{$t('save')}}</span>
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