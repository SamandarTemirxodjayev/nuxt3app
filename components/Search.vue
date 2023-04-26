<template>
  <div>
    <input
      type="text"
      class="w-[94%] py-[2.5%] px-[5%] pl-[4%] ml-[3%] border border-yellow-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-yellow-700 text-2xl h-[7%]"
      placeholder="Search for food..."
      v-model="searchTerm"
      @input="handleSearch"
    />
    <div v-if="searchResults.length > 0" class="bg-white p-4">
      <div v-for="result in searchResults" :key="result._id">
        <NuxtLink :to="`/menu/${result._id}`">
          <div class="text-lg font-bold my-5">{{ result.name }}</div>
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
      searchTerm: "",
      searchResults: [],
      originalResults: [],
    };
  },
  created() {
    axios.get("https://restoranmenu1.vercel.app/menu").then((res) => {
      this.originalResults = res.data.menus;
    });
  },
  methods: {
    handleSearch(event) {
      const term = event.target.value.toLowerCase();
      const filteredResults = this.originalResults.filter((result) =>
        result.name.toLowerCase().includes(term)
      );
      this.searchTerm = term;
      if (term.trim() === "") {
        this.searchResults = [];
      } else {
        this.searchResults = filteredResults;
      }
    },
  },
};
</script>
