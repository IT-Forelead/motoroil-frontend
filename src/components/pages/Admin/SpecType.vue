
<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import { useProductStore } from '../../../stores/product.js'
import { onMounted, reactive } from '@vue/runtime-core';
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { uuid } from 'vue-uuid';

const store = useProductStore()

const specType = reactive({
  id: uuid.v4(),
  name: ''
})

const addSpecType = () => {
    if (specType.name === ''){
        notify.error({
			message: 'Please, enter specification types!',
			position: 'bottomRight'
		})
    } else {
        store.createSpecType(specType).then(() => {
            specType.name = ''
        })
    }
}

onMounted(() => {
  store.getAllSpecTypes()
})

</script>
<template>
    <div class="flex justify-center px-5 py-2 bg-white">
        <div class="container flex flex-col justify-center">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                <div class="col-span-2 ml-3">
                    <div class="p-3 text-2xl font-semibold text-gray-700">{{ $t('specificationTypes') }}</div>
                    <ul class="flex flex-col divide-y">
                        <li v-for="(specType, idx) in store.specTypes" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ specType?.name }}
                            <div @click="store.deleteSpecType(specType?.id)">
                                <TrashIcon class="w-5 h-5 text-red-500"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="p-5 space-y-4 bg-white rounded shadow">
                    <div class="p-3 font-medium text-gray-700 border-b text-md">{{ $t('addSpecificationTypes') }}</div>
                    <input v-model="specType.name" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter specification types...">
                    <button @click="addSpecType()" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">{{ $t('save') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>