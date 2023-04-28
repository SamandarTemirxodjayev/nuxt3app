<template>
<div class="">
  <img src="https://img.icons8.com/arcade/64/null/shopping-cart--v2.png" />
</div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      products: []
    }
  },
  created() {
    if(process.browser){
      const products = JSON.parse(localStorage.getItem('products')) || []
      this.products = products
      window.addEventListener('storage', this.handleStorageEvent)
      console.log(this.products)
    }
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageEvent)
  },
  methods: {
  
    handleStorageEvent(event) {
      if (event.key === 'products') {
        const products = JSON.parse(event.newValue)
        this.products = products
      }
    }
  }
}
</script>
