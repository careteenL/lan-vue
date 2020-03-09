<template>
  <div class="virtualScrollList">
    <h1>This is an VirtualScrollList Demo page</h1>
    <div class="pannel">
      <div class="pannel-item">
        <h2>Known Height</h2>
        <VirtualScrollList
          :size="24"
          :remain="8"
          :items="items"
          :variable="false"
        >
          <div slot-scope="scope" class="item">
            {{ scope.item.id }} && {{ scope.item.value }}
          </div>
        </VirtualScrollList>
      </div>
      <div class="pannel-item">
        <h2>Variable Height</h2>
        <VirtualScrollList
          :size="80"
          :remain="8"
          :items="variableItems"
          :variable="true"
        >
          <div slot-scope="scope" class="item">
            {{ scope.item.id }} && {{ scope.item.value }}
          </div>
        </VirtualScrollList>
      </div>
    </div>
  </div>
</template>

<script>
import VirtualScrollList from '@/functions/VirtualScrollList'
import Mock from 'mockjs'
const mockAccordantHeight = () => { // mock 等高数据
  let items = []
  for(let i = 0;  i < 10000; i++){
    items.push({
      id: i,
      value: i
    })
  }
  return items
}
const mockVariableHeight = () => { // mock 不等高数据
  let items = []
  for(let i = 0;  i < 10000; i++){
    items.push({
      id: i,
      value: Mock.Random.sentence()
    })
  }
  return items
}

export default {
  data() {
    return {
      items: mockAccordantHeight(),
      variableItems: mockVariableHeight(),
    }
  },
  components: {
    VirtualScrollList
  }
}
</script>

<style lang="stylus">
*{
  margin: 0; 
  padding: 0;
  box-sizing: border-box;
}
.pannel {
  display flex
  justify-content space-between
}
.pannel-item {
  flex 1
}
.item{
  border 1px solid red
}
</style>