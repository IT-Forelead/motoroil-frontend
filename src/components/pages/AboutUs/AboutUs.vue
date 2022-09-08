<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue';
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import FacebookFIcon from '../../../assets/icons/FacebookFIcon.vue';
import TwitterIcon from '../../../assets/icons/TwitterIcon.vue';
import SkyprIcon from '../../../assets/icons/SkyprIcon.vue';
import AtBoldIcon from '../../../assets/icons/AtBoldIcon.vue';
import DotsThreeVerticalFillIcon from '../../../assets/icons/DotsThreeVerticalFillIcon.vue';
import { useAuthStore } from '../../../stores/auth.js';

const authStore = useAuthStore()

</script>

<template>
<div class="flex justify-center px-5 py-2 bg-white">
  <div class="container flex flex-col justify-center">
    <div class="p-2">
      <ul class="flex items-center">
        <li class="flex items-center">
          <a href="/" class="text-gray-700">
              <HouseIcon class="w-4 h-4" />
          </a>
          <CaretRightIcon class="mx-3 text-gray-500" />
        </li>
        <li class="flex items-center">
          <a href="/about-us" class="text-red-600">{{ $t('aboutUs') }}</a>
        </li>
      </ul>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <Sidebar />
      <div class="col-span-3 ml-3">
        <div v-if="authStore.user?.role === 'admin'" class="flex justify-end">
          <button class="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
            Add information
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="p-3 text-2xl font-semibold text-gray-700">{{ $t('welcomeToShop') }}</div>
          <div v-if="authStore.user?.role === 'admin'">
            <DotsThreeVerticalFillIcon/>
          </div>
        </div>
        <div>
          <img class="float-left mb-5 mr-5" src="https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBpbWFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60">
          <p class="text-gray-700 text-md">
            Maybe we can live without libraries, people like you and me.
            Lorem ipsum dolor sit amet consectetur adixpisicing elit. Temporibus laboriosam id expedita modi, ut aut vero, velit animi cum quis
            mollitia. Itaque, autem at. Voluptatum, voluptas magni unde, laboriosam assumenda dolores esse harum quibusdam laborum voluptate autem
            et fugit. Perspiciatis pariatur, voluptatem soluta perferendis repellendus consequuntur minima accusamus obcaecati eos natus labore at,
            libero dolorem hic! Facilis nobis harum corporis voluptatem nemo, dolores, suscipit alias dolorem, cum ipsa necessitatibus quisquam ut
            totam repellendus aspernatur ipsum omnis error odio! Possimus quis sunt vitae. Ea voluptates eos quae iusto ex autem, possimus
            voluptatum molestias nostrum doloribus ipsa animi explicabo dolor odit sint natus quam consequatur esse praesentium minus laborum
            eaque! Quos atque corrupti hic accusamus repudiandae repellendus natus animi incidunt. Magnam similique alias quis sunt enim placeat
            esse voluptates accusantium dolores. Voluptatibus quas magnam rem eos pariatur distinctio similique officia, dolor architecto dolore
            aut odit consequatur et amet tempore veritatis voluptatum nisi autem quibusdam fuga quod reiciendis provident vel? Totam voluptates
            molestias reprehenderit necessitatibus molestiae, corporis odio eaque recusandae excepturi odit provident illo, laboriosam officia eos,
            quos est sunt quis maiores repellendus obcaecati. Similique, unde inventore, praesentium quis officiis dolore perferendis expedita fuga
            quae architecto modi natus vel doloremque officia laboriosam corporis voluptatibus, molestiae rerum exercitationem est reiciendis enim
            et in repellendus! Cum omnis dolores, magni impedit fugit fugiat eius rem et ipsum quos porro aliquam laudantium modi inventore ratione
            deleniti, expedita reiciendis libero eligendi delectus dicta. Incidunt eos eveniet obcaecati quos eaque placeat ab porro distinctio
            itaque. Voluptates, optio eius deleniti quae impedit repellat voluptatum non ducimus vero, omnis aspernatur accusamus, mollitia illum
            quis doloribus reprehenderit. Accusamus praesentium, nisi in obcaecati distinctio modi iure molestiae! Rerum consectetur fugit enim
            eius quidem odit optio saepe iste at, earum, aperiam cumque sit doloremque architecto labore error dolores sint alias ad accusamus amet
            eaque tempore velit aut? Veniam impedit illo quis rem rerum ipsum vitae temporibus aut, deleniti quod, sit facilis eaque sapiente
            excepturi, non debitis laborum! Ea sed, quidem eos, quibusdam aliquid dolore sunt mollitia vero temporibus illo, ab voluptate corporis
            a! Enim, aliquid delectus laudantium suscipit voluptates veniam ullam architecto odit amet corporis maxime laboriosam nisi deleniti rem
            tempora. Nisi ex quia inventore minima error, voluptate, explicabo eum, sint nobis vitae cumque nihil nostrum necessitatibus corrupti
            molestias aperiam. Et, rerum reprehenderit? Ut maxime quae quaerat, minima magnam esse fuga, cum unde dolorum hic sapiente repellendus
            rem cupiditate in debitis saepe. Doloremque iusto dolorum consequatur rerum soluta et dolores ratione, voluptatibus dignissimos? Magnam
            quam porro odit obcaecati, aspernatur id voluptatum excepturi facere sit voluptates non inventore impedit vel voluptas molestias! Eum,
            iure! Amet dignissimos, in odit aliquid mollitia neque reiciendis rerum harum sunt fugiat, expedita distinctio omnis beatae corporis
            commodi consequuntur assumenda similique architecto cum, id voluptate deleniti fuga veritatis? Voluptatum laudantium, ea natus facilis
            dicta illum quod voluptate alias ipsa hic, recusandae sint id eius non placeat pariatur eaque dolorum sed. Eveniet, delectus facere. Id,
            dolores consequuntur aliquid cumque eius quidem nobis. Harum perferendis sed quasi officia inventore esse autem beatae dolorum?
          </p>
        </div>
        <div class="flex justify-between p-3 mt-3">
          <div class="text-2xl font-semibold text-gray-700">Our Member</div>
          <button v-if="authStore.user?.role === 'admin'" class="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
            Add member
          </button>
        </div>
        <div class="px-3 py-1 text-center text-gray-500 text-md">
          Consectetur adipiscing elit. Donec pellentesque venenatis elit, quis aliquet mauris malesuada vel. Donec vitae libero dolor, eget dapibus
          justo. <br>
          Aenean facilisis aliquet feugiat. Suspendisse lacinia congue est ac semper. Nulla ut elit magna, vitae volutpat magna.
        </div>
        <div class="grid grid-cols-2 gap-5 mt-2">
          <div class="flex p-3 border border-red-500 rounded">
            <div>
              <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80" alt="worker-image">
            </div>
            <div class="flex flex-col pl-3 space-y-2">
              <div class="text-lg font-medium text-gray-700">Jade Bradley</div>
              <div class="text-gray-600 uppercase text-md">ART DIRECTOR</div>
              <div class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam repellendus excepturi magni sunt iusto blanditiis.</div>
              <ul class="flex space-x-2">
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <AtBoldIcon class="w-6 h-6"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <FacebookFIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <TwitterIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <SkyprIcon class="w-6 h-6"/>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex p-3 border border-red-500 rounded">
            <div>
              <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80" alt="worker-image">
            </div>
            <div class="flex flex-col pl-3 space-y-2">
              <div class="text-lg font-medium text-gray-700">Jade Bradley</div>
              <div class="text-gray-600 uppercase text-md">ART DIRECTOR</div>
              <div class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam repellendus excepturi magni sunt iusto blanditiis.</div>
              <ul class="flex space-x-2">
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <AtBoldIcon class="w-6 h-6"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <FacebookFIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <TwitterIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <SkyprIcon class="w-6 h-6"/>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex p-3 border border-red-500 rounded">
            <div>
              <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80" alt="worker-image">
            </div>
            <div class="flex flex-col pl-3 space-y-2">
              <div class="text-lg font-medium text-gray-700">Jade Bradley</div>
              <div class="text-gray-600 uppercase text-md">ART DIRECTOR</div>
              <div class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam repellendus excepturi magni sunt iusto blanditiis.</div>
              <ul class="flex space-x-2">
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <AtBoldIcon class="w-6 h-6"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <FacebookFIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <TwitterIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <SkyprIcon class="w-6 h-6"/>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex p-3 border border-red-500 rounded">
            <div>
              <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80" alt="worker-image">
            </div>
            <div class="flex flex-col pl-3 space-y-2">
              <div class="text-lg font-medium text-gray-700">Jade Bradley</div>
              <div class="text-gray-600 uppercase text-md">ART DIRECTOR</div>
              <div class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam repellendus excepturi magni sunt iusto blanditiis.</div>
              <ul class="flex space-x-2">
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <AtBoldIcon class="w-6 h-6"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <FacebookFIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <TwitterIcon class="w-5 h-5"/>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <SkyprIcon class="w-6 h-6"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>