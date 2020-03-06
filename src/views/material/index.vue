<template>
<!-- 设置素材管理组件 -->
  <el-card>
      <!-- 面包屑组件 -->
    <bread-crumd slot="header">
        <template slot="title">素材管理</template>
    </bread-crumd>
    <!-- 上传模块 -->
    <el-row type="flex" justify="end">
      <!-- 必须有action属性，没有报错 -->
      <el-upload :show-file-list="false" :http-request="uploadImg" action="">
        <el-button size="small" type="primary">上传素材</el-button>
      </el-upload>
    </el-row>
    <!-- 选项卡 -->
    <el-tabs type="card" v-model="activeName" @tab-click="changTab">
        <!-- 全部资源 -->
        <el-tab-pane label="全部资源" name="all">
            <!-- 每条数据显示 -->
            <div class="list-img">
                <!-- 循环每条数据 -->
                <el-card class="card-img" v-for="item in list" :key="item.id">
                    <img class="img" :src="item.url" alt="">
                    <!-- 操作标签 -->
                    <el-row class="row-img" type="flex" justify="space-around" align="middle">
                        <i class="el-icon-star-off"></i>
                        <i class="el-icon-delete"></i>
                    </el-row>
                </el-card>
            </div>
        </el-tab-pane>
        <!-- 收藏资源 -->
        <el-tab-pane label="收藏资源" name="collect">
            <div class="list-img">
                <el-card class="card-img" v-for="item in list" :key="item.id">
                    <img class="img" :src="item.url" alt="">
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
    <!-- 放置分页模块 -->
    <el-row type="flex" align="middle" justify="center">
        <el-pagination background layout="prev,pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1, // 当前页数
        total: 0, // 总共页数
        pageSize: 8 // 一条数据请求得页数
      }
    }
  },
  methods: {
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.files)
      this.$axios({
        url: '/mp/v1_0/user/images',
        method: 'post',
        data
      }).then(() => {
        // 成功了在获取一次
        this.getList()
      }).catch(() => {
        // 失败提示文件失败
        this.$message.error('上传文件失败')
      })
    },
    // 分页改变时 改变数据
    changePage (row) {
      // 把点击得 在赋值给页面上
      this.page.currentPage = row
      // 重新获取一遍页面
      this.getList()
    },
    //   显示数据
    getList () {
      this.$axios({
        url: '/mp/v1_0/user/images',
        params: {
          collect: this.activeName === 'collect', // 是否为收藏
          page: this.page.currentPage, // 当前页数
          per_page: this.page.pageSize // 每页数据数
        },
        data: {}
      }).then(result => {
        this.list = result.data.results
        // 请求回来的总页数赋值给分页总数
        this.page.total = result.data.total_count
      })
    },
    // 分页改变 再次获取数据
    changTab () {
      // 切换到另一个分栏要从第一页浏览
      this.page.currentPage = 1
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang='less' scoped>
.list-img{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .card-img{
        width: 300px;
        height: 350px;
        margin: 15px;
        position: relative;
        .img{
            width: 100%;
            height: 250px;
        }
        .row-img{
            height: 80px;
            display: flex;
            justify-content: space-around;
            align-content: space-around;
            i{
                cursor: pointer;
            }
        }
    }
}
</style>
