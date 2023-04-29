<template>
  <div>
    <img src="https://img.icons8.com/arcade/64/null/shopping-cart--v2.png" />
    {{ products.length }}
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
