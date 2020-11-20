<template>
  <!-- fragment，多跟节点处理办法  -->
  <fragment>
    <template v-for="(item,index) in routers">
      <template v-if="!item.dispatch &&routers.length>=1">
        <!-- 子菜单 -->
        <el-menu-item v-if="!(item.children && item.children.length>=1)" :key="index"
          :index="item.path">
          <template slot="title">
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" icon-color="#C0C4CC"
              icon-size="10" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
        </el-menu-item>
        <!-- 如果只有一个子菜单且菜单不是折叠状态，那么不显示父级，只显示子菜单 -->
        <!-- 如果菜单在折叠状态下，不显示父级，会出现一个空白 -->
        <el-menu-item class="el-submenu"
          v-else-if="(!isCollapse &&item.children && item.children.length==1)" :key="index"
          :index="item.children[0].path">
          <template slot="title">
            <svg-icon v-if="item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"
              icon-color="#C0C4CC" icon-size="10" />
            <span slot="title">{{item.children[0].meta.name}}</span>
          </template>
        </el-menu-item>
        <!-- 所有父级都应该有图标 -->
        <el-submenu v-else :index="item.path" :key="index">
          <template slot="title">
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" icon-color="#C0C4CC"
              icon-size="10" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 递归调用当前组件，渲染菜单树 -->
          <Menus :menuList="item.children"></Menus>
        </el-submenu>
      </template>
    </template>
  </fragment>
</template>

<script>

import { onMounted,reactive,ref,watchEffect,computed } from '@vue/composition-api'
export default {
  name: "Menus",

  props: ["menuList"],
  setup(props,context) {  //主入口，data,生命周期，methods等
    const routers=reactive([])

    watchEffect(() => {
      console.log(props.menuList);
      //监听菜单数据的传入
      routers.push(...props.menuList)
      console.log(routers);
    })
    //计算属性监听菜单栏的折叠
    const isCollapse=computed(() => context.root.$store.getters.getIsCollapse);
    return {
      routers,
      isCollapse
    }
  }
}
</script>

<style>
</style>