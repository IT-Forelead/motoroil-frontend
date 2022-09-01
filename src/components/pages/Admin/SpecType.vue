
<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';

</script>
<template>
    <div class="flex justify-center px-5 py-2 bg-white">
        <div class="container flex flex-col justify-center">
            <div class="grid grid-cols-3 gap-3">
                <div class="col-span-2 ml-3">
                    <div class="p-3 text-2xl font-semibold text-gray-700">{{ $t('specificationTypes') }}</div>
                    <ul class="flex flex-col divide-y">
                        <li class="flex items-center justify-between px-3 py-2">
                            asasdssdsd
                            <TrashIcon class="w-5 h-5 text-red-500"/>
                        </li>
                        <li class="flex items-center justify-between px-3 py-2">
                            asasdssdsd
                            <TrashIcon class="w-5 h-5 text-red-500"/>
                        </li>
                        <li class="flex items-center justify-between px-3 py-2">
                            asasdssdsd
                            <TrashIcon class="w-5 h-5 text-red-500"/>
                        </li>
                    </ul>
                </div>
                <div class="p-5 space-y-4 bg-white rounded shadow">
                    <div class="p-3 font-medium text-gray-700 border-b text-md">{{ $t('addSpecificationTypes') }}</div>
                    <input type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter specification types...">
                    <button type="submit" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">{{ $t('save') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>