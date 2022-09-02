<script setup>
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import UserFillIcon from '../../../assets/icons/UserFillIcon.vue';
import CalendarFillIcon from '../../../assets/icons/CalendarFillIcon.vue';
import { onMounted } from 'vue';
import { useBlogStore } from '../../../stores/blog.js'
import { formatDateTime } from '../../../mixins/utils.js';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useBlogStore()

onMounted(() => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
	store.getSingleBlog(sessionStorage.getItem('sb_id'))
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
			<div class="grid grid-cols-4 gap-10">
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
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>