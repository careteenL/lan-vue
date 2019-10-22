<template>
  <div class="lan-cascader-pannel">
    <div class="lan-cascader-pannel__parent">
      <div
        class="lan-cascader-pannel__parent-item"
        v-for="item in options"
        :key="item.value"
        @click="handleSelectParent(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div
      class="lan-cascader-pannel__children"
      v-if="childrenOptions && childrenOptions.length"
    >
      <CascaderPannel
        :value="value"
        :options="childrenOptions"
        :level="level + 1"
        @change="handelPannelChange"
      >
      </CascaderPannel>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'CascaderPannel',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      curSelected: ''
    }
  },
  computed: {
    childrenOptions () {
      // return this.curSelected && this.curSelected.children
      let curLevel = this.value[this.level]
      let ret = []
      if (curLevel && curLevel.value) {
        ret = this.options.find(item => item.value === curLevel.value)
      }
      return ret.children
    }
  },
  methods: {
    handleSelectParent (item) {
      this.curSelected = item
      let cloneValue = cloneDeep(this.value)
      cloneValue[this.level] = item
      cloneValue.splice(this.level + 1)
      this.$emit('change', cloneValue)
    },
    handelPannelChange (value) {
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="stylus" scoped>
  .lan-cascader-pannel
    display flex
    &__parent
      box-sizing border-box
      border 1px solid #cccccc
      height 160px
      overflow-y scroll
      &-item
        text-align center
        max-width 120px
        height 40px
        line-height 40px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        padding 0 20px
        &:hover
          background #999
          cursor pointer
</style>