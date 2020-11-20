<template>
  <div>
    sssssssss
    <svg-icon icon-class="dz" icon-color="#333" icon-size="14" />
  </div>
</template>

<script>
import { onMounted,reactive,ref,computed } from '@vue/composition-api'
export default {
  name: "console",
  setup(props,context) {  //主入口，data,生命周期，methods等
    onMounted(() => {
      console.log();
      console.log(context.root.$store.getters.getStoreuserName);
    })
  }

}
</script>

<style>
</style>