<template>
  <div class="main-content">
    <el-form ref="form" :inline="true" size="small" :model="form">
      <el-form-item label="类型：">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期：">
        <el-date-picker v-model="value1" style="width:300px" type="datetimerange"
          start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字：">
        <el-select v-model="form.region" placeholder="请选择关键字" style="width:100px">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left:5px" type="primary" size="mini" icon="el-icon-search">搜 索
        </el-button>
      </el-form-item>
    </el-form>
    <div class="tabele-top">
      <el-button type="primary" size="mini">新增</el-button>
      <el-button type="danger" size="mini">批量删除</el-button>
    </div>
    <el-table :data="tableData" highlight-current-row border stripe
      style="border-collapse: collapse;">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题" width="300">
      </el-table-column>
      <el-table-column align="center" prop="category" label="类别">
      </el-table-column>
      <el-table-column align="center" prop="date" label="日期">
      </el-table-column>
      <el-table-column align="center" prop="user" label="管理员">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="mini">查看</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination style="float: right;margin-top:10px" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :page-sizes="[12, 20, 50, 100]" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { onMounted,reactive,ref,computed } from '@vue/composition-api'
export default {
  name: "InfoIndex",
  setup(props,context) {  //主入口，data,生命周期，methods等
    const form=reactive({});
    const value1=ref("");
    const tableData=reactive([
      {
        title: "手把手撸码前端 - 第2学时 安装node.js、vue3.0脚手架、创建github代码管理",
        category: "国内信息",
        date: "2016-05-02 15:20:30",
        user: "管理员"
      },
      {
        title: "手把手撸码前端 - 第2学时 安装node.js、vue3.0脚手架、创建github代码管理",
        category: "国内信息",
        date: "2016-05-02 15:20:30",
        user: "管理员"
      },
      {
        title: "手把手撸码前端 - 第2学时 安装node.js、vue3.0脚手架、创建github代码管理",
        category: "国内信息",
        date: "2016-05-02 15:20:30",
        user: "管理员"
      },
      {
        title: "手把手撸码前端 - 第2学时 安装node.js、vue3.0脚手架、创建github代码管理",
        category: "国内信息",
        date: "2016-05-02 15:20:30",
        user: "管理员"
      }
    ]);
    const handleClick=(row) => {

    }
    const handleSizeChange=(val) => {
      console.log(`每页 ${val} 条`);
    }
    const handleCurrentChange=(val) => {
      console.log(`当前页: ${val}`);
    }
    return {
      form,
      value1,
      tableData,
      handleClick,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>
<style lang="scss" scoped>
.main-content {
  height: auto;
}
.tabele-top {
  height: 40px;
  border: 1px solid #ebeef5;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.pagination {
  width: 100%;
  height: 50px;
}
</style>