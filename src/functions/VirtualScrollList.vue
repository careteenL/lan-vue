<template>
  <div
    class="lan-viewport"
    ref="viewport"
    @scroll="handleViewportScroll"
  >
    <div
      class="lan-scrollBar"
      ref="scrollBar"
    ></div>
    <div
      class="lan-scroll-list"
      :style="{transform:`translate3d(0, ${offset}px, 0)`}"
    >
      <div
        v-for="(item) in visibleData"
        :key="item.id"
        :vid="item.index"
        ref="items"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: { // 列表页的所有数据
      type: Array,
      default: () => []
    },
    size: { // 每一项的高度，不知道高度时需要传一个预计高度
      type: Number,
      default: 0
    },
    remain: { // 可视区域内所展示的项目个数
      type: Number,
      default: 0
    },
    variable: { // 高度是否未知， 未知时`size`需传预计高度
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      start: 0,
      end: null,
      offset: 0,
      positions: []
    }
  },
  computed: {
    formatData() {
      return this.items.map((item, index) => ({ ...item, index }))
    },
    visibleData() {
      let start = this.start - this.prevCount
      let end = this.end + this.nextCount
      return this.formatData.slice(start, end)
    },
    prevCount() {
      return Math.min(this.start, this.remain)
    },
    nextCount() {
      return Math.min(this.items.length - this.end, this.remain)
    }
  },
  mounted() {
    this.$refs.viewport.style.height = this.remain * this.size + 'px' // 设置viewPrort的高度
    this.$refs.scrollBar.style.height = this.items.length * this.size + 'px' // 设置滚动条高度
    this.end = this.start + this.remain // 计算显示范围
    if (this.variable) {
      this.initPosition()
    }
  },
  updated() {
    this.$nextTick(() => { // 获取真实元素的位置 更新top和bottom
      if (this.positions.length === 0) return
      let nodes = this.$refs.items
      if (!(nodes && nodes.length > 0)) {
        return
      }
      nodes.forEach(node => {
        let rect = node.getBoundingClientRect()
        let height = rect.height
        let index = +node.getAttribute('vid')
        let oldHeight = this.positions[index].height
        let val = oldHeight - height
        if (val) {
          // 先更新自己
          this.positions[index].bottom = this.positions[index].bottom - val
          this.positions[index].height = height
          for (let i = index + 1; i < this.positions.length; i++) { // 再更新后续兄弟
            this.positions[i].top = this.positions[i - 1].bottom
            this.positions[i].bottom = this.positions[i].bottom - val
          }
        }
      })
      this.$refs.scrollBar.style.height = this.positions[this.positions.length - 1].bottom + 'px'
      // this.offset = this.positions[this.start - this.prevCount]? this.positions[this.start - this.prevCount].top : 0
    })
  },
  methods: {
    initPosition() { // 初始化位置
      this.positions = this.items.map((item, index) => ({
        index,
        height: this.size,
        top: index * this.size,
        bottom: (index + 1) * this.size
      }))
    },
    getStartIndex(value) {
      let start = 0
      let end = this.positions.length
      let temp = null
      while (start < end) {
        let middleIndex = parseInt((start + end) / 2)
        let middleValue = this.positions[middleIndex].bottom
        if (value == middleValue) {
          return middleIndex + 1
        } else if (middleValue < value) {
          start = middleIndex + 1
        } else if (middleValue > value) {
          if (temp == null || temp > middleIndex) {
            temp = middleIndex
          }
          end = middleIndex - 1
        }
      }
      return temp
    },
    handleViewportScroll() {
      let scrollTop = this.$refs.viewport.scrollTop
      if (this.variable) {
        this.start = this.getStartIndex(scrollTop) // 算出开始的位置
        this.end = this.start + this.remain
        this.offset = this.positions[this.start - this.prevCount] ? this.positions[this.start - this.prevCount].top : 0
      } else {
        this.start = Math.floor(scrollTop / this.size) // 计算开始
        this.end = this.start + this.remain // 计算结束
        this.offset = scrollTop - (scrollTop % this.size) - this.prevCount * this.size // 计算偏移量
      }
    }
  }
}
</script>
<style lang="stylus">
.lan-viewport {
  overflow-y: scroll;
  position: relative;
}

.lan-scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>