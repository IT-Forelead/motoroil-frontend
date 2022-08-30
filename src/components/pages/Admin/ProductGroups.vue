<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue';
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import PlusIcon from '../../../assets/icons/PlusIcon.vue';
import MinusIcon from '../../../assets/icons/MinusIcon.vue';
import StackIcon from '../../../assets/icons/StackIcon.vue';
import OilCanIcon from '../../../assets/icons/OilCanIcon.vue';
import YoutubeIcon from '../../../assets/icons/YoutubeIcon.vue';
import PdfFileIcon from '../../../assets/icons/PdfFileIcon.vue';
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">Product Groups</div>
        <button class="flex items-center justify-center px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
          Add product group
        </button>
      </div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Discount</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Validity preiod</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Status</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Files</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Action</td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex flex-col">
                    <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                      <div class="flex items-center">
                        <StackIcon class="mr-1"/>
                        Automotivation
                      </div>
                      <div class="flex items-center">
                        <OilCanIcon class="mr-1"/>
                        W10-50
                      </div>
                    </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex flex-col">
                  <div class="font-medium text-gray-700 text-md">AUTOMOTIVE</div>
                  <div class="font-medium text-gray-700 text-md">HDMO</div>
                  <div class="font-medium text-gray-700 text-md">Premium</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">OEM-Freigabe:</div>
                  <div class="font-medium text-gray-700 text-md">2-Stroke DFI, 82009201</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Spezifikation:</div>
                  <div class="font-medium text-gray-700 text-md">ACEA A2/B2, ACEA A1/B1</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center space-x-3">
                  <YoutubeIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                  <PdfFileIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
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
                <div class="flex flex-col">
                    <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                      <div class="flex items-center">
                        <StackIcon class="mr-1"/>
                        Automotivation
                      </div>
                      <div class="flex items-center">
                        <OilCanIcon class="mr-1"/>
                        W10-50
                      </div>
                    </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex flex-col">
                  <div class="font-medium text-gray-700 text-md">AUTOMOTIVE</div>
                  <div class="font-medium text-gray-700 text-md">HDMO</div>
                  <div class="font-medium text-gray-700 text-md">Premium</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">OEM-Freigabe:</div>
                  <div class="font-medium text-gray-700 text-md">2-Stroke DFI, 82009201</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Spezifikation:</div>
                  <div class="font-medium text-gray-700 text-md">ACEA A2/B2, ACEA A1/B1</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center space-x-3">
                  <YoutubeIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                  <PdfFileIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
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
                <div class="flex flex-col">
                    <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                      <div class="flex items-center">
                        <StackIcon class="mr-1"/>
                        Automotivation
                      </div>
                      <div class="flex items-center">
                        <OilCanIcon class="mr-1"/>
                        W10-50
                      </div>
                    </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex flex-col">
                  <div class="font-medium text-gray-700 text-md">AUTOMOTIVE</div>
                  <div class="font-medium text-gray-700 text-md">HDMO</div>
                  <div class="font-medium text-gray-700 text-md">Premium</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">OEM-Freigabe:</div>
                  <div class="font-medium text-gray-700 text-md">2-Stroke DFI, 82009201</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Spezifikation:</div>
                  <div class="font-medium text-gray-700 text-md">ACEA A2/B2, ACEA A1/B1</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center space-x-3">
                  <YoutubeIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                  <PdfFileIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
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