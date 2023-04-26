<template>
  <div class="flex" v-if="!loading">
    <div class="w-64">
      <admin-navbar />
    </div>
    <div class="flex justify-center w-full my-24">
      <div class="block">
        <form
          class="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[100%]"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 font-bold mb-2"
              for="catalogName"
            >
              Enter Catalog Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="catalogName"
              type="text"
              placeholder="Catalog name"
              v-model="name"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
        <div v-if="catalog.length === 0" class="text-3xl bd-black m-16">
          Not Have Catalog
        </div>
        <div v-else class="text-3xl">
          <div
            v-for="(item, key) in catalog"
            :key="key"
            class="my-2 bg-green-300 rounded-md p-2 justify-between flex items-center"
          >
            {{ item.name }}
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="handleDelete(item._id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class=" justify-center items-center h-screen flex">
    <loader />
  </div>
</template>

<script>
import axios from "axios";
import AdminNavbar from '../../../components/AdminNavbar.vue';
import Loader from '../../../components/Loader.vue';

export default {
  components: {
    AdminNavbar,
    Loader
  },
  data() {
    return {
      name: "",
      catalog: [],
      loading: true,
    };
  },
  mounted() {
    axios.get("https://restoranmenu1.vercel.app/catalog").then((res) => {
      this.catalog = res.data.catalogs;
      this.loading = false;
    });
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      axios
        .put("https://restoranmenu1.vercel.app/catalog", {
          name: this.name,
        })
        .then((res) => {
          console.log(res.data.catalog);
          this.catalog.push(res.data.catalog);
          this.name = "";
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(id) {
      this.loading = true;
      axios
        .delete(`https://restoranmenu1.vercel.app/catalog/${id}`)
        .then((res) => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>