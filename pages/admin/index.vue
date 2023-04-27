<script>
import { defineComponent } from '@vue/composition-api'
import { onBeforeMount } from 'vue';

export default defineComponent({
  setup() {
    onBeforeMount(() => {
      window.location.href = 'https://restoranreact.vercel.app/admin'
    });
  },
});
</script>
