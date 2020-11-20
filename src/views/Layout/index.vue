<template>
  <div id="layout-wrap" :class="[menuStatus ? 'close' : 'open']">
    <NavLayout />
    <div id="content-wrap">
      <HeaderLayout />
      <MainLayout />
    </div>
  </div>
</template>

<script>
import { onMounted,reactive,ref,computed } from '@vue/composition-api'
import HeaderLayout from './Components/Header'
import NavLayout from './Components/Nav'
import MainLayout from './Components/Main'
export default {
  name: "layout",
  components: {
    HeaderLayout,
    NavLayout,
    MainLayout
  },
  setup(props,context) {
    const menuStatus=computed(() => context.root.$store.getters.getIsCollapse);
    return {
      menuStatus
    }
  }


}
</script>
<style lang="scss" scoped>
#layout-wrap {
  height: 100vh;
  display: flex;
  #content-wrap {
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>