<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue'
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue'
import StackIcon from '../../../assets/icons/StackIcon.vue'
import OilCanIcon from '../../../assets/icons/OilCanIcon.vue'
import YoutubeIcon from '../../../assets/icons/YoutubeIcon.vue'
import PdfFileIcon from '../../../assets/icons/PdfFileIcon.vue'
import { useProductStore } from '../../../stores/product.js'
import { useCategoryStore } from '../../../stores/category.js'
import { useModalStore } from '../../../stores/modal.js'
import { onMounted, reactive, ref, watch } from '@vue/runtime-core'
import CloseIcon from '../../../assets/icons/CloseIcon.vue'
import $ from 'jquery'
import MultiSelect from '../../MultiSelect.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const store = useProductStore()
const modalStore = useModalStore()
const categoryStore = useCategoryStore()
const videoLink = ref('')

const getVideoLink = (link) => (videoLink.value = link.replace('watch?v=', 'embed/'))

const productGroupForm = reactive({
  name: '',
  description: '',
  categoryId: '',
  subCategoryId: '',
  miniSubCategoryId: '',
  brandId: '',
  viscosityGradeId: '',
  videoUrl: '',
  pdfUrl: '',
})

function getFile(e) {
  productGroupForm.pdfUrl = e?.target?.files[0]
}

function getEditFile(e) {
  editedProductGroupData.pdfUrl = e?.target?.files[0]
}

const submitProductGroupData = () => {
  productGroupForm.description = $('#desc .ql-editor').html()
  const formData = new FormData()
  formData.append('name', productGroupForm.name)
  formData.append('description', productGroupForm.description)
  formData.append('categoryId', productGroupForm.categoryId)
  if (productGroupForm.subCategoryId) {
    formData.append('subCategoryId', productGroupForm.subCategoryId)
  }
  if (productGroupForm.miniSubCategoryId) {
    formData.append('miniSubCategoryId', productGroupForm.miniSubCategoryId)
  }
  formData.append('brandId', productGroupForm.brandId)
  formData.append('viscosityGradeId', productGroupForm.viscosityGradeId)
  formData.append('videoUrl', productGroupForm.videoUrl)
  formData.append('productOEMIds', store.multiselectOEMids.join(','))
  formData.append('productSpecIds', store.multiselectSpecids.join(','))
  formData.append('pdfUrl', productGroupForm.pdfUrl)

  if (!productGroupForm?.name) {
    notify.warning({
      message: 'Please enter product group Name',
      position: 'bottomRight',
    })
  } else if (productGroupForm?.description.length < 100) {
    notify.warning({
      message: 'Please enter longer product group Description',
      position: 'bottomRight',
    })
  } else if (!productGroupForm?.categoryId) {
    notify.warning({
      message: 'Please select product group Category',
      position: 'bottomRight',
    })
  } else if (!productGroupForm?.brandId) {
    notify.warning({
      message: 'Please select product group Brand',
      position: 'bottomRight',
    })
  } else if (!productGroupForm?.viscosityGradeId) {
    notify.warning({
      message: 'Please select product group Viscosity Grade',
      position: 'bottomRight',
    })
  } else if (store.multiselectOEMids.length === 0) {
    notify.warning({
      message: 'Please select at least one product OEM',
      position: 'bottomRight',
    })
  } else if (store.multiselectSpecids.length === 0) {
    notify.warning({
      message: 'Please select at least one product Specification',
      position: 'bottomRight',
    })
  } else {
    store.createProductGroup(formData)
  }
}

const oemOptions = ref([])
const specOptions = ref([])
const oemOptionsForEdit = ref([])
const specOptionsForEdit = ref([])

onMounted(() => {
  store.getProductGroups()
  categoryStore.getAllCategories()
  categoryStore.getAllSubCategories()
  categoryStore.getAllMiniSubCategories()
  store.getBrands()
  store.getSAEViscosityGrades()
  store.getProductOEMs().then(() => {
    if (store.productOEMs.length > 0) {
      oemOptions.value = store.productOEMs
    }
  })
  store.getSpecifications().then(() => {
    if (store.productSpecifications.length > 0) {
      specOptions.value = store.productSpecifications
    }
  })
})

