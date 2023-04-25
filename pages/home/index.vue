<script setup>
const { data: banners } = useFetch("https://restoranmenu1.vercel.app/banner");
const { data: catalogs } = useFetch("https://restoranmenu1.vercel.app/catalog");
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <Loader />
  </div>
  <div v-else>
    <div class="flex justify-between mr-[10%]">
      <div class="text-4xl font-bold">
        Delicious <br />
        food for you
      </div>
      <NuxtLink to="/cart" class="mt-5">
        <img
          src="@/assets/shopping-cart.png"
          alt=""
          height="35px"
          width="35px"
        />
      </NuxtLink>
    </div>
    <div class="mt-6">
      <search />
    </div>
    <div
      class="flex my-3 text-gray-400 text-2xl overflow-x-auto whitespace-nowrap"
    >
      <div class="mx-1 cursor-pointer text-orange-set" style="border-bottom: 2px solid #ffc83a">
        <NuxtLink to="/home"> All </NuxtLink >
      </div>
      <div
        v-for="catalog in catalogs.catalogs"
        :key="catalog._id"
        class="mx-3 cursor-pointer text-gray-500"
      >
        <NuxtLink :to="`/home/${catalog._id}`">
          {{ catalog.name }}
        </NuxtLink>
      </div>
    </div>
    <slider :photos="banners.banners" />
    <Menu :catalogs="catalogs.catalogs"  />
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import Search from "../../components/Search.vue";
export default {
  components: { Search },
  data() {
    return {
      loading: false,
      id: ''
    };
  },
  created() {
    if (process.client) {
      // alert("Client side only");
      // this.loading = false;
      this.id = this.$route.params.id;
    }
  },
};
</script>
