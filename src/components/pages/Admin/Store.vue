<script setup>
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import StackIcon from '../../../assets/icons/StackIcon.vue';
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue';
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">Store</div>
        <div class="flex items-center">
            <div class="relative mr-3">
              <button class="flex items-center justify-between w-full px-3 py-2 text-gray-700 border-0 hover:bg-transparent hover:text-red-500 md:w-auto">
                <FunnelIcon class="mr-2" /> Sort By
              </button>
              <div :class="{ 'hidden': !isOpenSortDropDown }" ref="dropdown"
                class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-10 w-44">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Name (A - Z)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Name (Z - A)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Price (Low > High)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Price (High > Low)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Rating (Highest)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Rating (Lowest)
                  </li>
                </ul>
              </div>
            </div>
            <button class="flex items-center justify-center px-3 py-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
              Add product
            </button>
        </div>
      </div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Product</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Price</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Discount time</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Quantity</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Deals</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Action</td>
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
              <td class="p-3 font-medium text-gray-700">
                $123.0
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarCheckIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">28.08.2022 17:30</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarXIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">28.08.2022 17:30</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Quantity:</div>
                  <div class="font-medium text-gray-700 text-md">123</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Sold product:</div>
                  <div class="font-medium text-gray-700 text-md">123</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Viewsd:</div>
                  <div class="font-medium text-gray-700 text-md">12342</div>
                </div>
              </td>
              <td class="p-3">
                 <label for="holiday-toggle" class="relative inline-flex items-center mr-3 cursor-pointer">
                  <input type="checkbox" id="holiday-toggle" class="sr-only peer" />
                  <div class="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
                </label>
              </td>
              <td class="p-3">
                <div class="flex items-start justify-center">
                  <button class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                    <TrashIcon />
                  </button>
                </div>
              </td>
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
              <td class="p-3 font-medium text-gray-700">
                $123.0
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarCheckIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">28.08.2022 17:30</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarXIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">28.08.2022 17:30</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Quantity:</div>
                  <div class="font-medium text-gray-700 text-md">123</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Sold product:</div>
                  <div class="font-medium text-gray-700 text-md">123</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Viewsd:</div>
                  <div class="font-medium text-gray-700 text-md">12342</div>
                </div>
              </td>
              <td class="p-3">
                 <label for="holiday-toggle" class="relative inline-flex items-center mr-3 cursor-pointer">
                  <input type="checkbox" id="holiday-toggle" class="sr-only peer" />
                  <div class="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
                </label>
              </td>
              <td class="p-3">
                <div class="flex items-start justify-center">
                  <button class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                    <TrashIcon />
                  </button>
                </div>
              </td>
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
              <td class="p-3 font-medium text-gray-700">
                $123.0
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarCheckIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">28.08.2022 17:30</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarXIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">28.08.2022 17:30</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Quantity:</div>
                  <div class="font-medium text-gray-700 text-md">123</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Sold product:</div>
                  <div class="font-medium text-gray-700 text-md">123</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Viewsd:</div>
                  <div class="font-medium text-gray-700 text-md">12342</div>
                </div>
              </td>
              <td class="p-3">
                 <label for="holiday-toggle" class="relative inline-flex items-center mr-3 cursor-pointer">
                  <input type="checkbox" id="holiday-toggle" class="sr-only peer" />
                  <div class="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
                </label>
              </td>
              <td class="p-3">
                <div class="flex items-start justify-center">
                  <button class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>