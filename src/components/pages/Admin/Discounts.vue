<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue';
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import PlusIcon from '../../../assets/icons/PlusIcon.vue';
import MinusIcon from '../../../assets/icons/MinusIcon.vue';
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">{{ $t('discounts') }}</div>
        <button class="flex items-center justify-center px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
          {{ $t('addDiscount') }}
        </button>
      </div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('discount') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('validityPeriod') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('status') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('action') }}</td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-3">
                  <div class="relative z-10 flex items-center justify-center w-10 h-10 font-semibold bg-yellow-300 discount">
                    <span class="text-xl">10</span>
                    <span class="text-xs">%</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">Yozgi aksiya</div>
                    <div class="text-sm text-gray-500">
                      Dm yamon aksiya.
                    </div>
                  </div>
                </div>
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
                <div class="w-24 px-2 py-1 text-sm text-center text-white bg-green-500 rounded-full">
                  active
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PlusIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
            <tr class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-3">
                  <div class="relative z-10 flex items-center justify-center w-10 h-10 font-semibold bg-yellow-300 discount">
                    <span class="text-xl">10</span>
                    <span class="text-xs">%</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">Yozgi aksiya</div>
                    <div class="text-sm text-gray-500">
                      Dm yamon aksiya.
                    </div>
                  </div>
                </div>
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
                <div class="w-24 px-2 py-1 text-sm text-center text-white bg-green-500 rounded-full">
                  active
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PlusIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
            <tr class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-3">
                  <div class="relative z-10 flex items-center justify-center w-10 h-10 font-semibold bg-yellow-300 discount">
                    <span class="text-xl">10</span>
                    <span class="text-xs">%</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">Yozgi aksiya</div>
                    <div class="text-sm text-gray-500">
                      Dm yamon aksiya.
                    </div>
                  </div>
                </div>
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
                <div class="w-24 px-2 py-1 text-sm text-center text-white bg-green-500 rounded-full">
                  {{ $t('active') }}
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PlusIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
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
.discount:before {
    transform: rotate(30deg);
}
.discount:after {
    transform: rotate(60deg);
}
.discount:before, .discount:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: rgb(255, 217, 0);
}
</style>