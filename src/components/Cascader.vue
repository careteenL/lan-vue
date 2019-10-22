<template>
  <div class="lan-cascader" v-click-outside="handleClose">
    <div class="lan-cascader-input" @click="handleToggle">
      {{ inputVal }}
    </div>
    <div class="lan-cascader-content" v-if="isVisble">
      <CascaderPannel
        :options="options"
        :value="value"
        :level="0"
        @change="handelPannelChange"
      >
      </CascaderPannel>
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/directives/clickOutside'
import CascaderPannel from './CascaderPannel'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Cascader',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    lazyload: {
      type: Function
    }
  },
  data () {
    return {
      isVisble: false,
    }
  },
  computed: {
    inputVal () {
      return this.value.map(item => item.label).join('/')
    }
  },
  directives: {
    ClickOutside
  },
  components: {
    CascaderPannel
  },
  methods: {
    handleClose () {
      this.isVisble = false
    },
    handleToggle () {
      this.isVisble = !this.isVisble
    },
    _lazyload (node, nodes) {
      let cloneOptions = cloneDeep(this.options)
      let stack = [...cloneOptions]
      let index = 0
      let current
      /* eslint-disable no-cond-assign */
      while (current = stack[index++]) {
        if (current.value !== node.value) {
          if (current.children) {
            stack = stack.concat(current.children)
          }
        } else {
          break
        }
      }
      if (current) {
        current.children = nodes
        this.$emit('update:options', cloneOptions)
      }
    },
    handelPannelChange (value) {
      let level = value.length // 当前所属层级
      let lastLevel = value[level - 1]
      if (this.lazyload) {
        let node = {
          level,
          value: lastLevel.value
        }
        this.lazyload(node, (nodes) => {
          this._lazyload(node, nodes)
        })
      }
      this.$emit('input', value)
    }
  },
}
</script>

<style scoped lang="stylus">
  .lan-cascader
    display inline-block
    &-input
      height 40px
      line-height 40px
      border 1px solid #ccc
      box-sizing border-box
      width 160px
      max-width 160px
      padding 0 20px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap      
</style>