<template>
  <div>
    <el-form ref="form" :inline="true" size="small" :model="form">
      <el-form-item label="类型：">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期"
          end-placeholder="结束日期" :default-time="['12:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字：">
        <el-select v-model="form.region" placeholder="请选择关键字" style="width:100px">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left:5px" type="primary" icon="el-icon-search">搜 索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { onMounted,reactive,ref,computed } from '@vue/composition-api'
export default {
  name: "InfoIndex",
  setup(props,context) {  //主入口，data,生命周期，methods等
    const form=reactive({});
    const value1=ref("");
    return {
      form,
      value1
    }
  }
}
</script>

<style>
</style>