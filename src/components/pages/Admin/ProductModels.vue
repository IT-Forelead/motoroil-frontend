
<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import { useProductStore } from '../../../stores/product.js'
import { onMounted, reactive } from '@vue/runtime-core';
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { uuid } from 'vue-uuid';

const store = useProductStore()

const brand = reactive({
  id: uuid.v4(),
  name: ''
})

const saeViscosityGrade = reactive({
  id: uuid.v4(),
  name: ''
})

const productOEM = reactive({
  id: uuid.v4(),
  name: ''
})

const specification = reactive({
  id: uuid.v4(),
  name: ''
})

const addBrand = () => {
    if (brand.name === ''){
        notify.error({
			message: 'Please, enter brand name!',
			position: 'bottomRight'
		})
    } else {
        store.createBrand(brand).then(() => {
            brand.name = ''
        })
    }
}

const addSAEViscosityGrade = () => {
    if (saeViscosityGrade.name === ''){
        notify.error({
			message: 'Please, enter SAE ViscosityGrade name!',
			position: 'bottomRight'
		})
    } else {
        store.createSAEViscosityGrade(saeViscosityGrade).then(() => {
            saeViscosityGrade.name = ''
        })
    }
}

const addProductOEM = () => {
    if (productOEM.name === ''){
        notify.error({
			message: 'Please, enter OEM name!',
			position: 'bottomRight'
		})
    } else {
        store.createProductOEM(productOEM).then(() => {
            productOEM.name = ''
        })
    }
}

const addSpecification = () => {
    if (specification.name === ''){
        notify.error({
			message: 'Please, enter specification name!',
			position: 'bottomRight'
		})
    } else {
        store.createSpecification(specification).then(() => {
            specification.name = ''
        })
    }
}

onMounted(() => {
  store.getBrands()
  store.getSAEViscosityGrades()
  store.getProductOEMs()
  store.getSpecifications()
})

</script>
<template>
    <div class="flex justify-center px-5 py-2 bg-white">
        <div class="container flex flex-col justify-center">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">{{ $t('addBrand') }}</div>
                        <input v-model="brand.name" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter brand...">
                        <button @click="addBrand()" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                          {{ $t('save') }}</button>
                    </div>
                    <div class="p-3 text-xl font-semibold text-gray-700">{{ $t('brands') }}</div>
                    <ul class="flex flex-col divide-y max-h-[30rem] overflow-y-auto">
                        <li v-for="(brand, idx) in store.brands" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ brand?.name }}
                            <div @click="store.deleteBrand(brand?.id)">
                                <TrashIcon class="w-5 h-5 text-red-500"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">{{ $t('addSAEViscosityGrade') }}</div>
                        <input v-model="saeViscosityGrade.name" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter SAE Viscosity Grade...">
                        <button @click="addSAEViscosityGrade()" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                          {{ $t('save') }}</button>
                    </div>
                    <div class="p-3 text-xl font-semibold text-gray-700">{{ $t('saeViscosityGrades') }}</div>
                    <ul class="flex flex-col overflow-y-auto divide-y max-h-[30rem]">
                        <li v-for="(sae, idx) in store.saeViscosityGrades" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ sae?.name }}
                            <div @click="store.deleteSAEViscosityGrade(sae?.id)">
                                <TrashIcon class="w-5 h-5 text-red-500"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">{{ $t('addOEMApproval') }}</div>
                        <input v-model="productOEM.name" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter product OEM...">
                        <button @click="addProductOEM()" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">{{ $t('save') }}</button>
                    </div>
                    <div class="p-3 text-xl font-semibold text-gray-700">{{ $t('oemApprovals') }}</div>
                    <ul class="flex flex-col divide-y max-h-[30rem] overflow-y-auto">
                        <li v-for="(oem, idx) in store.productOEMs" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ oem?.name }}
                            <div @click="store.deleteProductOEM(oem?.id)">
                                <TrashIcon class="w-5 h-5 text-red-500"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">{{ $t('addSpecification') }}</div>
                        <input v-model="specification.name" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter specification...">
                        <button @click="addSpecification" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                          {{ $t('save') }}</button>
                    </div>
                    <div class="p-3 text-2xl font-semibold text-gray-700">{{ $t('specifications') }}</div>
                    <ul class="flex flex-col divide-y max-h-[30rem] overflow-y-auto">
                        <li v-for="(specifications, idx) in store.productSpecifications" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ specifications?.name }}
                            <div @click="store.deleteSpecification(specifications?.id)">
                                <TrashIcon class="w-5 h-5 text-red-500"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>