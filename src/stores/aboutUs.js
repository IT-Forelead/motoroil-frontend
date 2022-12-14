import axios from 'axios'
import {defineStore} from 'pinia'
import authHeaderForMultipart from '../mixins/auth/auth-header-for-multipart-form.js'
import authHeader from '../mixins/auth/auth-header.js'
import { useModalStore } from './modal.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useAboutUsStore = defineStore({
    id: 'aboutUs',
    state: () => ({
        aboutUsInfos: [],
        workers: [],
        singleAboutUs: {},
        singleWorker: {}
    }),
    getters: {
      getAboutUsId(){
        return this.singleAboutUs?.id
      },
      getAboutUsTitle(){
        return this.singleAboutUs?.title
      },
      getAboutUsText(){
        return this.singleAboutUs?.text
      },
      getAboutUsDefaultKey(){
        return this.singleAboutUs?.imageUrl
      },
      getWorkerId(){
        return this.singleWorker?.id
      },
      getWorkerDefaultImage(){
        return this.singleWorker?.imageUrl
      },
      getWorkerFullName(){
        return this.singleWorker?.fullName
      },
      getWorkerPosition(){
        return this.singleWorker?.position
      },
      getWorkerDesc(){
        return this.singleWorker?.description
      },
      getWorkerEmail(){
        return this.singleWorker?.email
      },
      getWorkerFacebook(){
        return this.singleWorker?.facebook
      },
      getWorkerTwitter(){
        return this.singleWorker?.twitter
      },
      getWorkerSkype(){
        return this.singleWorker?.skype
      },
    },
    actions: {
        async getAllAboutUsInfos() {
            const response = await axios.get(`${API_URL}/get-about-us`)
            this.aboutUsInfos = response.data
        },
        async getSingleAboutUsInfo(id) {
            this.singleAboutUs = this.aboutUsInfos.filter(i => i?.id === id)[0]
        },
        async getAllWorkers() {
          const response = await axios.get(`${API_URL}/workers`)
          this.workers = response.data
        },
        async getSingleWorker(id) {
            this.singleWorker = this.workers.filter(i => i?.id === id)[0]
        },
        async createInformation(data) {
          await axios
            .put(`${API_URL}/admin/create-information`, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authHeaderForMultipart(),
              },
            })
            .then(() => {
              notify.success({
                message: 'Information added!',
                position: 'bottomRight',
              })
              this.getAllAboutUsInfos()
              useModalStore().closeAddAboutUsInfoModal()
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While adding information!',
                position: 'bottomRight',
              })
            })
        },
        async editInformation(data) {
          await axios
            .put(`${API_URL}/admin/edit-information`, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authHeaderForMultipart(),
              },
            })
            .then(() => {
              notify.success({
                message: 'Information edited!',
                position: 'bottomRight',
              })
              this.getAllAboutUsInfos()
              useModalStore().closeEditAboutUsInfoModal()
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While editing information!',
                position: 'bottomRight',
              })
            })
        },
        async createWorker(data) {
          await axios
            .put(`${API_URL}/admin/create-worker`, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authHeaderForMultipart(),
              },
            })
            .then(() => {
              notify.success({
                message: 'Worker added!',
                position: 'bottomRight',
              })
              this.getAllWorkers()
              useModalStore().closeAddWorkerModal()
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While worker adding',
                position: 'bottomRight',
              })
            })
        },
        async editWorker(data) {
          await axios
            .put(`${API_URL}/admin/edit-worker`, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authHeaderForMultipart(),
              },
            })
            .then(() => {
              notify.success({
                message: 'Worker edited!',
                position: 'bottomRight',
              })
              this.getAllWorkers()
              useModalStore().closeEditWorkerModal()
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While worker editing',
                position: 'bottomRight',
              })
            })
        },
        async deleteWorker(id) {
          await axios
            .get(`${API_URL}/admin/delete-worker/${id}`, { headers: authHeader() })
            .then(() => {
              notify.success({
                message: 'Worker deleted!',
                position: 'bottomRight',
              })
              this.getAllWorkers()
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While worker deleting!',
                position: 'bottomRight',
              })
            })
        },
        async deleteInformation(id) {
          await axios
            .get(`${API_URL}/admin/delete-about-us/${id}`, { headers: authHeader() })
            .then(() => {
              notify.success({
                message: 'Information deleted!',
                position: 'bottomRight',
              })
              this.getAllAboutUsInfos()
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While information deleting!',
                position: 'bottomRight',
              })
            })
        },
    },
})
