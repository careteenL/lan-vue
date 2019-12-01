<template>
  <div
    class="table-wrapper"
    ref="tableWrapper"
  >
    <div
      :style="{'height':height+'px'}"
      class="scroll-box"
      ref="scrollBox"
    >
      <table
        class="table"
        :class="{border,stripe}"
        ref="table"
      >
        <!-- 表头 -->
        <thead>
          <tr>
            <th style="width:50px">
              <input
                type="checkbox"
                :checked="checkAllStatus"
                ref="checkAll"
                @change="changAllItems"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
            >
              <div class="th-head">
                {{column.title}}
                <span
                  v-if="column.key in orderBy"
                  class="sorter"
                  @click="sort(column)"
                >
                  <i
                    class="iconfont iconup"
                    :class="{active:orderBy[column.key]==='asc'}"
                  ></i>
                  <i
                    class="iconfont icondown"
                    :class="{active:orderBy[column.key]==='desc'}"
                  ></i>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <!-- 表体 -->
        <tbody>
          <tr
            v-for="row in data"
            :key="row.id"
          >
            <td style="width:50px">
              <input
                type="checkbox"
                @change="changeItem(row,$event)"
                :checked="isChecked(row)"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
            >{{row[column.key]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import cloneDeep from "lodash/cloneDeep"
export default {
  mounted() {
    if (this.height) { // 固定表头必须有height属性
      this.table = this.$refs.table
      this.taleWrapper = this.$refs.tableWrapper
      let copyTable = this.table.cloneNode() // 拷贝表格
      let thead = this.table.children[0]

      this.taleWrapper.style.paddingTop = thead.getBoundingClientRect().height + 'px'
      copyTable.appendChild(thead) // 将原表格的thead 移动到拷贝的表格中
      this.taleWrapper.appendChild(copyTable) // 将拷贝后的结果插入到页面上
      copyTable.classList.add('fixed-header')
    }
  },
  methods: {
    sort(column) {
      let copyOrderBy = cloneDeep(this.orderBy)
      if (copyOrderBy[column.key] === "asc") {
        copyOrderBy[column.key] = "desc"
      } else if (copyOrderBy[column.key] === "desc") {
        copyOrderBy[column.key] = true
      } else {
        copyOrderBy[column.key] = "asc"
      }
      this.$emit("update:orderBy", copyOrderBy)
    },
    isChecked(row) {
      return this.selectedItems.some(item => item.id === row.id)
    },
    changAllItems(e) {
      this.$emit("update:selectedItems", e.target.checked ? this.data : [])
    },
    changeItem(row, e) {
      let copySelectedItems = cloneDeep(this.selectedItems)
      if (e.target.checked) {
        // 如果选中了就将这一项放入
        copySelectedItems.push(row)
      } else {
        // 将这一项删除掉 (id)
        let idx = copySelectedItems.findIndex(item => item.id === row.id)
        copySelectedItems.splice(idx, 1)
      }
      this.$emit("update:selectedItems", copySelectedItems)
    }
  },
  props: {
    height: {
      type: Number,
      default: 400
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => [] // 为了防止所有组件公用一个对象
    },
    data: {
      type: Array,
      default: () => []
    },
    stripe: {
      type: Boolean,
      default: true
    },
    orderBy: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    selectedItems() {
      if (this.selectedItems.length !== this.data.length) {
        if (this.selectedItems.length !== 0) {
          return (this.$refs.checkAll.indeterminate = true)
        }
      }
      this.$refs.checkAll.indeterminate = false
    }
  },
  computed: {
    checkAllStatus() {
      return this.data.length === this.selectedItems.length
    }
  }
}
</script>


<style lang="stylus">
* {
  margin: 0
  padding: 0
  box-sizing: border-box
}

.scroll-box {
  overflow-y: scroll
}

.fixed-header {
  position: absolute
  top: 0
  left: 0
  width: 100%
}

.table-wrapper {
  width: 80%
  margin: 0 auto
  position: relative

  table {
    border-collapse: collapse
    border-spacing: 0
    width: 100%

    &.border {
      border: 1px solid #ddd

      th, td {
        border: 1px solid #ddd
      }
    }

    &.stripe {
      tbody {
        tr:nth-child(even) {
          background: #ddd
        }
      }
    }

    th {
      background: #ddd
    }

    th, td {
      border-bottom: 1px solid #ddd
      padding: 5px
      text-align: left
    }
  }
}

.th-head {
  display: flex
  align-items: center

  .sorter {
    transform: scale(0.6)
    display: flex
    margin: 0 3px
    flex-direction: column
    cursor: pointer
  }

  .iconfont {
    color: #bbb

    &.active {
      color: red
    }
  }
}
</style>
