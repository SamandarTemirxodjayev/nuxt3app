<template>
  <div>
    <input
      type="text"
      class="w-full py-2 px-4 pl-8 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-set text-2xl h-10"
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
