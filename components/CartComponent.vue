<template>
  <div>
    <cart-img :products="productsInCart" />
  </div>
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import CartImg from '@/components/CartImg.vue';

export default {
  components: { CartImg },
  setup() {
    if (process.client) {
    const products = ref(JSON.parse(localStorage.getItem("products")) || []);

    watchEffect(() => {
      localStorage.setItem("products", JSON.stringify(products.value));
    });

    const productsInCart = computed(() => {
      return products.value;
    });

    // Add event listener to listen for changes in local storage
    window.addEventListener("storage", (event) => {
      if (event.key === "products") {
        products.value = JSON.parse(event.newValue || "[]");
      }
    });

    return {
      productsInCart,
    };
    }
  },
};
</script>