const closeAndClear = () => {
  productGroupForm.name = '',
    productGroupForm.description = '',
    productGroupForm.categoryId = '',
    productGroupForm.subCategoryId = '',
    productGroupForm.miniSubCategoryId = '',
    productGroupForm.brandId = '',
    productGroupForm.viscosityGradeId = '',
    productGroupForm.videoUrl = '',
    productGroupForm.productOEMIds = '',
    productGroupForm.productSpecIds = '',
    productGroupForm.pdfUrl = ''
  store.multiselectOEMids = []
  store.multiselectSpecids = []
  modalStore.closeProductGroupModal()
}

const editedProductGroupData = reactive({
  id: '',
  name: '',
  brandId: '',
  categoryId: '',
  subCategoryId: '',
  miniSubCategoryId: '',
  videoUrl: '',
  viscosityGradeId: '',
  pdfUrl: '',
  createdAt: '',
  categoriesId: ''
})

const closeEditModal = () => {
  modalStore.closeEditProductGroupModal()
  editedProductGroupData.name = ''
  $('#editProductDesc .ql-editor').html('')
  editedProductGroupData.categoryId = ''
  editedProductGroupData.subCategoryId = ''
  editedProductGroupData.miniSubCategoryId = ''
  editedProductGroupData.brandId = ''
  editedProductGroupData.viscosityGradeId = ''
  editedProductGroupData.videoUrl = ''
  editedProductGroupData.createdAt = ''
  editedProductGroupData.categoriesId = ''
  store.setMultiselectOEMids([])
  store.setMultiselectSpecids([])
}

watch(
  () => store.selectedProductGroup,
  () => {
    editedProductGroupData.name = store.getSelectedProductGroupName
    $('#editProductDesc .ql-editor').html(store.getSelectedProductGroupDesc)
    editedProductGroupData.categoryId = store.getSelectedProductGroupCategoryId
    editedProductGroupData.subCategoryId = store.getSelectedProductGroupSubCategoryId
    editedProductGroupData.miniSubCategoryId = store.getSelectedProductGroupMiniSubCategoryId
    editedProductGroupData.brandId = store.getSelectedProductGroupBrandId
    editedProductGroupData.viscosityGradeId = store.getSelectedProductGroupViscosityGradeId
    editedProductGroupData.videoUrl = store.getSelectedProductGroupVideoUrl
    editedProductGroupData.createdAt = store.getSelectedProductGroupCreatedAt
    editedProductGroupData.categoriesId = store.getSelectedProductGroupCategoriesId
    store.setMultiselectOEMids(store.getSelectedProductGroupOEMIds)
    store.setMultiselectSpecids(store.getSelectedProductGroupSpecIds)
  },
  { deep: true }
)

const editProductgroupActions = (id) => {
  modalStore.openEditProductGroupModal()
  store.getSelectedProductGroup(id)
  editedProductGroupData.id = id 
}

