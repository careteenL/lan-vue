<template>
  <div class="about">
    <h1>This is a Table Demo page</h1>
    <div>
      <Table
        :columns="columns1"
        :data="data1"
        border
        :selectedItems.sync="selectedItems"
        :orderBy.sync="orderBy"
        @update:orderBy="sort"
        :height="200"
        checkable
      ></Table>
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table'
export default {
  name: 'table-demo',
  data() {
    return {
      orderBy: {
        // 如何排序
        // name:true, // 能排序
        age: "asc",
        address: "desc"
      },
      selectedItems: [], // 当前用户选中了哪一项
      columns1: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address",
          
        }
      ],
      data1: [
        {
          id: 1,
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          id: 2,
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          id: 3,
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          id: 4,
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          id: 5,
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          id: 6,
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          id: 7,
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          id: 8,
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    }
  },
  components: {
    Table
  },
  methods: {
    sort(r) {
      /* eslint-disable no-console */
      console.log(r);
    }
  }
}
</script>
