<script setup>
const { data: banners } = useFetch("https://restoranmenu1.vercel.app/banner");
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
    <div class="">
      <search />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import Search from '../../components/Search.vue';
export default {
  components: { Search },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    if (process.client) {
      // alert("Client side only");
      // this.loading = false;
    }
  },
};
</script>
