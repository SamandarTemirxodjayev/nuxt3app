<template>
  <div class="flex justify-center items-center h-64" v-if="loading">
    <div role="status">
      <svg
        aria-hidden="true"
        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
      <img :src="`${menu.photo_url}`" alt="" class="none" @load="handleLoad" />
    </div>
  </div>
  <div class="bg-white" v-else>
    <NuxtLink to="/home">
      <button
        type="button"
        class="fixed h-12 w-12 justify-center rotate-180 left-3 top-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          aria-hidden="true"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Icon description</span>
      </button>
    </NuxtLink>
    <img :src="`${menu.photo_url}`" alt="" class="w-full h-[270px]" />
    <div class="p-2">
      <h1 class="text-3xl font-bold mb-4">{{ menu.name }}</h1>
      <p class="text-lg text-gray-500 mb-4">{{ menu.description }}</p>
      <p class="text-2xl font-bold mb-3">
        {{ Number(menu.price).toLocaleString() }} so'm
      </p>
    </div>
    <div class="text-2xl p-2 font-600">Popular Items</div>
    <div class="p-4">
      <div v-for="menuItem in menus" :key="`${menuItem._id}`">
        <NuxtLink :to="`/menu/${menuItem._id}`">
          <div v-if="id != menuItem._id">
            <div class="flex items-center p-4">
              <img
                :src="`${menuItem.photo_url}`"
                alt=""
                class="h-24 w-32 object-cover rounded-lg"
              />
              <div class="ml-4">
                <h2 class="text-xl font-bold">{{ menuItem.name }}</h2>
                <p class="text-gray-500 text-sm">
                  {{ Number(menuItem.price).toLocaleString() }} so'm
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menu: [],
      menus: [],
      loading: true,
      id: "",
    };
  },

  created() {
    const id = this.$route.params.id;
    this.id = id;
    axios
      .get("https://restoranmenu1.vercel.app/menu/" + this.id)
      .then((response) => {
        this.menu = response.data.menu;
        axios
          .get(
            `https://restoranmenu1.vercel.app/catalogMenus/${response.data.menu.category_id}`
          )
          .then((response) => {
            this.menus = response.data.menus;
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleLoad() {
      this.loading = false;
    },
  },
};
</script>
