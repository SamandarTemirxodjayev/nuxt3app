<template>
  <div v-if="loading" class="">
    <div v-for="item in 4" :key="item">
      <div role="status" class="max-w-sm animate-pulse">
        <div
          class="h-5 bg-gray-200 rounded-full dark:bg-gray-400 w-[80%] m-2"
        ></div>
        <span class="sr-only">Loading...</span>
      </div>
      <div class="w-full flex overflow-x-auto">
        <div
          role="status"
          class="max-w-sm p-2 rounded animate-pulse md:p-4 w-[80%] flex-0-0"
        >
          <div
            class="items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-400"
          >
            <svg
              class="w-12 h-12 text-gray-200 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path
                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
              />
            </svg>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          class="max-w-sm p-2 rounded animate-pulse md:p-4 w-[80%] flex-0-0"
        >
          <div
            class="items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-400"
          >
            <svg
              class="w-12 h-12 text-gray-200 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path
                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
              />
            </svg>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-for="catalog in catalogs" :key="catalog._id" class="">
      <h2 class="text-2xl font-bold p-1">{{ catalog.name }}</h2>
      <div class="container">
        <div class="overflow-x-auto whitespace-nowrap flex">
          <div
            v-for="menu in filteredMenus(catalog._id)"
            :key="menu._id"
            class="rounded-t-lg m-2 flex-none"
            style="width: 300px"
          >
            <div class="shadow-xl border border-purple-300 rounded-2xl cursor-pointer">
              <NuxtLink :to="`/menu/${menu._id}`">
                <menu-img :url="menu.photo_url" />
                <div class="py-1 px-[5%]">
                  <h3 class="font-bold text-xl mb-2">{{ menu.name }}</h3>
                    <span class="font-bold text-xl ">
                      {{ Number(menu.price).toLocaleString() }} so'm
                    </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MenuImg from "./MenuImg.vue";

export default {
  components: { MenuImg },
  props: {
    catalogs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      menus: [],
    };
  },
  async created() {
    await axios.get("https://restoranmenu1.vercel.app/menu").then((res) => {
      this.menus = res.data.menus;
      this.loading = false;
    });
  },
  methods: {
    filteredMenus(categoryId) {
      return this.menus.filter((menu) => menu.category_id === categoryId);
    },
  },
};
</script>
<style>
.flex-0-0 {
  flex: 0 0 auto;
}
</style>
