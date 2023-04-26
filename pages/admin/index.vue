<template>
  <div>
    <AdminNavbar />
  </div>
</template>

<script>
import AdminNavbar from '../../components/AdminNavbar.vue'
export default {

  components: {
    AdminNavbar
  },
  mounted() {
    const id = localStorage.getItem('id');
    if (!id) {
      this.$router.push('/admin/login');
    }
  }
}
</script>