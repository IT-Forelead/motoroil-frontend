
<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import { useProductStore } from '../../../stores/product.js'
import { onMounted } from '@vue/runtime-core';

const store = useProductStore()

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
            <div class="grid grid-cols-4 gap-5">
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">Add brand</div>
                        <input type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter brand...">
                        <button type="submit" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Save</button>
                    </div>
                    <div class="p-3 text-xl font-semibold text-gray-700">Brands</div>
                    <ul class="flex flex-col divide-y max-h-[30rem] overflow-y-auto">
                        <li v-for="(brand, idx) in store.brands" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ brand?.name }}
                            <TrashIcon class="w-5 h-5 text-red-500"/>
                        </li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">Add SAE Viscosity Grade</div>
                        <input type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter SAE Viscosity Grade...">
                        <button type="submit" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Save</button>
                    </div>
                    <div class="p-3 text-xl font-semibold text-gray-700">SAE Viscosity Grades</div>
                    <ul class="flex flex-col overflow-y-auto divide-y max-h-[30rem]">
                        <li v-for="(sae, idx) in store.saeViscosityGrades" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ sae?.name }}
                            <TrashIcon class="w-5 h-5 text-red-500"/>
                        </li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">Add OEM approval</div>
                        <input type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter product OEM...">
                        <button type="submit" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Save</button>
                    </div>
                    <div class="p-3 text-xl font-semibold text-gray-700">OEM approvals</div>
                    <ul class="flex flex-col divide-y max-h-[30rem] overflow-y-auto">
                        <li v-for="(oem, idx) in store.productOEMs" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ oem?.name }}
                            <TrashIcon class="w-5 h-5 text-red-500"/>
                        </li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <div class="p-5 space-y-4 bg-white rounded shadow">
                        <div class="p-3 font-medium text-gray-700 border-b text-md">Add specification</div>
                        <input type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter specification...">
                        <button type="submit" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Save</button>
                    </div>
                    <div class="p-3 text-2xl font-semibold text-gray-700">Specifications</div>
                    <ul class="flex flex-col divide-y max-h-[30rem] overflow-y-auto">
                        <li v-for="(specifications, idx) in store.productSpecifications" :key="idx" class="flex items-center justify-between px-3 py-2">
                            {{ specifications?.name }}
                            <TrashIcon class="w-5 h-5 text-red-500"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>