<template>
  <div class="flex">
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
            <label class="block text-gray-700 font-bold mb-2" for="username">
              Select Banner Photo
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="file"
              ref="imageRef"
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
          Not Have Banner
        </div>
        <div v-else class="text-3xl">
          <div
            v-for="(item, key) in catalog"
            :key="key"
            class="bg-green-300 rounded-md p-2 justify-between flex items-center"
          >
            {{ item._id }}
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
</template>
<script>
import axios from "axios";
import AdminNavbar from "../../../components/AdminNavbar.vue";
import firebaseApp from '@/firebase.js'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
export default {
  components: { AdminNavbar },
  data() {
    return {
      catalog: [],
      loading: true,
    };
  },
  mounted() {
    axios
      .get("https://restoranmenu1.vercel.app/banner")
      .then((res) => {
        console.log(res.data.banners);
        this.catalog = res.data.banners;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
  methods: {
    handleDelete(id) {
      this.loading = true;
      axios
        .delete(`https://restoranmenu1.vercel.app/banner/${id}`)
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading =true
      const file = imageRef.value.files[0];
      const fileName = file.name;
      const storage = getStorage(firebaseApp);
      const pathFile = `banner/${fileName}`;
      const storageRef = ref(storage, pathFile);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          axios
            .put("https://restoranmenu1.vercel.app/banner", {
              photo_url: downloadURL,
            })
            .then((res) => {
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    },
  },
};
</script>
