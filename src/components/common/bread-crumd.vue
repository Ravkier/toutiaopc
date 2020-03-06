<template>
<!-- 面包屑 设置分隔符 separator -->
  <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!-- 目的传动态数据 -->
          <!-- 挖个有名的坑 -->
          <slot name="title"></slot>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
