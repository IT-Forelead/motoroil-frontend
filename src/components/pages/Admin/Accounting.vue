<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import StackIcon from '../../../assets/icons/StackIcon.vue';
import PdfFileIcon from '../../../assets/icons/PdfFileIcon.vue';
import CalendarIcon from '../../../assets/icons/CalendarIcon.vue';
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">Accounting</div>
        <div class="flex items-center space-x-3">
          <button class="flex items-center justify-center px-5 py-2 text-blue-500 bg-white border border-blue-500 rounded hover:bg-gray-100">
            <CalendarIcon class="mr-1" />
            Filter date
          </button>
          <a class="flex items-center justify-center px-5 py-2 text-blue-500 bg-white border border-blue-500 rounded cursor-pointer hover:bg-gray-100">
            <PdfFileIcon class="mr-1" />
            Download PDF
          </a>
        </div>
      </div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Product</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Count</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Price</td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <div>
                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="w-full h-12" alt="#">
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                    <div class="flex items-center text-sm text-gray-500">
                      <StackIcon class="mr-1"/>
                      Automotivation
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-3 font-medium text-gray-700 text-md">3423</td>
              <td class="p-3 font-medium text-gray-700 text-md">$3423.0</td>
            </tr>
            <tr class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <div>
                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="w-full h-12" alt="#">
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                    <div class="flex items-center text-sm text-gray-500">
                      <StackIcon class="mr-1"/>
                      Automotivation
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-3 font-medium text-gray-700 text-md">3423</td>
              <td class="p-3 font-medium text-gray-700 text-md">$3423.0</td>
            </tr>
            <tr class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <div>
                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="w-full h-12" alt="#">
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                    <div class="flex items-center text-sm text-gray-500">
                      <StackIcon class="mr-1"/>
                      Automotivation
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-3 font-medium text-gray-700 text-md">3423</td>
              <td class="p-3 font-medium text-gray-700 text-md">$3423.0</td>
            </tr>
            <tr class="align-middle">
              <td class="p-3 font-medium text-gray-700 text-md">Total:</td>
              <td class="p-3 font-medium text-gray-700 text-md">3423</td>
              <td class="p-3 font-medium text-gray-700 text-md">$3423.0</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>