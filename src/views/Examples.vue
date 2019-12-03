<template>
  <div class="examples">
    <h1>This is an Examples page</h1>
      <div class="nav">
        <router-link to="/examples/pagingCheck">分页复选</router-link> |
      </div>
    <router-view/>
  </div>
</template>

<style lang="stylus" scoped>
  .nav
    margin-bottom 20px
</style>
