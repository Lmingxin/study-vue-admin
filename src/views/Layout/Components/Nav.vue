<template>
  <div id="nav-wrap">
    <div class="logos">
      <el-image class="logo" style="width: 90px; height:90px;" :src="require('@/assets/logo.png')"
        fit="fit">
      </el-image>
    </div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
        @close="handleClose" :unique-opened="true" :collapse="isCollapse"
        :background-color="color.navColor" :text-color="color.textColor"
        :active-text-color="color.activeTextColor" :router="true">
        <Menus :menuList="routers"></Menus>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import color from '@/styles/config.scss'
import { onMounted,reactive,ref } from '@vue/composition-api'
import Menus from './Menus'
export default {
  name: "navLayout",
  components: { Menus },
  setup(props,context) {  //主入口，data,生命周期，methods等
    //定义数据=======================================================
    const isCollapse=ref(false)
    const routers=reactive([])

    //生命周期=======================================================
    onMounted(() => {
      console.log(color);
      console.log(context.root.$router.options.routes);
      let routerList=context.root.$router.options.routes;
      // routerList.forEach(e => {
      //   if(e.name==="Index") {
      //     routers.push(...e.children);
      //   }
      // });
      console.log(routerList);
      routers.push(...routerList);
      console.log(routers);
    })

    //定义函数=======================================================
    const handleOpen=((key,keyPath) => {
      console.log(key,keyPath);
    })
    const handleClose=((key,keyPath) => {
      console.log(key,keyPath);
    })

    return {
      handleOpen,
      handleClose,
      isCollapse,
      color,
      routers
    }
  }

}
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
#nav-wrap {
  width: 250px;
  height: 100vh;
  background-color: $navColor;
  display: flex;
  flex-direction: column;

  .scrollbar-wrapper {
    flex: 1;
    overflow: hidden !important;
    ::v-deep .el-scrollbar__wrap {
      margin-bottom: 0 !important;
      //   margin-right: 0;
      overflow-x: auto;
      //   height: 100%;
    }
    // ::v-deep .el-scrollbar__thumb {
    //   height: 55%;
    //   transform: translateY(0%);
    // }
  }
  .logos {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      margin: 20px 0;
    }
  }
}
</style>