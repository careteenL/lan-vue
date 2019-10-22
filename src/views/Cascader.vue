<template>
  <div class="about">
    <h1>This is a Cascader Demo page</h1>
    <div>
      <h2>Sync Data</h2>
      <Cascader v-model="syncValue" :options="syncOptions"></Cascader>
    </div>
    <div>
      <h2>Async Data</h2>
      <Cascader v-model="asyncValue" :options.sync="asyncOptions" :lazyload="lazyload"></Cascader>
    </div>
  </div>
</template>

<script>
import Cascader from '@/components/Cascader'
import { syncOptions } from '@/mock/cascader'
import asyncOptions from '@/mock/cascader-async'
export default {
  name: 'cascader-demo',
  data () {
    return {
      syncValue: [],
      options: [],
      asyncValue: [],
      asyncOptions: []
    }
  },
  components: {
    Cascader
  },
  async created () {
    this.syncOptions = syncOptions
    this.asyncOptions = await this.fetchCity()
  },
  methods: {
    async lazyload (node, resolve) {
      let nodes = await this.fetchCity(node.value)
      resolve(nodes)
    },
    fetchCity (pid = 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(asyncOptions.filter(item => +item.pid === +pid))
        })
      }, 100)
    }
  },
}
</script>