const submitEditProductGroupData = () => {
  const formData = new FormData()
  formData.append('id', editedProductGroupData.id)
  formData.append('name', editedProductGroupData.name)
  formData.append('description', $('#editProductDesc .ql-editor').html())
  formData.append('categoryId', editedProductGroupData.categoryId)
  formData.append('createdAt', editedProductGroupData.createdAt)
  if (editedProductGroupData.subCategoryId) {
    formData.append('subCategoryId', editedProductGroupData.subCategoryId)
  }
  if (editedProductGroupData.miniSubCategoryId) {
    formData.append('miniSubCategoryId', editedProductGroupData.miniSubCategoryId)
  }
  formData.append('brandId', editedProductGroupData.brandId)
  formData.append('viscosityGradeId', editedProductGroupData.viscosityGradeId)
  formData.append('videoUrl', editedProductGroupData.videoUrl)
  formData.append('productOEMIds', store.multiselectOEMids.join(','))
  formData.append('productSpecIds', store.multiselectSpecids.join(','))
  formData.append('pdfUrl', editedProductGroupData.pdfUrl)
  formData.append('categoriesId', editedProductGroupData.categoriesId)

  if (!editedProductGroupData?.name) {
    notify.warning({
      message: 'Please enter product group Name',
      position: 'bottomRight',
    })
  } else if ( $('#editProductDesc .ql-editor').html().length < 100) {
    notify.warning({
      message: 'Please enter longer product group Description',
      position: 'bottomRight',
    })
  } else if (!editedProductGroupData?.categoryId) {
    notify.warning({
      message: 'Please select product group Category',
      position: 'bottomRight',
    })
  } else if (!editedProductGroupData?.brandId) {
    notify.warning({
      message: 'Please select product group Brand',
      position: 'bottomRight',
    })
  } else if (!editedProductGroupData?.viscosityGradeId) {
    notify.warning({
      message: 'Please select product group Viscosity Grade',
      position: 'bottomRight',
    })
  } else if (store.multiselectOEMids.length === 0) {
    notify.warning({
      message: 'Please select at least one product OEM',
      position: 'bottomRight',
    })
  } else if (store.multiselectSpecids.length === 0) {
    notify.warning({
      message: 'Please select at least one product Specification',
      position: 'bottomRight',
    })
  } else {
    store.editProductGroup(formData)
  }
}
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">
          {{ $t('productGroups') }}
        </div>
        <button @click="modalStore.openProductGroupModal()"
          class="flex items-center justify-center px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
          {{ $t('addProductGroup') }}
        </button>
      </div>
      <div class="space-y-5 overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('productGroup') }}
              </td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('category') }}
              </td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('classification') }}
              </td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('files') }}
              </td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('action') }}
              </td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(productGroup, idx) in store.productGroups" :key="idx" class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex flex-col">
                  <div class="font-medium text-gray-700 text-md">
                    {{ productGroup?.productGroup?.name }}
                  </div>
                  <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <div class="flex items-center">
                      <StackIcon class="mr-1" />
                      {{ productGroup?.category?.name }}
                    </div>
                    <div class="flex items-center">
                      <OilCanIcon class="mr-1" />
                      {{ productGroup?.viscosityGrade?.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex flex-col">
                  <div class="font-medium text-gray-700 text-md">
                    {{ productGroup?.category?.name }}
                  </div>
                  <div class="font-medium text-gray-700 text-md">
                    {{ productGroup?.subCategory?.name }}
                  </div>
                  <div class="font-medium text-gray-700 text-md">
                    {{ productGroup?.miniSubCategory?.name }}
                  </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">
                    {{ $t('oemApproval') }}:
                  </div>
                  <div class="font-medium text-gray-700 text-md">
                    {{ productGroup?.oems.map((o) => o.name).join(', ') }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">
                    {{ $t('specification') }}:
                  </div>
                  <div class="font-medium text-gray-700 text-md">
                    {{ productGroup?.specifications.map((o) => o.name).join(', ') }}
                  </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center space-x-3">
                  <div v-if="productGroup?.productGroup?.videoUrl"
                    @click="modalStore.openVideoModal();getVideoLink(productGroup?.productGroup?.videoUrl)">
                    <YoutubeIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700" />
                  </div>
                  <a v-if="productGroup?.productGroup?.pdfUrl"
                    :href="`${API_URL}/image/${productGroup?.productGroup?.pdfUrl}`">
                    <PdfFileIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700" />
                  </a>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button @click="editProductgroupActions(productGroup?.productGroup?.id)"
                    class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button @click="store.deleteProductGroup(productGroup?.productGroup?.id)"
                    class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
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

  <!-- Product Group Modal -->
  <div :class="{ hidden: !modalStore.isOpenProductGroupModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full p-4 -translate-x-1/2 -translate-y-1/2 max-w-7xl md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t('createProductGroup') }}
          </h3>
          <button type="button" @click="closeAndClear()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-3 space-y-6">
          <form @submit.prevent="submitProductGroupData()" class="mb-5">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="productName">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('name') }}
                  </p>
                  <input id="productName" v-model="productGroupForm.name" type="text"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter product name" />
                </label>
                <label for="desc">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('description') }}
                  </p>
                  <QuillEditor theme="snow" id="desc" />
                </label>
                <label for="category">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('category') }}
                  </p>
                  <select v-model="productGroupForm.categoryId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>
                      {{ $t('selectCategory') }}
                    </option>
                    <option v-for="(category, idx) in categoryStore.categories" :key="idx" :value="category?.id">
                      {{ category?.name }}
                    </option>
                  </select>
                </label>
                <label for="subcategory"
                  v-if="categoryStore.subCategories.filter((sc) => sc?.categoryId === productGroupForm.categoryId).length > 0">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('subCategory') }}
                  </p>
                  <select v-model="productGroupForm.subCategoryId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>{{ 'selectSubcategory' }}</option>
                    <option
                      v-for="(subcategory, idx) in categoryStore.subCategories.filter((sc) => sc?.categoryId === productGroupForm.categoryId)"
                      :key="idx" :value="subcategory?.id">
                      {{ subcategory?.name }}
                    </option>
                  </select>
                </label>
                <label for="subcategory"
                  v-if="categoryStore.miniSubCategories.filter((sc) => sc?.subCategoryId === productGroupForm.subCategoryId).length > 0">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('minisubcategory') }}
                  </p>
                  <select v-model="productGroupForm.miniSubCategoryId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>{{ $t('selectMinisubcategory') }}</option>
                    <option
                      v-for="(minisubcategory, idx) in categoryStore.miniSubCategories.filter(sc => sc?.subCategoryId === productGroupForm.subCategoryId)"
                      :key="idx" :value="minisubcategory?.id">
                      {{ minisubcategory?.name }}
                    </option>
                  </select>
                </label>
              </div>
              <div>
                <label for="brand">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('brand') }}
                  </p>
                  <select v-model="productGroupForm.brandId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>{{ $t('selectBrand') }}</option>
                    <option v-for="(brand, idx) in store.brands" :key="idx" :value="brand?.id">
                      {{ brand?.name }}
                    </option>
                  </select>
                </label>
                <label for="grade">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('viscosityGrade') }}
                  </p>
                  <select v-model="productGroupForm.viscosityGradeId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>Select a viscosity grade</option>
                    <option v-for="(grade, idx) in store.saeViscosityGrades" :key="idx" :value="grade?.id">
                      {{ grade?.name }}
                    </option>
                  </select>
                </label>
                <label for="oem">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('selectOEM') }}
                  </p>
                  <MultiSelect :options="oemOptions" :id="'multiselectOem'" />
                </label>
                <label for="spec">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('selectSpecification') }}
                  </p>
                  <MultiSelect :options="specOptions" :id="'multiselectSpec'" />
                </label>
                <label for="videoLink">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('productVideoLink') }}
                  </p>
                  <input id="videoLink" type="text" v-model="productGroupForm.videoUrl"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="https://www.youtube.com/embed/RRaZwB56djS" />
                </label>
                <label for="productPdf">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('productPdfFile') }}
                  </p>
                  <input id="productPdf" type="file" class="w-full px-3 py-3" @change="getFile" />
                </label>
                <button
                  class="inline-flex items-center justify-center w-full py-3 my-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  {{ $t('createProductGroup') }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Product Group Modal -->
  <div :class="{ hidden: !modalStore.isOpenEditProductGroupModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full p-4 -translate-x-1/2 -translate-y-1/2 max-w-7xl md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t">
          <h3 class="text-lg font-semibold text-gray-900">
            Edit product group
          </h3>
          <button type="button" @click="closeEditModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-3 space-y-6">
          <form @submit.prevent="submitEditProductGroupData()" class="mb-5">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="editProductName">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('name') }}
                  </p>
                  <input id="editProductName" type="text" v-model="editedProductGroupData.name"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter product name" />
                </label>
                <label for="editProductDesc">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('description') }}
                  </p>
                  <QuillEditor theme="snow" id="editProductDesc" />
                </label>
                <label for="editCategory">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('category') }}
                  </p>
                  <select id="editCategory" v-model="editedProductGroupData.categoryId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>
                      {{ $t('selectCategory') }}
                    </option>
                    <option v-for="(category, idx) in categoryStore.categories" :key="idx" :value="category?.id">
                      {{ category?.name }}
                    </option>
                  </select>
                </label>
                <label for="editSubCategory"
                  v-if="categoryStore.subCategories.filter((sc) => sc?.categoryId === editedProductGroupData.categoryId).length > 0">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('subCategory') }}
                  </p>
                  <select id="editSubCategory" v-model="editedProductGroupData.subCategoryId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>{{ 'selectSubcategory' }}</option>
                    <option
                      v-for="(subcategory, idx) in categoryStore.subCategories.filter((sc) => sc?.categoryId === editedProductGroupData.categoryId)"
                      :key="idx" :value="subcategory?.id">
                      {{ subcategory?.name }}
                    </option>
                  </select>
                </label>
                <label for="editMiniSubCategory"
                  v-if="categoryStore.miniSubCategories.filter((sc) => sc?.subCategoryId === editedProductGroupData.subCategoryId).length > 0">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('minisubcategory') }}
                  </p>
                  <select id="editMiniSubCategory" v-model="editedProductGroupData.miniSubCategoryId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>
                      {{ $t('selectMinisubcategory') }}
                    </option>
                    <option
                      v-for="(minisubcategory, idx) in categoryStore.miniSubCategories.filter((sc) => sc?.subCategoryId === editedProductGroupData.subCategoryId)"
                      :key="idx" :value="minisubcategory?.id">
                      {{ minisubcategory?.name }}
                    </option>
                  </select>
                </label>
              </div>
              <div>
                <label for="editBrand">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('brand') }}
                  </p>
                  <select id="editBrand" v-model="editedProductGroupData.brandId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>{{ $t('selectBrand') }}</option>
                    <option v-for="(brand, idx) in store.brands" :key="idx" :value="brand?.id">
                      {{ brand?.name }}
                    </option>
                  </select>
                </label>
                <label for="editGrade">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('viscosityGrade') }}
                  </p>
                  <select id="editGrade" v-model="editedProductGroupData.viscosityGradeId"
                    class="block w-full px-5 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                    <option value="" selected>{{ 'Select Viscosity Grade' }}</option>
                    <option v-for="(grade, idx) in store.saeViscosityGrades" :key="idx" :value="grade?.id">
                      {{ grade?.name }}
                    </option>
                  </select>
                </label>
                <label for="edit-oem">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('selectOEM') }}
                  </p>
                  <MultiSelect :options="oemOptions" :id="'multiselectOemForEdit'" />
                </label>
                <label for="edit-spec">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('selectSpecification') }}
                  </p>
                  <MultiSelect :options="specOptions" :id="'multiselectSpecForEdit'" />
                </label>
                <label for="editVideoLink">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('productVideoLink') }}
                  </p>
                  <input id="editVideoLink" v-model="editedProductGroupData.videoUrl" type="text"
                    class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="https://www.youtube.com/embed/RRaZwB56djS" />
                </label>
                <label for="editProductPdf">
                  <p class="mt-2 font-medium text-slate-700">
                    {{ $t('productPdfFile') }}
                  </p>
                  <input id="editProductPdf" type="file" class="w-full px-3 py-3" @change="getEditFile" />
                </label>
                <button
                  class="inline-flex items-center justify-center w-full py-3 my-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Video Modal -->
  <div :class="{ hidden: !modalStore.isOpenVideoModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-5xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t('productVideo') }}
          </h3>
          <button type="button" @click="modalStore.closeVideoModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div>
          <iframe class="w-full aspect-video" :src="videoLink" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
