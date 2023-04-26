<template>
  <div class="flex justify-center items-center" style="height: 500px">
    <form
      class="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      style="width: 400px"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="username">
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          :value="username"
          @input="username = $event.target.value"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          :value="password"
          @input="password = $event.target.value"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')

    onMounted(() => {
      const id = localStorage.getItem('id')
      if (id) {
        window.location.href = '/admin'
      }
    })

    function handleSubmit() {
      if (username.value === 'admin' && password.value === 'admin') {
        localStorage.setItem('id', username.value)
        window.location.href = '/admin'
      } else {
        alert('Invalid username or password')
        password.value = ''
        username.value = ''
      }
    }

    return { username, password, handleSubmit }
  },
})
</script>
