<template>
  <div class="bg-gray-800 h-screen w-64 px-4 py-8">
    <div class="flex items-center mb-8">
      <NuxtLink to="/">
        <img src="@/assets/img/image13.png" width="150" height="150" />
      </NuxtLink>
    </div>
    <ul>
      <ul class="pt-[30%]">
        <li class="py-4">
          <NuxtLink to="/" class="text-gray-400 hover:text-white text-3xl">Home</NuxtLink>
        </li>
        <li class="py-4">
          <NuxtLink to="/admin/create/catalog" class="text-gray-400 hover:text-white text-3xl">Create Catalog</NuxtLink>
        </li>
        <li class="py-4">
          <NuxtLink to="/admin/create/menu" class="text-gray-400 hover:text-white text-3xl">Create Menu</NuxtLink>
        </li>
        <li class="py-4">
          <NuxtLink to="/admin/create/banner" class="text-gray-400 hover:text-white text-3xl">Create Banner</NuxtLink>
        </li>
        <li class="py-4">
          <NuxtLink @click="handleLogout" class="text-gray-400 hover:text-white text-3xl">Log Out</NuxtLink>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
export default {
  methods:{
    handleLogout(){
      localStorage.removeItem('id')
      this.$router.push('/admin/login')
    }
  }
}
</script>