<template>
  <div class="wrap">
    <div class="result">
      已选：{{ allMultipleSelection }}
    </div>
    <el-table
      class="table"
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      ref="asTable"
    >
      <el-table-column
        width="50"
        type="selection"
        fixed="left"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名字"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)" >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.size"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      slot="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      allMultipleSelection: [],
      uniqueKey: 'id',

      pagination: {
        currentPage: 1,
        size: 10,
        total: 1000
      }
    }
  },
  beforeMount () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.tableData = []
      let start = (this.pagination.currentPage - 1) * this.pagination.size
      let end = this.pagination.currentPage * this.pagination.size
      setTimeout(_ => {
        for (let i = start; i < end; i++) {
          this.tableData.push({
            id: i,
            name: `王${i}兰`
          })
        }
        // @tip 实现分页复选
        setTimeout(_ => {
          this.setSelectedRow()
        }, 50)
      }, 200)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      // @tip 实现分页复选
      console.log(val, 'selection')
      setTimeout(_ => {
        this.resolveAllSelection()
      }, 50)
    },
    resolveAllSelection () {
      let currentPageData = this.tableData.map(item => item[this.uniqueKey]) // 当前页所有数据
      let currentPageSelected = this.multipleSelection.map(item => item[this.uniqueKey]) // 当前页已选数据
      let currentPageNotSelected = currentPageData.filter(item => !currentPageSelected.includes(item)) // 当前页未选数据
      // 将当前页已选数据放入所有已选项
      currentPageSelected.forEach(item => {
        if (!this.allMultipleSelection.includes(item)) {
          this.allMultipleSelection.push(item)
        }
      })
      // 将所有已选项数据中当前页没选择的项移除
      currentPageNotSelected.forEach(item => {
        let idx = this.allMultipleSelection.indexOf(item)
        if (idx > -1) {
          this.allMultipleSelection.splice(idx, 1)
        }
      })
      console.log(this.allMultipleSelection, 'all')
    },
    setSelectedRow () {
      // 设置当前页已选项
      this.tableData.forEach(item => {
        if (this.allMultipleSelection.includes(item[this.uniqueKey])) {
          this.$refs.asTable.toggleRowSelection(item, true)
          console.log(item[this.uniqueKey], 'set')
        }
      })
    },
    handleCurrentChange () {
      this.fetchData()
    },
    handleEdit () {
      console.log('handleEdit')
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrap
  margin 40px
.table
  margin-bottom 10px
.result
  color red
</style>
