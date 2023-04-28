<script setup>
const { data: catalogs } = useFetch("https://restoranmenu1.vercel.app/catalog");
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <Loader />
  </div>
  <div v-else>
    <div class="flex justify-between mr-[5%]">
      <div class="text-4xl font-bold m-[3%]">
        Delicious <br />
        food for you
      </div>
      <NuxtLink to="/" class="mt-[4%] w-[20%] h-[20%]">
        <cart-img />
      </NuxtLink>
    </div>
    <div class="my-[5%]">
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
    <Menu :catalogs="catalogs.catalogs"  />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Search from "@/components/Search.vue";
export default {
  components: { Search, Loader },
  data() {
    return {
      loading: false,
      id: '',
    };
  },
  created() {
    if (process.client) {
      this.id = this.$route.params.id;
    }
  },
};
</script>

