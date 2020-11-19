<template>
  <fragment>
    <template v-for="(item,index) in routers">
      <template v-if="!item.dispatch &&routers.length>=1">
        <el-menu-item v-if="!(item.children && item.children.length>=1)" :key="index"
          :index="item.path">
          <template slot="title">
            <!-- <i style="color:#333;" :class="item.icon"></i> -->
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" icon-color="#C0C4CC"
              icon-size="10" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
        </el-menu-item>
        <el-menu-item v-else-if="(item.children && item.children.length==1)" :key="index"
          :index="item.children[0].path">
          <template slot="title">
            <!-- <i style="color:#333;" :class="item.icon"></i> -->
            <svg-icon v-if="item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"
              icon-color="#C0C4CC" icon-size="10" />
            <span slot="title">{{item.children[0].meta.name}}</span>
          </template>
        </el-menu-item>
        <el-submenu v-else :index="item.path" :key="index">
          <template slot="title">
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" icon-color="#C0C4CC"
              icon-size="10" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <Menus :menuList="item.children"></Menus>
        </el-submenu>
      </template>
    </template>
  </fragment>
</template>

<script>

import { onMounted,reactive,ref,watchEffect } from '@vue/composition-api'
export default {
  name: "Menus",

  props: ["menuList"],
  setup(props,context) {  //主入口，data,生命周期，methods等
    const routers=reactive([])

    onMounted(() => {
      console.log("dd");

      console.log(props.menuList);
    })
    watchEffect(() => {
      console.log(props.menuList);
      routers.push(...props.menuList)
      console.log(routers);
    })
    return {
      routers
    }
  }
}
</script>

<style>
</style>