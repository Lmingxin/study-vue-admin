<template>
  <div id="layout-wrap">
    <NavLayout />
    <div id="content-wrap">
      <HeaderLayout />
      <MainLayout />
    </div>
  </div>
</template>

<script>
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
  setup() {

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