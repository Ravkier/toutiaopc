<template>
  <el-card v-loading='loading'>
      <bread-crumd slot="header">
        <template slot="title">评论管理</template>
      </bread-crumd>
      <el-table :data="list">
         <!-- 使用el-table-column作为列 -->
         <!-- prop 表示显示的字段 label表示表头 -->
         <el-table-column prop="title" width="600"  label="标题"></el-table-column>
         <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column  label="操作">
             <template slot-scope="obj">
                <el-button type="text">修改</el-button>
                <el-button @click="openOrClose(obj.row)" type="text">{{ obj.row.comment_status ? "关闭" : "打开" }}评论</el-button>
             </template>
         </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" align="middle" justify="center" style="height:80">
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
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页
        pageSize: 10 // 每页条数
      },
      list: [],
      loading: false // 判断加载状态
    }
  },
  methods: {
    // page改变时候 完成的方法
    changePage (page) {
      // 把选择的页数给当前页
      this.currentPage = page
      // 再次获取数据
      this.getList()
    },
    // 获取数据
    getList () {
      // 刚加载的时候打开
      this.loading = true
      this.$axios({
        url: '/mp/v1_0/articles',
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.currentPage, // 请求当前的页数
          per_page: this.pageSize // 请求每页的条数
        }
      }).then(result => {
        // console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
        // 完成加载的时候 关闭
        this.loading = false
      })
    },
    // 显示状态
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '打开' : '关闭'
    },
    // 打开或者关闭，评论的设置
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${mess}评论,提示`).then(() => {
        this.$axios({
          url: '/mp/v1_0/comments/status',
          method: 'put',
          // query参数
          params: {
            article_id: row.id.toString() // 要求参数的文章id
            // 前端传入的 不管是字符串还是数字，到后端 会统一转化为大数字
          },
          data: {
            //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
          //   成功了 提示个消息 然后 重新拉取数据4
          this.$message.success(`${mess}评论成功`)
          //  重新拉取数据
          this.getList() // 调用重新拉取数据的方法
        }).catch(() => {
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>

</style>
